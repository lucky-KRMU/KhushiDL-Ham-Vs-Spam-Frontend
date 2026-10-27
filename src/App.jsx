import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header.jsx'
import ClassifierCard from './components/ClassifierCard.jsx'
import ResultCard from './components/ResultCard.jsx'
import HistoryPanel from './components/HistoryPanel.jsx'
import StatsBar from './components/StatsBar.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hvsTheme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [message, setMessage] = useState('')
  const [result, setResult]   = useState(null)   // { label, confidence, message }
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hvsHistory') || '[]')
    } catch {
      return []
    }
  })

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('hvsTheme', theme)
  }, [theme])

  // Persist history
  useEffect(() => {
    localStorage.setItem('hvsHistory', JSON.stringify(history.slice(0, 50)))
  }, [history])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }, [])

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

      // Add to history (prepend, deduplicate by message)
      setHistory(prev => {
        const entry = { ...data, timestamp: new Date().toISOString(), id: Date.now() }
        const filtered = prev.filter(h => h.message !== data.message)
        return [entry, ...filtered].slice(0, 50)
      })
    } catch (err) {
      setError(err.message || 'Failed to connect to the API. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem('hvsHistory')
  }, [])

  const replayHistory = useCallback((item) => {
    setMessage(item.message)
    setResult(item)
    setError(null)
  }, [])

  // Derived stats
  const stats = {
    total: history.length,
    spam: history.filter(h => h.label === 'Spam').length,
    ham:  history.filter(h => h.label === 'Ham').length,
  }

  return (
    <div className="app-root">
      {/* Ambient background */}
      <div className="bg-ambient" aria-hidden="true">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-content">
        <section className="hero">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Detection
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Ham vs Spam</span>
            <br />
            Message Classifier
          </h1>
          <p className="hero-subtitle">
            Instantly detect whether a message is legitimate or spam using
            our state-of-the-art deep learning model.
          </p>
        </section>

        <div className="content-grid">
          <div className="primary-column">
            <ClassifierCard
              message={message}
              onMessageChange={setMessage}
              onClassify={classify}
              loading={loading}
            />

            {(result || error) && (
              <ResultCard result={result} error={error} />
            )}

            {history.length > 0 && (
              <StatsBar stats={stats} />
            )}
          </div>

          {history.length > 0 && (
            <div className="secondary-column">
              <HistoryPanel
                history={history}
                onReplay={replayHistory}
                onClear={clearHistory}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
