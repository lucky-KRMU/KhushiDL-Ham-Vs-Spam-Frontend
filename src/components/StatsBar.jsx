import './StatsBar.css'

export default function StatsBar({ stats }) {
  const spamPct = stats.total > 0 ? Math.round((stats.spam / stats.total) * 100) : 0

  return (
    <div className="stats-bar card">
      <div className="stat-item">
        <span className="stat-number">{stats.total}</span>
        <span className="stat-label">Total Analyzed</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-number stat-ham">{stats.ham}</span>
        <span className="stat-label">Ham</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-number stat-spam">{stats.spam}</span>
        <span className="stat-label">Spam</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item stat-wide">
        <span className="stat-label stat-label-inline">Spam Rate</span>
        <div className="mini-bar-track">
          <div
            className="mini-bar-fill"
            style={{ width: `${spamPct}%` }}
          />
        </div>
        <span className="stat-pct">{spamPct}%</span>
      </div>
    </div>
  )
}
