import './ResultCard.css'

export default function ResultCard({ result, error }) {
  if (error) {
    return (
      <div className="claude-result-card result-error-card" role="alert">
        <div className="card-top-bar">
          <span className="error-pill font-mono">Connection Error</span>
        </div>
        <h3 className="result-heading font-serif">Unable to complete classification</h3>
        <p className="error-description font-sans">{error}</p>
      </div>
    )
  }

  if (!result) return null

  const isSpam = result.label === 'Spam'
  const confidencePct = Math.round(result.confidence * 100)

  return (
    <div
      className={`claude-result-card ${isSpam ? 'result-spam-card' : 'result-ham-card'}`}
      role="alert"
      aria-live="polite"
    >
      {/* Top bar with label tag */}
      <div className="card-top-bar">
        <div className="result-badge-wrap">
          <span className={`verdict-pill font-mono ${isSpam ? 'pill-spam' : 'pill-ham'}`}>
            {isSpam ? 'Flagged as Spam' : 'Verified as Ham'}
          </span>
        </div>

        <span className="analysis-model font-mono">
          Model: TensorFlow Keras
        </span>
      </div>

      {/* Main Verdict Headline */}
      <div className="result-main-info">
        <h2 className="result-heading font-serif">
          {isSpam ? 'Suspected Spam Message' : 'Legitimate Communication'}
        </h2>
        <p className="result-narrative font-sans">
          {isSpam
            ? 'The language patterns in this message correspond closely to common spam campaigns, unsolicited offers, or credential phishing attempts.'
            : 'The language patterns in this message are consistent with legitimate, routine personal or professional communication.'}
        </p>
      </div>

      {/* Confidence meter */}
      <div className="confidence-container">
        <div className="confidence-header">
          <span className="confidence-title font-sans">Confidence Level</span>
          <span className="confidence-pct font-mono">{confidencePct}%</span>
        </div>
        <div className="confidence-bar-track">
          <div
            className={`confidence-bar-fill ${isSpam ? 'fill-spam' : 'fill-ham'}`}
            style={{ width: `${confidencePct}%` }}
          />
        </div>
      </div>

      {/* Quoted message excerpt */}
      <div className="analyzed-excerpt-block">
        <span className="excerpt-header-label font-sans">Analyzed Message Text</span>
        <blockquote className="excerpt-quote-text font-sans">
          “{result.message}”
        </blockquote>
      </div>
    </div>
  )
}
