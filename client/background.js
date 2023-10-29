chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log(tab);
  if (tab.title && tab.title.includes("Classtime")) {
    chrome.tabs.sendMessage(tabId, {
      type: "INIT",
    });
  }
});
