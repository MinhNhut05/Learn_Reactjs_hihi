# SESSION START FORM - Session 1.3.2

---

## SESSION INFO

**Session ID:** 1.3.2
**Session Title:** useEffect Mastery
**Module:** 1.3 - Hooks Deep Dive
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2.1 (36 sessions)

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1:** React Foundation (Session 9/11)
- **Module 1.3:** Hooks Deep Dive (Session 2/4)
- **Previous Session:** 1.3.1 - useState Advanced (Completed)
- **Next Session:** 1.3.3 - useRef & useCallback

**Prerequisites Completed:**
- Module 1.1: TypeScript cho React (4/4)
- Module 1.2: React Mental Model (3/3)
- Session 1.3.1: useState Advanced (lazy init, functional updates)

**Why This Session Important:**
- **useEffect** la hook kho nhat va hay bi lam dung nhat
- Hieu **dependencies array** - tranh infinite loops
- Master **cleanup** - prevent memory leaks
- Giai quyet **race conditions** trong async operations
- Nen tang cho custom hooks va data fetching

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **useEffect Fundamentals:**
   - Syntax va lifecycle timing
   - Dependencies array mechanics
   - Khi nao effect chay, khi nao khong

2. **Cleanup Functions:**
   - Memory leaks va cach tranh
   - Event listeners cleanup
   - Timers (setInterval/setTimeout) cleanup
   - AbortController cho fetch requests

3. **Data Fetching Patterns:**
   - Loading/Error states
   - Race condition problem
   - Proper abort/cleanup
   - Dependencies management

4. **Common Mistakes & Fixes:**
   - Infinite loops
   - Missing dependencies
   - Stale closures in effects
   - Over-using useEffect

---

## PROJECT SETUP REQUEST

**SU DUNG SHARED-PROJECT DA CO:**

```
phase1/module1.3/
├── session-1.3.1-usestate-advanced/     (Exists)
│
├── session-1.3.2-useeffect-mastery/     <- TAO MOI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/                      (Exists)
    └── src/
        ├── session-1.3.1/               (Exists)
        └── session-1.3.2/               <- TAO MOI (exercises)
            ├── 01-EffectBasics.tsx
            ├── 01-EffectBasics-Solution.tsx
            ├── 02-Cleanup.tsx
            ├── 02-Cleanup-Solution.tsx
            ├── 03-DataFetching.tsx
            └── 03-DataFetching-Solution.tsx
```

**No installation needed** - dung shared-project da co

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (60-90p) -> useEffect phuc tap hon useState
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
 * Exercise 1: useEffect Basics
 * Difficulty: Medium
 *
 * LEARNING GOALS:
 * - Hieu su khac biet giua 3 loai dependencies
 * - Quan sat khi nao effect chay
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 */

import { useState, useEffect } from "react";

export function EffectBasics() {
  const [count, setCount] = useState(0);

  // EFFECT 1: Chay khi count thay doi
  // Dien vao ??? de effect theo doi count

  useEffect(() => {
    console.log("[count] Effect: count =", ???);  // <- Dien bien can log
  }, [???]);  // <- Dien dependency

  // EFFECT 2: Chay CHI 1 LAN khi mount
  // Dien vao ??? - dependencies array rong la gi?

  useEffect(() => {
    console.log("[] Effect: Component mounted!");
  }, ???);  // <- Dien array rong

  // HANDLERS (DA VIET SAN)
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  // UI (DA VIET SAN)
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>

      <div className="hints">
        <h3>Hints:</h3>
        <ul>
          <li>Effect 1: count, [count]</li>
          <li>Effect 2: []</li>
        </ul>
      </div>
    </div>
  );
}
```

**Nguyen tac:**
- Structure co san (imports, types, handlers, UI)
- Chi can dien `???` vao dung cho
- Moi `???` co hint `<-` de huong dan
- Hints section trong UI cung cap dap an de kiem tra
- Solution file hoan chinh de so sanh

---

## EXERCISES OVERVIEW

### **Exercise 1: useEffect Basics (15-20 phut)** - Medium

**Scenario:** Count tracker voi different dependencies

**Fill-in-blanks:**
1. `useEffect` voi dependencies `[count]` - log bien nao?
2. `useEffect` voi dependencies `[]` - array rong?
3. `useEffect` khong co dependencies array

**Concepts:**
- Dependencies array: `[count]` vs `[]` vs `undefined`
- Effect execution timing
- Multiple effects trong 1 component

**Expected Behavior:**
- Effect with [count]: Logs moi khi count thay doi
- Effect with []: Logs chi 1 lan (mount)
- Effect without deps: Logs MOI render (dangerous!)

---

### **Exercise 2: Cleanup Functions (20-30 phut)** - Hard

**Scenario:** Component voi event listeners va timers

**Part A: Mouse Tracker**
Fill-in-blanks:
1. Event type: `MouseEvent`
2. Position properties: `clientX`, `clientY`
3. Add listener: `addEventListener("mousemove", handler)`
4. Remove listener: `removeEventListener("mousemove", handler)`
5. Dependencies array: `[]`

**Part B: Timer**
Fill-in-blanks:
1. Early return condition: `!isRunning`
2. Timer function: `setInterval(() => {...}, 1000)`
3. Functional update: `prev => prev + 1`
4. Clear timer: `clearInterval(intervalId)`
5. Dependencies: `[isRunning]`

**Concepts:**
- Cleanup function syntax `return () => {...}`
- Khi nao cleanup chay
- Memory leak neu khong cleanup
- Event listeners vs Intervals

---

### **Exercise 3: Data Fetching Patterns (25-35 phut)** - Expert

**Scenario:** User search voi API (JSONPlaceholder)

**Fill-in-blanks:**
1. Create controller: `new AbortController()`
2. Set loading: `setLoading(true)`
3. Clear error: `setError(null)`
4. Pass signal to fetch: `signal: abortController.signal`
5. Check abort error: `err.name === "AbortError"`
6. Set error message: `setError(err.message)`
7. Set loading false: `setLoading(false)`
8. Cancel method: `abortController.abort()`
9. Dependency: `[searchTerm]`

**Concepts:**
- Async operations in effects
- Loading/Error state patterns
- AbortController de cancel requests
- Race condition problem & solution
- Dependencies voi async functions

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Hard (useEffect la hook kho nhat)

**Thoi gian du kien:**
- Doc COMPLETE_THEORY.md: 60-90 phut (useEffect phuc tap)
- Claude tom tat: 15 phut
- Exercise 1 (Basics): 15-20 phut (3 blanks)
- Exercise 2 (Cleanup): 20-30 phut (10 blanks)
- Exercise 3 (Data Fetching): 25-35 phut (9 blanks)
- Quiz: 20-30 phut

**Total:** ~2.5-3.5 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- 3 exercises done voi tat ca blanks filled correctly
- Hieu dependencies array mechanics
- Biet cleanup functions va khi nao can
- Giai quyet duoc race conditions
- Quiz score >= 8/10
- KHONG con infinite loops trong code

---

## COMMON PITFALLS (Se hoc cach tranh)

```tsx
// Infinite loop
useEffect(() => {
  setCount(count + 1);
}); // No dependencies!

// Missing dependency
useEffect(() => {
  console.log(count);
}, []); // ESLint warning!

// No cleanup
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  // Missing: return () => clearInterval(interval);
}, []);

// Race condition
useEffect(() => {
  fetchData().then(setData);
  // Missing: abort previous request
}, [searchTerm]);
```

---

## READY TO START

**AI, please:**

1. Tao folder `session-1.3.2-useeffect-mastery/` cho docs
2. Tao **COMPLETE_THEORY.md** voi:
   - useEffect fundamentals
   - Dependencies array deep dive
   - Cleanup patterns
   - Data fetching best practices
   - Common mistakes & fixes
3. Tao **3 exercise files** voi **Fill-in-the-Blank Mode**:
   - Exercise 1: ~3 blanks (dependencies)
   - Exercise 2: ~10 blanks (event listeners + intervals)
   - Exercise 3: ~9 blanks (AbortController)
4. Tao **3 solution files** hoan chinh voi comments giai thich
5. Update **App.tsx** de them navigation cho session 1.3.2
6. Tao **quiz.md** voi 10 cau hoi (focus vao dependencies va cleanup)
7. Tao **summary.md** voi checklist

**Luu y quan trong:**
- **FILL-IN-BLANK MODE:** Dung `???` voi `<-` hints
- **Structure co san:** imports, types, handlers, UI da viet
- **Chi can dien:** core concepts (dependencies, cleanup, abort)
- **Hints section:** UI co hints de tu kiem tra
- **Progressive difficulty:** Ex1 (Medium) -> Ex2 (Hard) -> Ex3 (Expert)
- **API su dung:** JSONPlaceholder (https://jsonplaceholder.typicode.com/users)

---

## FORMAT IMPROVEMENTS FROM FEEDBACK

| Old Format | New Format |
|------------|------------|
| Skeleton mode - 28+ TODOs | Fill-in-blank - ~22 blanks |
| Viet qua nhieu code | Chi dien `???` vao dung cho |
| Khong biet dien gi | `<-` hints huong dan |
| Kho kiem tra dung sai | Hints section trong UI |

---

**LET'S MASTER useEffect!**

---

**VERSION:** 3.0
**CREATED:** 2025-01-05
**UPDATED:** 2025-01-06
**FOR:** Session 1.3.2 - useEffect Mastery
**FORMAT:** Fill-in-the-Blank Mode
**FEEDBACK FROM:** User - "viet vua du de hieu, khong nhieu qua, khong it qua"
