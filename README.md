# 🔒 WhatsBlur – Blur WhatsApp Web Chat Previews

WhatsBlur is a **Chrome extension** that blurs **only the message previews** on [WhatsApp Web](https://web.whatsapp.com). This ensures privacy when someone glances at your screen—**without compromising usability**.

⚠️ Unlike existing extensions, **WhatsBlur is designed to run entirely locally**. No data is sent anywhere, and you can inspect or modify the code yourself.

---

## ✨ Features

- ✅ Blurs only message previews in chat list
- ✅ Automatically unblurs on hover
- ✅ Toggle blur on/off anytime
- ✅ 100% open-source and local

---

## 🛠️ How to Install Locally (No Chrome Web Store Needed)

1. **Clone or Download** this repository:
    ```bash
    git clone https://github.com/anuragparashar26/whatsblur-chrome-extension.git
    ```
    Or download ZIP and extract it.

2. **Open Chrome and go to**:  
   `chrome://extensions/`

3. **Enable Developer Mode** (top-right corner)

4. Click **"Load unpacked"**, then select the folder containing this extension.

5. Visit [https://web.whatsapp.com](https://web.whatsapp.com) and see the blur in action!
   
6. You can toggle the blur by clicking on the extesnion -> Enable/Disable Blur. 

---

## 📂 Folder Structure

```
whatsblur-chrome-extension/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── styles.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
└── images/
    ├── blurred.png
    └── hovered.png
```

## 📸 Screenshots

<!-- Add actual image links or paths -->
| Chat List View | Hover to Reveal |
|----------------|-----------------|
| ![Blurred View](images/blurred.png) | ![Hovered View](images/hovered.png) |

---

## 🔐 Permissions Used

- `"activeTab"` – to access the open WhatsApp Web tab
- `"storage"` – to remember your blur preference (on/off)

_No sensitive data is collected or transmitted._

---

## 🧑‍💻 Why Use This Instead of Chrome Store Extensions?

Most extensions are obfuscated or minified—you can't easily see what they're doing.  
**WhatsBlur runs locally, is open-source, and respects your privacy.**

> Your messages stay on your screen—no tracking, no analytics, no servers.

---

## 📄 License

MIT License. Free for personal or commercial use.

---

## ❤️ Author

Made with privacy in mind by Anurag Parashar (https://github.com/anuragparashar26)
