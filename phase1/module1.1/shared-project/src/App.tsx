/**
 * MODULE 1.1 - TYPESCRIPT CHO REACT
 *
 * Hướng dẫn:
 * 1. Uncomment exercise nào đang làm
 * 2. Comment lại exercises đã hoàn thành
 * 3. Mỗi session có 2-3 exercises
 */

// ===== SESSION 1.1.1: Props & State Typing =====
// import Ex1_Button from "./session-1.1.1/01-Button";
// import Ex2_Card from "./session-1.1.1/02-Card";
import Ex3_GenericList from "./session-1.1.1/03-GenericList";

// ===== SESSION 1.1.2: Event Handlers Typing =====
// (Sẽ thêm sau khi hoàn thành session 1.1.1)
// import Ex1_LoginForm from './session-1.1.2/01-LoginForm'
// import Ex2_SearchComponent from './session-1.1.2/02-SearchComponent'

// ===== SESSION 1.1.3: Hooks với TypeScript =====
// (Sẽ thêm sau khi hoàn thành session 1.1.2)
// import Ex1_useLocalStorage from './session-1.1.3/01-useLocalStorage'
// import Ex2_useDebounce from './session-1.1.3/02-useDebounce'
// import Ex3_useFetch from './session-1.1.3/03-useFetch'

// ===== SESSION 1.1.4: Utility Types & Advanced =====
// (Sẽ thêm sau khi hoàn thành session 1.1.3)
// import Ex1_FormBuilder from './session-1.1.4/01-FormBuilder'
// import Ex2_PropsExtraction from './session-1.1.4/02-PropsExtraction'

export default function App() {
  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "30px", color: "#333" }}>
        Module 1.1 - TypeScript cho React
      </h1>

      {/* ===== SESSION 1.1.1: Props & State Typing ===== */}
      <section className="section">
        <h2 className="section-title">Session 1.1.1: Props & State Typing</h2>

        {/* <div className="exercise-container">
          <h3 className="exercise-title">Exercise 1: Button Component</h3>
          <Ex1_Button />
        </div> */}

        {/* Uncomment khi làm Exercise 2 */}
        {/* <div className="exercise-container">
          <h3 className="exercise-title">Exercise 2: Card Component</h3>
          <Ex2_Card />
        </div> */}

        {/* Uncomment khi làm Exercise 3 */}
        <div className="exercise-container">
          <h3 className="exercise-title">Exercise 3: Generic List Component</h3>
          <Ex3_GenericList />
        </div>
      </section>

      {/* ===== SESSION 1.1.2: Event Handlers Typing ===== */}
      {/* Uncomment section này khi bắt đầu session 1.1.2 */}
      {/* <section className="section">
        <h2 className="section-title">Session 1.1.2: Event Handlers Typing</h2>

        <div className="exercise-container">
          <h3 className="exercise-title">Exercise 1: Login Form</h3>
          <Ex1_LoginForm />
        </div>

        <div className="exercise-container">
          <h3 className="exercise-title">Exercise 2: Search Component</h3>
          <Ex2_SearchComponent />
        </div>
      </section> */}

      {/* ===== SESSION 1.1.3: Hooks với TypeScript ===== */}
      {/* Uncomment khi bắt đầu session 1.1.3 */}

      {/* ===== SESSION 1.1.4: Utility Types ===== */}
      {/* Uncomment khi bắt đầu session 1.1.4 */}
    </div>
  );
}
