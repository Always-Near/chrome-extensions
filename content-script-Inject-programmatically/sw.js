function injectedFunction() {
  alert("test123");
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["content-script.css"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectedFunction,
  });
});
