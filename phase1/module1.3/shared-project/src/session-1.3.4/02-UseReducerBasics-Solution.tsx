/**
 * Exercise 2: useReducer Basics - Counter with Complex Actions (SOLUTION)
 *
 * COMPLETED VERSION with explanations
 */

import { useReducer } from "react";

// ============================================================
// STEP 1: STATE TYPE DEFINITION
// ============================================================

interface CounterState {
  count: number;
  step: number;      // Buoc nhay khi increment/decrement
  history: number[]; // Luu lai cac gia tri truoc
}

// ============================================================
// STEP 2: ACTION TYPES (Discriminated Union)
// ============================================================

// Discriminated Union cho type-safety
// TypeScript se biet chinh xac payload type trong moi case
type CounterAction =
  | { type: "INCREMENT" }             // Khong can payload
  | { type: "DECREMENT" }             // Khong can payload
  | { type: "RESET" }                 // Khong can payload
  | { type: "SET"; payload: number }  // Payload la number
  | { type: "SET_STEP"; payload: number };

// ============================================================
// STEP 3: INITIAL STATE
// ============================================================

const initialState: CounterState = {
  count: 0,
  step: 1,
  history: [],
};

// ============================================================
// STEP 4: REDUCER FUNCTION
// ============================================================

// Reducer la PURE FUNCTION: (state, action) => newState
// Khong side effects, khong mutate state, luon return new object
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  // switch on action.type de handle tung case
  switch (action.type) {
    case "INCREMENT":
      // Return new object voi count duoc tang
      // Luu count cu vao history truoc khi thay doi
      return {
        ...state,  // Copy tat ca properties
        count: state.count + state.step,
        history: [...state.history, state.count],  // Append to history
      };

    case "DECREMENT":
      // Tuong tu INCREMENT nhung giam count
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count],
      };

    case "RESET":
      // Reset ve trang thai ban dau
      // Co the return initialState truc tiep
      return initialState;

    case "SET":
      // Set count = gia tri tu payload
      // TypeScript biet action.payload la number trong case nay
      return {
        ...state,
        count: action.payload,
        history: [...state.history, state.count],
      };

    case "SET_STEP":
      // Thay doi step size
      return {
        ...state,
        step: action.payload,
      };

    default:
      // Default case - return state khong thay doi
      // TypeScript dam bao tat ca cases da duoc handle
      return state;
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function UseReducerBasicsSolution() {
  // useReducer(reducer, initialState) returns [state, dispatch]
  // - state: gia tri hien tai
  // - dispatch: function de gui actions
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 2: useReducer Basics - Counter with Actions (Solution)</h2>

      <div
        style={{
          backgroundColor: "#e8f5e9",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Key Concepts:</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>
            <strong>Reducer</strong> - Pure function: (state, action) => newState
          </li>
          <li>
            <strong>Actions</strong> - Objects voi type va optional payload
          </li>
          <li>
            <strong>Dispatch</strong> - Function de gui actions den reducer
          </li>
          <li>
            <strong>Immutability</strong> - Luon return new object, khong mutate
          </li>
        </ul>
      </div>

      {/* Counter Display */}
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#e3f2fd",
          borderRadius: "12px",
          marginBottom: "1rem",
        }}
      >
        <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#1565c0" }}>
          {state.count}
        </div>
        <div style={{ color: "#666", marginTop: "0.5rem" }}>
          Step: {state.step}
        </div>
      </div>

      {/* Control Buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        {/* dispatch gui action object den reducer */}
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Increment
        </button>

        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          - Decrement
        </button>

        <button
          onClick={() => dispatch({ type: "RESET" })}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#9e9e9e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* Set Value - Action voi payload */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={() => dispatch({ type: "SET", payload: 100 })}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#673ab7",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Set to 100
        </button>
        <button
          onClick={() => dispatch({ type: "SET", payload: -50 })}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#673ab7",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Set to -50
        </button>
      </div>

      {/* Step Size Control */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <label>Step Size:</label>
        <select
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
          }
          style={{ padding: "0.5rem", borderRadius: "4px" }}
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* History */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fff8e1",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>History:</h4>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {state.history.length === 0 ? (
            <span style={{ color: "#999" }}>No history yet</span>
          ) : (
            state.history.map((value, index) => (
              <span
                key={index}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                {value}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Pattern Summary */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f3e5f5",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Pattern Summary:</h4>
        <pre
          style={{
            backgroundColor: "#263238",
            color: "#ce93d8",
            padding: "1rem",
            borderRadius: "8px",
            overflow: "auto",
            margin: 0,
          }}
        >
{`// 1. DEFINE State type
interface State { count: number; /* ... */ }

// 2. DEFINE Action types (Discriminated Union)
type Action =
  | { type: "INCREMENT" }
  | { type: "SET"; payload: number };

// 3. CREATE Reducer (pure function)
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "SET":
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

// 4. USE in component
const [state, dispatch] = useReducer(reducer, initialState);

// 5. DISPATCH actions
dispatch({ type: "INCREMENT" });
dispatch({ type: "SET", payload: 100 });`}
        </pre>
      </div>
    </div>
  );
}
