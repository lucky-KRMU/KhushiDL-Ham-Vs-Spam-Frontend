import './Header.css'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <a href="/" className="logo" aria-label="Ham vs Spam home">
          <div className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="8" fill="url(#logoGrad)"/>
              <path d="M5 9h18M5 9l9 8 9-8M5 9v10h18V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="21" cy="20" r="4.5" fill="#ef4444"/>
              <path d="M19.5 20h3M21 18.5v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">HamVsSpam</span>
            <span className="logo-tag">AI Classifier</span>
          </div>
        </a>

        {/* Nav actions */}
        <div className="header-actions">
          <a
            href="https://github.com"
            className="header-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="toggle-track" data-theme-on={theme}>
              <span className="toggle-thumb">
                {theme === 'dark' ? (
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                    <path d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1a.5.5 0 01.5.5zM2 8a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1A.5.5 0 012 8zm10.657-5.657a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707-.707l.707-.707a.5.5 0 01.707 0zm-7.071 7.071a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707-.707l.707-.707a.5.5 0 01.707 0zm7.071 0a.5.5 0 01-.707.707l-.707-.707a.5.5 0 01.707-.707l.707.707zM5.05 3.636a.5.5 0 01-.707.707L3.636 3.636a.5.5 0 01.707-.707l.707.707z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                    <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278z"/>
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
