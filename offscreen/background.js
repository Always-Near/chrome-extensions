const OFFSCREEN_DOCUMENT_PATH = "/offscreen.html";

chrome.action.onClicked.addListener(async () => {
  sendMessageToOffscreenDocument(
    "add-exclamationmarks-to-headings",
    "<html><head></head><body><h1>Hello World</h1></body></html>"
  );
});

async function sendMessageToOffscreenDocument(type, data) {
  if (!(await hasDocument())) {
    await chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: [chrome.offscreen.Reason.DOM_PARSER],
      justification: "Parse DOM",
    });
  }
  // Now that we have an offscreen document, we can dispatch the message.
  chrome.runtime.sendMessage({
    type,
    target: "offscreen",
    data,
  });
}

chrome.runtime.onMessage.addListener(handleMessages);

// This function performs basic filtering and error checking on messages before
// dispatching the message to a more specific message handler.
async function handleMessages(message) {
  // Return early if this message isn't meant for the background script
  if (message.target !== "background") {
    return;
  }

  // Dispatch the message to an appropriate handler.
  switch (message.type) {
    case "add-exclamationmarks-result":
      handleAddExclamationMarkResult(message.data);
      closeOffscreenDocument();
      break;
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
  }
}

async function handleAddExclamationMarkResult(dom) {
  console.log("Received dom", dom);
}

async function closeOffscreenDocument() {
  if (!(await hasDocument())) {
    return;
  }
  await chrome.offscreen.closeDocument();
}

async function hasDocument() {
  // Check all windows controlled by the service worker if one of them is the offscreen document
  const matchedClients = await clients.matchAll();
  for (const client of matchedClients) {
    if (client.url.endsWith(OFFSCREEN_DOCUMENT_PATH)) {
      return true;
    }
  }
  return false;
}
