import { useRef, useCallback } from 'react'
import './ClassifierCard.css'

const EXAMPLES = [
  { label: 'Ham', text: 'Hey, are we still meeting tomorrow at noon? Let me know!' },
  { label: 'Ham', text: 'Could you send me the project report when you get a chance?' },
  { label: 'Spam', text: 'WINNER! You\'ve been selected for a FREE £1000 gift card. Claim NOW.' },
  { label: 'Spam', text: 'URGENT: Your account suspended. Click here to verify identity immediately.' },
]

const MAX_CHARS = 5000

export default function ClassifierCard({ message, onMessageChange, onClassify, loading }) {
  const textareaRef = useRef(null)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onClassify(message)
  }, [message, onClassify])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onClassify(message)
  }, [message, onClassify])

  const charCount   = message.length
  const isOverLimit = charCount > MAX_CHARS
  const isReady     = message.trim().length > 0 && !isOverLimit && !loading

  return (
    <div className="classifier-wrap">
      {/* Header label */}
      <div className="field-label-row">
        <label htmlFor="msg-input" className="field-label">Message</label>
        <span className="field-hint">Paste any SMS or email text below</span>
      </div>

      <form onSubmit={handleSubmit} className="classifier-form">
        {/* Textarea */}
        <div className="textarea-frame">
          <textarea
            id="msg-input"
            ref={textareaRef}
            className="msg-textarea"
            value={message}
            onChange={e => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or paste a message here…"
            rows={6}
            disabled={loading}
            aria-label="Message to classify"
          />
          {message && (
            <button
              type="button"
              className="textarea-clear"
              onClick={() => { onMessageChange(''); textareaRef.current?.focus() }}
              aria-label="Clear message"
            >✕</button>
          )}
        </div>

        {/* Footer row */}
        <div className="form-footer">
          <span className={`char-tally ${isOverLimit ? 'tally-over' : ''}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
          <div className="footer-right">
            <span className="kbd-hint">
              <kbd>⌘</kbd><kbd>↵</kbd>
            </span>
            <button
              type="submit"
              className={`analyse-btn ${loading ? 'btn-busy' : ''}`}
              disabled={!isReady}
            >
              {loading
                ? <><span className="btn-spinner" aria-hidden="true" /> Analysing…</>
                : 'Analyse'}
            </button>
          </div>
        </div>
      </form>

      {/* Example messages */}
      <div className="examples-wrap">
        <div className="ornament" style={{ marginBottom: '0.875rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-ghost)' }}>
            Samples
          </span>
        </div>
        <div className="examples-grid">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className={`example-row ${ex.label === 'Ham' ? 'ex-ham' : 'ex-spam'}`}
              onClick={() => { onMessageChange(ex.text); textareaRef.current?.focus() }}
            >
              <span className={`ex-badge ${ex.label === 'Ham' ? 'badge-ham' : 'badge-spam'}`}>
                {ex.label}
              </span>
              <span className="ex-text">
                {ex.text.length > 55 ? ex.text.slice(0, 55) + '…' : ex.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
