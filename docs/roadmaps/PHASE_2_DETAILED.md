# PHASE 2: STATE MANAGEMENT & DATA FETCHING (Chi Tiết)

> Thời gian: 2-3 tuần (với 5h/ngày)
> Mục tiêu: Master state management patterns, Zustand, React Query

---

## 📅 MODULE 2.1: Advanced State Patterns (1 tuần)

### **Session 2.1.1: State Architecture (2-3h)**

#### Concepts:
- Lifting state up vs Component composition
- State colocation principle
- Prop drilling problem & solutions
- When to lift state vs keep local

#### Bài tập:

**Exercise 1: Refactor Prop Drilling**
```typescript
// YÊU CẦU:
// 1. Cho app với prop drilling (state từ Root → 5 levels deep)
// 2. Refactor bằng composition
// 3. So sánh 2 approaches

// BEFORE: Prop drilling
<App> → <Layout> → <Sidebar> → <Menu> → <MenuItem> (needs user state)

// AFTER: Your refactor
```

**Exercise 2: Filter List Pattern**
```typescript
// YÊU CẦU:
// 1. Products list với filters (category, price range, search)
// 2. Implement lifting state up
// 3. SearchBar, Filters, ProductList components
// 4. State ở đâu? Tại sao?
```

---

### **Session 2.1.2: Compound Components (2h)**

#### Concepts:
- Compound component pattern
- Context API trong compound components
- Flexible API design
- Real-world examples (Tabs, Accordion, Select)

#### Bài tập:

**Exercise 1: Tabs Component**
```typescript
// YÊU CẦU:
// API như này:
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

**Exercise 2: Accordion**
```typescript
// YÊU CẦU:
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes, follows WAI-ARIA</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### **Session 2.1.3: Context API Best Practices (2-3h)**

#### Concepts:
- Context for dependency injection vs state management
- Context splitting to avoid re-renders
- Provider composition
- When NOT to use Context

#### Bài tập:

**Exercise 1: Split Contexts**
```typescript
// YÊU CẦU:
// 1. App context có: { user, theme, notifications }
// 2. Problem: theme change → toàn app re-render
// 3. Split thành 3 contexts riêng
// 4. Prove re-render giảm với React DevTools Profiler
```

**Exercise 2: Provider Composition**
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

// Refactor với AppProvider composition pattern
```

---

### **Session 2.1.4: Form State Management (2-3h)**

#### Concepts:
- Controlled vs Uncontrolled inputs
- Form libraries comparison (React Hook Form, Formik)
- Validation strategies
- Performance với large forms

#### Bài tập:

**Exercise 1: Build Mini Form Library**
```typescript
// YÊU CẦU:
// useForm hook với:
// - register fields
// - validation
// - errors
// - submit handling

function useForm<T>(options: FormOptions<T>) {
  // Implement
}

// Usage:
const { register, handleSubmit, errors } = useForm({
  defaultValues: { name: '', email: '' },
  validate: { ... }
})
```

**Exercise 2: React Hook Form Integration**
```typescript
// YÊU CẦU:
// 1. Multi-step registration form
// 2. Client-side validation
// 3. Async validation (check email exists)
// 4. TypeScript types
// 5. Error handling
```

---

## 📅 MODULE 2.2: Zustand State Management (1 tuần)

### **Session 2.2.1: Zustand Basics (2h)**

#### Concepts:
- Create store
- Subscribe to state
- Selectors for optimization
- Comparison với Redux & Context

#### Bài tập:

**Exercise 1: Counter Store**
```typescript
// YÊU CẦU:
// 1. Create counter store với Zustand
// 2. Actions: increment, decrement, reset
// 3. Selector để lấy isPositive
// 4. Multiple components subscribe

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}
```

**Exercise 2: Todo Store**
```typescript
// YÊU CẦU:
// 1. Todos store với CRUD
// 2. Filtering logic
// 3. Persist to localStorage với middleware
// 4. DevTools integration
```

---

### **Session 2.2.2: Zustand Advanced (2-3h)**

#### Concepts:
- Middleware: persist, devtools, immer
- Slices pattern cho large stores
- Async actions
- Subscriptions outside React

#### Bài tập:

**Exercise 1: E-commerce Store với Slices**
```typescript
// YÊU CẦU:
// Store lớn split thành slices:
// - cartSlice
// - productsSlice
// - userSlice
// Combine với slices pattern

interface Store = CartSlice & ProductsSlice & UserSlice
```

**Exercise 2: Async Actions**
```typescript
// YÊU CẦU:
// 1. Store fetch users từ API
// 2. Loading & error states
// 3. Optimistic updates cho mutations
// 4. Retry logic
```

---

### **Session 2.2.3: Zustand Best Practices (2h)**

#### Concepts:
- Selector optimization
- Avoid re-renders
- TypeScript best practices
- Testing Zustand stores

#### Bài tập:

**Exercise 1: Optimize Selectors**
```typescript
// YÊU CẦU:
// Store lớn, component chỉ cần 1 field
// Bad: const state = useStore()
// Good: const name = useStore(state => state.name)

// Implement và profile difference
```

**Exercise 2: Auth Store với Persist**
```typescript
// YÊU CẦU:
// 1. Auth store (user, token, login, logout)
// 2. Persist với zustand/middleware
// 3. Expire token after 1 hour
// 4. Auto-logout
// 5. TypeScript
```

---

## 📅 MODULE 2.3: React Query Data Fetching (1 tuần)

### **Session 2.3.1: React Query Basics (3h)**

#### Concepts:
- Client state vs Server state
- useQuery hook
- Query keys
- Caching & stale time
- Background refetching

#### Bài tập:

**Exercise 1: Fetch Users**
```typescript
// YÊU CẦU:
// 1. Fetch users list với useQuery
// 2. Loading & error states
// 3. Retry on failure
// 4. Refetch on window focus
// 5. TypeScript types

interface User {
  id: number
  name: string
  email: string
}

// Implement với React Query
```

**Exercise 2: User Detail với Caching**
```typescript
// YÊU CẦU:
// 1. Users list → click user → detail page
// 2. Detail page instant render (cache from list)
// 3. Background refetch detail
// 4. Navigate back → instant render
```

---

### **Session 2.3.2: Mutations & Optimistic Updates (2-3h)**

#### Concepts:
- useMutation hook
- Invalidate queries
- Optimistic updates pattern
- Rollback on error

#### Bài tập:

**Exercise 1: Create Todo với Optimistic Update**
```typescript
// YÊU CẦU:
// 1. Add todo button
// 2. Optimistic update (show immediately)
// 3. Actual API call
// 4. Rollback nếu API fails
// 5. Show success/error toast
```

**Exercise 2: Like Button**
```typescript
// YÊU CẦU:
// 1. Post với like count
// 2. Click like → instant UI update
// 3. API call in background
// 4. Rollback if fails
// 5. Show loading state on button
```

---

### **Session 2.3.3: Pagination & Infinite Queries (2-3h)**

#### Concepts:
- Pagination strategies
- useInfiniteQuery hook
- Cursor-based pagination
- Virtual scrolling integration

#### Bài tập:

**Exercise 1: Paginated Table**
```typescript
// YÊU CẦU:
// 1. Users table với pagination
// 2. Previous/Next buttons
// 3. Page numbers
// 4. Cache all pages
// 5. Prefetch next page
```

**Exercise 2: Infinite Scroll Feed**
```typescript
// YÊU CẦU:
// 1. Posts feed với infinite scroll
// 2. useInfiniteQuery
// 3. Intersection Observer để trigger
// 4. Loading spinner at bottom
// 5. "Load more" fallback button
```

---

### **Session 2.3.4: React Query Advanced (2-3h)**

#### Concepts:
- Query invalidation strategies
- Dependent queries
- Parallel queries
- Query cancellation
- Error handling patterns

#### Bài tập:

**Exercise 1: Dependent Queries**
```typescript
// YÊU CẦU:
// 1. Fetch user
// 2. Fetch user's posts (depends on user.id)
// 3. Fetch post details (depends on selected post)
// Implement cascade với enabled option
```

**Exercise 2: Search với Debounce**
```typescript
// YÊU CẦU:
// 1. Search input
// 2. Debounce 500ms
// 3. useQuery với search term
// 4. Cancel previous request
// 5. Show loading state
```

---

## 📊 PHASE 2 CHECKPOINT

### **Final Exercise: Dashboard App (6-8h)**

**YÊU CẦU:**
Build dashboard áp dụng TẤT CẢ kiến thức Phase 2:

**Features:**
- [ ] Authentication (login/logout) → Zustand
- [ ] Fetch users/posts from API → React Query
- [ ] CRUD operations with optimistic updates
- [ ] Infinite scroll feed
- [ ] Filters & search
- [ ] Dark/light theme → Context or Zustand
- [ ] Persist auth state → Zustand persist
- [ ] Error boundaries
- [ ] Loading states
- [ ] TypeScript strict mode

**Technical Requirements:**
- [ ] Zustand cho client state (auth, theme, UI)
- [ ] React Query cho server state (data fetching)
- [ ] Proper error handling
- [ ] No unnecessary re-renders
- [ ] Optimistic updates for mutations
- [ ] Cache strategies
- [ ] Clean architecture

**Bonus:**
- [ ] Unit tests cho stores
- [ ] Integration tests cho data fetching
- [ ] Accessibility
- [ ] Responsive design

---

## ✅ PHASE 2 COMPLETION CHECKLIST

Hoàn thành Phase 2 khi:
- [ ] Hiểu rõ state architecture patterns
- [ ] Thành thạo Zustand cho client state
- [ ] Thành thạo React Query cho server state
- [ ] Biết khi nào dùng tool nào
- [ ] Implement optimistic updates
- [ ] Handle pagination & infinite scroll
- [ ] Làm xong Final Dashboard App
- [ ] Score ≥80% tất cả Knowledge Checks

**Next:** Phase 3 - Performance & Optimization

---

## 📚 RESOURCES

**Official Docs:**
- https://zustand-demo.pmnd.rs/
- https://tanstack.com/query/latest/docs/react

**Articles:**
- Kent C. Dodds: Application State Management
- Tanner Linsley: React Query tips

**Examples:**
- Real-world dashboard examples
- E-commerce state management patterns
