# Ham vs Spam – Frontend

Premium React frontend for the Ham vs Spam AI classifier. Built with Vite + React, featuring a dark/light theme, animated UI, history panel, and confidence meter.

---

## 🖥️ Preview

- **Hero section** with animated gradient heading and "AI-Powered Detection" live badge
- **Classifier card** with expandable textarea, character counter, example pills, and keyboard shortcut (`⌘↵`)
- **Result card** with animated confidence bar, verdict badge, and message preview
- **Stats bar** showing total / ham / spam counts with a live spam-rate mini-bar
- **History panel** (sticky sidebar) with filter tabs and one-click replay
- **Dark / Light theme** toggle with system preference detection and localStorage persistence

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open → **http://localhost:5173**

### Connect to Backend

```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local and set your backend URL:
# VITE_API_URL=https://your-render-service.onrender.com
```

---

## 📦 Build for Production

```bash
npm run build
# Output is in ./dist — deploy to Vercel, Netlify, or any static host
```

---

## 🛠 Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 6 | Bundler / dev server |
| CSS Custom Properties | Theming |
| LocalStorage | History & theme persistence |
