import { useState } from "react";
import "./App.css";

// Session 1.3.1 imports
import LazyInitExercise from "./session-1.3.1/01-LazyInit";
import LazyInitSolution from "./session-1.3.1/01-LazyInit-Solution";
import FunctionalUpdateExercise from "./session-1.3.1/02-FunctionalUpdate";
import FunctionalUpdateSolution from "./session-1.3.1/02-FunctionalUpdate-Solution";
import ObjectStateExercise from "./session-1.3.1/03-ObjectState";
import ObjectStateSolution from "./session-1.3.1/03-ObjectState-Solution";

// Session 1.3.2 imports
import EffectBasicsExercise from "./session-1.3.2/01-EffectBasics";
import EffectBasicsSolution from "./session-1.3.2/01-EffectBasics-Solution";
import CleanupExercise from "./session-1.3.2/02-Cleanup";
import CleanupExerciseSolution from "./session-1.3.2/02-Cleanup-Solution";
import DataFetchingExercise from "./session-1.3.2/03-DataFetching";
import DataFetchingSolution from "./session-1.3.2/03-DataFetching-Solution";

// Session 1.3.3 imports
import UseRefBasicsExercise from "./session-1.3.3/01-UseRefBasics";
import UseRefBasicsSolution from "./session-1.3.3/01-UseRefBasics-Solution";
import UseRefAdvancedExercise from "./session-1.3.3/02-UseRefAdvanced";
import UseRefAdvancedSolution from "./session-1.3.3/02-UseRefAdvanced-Solution";
import UseCallbackExercise from "./session-1.3.3/03-UseCallback";
import UseCallbackSolution from "./session-1.3.3/03-UseCallback-Solution";

// Session 1.3.4 imports
// import UseContextBasicsExercise from "./session-1.3.4/01-UseContextBasics";
// import UseContextBasicsSolution from "./session-1.3.4/01-UseContextBasics-Solution";
// import UseReducerBasicsExercise from "./session-1.3.4/02-UseReducerBasics";
// import UseReducerBasicsSolution from "./session-1.3.4/02-UseReducerBasics-Solution";
// import ContextReducerComboExercise from "./session-1.3.4/03-ContextReducerCombo";
// import ContextReducerComboSolution from "./session-1.3.4/03-ContextReducerCombo-Solution";

type Session = "1.3.1" | "1.3.2" | "1.3.3" | "1.3.4";
type ExerciseView = "exercise" | "solution";

function App() {
  const [currentSession, setCurrentSession] = useState<Session>("1.3.4");
  const [currentExercise, setCurrentExercise] = useState<number>(1);
  const [view, setView] = useState<ExerciseView>("exercise");

  // Get exercise options based on current session
  const getExerciseOptions = () => {
    if (currentSession === "1.3.1") {
      return [
        { id: 1, label: "1. Lazy Init" },
        { id: 2, label: "2. Functional Update" },
        { id: 3, label: "3. Object State" },
      ];
    }
    if (currentSession === "1.3.2") {
      return [
        { id: 1, label: "1. Effect Basics" },
        { id: 2, label: "2. Cleanup" },
        { id: 3, label: "3. Data Fetching" },
      ];
    }
    if (currentSession === "1.3.3") {
      return [
        { id: 1, label: "1. useRef Basics" },
        { id: 2, label: "2. useRef Advanced" },
        { id: 3, label: "3. useCallback" },
      ];
    }
    // Session 1.3.4
    return [
      { id: 1, label: "1. useContext Basics" },
      { id: 2, label: "2. useReducer Basics" },
      { id: 3, label: "3. Context + Reducer" },
    ];
  };

  // Get session title
  const getSessionTitle = () => {
    switch (currentSession) {
      case "1.3.1":
        return "Session 1.3.1: useState Advanced";
      case "1.3.2":
        return "Session 1.3.2: useEffect Mastery";
      case "1.3.3":
        return "Session 1.3.3: useRef & useCallback";
      case "1.3.4":
        return "Session 1.3.4: useContext & useReducer";
      default:
        return "";
    }
  };

  // Render content based on session and exercise
  const renderContent = () => {
    if (currentSession === "1.3.1") {
      if (currentExercise === 1) {
        return view === "exercise" ? (
          <LazyInitExercise />
        ) : (
          <LazyInitSolution />
        );
      }
      if (currentExercise === 2) {
        return view === "exercise" ? (
          <FunctionalUpdateExercise />
        ) : (
          <FunctionalUpdateSolution />
        );
      }
      if (currentExercise === 3) {
        return view === "exercise" ? (
          <ObjectStateExercise />
        ) : (
          <ObjectStateSolution />
        );
      }
    }

    if (currentSession === "1.3.2") {
      if (currentExercise === 1) {
        return view === "exercise" ? (
          <EffectBasicsExercise />
        ) : (
          <EffectBasicsSolution />
        );
      }
      if (currentExercise === 2) {
        return view === "exercise" ? (
          <CleanupExercise />
        ) : (
          <CleanupExerciseSolution />
        );
      }
      if (currentExercise === 3) {
        return view === "exercise" ? (
          <DataFetchingExercise />
        ) : (
          <DataFetchingSolution />
        );
      }
    }

    if (currentSession === "1.3.3") {
      if (currentExercise === 1) {
        return view === "exercise" ? (
          <UseRefBasicsExercise />
        ) : (
          <UseRefBasicsSolution />
        );
      }
      if (currentExercise === 2) {
        return view === "exercise" ? (
          <UseRefAdvancedExercise />
        ) : (
          <UseRefAdvancedSolution />
        );
      }
      if (currentExercise === 3) {
        return view === "exercise" ? (
          // <UseCallbackSolution />
          <UseCallbackExercise />
        ) : (
          <UseCallbackSolution />
        );
      }
    }

    // if (currentSession === "1.3.4") {
    //   if (currentExercise === 1) {
    //     return view === "exercise" ? (
    //       <UseContextBasicsExercise />
    //     ) : (
    //       <UseContextBasicsSolution />
    //     );
    //   }
    //   if (currentExercise === 2) {
    //     return view === "exercise" ? (
    //       <UseReducerBasicsExercise />
    //     ) : (
    //       <UseReducerBasicsSolution />
    //     );
    //   }
    //   if (currentExercise === 3) {
    //     return view === "exercise" ? (
    //       <ContextReducerComboExercise />
    //     ) : (
    //       <ContextReducerComboSolution />
    //     );
    //   }
    // }

    return <div>Select an exercise</div>;
  };

  // Handle session change - reset exercise to 1
  const handleSessionChange = (session: Session) => {
    setCurrentSession(session);
    setCurrentExercise(1);
    setView("exercise");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem", borderBottom: "2px solid #333" }}>
        <h1>Module 1.3 - Hooks Deep Dive</h1>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => handleSessionChange("1.3.1")}
            style={{
              padding: "0.5rem 1rem",
              background: currentSession === "1.3.1" ? "#9C27B0" : "#fff",
              color: currentSession === "1.3.1" ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            1.3.1: useState Advanced
          </button>
          <button
            onClick={() => handleSessionChange("1.3.2")}
            style={{
              padding: "0.5rem 1rem",
              background: currentSession === "1.3.2" ? "#9C27B0" : "#fff",
              color: currentSession === "1.3.2" ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            1.3.2: useEffect Mastery
          </button>
          <button
            onClick={() => handleSessionChange("1.3.3")}
            style={{
              padding: "0.5rem 1rem",
              background: currentSession === "1.3.3" ? "#9C27B0" : "#fff",
              color: currentSession === "1.3.3" ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            1.3.3: useRef & useCallback
          </button>
          <button
            onClick={() => handleSessionChange("1.3.4")}
            style={{
              padding: "0.5rem 1rem",
              background: currentSession === "1.3.4" ? "#9C27B0" : "#fff",
              color: currentSession === "1.3.4" ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            1.3.4: useContext & useReducer
          </button>
        </div>
        <h2>{getSessionTitle()}</h2>
      </header>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <div>
          <strong>Exercises:</strong>
          <div style={{ marginTop: "0.5rem" }}>
            {getExerciseOptions().map((ex) => (
              <button
                key={ex.id}
                onClick={() => setCurrentExercise(ex.id)}
                style={{
                  padding: "0.5rem 1rem",
                  marginRight: "0.5rem",
                  background: currentExercise === ex.id ? "#4CAF50" : "#fff",
                  color: currentExercise === ex.id ? "#fff" : "#000",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <strong>View:</strong>
          <div style={{ marginTop: "0.5rem" }}>
            <button
              onClick={() => setView("exercise")}
              style={{
                padding: "0.5rem 1rem",
                marginRight: "0.5rem",
                background: view === "exercise" ? "#2196F3" : "#fff",
                color: view === "exercise" ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              Exercise
            </button>
            <button
              onClick={() => setView("solution")}
              style={{
                padding: "0.5rem 1rem",
                background: view === "solution" ? "#2196F3" : "#fff",
                color: view === "solution" ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              Solution
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main>{renderContent()}</main>

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          paddingTop: "1rem",
          borderTop: "1px solid #ccc",
          fontSize: "0.9rem",
          color: "#666",
        }}
      >
        <p>
          <strong>Tips:</strong>
        </p>
        <ul>
          <li>Open DevTools Console (F12) to see logs</li>
          <li>Do Exercise first, check Solution after</li>
          <li>Read COMPLETE_THEORY.md in session-{currentSession} folder</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
