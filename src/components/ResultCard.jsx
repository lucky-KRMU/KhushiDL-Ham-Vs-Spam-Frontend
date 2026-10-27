import './ResultCard.css'

export default function ResultCard({ result, error }) {
  if (error) {
    return (
      <div className="verdict-card verdict-error" role="alert">
        <div className="verdict-banner">
          <span className="verdict-flag">Fault</span>
          <span className="verdict-stamp-code">ERR-500</span>
        </div>
        <h3 className="verdict-headline font-serif">Transmission Failure</h3>
        <p className="verdict-subtext">{error}</p>
      </div>
    )
  }

  if (!result) return null

  const isSpam = result.label === 'Spam'
  const confidencePct = Math.round(result.confidence * 100)

  return (
    <div
      className={`verdict-card ${isSpam ? 'verdict-spam' : 'verdict-ham'}`}
      role="alert"
      aria-live="polite"
    >
      <div className="verdict-border-top">
        <span className="border-ornament">◈</span>
      </div>

      <div className="verdict-content">
        <div className="verdict-header">
          <div>
            <span className="verdict-pretitle">Classification Ruling</span>
            <h2 className="verdict-title font-serif">{result.label}</h2>
          </div>

          <div className={`verdict-stamp ${isSpam ? 'stamp-spam' : 'stamp-ham'}`}>
            <span className="stamp-inner">{isSpam ? 'SPAM' : 'HAM'}</span>
          </div>
        </div>

        <p className="verdict-analysis">
          {isSpam ? (
            <>
              This dispatch carries markers typical of unsolicited solicitation or fraudulent spam.
            </>
          ) : (
            <>
              This dispatch is evaluated as authentic, legitimate personal or operational correspondence.
            </>
          )}
        </p>

        {/* Confidence Gauge */}
        <div className="confidence-block">
          <div className="confidence-meta">
            <span className="confidence-title">Certainty Quotient</span>
            <span className="confidence-score font-mono">{confidencePct}%</span>
          </div>
          <div className="confidence-groove">
            <div
              className="confidence-needle"
              style={{ width: `${confidencePct}%` }}
            />
          </div>
        </div>

        {/* Snippet Preview */}
        <div className="verdict-excerpt">
          <span className="excerpt-label">Transcribed Record</span>
          <p className="excerpt-quote">
            “{result.message.length > 240 ? result.message.slice(0, 240) + '…' : result.message}”
          </p>
        </div>
      </div>
    </div>
  )
}
