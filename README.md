# ShareDesktopMe 🖼️

<div align="center">

![ShareDesktopMe Banner](https://img.shields.io/badge/ShareDesktopMe-Wallpaper%20Platform-8B5CF6?style=for-the-badge&logo=image&logoColor=white)

**A modern, free wallpaper sharing platform for PC and Mobile devices**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-4CAF50?style=flat-square)](https://sharegiupanh.bahoang.online)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖼️ **High Quality** | HD, 2K, 4K wallpapers |
| 📱 **Multi-Device** | Optimized for PC & Mobile |
| 🎨 **Theme Toggle** | Dark/Light mode with smart hover effects |
| 🎵 **Background Music** | Auto-play music on first click |
| ☁️ **Easy Upload** | Drag & drop image upload |
| 📊 **Free Backend** | Google Sheets as database |
| 🔄 **Real-time** | Instant updates after upload |
| 🌐 **CORS Ready** | Works from any domain |

---

## 🚀 Quick Start

### For Users

1. **Browse Wallpapers** - Select category (PC or Mobile)
2. **Preview** - Click any wallpaper to view details
3. **Download** - Click the download button to save
4. **Upload** - Contribute your own wallpapers!

### For Developers

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ShareDesktopMe.git

# Navigate to project directory
cd ShareDesktopMe

# Start local server
npx http-server . -p 8080 -o
```

---

## 🛠️ Setup Your Own Instance

### Step 1: Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/ShareDesktopMe.git
cd ShareDesktopMe
```

### Step 2: Setup Google Sheets Backend

Follow the detailed setup guide in your preferred language:

| Language | Guide |
|----------|-------|
| 🇬🇧 English | [google-sheets-setup.md](google-sheets-setup.md) |
| 🇻🇳 Vietnamese | [huong-dan-google-sheets.md](huong-dan-google-sheets.md) |

**Quick Summary:**
1. Create a Google Sheet with headers: `url | title | category | description | date`
2. Add the Apps Script code (see guides above)
3. Deploy as Web App with "Anyone" access
4. Copy the deployment URL

### Step 3: Configure the Website

Edit `js/app.js` and update the API URLs:

```javascript
const CONFIG = {
    // ... other config
    apiUrl: {
        get: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
        post: 'YOUR_GOOGLE_APPS_SCRIPT_URL'
    }
};
```

### Step 4: Deploy

**Option A: GitHub Pages (Free)**
1. Push your code to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch → Save

**Option B: Local Development**
```bash
npx http-server . -p 8080
```

---

## 📁 Project Structure

```
ShareDesktopMe/
├── 📄 index.html                    # Main HTML file
├── 📁 css/
│   ├── style.css                    # Main stylesheet
│   ├── additional-styles.css        # Extended styles
│   └── sidebar-layout.css           # Layout styles
├── 📁 js/
│   └── app.js                       # Main JavaScript (all logic)
├── 📁 mp3/
│   └── AngelWithAShotgun.mp3        # Background music
├── 📄 google-sheets-setup.md        # Setup guide (English)
├── 📄 huong-dan-google-sheets.md    # Setup guide (Vietnamese)
└── 📄 README.md                     # This file
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure |
| **CSS3** | Styling with CSS variables, animations |
| **Vanilla JavaScript** | All functionality (no frameworks) |
| **Google Sheets** | Free database backend |
| **Google Apps Script** | API endpoints |
| **Catbox.moe** | Image hosting (permanent, free) |
| **corsproxy.io** | CORS proxy for cross-origin requests |

---

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary: #8B5CF6;
    --primary-dark: #7C3AED;
    --bg-primary: #0F172A;
    --bg-secondary: #1E293B;
    /* ... more variables */
}
```

### Change Background Music

Replace `mp3/AngelWithAShotgun.mp3` with your own audio file, or update the path in `index.html`:

```html
<audio id="bgMusic" loop preload="auto">
    <source src="mp3/YOUR_MUSIC.mp3" type="audio/mpeg">
</audio>
```

### Change Catbox User Hash

Update your Catbox user hash in `js/app.js`:

```javascript
catbox: {
    userHash: 'YOUR_CATBOX_USER_HASH'
}
```

Get your user hash at [catbox.moe](https://catbox.moe) after creating an account.

---

## 📝 API Reference

### GET - Fetch Wallpapers

```
GET https://script.google.com/macros/s/.../exec
```

**Response:**
```json
[
  {
    "url": "https://files.catbox.moe/abc123.jpg",
    "title": "Mountain Sunset",
    "category": "pc",
    "description": "Beautiful landscape",
    "date": "2026-01-17T00:00:00Z"
  }
]
```

### POST - Upload Wallpaper

```
POST https://script.google.com/macros/s/.../exec
Content-Type: application/json

{
  "url": "https://files.catbox.moe/xyz789.png",
  "title": "Ocean Waves",
  "category": "mobile",
  "description": "Calm beach scene"
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Ideas

- 🌍 Add more language translations
- 🎨 Create new themes
- ⚡ Performance optimizations
- 📱 Mobile app version
- 🔍 Advanced search filters

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Catbox.moe](https://catbox.moe) - Free, permanent image hosting
- [Font Awesome](https://fontawesome.com) - Beautiful icons
- [Google Fonts](https://fonts.google.com) - Typography
- [corsproxy.io](https://corsproxy.io) - CORS proxy service

---

<div align="center">

**Made with ❤️ by the ShareDesktopMe Community**

⭐ **Star this repo if you find it useful!** ⭐

</div>
