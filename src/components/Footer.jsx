import './Footer.css'

export default function Footer() {
  return (
    <footer className="claude-footer">
      <div className="claude-footer-row">
        <div className="footer-left">
          <span className="footer-brand font-serif">KhushiDL</span>
          <span className="footer-tagline font-sans">Ham V/s Spam · Deep Learning Text Classification</span>
        </div>

        <div className="footer-right font-mono">
          <span>FastAPI</span>
          <span>·</span>
          <span>TensorFlow</span>
          <span>·</span>
          <span>React</span>
        </div>
      </div>
    </footer>
  )
}
