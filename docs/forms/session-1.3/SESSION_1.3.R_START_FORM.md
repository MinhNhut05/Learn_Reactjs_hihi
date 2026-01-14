# SESSION START FORM - Session 1.3.R

---

## SESSION INFO

**Session ID:** 1.3.R
**Session Title:** Hooks Review & Mini Project
**Module:** 1.3 - Hooks Deep Dive
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2.1 (36 sessions)

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1:** React Foundation (Session 13/13 - FINAL!)
- **Module 1.3:** Hooks Deep Dive (Session 6/6 - REVIEW)
- **Previous Session:** 1.3.5 - useMemo & Custom Hooks (Completed)
- **Next Phase:** Phase 1.5 - Tailwind CSS Mastery

**Prerequisites Completed:**
- Module 1.1: TypeScript cho React (4/4) ✅
- Module 1.2: React Mental Model (3/3) ✅
- Session 1.3.1: useState Advanced ✅
- Session 1.3.2: useEffect Mastery ✅
- Session 1.3.3: useRef & useCallback ✅
- Session 1.3.4: useContext & useReducer ✅
- Session 1.3.5: useMemo & Custom Hooks ✅

**Why This Session Important:**
- **Review** - Củng cố tất cả hooks đã học
- **Mini Project** - Apply ALL hooks trong 1 project
- **Validate** - Đánh giá readiness cho Phase 2
- **Complete Phase 1** - Foundation cho React career

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **Review All Hooks:**
   - useState, useEffect, useRef
   - useCallback, useMemo
   - useContext, useReducer
   - Custom Hooks patterns

2. **Build Mini Project:**
   - Task Manager App
   - Apply TẤT CẢ hooks
   - TypeScript best practices
   - Clean code structure

3. **Self-Assessment:**
   - Identify weak areas
   - Measure progress
   - Prepare for Phase 2

---

## PROJECT SETUP REQUEST

**SU DUNG SHARED-PROJECT DA CO:**

```
phase1/module1.3/
├── session-1.3.1-usestate-advanced/     (Exists)
├── session-1.3.2-useeffect-mastery/     (Exists)
├── session-1.3.3-useref-usecallback/    (Exists)
├── session-1.3.4-context-reducer/       (Exists)
├── session-1.3.5-usememo-customhooks/   (Exists)
│
├── session-1.3.R-hooks-review/          <- TAO MOI (docs)
│   ├── REVIEW_GUIDE.md
│   ├── MINI_PROJECT.md
│   ├── SELF_ASSESSMENT.md
│   └── summary.md
│
└── shared-project/                      (Exists)
    └── src/
        ├── session-1.3.1/ to 1.3.5/     (Exists)
        └── session-1.3.R/               <- TAO MOI (mini project)
            ├── TaskManager/
            │   ├── components/
            │   │   ├── TaskList.tsx
            │   │   ├── TaskItem.tsx
            │   │   ├── TaskForm.tsx
            │   │   ├── TaskFilter.tsx
            │   │   └── ThemeToggle.tsx
            │   ├── hooks/
            │   │   ├── useLocalStorage.ts
            │   │   ├── useDebounce.ts
            │   │   └── useTaskStats.ts
            │   ├── context/
            │   │   ├── TaskContext.tsx
            │   │   └── ThemeContext.tsx
            │   ├── reducers/
            │   │   └── taskReducer.ts
            │   ├── types/
            │   │   └── index.ts
            │   └── TaskManager.tsx
            └── index.tsx
```

---

## SESSION FORMAT

### **Learning Flow (Khác session thường):**
```
PART 1: Quick Review (30p)    -> Ôn lại concepts chính
PART 2: Timed Challenges (1h) -> Code không xem solution
PART 3: Mini Project (2-3h)   -> Build Task Manager
PART 4: Self-Assessment (30p) -> Đánh giá và plan
```

---

## PART 1: QUICK REVIEW (30 phút)

### Hooks Cheat Sheet:

| Hook | Purpose | Key Points |
|------|---------|------------|
| `useState` | Local state | Lazy init, functional updates |
| `useEffect` | Side effects | Deps array, cleanup, AbortController |
| `useRef` | DOM/mutable values | No re-render, .current |
| `useCallback` | Memoize function | Use with React.memo |
| `useMemo` | Memoize value | Expensive calculations |
| `useContext` | Global state | Provider pattern |
| `useReducer` | Complex state | Actions, dispatch |

### Quick Recall Questions:
1. `useState` lazy initialization khi nao?
2. `useEffect` cleanup chay khi nao?
3. `useRef` vs `useState` - khac biet?
4. `useCallback` vs `useMemo` - khac biet?
5. `useContext` + `useReducer` = ?

---

## PART 2: TIMED CHALLENGES (1 hour)

### **Challenge 1: Hook Identification (15 phút)**

Xem code va identify hook can dung:

```tsx
// Scenario 1: Store input reference for focus
const ??? = ???<HTMLInputElement>(null);

// Scenario 2: Expensive filter operation
const filtered = ???(() => {
  return items.filter(i => i.name.includes(search));
}, [items, search]);

// Scenario 3: Callback for child component
const handleClick = ???(() => {
  setCount(c => c + 1);
}, []);

// Scenario 4: Fetch data on mount
???(()  => {
  fetchData().then(setData);
}, []);

// Scenario 5: Complex form state
const [state, dispatch] = ???(formReducer, initialState);
```

**Answers:** useRef, useMemo, useCallback, useEffect, useReducer

---

### **Challenge 2: Debug Hooks (20 phút)**

Tim va fix loi trong code:

```tsx
// Bug 1: Infinite loop
useEffect(() => {
  setCount(count + 1);
}); // ???

// Bug 2: Stale closure
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, []); // ???

// Bug 3: Missing cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []); // ???

// Bug 4: Wrong dependency
const handleClick = useCallback(() => {
  console.log(count);
}, []); // ???

// Bug 5: Unnecessary useMemo
const doubled = useMemo(() => count * 2, [count]); // ???
```

---

### **Challenge 3: Build Custom Hook (25 phút)**

Build `useAsync` hook tu dau:

```tsx
interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  run: (promise: Promise<T>) => void;
  reset: () => void;
}

function useAsync<T>(): UseAsyncReturn<T> {
  // TODO: Implement
  // - useState for data, loading, error
  // - run function to execute promise
  // - reset function to clear state
  // - Handle loading, success, error states
}

// Usage:
const { data, loading, error, run } = useAsync<User>();

useEffect(() => {
  run(fetchUser(userId));
}, [userId]);
```

---

## PART 3: MINI PROJECT - Task Manager (2-3 hours)

### **Project Requirements:**

Build Task Manager app voi features:

**Core Features:**
1. Add tasks (text input)
2. Toggle task completion
3. Delete tasks
4. Filter tasks (All/Active/Completed)
5. Search tasks (with debounce)
6. Theme toggle (Light/Dark)
7. Persist to localStorage

**Technical Requirements:**
- [ ] `useState` - Local component states
- [ ] `useEffect` - Persist to localStorage, debounce
- [ ] `useRef` - Input focus after add
- [ ] `useCallback` - Memoize handlers for TaskItem
- [ ] `useMemo` - Filter + search expensive operation
- [ ] `useContext` - Theme context
- [ ] `useReducer` - Task state management
- [ ] Custom Hooks - useLocalStorage, useDebounce, useTaskStats

---

### **Project Structure:**

```
session-1.3.R/
└── TaskManager/
    ├── types/
    │   └── index.ts           # Task, Filter types
    │
    ├── reducers/
    │   └── taskReducer.ts     # useReducer logic
    │
    ├── context/
    │   ├── TaskContext.tsx    # Tasks context + provider
    │   └── ThemeContext.tsx   # Theme context + provider
    │
    ├── hooks/
    │   ├── useLocalStorage.ts # Persist hook
    │   ├── useDebounce.ts     # Debounce hook
    │   └── useTaskStats.ts    # Derived stats hook
    │
    ├── components/
    │   ├── TaskForm.tsx       # Add task form
    │   ├── TaskList.tsx       # List container
    │   ├── TaskItem.tsx       # Single task (React.memo)
    │   ├── TaskFilter.tsx     # Filter buttons
    │   ├── TaskSearch.tsx     # Search input
    │   ├── TaskStats.tsx      # Stats display
    │   └── ThemeToggle.tsx    # Theme switcher
    │
    └── TaskManager.tsx        # Main component
```

---

### **Hooks Usage Map:**

| Component/Hook | useState | useEffect | useRef | useCallback | useMemo | useContext | useReducer |
|---------------|----------|-----------|--------|-------------|---------|------------|------------|
| TaskContext | - | - | - | - | - | - | ✅ |
| ThemeContext | ✅ | ✅ (persist) | - | ✅ | - | - | - |
| TaskForm | ✅ (input) | - | ✅ (focus) | - | - | ✅ | - |
| TaskList | - | - | - | ✅ | ✅ (filter) | ✅ | - |
| TaskItem | - | - | - | - | - | ✅ | - |
| TaskSearch | ✅ | - | - | - | - | - | - |
| useDebounce | ✅ | ✅ | - | - | - | - | - |
| useLocalStorage | ✅ | ✅ | - | - | - | - | - |
| useTaskStats | - | - | - | - | ✅ | ✅ | - |

---

### **Implementation Steps:**

**Step 1: Types & Reducer (20 phút)**
```tsx
// types/index.ts
interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type Filter = 'all' | 'active' | 'completed';

// reducers/taskReducer.ts
type TaskAction =
  | { type: 'ADD_TASK'; text: string }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_TASKS'; tasks: Task[] };
```

**Step 2: Custom Hooks (30 phút)**
- useLocalStorage
- useDebounce
- useTaskStats

**Step 3: Contexts (30 phút)**
- TaskContext (state + dispatch)
- ThemeContext (theme + toggle)

**Step 4: Components (60 phút)**
- Build from bottom up
- Apply React.memo where needed
- Use proper hooks in each

**Step 5: Integration (30 phút)**
- Wire everything together
- Test all features
- Fix bugs

---

## PART 4: SELF-ASSESSMENT (30 phút)

### **Hooks Mastery Checklist:**

Rate yourself 1-5 for each:

| Skill | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| useState (lazy init, functional update) | | | | | |
| useEffect (deps, cleanup, AbortController) | | | | | |
| useRef (DOM, mutable values) | | | | | |
| useCallback (memoize, React.memo combo) | | | | | |
| useMemo (expensive calc, referential equality) | | | | | |
| useContext (create, provide, consume) | | | | | |
| useReducer (reducer, dispatch, actions) | | | | | |
| Custom Hooks (naming, compose, return) | | | | | |

**Scoring:**
- 35-40: Ready for Phase 2!
- 28-34: Good, minor review needed
- 20-27: Need more practice
- <20: Review Module 1.3 again

---

### **Mini Project Checklist:**

**Features:**
- [ ] Add tasks works
- [ ] Toggle completion works
- [ ] Delete tasks works
- [ ] Filter All/Active/Completed works
- [ ] Search with debounce works
- [ ] Theme toggle works
- [ ] Persist to localStorage works
- [ ] Stats display correctly

**Code Quality:**
- [ ] TypeScript types correct
- [ ] No any types
- [ ] No ESLint warnings
- [ ] Clean folder structure
- [ ] Proper hook usage

**Performance:**
- [ ] TaskItem uses React.memo
- [ ] Handlers use useCallback
- [ ] Filter uses useMemo
- [ ] No unnecessary re-renders

---

### **Weak Areas Action Plan:**

Neu score thap o hook nao, quay lai session tuong ung:

| Weak Area | Review Session |
|-----------|----------------|
| useState | 1.3.1 |
| useEffect | 1.3.2 |
| useRef, useCallback | 1.3.3 |
| useContext, useReducer | 1.3.4 |
| useMemo, Custom Hooks | 1.3.5 |

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- [ ] Quick Review done - recall all hooks
- [ ] Timed Challenges >= 80% correct
- [ ] Mini Project complete voi all features
- [ ] Self-Assessment score >= 28/40
- [ ] All checklist items passed
- [ ] Ready for Phase 1.5 (Tailwind)!

---

## READY TO START

**AI, please:**

1. Tao folder `session-1.3.R-hooks-review/` cho docs
2. Tao **REVIEW_GUIDE.md** voi hooks cheat sheet
3. Tao **MINI_PROJECT.md** voi:
   - Detailed requirements
   - Step-by-step guide
   - Code scaffolding (structure only)
4. Tao **SELF_ASSESSMENT.md** voi checklists
5. Tao **summary.md** voi final Phase 1 recap
6. Tao **Mini Project scaffolding** trong shared-project:
   - Folder structure
   - Type files
   - Empty component files
   - Context/Reducer templates
7. Update **App.tsx** de them navigation

**Luu y quan trong:**
- **Review focus:** Quick recall, not deep theory
- **Challenges:** Timed, no peeking!
- **Mini Project:** Apply ALL hooks
- **Self-Assessment:** Honest evaluation
- **This is FINAL session of Phase 1!**

---

## CELEBRATION! 🎉

Sau session nay, ban da hoan thanh:

- **Module 1.1:** TypeScript cho React (4 sessions)
- **Module 1.2:** React Mental Model (3 sessions)
- **Module 1.3:** Hooks Deep Dive (6 sessions)

**Total: 13 sessions of Phase 1!**

**Next:** Phase 1.5 - Tailwind CSS Mastery

---

**VERSION:** 1.0
**CREATED:** 2025-01-06
**FOR:** Session 1.3.R - Hooks Review & Mini Project
**TYPE:** Review + Project
**PREVIOUS SESSION:** 1.3.5 - useMemo & Custom Hooks
