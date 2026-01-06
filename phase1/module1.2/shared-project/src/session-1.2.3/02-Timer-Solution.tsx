// ============================================================
// Exercise 2: Timer with Cleanup - SOLUTION
// ============================================================

import { useState, useEffect } from 'react'

const INITIAL_TIME = 10

export default function TimerSolution() {
  const [seconds, setSeconds] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(false)

  // Timer Effect với proper cleanup
  useEffect(() => {
    // Early return nếu không running hoặc đã hết giờ
    if (!isRunning || seconds <= 0) return

    const intervalId = setInterval(() => {
      setSeconds(s => s - 1)
    }, 1000)

    // Cleanup: clear interval khi deps thay đổi hoặc unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning, seconds])

  // Auto stop when reaches 0
  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false)
    }
  }, [seconds])

  const handleStartStop = () => {
    setIsRunning(prev => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(INITIAL_TIME)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Countdown Timer - Solution</h2>

      <div style={{
        fontSize: '72px',
        fontWeight: 'bold',
        color: seconds <= 3 ? '#ef4444' : '#3b82f6',
        margin: '30px 0'
      }}>
        {seconds}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={handleStartStop}
          disabled={seconds === 0 && !isRunning}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: isRunning ? '#f59e0b' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: seconds === 0 && !isRunning ? 'not-allowed' : 'pointer',
            opacity: seconds === 0 && !isRunning ? 0.5 : 1
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#d1fae5',
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>✅ Solution Notes:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
          <li><strong>Early return:</strong> Không setup interval nếu !isRunning hoặc seconds {'<='} 0</li>
          <li><strong>Cleanup:</strong> clearInterval để tránh memory leaks</li>
          <li><strong>Dependencies:</strong> [isRunning, seconds] để re-setup khi thay đổi</li>
          <li><strong>Auto stop:</strong> Separate effect để stop khi seconds === 0</li>
        </ul>
      </div>
    </div>
  )
}
