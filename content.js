console.log('WhatsApp Blur Extension: Content script loaded');

let isBlurEnabled = true;

function applyBlur() {
  if (isBlurEnabled) {
    document.body.classList.add('wa-blur-active');
    console.log('WhatsApp Blur: Blur applied');
  } else {
    document.body.classList.remove('wa-blur-active');
    console.log('WhatsApp Blur: Blur removed');
  }
}

function waitForWhatsApp() {
  const checkForWhatsApp = () => {
    const chatList = document.querySelector('[data-testid="chat-list"]') ||
                     document.querySelector('[role="main"]') ||
                     document.querySelector('div[role="listitem"]');

    if (chatList) {
      console.log('WhatsApp Blur: WhatsApp interface detected');
      applyBlur();
      return true;
    }
    return false;
  };

  if (checkForWhatsApp()) return;

  let attempts = 0;
  const maxAttempts = 50;

  const interval = setInterval(() => {
    attempts++;
    if (checkForWhatsApp() || attempts >= maxAttempts) {
      clearInterval(interval);
      if (attempts >= maxAttempts) {
        console.log('WhatsApp Blur: Timeout waiting for WhatsApp to load');
        applyBlur();
      }
    }
  }, 200);
}

function initializeExtension() {
  console.log('WhatsApp Blur: Initializing extension');
  chrome.storage.sync.get(['blurEnabled'], function(result) {
    isBlurEnabled = result.blurEnabled !== false;
    console.log('WhatsApp Blur: Loaded state -', isBlurEnabled ? 'enabled' : 'disabled');
    waitForWhatsApp();
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('WhatsApp Blur: Received message:', request);

  if (request.action === 'toggleBlur') {
    isBlurEnabled = !isBlurEnabled;
    applyBlur();
    chrome.storage.sync.set({ blurEnabled: isBlurEnabled }, function() {
      console.log('WhatsApp Blur: State saved -', isBlurEnabled ? 'enabled' : 'disabled');
    });
    sendResponse({ blurEnabled: isBlurEnabled });
  } else if (request.action === 'getBlurState') {
    sendResponse({ blurEnabled: isBlurEnabled });
  }

  return true;
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

const observer = new MutationObserver(function () {
  if (isBlurEnabled && !document.body.classList.contains('wa-blur-active')) {
    console.log('WhatsApp Blur: Reapplying blur after DOM change');
    document.body.classList.add('wa-blur-active');
  }
});

setTimeout(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
}, 1000);
