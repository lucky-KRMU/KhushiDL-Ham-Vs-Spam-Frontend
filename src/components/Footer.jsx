import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-ornament">
        <span className="line" />
        <span className="symbol">❦</span>
        <span className="line" />
      </div>

      <div className="footer-inner">
        <div className="footer-col-left">
          <p className="footer-title font-serif">KhushiDL</p>
          <p className="footer-desc">Ham V/s Spam · Deep Learning Text Classification</p>
        </div>

        <div className="footer-col-right font-mono">
          <span>Model: Keras Sequential / Dense</span>
          <span>Engine: FastAPI</span>
        </div>
      </div>
    </footer>
  )
}
