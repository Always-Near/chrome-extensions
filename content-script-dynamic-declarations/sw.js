chrome.action.onClicked.addListener(() => {
  chrome.scripting
    .registerContentScripts([
      {
        id: "session-script",
        js: ["content-script.js"],
        css: ["content-script.css"],
        matches: ["*://example.com/*"],
      },
    ])
    .then(() => console.log("registration complete"))
    .catch((err) => console.warn("unexpected error", err));
});
