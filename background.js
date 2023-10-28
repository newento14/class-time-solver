chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log(tab);
  if (tab.title && tab.title.includes("Сесія MJ4JMQ - Classtime")) {
    chrome.tabs.sendMessage(tabId, {
      type: "INIT",
      random: "test",
    });
  }
});
