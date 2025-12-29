import { MouseEvent, useEffect, useState } from "react";

function InteractiveCounter() {
  const [count, setCount] = useState<number>(0);

  // Button handlers
  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev - 1);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(0);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Increment
      if (e.key === "+" || e.key === "=") {
        setCount((prev) => prev + 1);
      }

      // Decrement
      if (e.key === "-" || e.key === "_") {
        setCount((prev) => prev - 1);
      }

      // Reset
      if (e.key === "r" || e.key === "R") {
        setCount(0);
      }

      // Special: Ctrl + Up Arrow = +10
      if (e.ctrlKey && e.key === "ArrowUp") {
        e.preventDefault(); // Prevent scroll
        setCount((prev) => prev + 10);
      }

      // Special: Ctrl + Down Arrow = -10
      if (e.ctrlKey && e.key === "ArrowDown") {
        e.preventDefault(); // Prevent scroll
        setCount((prev) => prev - 10);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="interactive-counter">
      <h2>Interactive Counter</h2>
      <div className="count-display">
        <span className="count">{count}</span>
      </div>

      <div className="buttons">
        <button onClick={handleIncrement}>+ Increment</button>
        <button onClick={handleDecrement}>- Decrement</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="shortcuts-info">
        <h3>Keyboard Shortcuts:</h3>
        <ul>
          <li>
            <kbd>+</kbd> or <kbd>=</kbd> - Increment
          </li>
          <li>
            <kbd>-</kbd> - Decrement
          </li>
          <li>
            <kbd>r</kbd> or <kbd>R</kbd> - Reset
          </li>
          <li>
            <kbd>Ctrl</kbd> + <kbd>↑</kbd> - +10
          </li>
          <li>
            <kbd>Ctrl</kbd> + <kbd>↓</kbd> - -10
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InteractiveCounter;
