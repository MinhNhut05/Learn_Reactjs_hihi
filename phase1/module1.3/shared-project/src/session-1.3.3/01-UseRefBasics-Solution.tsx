/**
 * Exercise 1: useRef Basics - SOLUTION
 *
 * LEARNING GOALS (Da hoan thanh):
 * ✅ Hieu useRef syntax: useRef<Type>(initialValue)
 * ✅ Access DOM elements voi ref
 * ✅ Gan ref vao JSX element
 * ✅ Null check voi optional chaining
 */

import { useRef } from "react";

export default function UseRefBasicsSolution() {
  // ========================================
  // PART A: Focus Input
  // ========================================

  /**
   * SOLUTION 1: Tao ref de access input element
   *
   * useRef<HTMLInputElement>(null)
   * - Type: HTMLInputElement - loai element can access
   * - Initial: null - chua attach vao element nao
   * - Sau khi component mount, ref.current = input element
   */
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    /**
     * SOLUTION 2: Focus vao input element
     *
     * inputRef.current?.focus()
     * - current: gia tri hien tai cua ref
     * - ?. : optional chaining - neu current la null thi khong goi focus()
     * - Tai sao can null check? Vi truoc khi mount, current = null
     */
    inputRef.current?.focus();
  };

  const handleClear = () => {
    /**
     * SOLUTION 3: Check truoc khi access properties
     *
     * if (inputRef.current) - dam bao current khong null
     * Sau do co the access value, focus() an toan
     */
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // ========================================
  // PART B: Scroll to Element
  // ========================================

  /**
   * SOLUTION 4: Tao ref cho div element
   *
   * useRef<HTMLDivElement>(null)
   * - Type: HTMLDivElement cho <div> element
   * - Cac type thuong dung khac:
   *   - HTMLButtonElement cho <button>
   *   - HTMLFormElement cho <form>
   *   - HTMLVideoElement cho <video>
   */
  const boxRef = useRef<HTMLDivElement>(null);

  const scrollToBox = () => {
    /**
     * SOLUTION 5: Scroll to box element
     *
     * scrollIntoView({ behavior: "smooth" })
     * - Method cua DOM element de scroll element vao view
     * - behavior: "smooth" tao hieu ung scroll muot ma
     * - Cac option khac: "auto" (mac dinh), "instant"
     */
    boxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="exercise-container">
      <h2>Exercise 1: useRef Basics - SOLUTION</h2>

      {/* Part A: Focus Input */}
      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #4CAF50" }}>
        <h3>Part A: Focus & Clear Input ✅</h3>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {/**
           * SOLUTION 6: Attach ref to input
           *
           * ref={inputRef}
           * - React se tu dong gan inputRef.current = DOM element nay
           * - Sau khi mount, inputRef.current chinh la <input> element
           */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Click buttons to interact..."
            style={{ padding: "0.5rem", flex: 1 }}
          />
          <button onClick={handleFocus}>Focus</button>
          <button onClick={handleClear}>Clear</button>
        </div>
        <p style={{ color: "#4CAF50", fontSize: "0.9rem" }}>
          ✅ Click "Focus" to focus input, "Clear" to clear and focus
        </p>
      </section>

      {/* Part B: Scroll to Element */}
      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #4CAF50" }}>
        <h3>Part B: Scroll to Element ✅</h3>
        <button onClick={scrollToBox} style={{ marginBottom: "1rem" }}>
          Scroll to Purple Box
        </button>

        {/* Spacer to make scrolling visible */}
        <div style={{ height: "300px", background: "#f0f0f0", marginBottom: "1rem" }}>
          <p style={{ padding: "1rem" }}>Scroll down to see the purple box...</p>
        </div>

        {/**
         * SOLUTION 7: Attach ref to target div
         *
         * ref={boxRef}
         * - Tuong tu nhu input, attach ref vao div element
         * - boxRef.current se la <div> element nay sau khi mount
         */}
        <div
          ref={boxRef}
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

      {/* Key Takeaways */}
      <section
        style={{
          padding: "1rem",
          background: "#e3f2fd",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
        <h3>Key Takeaways:</h3>
        <ol>
          <li>
            <strong>useRef syntax:</strong> <code>useRef&lt;Type&gt;(initialValue)</code>
          </li>
          <li>
            <strong>DOM refs:</strong> Initial value la <code>null</code>, type la HTMLElement type
          </li>
          <li>
            <strong>Access:</strong> <code>ref.current</code> sau khi component mount
          </li>
          <li>
            <strong>Null check:</strong> Luon check <code>ref.current</code> truoc khi access methods
          </li>
          <li>
            <strong>Attach:</strong> <code>&lt;element ref={"{refName}"} /&gt;</code>
          </li>
        </ol>
      </section>
    </div>
  );
}
