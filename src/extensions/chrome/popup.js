chrome.tabs.query({active: true, currentWindow: true}, tabsQueryCallBack);

function tabsQueryCallBack(tabs){
    chrome.tabs.sendMessage(
        tabs[0].id,
        {code: "SendHtml" },
        function(response) {
            console.log(response);
        }
    );
}

function onBtnShowClick() {
    chrome.runtime.sendMessage(
        { code: "SendHtml" },
        function (response) {
            console.log(response);
        }
    );
}