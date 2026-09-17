#!/usr/bin/env node

/**
 * Extract NAVER Cloud Console menu entries from browser-saved HTML pages.
 *
 * With no arguments, it combines the HTML files in:
 *   origin_html/민간존
 *   origin_html/금융존
 *   origin_html/공공존
 *
 * A path to one or more HTML files/directories can also be passed explicitly.
 * The script only writes a rules.js-compatible candidate array to stdout; it
 * never changes rules.js or any saved HTML file.
 *
 * Usage:
 *   node scripts/extract-menu-rules.js
 *   node scripts/extract-menu-rules.js path/to/console.html
 */

const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_ZONES = ["민간존", "금융존", "공공존"];
const NUXT_DATA_PATTERN =
  /<script\b[^>]*\bid=["']__CONSOLE_NUXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i;

function isSavedConsoleHtml(filePath) {
  return (
    path.extname(filePath).toLowerCase() === ".html" &&
    path.basename(filePath).toLowerCase() !== "saved_resource.html"
  );
}

function collectHtmlFiles(inputPath) {
  const resolvedPath = path.resolve(inputPath);
  const stats = fs.statSync(resolvedPath);

  if (stats.isFile()) return isSavedConsoleHtml(resolvedPath) ? [resolvedPath] : [];
  if (!stats.isDirectory()) return [];

  return fs.readdirSync(resolvedPath, { withFileTypes: true }).flatMap((entry) => {
    const childPath = path.join(resolvedPath, entry.name);
    return entry.isDirectory()
      ? collectHtmlFiles(childPath)
      : isSavedConsoleHtml(childPath)
        ? [childPath]
        : [];
  });
}

function resolveString(nuxtData, reference) {
  if (typeof reference === "string") return reference;
  if (!Number.isInteger(reference)) return null;

  const value = nuxtData[reference];
  return typeof value === "string" ? value : null;
}

function resolveValue(nuxtData, reference) {
  return Number.isInteger(reference) ? nuxtData[reference] : reference;
}

function normalizePath(menuUrl) {
  if (typeof menuUrl !== "string" || !menuUrl.startsWith("/")) return null;

  // Menu grouping nodes use an internal numeric path such as /100001/100006.
  // They are not browser routes and should not become rename rules.
  if (/^\/\d+(?:\/\d+)*$/.test(menuUrl)) return null;

  try {
    return new URL(menuUrl, "https://console.ncloud.com").pathname;
  } catch {
    return null;
  }
}

function extractRules(inputPath) {
  const html = fs.readFileSync(inputPath, "utf8");
  const nuxtDataMatch = html.match(NUXT_DATA_PATTERN);

  if (!nuxtDataMatch) {
    throw new Error("__CONSOLE_NUXT_DATA__ was not found");
  }

  const nuxtData = JSON.parse(nuxtDataMatch[1]);
  if (!Array.isArray(nuxtData)) {
    throw new Error("__CONSOLE_NUXT_DATA__ is not in the expected Nuxt array format");
  }

  const byUrl = new Map();
  const addRule = (nameReference, urlReference) => {
    const name = resolveString(nuxtData, nameReference)?.replace(/\s+/g, " ").trim();
    const url = normalizePath(resolveString(nuxtData, urlReference));

    if (name && url && !byUrl.has(url)) byUrl.set(url, name);
  };

  // The current page's account/billing menu uses menuName/menuUrl.
  for (const entry of nuxtData) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    if ("menuName" in entry && "menuUrl" in entry) {
      addRule(entry.menuName, entry.menuUrl);
    }
  }

  // The All Services menu uses productList, where service cards use name/link.
  const productStore = nuxtData.find(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry) &&
      "productList" in entry &&
      "bookmarkTree" in entry
  );
  const categories = productStore && resolveValue(nuxtData, productStore.productList);

  if (Array.isArray(categories)) {
    for (const categoryReference of categories) {
      const category = resolveValue(nuxtData, categoryReference);
      const products = category && resolveValue(nuxtData, category.products);
      if (!Array.isArray(products)) continue;

      for (const productReference of products) {
        const product = resolveValue(nuxtData, productReference);
        if (product && typeof product === "object") {
          addRule(product.name, product.link);
        }
      }
    }
  }

  return byUrl;
}

const suppliedPaths = process.argv.slice(2);
const inputRoots = suppliedPaths.length > 0
  ? suppliedPaths
  : DEFAULT_ZONES.map((zone) => path.join("origin_html", zone));

const sourceFiles = [];
for (const inputRoot of inputRoots) {
  try {
    sourceFiles.push(...collectHtmlFiles(inputRoot));
  } catch (error) {
    console.error(`Cannot read ${path.resolve(inputRoot)}: ${error.message}`);
    process.exit(1);
  }
}

if (sourceFiles.length === 0) {
  console.error("No saved console HTML files were found.");
  process.exit(1);
}

const combinedByUrl = new Map();
const conflicts = [];

for (const sourceFile of sourceFiles) {
  let extractedRules;
  try {
    extractedRules = extractRules(sourceFile);
  } catch (error) {
    console.error(`Skipping ${sourceFile}: ${error.message}`);
    continue;
  }

  const label = path.relative(process.cwd(), sourceFile);
  console.error(`Extracted ${extractedRules.size} unique menu routes from ${label}.`);

  for (const [url, name] of extractedRules) {
    if (!combinedByUrl.has(url)) {
      combinedByUrl.set(url, name);
    } else if (combinedByUrl.get(url) !== name) {
      conflicts.push({ url, kept: combinedByUrl.get(url), ignored: name, source: label });
    }
  }
}

const rules = [...combinedByUrl]
  .map(([url, name]) => ({ url, name }))
  // The extension uses startsWith(), so longer routes must precede their prefixes.
  .sort((left, right) => right.url.length - left.url.length || left.url.localeCompare(right.url));

if (rules.length === 0) {
  console.error("No usable menu routes were extracted.");
  process.exit(1);
}

console.log("// Generated candidate rules. Review before copying into rules.js.");
console.log("const renameRules = [");
for (const rule of rules) {
  console.log(`  { url: ${JSON.stringify(rule.url)}, name: ${JSON.stringify(rule.name)} },`);
}
console.log("];" );

console.error(`Combined ${rules.length} unique menu routes from ${sourceFiles.length} saved console pages.`);
for (const conflict of conflicts) {
  console.error(
    `Name conflict for ${conflict.url}: kept "${conflict.kept}", ignored "${conflict.ignored}" from ${conflict.source}.`
  );
}
