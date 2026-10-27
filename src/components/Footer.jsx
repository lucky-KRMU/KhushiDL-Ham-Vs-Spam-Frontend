import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
              <rect width="18" height="18" rx="5" fill="url(#footerGrad)"/>
              <path d="M3 6h12M3 6l6 5 6-5M3 6v7h12V6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="footerGrad" x1="0" y1="0" x2="18" y2="18">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
            HamVsSpam
          </div>
          <span className="footer-sep">·</span>
          <span className="footer-desc">AI-powered spam detection</span>
        </div>
        <div className="footer-right">
          <span className="footer-note">
            Built with ❤️ using FastAPI &amp; React
          </span>
        </div>
      </div>
    </footer>
  )
}
