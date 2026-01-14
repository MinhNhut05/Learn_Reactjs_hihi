# SESSION START FORM - Session 1.3.4

---

## SESSION INFO

**Session ID:** 1.3.4
**Session Title:** useContext & useReducer
**Module:** 1.3 - Hooks Deep Dive
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2.1 (36 sessions)

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1:** React Foundation (Session 11/13)
- **Module 1.3:** Hooks Deep Dive (Session 4/6)
- **Previous Session:** 1.3.3 - useRef & useCallback (Completed)
- **Next Session:** 1.3.5 - useMemo & Custom Hooks

**Prerequisites Completed:**
- Module 1.1: TypeScript cho React (4/4)
- Module 1.2: React Mental Model (3/3)
- Session 1.3.1: useState Advanced (lazy init, functional updates)
- Session 1.3.2: useEffect Mastery (cleanup, AbortController)
- Session 1.3.3: useRef & useCallback (refs, memoization)

**Why This Session Important:**
- **useContext** - Tranh prop drilling, share state globally
- **useReducer** - Quan ly complex state logic
- Pattern: Context + Reducer = Mini Redux
- Nen tang cho state management libraries (Zustand, Redux)
- Can thiet cho auth, theme, language features

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **useContext Fundamentals:**
   - createContext syntax
   - Provider pattern
   - useContext hook
   - Custom context hook pattern

2. **useContext Use Cases:**
   - Theme (light/dark mode)
   - Authentication state
   - Language/Locale
   - User preferences

3. **useReducer Fundamentals:**
   - Syntax: `useReducer(reducer, initialState)`
   - Reducer function pattern
   - Actions & dispatch
   - TypeScript for actions

4. **Context + Reducer Pattern:**
   - Global state management
   - Separation of concerns
   - When to use vs when NOT to use
   - Alternative to Redux for simple apps

---

## PROJECT SETUP REQUEST

**SU DUNG SHARED-PROJECT DA CO:**

```
phase1/module1.3/
├── session-1.3.1-usestate-advanced/     (Exists)
├── session-1.3.2-useeffect-mastery/     (Exists)
├── session-1.3.3-useref-usecallback/    (Exists)
│
├── session-1.3.4-context-reducer/       <- TAO MOI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/                      (Exists)
    └── src/
        ├── session-1.3.1/               (Exists)
        ├── session-1.3.2/               (Exists)
        ├── session-1.3.3/               (Exists)
        └── session-1.3.4/               <- TAO MOI (exercises)
            ├── 01-UseContextBasics.tsx
            ├── 01-UseContextBasics-Solution.tsx
            ├── 02-UseReducerBasics.tsx
            ├── 02-UseReducerBasics-Solution.tsx
            ├── 03-ContextReducerCombo.tsx
            └── 03-ContextReducerCombo-Solution.tsx
```

**No installation needed** - dung shared-project da co

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (60-75p) -> Context + Reducer phuc tap
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (60-75p)  -> 3 exercises, fill-in-blank format
PHASE 4: Quiz (20-30p)         -> Knowledge Check, pass >= 80%
```

### **Exercise Format: "Fill-in-the-Blank Mode"**

**Core Principles:**
- Structure (imports, states, handlers, UI) **DA VIET SAN**
- Chi dien vao cac cho **`???`** - tap trung vao core concepts
- Moi cho can dien co **`<- hint`** de huong dan
- Hints section trong UI cung cap dap an

**Example Format:**
```tsx
/**
 * Exercise 1: useContext Basics
 * Difficulty: Medium
 *
 * LEARNING GOALS:
 * - Hieu createContext syntax
 * - Provider pattern
 * - useContext hook
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 */

import { createContext, useContext, useState, ReactNode } from "react";

// STEP 1: Tao Context
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = ???<??? | undefined>(???);  // <- createContext<ThemeContextType | undefined>(undefined)

// STEP 2: Tao Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <???.Provider value={{ ???, ??? }}>  {/* <- ThemeContext.Provider, theme, toggleTheme */}
      {children}
    </???.Provider>
  );
}

// STEP 3: Custom Hook
export function useTheme() {
  const context = ???(???);  // <- useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
```

---

## EXERCISES OVERVIEW

### **Exercise 1: useContext Basics (20-25 phut)** - Medium

**Scenario:** Theme system (light/dark mode)

**Fill-in-blanks:**
1. `createContext` call voi correct type
2. Initial value: `undefined`
3. Provider component voi value prop
4. `useContext` hook call
5. Custom hook voi error check

**Concepts:**
- createContext syntax
- Provider/Consumer pattern
- Custom context hooks
- TypeScript typing cho context

**Expected Behavior:**
- Toggle button thay doi theme
- Components nested deep van access duoc theme
- Error khi dung useTheme outside Provider

---

### **Exercise 2: useReducer Basics (25-30 phut)** - Hard

**Scenario:** Counter voi complex actions

**Fill-in-blanks:**
1. State type definition
2. Action types (union type)
3. Reducer function logic (switch/case)
4. `useReducer` hook call
5. `dispatch` call voi action

**Concepts:**
- Reducer pattern: (state, action) => newState
- Action types voi TypeScript
- dispatch function
- When to use useReducer vs useState

**Expected Behavior:**
- Increment/Decrement/Reset buttons
- Step size adjustable
- No mutations - pure reducer

---

### **Exercise 3: Context + Reducer Combo (30-40 phut)** - Expert

**Scenario:** Todo App voi global state

**Fill-in-blanks:**
1. State interface (todos, filter)
2. Action union type (5 actions)
3. Reducer function (5 cases)
4. Context creation
5. Provider setup
6. Custom hooks (useTodos, useTodoDispatch)
7. Component usage

**Concepts:**
- Combine Context + Reducer
- Separate state/dispatch contexts
- Actions: ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_FILTER, CLEAR_COMPLETED
- TypeScript best practices

**Expected Behavior:**
- Add, toggle, delete todos
- Filter: all/active/completed
- State persisted in context
- Any component can access/modify

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Hard (Concepts moi, nhieu patterns)

**Thoi gian du kien:**
- Doc COMPLETE_THEORY.md: 60-75 phut
- Claude tom tat: 15 phut
- Exercise 1 (Context Basics): 20-25 phut (~6 blanks)
- Exercise 2 (Reducer Basics): 25-30 phut (~8 blanks)
- Exercise 3 (Context + Reducer): 30-40 phut (~12 blanks)
- Quiz: 20-30 phut

**Total:** ~3-4 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- 3 exercises done voi tat ca blanks filled correctly
- Hieu useContext syntax va custom hook pattern
- Hieu useReducer va action/dispatch pattern
- Biet khi nao dung Context vs Reducer vs useState
- Quiz score >= 8/10
- Build duoc mini Todo app voi global state

---

## COMMON PITFALLS (Se hoc cach tranh)

```tsx
// Context - forget Provider
const theme = useContext(ThemeContext); // undefined neu khong co Provider
// Dung: Custom hook voi error check

// Context - re-render issue
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  // Moi render tao object moi -> re-render tat ca consumers
</ThemeContext.Provider>
// Dung: useMemo hoac tach state/dispatch

// Reducer - mutate state
case 'ADD_TODO':
  state.todos.push(action.payload);  // MUTATION!
  return state;
// Dung: return { ...state, todos: [...state.todos, action.payload] }

// Reducer - missing return
case 'INCREMENT':
  state.count + 1;  // Khong co return!
// Dung: return { ...state, count: state.count + 1 }

// useReducer - wrong initial state
const [state, dispatch] = useReducer(reducer);  // Missing initial state!
// Dung: useReducer(reducer, initialState)
```

---

## READY TO START

**AI, please:**

1. Tao folder `session-1.3.4-context-reducer/` cho docs
2. Tao **COMPLETE_THEORY.md** voi:
   - useContext fundamentals va syntax
   - Provider pattern deep dive
   - Custom context hook pattern
   - useReducer fundamentals
   - Reducer function best practices
   - Context + Reducer combo pattern
   - When to use vs when NOT to use
   - Common mistakes & fixes
3. Tao **3 exercise files** voi **Fill-in-the-Blank Mode**:
   - Exercise 1: ~6 blanks (useContext basics)
   - Exercise 2: ~8 blanks (useReducer basics)
   - Exercise 3: ~12 blanks (Context + Reducer combo)
4. Tao **3 solution files** hoan chinh voi comments giai thich
5. Update **App.tsx** de them navigation cho session 1.3.4
6. Tao **quiz.md** voi 10 cau hoi
7. Tao **summary.md** voi checklist

**Luu y quan trong:**
- **FILL-IN-BLANK MODE:** Dung `???` voi `<-` hints
- **Structure co san:** imports, types, handlers, UI da viet
- **Chi can dien:** core concepts (context, dispatch, actions)
- **Hints section:** UI co hints de tu kiem tra
- **Progressive difficulty:** Ex1 (Medium) -> Ex2 (Hard) -> Ex3 (Expert)
- **Practical examples:** Theme toggle, Counter, Todo App

---

## KEY CONCEPTS TO COVER

### useContext Pattern:
```tsx
// 1. Create
const MyContext = createContext<Type | undefined>(undefined);

// 2. Provide
<MyContext.Provider value={value}>
  {children}
</MyContext.Provider>

// 3. Consume
const value = useContext(MyContext);
```

### useReducer Pattern:
```tsx
// 1. Define state & actions
type State = { count: number };
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };

// 2. Create reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
}

// 3. Use in component
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });
```

### Context + Reducer Pattern:
```tsx
// Combine for global state management
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
```

---

## COMPARISON TABLE

| Feature | useState | useReducer |
|---------|----------|------------|
| Simple state | ✅ Best | ❌ Overkill |
| Complex state | ❌ Messy | ✅ Best |
| Multiple sub-values | ❌ Tricky | ✅ Easy |
| Related state transitions | ❌ Error prone | ✅ Centralized |
| Testing | Harder | Easier |

| Feature | Props | Context |
|---------|-------|---------|
| Direct parent-child | ✅ Best | ❌ Overkill |
| Deep nesting | ❌ Prop drilling | ✅ Best |
| Theme/Auth/Locale | ❌ Tedious | ✅ Perfect |
| Performance | ✅ Optimized | ⚠️ Need care |

---

**LET'S MASTER useContext & useReducer!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-06
**FOR:** Session 1.3.4 - useContext & useReducer
**FORMAT:** Fill-in-the-Blank Mode
**PREVIOUS SESSION:** 1.3.3 - useRef & useCallback
