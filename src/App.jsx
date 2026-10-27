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
    try {
      return JSON.parse(localStorage.getItem('khushiHistory') || '[]')
    } catch {
      return []
    }
  })
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('khushiTheme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('khushiHistory', JSON.stringify(history.slice(0, 50)))
  }, [history])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const classify = useCallback(async (text) => {
    if (!text || !text.trim()) return
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
        throw new Error(body.detail || `Server responded with ${res.status}`)
      }

      const data = await res.json()
      setResult(data)

      setHistory(prev => {
        const entry = { ...data, timestamp: new Date().toISOString(), id: Date.now() }
        const filtered = prev.filter(h => h.message !== data.message)
        return [entry, ...filtered].slice(0, 50)
      })
    } catch (err) {
      setError(err.message || 'Could not reach backend API. Ensure the service is active.')
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
    <div className="claude-app">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="claude-main">
        {/* Clean Claude-style Hero Header (no decorative stars or icons) */}
        <section className="claude-hero">
          <h1 className="claude-title font-serif">
            KhushiDL <span className="title-accent">Ham V/s Spam</span>
          </h1>
          <p className="claude-subtitle font-sans">
            Verify communications with deep neural language classification. Paste any SMS, text, or email below.
          </p>
        </section>

        {/* Claude Prompt / Classifier Card */}
        <section className="claude-prompt-section">
          <ClassifierCard
            message={message}
            onMessageChange={setMessage}
            onClassify={classify}
            loading={loading}
          />
        </section>

        {/* Result view */}
        {(result || error) && (
          <section className="claude-result-section">
            <ResultCard result={result} error={error} />
          </section>
        )}

        {/* History drawer toggle */}
        {history.length > 0 && (
          <section className="claude-history-section">
            <div className="history-header-bar">
              <button
                className="claude-history-toggle"
                onClick={() => setShowHistory(v => !v)}
              >
                <span className="font-sans">
                  {showHistory ? 'Hide Recent Verifications' : 'Show Recent Verifications'}
                </span>
                <span className="history-pill font-mono">{history.length}</span>
              </button>
            </div>

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
