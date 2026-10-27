# KhushiDL — Ham V/s Spam (Frontend)

A Claude-inspired, professional text classification interface powered by deep learning. Built with React 18, Vite 6, and Tailwind CSS.

---

## 🌐 Live Demo & Endpoints

- **Frontend on GitHub Pages**: [https://lucky-krmu.github.io/KhushiDL-Ham-Vs-Spam-Frontend/](https://lucky-krmu.github.io/KhushiDL-Ham-Vs-Spam-Frontend/)
- **Backend on Render**: [https://khushidl-ham-vs-spam-backend.onrender.com](https://khushidl-ham-vs-spam-backend.onrender.com)

---

## ✨ Key Features

- **Claude-Inspired Interface**: Clean, warm, and thoughtful UI with calm prompt card input, circular send action button, and conversational result cards.
- **Full-Width Navigation**: Expanded 72px-height navbar spanning the entire viewport width with serif branding (`KhushiDL / Ham V/s Spam`).
- **Henna Green Dark Theme**: A deep, rich, organic herbal green theme (`#0c1611`, `#13221a`) paired with warm golden accents and pale sage typography, alongside an ivory/stone light mode.
- **Cold-Start Pre-warming**: Automatically pre-warms the Render free instance via background `/health` pings, with live status indicators and cold-start progress notifications.
- **Deep Learning Classifier**: Powered by a pre-trained Keras 3 model served via FastAPI.
- **History Drawer**: Collapsible recent classification log with Ham, Spam, and Spam Ratio metrics.

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/lucky-KRMU/KhushiDL-Ham-Vs-Spam-Frontend.git
cd KhushiDL-Ham-Vs-Spam-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open → **http://localhost:5173**

---

## ☁️ Deploying to GitHub Pages

### Method 1: Automatic via GitHub Actions (Recommended)
This repo includes `.github/workflows/deploy.yml`. When you push to `main`, GitHub Actions will build and deploy automatically:
1. Go to your repo on GitHub: **Settings → Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow manually under the **Actions** tab).

### Method 2: Manual Deploy via `gh-pages`
```bash
npm run deploy
```
This builds the app into `./dist` and pushes it directly to the `gh-pages` branch.
