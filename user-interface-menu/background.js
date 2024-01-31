const list = ["a", "b", "c", "d"];

chrome.runtime.onInstalled.addListener(async () => {
  list.forEach((item) =>
    chrome.contextMenus.create({
      id: item,
      title: item,
      type: "radio",
    })
  );
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  chrome.action.setBadgeText({
    tabId: tab.id,
    text: item.menuItemId,
  });
});
