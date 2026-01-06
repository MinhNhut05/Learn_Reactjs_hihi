// Test code here
import { useState, useRef, useEffect } from "react";

export default function RenderCounterExample() {
  // State - thay đổi state sẽ trigger re-render
  const [count, setCount] = useState(0);

  // Ref - KHÔNG trigger re-render khi thay đổi
  // Đây là lý do chúng ta dùng ref để đếm renders
  const renderCount = useRef(0);

  // useEffect chạy SAU mỗi render
  // Không có dependency array → chạy sau MỌI render
  useEffect(() => {
    renderCount.current += 1;
    console.log(`🔄 Component rendered! Count: ${renderCount.current}`);
  });

  // Handler thay đổi state → trigger re-render
  const handleIncrement = () => {
    setCount((prev) => prev + 1); // State change → Re-render!
  };

  // Handler KHÔNG thay đổi state → KHÔNG re-render
  const handleDoNothing = () => {
    console.log("Button clicked, but no state change!");
    // Không có setState → Không có re-render
  };

  return (
    <div>
      <p>Render count: {renderCount.current}</p>
      <p>Current count: {count}</p>
      <button onClick={handleIncrement}>Increment (triggers re-render)</button>
      <button onClick={handleDoNothing}>Do Nothing (no re-render)</button>
    </div>
  );
}
