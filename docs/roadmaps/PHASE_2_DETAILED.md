# PHASE 2: STATE MANAGEMENT & DATA FETCHING (V2.1)

> Thời gian: 2-2.5 tuần (với 5h/ngày)
> Mục tiêu: Master Redux Toolkit + Zustand + React Query + Component Patterns
> Sessions: 10 (1-2 bài tập/session, tập trung hiểu sâu)
> Mini Project: Dashboard App

---

## 🎯 CÁCH HỌC (LEARNING FLOW)

> Xem chi tiết: [LEARNING_STYLE.md](../rules/LEARNING_STYLE.md)

**Flow cho mỗi session:**
```
PHASE 1: Đọc lý thuyết (45-60p) → Không code, chỉ đọc hiểu
PHASE 2: Tóm tắt (15p)         → Claude tạo checklist để review
PHASE 3: Làm bài tập (60-90p)  → Code exercises (1-2 bài tập quan trọng)
PHASE 4: Quiz (15-30p)         → Knowledge Check, pass ≥80%
```

---

## 📅 MODULE 2.1: Component Patterns (2 sessions)

### **Session 2.1.1: Compound Components (2-3h)**

#### Concepts:
- Compound component pattern
- Context API trong compound components
- Flexible API design
- Real-world examples (Tabs, Accordion, Select)

#### Bài tập:

**🔸 Mini: Simple Tabs (20 phút)**
```typescript
// Hoàn thiện Tabs compound component:
// <Tabs defaultValue="tab1">
//   <TabsList>
//     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
//     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
//   </TabsList>
//   <TabsContent value="tab1">Content 1</TabsContent>
//   <TabsContent value="tab2">Content 2</TabsContent>
// </Tabs>
```

**🔶 Real: Social App - Post Tabs (45 phút)**
```typescript
// Xây dựng ProfileTabs cho Social App:
// - Tab "Posts": Danh sách posts của user
// - Tab "Likes": Posts user đã like
// - Tab "Media": Posts có ảnh/video
//
// Sử dụng compound pattern đã học
// Component này sẽ dùng trong project Social App
```

#### Knowledge Check (6 câu):
1. Compound component pattern là gì?
2. Tại sao dùng Context trong compound components?
3. Controlled vs Uncontrolled compound components?
4. Khi nào dùng compound pattern?
5. `displayName` dùng để làm gì?
6. Accessibility trong compound components?

---

### **Session 2.1.2: Advanced Patterns (2-3h)**

#### Concepts:
- Render Props pattern
- Higher-Order Components (HOC)
- Custom hooks vs HOC vs Render Props
- Provider composition

#### Bài tập:

**🔸 Mini: Toggle Render Props (20 phút)**
```typescript
// Tạo Toggle component với render props:
// <Toggle>
//   {({ isOn, toggle }) => (
//     <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
//   )}
// </Toggle>
```

**🔶 Real: Social App - Provider Setup (45 phút)**
```typescript
// Setup providers cho Social App:
// - AuthProvider: user, login, logout
// - ThemeProvider: theme, toggleTheme
// - NotificationProvider: notifications, addNotification
//
// Sử dụng composeProviders để tổ chức
// Chuẩn bị foundation cho các session sau
```

#### Knowledge Check (6 câu):
1. Render props pattern giải quyết vấn đề gì?
2. HOC là gì? Ưu/nhược điểm?
3. Custom hooks vs Render Props: khi nào dùng?
4. Provider composition pattern?
5. Forwarding refs trong HOC?
6. Display name trong HOC?

---

## 📅 MODULE 2.2: Redux Toolkit (2 sessions) 🆕 NEW

> ⚠️ **Tại sao học Redux Toolkit?**
> - Nhiều công ty vẫn dùng Redux
> - Hiểu Flux pattern (action → reducer → store)
> - Nền tảng để hiểu Zustand dễ hơn
> - Job posting thường yêu cầu Redux

### **Session 2.2.0: Flux Pattern & Redux Concepts (30 phút intro)**

#### Concepts:
**Flux Pattern (Nền tảng):**
```
┌─────────┐    ┌────────────┐    ┌───────┐    ┌──────┐
│ Action  │ -> │ Dispatcher │ -> │ Store │ -> │ View │
└─────────┘    └────────────┘    └───────┘    └──────┘
     ^                                            │
     └────────────────────────────────────────────┘
```

- **Action**: Object mô tả "điều gì xảy ra" `{ type: 'ADD_TODO', payload: {...} }`
- **Reducer**: Pure function `(state, action) => newState`
- **Store**: Single source of truth
- **Dispatch**: Gửi action đến store

**So sánh với useReducer:**
```typescript
// useReducer (đã học)
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'INCREMENT' })

// Redux Toolkit (sẽ học)
const dispatch = useDispatch()
dispatch(increment()) // Action creator
```

---

### **Session 2.2.1: Redux Toolkit Basics (2-3h)**

#### Concepts:
- configureStore
- createSlice (reducer + actions)
- useSelector & useDispatch
- So sánh với useReducer + Context

#### Bài tập:

**🔸 Mini: Counter với RTK (25 phút)**
```typescript
// Tạo counter app với Redux Toolkit:
// 1. counterSlice với: count, increment, decrement, incrementByAmount
// 2. configureStore
// 3. Provider wrapper
// 4. Counter component sử dụng useSelector, useDispatch

// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1 // Immer cho phép mutate!
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

**🔶 Real: Todo App với RTK (45 phút)**
```typescript
// Xây dựng Todo App với Redux Toolkit:
//
// FEATURES:
// - Add todo
// - Toggle complete
// - Delete todo
// - Filter (all, active, completed)
//
// SLICES:
// - todosSlice: todos[], addTodo, toggleTodo, deleteTodo
// - filterSlice: filter value
//
// Đây là bài tập để hiểu RTK patterns
```

#### Knowledge Check (8 câu):
1. createSlice làm gì?
2. Tại sao có thể "mutate" state trong reducer (Immer)?
3. PayloadAction<T> là gì?
4. configureStore vs createStore (Redux cũ)?
5. useSelector hoạt động như thế nào?
6. useDispatch trả về gì?
7. Redux DevTools extension?
8. So sánh RTK với useReducer + Context?

---

### **Session 2.2.2: RTK Async & Patterns (2-3h)**

#### Concepts:
- createAsyncThunk
- Loading states (pending, fulfilled, rejected)
- extraReducers
- RTK Query (giới thiệu)

#### Bài tập:

**🔸 Mini: Fetch Users với createAsyncThunk (25 phút)**
```typescript
// Fetch users từ API với createAsyncThunk:
//
// 1. createAsyncThunk('users/fetchUsers', async () => {...})
// 2. extraReducers handle pending, fulfilled, rejected
// 3. Component hiển thị loading, error, data

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return response.json()
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
  },
})
```

**🔶 Real: Social App - Posts với RTK (45 phút)**
```typescript
// Thêm Posts feature vào Social App với RTK:
//
// postsSlice:
// - fetchPosts (createAsyncThunk)
// - addPost, deletePost
// - likePost
//
// Component:
// - Loading skeleton
// - Error handling với retry
// - Optimistic updates (like)
//
// Đây là phần cuối của RTK module!
```

#### Knowledge Check (8 câu):
1. createAsyncThunk giải quyết vấn đề gì?
2. Thunk là gì?
3. pending, fulfilled, rejected states?
4. extraReducers vs reducers?
5. unwrap() dùng khi nào?
6. RTK Query vs createAsyncThunk?
7. Khi nào dùng RTK vs Zustand?
8. Middleware trong Redux?

---

## 📅 MODULE 2.3: Zustand State Management (2 sessions - RÚT GỌN)

> 💡 **Tại sao vẫn học Zustand?**
> - Đơn giản hơn Redux nhiều
> - Nhiều startup/project mới dùng
> - Không cần Provider wrapper
> - Code ít hơn, dễ hiểu hơn

### **Session 2.3.1: Zustand Basics (2h)**

#### Concepts:
- Create store (đơn giản hơn RTK!)
- Subscribe to state
- Selectors for optimization
- So sánh với Redux Toolkit

#### So sánh Redux Toolkit vs Zustand:

```typescript
// REDUX TOOLKIT - Nhiều boilerplate
// 1. createSlice
// 2. configureStore
// 3. Provider wrapper
// 4. useSelector, useDispatch

// ZUSTAND - Đơn giản
import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

// Sử dụng
function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  return <button onClick={increment}>{count}</button>
}
```

#### Bài tập:

**🔸 Mini: Counter với Zustand (15 phút)**
```typescript
// Làm lại Counter với Zustand:
// - count, increment, decrement, reset
// - So sánh code với RTK version
// - Nhận xét: cái nào dễ hơn?
```

**🔶 Real: Social App - Auth Store (45 phút)**
```typescript
// Tạo auth store cho Social App:
// - user: User | null
// - isAuthenticated: boolean (derived)
// - login(credentials): Promise
// - logout()
// - updateProfile(data)
//
// Component LoginForm sử dụng store
// Persist user vào localStorage (middleware)
```

#### Knowledge Check (6 câu):
1. Zustand khác Redux như thế nào?
2. Tại sao không cần Provider?
3. Selector trong Zustand?
4. Shallow comparison?
5. Khi nào dùng Zustand vs RTK?
6. Store có thể dùng ngoài React không?

---

### **Session 2.3.2: Zustand Middleware & Patterns (2-3h)**

#### Concepts:
- Middleware: persist, devtools, immer
- Slices pattern cho large stores
- Async actions
- Kết hợp Zustand + React Query

#### Bài tập:

**🔸 Mini: Persist Middleware (15 phút)**
```typescript
// Thêm persist middleware:
// - Persist auth state vào localStorage
// - Partialize: chỉ persist một số fields

import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (credentials) => {...},
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }), // Chỉ persist token
    }
  )
)
```

**🔶 Real: Social App - Complete Store (45 phút)**
```typescript
// Hoàn thiện Social App stores:
//
// AUTH SLICE:
// - user, token, login, logout
// - persist middleware
//
// UI SLICE:
// - sidebarOpen, modal, theme
// - toggleSidebar, openModal, closeModal
//
// Combine slices pattern
// DevTools middleware
```

#### Knowledge Check (6 câu):
1. Persist middleware config?
2. Immer middleware làm gì?
3. Slices pattern là gì?
4. Async actions trong Zustand?
5. Devtools middleware?
6. Khi nào dùng Zustand vs React Query?

---

## 📅 MODULE 2.4: React Query (3 sessions)

### **Session 2.4.1: React Query Fundamentals (2-3h)**

#### Concepts:
- Server state vs Client state
- useQuery hook
- Query keys
- Caching & refetching

#### Bài tập:

**🔸 Mini: Fetch Products (20 phút)**
```typescript
// Fetch products với useQuery:
// - Loading skeleton
// - Error message với retry button
// - staleTime: 5 phút
```

**🔶 Real: Social App - Feed với React Query (45 phút)**
```typescript
// Tích hợp React Query vào Social App:
//
// POSTS FEED:
// - Fetch posts từ API (mock với json-server hoặc MSW)
// - Pagination
// - Pull to refresh
//
// Kết hợp với Zustand stores đã tạo
```

#### Knowledge Check (8 câu):
1. Client state vs Server state?
2. Query key dùng để làm gì?
3. staleTime vs gcTime?
4. isLoading vs isFetching?
5. refetchOnWindowFocus?
6. enabled option?
7. select option?
8. placeholderData vs initialData?

---

### **Session 2.4.2: Mutations & Optimistic Updates (2-3h)**

#### Concepts:
- useMutation hook
- Invalidate queries
- Optimistic updates pattern
- Rollback on error

#### Bài tập:

**🔸 Mini: Create với Optimistic (25 phút)**
```typescript
// Form thêm item:
// - Submit → hiện item ngay (optimistic)
// - API call background
// - Rollback nếu fail
```

**🔶 Real: Social App - Like & Comment System (45 phút)**
```typescript
// Thêm interactions cho Social App:
//
// LIKE SYSTEM:
// - Like/unlike post (optimistic update)
// - Like count update ngay lập tức
// - Rollback nếu API fail
//
// COMMENT SYSTEM:
// - Add comment (optimistic)
// - Delete comment
```

#### Knowledge Check (8 câu):
1. useMutation khác useQuery?
2. onMutate callback?
3. Optimistic update pattern?
4. Rollback với context?
5. invalidateQueries?
6. setQueryData?
7. mutateAsync vs mutate?
8. onSuccess, onError, onSettled?

---

### **Session 2.4.3: Pagination & Infinite Query (2-3h)**

#### Concepts:
- Pagination với keepPreviousData
- useInfiniteQuery hook
- Prefetching
- Query cancellation

#### Bài tập:

**🔸 Mini: Paginated List (20 phút)**
```typescript
// Users list với pagination:
// - Previous/Next buttons
// - Smooth transition
// - Prefetch next page
```

**🔶 Real: Social App - Infinite Feed (45 phút)**
```typescript
// Hoàn thiện Social App Feed:
//
// INFINITE SCROLL:
// - Load thêm posts khi scroll đến cuối
// - Intersection Observer trigger
// - Loading spinner ở bottom
//
// Đây là phần cuối của Social App Phase 2!
```

#### Knowledge Check (6 câu):
1. keepPreviousData option?
2. useInfiniteQuery khác useQuery?
3. getNextPageParam?
4. fetchNextPage?
5. hasNextPage?
6. Prefetching queries?

---

## 🎯 MODULE 2.R: Review & Project Completion

> Review + Hoàn thiện Social App

### **Review Challenges (1h)**

**Challenge 1: So sánh RTK vs Zustand (20 phút)**
```typescript
// Viết cùng 1 feature với cả 2:
// - Counter với increment, decrement, reset
// - So sánh code, ưu/nhược điểm
```

**Challenge 2: React Query Pattern (20 phút)**
```typescript
// Tạo hook useUser(id) với:
// - Fetch user detail
// - Stale time config
// - Placeholder từ list cache
```

**Challenge 3: Optimistic Update (20 phút)**
```typescript
// Implement follow/unfollow button:
// - Optimistic update UI
// - Rollback on error
```

---

### **Social App - Final Checklist**

**Features hoàn thành:**
- [ ] Authentication (login/logout với Zustand persist)
- [ ] User profile với tabs (Posts, Likes, Media)
- [ ] Posts feed infinite scroll
- [ ] Like/Unlike với optimistic updates
- [ ] Comment system
- [ ] Theme toggle (dark/light)

**Technical Requirements:**
- [ ] Hiểu Redux Toolkit patterns
- [ ] Zustand cho client state (auth, UI, theme)
- [ ] React Query cho server state (posts, users)
- [ ] TypeScript strict mode
- [ ] Error handling đầy đủ

**Pass Criteria:**
- ✅ Tất cả features hoạt động
- ✅ Score ≥80% Knowledge Checks
- ✅ Giải thích được khi nào dùng RTK vs Zustand vs React Query

---

## ✅ PHASE 2 COMPLETION CHECKLIST

Hoàn thành Phase 2 khi:
- [ ] Hiểu Flux pattern (action → reducer → store)
- [ ] Dùng được Redux Toolkit (createSlice, createAsyncThunk)
- [ ] Thành thạo Zustand cho client state
- [ ] Thành thạo React Query cho server state
- [ ] Biết khi nào dùng tool nào
- [ ] Implement optimistic updates
- [ ] Handle pagination & infinite scroll
- [ ] Score ≥80% tất cả Knowledge Checks

**Next:** Phase 3 - Next.js Framework

---

## 📊 KHI NÀO DÙNG GÌ?

| Trường hợp | Dùng gì |
|------------|---------|
| Server state (API data) | React Query |
| Client state đơn giản (UI, theme) | Zustand |
| Client state phức tạp, team lớn | Redux Toolkit |
| Form state | React Hook Form hoặc local state |
| Auth state (persist) | Zustand + persist middleware |

---

## 📚 RESOURCES

**Official Docs:**
- https://redux-toolkit.js.org/
- https://zustand-demo.pmnd.rs/
- https://tanstack.com/query/latest/docs/react

**Articles:**
- Redux Toolkit: Why It's the Standard
- Zustand vs Redux: When to Use Which
- TkDodo: React Query blog series

---

**VERSION:** 2.1 (Thêm Redux Toolkit, Job-Ready)
**DATE:** 2025-01-13
**CHANGES:**
- Thêm Redux Toolkit module (2 sessions)
- Rút gọn Zustand (3→2 sessions)
- Thêm Flux pattern intro
- Rút gọn exercises (1-2/session)
- Thêm bảng so sánh "Khi nào dùng gì"
