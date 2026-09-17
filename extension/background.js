// background.js
importScripts('rules.js');

const domains = [
    "https://console.ncloud.com",
    "https://console.fin-ncloud.com",
    "https://console.gov-ncloud.com"
];

// 공통 처리 함수
function handleUrlChange(tabId, url) {
    if (!url || !url.startsWith("http")) return;

    let urlObj;
    try {
        urlObj = new URL(url);
    } catch (e) {
        console.warn("URL 파싱 실패:", url);
        return;
    }

    const currentDomain = urlObj.origin;
    const currentPathname = urlObj.pathname;

    console.log(`▶ handleUrlChange 호출: ${currentDomain}${currentPathname}`);

    if (!domains.includes(currentDomain)) {
        console.log(`[실패] 도메인이 허용된 목록에 포함되지 않습니다. 현재 도메인: ${currentDomain}`);
        return;
    }

    const matchedRule = renameRules.find(rule => currentPathname.startsWith(rule.url));

    if (!matchedRule) {
        console.log(`[실패] 일치하는 규칙을 찾지 못했습니다. 현재 경로: ${currentPathname}`);
        return;
    }

    console.log(`[성공] 매칭된 규칙: ${matchedRule.url}, 변경될 이름: ${matchedRule.name}`);

    // 🔥 핵심 변경 부분: executeScript 제거 → content script 로 메시지 전달
    chrome.tabs.sendMessage(tabId, {
        type: "SET_TITLE",
        title: matchedRule.name
    }, () => {
        if (chrome.runtime.lastError) {
            // content.js 가 아직 로드되지 않은 경우 발생 (SPA 이동 시)
            console.warn("content script 메시지 오류:", chrome.runtime.lastError.message);
        }
    });
}

// 1) 일반적인 페이지 로딩 완료 (full reload)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(`onUpdated 이벤트: status=${changeInfo.status}, url=${tab.url}`);

    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith("http")) {
        handleUrlChange(tabId, tab.url);
    }
});

// 2) SPA 내부 이동 감지 (history.pushState / replaceState 등)
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId !== 0) return;

    console.log(`onHistoryStateUpdated 이벤트: tabId=${details.tabId}, url=${details.url}`);

    if (details.url && details.url.startsWith("http")) {
        handleUrlChange(details.tabId, details.url);
    }
}, {
    url: [
        { hostEquals: "console.ncloud.com" },
        { hostEquals: "console.fin-ncloud.com" },
        { hostEquals: "console.gov-ncloud.com" }
    ]
});
