import { useState } from 'react'
import './HistoryPanel.css'

function formatTime(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function HistoryPanel({ history, onReplay, onClear }) {
  const [filter, setFilter] = useState('all')

  const filtered = history.filter(item => {
    if (filter === 'all') return true
    return item.label === filter
  })

  return (
    <div className="card history-panel">
      <div className="history-header">
        <div className="card-title-row">
          <div className="card-icon">
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <path d="M10 6v4l2.5 2.5M3 10a7 7 0 1014 0A7 7 0 003 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 className="card-title">History</h2>
            <p className="card-subtitle">{history.length} message{history.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="clear-history-btn"
          title="Clear history"
          aria-label="Clear all history"
        >
          <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
            <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47z"/>
          </svg>
          Clear
        </button>
      </div>

      {/* Filter tabs */}
      <div className="history-filters">
        {['all', 'Ham', 'Spam'].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'filter-active' : ''} ${f === 'Spam' ? 'tab-spam' : ''} ${f === 'Ham' ? 'tab-ham' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
            {f !== 'all' && (
              <span className="filter-count">
                {history.filter(h => h.label === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="history-list">
        {filtered.length === 0 ? (
          <div className="history-empty">
            <p>No {filter !== 'all' ? filter.toLowerCase() : ''} messages yet.</p>
          </div>
        ) : (
          filtered.map(item => (
            <button
              key={item.id}
              className={`history-item ${item.label === 'Spam' ? 'item-spam' : 'item-ham'}`}
              onClick={() => onReplay(item)}
              title="Click to reload this message"
            >
              <div className="item-top">
                <span className={`item-badge ${item.label === 'Spam' ? 'badge-spam' : 'badge-ham'}`}>
                  {item.label}
                </span>
                <div className="item-meta">
                  <span className="item-confidence">
                    {Math.round(item.confidence * 100)}%
                  </span>
                  <span className="item-time">{formatTime(item.timestamp)}</span>
                </div>
              </div>
              <p className="item-preview">{item.message.slice(0, 70)}{item.message.length > 70 ? '…' : ''}</p>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
