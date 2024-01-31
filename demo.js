// Register listeners synchronously

// v2
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.browserAction.setBadgeText({ text: badgeText });
  chrome.browserAction.onClicked.addListener(handleActionClick);
});

// v3
chrome.action.onClicked.addListener(handleActionClick);
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// Persist states

// v2
let savedName = undefined;

chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    savedName = name;
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { name: savedName });
});

// v3
chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    chrome.storage.local.set({ name });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const { name } = await chrome.storage.local.get(["name"]);
  chrome.tabs.sendMessage(tab.id, { name });
});

//
//
//
//
//
//
//
//
//
//
//
//

// Convert timers to alarms

// v2
const TIMEOUT = 3 * 60 * 1000;
setTimeout(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
}, TIMEOUT);

// v3
async function startAlarm(name) {
  await chrome.alarms.create(name, { delayInMinutes: 3 });
}

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
});

//
//
//
//
//
//
//
//
//

// keep alive
async function waitUntil(promise) {
  const keepAlive = setInterval(chrome.runtime.getPlatformInfo, 25 * 1000);
  try {
    await promise;
  } finally {
    clearInterval(keepAlive);
  }
}

waitUntil(someExpensiveCalculation());
