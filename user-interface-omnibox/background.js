// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener((text) => {
  // Encode user input for special characters , / ? : @ & = + $ #
  const newURL = "https://www.baidu.com/s?wd=" + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});
