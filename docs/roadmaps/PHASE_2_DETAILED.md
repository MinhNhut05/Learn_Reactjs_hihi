# PHASE 2: STATE MANAGEMENT & DATA FETCHING (V2)

> Thời gian: 2-3 tuần (với 5h/ngày)
> Mục tiêu: Master Zustand + React Query + Component Patterns
> Sessions: 9 (2-3 bài tập/session, review gộp cuối module)
> Mini Project: Dashboard App

---

## 🎯 CÁCH HỌC (LEARNING FLOW)

> Xem chi tiết: [LEARNING_STYLE.md](../rules/LEARNING_STYLE.md)

**Flow cho mỗi session:**
```
PHASE 1: Đọc lý thuyết (45-60p) → Không code, chỉ đọc hiểu
PHASE 2: Tóm tắt (15p)         → Claude tạo checklist để review
PHASE 3: Làm bài tập (60-90p)  → Code tất cả exercises
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

#### Bài tập (2 bài):

**Exercise 1: Tabs Component (45 phút)**
```typescript
// YÊU CẦU:
// API:
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// Implement với Context
```

**Exercise 2: Accordion (45 phút)**
```typescript
// YÊU CẦU:
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Knowledge Check (8 câu):
1. Compound component pattern là gì?
2. Tại sao dùng Context trong compound components?
3. `displayName` dùng để làm gì?
4. Làm sao validate children đúng type?
5. Controlled vs Uncontrolled compound components?
6. Khi nào dùng compound pattern?
7. Slot pattern khác gì compound pattern?
8. Accessibility trong compound components?

---

### **Session 2.1.2: Advanced Patterns (2-3h)**

#### Concepts:
- Render Props pattern
- Higher-Order Components (HOC)
- Custom hooks vs HOC vs Render Props
- Provider composition

#### Bài tập (2 bài):

**Exercise 1: Render Props - Mouse Tracker (30 phút)**
```typescript
// YÊU CẦU:
<MouseTracker>
  {({ x, y }) => (
    <div>Mouse: {x}, {y}</div>
  )}
</MouseTracker>
```

**Exercise 2: Provider Composition (45 phút)**
```typescript
// YÊU CẦU:
// Nhiều providers lồng nhau ugly:
<AuthProvider>
  <ThemeProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ThemeProvider>
</AuthProvider>

// Refactor với compose pattern
const AppProviders = composeProviders([
  AuthProvider,
  ThemeProvider,
  NotificationProvider
])

<AppProviders>
  <App />
</AppProviders>
```

#### Knowledge Check (6 câu):
1. Render props pattern giải quyết vấn đề gì?
2. HOC là gì? Ưu/nhược điểm?
3. Custom hooks vs Render Props: khi nào dùng?
4. Provider composition pattern?
5. Forwarding refs trong HOC?
6. Display name trong HOC?

---

## 📅 MODULE 2.2: Zustand State Management (3 sessions)

### **Session 2.2.1: Zustand Basics (2h)**

#### Concepts:
- Create store
- Subscribe to state
- Selectors for optimization
- Comparison với Redux & Context

#### Bài tập (2 bài):

**Exercise 1: Counter Store (30 phút)**
```typescript
// YÊU CẦU:
interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// 1. Create store với Zustand
// 2. Multiple components subscribe
// 3. Selector để lấy isPositive
```

**Exercise 2: Todo Store (60 phút)**
```typescript
// YÊU CẦU:
// 1. Todos store với CRUD
// 2. Filtering logic
// 3. Persist to localStorage với middleware
// 4. DevTools integration
```

#### Knowledge Check (8 câu):
1. Zustand khác Redux như thế nào?
2. Tại sao dùng selectors?
3. `create` function trả về gì?
4. Shallow comparison trong Zustand?
5. Khi nào dùng Zustand vs Context?
6. Store có thể dùng ngoài React không?
7. `set` function hoạt động thế nào?
8. Devtools middleware?

---

### **Session 2.2.2: Zustand Middleware & Patterns (2-3h)**

#### Concepts:
- Middleware: persist, devtools, immer
- Slices pattern cho large stores
- Async actions
- Subscriptions outside React

#### Bài tập (2 bài):

**Exercise 1: E-commerce Store với Slices (60 phút)**
```typescript
// YÊU CẦU:
// Store lớn split thành slices:
// - cartSlice: add, remove, clear
// - userSlice: login, logout, profile
// Combine với slices pattern

interface Store = CartSlice & UserSlice
```

**Exercise 2: Persist & Async (45 phút)**
```typescript
// YÊU CẦU:
// 1. Auth store với persist middleware
// 2. Async login action
// 3. Loading & error states
// 4. Token refresh logic
```

#### Knowledge Check (8 câu):
1. Persist middleware config options?
2. Immer middleware làm gì?
3. Slices pattern là gì?
4. Async actions trong Zustand?
5. `getState` dùng khi nào?
6. Subscribe outside React?
7. Multiple stores vs single store?
8. Hydration với persist?

---

### **Session 2.2.3: Zustand Best Practices (2h)**

#### Concepts:
- Selector optimization
- Avoid re-renders
- TypeScript best practices
- Testing Zustand stores

#### Bài tập (2 bài):

**Exercise 1: Optimize Selectors (45 phút)**
```typescript
// YÊU CẦU:
// Store có 10 fields
// Component chỉ cần 1 field
// Bad: const state = useStore()
// Good: const name = useStore(state => state.name)

// Implement và profile difference với React DevTools
```

**Exercise 2: Shopping Cart Complete (60 phút)**
```typescript
// YÊU CẦU:
// Complete cart store:
// - Add/remove items
// - Update quantity
// - Calculate total (derived)
// - Persist
// - Optimized selectors
// - TypeScript strict
```

#### Knowledge Check (6 câu):
1. Shallow comparison trong selector?
2. `useShallow` hook khi nào dùng?
3. Derived state trong Zustand?
4. Testing store với Jest?
5. Reset store về initial state?
6. Memory leaks với subscriptions?

---

## 📅 MODULE 2.3: React Query (3 sessions)

### **Session 2.3.1: React Query Basics (2-3h)**

#### Concepts:
- Client state vs Server state
- useQuery hook
- Query keys
- Caching & stale time
- Background refetching

#### Bài tập (2 bài):

**Exercise 1: Fetch Users List (45 phút)**
```typescript
// YÊU CẦU:
interface User {
  id: number
  name: string
  email: string
}

// 1. Fetch users với useQuery
// 2. Loading & error states
// 3. Retry on failure
// 4. Refetch on window focus
```

**Exercise 2: User Detail với Cache (45 phút)**
```typescript
// YÊU CẦU:
// 1. Users list → click user → detail
// 2. Detail page instant render từ cache
// 3. Background refetch detail
// 4. Navigate back → instant render
```

#### Knowledge Check (10 câu):
1. Client state vs Server state?
2. Query key dùng để làm gì?
3. staleTime vs gcTime?
4. Background refetching?
5. Retry logic default?
6. enabled option?
7. refetchOnWindowFocus?
8. select option?
9. placeholderData vs initialData?
10. isLoading vs isFetching?

---

### **Session 2.3.2: Mutations & Optimistic Updates (2-3h)**

#### Concepts:
- useMutation hook
- Invalidate queries
- Optimistic updates pattern
- Rollback on error

#### Bài tập (2 bài):

**Exercise 1: Create Todo với Optimistic (60 phút)**
```typescript
// YÊU CẦU:
// 1. Add todo button
// 2. Optimistic update (show immediately)
// 3. Actual API call
// 4. Rollback nếu API fails
// 5. Show success/error toast
```

**Exercise 2: Like Button (45 phút)**
```typescript
// YÊU CẦU:
// 1. Post với like count
// 2. Click like → instant UI update
// 3. API call in background
// 4. Rollback if fails
```

#### Knowledge Check (8 câu):
1. useMutation khác useQuery?
2. onMutate callback?
3. onSuccess, onError, onSettled?
4. Optimistic update pattern?
5. Rollback với context?
6. invalidateQueries?
7. setQueryData?
8. mutateAsync vs mutate?

---

### **Session 2.3.3: Pagination & Advanced (2-3h)**

#### Concepts:
- Pagination với keepPreviousData
- useInfiniteQuery hook
- Prefetching
- Query cancellation

#### Bài tập (2 bài):

**Exercise 1: Paginated Table (60 phút)**
```typescript
// YÊU CẦU:
// 1. Users table với pagination
// 2. Previous/Next buttons
// 3. Page numbers
// 4. keepPreviousData smooth transition
// 5. Prefetch next page on hover
```

**Exercise 2: Infinite Scroll Feed (60 phút)**
```typescript
// YÊU CẦU:
// 1. Posts feed với infinite scroll
// 2. useInfiniteQuery
// 3. Intersection Observer trigger
// 4. Loading spinner at bottom
// 5. "Load more" fallback button
```

#### Knowledge Check (8 câu):
1. keepPreviousData option?
2. useInfiniteQuery khác useQuery?
3. getNextPageParam?
4. fetchNextPage?
5. hasNextPage?
6. Prefetching queries?
7. Query cancellation?
8. Dependent queries?

---

## 🎯 MODULE 2.R: Review & Mini Project

> Gộp review + mini project cuối Phase 2

### **Mini Project: Dashboard App (4-6h)**

**Yêu cầu:**
Build dashboard áp dụng TẤT CẢ kiến thức Phase 2:

**Features:**
- [ ] Authentication state → Zustand + persist
- [ ] Fetch users/posts → React Query
- [ ] CRUD với optimistic updates
- [ ] Infinite scroll feed
- [ ] Filters & search
- [ ] Dark/light theme → Zustand

**Technical Requirements:**
- [ ] Zustand cho client state (auth, theme, UI)
- [ ] React Query cho server state
- [ ] Proper error handling
- [ ] No unnecessary re-renders
- [ ] TypeScript strict mode

**Checklist:**
- [ ] Score ≥80% tất cả Knowledge Checks
- [ ] Dashboard hoạt động đầy đủ
- [ ] Code clean, organized

---

## ✅ PHASE 2 COMPLETION CHECKLIST

Hoàn thành Phase 2 khi:
- [ ] Hiểu compound component pattern
- [ ] Thành thạo Zustand cho client state
- [ ] Thành thạo React Query cho server state
- [ ] Biết khi nào dùng tool nào
- [ ] Implement optimistic updates
- [ ] Handle pagination & infinite scroll
- [ ] Làm xong Mini Project Dashboard
- [ ] Score ≥80% tất cả Knowledge Checks

**Next:** Phase 3 - Next.js Framework

---

## 📚 RESOURCES

**Official Docs:**
- https://zustand-demo.pmnd.rs/
- https://tanstack.com/query/latest/docs/react

**Articles:**
- Kent C. Dodds: Application State Management
- TkDodo: React Query blog series

---

**VERSION:** 2.0 (V2 - Fresher Optimized)
**DATE:** 2025-01-04
**CHANGES:**
- Bỏ Backend module
- Giảm exercises xuống 2-3/session
- Gộp review vào cuối module
- Thêm Mini Project
