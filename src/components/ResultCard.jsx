import './ResultCard.css'

const CONFIDENCE_COLORS = {
  high: { bar: '#10b981', text: 'var(--emerald-500)' },
  medium: { bar: '#f59e0b', text: 'var(--amber-500)' },
  low: { bar: '#ef4444', text: 'var(--rose-500)' },
}

function getConfidenceLevel(confidence) {
  if (confidence >= 0.85) return 'high'
  if (confidence >= 0.65) return 'medium'
  return 'low'
}

function ConfidenceBar({ value }) {
  const level = getConfidenceLevel(value)
  const pct = Math.round(value * 100)
  const colors = CONFIDENCE_COLORS[level]

  return (
    <div className="confidence-section">
      <div className="confidence-row">
        <span className="confidence-label">Confidence</span>
        <span className="confidence-value" style={{ color: colors.text }}>
          {pct}%
        </span>
      </div>
      <div className="confidence-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="confidence-fill"
          style={{
            width: `${pct}%`,
            background: colors.bar,
            boxShadow: `0 0 10px ${colors.bar}60`,
          }}
        />
      </div>
    </div>
  )
}

export default function ResultCard({ result, error }) {
  if (error) {
    return (
      <div className="card result-card result-error" role="alert">
        <div className="result-icon-wrap result-icon-error">
          <svg viewBox="0 0 20 20" fill="none" width="28" height="28">
            <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 7v4M10 13h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="result-info">
          <h3 className="result-label-text">Connection Error</h3>
          <p className="result-error-msg">{error}</p>
        </div>
      </div>
    )
  }

  if (!result) return null

  const isSpam = result.label === 'Spam'
  const pct = Math.round(result.confidence * 100)

  return (
    <div className={`card result-card ${isSpam ? 'result-spam' : 'result-ham'}`} role="alert" aria-live="polite">
      <div className="result-header">
        <div className={`result-icon-wrap ${isSpam ? 'result-icon-spam' : 'result-icon-ham'}`}>
          {isSpam ? (
            <svg viewBox="0 0 20 20" fill="none" width="28" height="28">
              <path d="M9.03 2.52a1.1 1.1 0 011.94 0l7.13 13A1.1 1.1 0 0117.13 17H2.87a1.1 1.1 0 01-.97-1.48l7.13-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M10 8v4M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" width="28" height="28">
              <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="result-info">
          <div className="result-verdict-row">
            <span className={`result-verdict-badge ${isSpam ? 'badge-spam' : 'badge-ham'}`}>
              {isSpam ? '🚫 Spam Detected' : '✅ Looks Legitimate'}
            </span>
          </div>
          <h3 className={`result-label-text ${isSpam ? 'text-spam' : 'text-ham'}`}>
            {result.label}
          </h3>
          <p className="result-description">
            {isSpam
              ? `This message has a ${pct}% probability of being spam.`
              : `This message appears to be legitimate with ${pct}% confidence.`}
          </p>
        </div>
      </div>

      <ConfidenceBar value={result.confidence} />

      <div className="result-message-preview">
        <p className="result-message-label">Analyzed message</p>
        <blockquote className="result-message-text">
          {result.message.length > 200
            ? result.message.slice(0, 200) + '…'
            : result.message}
        </blockquote>
      </div>
    </div>
  )
}
