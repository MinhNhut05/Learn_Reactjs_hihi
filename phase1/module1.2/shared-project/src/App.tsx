/**
 * Module 1.2 - React Mental Model
 *
 * Hướng dẫn sử dụng:
 * 1. Uncomment component bạn muốn test
 * 2. Comment các components khác
 * 3. Save file và xem kết quả trên browser
 *
 * Sessions:
 * - 1.2.1: Rendering & Re-rendering
 * - 1.2.2: One-way Data Flow
 * - 1.2.3: Component Lifecycle
 */

// ===== SESSION 1.2.1: Rendering & Re-rendering =====

// Exercise 1: Render Counter
// import RenderCounter from "./session-1.2.1/01-RenderCounter";
// import RenderCounterSolution from "./session-1.2.1/01-RenderCounter-Solution";

// Exercise 2: Parent-Child Re-renders
// import ParentChild from "./session-1.2.1/02-ParentChild";
// import ParentChildSolution from "./session-1.2.1/02-ParentChild-Solution";

// Exercise 3: Todo Optimize
// import TodoOptimize from "./session-1.2.1/03-TodoOptimize";
// import TodoOptimizeSolution from "./session-1.2.1/03-TodoOptimize-Solution";

// ===== SESSION 1.2.2: One-way Data Flow =====

// Exercise 1: Lifting State Up - Temperature Converter
// import LiftingState from "./session-1.2.2/01-LiftingState";
// import LiftingStateSolution from "./session-1.2.2/01-LiftingState-Solution";

// Exercise 2: Component Composition - Card Pattern
// import Composition from "./session-1.2.2/02-Composition";
// import CompositionSolution from "./session-1.2.2/02-Composition-Solution";

// ===== SESSION 1.2.3: Component Lifecycle =====

// Exercise 1: Lifecycle Logger
// import LifecycleLogger from "./session-1.2.3/01-LifecycleLogger";
// import LifecycleLoggerSolution from "./session-1.2.3/01-LifecycleLogger-Solution";

// Exercise 2: Timer with Cleanup
import Timer from "./session-1.2.3/02-Timer";
// import TimerSolution from "./session-1.2.3/02-Timer-Solution";

function App() {
  return (
    <div className="app-container">
      {/* ===== SESSION 1.2.1 ===== */}
      {/* <RenderCounter /> */}
      {/* <RenderCounterSolution /> */}
      {/* <ParentChild /> */}
      {/* <ParentChildSolution /> */}
      {/* <TodoOptimize /> */}
      {/* <TodoOptimizeSolution /> */}

      {/* ===== SESSION 1.2.2 ===== */}
      {/* <LiftingState /> */}
      {/* <LiftingStateSolution /> */}
      {/* <Composition /> */}
      {/* <CompositionSolution /> */}

      {/* ===== SESSION 1.2.3 ===== */}
      {/* <LifecycleLogger /> */}
      {/* <LifecycleLoggerSolution /> */}
      <Timer />
      {/* <TimerSolution /> */}
    </div>
  );
}

export default App;
