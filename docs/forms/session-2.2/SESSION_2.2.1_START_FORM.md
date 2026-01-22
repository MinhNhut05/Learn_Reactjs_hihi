# SESSION START FORM - Session 2.2.1

---

## SESSION INFO

**Session ID:** 2.2.1
**Session Title:** Redux Toolkit Basics
**Module:** 2.2 - Redux Toolkit
**Phase:** Phase 2 - State Management & Data Fetching
**Roadmap Version:** V2.1
**Duration:** 2-3 hours

---

## SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 2:** State Management & Data Fetching (Session 4/12)
- **Previous Session:** 2.2.0 - Flux Pattern & Redux Concepts
- **Next Session:** 2.2.2 - RTK Async & Patterns

**Prerequisites Completed:**
- Session 2.2.0 - Hiểu Flux Pattern
- Hiểu 3 nguyên tắc Redux
- Hiểu useReducer hook
- TypeScript basics

**Why This Session Important:**
- **Industry Standard** - Redux vẫn được dùng rộng rãi trong enterprise
- **Job Requirement** - Nhiều job posting yêu cầu Redux experience
- **Foundation** - Hiểu RTK giúp hiểu Zustand dễ hơn
- **DevTools** - Redux DevTools là công cụ debug mạnh mẽ

---

## LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Setup Redux Toolkit** với configureStore
2. **Tạo slices** với createSlice
3. **Sử dụng useSelector** để đọc state
4. **Sử dụng useDispatch** để dispatch actions
5. **Tạo typed hooks** (useAppSelector, useAppDispatch)
6. **Sử dụng Redux DevTools** để debug
7. **Build Counter App** với RTK
8. **Build Todo App** với RTK

---

## PROJECT SETUP

**Project:** RTK Learning App (tiếp tục từ 2.2.0)
**Location:** `phase2/module2.2/rtk-learning-app/`

**Install Dependencies:**
```bash
cd phase2/module2.2/rtk-learning-app
npm install @reduxjs/toolkit react-redux
```

**Folder Structure sau session này:**
```
rtk-learning-app/
├── src/
│   ├── app/
│   │   ├── store.ts              # Redux store
│   │   └── hooks.ts              # Typed hooks
│   ├── features/
│   │   ├── counter/
│   │   │   ├── counterSlice.ts   # Counter slice
│   │   │   └── Counter.tsx       # Counter component
│   │   └── todos/
│   │       ├── todosSlice.ts     # Todos slice
│   │       ├── filterSlice.ts    # Filter slice
│   │       ├── TodoList.tsx
│   │       ├── TodoItem.tsx
│   │       ├── AddTodo.tsx
│   │       └── FilterButtons.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

---

## KEY CONCEPTS TO COVER

### 1. configureStore - Setup Redux Store

```typescript
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});

// TypeScript types cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**configureStore tự động:**
- Setup Redux DevTools
- Thêm thunk middleware
- Enable development checks (mutation, serializable)

---

### 2. Provider - Wrap App

```typescript
// src/main.tsx
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

### 3. createSlice - Reducer + Actions

```typescript
// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Định nghĩa State type
interface CounterState {
  value: number;
  incrementAmount: number;
}

// 2. Initial state
const initialState: CounterState = {
  value: 0,
  incrementAmount: 1,
};

// 3. Tạo slice
const counterSlice = createSlice({
  name: 'counter',       // Prefix cho action types
  initialState,
  reducers: {
    // Action: counter/increment
    increment: (state) => {
      state.value += 1;  // Immer cho phép "mutate"!
    },

    // Action: counter/decrement
    decrement: (state) => {
      state.value -= 1;
    },

    // Action với payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    // Reset về 0
    reset: (state) => {
      state.value = 0;
    },

    // Set increment amount
    setIncrementAmount: (state, action: PayloadAction<number>) => {
      state.incrementAmount = action.payload;
    },
  },
});

// 4. Export actions (tự động generated)
export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
  setIncrementAmount
} = counterSlice.actions;

// 5. Export reducer
export default counterSlice.reducer;

// 6. Selectors (optional but recommended)
export const selectCount = (state: RootState) => state.counter.value;
export const selectIncrementAmount = (state: RootState) => state.counter.incrementAmount;
```

**Giải thích Immer:**
```typescript
// ❌ Redux truyền thống - Phải return new object
return { ...state, value: state.value + 1 };

// ✅ RTK với Immer - "Mutate" syntax, nhưng immutable internally
state.value += 1;  // Immer tracks changes và creates new object

// Behind the scenes, Immer does:
// return produce(state, draft => { draft.value += 1 });
```

---

### 4. useSelector - Đọc State

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectCount } from './counterSlice';

function Counter() {
  // Cách 1: Inline selector
  const count = useSelector((state: RootState) => state.counter.value);

  // Cách 2: Pre-defined selector (recommended)
  const count = useSelector(selectCount);

  return <div>Count: {count}</div>;
}
```

**useSelector hoạt động như thế nào:**
- Subscribe component to store
- Khi state thay đổi, so sánh old vs new value
- Re-render chỉ khi selected value thay đổi
- Dùng `===` comparison mặc định

---

### 5. useDispatch - Gửi Actions

```typescript
import { useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

function Counter() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
```

---

### 6. Typed Hooks (Best Practice)

```typescript
// src/app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed versions - sử dụng trong toàn app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```typescript
// Trong component - không cần type mỗi lần
import { useAppSelector, useAppDispatch } from '../../app/hooks';

function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.counter.value); // Auto-typed!

  // ...
}
```

---

### 7. Redux DevTools

**Install Chrome Extension:** Redux DevTools

**Features:**
- **State inspector** - Xem toàn bộ state tree
- **Action log** - Xem mọi action đã dispatch
- **Time-travel** - "Jump" đến bất kỳ state nào
- **Diff** - Xem state thay đổi như thế nào
- **Export/Import** - Save state để debug

```typescript
// DevTools tự động enable với configureStore
// Có thể customize:
export const store = configureStore({
  reducer: { /* ... */ },
  devTools: process.env.NODE_ENV !== 'production',
});
```

---

## EXERCISES

### Mini Exercise: Counter với RTK (25 phút)

**Mục tiêu:** Tạo Counter app hoàn chỉnh với Redux Toolkit

**Requirements:**
```typescript
// Counter features:
// - Display current count
// - Increment (+1)
// - Decrement (-1)
// - Increment by custom amount
// - Reset to 0
// - Async increment (delay 1s) - Bonus
```

**UI Preview:**
```
┌─────────────────────────────────────┐
│                                     │
│            Count: 42                │
│                                     │
│    [ - ]    [ + ]    [ +5 ]        │
│                                     │
│    Amount: [___3___]  [ Add ]      │
│                                     │
│           [ Reset ]                 │
│                                     │
└─────────────────────────────────────┘
```

**Checklist:**
- [ ] `src/app/store.ts` với configureStore
- [ ] `src/app/hooks.ts` với typed hooks
- [ ] `src/features/counter/counterSlice.ts`
  - [ ] CounterState interface
  - [ ] initialState
  - [ ] reducers: increment, decrement, incrementByAmount, reset
  - [ ] Export actions và reducer
  - [ ] Selectors
- [ ] `src/features/counter/Counter.tsx`
  - [ ] useAppSelector để đọc count
  - [ ] useAppDispatch để dispatch actions
  - [ ] Input cho custom amount
  - [ ] Buttons: -, +, +5, Add Amount, Reset
- [ ] Provider wrap trong main.tsx
- [ ] Tailwind styling
- [ ] Redux DevTools hoạt động

**Code Template:**

```typescript
// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // TODO: Implement
    },
    decrement: (state) => {
      // TODO: Implement
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // TODO: Implement
    },
    reset: (state) => {
      // TODO: Implement
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;
```

---

### Real Exercise: Todo App với RTK (45 phút)

**Mục tiêu:** Build Todo App hoàn chỉnh với Redux Toolkit

**Features:**
```
1. Add new todo
2. Toggle complete status
3. Delete todo
4. Filter: All | Active | Completed
5. Clear completed
6. Show items count
```

**UI Preview:**
```
┌─────────────────────────────────────────────────┐
│  📝 Todo App                                    │
├─────────────────────────────────────────────────┤
│  [ Enter new todo...           ] [ Add ]        │
├─────────────────────────────────────────────────┤
│  ☐ Learn Redux Toolkit                     [x]  │
│  ☑ Understand createSlice                  [x]  │
│  ☐ Build Counter App                       [x]  │
│  ☑ Setup DevTools                          [x]  │
├─────────────────────────────────────────────────┤
│  [ All ] [ Active ] [ Completed ]               │
│                                                 │
│  2 items left          [ Clear Completed ]      │
└─────────────────────────────────────────────────┘
```

**State Structure:**
```typescript
// todosSlice state
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodosState {
  items: Todo[];
}

// filterSlice state
type FilterValue = 'all' | 'active' | 'completed';

interface FilterState {
  value: FilterValue;
}

// RootState
{
  todos: {
    items: [
      { id: '1', text: 'Learn RTK', completed: false, createdAt: 1234567890 },
      { id: '2', text: 'Build App', completed: true, createdAt: 1234567891 },
    ]
  },
  filter: {
    value: 'all'
  }
}
```

**Folder Structure:**
```
features/todos/
├── todosSlice.ts      # Todos state + reducers
├── filterSlice.ts     # Filter state
├── selectors.ts       # Memoized selectors
├── TodoList.tsx       # List container
├── TodoItem.tsx       # Single todo item
├── AddTodo.tsx        # Add form
└── FilterButtons.tsx  # Filter buttons
```

**Checklist:**

**1. todosSlice.ts:**
- [ ] Todo interface với id, text, completed, createdAt
- [ ] TodosState với items array
- [ ] Reducers:
  - [ ] `addTodo` - PayloadAction<string>
  - [ ] `toggleTodo` - PayloadAction<string> (id)
  - [ ] `deleteTodo` - PayloadAction<string> (id)
  - [ ] `clearCompleted` - remove completed todos
- [ ] Initial state với 2-3 sample todos

**2. filterSlice.ts:**
- [ ] FilterValue type
- [ ] filterSlice với setFilter reducer

**3. selectors.ts:**
- [ ] `selectAllTodos`
- [ ] `selectFilter`
- [ ] `selectFilteredTodos` - filter based on current filter
- [ ] `selectActiveCount` - count of active todos
- [ ] `selectCompletedCount`

**4. Components:**
- [ ] `TodoList.tsx` - map filtered todos
- [ ] `TodoItem.tsx` - checkbox, text, delete button
- [ ] `AddTodo.tsx` - input + add button
- [ ] `FilterButtons.tsx` - All, Active, Completed buttons

**5. Styling (Tailwind):**
- [ ] Card container
- [ ] Checkbox styling cho completed
- [ ] Line-through cho completed text
- [ ] Active filter button highlight
- [ ] Hover states cho buttons

**Code Templates:**

```typescript
// todosSlice.ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [
    { id: nanoid(), text: 'Learn Redux Toolkit', completed: false, createdAt: Date.now() },
    { id: nanoid(), text: 'Build a todo app', completed: true, createdAt: Date.now() },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      },
      // Prepare callback - generate id before reducer
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
          createdAt: Date.now(),
        },
      }),
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(t => !t.completed);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
```

```typescript
// selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.filter.value;

// Memoized selector - chỉ recalculate khi dependencies thay đổi
export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }
);

export const selectActiveCount = createSelector(
  [selectAllTodos],
  (todos) => todos.filter(t => !t.completed).length
);
```

---

## INTERVIEW Q&A

### Q1: createSlice làm gì?

**Expected Answer:**
> createSlice là một function của RTK kết hợp:
> - Tạo reducer function
> - Tự động generate action creators
> - Tự động generate action types (dựa trên name + reducer name)
>
> Ví dụ: `name: 'counter'` + `increment` reducer → action type `counter/increment`

---

### Q2: Tại sao có thể "mutate" state trong reducer?

**Expected Answer:**
> RTK sử dụng **Immer** library. Khi bạn viết mutation code như `state.value += 1`, Immer:
> 1. Tạo một "draft" proxy của state
> 2. Track tất cả changes bạn làm
> 3. Produce một new immutable state object
>
> Bạn không thực sự mutate state gốc - Immer làm việc đó một cách immutable.

---

### Q3: PayloadAction<T> là gì?

**Expected Answer:**
> `PayloadAction<T>` là TypeScript type từ RTK định nghĩa action structure:
> ```typescript
> {
>   type: string;
>   payload: T;  // Type của data bạn truyền vào
> }
> ```
> Giúp TypeScript biết type của action.payload trong reducer.

---

### Q4: configureStore vs createStore (Redux cũ)?

**Expected Answer:**
> | configureStore | createStore |
> |----------------|-------------|
> | RTK, recommended | Redux core, deprecated |
> | DevTools tự động | Phải setup thủ công |
> | Thunk middleware included | Phải add middleware |
> | Development checks | Không có |
> | Simpler API | Nhiều boilerplate |

---

### Q5: useSelector hoạt động như thế nào?

**Expected Answer:**
> 1. Component subscribe to Redux store
> 2. Mỗi khi store update, selector function chạy lại
> 3. So sánh old value vs new value (strict equality `===`)
> 4. Nếu khác → component re-render
> 5. Nếu giống → không re-render
>
> **Lưu ý:** Nếu selector return new object/array mỗi lần → luôn re-render → dùng createSelector để memoize.

---

### Q6: useDispatch trả về gì?

**Expected Answer:**
> `useDispatch` trả về dispatch function của store.
> Dùng để gửi actions đến store:
> ```typescript
> const dispatch = useDispatch();
> dispatch(increment());           // Action creator
> dispatch({ type: 'INCREMENT' }); // Plain object
> ```

---

### Q7: Redux DevTools dùng để làm gì?

**Expected Answer:**
> - **View state tree** - Xem toàn bộ application state
> - **Action log** - Xem history của tất cả actions
> - **Time-travel debugging** - Jump đến bất kỳ point nào trong history
> - **State diff** - Xem state thay đổi như thế nào sau mỗi action
> - **Export/Import** - Save và load state để reproduce bugs

---

### Q8: So sánh RTK với useReducer + Context?

**Expected Answer:**
> | RTK | useReducer + Context |
> |-----|---------------------|
> | DevTools support | Không có |
> | Middleware (async) | Phải tự implement |
> | Selective re-render | Context re-render subtree |
> | Learning curve cao hơn | Simpler |
> | Cần install | Built-in |
> | Enterprise apps | Small-medium apps |

---

## SUCCESS CRITERIA

Session 2.2.1 hoàn thành khi:

- [ ] Hiểu configureStore và cách setup store
- [ ] Tạo được slice với createSlice
- [ ] Sử dụng được useSelector và useDispatch
- [ ] Setup được typed hooks
- [ ] Redux DevTools hoạt động và biết cách sử dụng
- [ ] Hoàn thành Mini Exercise - Counter App
- [ ] Hoàn thành Real Exercise - Todo App
- [ ] Todo App có filter hoạt động
- [ ] Code TypeScript không có errors
- [ ] Trả lời được 6/8 Knowledge Check

---

## COMMON PITFALLS

1. **Quên wrap app với Provider**
   ```typescript
   // ❌ Error: could not find react-redux context value
   <App />

   // ✅ Correct
   <Provider store={store}>
     <App />
   </Provider>
   ```

2. **Mutate state ngoài createSlice**
   ```typescript
   // ❌ Immer chỉ work trong createSlice reducers
   const todos = useSelector(state => state.todos);
   todos.push(newTodo); // WRONG!

   // ✅ Dispatch action
   dispatch(addTodo('New todo'));
   ```

3. **Selector return new reference mỗi lần**
   ```typescript
   // ❌ Filter tạo new array → re-render mỗi dispatch
   const activeTodos = useSelector(state =>
     state.todos.filter(t => !t.completed)
   );

   // ✅ Dùng createSelector để memoize
   const selectActiveTodos = createSelector(
     [selectTodos],
     (todos) => todos.filter(t => !t.completed)
   );
   ```

4. **Quên export actions**
   ```typescript
   // ❌ Quên export
   const { increment } = counterSlice.actions;

   // ✅ Export để components có thể import
   export const { increment } = counterSlice.actions;
   ```

---

## DIFFICULTY & TIME ESTIMATE

**Độ khó:** Medium

**Thời gian dự kiến:**
- Setup & Theory: 30 phút
- Mini Exercise (Counter): 30 phút
- Real Exercise (Todo App): 60 phút
- Knowledge Check: 20 phút

**Total:** ~2.5 hours

---

## READY TO START

**AI, please:**

1. **Verify project setup** từ 2.2.0
2. **Install RTK dependencies** nếu chưa
3. **Guide Counter Exercise** step by step
4. **Guide Todo App Exercise** với focus vào:
   - Slice patterns
   - Selectors
   - Component structure
5. **Demo Redux DevTools** usage
6. **Quiz Knowledge Check**

**Lưu ý quan trọng:**
- Dùng **typed hooks** từ đầu (useAppSelector, useAppDispatch)
- Focus vào **DevTools debugging**
- **Selectors** với createSelector khi cần filter/transform
- **Tailwind** cho styling

---

**VERSION:** 1.0
**CREATED:** 2025-01-19
**FOR:** Session 2.2.1 - Redux Toolkit Basics
**PROJECT:** RTK Learning App
**PREVIOUS SESSION:** 2.2.0 - Flux Pattern
**NEXT SESSION:** 2.2.2 - RTK Async & Patterns
