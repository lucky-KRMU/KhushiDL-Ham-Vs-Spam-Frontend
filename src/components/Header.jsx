import './Header.css'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="claude-header">
      <div className="header-full-row">
        {/* Left: Brand with Serif Font */}
        <div className="brand-group">
          <span className="brand-title font-serif">KhushiDL</span>
          <span className="brand-divider">/</span>
          <span className="brand-project font-serif">Ham V/s Spam</span>
          <span className="model-badge font-sans">Neural Net v1</span>
        </div>

        {/* Right: Actions */}
        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text font-sans">Online</span>
          </div>

          <button
            onClick={onToggleTheme}
            className="claude-theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="10" cy="10" r="3.5" />
                <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.22 4.22l1.06 1.06M14.72 14.72l1.06 1.06M4.22 15.78l1.06-1.06M14.72 5.28l1.06-1.06" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
            <span className="theme-toggle-label font-sans">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
