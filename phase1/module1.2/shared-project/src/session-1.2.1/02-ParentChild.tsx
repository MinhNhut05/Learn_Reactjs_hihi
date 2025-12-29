// 02-ParentChild.tsx

import { useState, useRef, useEffect } from 'react'

/**
 * EXERCISE 2: Parent-Child Re-renders
 *
 * 🎯 MỤC TIÊU:
 * Hiểu default behavior: khi Parent re-render → TẤT CẢ Children cũng re-render.
 *
 * 📋 YÊU CẦU:
 *
 * 1. PARENT COMPONENT:
 *    - State `parentCount` (number)
 *    - Ref `parentRenderCount` để đếm renders
 *    - Button "Update Parent" để tăng parentCount
 *    - Hiển thị parentCount và parentRenderCount
 *    - Render 2 children: ChildA và ChildB
 *
 * 2. CHILD A COMPONENT (nhận props):
 *    - Props: { value: number } (nhận từ parentCount)
 *    - Ref để đếm renders
 *    - Hiển thị value và render count
 *
 * 3. CHILD B COMPONENT (KHÔNG nhận props):
 *    - Không nhận bất kỳ props nào
 *    - Ref để đếm renders
 *    - Hiển thị static text và render count
 *
 * 🔍 QUAN SÁT:
 * - Click "Update Parent" → CẢ 3 components re-render!
 * - ChildB re-render DÙ không nhận props từ Parent
 * - Đây là DEFAULT behavior của React
 *
 * 💡 GỢI Ý:
 * - Mỗi component cần useRef và useEffect riêng để đếm renders
 * - Dùng console.log để dễ track thứ tự render
 */

// ===== PARENT COMPONENT =====
function ParentChild() {
  // TODO 1: Tạo state parentCount
  const [parentCount, setParentCount] = useState(0)

  // TODO 2: Tạo ref để đếm parent renders
  const parentRenderCount = useRef(0)

  // TODO 3: useEffect để log và đếm renders
  useEffect(() => {
    // ← Viết code ở đây
    // parentRenderCount.current += 1
    // console.log('👨 Parent rendered!')
  })

  // Tạm thời để tránh lỗi unused
  void parentCount
  void setParentCount

  return (
    <div className="section">
      <h2 className="section-title">Exercise 2: Parent-Child Re-renders</h2>

      {/* Parent Box */}
      <div className="component-box parent">
        <span className="component-label">👨 Parent</span>

        {/* TODO 4: Hiển thị parent state và render count */}
        <div className="flex gap-20 mb-20">
          <p>
            <strong>Parent Count:</strong>{' '}
            <span style={{ fontSize: '20px' }}>
              {0 /* ← Thay bằng parentCount */}
            </span>
          </p>
          <p>
            <strong>Parent Render Count:</strong>{' '}
            <span className="render-count">
              {parentRenderCount.current /* ← Sửa ở đây */}
            </span>
          </p>
        </div>

        {/* TODO 5: Button Update Parent */}
        <button
          className="btn btn-primary mb-20"
          onClick={() => {
            // ← Viết code: setParentCount(c => c + 1)
          }}
        >
          Update Parent State
        </button>

        {/* Children Container */}
        <div className="flex gap-20">
          {/* TODO 6: Render ChildA với props value={parentCount} */}
          {/* Uncomment dòng dưới khi ready */}
          {/* <ChildA value={parentCount} /> */}
          <div className="component-box child" style={{ flex: 1, opacity: 0.5 }}>
            <span className="component-label">👶 ChildA (chưa implement)</span>
            <p>Uncomment ChildA trong code</p>
          </div>

          {/* TODO 7: Render ChildB không có props */}
          {/* Uncomment dòng dưới khi ready */}
          {/* <ChildB /> */}
          <div className="component-box child" style={{ flex: 1, opacity: 0.5 }}>
            <span className="component-label">👶 ChildB (chưa implement)</span>
            <p>Uncomment ChildB trong code</p>
          </div>
        </div>
      </div>

      {/* Observation box */}
      <div className="card" style={{ marginTop: '20px', background: '#fff3cd' }}>
        <div className="card-body">
          <h4>👀 Quan sát:</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Click "Update Parent State"</li>
            <li>Cả 3 render counts đều tăng!</li>
            <li>ChildB re-render DÙ không nhận props</li>
            <li>Đây là <strong>default behavior</strong> của React</li>
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

export function ChildA({ value }: ChildAProps) {
  // TODO 8: Tạo ref để đếm renders
  const renderCount = useRef(0)

  // TODO 9: useEffect để log và đếm renders
  useEffect(() => {
    // ← Viết code ở đây
    // renderCount.current += 1
    // console.log('👶 ChildA rendered!')
  })

  return (
    <div className="component-box child" style={{ flex: 1 }}>
      <span className="component-label">👶 ChildA (has props)</span>

      {/* TODO 10: Hiển thị value và render count */}
      <p>
        <strong>Value from Parent:</strong>{' '}
        <span style={{ fontSize: '18px' }}>
          {value}
        </span>
      </p>
      <p className="mt-10">
        <strong>Render Count:</strong>{' '}
        <span className="render-count">
          {renderCount.current}
        </span>
      </p>
    </div>
  )
}

// ===== CHILD B - KHÔNG nhận props =====
export function ChildB() {
  // TODO 11: Tạo ref để đếm renders
  const renderCount = useRef(0)

  // TODO 12: useEffect để log và đếm renders
  useEffect(() => {
    // ← Viết code ở đây
    // renderCount.current += 1
    // console.log('👶 ChildB rendered!')
  })

  return (
    <div className="component-box child" style={{ flex: 1 }}>
      <span className="component-label">👶 ChildB (no props)</span>

      <p>
        <strong>I don't receive any props!</strong>
      </p>
      <p className="mt-10">
        <strong>Render Count:</strong>{' '}
        <span className="render-count">
          {renderCount.current}
        </span>
      </p>
      <p className="mt-10" style={{ fontSize: '12px', color: '#666' }}>
        Yet I still re-render when Parent updates... 🤔
      </p>
    </div>
  )
}

export default ParentChild
