function sendHtml() {
    //alert(document.documentElement.innerHTML);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.code === "SendHtml") {
            sendHtml();
            sendResponse("Ok");
        }
    });