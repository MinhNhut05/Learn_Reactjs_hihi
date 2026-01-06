/**
 * Exercise 1: useRef Basics
 * Difficulty: Medium
 *
 * LEARNING GOALS:
 * - Hieu useRef syntax: useRef<Type>(initialValue)
 * - Access DOM elements voi ref
 * - Gan ref vao JSX element
 * - Null check voi optional chaining
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 * Moi cho co hint (<-) de huong dan
 */

import { useRef } from "react";

export default function UseRefBasics() {
  // ========================================
  // PART A: Focus Input
  // ========================================

  // TODO 1: Tao ref de access input element
  // Hint: useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null); // <- useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    // TODO 2: Focus vao input element
    // Hint: Dung optional chaining de null check: inputRef.current?.focus()
    inputRef.current?.focus(); // <- inputRef.current?.focus()
  };

  const handleClear = () => {
    // TODO 3: Clear input value va focus
    // Hint: inputRef.current co the null, can check truoc
    if (inputRef.current) {
      // <- inputRef.current
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // ========================================
  // PART B: Scroll to Element
  // ========================================

  // TODO 4: Tao ref cho div element
  // Hint: useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null); // <- useRef<HTMLDivElement>(null)

  const scrollToBox = () => {
    // TODO 5: Scroll to box element
    // Hint: boxRef.current?.scrollIntoView({ behavior: "smooth" })
    boxRef.current?.scrollIntoView({ behavior: "smooth" }); // <- boxRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="exercise-container">
      <h2>Exercise 1: useRef Basics</h2>

      {/* Part A: Focus Input */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
        }}
      >
        <h3>Part A: Focus & Clear Input</h3>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {/* TODO 6: Attach ref to input */}
          <input
            ref={inputRef} // <- inputRef
            type="text"
            placeholder="Click buttons to interact..."
            style={{ padding: "0.5rem", flex: 1 }}
          />
          <button onClick={handleFocus}>Focus</button>
          <button onClick={handleClear}>Clear</button>
        </div>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          Click "Focus" to focus input, "Clear" to clear and focus
        </p>
      </section>

      {/* Part B: Scroll to Element */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
        }}
      >
        <h3>Part B: Scroll to Element</h3>
        <button onClick={scrollToBox} style={{ marginBottom: "1rem" }}>
          Scroll to Purple Box
        </button>

        {/* Spacer to make scrolling visible */}
        <div
          style={{
            height: "300px",
            background: "#f0f0f0",
            marginBottom: "1rem",
          }}
        >
          <p style={{ padding: "1rem" }}>
            Scroll down to see the purple box...
          </p>
        </div>

        {/* TODO 7: Attach ref to target div */}
        <div
          ref={boxRef} // <- boxRef
          style={{
            height: "100px",
            background: "#9C27B0",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          Target Box - You scrolled here!
        </div>
      </section>

      {/* Hints Section */}
      <section
        style={{
          padding: "1rem",
          background: "#e8f5e9",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
        <h3>Hints:</h3>
        <ul>
          <li>
            <strong>useRef syntax:</strong>{" "}
            <code>useRef&lt;Type&gt;(initialValue)</code>
          </li>
          <li>
            <strong>DOM types:</strong> HTMLInputElement, HTMLDivElement,
            HTMLButtonElement
          </li>
          <li>
            <strong>Initial value:</strong> <code>null</code> for DOM refs
          </li>
          <li>
            <strong>Access value:</strong> <code>ref.current</code>
          </li>
          <li>
            <strong>Null check:</strong> <code>ref.current?.method()</code> hoac{" "}
            <code>if (ref.current)</code>
          </li>
          <li>
            <strong>Attach to element:</strong>{" "}
            <code>&lt;element ref={"{refName}"} /&gt;</code>
          </li>
        </ul>
      </section>
    </div>
  );
}
