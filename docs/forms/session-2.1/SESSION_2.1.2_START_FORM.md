# SESSION START FORM - Session 2.1.2

---

## SESSION INFO

**Session ID:** 2.1.2
**Session Title:** Advanced Patterns - Render Props, HOC & Provider Composition
**Module:** 2.1 - Advanced React Patterns
**Phase:** Phase 2 - State Management & Data Fetching
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 2:** State Management & Data Fetching (Session 2/12)
- **Previous Session:** 2.1.1 - Compound Components (Completed)
- **Next Session:** 2.2.1 - Zustand Basics

**Prerequisites Completed:**
- Session 2.1.1 - Compound Components
- ProfileTabs component hoàn thiện
- Hiểu Context API pattern
- TypeScript với React

**Why This Session Important:**
- **Legacy Understanding** - Hiểu Render Props và HOC để đọc code cũ
- **When Hooks Aren't Enough** - Một số cases vẫn cần patterns này
- **Provider Composition** - Giải quyết Provider Hell
- **Interview Must-know** - Câu hỏi classic trong React interviews

---

## LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Hiểu Render Props pattern** và khi nào nên dùng
2. **Hiểu HOC pattern** và tại sao hooks thay thế nó
3. **Implement Mouse Tracker** với Render Props
4. **Implement withAuth HOC** cho protected routes
5. **Giải quyết Provider Hell** với composition
6. **Áp dụng vào Social App** - Auth và Theme providers

---

## KEY CONCEPTS TO COVER

### 1. Render Props Pattern

**Định nghĩa:** Component nhận một function prop để render UI, function này nhận data từ component.

```typescript
// Render Props - Component chia sẻ logic qua function prop
interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => React.ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Gọi children như function, truyền data
  return <>{children(position)}</>;
}

// Usage
<MouseTracker>
  {({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
</MouseTracker>
```

**Khi nào dùng Render Props:**
- Chia sẻ stateful logic giữa components
- Cần flexibility trong việc render
- Trước hooks, đây là cách chính để reuse logic

**So sánh với Custom Hook:**
```typescript
// Custom Hook (Modern - Preferred)
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

// Usage - cleaner!
function MyComponent() {
  const { x, y } = useMousePosition();
  return <div>Mouse: {x}, {y}</div>;
}
```

---

### 2. Higher-Order Components (HOC)

**Định nghĩa:** Function nhận component và trả về component mới với enhanced functionality.

```typescript
// HOC Pattern
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(Profile);

// In routes
<Route path="/dashboard" element={<ProtectedDashboard />} />
<Route path="/profile" element={<ProtectedProfile />} />
```

**Naming Convention:** HOCs bắt đầu bằng `with` (withAuth, withTheme, withRouter)

**TypeScript cho HOC:**
```typescript
// Preserve original component props
function withLogging<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  // Display name for DevTools
  const displayName = `WithLogging(${componentName})`;

  function WithLoggingComponent(props: P) {
    useEffect(() => {
      console.log(`${componentName} mounted`);
      return () => console.log(`${componentName} unmounted`);
    }, []);

    return <WrappedComponent {...props} />;
  }

  WithLoggingComponent.displayName = displayName;
  return WithLoggingComponent;
}
```

**Vấn đề với HOC:**
- **Wrapper Hell** - Nhiều HOCs = nhiều wrapper layers
- **Props collision** - HOCs có thể override props
- **Static methods lost** - Phải manually hoist
- **Ref forwarding** - Cần forwardRef

```typescript
// Wrapper Hell example
export default withRouter(
  withAuth(
    withTheme(
      withIntl(
        connect(mapState, mapDispatch)(MyComponent)
      )
    )
  )
);
```

---

### 3. Tại sao Hooks thay thế HOC và Render Props?

```typescript
// TRƯỚC: HOC + Render Props
const EnhancedComponent = withAuth(withTheme(MyComponent));

<MouseTracker>
  {(mouse) => (
    <WindowSize>
      {(size) => (
        <MyComponent mouse={mouse} size={size} />
      )}
    </WindowSize>
  )}
</MouseTracker>

// SAU: Hooks - Clean và simple
function MyComponent() {
  const { user } = useAuth();
  const theme = useTheme();
  const mouse = useMousePosition();
  const size = useWindowSize();

  return <div>...</div>;
}
```

**Hooks advantages:**
- Không có wrapper hell
- Không có props collision
- Dễ compose
- Dễ test
- Better TypeScript support

---

### 4. Khi nào vẫn dùng HOC/Render Props?

**HOC vẫn hữu ích cho:**
```typescript
// 1. Route protection (declarative)
const ProtectedRoute = withAuth(Route);

// 2. Error boundaries (class components required)
const SafeComponent = withErrorBoundary(RiskyComponent);

// 3. Analytics/Logging wrapper
const TrackedButton = withTracking(Button, "button_click");

// 4. Feature flags
const FeatureComponent = withFeatureFlag(NewFeature, "new_feature");
```

**Render Props vẫn hữu ích cho:**
```typescript
// 1. Downshift, React Table - Library APIs
<Downshift>
  {({ getInputProps, getItemProps, isOpen }) => (
    <div>
      <input {...getInputProps()} />
      {isOpen && <Menu items={items} getItemProps={getItemProps} />}
    </div>
  )}
</Downshift>

// 2. Headless components với full control
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>
      {on ? "ON" : "OFF"}
    </button>
  )}
</Toggle>
```

---

### 5. Provider Composition Pattern

**Problem: Provider Hell**
```typescript
// ❌ Provider Hell
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <RouterProvider>
            <QueryClientProvider>
              <NotificationProvider>
                <ModalProvider>
                  <AppContent />
                </ModalProvider>
              </NotificationProvider>
            </QueryClientProvider>
          </RouterProvider>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

**Solution 1: Compose Providers Function**
```typescript
// providers/compose.tsx
type Provider = React.FC<{ children: React.ReactNode }>;

function composeProviders(...providers: Provider[]) {
  return function ComposedProviders({ children }: { children: React.ReactNode }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}

// providers/index.tsx
const AppProviders = composeProviders(
  AuthProvider,
  ThemeProvider,
  I18nProvider,
  QueryClientProvider,
  NotificationProvider
);

// App.tsx - Clean!
function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
```

**Solution 2: Single App Provider**
```typescript
// providers/AppProvider.tsx
interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// App.tsx
function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
```

---

### 6. Context Selectors Pattern

**Problem: Context re-renders all consumers**
```typescript
// ❌ Mỗi khi AuthContext thay đổi, TẤT CẢ consumers re-render
const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  updateProfile: () => void;
} | null>(null);
```

**Solution: Split Contexts**
```typescript
// ✅ Split into separate contexts
const UserContext = createContext<User | null>(null);
const AuthActionsContext = createContext<{
  login: () => void;
  logout: () => void;
} | null>(null);

// Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const actions = useMemo(() => ({
    login: async (credentials: Credentials) => {
      const user = await authApi.login(credentials);
      setUser(user);
    },
    logout: () => {
      authApi.logout();
      setUser(null);
    },
  }), []);

  return (
    <UserContext.Provider value={user}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </UserContext.Provider>
  );
}

// Hooks
function useUser() {
  return useContext(UserContext);
}

function useAuthActions() {
  const context = useContext(AuthActionsContext);
  if (!context) throw new Error("Must be within AuthProvider");
  return context;
}

// Usage - chỉ re-render khi user thay đổi
function UserAvatar() {
  const user = useUser(); // Chỉ subscribe user
  return <img src={user?.avatar} />;
}

// Usage - không re-render khi user thay đổi
function LogoutButton() {
  const { logout } = useAuthActions(); // Chỉ subscribe actions
  return <button onClick={logout}>Logout</button>;
}
```

---

## REAL-WORLD EXAMPLES

### React Router (HOC → Hooks)
```typescript
// OLD: withRouter HOC
const MyComponent = withRouter(({ history, location, match }) => {
  return <div>Path: {location.pathname}</div>;
});

// NEW: useNavigate, useLocation hooks
function MyComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  return <div>Path: {location.pathname}</div>;
}
```

### Redux (HOC → Hooks)
```typescript
// OLD: connect HOC
const mapState = (state) => ({ user: state.user });
const mapDispatch = { updateUser };
export default connect(mapState, mapDispatch)(UserProfile);

// NEW: useSelector, useDispatch hooks
function UserProfile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return <div>{user.name}</div>;
}
```

### Formik (Render Props + Hooks)
```typescript
// Render Props style
<Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
  {({ values, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <input value={values.email} onChange={handleChange} />
    </form>
  )}
</Formik>

// Hooks style
function MyForm() {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps("email")} />
    </form>
  );
}
```

---

## INTERVIEW Q&A

### Q1: So sánh Render Props vs HOC vs Hooks?

**Answer:**
| Aspect | Render Props | HOC | Hooks |
|--------|-------------|-----|-------|
| Syntax | Function as child | Wrapper function | Function calls |
| Composition | Nested callbacks | Wrapper hell | Linear, clean |
| TypeScript | Medium | Hard | Easy |
| Testing | Medium | Hard | Easy |
| DevTools | Shows wrapper | Shows wrapper | No extra layers |
| Use case | Libraries, full control | Route protection, legacy | Default choice |

---

### Q2: Giải thích Wrapper Hell và cách giải quyết?

**Answer:**
> **Wrapper Hell** là khi có quá nhiều HOCs hoặc Providers wrap component, làm code khó đọc và debug.
>
> **Giải quyết:**
> 1. **Dùng Hooks** thay vì HOC khi có thể
> 2. **Compose Providers** thành 1 AppProvider
> 3. **Split Contexts** để tránh unnecessary re-renders
> 4. **Use composeProviders utility** function

---

### Q3: Khi nào bạn vẫn chọn HOC thay vì Hooks?

**Answer:**
> 1. **Route protection** - Declarative và reusable
> 2. **Error boundaries** - Class components required
> 3. **Analytics wrapper** - Cross-cutting concern
> 4. **Feature flags** - Conditional rendering at route level
> 5. **Legacy codebase** - Gradual migration

---

### Q4: Context re-renders tất cả consumers. Làm sao optimize?

**Answer:**
> 1. **Split contexts** - Separate data và actions
> 2. **useMemo** cho actions object
> 3. **React.memo** cho heavy components
> 4. **useContextSelector** (thư viện bên ngoài)
> 5. **Zustand/Jotai** - Built-in selectors

---

## EXERCISES

### Mini Exercise: Toggle with Render Props (30 phút)

**Mục tiêu:** Tạo Toggle component với Render Props pattern

**Requirements:**
```typescript
// Usage
<Toggle>
  {({ on, toggle, setOn }) => (
    <div>
      <p>Toggle is: {on ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setOn(true)}>Turn On</button>
      <button onClick={() => setOn(false)}>Turn Off</button>
    </div>
  )}
</Toggle>
```

**Checklist:**
- [ ] Toggle component với render props
- [ ] on state (boolean)
- [ ] toggle function
- [ ] setOn function
- [ ] TypeScript types đầy đủ
- [ ] Bonus: Controlled mode support

---

### Real Exercise: Social App Providers (60 phút)

**Mục tiêu:** Setup providers cho Social App với proper composition

**Requirements:**

**1. AuthProvider với split contexts:**
```typescript
// contexts/auth/
// - UserContext (user data only)
// - AuthActionsContext (login, logout, updateProfile)
// - AuthProvider (combines both)
// - useUser, useAuthActions hooks
```

**2. ThemeProvider:**
```typescript
// contexts/theme/
// - ThemeContext (theme, toggleTheme)
// - ThemeProvider
// - useTheme hook
// - Persist to localStorage
```

**3. NotificationProvider:**
```typescript
// contexts/notification/
// - NotificationContext
// - NotificationProvider
// - useNotification hook
// - Methods: showSuccess, showError, showInfo
```

**4. AppProvider composition:**
```typescript
// providers/AppProvider.tsx
// Compose all providers into one
// Clean App.tsx with single provider
```

**5. withAuth HOC:**
```typescript
// hocs/withAuth.tsx
// Protect routes that require authentication
// Redirect to /login if not authenticated
// Show loading while checking auth
```

**Folder Structure:**
```
src/
├── contexts/
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   ├── useUser.ts
│   │   ├── useAuthActions.ts
│   │   └── index.ts
│   ├── theme/
│   │   ├── ThemeProvider.tsx
│   │   ├── useTheme.ts
│   │   └── index.ts
│   └── notification/
│       ├── NotificationProvider.tsx
│       ├── useNotification.ts
│       └── index.ts
├── hocs/
│   └── withAuth.tsx
├── providers/
│   ├── AppProvider.tsx
│   └── composeProviders.ts
└── App.tsx
```

**Checklist:**
- [ ] AuthProvider với split contexts (UserContext, AuthActionsContext)
- [ ] useUser hook (chỉ subscribe user data)
- [ ] useAuthActions hook (login, logout không re-render khi user đổi)
- [ ] ThemeProvider với localStorage persist
- [ ] NotificationProvider với toast methods
- [ ] composeProviders utility function
- [ ] AppProvider composed từ tất cả providers
- [ ] withAuth HOC cho protected routes
- [ ] Clean App.tsx

---

## SUCCESS CRITERIA

Session 2.1.2 hoàn thành khi:

- [ ] Hiểu Render Props pattern và use cases
- [ ] Hiểu HOC pattern và tại sao hooks thay thế
- [ ] Hiểu Provider Composition pattern
- [ ] Hoàn thành Mini Exercise - Toggle
- [ ] Hoàn thành Real Exercise - Social App Providers
- [ ] AuthProvider có split contexts
- [ ] withAuth HOC hoạt động cho protected routes
- [ ] App.tsx clean với single AppProvider

---

## COMMON PITFALLS

1. **Render Props: Tạo function mới mỗi render**
   ```typescript
   // ❌ Function mới mỗi render
   <Toggle>
     {({ on }) => <div>{on}</div>}
   </Toggle>

   // ✅ Extract nếu cần optimize
   const renderToggle = useCallback(({ on }) => <div>{on}</div>, []);
   <Toggle>{renderToggle}</Toggle>
   ```

2. **HOC: Quên forward ref**
   ```typescript
   // ❌ Ref không được forward
   function withAuth(Component) {
     return function WithAuth(props) {
       return <Component {...props} />;
     };
   }

   // ✅ Forward ref
   function withAuth(Component) {
     return forwardRef(function WithAuth(props, ref) {
       return <Component {...props} ref={ref} />;
     });
   }
   ```

3. **Provider: Không split contexts**
   - Split data và actions contexts
   - useMemo cho actions object

4. **HOC: Không set displayName**
   ```typescript
   WithAuth.displayName = `withAuth(${Component.displayName || Component.name})`;
   ```

---

## DIFFICULTY & TIME ESTIMATE

**Độ khó:** Medium-Hard

**Thời gian dự kiến:**
- Theory & Concepts: 40 phút
- Mini Exercise (Toggle): 30 phút
- Real Exercise (Providers): 60 phút
- Review & Polish: 20 phút

**Total:** ~2.5 hours

---

## READY TO START

**AI, please:**

1. **Giải thích 3 patterns** với ví dụ cụ thể
2. **So sánh** Render Props vs HOC vs Hooks
3. **Guide Mini Exercise** - Toggle với render props
4. **Guide Real Exercise** - Social App Providers
5. **Review code** và đảm bảo best practices

**Lưu ý quan trọng:**
- **Split contexts** là must-have cho AuthProvider
- **withAuth HOC** phải handle loading state
- **composeProviders** utility để tránh Provider Hell
- Focus vào **TypeScript types** đúng chuẩn

---

**VERSION:** 1.0
**CREATED:** 2025-01-13
**FOR:** Session 2.1.2 - Advanced Patterns
**PROJECT:** Social App
**PREVIOUS SESSION:** 2.1.1 - Compound Components
**NEXT SESSION:** 2.2.1 - Zustand Basics
