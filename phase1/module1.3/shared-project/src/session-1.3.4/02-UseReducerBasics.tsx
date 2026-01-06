/**
 * Exercise 2: useReducer Basics - Counter with Complex Actions
 * Difficulty: Hard
 * Time: 25-30 minutes
 *
 * LEARNING GOALS:
 * - Hieu reducer pattern: (state, action) => newState
 * - Biet cach dinh nghia Action types voi TypeScript (Discriminated Unions)
 * - Biet cach viet reducer function voi switch/case
 * - Hieu dispatch function va cach goi actions
 *
 * SCENARIO:
 * Tao Counter voi nhieu actions: increment, decrement, reset,
 * set value, va adjustable step size.
 *
 * FILL-IN-THE-BLANK MODE:
 * - Dien vao cac cho ??? de hoan thanh code
 * - Moi cho can dien co <- hint de huong dan
 * - Xem Hints section o cuoi component neu can tro giup
 */

import { useReducer } from "react";

// ============================================================
// STEP 1: STATE TYPE DEFINITION
// Fill: Dinh nghia CounterState interface
// ============================================================

interface CounterState {
  count: number;
  step: number;      // Buoc nhay khi increment/decrement
  history: number[]; // Luu lai cac gia tri truoc
}

// ============================================================
// STEP 2: ACTION TYPES (Discriminated Union)
// Fill: Dinh nghia cac action types
// ============================================================

// TODO: Dinh nghia union type cho cac actions
// Hint: Moi action co "type" field, payload neu can
type CounterAction =
  | { type: "???"; }                    // <- "INCREMENT"
  | { type: "???"; }                    // <- "DECREMENT"
  | { type: "???"; }                    // <- "RESET"
  | { type: "???"; payload: number }    // <- "SET"
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
// Fill: Hoan thanh reducer logic cho moi action
// ============================================================

// TODO: Hoan thanh reducer function
// Hint: (state, action) => newState, KHONG mutate state!
function counterReducer(state: CounterState, action: CounterAction): ??? {
  //                                                                 ^CounterState
  switch (action.???) {
    //           ^type

    case "INCREMENT":
      // TODO: Tang count theo step, luu count cu vao history
      return {
        ...state,
        count: state.count + state.???,  // <- step
        history: [...state.history, state.count],
      };

    case "DECREMENT":
      // TODO: Giam count theo step
      return {
        ???,                               // <- ...state
        count: state.count - state.step,
        history: [...state.history, state.count],
      };

    case "RESET":
      // TODO: Reset ve initial state
      return ???;  // <- initialState

    case "SET":
      // TODO: Set count = payload
      return {
        ...state,
        count: action.???,  // <- payload
        history: [...state.history, state.count],
      };

    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };

    default:
      return state;
  }
}

// ============================================================
// MAIN COMPONENT
// Fill: useReducer hook va dispatch calls
// ============================================================

export default function UseReducerBasicsExercise() {
  // TODO: Su dung useReducer hook
  // Hint: const [state, dispatch] = useReducer(reducer, initialState)
  const [???, ???] = ???(???, ???);
  //     ^state  ^dispatch   ^useReducer  ^counterReducer  ^initialState

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 2: useReducer Basics - Counter with Actions</h2>

      <div
        style={{
          backgroundColor: "#fff3e0",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Instructions:</h4>
        <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>Dinh nghia Action union types</li>
          <li>Hoan thanh reducer function (switch/case)</li>
          <li>Su dung useReducer hook</li>
          <li>Goi dispatch voi correct action objects</li>
        </ol>
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
        {/* TODO: Dispatch INCREMENT action */}
        <button
          onClick={() => dispatch({ ???: "???" })}
          //                        ^type  ^INCREMENT
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

        {/* TODO: Dispatch DECREMENT action */}
        <button
          onClick={() => ???({ type: "DECREMENT" })}
          //              ^dispatch
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

        {/* TODO: Dispatch RESET action */}
        <button
          onClick={() => dispatch({ type: "???" })}
          //                               ^RESET
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

      {/* Set Value */}
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

      {/* Hints Section */}
      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          Show Hints
        </summary>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h4>Hints for each blank:</h4>
          <pre
            style={{
              backgroundColor: "#263238",
              color: "#aed581",
              padding: "1rem",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
{`// STEP 2: Action Types
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number }
  | { type: "SET_STEP"; payload: number };

// STEP 4: Reducer Function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step, ... };
    case "DECREMENT":
      return { ...state, count: state.count - state.step, ... };
    case "RESET":
      return initialState;
    case "SET":
      return { ...state, count: action.payload, ... };
    // ...
  }
}

// MAIN: useReducer hook
const [state, dispatch] = useReducer(counterReducer, initialState);

// Dispatch actions
dispatch({ type: "INCREMENT" });
dispatch({ type: "SET", payload: 100 });`}
          </pre>
        </div>
      </details>
    </div>
  );
}
