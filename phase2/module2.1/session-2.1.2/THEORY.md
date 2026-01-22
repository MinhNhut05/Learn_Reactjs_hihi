# 📚 SESSION 2.1.2 - LÝ THUYẾT

## Advanced Patterns: Render Props, HOC & Provider Composition

---

## 🗺️ FLOW HỌC

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLOW HỌC                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BƯỚC 1: Đọc file này (THEORY.md)                              │
│     ↓                                                           │
│  BƯỚC 2: Đọc code ví dụ trong components/                       │
│     ↓                                                           │
│  BƯỚC 3: Làm Mini Exercise (Toggle)                            │
│     ↓                                                           │
│  BƯỚC 4: Đọc Real Exercise code (contexts/, providers/)         │
│     ↓                                                           │
│  BƯỚC 5: Tự tay modify/extend code                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# PHẦN 1: RENDER PROPS PATTERN

## 1.1. Render Props là gì?

**Render Props** là một kỹ thuật trong React, nơi một component nhận vào một **function làm prop** (thường là `children` hoặc `render`), và gọi function đó để quyết định render gì.

### Ý tưởng cốt lõi:

```
Component A có DATA/LOGIC
     ↓
Component A gọi children(data)
     ↓
Component B (parent) quyết định RENDER gì với data đó
```

### Ví dụ đơn giản nhất:

```tsx
// Component CÓ DATA (quản lý state)
function Counter({ children }) {
  const [count, setCount] = useState(0);

  // Gọi children như function, truyền data vào
  return children({ count, increment: () => setCount(c => c + 1) });
}

// CÁCH SỬ DỤNG - Parent quyết định render
<Counter>
  {({ count, increment }) => (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  )}
</Counter>
```

### Giải thích từng bước:

1. `Counter` component quản lý `count` state
2. `Counter` KHÔNG tự render UI
3. `Counter` gọi `children({ count, increment })`
4. `children` là một function được truyền từ parent
5. Function đó return JSX để render

---

## 1.2. Tại sao cần Render Props?

### Vấn đề: Làm sao chia sẻ logic giữa components?

Giả sử bạn có 3 components đều cần biết vị trí chuột:

```tsx
// Component 1: Hiển thị text
function MousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <p>Mouse: {position.x}, {position.y}</p>;
}

// Component 2: Vẽ dot theo chuột - PHẢI COPY PASTE LOGIC!
function MouseDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <div style={{ position: 'fixed', left: position.x, top: position.y }} />;
}

// Component 3: Hiển thị cat image - LẠI COPY PASTE!
function MouseCat() {
  // ... same logic again
}
```

**Vấn đề:** Logic giống nhau bị duplicate 3 lần!

### Giải pháp với Render Props:

```tsx
// 1 component quản lý logic
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Truyền data cho children
  return children(position);
}

// Sử dụng - mỗi component render khác nhau
<MouseTracker>
  {(pos) => <p>Mouse: {pos.x}, {pos.y}</p>}
</MouseTracker>

<MouseTracker>
  {(pos) => <div style={{ left: pos.x, top: pos.y }} />}
</MouseTracker>

<MouseTracker>
  {(pos) => <img src="cat.png" style={{ left: pos.x, top: pos.y }} />}
</MouseTracker>
```

**Logic viết 1 lần, render theo 3 cách khác nhau!**

---

## 1.3. Cú pháp Render Props

### Cách 1: Dùng `children` (phổ biến nhất)

```tsx
// Component
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children({ on, toggle: () => setOn(!on) });
}

// Sử dụng
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
  )}
</Toggle>
```

### Cách 2: Dùng `render` prop

```tsx
// Component
function Toggle({ render }) {
  const [on, setOn] = useState(false);
  return render({ on, toggle: () => setOn(!on) });
}

// Sử dụng
<Toggle
  render={({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
  )}
/>
```

**Cả 2 cách đều valid, `children` ngắn gọn hơn.**

---

## 1.4. TypeScript với Render Props

```tsx
// Định nghĩa data type
interface ToggleState {
  on: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
}

// Props với render function type
interface ToggleProps {
  children: (state: ToggleState) => React.ReactNode;
  defaultOn?: boolean;
}

// Component
function Toggle({ children, defaultOn = false }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const state: ToggleState = {
    on,
    toggle: () => setOn(!on),
    setOn,
  };

  return <>{children(state)}</>;
}
```

---

# PHẦN 2: HIGHER-ORDER COMPONENTS (HOC)

## 2.1. HOC là gì?

**HOC (Higher-Order Component)** là một **function** nhận vào một component và trả về một **component mới** với chức năng được mở rộng.

```
HOC = (Component) => EnhancedComponent
```

### Ví dụ đơn giản:

```tsx
// HOC function
function withBorder(WrappedComponent) {
  // Trả về component MỚI
  return function WithBorderComponent(props) {
    return (
      <div style={{ border: '2px solid red', padding: '10px' }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Component gốc
function Hello({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Component được enhance
const HelloWithBorder = withBorder(Hello);

// Sử dụng
<HelloWithBorder name="John" />

// Kết quả: <div style="border..."><h1>Hello, John!</h1></div>
```

### Giải thích:

1. `withBorder` là một function
2. Nhận `WrappedComponent` (component gốc)
3. Trả về component MỚI `WithBorderComponent`
4. Component mới wrap component gốc với thêm border

---

## 2.2. Naming Convention

**HOC bắt đầu bằng `with`:**
- `withAuth` - Thêm authentication check
- `withTheme` - Thêm theme data
- `withRouter` - Thêm routing props (React Router cũ)
- `withLoading` - Thêm loading state
- `withErrorBoundary` - Wrap với error boundary

---

## 2.3. HOC thực tế: withAuth

```tsx
// HOC để protect routes
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { user, isLoading } = useAuth();

    // Đang check auth
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Chưa login
    if (!user) {
      return <Navigate to="/login" />;
    }

    // Đã login - render component gốc
    return <WrappedComponent {...props} />;
  };
}

// Sử dụng
function Dashboard() {
  return <h1>Welcome to Dashboard!</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

// Trong routes
<Route path="/dashboard" element={<ProtectedDashboard />} />
```

### Flow:

```
User truy cập /dashboard
       ↓
ProtectedDashboard render
       ↓
Check isLoading? → Hiện Loading...
       ↓
Check user? → Không có → Redirect /login
       ↓
Có user → Render Dashboard
```

---

## 2.4. Vấn đề với HOC: Wrapper Hell

Khi có nhiều HOCs:

```tsx
// Wrapper Hell!
export default withRouter(
  withAuth(
    withTheme(
      withIntl(
        withLoading(MyComponent)
      )
    )
  )
);
```

**Vấn đề:**
- Khó đọc
- Khó debug (nhiều layers trong DevTools)
- Props có thể bị override
- TypeScript khó handle

---

# PHẦN 3: TẠI SAO HOOKS THAY THẾ HOC VÀ RENDER PROPS?

## 3.1. So sánh trực tiếp

### Trước: HOC + Render Props

```tsx
// Wrapper Hell với HOC
const EnhancedComponent = withAuth(withTheme(withLoading(MyComponent)));

// Callback Hell với Render Props
<MouseTracker>
  {(mouse) => (
    <WindowSize>
      {(size) => (
        <Theme>
          {(theme) => (
            <MyComponent mouse={mouse} size={size} theme={theme} />
          )}
        </Theme>
      )}
    </WindowSize>
  )}
</MouseTracker>
```

### Sau: Hooks (Clean!)

```tsx
function MyComponent() {
  // Gọi hooks một cách linear
  const { user } = useAuth();
  const theme = useTheme();
  const isLoading = useLoading();
  const mouse = useMousePosition();
  const size = useWindowSize();

  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  return <div>...</div>;
}
```

---

## 3.2. Bảng so sánh

| Tiêu chí | Render Props | HOC | Hooks |
|----------|--------------|-----|-------|
| Cú pháp | Function as child | Wrapper function | Function calls |
| Composition | Nested callbacks | Wrapper hell | **Linear, clean** |
| TypeScript | Trung bình | Khó | **Dễ** |
| Testing | Trung bình | Khó | **Dễ** |
| DevTools | Thấy wrapper | Thấy wrapper | **Không thêm layer** |
| Re-renders | OK | OK | **Tốt nhất** |

---

## 3.3. Khi nào VẪN dùng HOC?

**HOC vẫn hữu ích cho:**

1. **Route Protection** (declarative)
   ```tsx
   const ProtectedRoute = withAuth(Dashboard);
   ```

2. **Error Boundaries** (phải dùng class component)
   ```tsx
   const SafeComponent = withErrorBoundary(RiskyComponent);
   ```

3. **Analytics/Logging**
   ```tsx
   const TrackedButton = withTracking(Button, 'button_click');
   ```

4. **Feature Flags**
   ```tsx
   const NewFeature = withFeatureFlag(Component, 'new_feature');
   ```

---

## 3.4. Khi nào VẪN dùng Render Props?

**Render Props vẫn hữu ích cho:**

1. **Library APIs** (Downshift, React Table, Formik)
   ```tsx
   <Downshift>
     {({ getInputProps, isOpen }) => (
       <input {...getInputProps()} />
     )}
   </Downshift>
   ```

2. **Headless Components** (full UI control)
   ```tsx
   <Toggle>
     {({ on, toggle }) => (
       <CustomSwitch isOn={on} onClick={toggle} />
     )}
   </Toggle>
   ```

---

# PHẦN 4: PROVIDER COMPOSITION

## 4.1. Vấn đề: Provider Hell

Khi app lớn, bạn có nhiều Providers:

```tsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <QueryProvider>
            <NotificationProvider>
              <ModalProvider>
                <AppContent />  {/* 6 levels deep! */}
              </ModalProvider>
            </NotificationProvider>
          </QueryProvider>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

**Vấn đề:**
- Khó đọc, khó maintain
- Thứ tự có thể quan trọng
- Khó test (phải wrap nhiều providers)

---

## 4.2. Giải pháp 1: composeProviders Utility

```tsx
// Utility function
function composeProviders(...providers) {
  return function ComposedProviders({ children }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}

// Sử dụng
const AppProviders = composeProviders(
  AuthProvider,
  ThemeProvider,
  NotificationProvider
);

// Clean App!
function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
```

---

## 4.3. Giải pháp 2: Single AppProvider

```tsx
// providers/AppProvider.tsx
function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// App.tsx - Super clean!
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

## 4.4. QUAN TRỌNG: Split Contexts

### Vấn đề với Single Context:

```tsx
const AuthContext = createContext({
  user: null,        // Data - thay đổi khi login/logout
  login: () => {},   // Action - KHÔNG BAO GIỜ thay đổi
  logout: () => {},  // Action - KHÔNG BAO GIỜ thay đổi
});
```

**Khi user thay đổi → TẤT CẢ consumers re-render!**

Ngay cả `LogoutButton` chỉ cần `logout` function cũng re-render!

### Giải pháp: Tách thành 2 contexts

```tsx
// Context 1: Chỉ chứa DATA (thay đổi)
const UserContext = createContext(null);

// Context 2: Chỉ chứa ACTIONS (stable - không thay đổi)
const AuthActionsContext = createContext(null);

// Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Actions được memoize → stable reference
  const actions = useMemo(() => ({
    login: async (credentials) => { /* ... */ setUser(newUser); },
    logout: () => setUser(null),
  }), []);

  return (
    <UserContext.Provider value={user}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </UserContext.Provider>
  );
}

// Hooks riêng cho từng context
function useUser() {
  return useContext(UserContext);
}

function useAuthActions() {
  return useContext(AuthActionsContext);
}
```

### Kết quả:

```tsx
// Component này RE-RENDER khi user đổi
function UserAvatar() {
  const user = useUser();
  return <img src={user?.avatar} />;
}

// Component này KHÔNG RE-RENDER khi user đổi!
function LogoutButton() {
  const { logout } = useAuthActions();
  return <button onClick={logout}>Logout</button>;
}
```

---

# PHẦN 5: TÓM TẮT

## 5.1. Chọn Pattern nào?

```
┌─────────────────────────────────────────────────────────┐
│                    CHỌN PATTERN                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Cần share logic?                                       │
│       ↓                                                 │
│  ┌─── Hooks (90% cases) ←── DEFAULT CHOICE             │
│  │                                                      │
│  │    function MyComponent() {                          │
│  │      const { user } = useAuth();                     │
│  │      const theme = useTheme();                       │
│  │      return <div>...</div>;                          │
│  │    }                                                 │
│  │                                                      │
│  ├─── HOC (khi cần wrap ở route level)                 │
│  │    - Route protection                                │
│  │    - Error boundaries                                │
│  │    - Feature flags                                   │
│  │                                                      │
│  └─── Render Props (khi cần full UI control)           │
│       - Library APIs                                    │
│       - Headless components                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 5.2. Best Practices

1. **Hooks là default** - Dùng hooks cho hầu hết cases
2. **Split Contexts** - Tách data và actions
3. **Memoize actions** - useMemo cho object chứa functions
4. **composeProviders** - Giải quyết Provider Hell
5. **DisplayName** - Set displayName cho HOCs để debug

---

# 🎯 BƯỚC TIẾP THEO

Sau khi đọc xong file này, hãy:

1. **Đọc code ví dụ** trong `components/MouseTracker.tsx`
2. **Đọc code ví dụ** trong `hocs/withAuth.tsx`
3. **Làm Mini Exercise** trong `exercises/Toggle.starter.tsx`
4. **Đọc Real Exercise** trong `contexts/auth/AuthProvider.tsx`

Khi có thắc mắc, hỏi ngay!
