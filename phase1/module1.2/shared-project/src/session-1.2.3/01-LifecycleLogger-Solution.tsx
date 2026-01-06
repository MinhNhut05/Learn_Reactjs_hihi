// ============================================================
// Exercise 1: Lifecycle Logger - SOLUTION
// ============================================================

import { useState, useEffect } from 'react'

function LifecycleChild({ name }: { name: string }) {
  const [count, setCount] = useState(0)

  // Effect 1: Mount/Unmount - chỉ chạy một lần
  useEffect(() => {
    console.log(`🟢 ${name} MOUNTED`)

    return () => {
      console.log(`🔴 ${name} UNMOUNTED`)
    }
  }, [name]) // name trong deps vì dùng trong effect

  // Effect 2: Count Updates - chạy khi count thay đổi
  useEffect(() => {
    console.log(`🔄 ${name} count: ${count}`)
  }, [count, name])

  return (
    <div style={{ padding: '20px', border: '2px solid #3b82f6', borderRadius: '8px', marginTop: '10px' }}>
      <h3>{name}</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  )
}

export default function LifecycleLoggerSolution() {
  const [showChild, setShowChild] = useState(true)

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Lifecycle Logger - Solution</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        👀 Mở Console (F12) để xem lifecycle logs
      </p>

      <button
        onClick={() => setShowChild(prev => !prev)}
        style={{
          padding: '10px 20px',
          backgroundColor: showChild ? '#ef4444' : '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {showChild ? 'Hide Child (Unmount)' : 'Show Child (Mount)'}
      </button>

      {showChild && <LifecycleChild name="MyComponent" />}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d1fae5', borderRadius: '8px' }}>
        <h4>✅ Solution Notes:</h4>
        <ul style={{ fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
          <li><strong>Effect 1:</strong> Empty deps [] + cleanup → log mount/unmount</li>
          <li><strong>Effect 2:</strong> [count] dep → log mỗi khi count thay đổi</li>
          <li><strong>Lưu ý:</strong> name cũng nên trong deps vì dùng trong effect</li>
        </ul>
      </div>
    </div>
  )
}
