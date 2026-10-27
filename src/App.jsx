import { useState, useEffect, useCallback, useRef } from 'react'
import Header from './components/Header.jsx'
import ClassifierCard from './components/ClassifierCard.jsx'
import ResultCard from './components/ResultCard.jsx'
import HistoryPanel from './components/HistoryPanel.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

const API_BASE = (import.meta.env.VITE_API_URL || 'https://khushidl-ham-vs-spam-backend.onrender.com').replace(/\/+$/, '')

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('khushiTheme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [message, setMessage]       = useState('')
  const [result, setResult]         = useState(null)
  const [loading, setLoading]       = useState(false)
  const [isWakingUp, setIsWakingUp] = useState(false)
  const [error, setError]           = useState(null)
  const [serverStatus, setServerStatus] = useState('checking') // 'online' | 'waking' | 'checking' | 'offline'

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('khushiHistory') || '[]')
    } catch {
      return []
    }
  })
  const [showHistory, setShowHistory] = useState(false)

  // Save theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('khushiTheme', theme)
  }, [theme])

  // Save history
  useEffect(() => {
    localStorage.setItem('khushiHistory', JSON.stringify(history.slice(0, 50)))
  }, [history])

  // Pre-warm & ping the Render backend immediately on page load
  useEffect(() => {
    let active = true

    const pingBackend = async () => {
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => {
          if (active) setServerStatus('waking')
        }, 2200)

        const res = await fetch(`${API_BASE}/health`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' },
        })
        clearTimeout(timer)

        if (active) {
          if (res.ok) {
            setServerStatus('online')
          } else {
            setServerStatus('waking')
          }
        }
      } catch (err) {
        if (active) setServerStatus('waking')
      }
    }

    pingBackend()

    // Ping every 5 minutes to keep free Render service warm while tab is active
    const interval = setInterval(pingBackend, 5 * 60 * 1000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  // Classify with cold-start detection and auto-retry
  const classify = useCallback(async (text, retryCount = 0) => {
    if (!text || !text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    setIsWakingUp(false)

    // Flag cold start notice if request exceeds 2.5s
    const wakingTimer = setTimeout(() => {
      setIsWakingUp(true)
      setServerStatus('waking')
    }, 2500)

    const controller = new AbortController()
    const abortTimeout = setTimeout(() => controller.abort(), 75000) // 75s timeout for cold start

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      })

      clearTimeout(wakingTimer)
      clearTimeout(abortTimeout)
      setIsWakingUp(false)

      if (res.status === 502 || res.status === 503) {
        // Render instance starting up
        if (retryCount < 2) {
          setIsWakingUp(true)
          setServerStatus('waking')
          await new Promise(r => setTimeout(r, 3000))
          return classify(text, retryCount + 1)
        }
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `Server error (${res.status})`)
      }

      const data = await res.json()
      setResult(data)
      setServerStatus('online')

      setHistory(prev => {
        const entry = { ...data, timestamp: new Date().toISOString(), id: Date.now() }
        const filtered = prev.filter(h => h.message !== data.message)
        return [entry, ...filtered].slice(0, 50)
      })
    } catch (err) {
      clearTimeout(wakingTimer)
      clearTimeout(abortTimeout)
      setIsWakingUp(false)

      if (err.name === 'AbortError') {
        setError('The cloud server on Render took too long to respond. It may still be booting up—please try again in a few seconds.')
      } else {
        setError(
          err.message?.includes('Failed to fetch')
            ? 'Unable to connect to Render cloud. The instance may be waking up from sleep. Please try once more in 10-15 seconds.'
            : (err.message || 'Error occurred while classifying the message.')
        )
      }
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
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        serverStatus={serverStatus}
      />

      <main className="claude-main">
        {/* Clean Claude-style Hero Header */}
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
            isWakingUp={isWakingUp}
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
