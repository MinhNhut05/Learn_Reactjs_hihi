# SESSION START FORM - Session 1.3.5

---

## SESSION INFO

**Session ID:** 1.3.5
**Session Title:** useMemo & Custom Hooks
**Module:** 1.3 - Hooks Deep Dive
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2.1 (36 sessions)

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1:** React Foundation (Session 12/13)
- **Module 1.3:** Hooks Deep Dive (Session 5/6)
- **Previous Session:** 1.3.4 - useContext & useReducer (Completed)
- **Next Session:** 1.3.R - Hooks Review & Mini Project

**Prerequisites Completed:**
- Module 1.1: TypeScript cho React (4/4)
- Module 1.2: React Mental Model (3/3)
- Session 1.3.1: useState Advanced
- Session 1.3.2: useEffect Mastery
- Session 1.3.3: useRef & useCallback
- Session 1.3.4: useContext & useReducer

**Why This Session Important:**
- **useMemo** - Memoize expensive calculations
- **Custom Hooks** - Reuse stateful logic across components
- Complete the hooks knowledge
- Foundation for building hook libraries
- Prepare for real-world React development

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **useMemo Fundamentals:**
   - Syntax: `useMemo(() => computation, deps)`
   - Memoize expensive calculations
   - Dependencies array mechanics
   - useMemo vs useCallback

2. **When to Use useMemo:**
   - Expensive computations
   - Referential equality for objects/arrays
   - Avoiding unnecessary re-renders
   - When NOT to use (overuse)

3. **Custom Hooks Patterns:**
   - Naming convention: `use*`
   - Composing built-in hooks
   - Return patterns (tuple vs object)
   - TypeScript generics

4. **Common Custom Hooks:**
   - useLocalStorage
   - useDebounce
   - useToggle
   - useFetch
   - useForm

---

## PROJECT SETUP REQUEST

**SU DUNG SHARED-PROJECT DA CO:**

```
phase1/module1.3/
├── session-1.3.1-usestate-advanced/     (Exists)
├── session-1.3.2-useeffect-mastery/     (Exists)
├── session-1.3.3-useref-usecallback/    (Exists)
├── session-1.3.4-context-reducer/       (Exists)
│
├── session-1.3.5-usememo-customhooks/   <- TAO MOI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/                      (Exists)
    └── src/
        ├── session-1.3.1/               (Exists)
        ├── session-1.3.2/               (Exists)
        ├── session-1.3.3/               (Exists)
        ├── session-1.3.4/               (Exists)
        └── session-1.3.5/               <- TAO MOI (exercises)
            ├── 01-UseMemoBasics.tsx
            ├── 01-UseMemoBasics-Solution.tsx
            ├── 02-CustomHookBasics.tsx
            ├── 02-CustomHookBasics-Solution.tsx
            ├── 03-AdvancedCustomHooks.tsx
            └── 03-AdvancedCustomHooks-Solution.tsx
```

**No installation needed** - dung shared-project da co

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> useMemo don gian, Custom Hooks la patterns
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
 * Exercise 1: useMemo Basics
 * Difficulty: Medium
 *
 * LEARNING GOALS:
 * - Hieu useMemo syntax
 * - Memoize expensive calculations
 * - Dependencies array
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 */

import { useState, useMemo } from "react";

export function UseMemoBasics() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);

  // EXPENSIVE CALCULATION - should be memoized
  // Chi tinh lai khi numbers hoac multiplier thay doi
  const total = ???(() => {  // <- useMemo
    console.log("Calculating...");
    return ???.reduce((sum, n) => sum + n * ???, 0);  // <- numbers, multiplier
  }, [???, ???]);  // <- numbers, multiplier

  return (
    <div>
      <p>Total: {total}</p>
      <button onClick={() => setMultiplier(m => m + 1)}>
        Increase Multiplier ({multiplier})
      </button>

      <div className="hints">
        <h3>Hints:</h3>
        <ul>
          <li>Hook: useMemo</li>
          <li>Array: numbers</li>
          <li>Multiplier: multiplier</li>
          <li>Deps: [numbers, multiplier]</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## EXERCISES OVERVIEW

### **Exercise 1: useMemo Basics (20-25 phut)** - Medium

**Scenario:** Filter & Sort expensive operations

**Fill-in-blanks:**
1. `useMemo` hook call
2. Callback function body
3. Dependencies array
4. Accessing memoized value
5. Console.log to verify re-calculation

**Concepts:**
- useMemo syntax
- Expensive calculation identification
- Dependencies tracking
- Performance optimization

**Expected Behavior:**
- Filter operation chi chay khi list hoac filter thay doi
- Sort operation chi chay khi sortBy thay doi
- Console.log cho thay khi calculation chay

---

### **Exercise 2: Custom Hook Basics (25-30 phut)** - Hard

**Scenario:** useToggle & useLocalStorage hooks

**Part A: useToggle Hook**
Fill-in-blanks:
1. Hook naming: `use*`
2. Internal useState
3. Return pattern (tuple or object)
4. Toggle function

**Part B: useLocalStorage Hook**
Fill-in-blanks:
1. Lazy initialization
2. useEffect for sync
3. Generic type `<T>`
4. Error handling

**Concepts:**
- Custom hook naming convention
- Composing useState, useEffect
- Return patterns
- TypeScript generics

**Expected Behavior:**
- useToggle: true/false toggle
- useLocalStorage: persist data to localStorage

---

### **Exercise 3: Advanced Custom Hooks (30-40 phut)** - Expert

**Scenario:** useDebounce & useFetch hooks

**Part A: useDebounce Hook**
Fill-in-blanks:
1. useState for debounced value
2. useEffect with setTimeout
3. Cleanup clearTimeout
4. Dependencies array

**Part B: useFetch Hook**
Fill-in-blanks:
1. Loading, error, data states
2. useEffect with fetch
3. AbortController cleanup
4. Generic return type
5. Refetch function

**Concepts:**
- Debounce pattern
- Async operations in hooks
- AbortController
- Composing multiple hooks

**Expected Behavior:**
- useDebounce: delay value updates
- useFetch: fetch with loading/error states

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Medium-Hard (Custom Hooks can nhieu patterns)

**Thoi gian du kien:**
- Doc COMPLETE_THEORY.md: 45-60 phut
- Claude tom tat: 15 phut
- Exercise 1 (useMemo Basics): 20-25 phut (~6 blanks)
- Exercise 2 (Custom Hook Basics): 25-30 phut (~10 blanks)
- Exercise 3 (Advanced Hooks): 30-40 phut (~12 blanks)
- Quiz: 20-30 phut

**Total:** ~2.5-3.5 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- 3 exercises done voi tat ca blanks filled correctly
- Hieu useMemo syntax va use cases
- Biet tao custom hooks
- Hieu return patterns (tuple vs object)
- Quiz score >= 8/10
- Build duoc 4+ custom hooks

---

## COMMON PITFALLS (Se hoc cach tranh)

```tsx
// useMemo - missing dependencies
const filtered = useMemo(() => {
  return items.filter(item => item.name.includes(search));
}, [items]);  // Missing: search
// Dung: [items, search]

// useMemo - overuse
const doubled = useMemo(() => {
  return count * 2;
}, [count]);  // Unnecessary! count * 2 is cheap
// Dung: const doubled = count * 2;

// Custom Hook - wrong naming
function getLocalStorage() {}  // Khong bat dau voi "use"
// Dung: function useLocalStorage() {}

// Custom Hook - conditional hook call
if (condition) {
  const [value, setValue] = useLocalStorage('key', '');  // Loi!
}
// Dung: Always call hooks at top level

// useMemo vs useCallback
const fn = useMemo(() => {
  return () => console.log(count);  // Return function - use useCallback instead
}, [count]);
// Dung: const fn = useCallback(() => console.log(count), [count]);
```

---

## READY TO START

**AI, please:**

1. Tao folder `session-1.3.5-usememo-customhooks/` cho docs
2. Tao **COMPLETE_THEORY.md** voi:
   - useMemo fundamentals va syntax
   - When to use vs when NOT to use useMemo
   - useMemo vs useCallback comparison
   - Custom Hooks fundamentals
   - Naming convention va rules
   - Return patterns (tuple vs object)
   - Common custom hooks examples
   - TypeScript generics for hooks
   - Common mistakes & fixes
3. Tao **3 exercise files** voi **Fill-in-the-Blank Mode**:
   - Exercise 1: ~6 blanks (useMemo basics)
   - Exercise 2: ~10 blanks (useToggle + useLocalStorage)
   - Exercise 3: ~12 blanks (useDebounce + useFetch)
4. Tao **3 solution files** hoan chinh voi comments giai thich
5. Update **App.tsx** de them navigation cho session 1.3.5
6. Tao **quiz.md** voi 10 cau hoi
7. Tao **summary.md** voi checklist

**Luu y quan trong:**
- **FILL-IN-BLANK MODE:** Dung `???` voi `<-` hints
- **Structure co san:** imports, types, handlers, UI da viet
- **Chi can dien:** core concepts (memo deps, hook return)
- **Hints section:** UI co hints de tu kiem tra
- **Progressive difficulty:** Ex1 (Medium) -> Ex2 (Hard) -> Ex3 (Expert)
- **Practical examples:** Filter/Sort, LocalStorage, Debounce, Fetch

---

## KEY CONCEPTS TO COVER

### useMemo Pattern:
```tsx
// Memoize expensive calculation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize object reference
const config = useMemo(() => ({
  theme: 'dark',
  size: 'large'
}), []);  // Stable reference
```

### Custom Hook Patterns:

**Tuple Return (giong useState):**
```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle] as const;
}

// Usage
const [isOpen, toggle] = useToggle();
```

**Object Return (flexible):**
```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  return {
    value,
    toggle: () => setValue(v => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false)
  };
}

// Usage
const { value, toggle, setTrue } = useToggle();
```

### Generic Custom Hook:
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

---

## COMPARISON TABLE

| Feature | useMemo | useCallback |
|---------|---------|-------------|
| Memoizes | Value | Function |
| Returns | Computed value | Memoized function |
| Use case | Expensive calc | Stable callback |
| With React.memo | Object props | Function props |

| Return Pattern | Tuple `[a, b]` | Object `{ a, b }` |
|----------------|----------------|-------------------|
| Like | useState | useReducer |
| Destructuring | Position-based | Name-based |
| Flexibility | Less | More |
| Renaming | Easy | Verbose |

---

## CUSTOM HOOKS TO BUILD

1. **useToggle** - Boolean state shortcuts
2. **useLocalStorage** - Persist state to localStorage
3. **useDebounce** - Delay value updates
4. **useFetch** - Data fetching with states
5. **useForm** (Bonus) - Form handling

---

**LET'S MASTER useMemo & Custom Hooks!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-06
**FOR:** Session 1.3.5 - useMemo & Custom Hooks
**FORMAT:** Fill-in-the-Blank Mode
**PREVIOUS SESSION:** 1.3.4 - useContext & useReducer
