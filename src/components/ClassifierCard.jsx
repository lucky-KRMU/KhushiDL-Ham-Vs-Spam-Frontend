import { useRef, useCallback } from 'react'
import './ClassifierCard.css'

const PLACEHOLDER_EXAMPLES = [
  'Congratulations! You\'ve won a $1,000 gift card. Click here to claim now.',
  'Hey, are we still on for lunch tomorrow at 1pm?',
  'URGENT: Your account has been suspended. Verify immediately to avoid termination.',
  'Can you send me the report when you get a chance? Thanks!',
]

const MAX_CHARS = 5000

export default function ClassifierCard({ message, onMessageChange, onClassify, loading }) {
  const textareaRef = useRef(null)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onClassify(message)
  }, [message, onClassify])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onClassify(message)
    }
  }, [message, onClassify])

  const handleExample = useCallback((text) => {
    onMessageChange(text)
    textareaRef.current?.focus()
  }, [onMessageChange])

  const charCount = message.length
  const isOverLimit = charCount > MAX_CHARS
  const isReady = message.trim().length > 0 && !isOverLimit && !loading

  return (
    <div className="card classifier-card">
      <div className="card-header">
        <div className="card-title-row">
          <div className="card-icon">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H7l-5 3V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 className="card-title">Classify Message</h2>
            <p className="card-subtitle">Enter any SMS or email message</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="classifier-form">
        <div className="textarea-wrapper">
          <textarea
            ref={textareaRef}
            className="message-textarea"
            value={message}
            onChange={e => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste or type your message here…"
            rows={6}
            maxLength={MAX_CHARS + 100}
            disabled={loading}
            aria-label="Message to classify"
          />
          {message && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => onMessageChange('')}
              aria-label="Clear message"
              tabIndex={-1}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
              </svg>
            </button>
          )}
        </div>

        <div className="form-footer">
          <span className={`char-count ${isOverLimit ? 'over-limit' : ''}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
          <div className="form-actions">
            <span className="keyboard-hint">
              <kbd>⌘</kbd><kbd>↵</kbd> to analyze
            </span>
            <button
              type="submit"
              className={`classify-btn ${loading ? 'btn-loading' : ''}`}
              disabled={!isReady}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Analyzing…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M13 10H7M10 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Classify
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Example messages */}
      <div className="examples-section">
        <p className="examples-label">Try an example:</p>
        <div className="examples-grid">
          {PLACEHOLDER_EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className={`example-pill ${i < 2 ? 'example-ham' : 'example-spam'} ${i >= 2 && i < 4 ? 'example-pill-spam' : ''}`}
              onClick={() => handleExample(ex)}
              title={ex}
            >
              <span className="example-pill-badge">{i < 2 ? 'Ham' : 'Spam'}</span>
              <span className="example-pill-text">{ex.slice(0, 45)}{ex.length > 45 ? '…' : ''}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
