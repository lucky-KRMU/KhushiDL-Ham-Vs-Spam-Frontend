# KhushiDL — Ham V/s Spam

A vintage editorial, aesthetic text classification interface powered by deep learning. Built with React, Vite, and Tailwind CSS.

---

## ✨ Features

- **Typography & Aesthetic**: Editorial serif typography (*Playfair Display*, *EB Garamond*, *Courier Prime*), warm cream & ink color scheme for light mode, rich night tones for dark mode, subtle noise texture, and ink-stamp motifs.
- **Old-School Layout**: Balanced, centered editorial structure aligned for focused reading and input.
- **Classification Engine**: Fast inference connected to the FastAPI deep learning backend.
- **Certainty Quotient**: Vintage gauge indicator displaying prediction confidence.
- **Ledger & History**: Log of recent classifications with live tally stats (total, ham, spam, spam rate).
- **Dark & Light Mode**: Warm newspaper/parchment light theme and cozy vintage dark theme, with system preference detection and localStorage persistence.

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
# Output is generated in ./dist
```
