document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const status = document.getElementById('status');

  if (!toggleBtn || !status) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.url.includes("web.whatsapp.com")) {
      status.textContent = "Not on WhatsApp Web";
      toggleBtn.disabled = true;
      return;
    }
    
    chrome.tabs.sendMessage(tab.id, { action: "getBlurState" }, (response) => {
      const enabled = response?.blurEnabled ?? true;
      updateUI(enabled);
    });

    toggleBtn.addEventListener("click", () => {
      chrome.tabs.sendMessage(tab.id, { action: "toggleBlur" }, (response) => {
        if (response && typeof response.blurEnabled !== "undefined") {
          updateUI(response.blurEnabled);
        }
      });
    });
  });

  function updateUI(enabled) {
    status.textContent = enabled ? "Blur is ON" : "Blur is OFF";
    status.style.color = enabled ? "#25d366" : "#ff6b6b";
    toggleBtn.textContent = enabled ? "Disable Blur" : "Enable Blur";
  }
});
