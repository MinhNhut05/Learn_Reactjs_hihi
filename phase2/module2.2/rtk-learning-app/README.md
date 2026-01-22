# Redux Toolkit Learning App

## Module 2.2 - State Management với Redux Toolkit

---

## Tổng quan

Project này bao gồm 3 sessions học Redux Toolkit:

| Session | Nội dung | Features |
|---------|----------|----------|
| **2.2.0** | Flux Pattern & Redux Concepts | Theory only |
| **2.2.1** | Redux Toolkit Basics | Counter, Todo App |
| **2.2.2** | RTK Async & Patterns | Users List, Posts CRUD |

---

## Cài đặt & Chạy

```bash
cd phase2/module2.2/rtk-learning-app
npm install
npm run dev
```

Mở http://localhost:5173 để xem app.

---

## Cấu trúc Project

```
src/
├── app/
│   ├── store.ts          # Redux store configuration
│   └── hooks.ts          # Typed hooks (useAppSelector, useAppDispatch)
├── features/
│   ├── counter/          # Session 2.2.1 - Mini Exercise
│   │   ├── counterSlice.ts
│   │   └── Counter.tsx
│   ├── todos/            # Session 2.2.1 - Real Exercise
│   │   ├── todosSlice.ts
│   │   ├── filterSlice.ts
│   │   ├── selectors.ts
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── AddTodo.tsx
│   │   └── FilterButtons.tsx
│   ├── users/            # Session 2.2.2 - Mini Exercise
│   │   ├── usersSlice.ts
│   │   ├── UserList.tsx
│   │   ├── UserCard.tsx
│   │   └── UserSkeleton.tsx
│   └── posts/            # Session 2.2.2 - Real Exercise
│       ├── postsSlice.ts
│       ├── PostList.tsx
│       ├── PostCard.tsx
│       ├── PostForm.tsx
│       └── PostSkeleton.tsx
├── components/
│   └── ui/
│       └── ErrorMessage.tsx
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## Session 2.2.0: Flux Pattern & Redux Concepts

### Flux Pattern - Unidirectional Data Flow

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
```

### 3 Nguyên tắc Redux

1. **Single source of truth** - Một store duy nhất
2. **State is read-only** - Chỉ thay đổi qua dispatch action
3. **Changes with pure functions** - Reducers là pure functions

### So sánh useReducer vs Redux

| Aspect | useReducer | Redux Toolkit |
|--------|------------|---------------|
| Scope | Component/tree level | Global app level |
| Setup | Zero (built-in) | Cần install & config |
| DevTools | Không có | Có (time-travel, etc.) |
| Middleware | Không có | Có (thunk, saga, etc.) |
| Async | Tự handle | createAsyncThunk |
| Use case | Local complex state | Global shared state |

---

## Session 2.2.1: Redux Toolkit Basics

### Concepts

- **configureStore** - Setup Redux store với good defaults
- **createSlice** - Tạo reducer + actions cùng lúc
- **useSelector** - Đọc state từ store
- **useDispatch** - Dispatch actions
- **Immer** - Viết mutation syntax nhưng immutable
- **Typed Hooks** - useAppSelector, useAppDispatch

### Counter App (Mini Exercise)

Features:
- Display current count
- Increment (+1)
- Decrement (-1)
- Increment by custom amount
- Reset to 0

### Todo App (Real Exercise)

Features:
- Add new todo
- Toggle complete status
- Delete todo
- Filter: All | Active | Completed
- Clear completed
- Show items count

---

## Session 2.2.2: RTK Async & Patterns

### Concepts

- **Thunk** - Function trả về function
- **createAsyncThunk** - Handle async operations
- **extraReducers** - Handle async action states
- **Loading States** - pending, fulfilled, rejected
- **unwrap()** - Handle Promise result in component

### Users List (Mini Exercise)

API: https://jsonplaceholder.typicode.com/users

Features:
- Fetch users on mount
- Display user cards
- Loading skeleton
- Error handling with retry
- Refresh button

### Posts CRUD (Real Exercise)

API: https://jsonplaceholder.typicode.com/posts

Features:
- Fetch posts (READ)
- Create new post (CREATE)
- Delete post (DELETE)
- Loading states for each operation
- Error handling

---

## Interview Q&A

### Q1: createSlice làm gì?

createSlice kết hợp:
- Tạo reducer function
- Tự động generate action creators
- Tự động generate action types

### Q2: Tại sao có thể "mutate" state trong reducer?

RTK sử dụng **Immer**. Khi viết mutation code, Immer:
1. Tạo "draft" proxy của state
2. Track tất cả changes
3. Produce new immutable state object

### Q3: createAsyncThunk giải quyết vấn đề gì?

- Tự động tạo 3 action types (pending, fulfilled, rejected)
- Handle async flow trong Redux
- Cancel requests với AbortController
- Access store state trong thunk

### Q4: Khi nào dùng RTK vs Zustand?

| Use RTK | Use Zustand |
|---------|-------------|
| Large team | Small team |
| Need DevTools | Simpler debugging OK |
| Complex async | Simple async |
| Enterprise apps | Startup/MVPs |

---

## Redux DevTools

Install Chrome Extension: Redux DevTools

Features:
- **State inspector** - Xem toàn bộ state tree
- **Action log** - Xem mọi action đã dispatch
- **Time-travel** - Jump đến bất kỳ state nào
- **Diff** - Xem state thay đổi như thế nào
- **Export/Import** - Save state để debug

---

## RTK Query (Bonus)

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
  }),
});

// Auto-generated hooks!
export const { useGetPostsQuery } = postsApi;
```

RTK Query vs createAsyncThunk:
- Automatic caching
- Auto refetching
- Less boilerplate
- Built-in hooks

---

## Dependencies

```json
{
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "tailwindcss": "^3.x"
}
```

---

## Next Steps

Sau khi hoàn thành Module 2.2, tiếp tục với:
- **Module 2.3** - Zustand (simpler state management)
- **Module 2.4** - React Query / TanStack Query (data fetching)
