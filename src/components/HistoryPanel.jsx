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
    <div className="ledger-wrap">
      {/* Ledger Header & Ledger Stats */}
      <div className="ledger-summary">
        <div className="ledger-stat">
          <span className="ledger-stat-val font-mono">{total}</span>
          <span className="ledger-stat-lbl">Classified</span>
        </div>
        <div className="ledger-stat-sep">/</div>
        <div className="ledger-stat">
          <span className="ledger-stat-val font-mono ledger-ham-val">{hamCount}</span>
          <span className="ledger-stat-lbl">Ham</span>
        </div>
        <div className="ledger-stat-sep">/</div>
        <div className="ledger-stat">
          <span className="ledger-stat-val font-mono ledger-spam-val">{spamCount}</span>
          <span className="ledger-stat-lbl">Spam</span>
        </div>
        <div className="ledger-stat-sep">/</div>
        <div className="ledger-stat">
          <span className="ledger-stat-val font-mono">{spamRate}%</span>
          <span className="ledger-stat-lbl">Spam Rate</span>
        </div>
      </div>

      {/* Filter and Clear controls */}
      <div className="ledger-toolbar">
        <div className="ledger-tabs">
          {['all', 'Ham', 'Spam'].map(f => (
            <button
              key={f}
              className={`ledger-tab ${filter === f ? 'tab-selected' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Records' : f}
            </button>
          ))}
        </div>

        <button
          className="ledger-clear-btn"
          onClick={onClear}
          title="Clear all stored logs"
        >
          Clear Ledger
        </button>
      </div>

      {/* Ledger list */}
      <div className="ledger-records">
        {filtered.length === 0 ? (
          <p className="ledger-empty">No logged entries found under this filter.</p>
        ) : (
          filtered.map(item => (
            <button
              key={item.id}
              className={`ledger-row ${item.label === 'Spam' ? 'row-spam' : 'row-ham'}`}
              onClick={() => onReplay(item)}
              title="Click to inspect this record"
            >
              <div className="row-meta">
                <span className={`row-tag ${item.label === 'Spam' ? 'tag-spam' : 'tag-ham'}`}>
                  {item.label}
                </span>
                <span className="row-certainty font-mono">
                  {Math.round(item.confidence * 100)}%
                </span>
                <span className="row-time font-mono">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
              <p className="row-text">
                {item.message.length > 90 ? item.message.slice(0, 90) + '…' : item.message}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
