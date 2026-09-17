// content.js
let forcedTitle = null;

// background → content 메시지 수신
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "SET_TITLE") {
        forcedTitle = msg.title;
        document.title = forcedTitle;
    }
});

// title 태그 감시
const titleElement = document.querySelector('title');

// title이 없으면 생성 (SPA에서 가끔 발생)
if (!titleElement) {
    const t = document.createElement("title");
    document.head.appendChild(t);
}

const observer = new MutationObserver(() => {
    if (forcedTitle && document.title !== forcedTitle) {
        document.title = forcedTitle;
    }
});

observer.observe(document.querySelector("title"), {
    childList: true,
    subtree: true
});
