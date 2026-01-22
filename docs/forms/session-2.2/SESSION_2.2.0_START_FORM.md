# SESSION START FORM - Session 2.2.0

---

## SESSION INFO

**Session ID:** 2.2.0
**Session Title:** Flux Pattern & Redux Concepts
**Module:** 2.2 - Redux Toolkit
**Phase:** Phase 2 - State Management & Data Fetching
**Roadmap Version:** V2.1
**Duration:** 30-45 phút (Intro session)

---

## SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 2:** State Management & Data Fetching
- **Previous Session:** 2.1.2 - Advanced Patterns (Render Props, HOC)
- **Next Session:** 2.2.1 - Redux Toolkit Basics

**Prerequisites Completed:**
- Module 2.1 - Component Patterns (Compound, Render Props, HOC)
- Hiểu React hooks (useState, useReducer, useContext)
- TypeScript basics

**Why This Session Important:**
- **Foundation** - Flux pattern là nền tảng của tất cả state management libraries
- **Mental Model** - Hiểu "data flows one direction"
- **Redux Understanding** - Cần hiểu Flux để hiểu Redux
- **Interview Topic** - Câu hỏi về architecture patterns

---

## LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Hiểu Flux Pattern** - Unidirectional data flow
2. **Hiểu các thành phần** - Action, Dispatcher, Store, View
3. **So sánh với MVC** - Tại sao Flux tốt hơn cho React
4. **Hiểu Redux evolution** - Từ Flux đến Redux đến RTK
5. **So sánh useReducer và Redux** - Điểm giống và khác

---

## PROJECT SETUP

**Project:** RTK Learning App (Mới)
**Location:** `phase2/module2.2/rtk-learning-app/`

**Initial Setup:**
```bash
# Tạo project với Vite + React + TypeScript
cd phase2/module2.2
npm create vite@latest rtk-learning-app -- --template react-ts
cd rtk-learning-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Dependencies cho RTK (chưa install, sẽ install ở 2.2.1):**
```bash
npm install @reduxjs/toolkit react-redux
npm install -D @types/react-redux
```

**Folder Structure (cuối module 2.2):**
```
rtk-learning-app/
├── src/
│   ├── app/
│   │   └── store.ts              # Redux store configuration
│   ├── features/
│   │   ├── counter/
│   │   │   ├── counterSlice.ts   # Counter slice (state + reducers)
│   │   │   └── Counter.tsx       # Counter component
│   │   ├── todos/
│   │   │   ├── todosSlice.ts     # Todos slice
│   │   │   ├── TodoList.tsx
│   │   │   └── TodoItem.tsx
│   │   └── users/
│   │       ├── usersSlice.ts     # Async slice với createAsyncThunk
│   │       └── UserList.tsx
│   ├── components/
│   │   └── ui/                   # Basic UI components
│   ├── hooks/
│   │   └── redux.ts              # Typed hooks (useAppSelector, useAppDispatch)
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
└── package.json
```

---

## KEY CONCEPTS TO COVER

### 1. Tại sao cần State Management?

**Vấn đề với Props Drilling:**
```typescript
// ❌ Props drilling qua nhiều levels
<App user={user}>
  <Layout user={user}>
    <Sidebar user={user}>
      <UserInfo user={user} />
    </Sidebar>
  </Layout>
</App>

// ❌ Context có thể gây re-render không cần thiết
// ❌ useReducer + Context phức tạp khi app lớn
```

**Giải pháp:**
- Global state management
- Predictable state changes
- DevTools for debugging
- Time-travel debugging

---

### 2. Flux Pattern - Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ┌────────┐    ┌────────────┐    ┌───────┐            │
│   │ Action │ -> │ Dispatcher │ -> │ Store │            │
│   └────────┘    └────────────┘    └───┬───┘            │
│        ^                              │                 │
│        │                              v                 │
│        │                         ┌────────┐            │
│        └─────────────────────────│  View  │            │
│              (User Events)       └────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘

DATA FLOWS ONE DIRECTION:
Action → Dispatcher → Store → View → Action → ...
```

**Các thành phần:**

| Component | Mô tả | Ví dụ |
|-----------|-------|-------|
| **Action** | Object mô tả "cái gì xảy ra" | `{ type: 'ADD_TODO', payload: {...} }` |
| **Dispatcher** | Trung tâm điều phối, gửi action đến store | `dispatch(action)` |
| **Store** | Nơi lưu trữ state, xử lý logic | `{ todos: [], filter: 'all' }` |
| **View** | React components, hiển thị UI | `<TodoList />` |

---

### 3. So sánh MVC vs Flux

```
MVC (Two-way binding):
┌───────┐     ┌────────────┐     ┌──────┐
│ Model │ <-> │ Controller │ <-> │ View │
└───────┘     └────────────┘     └──────┘
    ↑              ↑               ↑
    └──────────────┴───────────────┘
         (Có thể update lẫn nhau)

FLUX (One-way):
Action → Dispatcher → Store → View
         (Chỉ một hướng, predictable)
```

**Tại sao Flux tốt hơn cho React:**
- **Predictable:** Dễ trace data flow
- **Debugging:** Biết chính xác state thay đổi khi nào
- **Testing:** Reducers là pure functions
- **Time-travel:** Có thể undo/redo actions

---

### 4. Redux = Flux + Improvements

**Redux Principles (3 nguyên tắc):**

1. **Single source of truth**
   - Một store duy nhất cho toàn app
   - State tree là object duy nhất

2. **State is read-only**
   - Chỉ có thể thay đổi state bằng dispatch action
   - Không mutate trực tiếp

3. **Changes made with pure functions**
   - Reducers là pure functions
   - `(state, action) => newState`

```typescript
// Redux Pure Reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]; // Return NEW array
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}
```

---

### 5. Evolution: Redux → Redux Toolkit

```typescript
// ❌ Redux truyền thống - Verbose
// actions.js
const ADD_TODO = 'ADD_TODO';
const addTodo = (text) => ({ type: ADD_TODO, payload: { text, id: Date.now() } });

// reducer.js
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};

// store.js
import { createStore, combineReducers } from 'redux';
const store = createStore(combineReducers({ todos: todosReducer }));
```

```typescript
// ✅ Redux Toolkit - Concise
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // Immer allows "mutation"!
    },
  },
});

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export const { addTodo } = todosSlice.actions;
```

**Redux Toolkit bao gồm:**
- `configureStore` - Setup store với good defaults
- `createSlice` - Tạo reducer + actions cùng lúc
- `createAsyncThunk` - Handle async logic
- Immer - Viết "mutation" nhưng thực ra tạo immutable updates
- Redux DevTools - Tự động enable

---

### 6. So sánh useReducer vs Redux

```typescript
// useReducer (React built-in)
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });

// Redux
const dispatch = useDispatch();
const count = useSelector(state => state.counter.value);
dispatch(increment()); // Action creator
```

| Aspect | useReducer | Redux Toolkit |
|--------|------------|---------------|
| **Scope** | Component/tree level | Global app level |
| **Setup** | Zero (built-in) | Cần install & config |
| **DevTools** | Không có | Có (time-travel, etc.) |
| **Middleware** | Không có | Có (thunk, saga, etc.) |
| **Async** | Tự handle | createAsyncThunk |
| **Performance** | Re-render subtree | Selective re-render |
| **Use case** | Local complex state | Global shared state |

---

## MINI EXERCISE: Flux Pattern Visualization

**Mục tiêu:** Hiểu data flow bằng cách trace một action

**Scenario:** User clicks "Add Todo" button

```typescript
// 1. VIEW: User interaction
<button onClick={() => dispatch({ type: 'ADD_TODO', payload: { text: 'Learn Redux' } })}>
  Add Todo
</button>

// 2. ACTION: Object mô tả intent
{
  type: 'ADD_TODO',
  payload: {
    id: 123,
    text: 'Learn Redux',
    completed: false
  }
}

// 3. DISPATCHER: dispatch() gửi action đến store
store.dispatch(action);

// 4. STORE (REDUCER): Xử lý action, tạo new state
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    // ...
  }
}

// 5. VIEW: React re-renders với new state
function TodoList() {
  const todos = useSelector(state => state.todos);
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}
```

**Task:** Vẽ diagram cho flow: User clicks "Toggle Todo"

---

## KNOWLEDGE CHECK (6 câu)

### Q1: Flux pattern giải quyết vấn đề gì?

**Expected Answer:**
> Flux giải quyết vấn đề **unpredictable data flow** trong MVC khi app scale lớn. Với two-way binding, khó trace được state thay đổi từ đâu. Flux enforce **unidirectional data flow** (một chiều), giúp:
> - Dễ debug
> - Predictable state changes
> - Dễ test (reducers là pure functions)

---

### Q2: Mô tả flow của một action trong Flux?

**Expected Answer:**
> ```
> User Event → Action Creator → dispatch(Action) → Store/Reducer → New State → View Update
> ```
> 1. User tương tác (click button)
> 2. Action creator tạo action object
> 3. dispatch() gửi action đến store
> 4. Reducer xử lý action, return new state
> 5. React re-render components subscribed to state

---

### Q3: 3 nguyên tắc của Redux là gì?

**Expected Answer:**
> 1. **Single source of truth** - Một store duy nhất
> 2. **State is read-only** - Chỉ thay đổi qua dispatch action
> 3. **Changes with pure functions** - Reducers là pure functions

---

### Q4: Tại sao Redux Toolkit tốt hơn Redux truyền thống?

**Expected Answer:**
> - **Ít boilerplate** - createSlice tạo cả reducer và actions
> - **Immer built-in** - Viết mutation syntax nhưng immutable
> - **configureStore** - Good defaults (middleware, devtools)
> - **createAsyncThunk** - Handle async dễ hơn
> - **TypeScript support** - Types tốt hơn

---

### Q5: Khi nào dùng useReducer vs Redux?

**Expected Answer:**
> | useReducer | Redux |
> |------------|-------|
> | Local state phức tạp | Global shared state |
> | Một component/subtree | Nhiều components cần access |
> | Không cần DevTools | Cần debug với DevTools |
> | Không có async phức tạp | Có async logic (API calls) |

---

### Q6: Action object bao gồm những gì?

**Expected Answer:**
> ```typescript
> {
>   type: string;      // REQUIRED - Mô tả action
>   payload?: any;     // OPTIONAL - Data đi kèm
>   meta?: any;        // OPTIONAL - Extra info
>   error?: boolean;   // OPTIONAL - Đánh dấu error action
> }
> ```
> Ví dụ:
> ```typescript
> { type: 'todos/addTodo', payload: { id: 1, text: 'Learn RTK' } }
> ```

---

## SUCCESS CRITERIA

Session 2.2.0 hoàn thành khi:

- [ ] Hiểu tại sao cần state management
- [ ] Vẽ được Flux diagram
- [ ] Giải thích được 3 nguyên tắc Redux
- [ ] Phân biệt được useReducer vs Redux
- [ ] Hiểu Redux Toolkit là improvement của Redux
- [ ] Trả lời được 5/6 Knowledge Check
- [ ] Project folder đã được setup

---

## DIFFICULTY & TIME ESTIMATE

**Độ khó:** Easy (Conceptual, không code nhiều)

**Thời gian dự kiến:**
- Theory reading: 20 phút
- Diagram exercise: 10 phút
- Knowledge check: 10 phút

**Total:** ~40 phút

---

## READY TO START

**AI, please:**

1. **Setup project folder** `phase2/module2.2/rtk-learning-app`
2. **Giải thích Flux Pattern** với diagram
3. **So sánh MVC vs Flux**
4. **Walk through 3 Redux principles**
5. **Quiz Knowledge Check**

**Lưu ý quan trọng:**
- Session này chủ yếu **lý thuyết**, ít code
- Mục tiêu là **hiểu mental model** trước khi hands-on
- Diagram và visualization quan trọng

---

**VERSION:** 1.0
**CREATED:** 2025-01-19
**FOR:** Session 2.2.0 - Flux Pattern & Redux Concepts
**PROJECT:** RTK Learning App
**PREVIOUS SESSION:** 2.1.2 - Advanced Patterns
**NEXT SESSION:** 2.2.1 - Redux Toolkit Basics
