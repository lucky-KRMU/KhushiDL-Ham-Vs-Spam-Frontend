import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header.jsx'
import ClassifierCard from './components/ClassifierCard.jsx'
import ResultCard from './components/ResultCard.jsx'
import HistoryPanel from './components/HistoryPanel.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('khushiTheme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [message, setMessage] = useState('')
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('khushiHistory') || '[]') }
    catch { return [] }
  })
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('khushiTheme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('khushiHistory', JSON.stringify(history.slice(0, 50)))
  }, [history])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  const classify = useCallback(async (text) => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `Server error ${res.status}`)
      }
      const data = await res.json()
      setResult(data)
      setHistory(prev => {
        const entry = { ...data, timestamp: new Date().toISOString(), id: Date.now() }
        const filtered = prev.filter(h => h.message !== data.message)
        return [entry, ...filtered].slice(0, 50)
      })
    } catch (err) {
      setError(err.message || 'Failed to connect. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem('khushiHistory')
  }, [])

  const replayHistory = useCallback((item) => {
    setMessage(item.message)
    setResult(item)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="app-root" style={{ position: 'relative', zIndex: 1 }}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-wrap">
        {/* ── Hero ── */}
        <section className="hero-section">
          <p className="issue-label">Deep Learning · Text Classification</p>
          <h1 className="hero-title">
            <span className="hero-title-top">Ham <em>V/s</em> Spam</span>
          </h1>
          <p className="hero-byline">
            Feed a message. The oracle decides.
          </p>
          <div className="ornament" style={{ maxWidth: '320px', margin: '0 auto' }}>✦</div>
        </section>

        {/* ── Classifier Form ── */}
        <section className="form-section">
          <ClassifierCard
            message={message}
            onMessageChange={setMessage}
            onClassify={classify}
            loading={loading}
          />
        </section>

        {/* ── Result ── */}
        {(result || error) && (
          <section className="result-section">
            <ResultCard result={result} error={error} />
          </section>
        )}

        {/* ── History toggle ── */}
        {history.length > 0 && (
          <section className="history-section">
            <button
              className="history-toggle-btn"
              onClick={() => setShowHistory(v => !v)}
            >
              <span>{showHistory ? '↑ Hide' : '↓ Show'} History</span>
              <span className="history-count-pill">{history.length}</span>
            </button>

            {showHistory && (
              <HistoryPanel
                history={history}
                onReplay={replayHistory}
                onClear={clearHistory}
              />
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
