chrome.runtime.onMessage.addListener(handleMessages);

// This function performs basic filtering and error checking on messages before
// dispatching the message to a more specific message handler.
async function handleMessages(message) {
  // Return early if this message isn't meant for the offscreen document.
  if (message.target !== "offscreen") {
    return false;
  }

  // Dispatch the message to an appropriate handler.
  switch (message.type) {
    case "add-exclamationmarks-to-headings":
      addExclamationMarksToHeadings(message.data);
      break;
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
      return false;
  }
}

function addExclamationMarksToHeadings(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, "text/html");
  document
    .querySelectorAll("h1")
    .forEach((heading) => (heading.textContent = heading.textContent + "!!!"));
  sendToBackground(
    "add-exclamationmarks-result",
    document.documentElement.outerHTML
  );
}

function sendToBackground(type, data) {
  chrome.runtime.sendMessage({
    type,
    target: "background",
    data,
  });
}
