// 📚 EXERCISE 3: Interactive Counter với Global Keyboard Events
// 🎯 Đọc PART 3 trong COMPLETE_THEORY.md trước khi code!

import { MouseEvent, useEffect, useState } from "react";

function InteractiveCounter() {
  const [count, setCount] = useState<number>(0);

  // TODO 1: Tạo count state
  // - Type: number
  // - Initial value: 0
  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev + 1);
  };
  // TODO 2: Tạo handleIncrement
  // - Type: MouseEvent<HTMLButtonElement>
  // - Increment count với setCount(prev => prev + 1)
  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev - 1);
  };
  // TODO 3: Tạo handleDecrement
  // - Type: MouseEvent<HTMLButtonElement>
  // - Decrement count với setCount(prev => prev - 1)
  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(0);
  };
  // TODO 4: Tạo handleReset
  // - Type: MouseEvent<HTMLButtonElement>
  // - Reset count về 0
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setCount((prev) => prev + 1);
      }
      if (e.key === "-" || e.key === "_") {
        setCount((prev) => prev - 1);
      }
      if (e.key === "r" || e.key === "R") {
        setCount(0);
      }
      if (e.ctrlKey && e.key === "ArrowUp") {
        e.preventDefault();
        setCount((prev) => prev + 10);
      }
      if (e.ctrlKey && e.key === "ArrowDown") {
        e.preventDefault();
        setCount((prev) => prev - 10);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // TODO 5: Tạo useEffect cho global keyboard shortcuts
  // - Tạo handleKeyDown function bên trong useEffect
  //   - Type: KeyboardEvent (NATIVE DOM TYPE, không import từ React)
  //   - Check e.key === '+' hoặc '=' → increment
  //   - Check e.key === '-' → decrement
  //   - Check e.key === 'r' hoặc 'R' → reset
  //
  // - Add event listener: window.addEventListener('keydown', handleKeyDown)
  //
  // - Return cleanup function:
  //   - window.removeEventListener('keydown', handleKeyDown)
  //
  // - Dependencies: [] (empty array)

  // BONUS TODO 6: (Optional) Advanced shortcuts
  // - Ctrl + ArrowUp → +10
  // - Ctrl + ArrowDown → -10
  // - Hint: Check e.ctrlKey && e.key === 'ArrowUp'
  // - Hint: e.preventDefault() để prevent scroll

  return (
    <div className="interactive-counter">
      <h2>Interactive Counter</h2>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</div>
      {/* TODO 7: Display count
          - Hiển thị count trong <div> với style lớn
      */}

      <div className="buttons">
        <button onClick={handleIncrement}>+ Increment</button>
        {/* TODO 8: Increment button
            - onClick={handleIncrement}
            - text: "+ Increment"
        */}

        <button onClick={handleDecrement}>- Decrement</button>

        {/* TODO 9: Decrement button
            - onClick={handleDecrement}
            - text: "- Decrement"
        */}

        <button onClick={handleReset}>Reset</button>
        {/* TODO 10: Reset button
            - onClick={handleReset}
            - text: "Reset"
        */}
      </div>

      {/* Info */}
      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <h3>Keyboard Shortcuts:</h3>
        <ul>
          <li>
            <kbd>+</kbd> or <kbd>=</kbd> - Increment (+1)
          </li>
          <li>
            <kbd>-</kbd> - Decrement (-1)
          </li>
          <li>
            <kbd>r</kbd> or <kbd>R</kbd> - Reset to 0
          </li>
          <li>
            (Bonus) <kbd>Ctrl</kbd> + <kbd>↑</kbd> - Increment by 10
          </li>
          <li>
            (Bonus) <kbd>Ctrl</kbd> + <kbd>↓</kbd> - Decrement by 10
          </li>
        </ul>
        <p>
          <strong>Try:</strong>
        </p>
        <ul>
          <li>Click buttons to change count</li>
          <li>Press + or = to increment</li>
          <li>Press - to decrement</li>
          <li>Press r to reset</li>
          <li>(Bonus) Press Ctrl + Arrow keys</li>
        </ul>
      </div>
    </div>
  );
}

export default InteractiveCounter;
