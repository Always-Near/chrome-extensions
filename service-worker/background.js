let flag = 0;
chrome.runtime.onInstalled.addListener(async () => {
  console.log("onInstalled");
  flag = 1;
});

chrome.action.onClicked.addListener(() => console.log("on action click", flag));

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
//
//

// setInterval(chrome.runtime.getPlatformInfo, 25 * 1000);

// fetch("http://192.168.13.130:8080").then((res) => console.log(flag));
