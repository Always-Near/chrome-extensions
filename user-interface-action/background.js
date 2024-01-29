// // onClicked
// chrome.action.onClicked.addListener(() => console.log("on action click"));

// // setBadgeText
// chrome.action.onClicked.addListener(async (tab) => {
//   const prevText = await chrome.action.getBadgeText({ tabId: tab.id });
//   const nextText = prevText ? "" : "Hi";
//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: nextText,
//   });
// });

// function generateColor() {
//   return `#${new Array(6)
//     .fill("")
//     .map((item) => Math.floor(Math.random() * 16).toString(16))
//     .join("")}`;
// }

// // setBadgeBackgroundColor
// chrome.action.onClicked.addListener(async (tab) => {
//   console.log(generateColor());
//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: "Hi",
//   });
//   await chrome.action.setBadgeTextColor({
//     tabId: tab.id,
//     color: generateColor(),
//   });
//   await chrome.action.setBadgeBackgroundColor({
//     tabId: tab.id,
//     color: generateColor(),
//   });
// });
