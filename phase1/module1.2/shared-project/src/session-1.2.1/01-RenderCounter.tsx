// 01-RenderCounter.tsx

// TODO: Uncomment imports khi bạn implement
import { useState, useRef, useEffect } from 'react'

/**
 * EXERCISE 1: Render Counter
 *
 * 🎯 MỤC TIÊU:
 * Hiểu khi nào component re-render và cách đếm số lần render.
 *
 * 📋 YÊU CẦU:
 * 1. Tạo state `count` (number) để lưu giá trị counter
 * 2. Tạo ref `renderCount` để đếm số lần component render
 * 3. Dùng useEffect để tăng renderCount và log mỗi lần render
 * 4. Button "Increment Count" → tăng count state → trigger re-render
 * 5. Button "Do Nothing" → chỉ console.log → KHÔNG trigger re-render
 *
 * 🔍 QUAN SÁT:
 * - Click "Increment Count" → render count TĂNG
 * - Click "Do Nothing" → render count KHÔNG ĐỔI
 * - Mở Console để xem log mỗi lần render
 *
 * 💡 GỢI Ý:
 * - Dùng useRef<number>(0) để tạo render counter
 * - useEffect không có dependency array → chạy sau MỌI render
 * - setState trigger re-render, console.log thì KHÔNG
 *
 * ⚠️ LƯU Ý:
 * - Trong StrictMode (development), component render 2 lần!
 * - Đây là behavior bình thường, không phải bug
 */

function RenderCounter() {
  // TODO 1: Tạo state cho count (number), khởi tạo = 0
  const [count, setCount] = useState(0) // ← Uncomment và sửa

  // TODO 2: Tạo ref để đếm số lần render
  // Hint: useRef<number>(0)
  const renderCount = useRef(0) // ← Uncomment và sửa

  // TODO 3: useEffect để log và tăng render count mỗi lần render
  // Hint: Không có dependency array = chạy sau mọi render
  useEffect(() => {
    // ← Viết code ở đây
    // renderCount.current += 1
    // console.log('Rendered!')
  })

  // TODO 4: Handler cho button "Increment Count"
  // Hint: Dùng setCount để tăng count
  const handleIncrement = () => {
    // ← Viết code ở đây: setCount(...)
    void count // Xóa dòng này khi implement
    void setCount // Xóa dòng này khi implement
  }

  // TODO 5: Handler cho button "Do Nothing"
  // Hint: Chỉ console.log, KHÔNG gọi setState
  const handleDoNothing = () => {
    // ← Viết code ở đây: console.log(...)
  }

  return (
    <div className="section">
      <h2 className="section-title">Exercise 1: Render Counter</h2>

      <div className="card">
        <div className="card-body">
          {/* TODO 6: Hiển thị render count */}
          {/* Thay ??? bằng renderCount.current */}
          <p>
            <strong>Render Count:</strong>{' '}
            <span className="render-count">
              {renderCount.current /* ← Sửa ở đây */}
            </span>
          </p>

          {/* TODO 7: Hiển thị current count state */}
          {/* Thay ??? bằng count */}
          <p className="mt-10">
            <strong>Current Count:</strong>{' '}
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {0 /* ← Thay bằng count */}
            </span>
          </p>

          <div className="flex gap-10 mt-20">
            {/* TODO 8: Button Increment Count */}
            <button
              className="btn btn-primary"
              onClick={handleIncrement}
            >
              Increment Count
            </button>

            {/* TODO 9: Button Do Nothing */}
            <button
              className="btn btn-secondary"
              onClick={handleDoNothing}
            >
              Do Nothing
            </button>
          </div>
        </div>

        <div className="card-footer">
          <strong>Mở Console (F12)</strong> để xem log mỗi lần render
        </div>
      </div>

      {/* Instruction box */}
      <div className="card" style={{ marginTop: '20px', background: '#f0f7ff' }}>
        <div className="card-body">
          <h4>📝 Hướng dẫn:</h4>
          <ol style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Click "Increment Count" → Quan sát render count tăng</li>
            <li>Click "Do Nothing" → Render count KHÔNG đổi</li>
            <li>Mở Console để xem log chi tiết</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default RenderCounter
