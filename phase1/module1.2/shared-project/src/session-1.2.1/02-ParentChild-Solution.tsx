// 02-ParentChild-Solution.tsx

import { useState, useRef, useEffect } from 'react'

/**
 * SOLUTION: Exercise 2 - Parent-Child Re-renders
 *
 * Đây là solution hoàn chỉnh để reference.
 * Hãy tự làm exercise trước khi xem solution!
 */

// ===== PARENT COMPONENT =====
function ParentChildSolution() {
  const [parentCount, setParentCount] = useState(0)
  const parentRenderCount = useRef(0)

  useEffect(() => {
    parentRenderCount.current += 1
    console.log('👨 Parent rendered!')
  })

  console.log('🔵 Rendering Parent...')

  return (
    <div className="section">
      <h2 className="section-title">Exercise 2: Parent-Child Re-renders (Solution)</h2>

      {/* Parent Box */}
      <div className="component-box parent">
        <span className="component-label">👨 Parent</span>

        <div className="flex gap-20 mb-20">
          <p>
            <strong>Parent Count:</strong>{' '}
            <span style={{ fontSize: '20px' }}>{parentCount}</span>
          </p>
          <p>
            <strong>Parent Render Count:</strong>{' '}
            <span className="render-count">{parentRenderCount.current}</span>
          </p>
        </div>

        <button
          className="btn btn-primary mb-20"
          onClick={() => setParentCount(c => c + 1)}
        >
          Update Parent State
        </button>

        {/* Children Container */}
        <div className="flex gap-20">
          {/* ChildA nhận props từ parent */}
          <ChildA value={parentCount} />

          {/* ChildB KHÔNG nhận props */}
          <ChildB />
        </div>
      </div>

      {/* Explanation box */}
      <div className="card" style={{ marginTop: '20px', background: '#fff3cd' }}>
        <div className="card-body">
          <h4>👀 Quan sát quan trọng:</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Khi click "Update Parent State" → <strong>CẢ 3</strong> render counts tăng</li>
            <li>ChildB re-render <strong>DÙ KHÔNG</strong> nhận bất kỳ props nào!</li>
            <li>Đây là <strong>DEFAULT behavior</strong> của React</li>
            <li>Để ngăn ChildB re-render → Cần dùng <code>React.memo</code> (Exercise 3)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ===== CHILD A - Nhận props từ Parent =====
interface ChildAProps {
  value: number
}

function ChildA({ value }: ChildAProps) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('👶 ChildA rendered!')
  })

  console.log('🟢 Rendering ChildA...')

  return (
    <div className="component-box child" style={{ flex: 1 }}>
      <span className="component-label">👶 ChildA (has props)</span>

      <p>
        <strong>Value from Parent:</strong>{' '}
        <span style={{ fontSize: '18px' }}>{value}</span>
      </p>
      <p className="mt-10">
        <strong>Render Count:</strong>{' '}
        <span className="render-count">{renderCount.current}</span>
      </p>
    </div>
  )
}

// ===== CHILD B - KHÔNG nhận props =====
function ChildB() {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('👶 ChildB rendered!')
  })

  console.log('🟡 Rendering ChildB...')

  return (
    <div className="component-box child" style={{ flex: 1 }}>
      <span className="component-label">👶 ChildB (no props)</span>

      <p>
        <strong>I don't receive any props!</strong>
      </p>
      <p className="mt-10">
        <strong>Render Count:</strong>{' '}
        <span className="render-count">{renderCount.current}</span>
      </p>
      <p className="mt-10" style={{ fontSize: '12px', color: '#666' }}>
        Yet I still re-render when Parent updates... 🤔
      </p>
    </div>
  )
}

export default ParentChildSolution
