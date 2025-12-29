/**
 * Module 1.2 - React Mental Model
 * Session 1.2.1 - Rendering & Re-rendering
 *
 * Hướng dẫn sử dụng:
 * 1. Uncomment component bạn muốn test
 * 2. Comment các components khác
 * 3. Save file và xem kết quả trên browser
 *
 * Thứ tự exercises:
 * 1. RenderCounter - Hiểu render triggers
 * 2. ParentChild - Hiểu parent-child re-renders
 * 3. TodoOptimize - Optimize với React.memo & useCallback
 */

// ===== SESSION 1.2.1: Rendering & Re-rendering =====

// Exercise 1: Render Counter
import RenderCounter from "./session-1.2.1/01-RenderCounter";
// import RenderCounterSolution from "./session-1.2.1/01-RenderCounter-Solution";

// Exercise 2: Parent-Child Re-renders
// import ParentChild from './session-1.2.1/02-ParentChild'
// import ParentChildSolution from './session-1.2.1/02-ParentChild-Solution'

// Exercise 3: Todo Optimize
// import TodoOptimize from './session-1.2.1/03-TodoOptimize'
// import TodoOptimizeSolution from './session-1.2.1/03-TodoOptimize-Solution'

function App() {
  return (
    <div className="app-container">
      {/* Exercise 1 */}
      <RenderCounter />
      {/* <RenderCounterSolution /> */}

      {/* Exercise 2 */}
      {/* <ParentChild /> */}
      {/* <ParentChildSolution /> */}

      {/* Exercise 3 */}
      {/* <TodoOptimize /> */}
      {/* <TodoOptimizeSolution /> */}
    </div>
  );
}

export default App;
