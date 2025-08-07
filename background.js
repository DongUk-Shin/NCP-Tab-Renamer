// background.js 파일
importScripts('rules.js');

const domains = [
    "https://console.ncloud.com",
    //"https://console.fin-ncloud.com",
    //"https://console.gov-ncloud.com"
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 탭이 로딩될 때마다 현재 URL을 로그로 찍어 확인
    console.log(`현재 URL: ${tab.url}`);

    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith("http")) {
        const url = new URL(tab.url);
        const currentDomain = url.origin;
        const currentPathname = url.pathname;

        if (domains.includes(currentDomain)) {
            const matchedRule = renameRules.find(rule => currentPathname.startsWith(rule.url));
            
            if (matchedRule) {
                // 매칭된 규칙과 변경될 이름을 로그로 찍어 확인
                console.log(`[성공] 매칭된 규칙: ${matchedRule.url}, 변경될 이름: ${matchedRule.name}`);
                
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: setTabTitle,
                    args: [matchedRule.name]
                })
                .catch(error => {
                    // 탭이 닫혀 발생하는 오류는 무시하도록 예외 처리
                    if (error.message.includes("No tab with id")) {
                        console.warn("존재하지 않는 탭에 접근하려 했습니다. 탭이 이미 닫힌 것 같습니다.");
                    } else {
                        console.error("탭 스크립트 실행 중 알 수 없는 오류 발생:", error);
                    }
                });
            } else {
                // 일치하는 규칙을 찾지 못한 경우, 현재 경로를 로그에 추가
                console.log(`[실패] 일치하는 규칙을 찾지 못했습니다. 현재 경로: ${currentPathname}`);
            }
        } else {
            // 허용되지 않은 도메인인 경우, 현재 도메인을 로그에 추가
            console.log(`[실패] 도메인이 허용된 목록에 포함되지 않습니다. 현재 도메인: ${currentDomain}`);
        }
    }
});

function setTabTitle(newTitle) {
    document.title = newTitle;
}