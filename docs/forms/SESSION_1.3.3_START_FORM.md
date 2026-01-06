# SESSION START FORM - Session 1.3.3

---

## SESSION INFO

**Session ID:** 1.3.3
**Session Title:** useRef & useCallback
**Module:** 1.3 - Hooks Deep Dive
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2.1 (36 sessions)

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1:** React Foundation (Session 10/13)
- **Module 1.3:** Hooks Deep Dive (Session 3/6)
- **Previous Session:** 1.3.2 - useEffect Mastery (Completed)
- **Next Session:** 1.3.4 - useContext & useReducer

**Prerequisites Completed:**
- Module 1.1: TypeScript cho React (4/4)
- Module 1.2: React Mental Model (3/3)
- Session 1.3.1: useState Advanced (lazy init, functional updates)
- Session 1.3.2: useEffect Mastery (cleanup, AbortController)

**Why This Session Important:**
- **useRef** - access DOM elements, store mutable values without re-render
- **useCallback** - memoize functions, prevent unnecessary re-renders
- Nen tang cho performance optimization
- Can thiet cho integrating voi 3rd party libraries
- Hieu khi nao CAN va KHONG CAN dung

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **useRef Fundamentals:**
   - Syntax: `useRef<Type>(initialValue)`
   - DOM reference: `ref.current`
   - Persist values across renders (khong trigger re-render)
   - Difference: useRef vs useState

2. **useRef Use Cases:**
   - Focus input elements
   - Store previous values
   - Store mutable values (interval IDs, etc.)
   - Access DOM measurements

3. **useCallback Fundamentals:**
   - Syntax: `useCallback(fn, deps)`
   - Function memoization
   - Dependencies array (giong useEffect)
   - Khi nao can va khong can

4. **useCallback Use Cases:**
   - Pass callbacks to child components
   - Combine voi React.memo
   - Dependencies trong useEffect
   - Avoid stale closures

---

## PROJECT SETUP REQUEST

**SU DUNG SHARED-PROJECT DA CO:**

```
phase1/module1.3/
├── session-1.3.1-usestate-advanced/     (Exists)
├── session-1.3.2-useeffect-mastery/     (Exists)
│
├── session-1.3.3-useref-usecallback/    <- TAO MOI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/                      (Exists)
    └── src/
        ├── session-1.3.1/               (Exists)
        ├── session-1.3.2/               (Exists)
        └── session-1.3.3/               <- TAO MOI (exercises)
            ├── 01-UseRefBasics.tsx
            ├── 01-UseRefBasics-Solution.tsx
            ├── 02-UseRefAdvanced.tsx
            ├── 02-UseRefAdvanced-Solution.tsx
            ├── 03-UseCallback.tsx
            └── 03-UseCallback-Solution.tsx
```

**No installation needed** - dung shared-project da co

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> useRef/useCallback de hieu hon useEffect
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (45-60p)  -> 3 exercises, fill-in-blank format
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
 * Exercise 1: useRef Basics
 * Difficulty: Medium
 *
 * LEARNING GOALS:
 * - Hieu useRef syntax
 * - Access DOM elements
 * - Store values without re-render
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 */

import { useRef } from "react";

export function UseRefBasics() {
  // Tao ref de access input element
  const inputRef = ???<???>(???);  // <- useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    ???.???.???();  // <- inputRef.current.focus()
  };

  return (
    <div>
      <input ref={???} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>

      <div className="hints">
        <h3>Hints:</h3>
        <ul>
          <li>Hook: useRef</li>
          <li>Type: HTMLInputElement</li>
          <li>Initial: null</li>
          <li>Access: inputRef.current.focus()</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## EXERCISES OVERVIEW

### **Exercise 1: useRef Basics (15-20 phut)** - Medium

**Scenario:** Focus management va DOM access

**Fill-in-blanks:**
1. `useRef` hook call voi correct type
2. Type annotation: `HTMLInputElement`
3. Initial value: `null`
4. Access ref: `inputRef.current`
5. Attach to element: `ref={inputRef}`

**Concepts:**
- useRef syntax: `useRef<Type>(initialValue)`
- DOM element types
- ref.current access
- ref attribute on JSX elements

**Expected Behavior:**
- Click "Focus" button -> input duoc focus
- No re-render khi focus

---

### **Exercise 2: useRef Advanced (20-25 phut)** - Hard

**Scenario:** Store previous value va mutable values

**Part A: Previous Value Tracker**
Fill-in-blanks:
1. Create ref for previous value
2. Update ref in useEffect
3. Read previous value from ref.current

**Part B: Timer with useRef**
Fill-in-blanks:
1. Store intervalId in ref (khong phai state!)
2. Access ref.current trong cleanup
3. Clear interval using ref

**Concepts:**
- useRef khong trigger re-render
- Store mutable values (interval IDs)
- useRef vs useState for non-UI values
- Cleanup voi ref

**Expected Behavior:**
- Part A: Hien thi current va previous value
- Part B: Timer chay, stop, no re-render khi store intervalId

---

### **Exercise 3: useCallback (25-30 phut)** - Hard

**Scenario:** Memoize callbacks cho child components

**Fill-in-blanks:**
1. `useCallback` syntax
2. Callback function body
3. Dependencies array
4. Pass to memoized child component
5. React.memo wrapper

**Concepts:**
- useCallback syntax: `useCallback(fn, deps)`
- Dependencies array (giong useEffect)
- Combine voi React.memo
- When to use useCallback

**Expected Behavior:**
- Child component khong re-render khi parent re-renders
- Console log cho thay render count
- useCallback + React.memo = optimized

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Medium-Hard (de hieu hon useEffect)

**Thoi gian du kien:**
- Doc COMPLETE_THEORY.md: 45-60 phut
- Claude tom tat: 15 phut
- Exercise 1 (useRef Basics): 15-20 phut (~5 blanks)
- Exercise 2 (useRef Advanced): 20-25 phut (~8 blanks)
- Exercise 3 (useCallback): 25-30 phut (~8 blanks)
- Quiz: 20-30 phut

**Total:** ~2-3 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- 3 exercises done voi tat ca blanks filled correctly
- Hieu useRef syntax va use cases
- Hieu useCallback va khi nao can dung
- Biet khac biet giua useRef va useState
- Quiz score >= 8/10
- Khong lam dung useCallback (chi dung khi can)

---

## COMMON PITFALLS (Se hoc cach tranh)

```tsx
// useRef - khong trigger re-render
const countRef = useRef(0);
countRef.current = 5;  // UI khong update!
// Dung: useState neu can UI update

// useRef - null check
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current.focus();  // Error: current co the null!
// Dung: inputRef.current?.focus()

// useCallback - quen dependency
const handleClick = useCallback(() => {
  console.log(count);  // Stale closure!
}, []);  // Missing: count
// Dung: [count]

// useCallback - overuse
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);  // Khong can thiet neu khong pass to child
// Dung: chi dung khi pass to memoized child
```

---

## READY TO START

**AI, please:**

1. Tao folder `session-1.3.3-useref-usecallback/` cho docs
2. Tao **COMPLETE_THEORY.md** voi:
   - useRef fundamentals va syntax
   - useRef use cases (DOM, previous value, mutable)
   - useCallback fundamentals va syntax
   - useCallback + React.memo pattern
   - When to use vs when NOT to use
   - Common mistakes & fixes
3. Tao **3 exercise files** voi **Fill-in-the-Blank Mode**:
   - Exercise 1: ~5 blanks (useRef basics)
   - Exercise 2: ~8 blanks (useRef advanced)
   - Exercise 3: ~8 blanks (useCallback)
4. Tao **3 solution files** hoan chinh voi comments giai thich
5. Update **App.tsx** de them navigation cho session 1.3.3
6. Tao **quiz.md** voi 10 cau hoi
7. Tao **summary.md** voi checklist

**Luu y quan trong:**
- **FILL-IN-BLANK MODE:** Dung `???` voi `<-` hints
- **Structure co san:** imports, types, handlers, UI da viet
- **Chi can dien:** core concepts (ref type, current, callback deps)
- **Hints section:** UI co hints de tu kiem tra
- **Progressive difficulty:** Ex1 (Medium) -> Ex2 (Hard) -> Ex3 (Hard)
- **Practical examples:** Focus input, timer, child component optimization

---

## KEY DIFFERENCES TO HIGHLIGHT

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers re-render | Yes | No |
| Persists across renders | Yes | Yes |
| Use for UI | Yes | No |
| Use for DOM access | No | Yes |
| Use for mutable values | No | Yes |

| Feature | useCallback | Regular function |
|---------|-------------|------------------|
| New reference each render | No | Yes |
| Memoized | Yes | No |
| Use with React.memo | Yes | Breaks memoization |
| Dependencies | Required | N/A |

---

**LET'S MASTER useRef & useCallback!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-06
**FOR:** Session 1.3.3 - useRef & useCallback
**FORMAT:** Fill-in-the-Blank Mode
**PREVIOUS SESSION:** 1.3.2 - useEffect Mastery
