import { useRef, useCallback } from 'react'
import './ClassifierCard.css'

const SUGGESTIONS = [
  { type: 'Ham', title: 'Team Meeting', text: 'Hey, are we still meeting tomorrow at 11am for the design review?' },
  { type: 'Ham', title: 'Delivery Status', text: 'Your order #8291 has been shipped and is scheduled to arrive on Thursday.' },
  { type: 'Spam', title: 'Prize Alert', text: 'URGENT: You have won a $1,000 cash voucher! Click http://claim-now.xyz to redeem.' },
  { type: 'Spam', title: 'Account Suspension', text: 'Security Warning: Your bank account is locked. Verify details immediately to restore.' },
]

const MAX_CHARS = 5000

export default function ClassifierCard({ message, onMessageChange, onClassify, loading, isWakingUp }) {
  const textareaRef = useRef(null)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onClassify(message)
  }, [message, onClassify])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onClassify(message)
    }
  }, [message, onClassify])

  const handleSelectExample = useCallback((text) => {
    onMessageChange(text)
    textareaRef.current?.focus()
  }, [onMessageChange])

  const charCount = message.length
  const isOverLimit = charCount > MAX_CHARS
  const isReady = message.trim().length > 0 && !isOverLimit && !loading

  return (
    <div className="prompt-container">
      {/* Claude-style Prompt Card */}
      <form onSubmit={handleSubmit} className="claude-input-card">
        <div className="input-body">
          <textarea
            ref={textareaRef}
            className="claude-textarea font-sans"
            value={message}
            onChange={e => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste an SMS, email, or suspicious message to analyze..."
            rows={4}
            disabled={loading}
            aria-label="Message to classify"
          />

          {message && (
            <button
              type="button"
              className="claude-clear-btn"
              onClick={() => {
                onMessageChange('')
                textareaRef.current?.focus()
              }}
              aria-label="Clear input"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Cold-start notification */}
        {isWakingUp && (
          <div className="waking-notice font-sans" role="status">
            <span className="waking-dot"></span>
            <span>Waking Render cloud instance (free tier takes ~30s on cold start)...</span>
          </div>
        )}

        {/* Action Tray */}
        <div className="claude-action-tray">
          <div className="tray-left">
            <span className={`char-indicator font-mono ${isOverLimit ? 'indicator-over' : ''}`}>
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          </div>

          <div className="tray-right">
            <span className="shortcut-tag font-mono">
              <kbd>⌘</kbd> + <kbd>↵</kbd>
            </span>

            <button
              type="submit"
              className={`claude-send-btn ${loading ? 'btn-loading' : ''}`}
              disabled={!isReady}
              aria-label="Classify message"
            >
              {loading ? (
                <span className="claude-spinner" aria-hidden="true" />
              ) : (
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 16V4M4 10l6-6 6 6" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Prompts / Chips */}
      <div className="prompt-suggestions">
        <span className="suggestions-label font-sans">Quick test samples:</span>
        <div className="suggestions-grid">
          {SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              className={`suggestion-chip ${item.type === 'Ham' ? 'chip-ham' : 'chip-spam'}`}
              onClick={() => handleSelectExample(item.text)}
              type="button"
            >
              <span className={`chip-badge font-mono ${item.type === 'Ham' ? 'badge-ham' : 'badge-spam'}`}>
                {item.type}
              </span>
              <span className="chip-title font-sans">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
