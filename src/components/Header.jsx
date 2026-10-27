import './Header.css'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Project name */}
        <div className="header-brand">
          <span className="brand-name">KhushiDL</span>
          <span className="brand-sep">—</span>
          <span className="brand-tagline">Ham V/s Spam</span>
        </div>

        {/* Theme toggle */}
        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            /* Sun icon */
            <svg viewBox="0 0 20 20" fill="none" width="15" height="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="10" cy="10" r="3.5"/>
              <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.22 4.22l1.06 1.06M14.72 14.72l1.06 1.06M4.22 15.78l1.06-1.06M14.72 5.28l1.06-1.06"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg viewBox="0 0 20 20" fill="none" width="15" height="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 11.5A7.5 7.5 0 018.5 2.5a7.5 7.5 0 000 15 7.5 7.5 0 009-6z"/>
            </svg>
          )}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Bottom rule */}
      <div className="header-rule">
        <span className="rule-line" />
        <span className="rule-diamond">◆</span>
        <span className="rule-line" />
      </div>
    </header>
  )
}
