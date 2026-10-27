import { useState } from 'react'
import './HistoryPanel.css'

function formatTimestamp(isoStr) {
  const d = new Date(isoStr)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function HistoryPanel({ history, onReplay, onClear }) {
  const [filter, setFilter] = useState('all')

  const total = history.length
  const spamCount = history.filter(h => h.label === 'Spam').length
  const hamCount = history.filter(h => h.label === 'Ham').length
  const spamRate = total > 0 ? Math.round((spamCount / total) * 100) : 0

  const filtered = history.filter(item => {
    if (filter === 'all') return true
    return item.label === filter
  })

  return (
    <div className="claude-history-container">
      {/* Top summary metrics */}
      <div className="history-metrics-row">
        <div className="metric-box">
          <span className="metric-val font-mono">{total}</span>
          <span className="metric-label font-sans">Total Inquiries</span>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-val font-mono val-ham">{hamCount}</span>
          <span className="metric-label font-sans">Ham</span>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-val font-mono val-spam">{spamCount}</span>
          <span className="metric-label font-sans">Spam</span>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-val font-mono">{spamRate}%</span>
          <span className="metric-label font-sans">Spam Ratio</span>
        </div>
      </div>

      {/* Filter and clear controls */}
      <div className="history-controls-row">
        <div className="history-tab-group">
          {['all', 'Ham', 'Spam'].map(f => (
            <button
              key={f}
              className={`history-filter-btn font-sans ${filter === f ? 'filter-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        <button
          className="history-clear-btn font-sans"
          onClick={onClear}
        >
          Clear History
        </button>
      </div>

      {/* Record cards list */}
      <div className="history-records-list">
        {filtered.length === 0 ? (
          <p className="history-empty-message font-sans">No matching entries in history.</p>
        ) : (
          filtered.map(item => (
            <button
              key={item.id}
              className={`history-record-card ${item.label === 'Spam' ? 'record-spam' : 'record-ham'}`}
              onClick={() => onReplay(item)}
            >
              <div className="record-top-meta">
                <span className={`record-pill font-mono ${item.label === 'Spam' ? 'pill-spam' : 'pill-ham'}`}>
                  {item.label}
                </span>
                <span className="record-confidence font-mono">
                  {Math.round(item.confidence * 100)}%
                </span>
                <span className="record-time font-mono">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
              <p className="record-snippet font-sans">
                {item.message.length > 100 ? item.message.slice(0, 100) + '…' : item.message}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
