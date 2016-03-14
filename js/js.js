var tab_id = '';
chrome.tabs.onUpdated.addListener(function(tabId , info) {
	tab_id = tabId;
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if(message){
		chrome.pageAction.show(tab_id);
	}
});