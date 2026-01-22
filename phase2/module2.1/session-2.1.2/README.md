# Session 2.1.2 - Advanced Patterns

## 📚 Render Props, HOC & Provider Composition

---

## 🗺️ FLOW HỌC (BẮT ĐẦU TỪ ĐÂY!)

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLOW HỌC SESSION 2.1.2                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BƯỚC 1: Đọc THEORY.md (file lý thuyết)           ⏱️ 30-40 phút │
│     ↓                                                           │
│  BƯỚC 2: Đọc code ví dụ trong components/         ⏱️ 20 phút    │
│          - MouseTracker.tsx (Render Props)                      │
│          - DataFetcher.tsx (Generic + Hook comparison)          │
│     ↓                                                           │
│  BƯỚC 3: Đọc code ví dụ trong hocs/               ⏱️ 15 phút    │
│          - withAuth.tsx (HOC pattern)                           │
│     ↓                                                           │
│  BƯỚC 4: Làm Mini Exercise (Toggle)               ⏱️ 30 phút    │
│          - exercises/Toggle.starter.tsx                         │
│          - Xem solution khi xong: solutions/Toggle.solution.tsx │
│     ↓                                                           │
│  BƯỚC 5: Đọc Real Exercise code                   ⏱️ 40 phút    │
│          - contexts/auth/AuthProvider.tsx (Split Contexts!)     │
│          - contexts/theme/ThemeProvider.tsx                     │
│          - providers/AppProvider.tsx                            │
│     ↓                                                           │
│  BƯỚC 6: Review & Practice                        ⏱️ 15 phút    │
│                                                                 │
│                                          TỔNG: ~2.5 giờ         │
└─────────────────────────────────────────────────────────────────┘
```

### 📄 Files theo thứ tự đọc:

1. **`THEORY.md`** ← BẮT ĐẦU TỪ ĐÂY!
2. `components/MouseTracker.tsx`
3. `components/DataFetcher.tsx`
4. `hocs/withAuth.tsx`
5. `exercises/Toggle.starter.tsx` (tự làm)
6. `contexts/auth/AuthProvider.tsx`
7. `contexts/theme/ThemeProvider.tsx`
8. `providers/AppProvider.tsx`

---

## 📁 Cấu trúc thư mục

```
session-2.1.2/
├── THEORY.md                 # 📚 ĐỌC TRƯỚC - Lý thuyết chi tiết
├── README.md                 # Flow học và checklist
├── components/
│   ├── MouseTracker.tsx      # Render Props example
│   ├── DataFetcher.tsx       # Generic Render Props + Custom Hook comparison
│   └── index.ts
├── contexts/
│   ├── auth/
│   │   ├── AuthProvider.tsx  # Split contexts pattern
│   │   └── index.ts
│   ├── theme/
│   │   ├── ThemeProvider.tsx # localStorage persist
│   │   └── index.ts
│   └── notification/
│       ├── NotificationProvider.tsx  # Toast methods
│       └── index.ts
├── hocs/
│   ├── withAuth.tsx          # Basic HOC example
│   ├── withAuth.complete.tsx # Full-featured HOC
│   └── index.ts
├── providers/
│   ├── AppProvider.tsx       # Composed provider
│   ├── composeProviders.tsx  # Utility function
│   └── index.ts
├── exercises/
│   └── Toggle.starter.tsx    # Mini exercise (bạn tự làm)
├── solutions/
│   └── Toggle.solution.tsx   # Mini exercise solution
└── README.md
```

---

## 🎯 Learning Objectives

### ✅ Sau session này, bạn sẽ:

1. **Hiểu Render Props pattern** - Component nhận function để render
2. **Hiểu HOC pattern** - Function wrap component để enhance
3. **Hiểu Provider Composition** - Giải quyết Provider Hell
4. **Biết khi nào dùng pattern nào** - Hooks vs HOC vs Render Props
5. **Implement được** Split Contexts, composeProviders, withAuth

---

## 📖 Thứ tự học

### Phase 1: Theory (Đọc hiểu code)

1. **Render Props** - Đọc `components/MouseTracker.tsx`
2. **DataFetcher** - Đọc `components/DataFetcher.tsx`
3. **HOC Pattern** - Đọc `hocs/withAuth.tsx`
4. **Provider Composition** - Đọc `providers/composeProviders.tsx`

### Phase 2: Mini Exercise (30 phút)

1. Mở `exercises/Toggle.starter.tsx`
2. Implement Toggle component theo hướng dẫn
3. Check solution tại `solutions/Toggle.solution.tsx`

### Phase 3: Real Exercise (60 phút)

1. Đọc hiểu `contexts/auth/AuthProvider.tsx` (Split Contexts)
2. Đọc hiểu `contexts/theme/ThemeProvider.tsx` (localStorage persist)
3. Đọc hiểu `contexts/notification/NotificationProvider.tsx`
4. Đọc hiểu `providers/AppProvider.tsx` (Composition)
5. Đọc hiểu `hocs/withAuth.complete.tsx` (Full HOC)

---

## 📊 Bảng So Sánh 3 Patterns

| Aspect | Render Props | HOC | Hooks |
|--------|-------------|-----|-------|
| **Syntax** | Function as child | Wrapper function | Function calls |
| **Composition** | Nested callbacks | Wrapper hell | Linear, clean |
| **TypeScript** | Medium | Hard | Easy |
| **Testing** | Medium | Hard | Easy |
| **DevTools** | Shows wrapper | Shows wrapper | No extra layers |
| **Use case** | Libraries | Route protection | **Default** |

---

## 🎯 Khi nào dùng pattern nào?

### ✅ Hooks (Default - 90% cases)
```typescript
function MyComponent() {
  const { user } = useAuth();
  const theme = useTheme();
  return <div>...</div>;
}
```

### ✅ HOC khi:
- Route protection
- Error boundaries
- Analytics tracking
- Feature flags

### ✅ Render Props khi:
- Library APIs (Downshift, React Table)
- Headless components
- Full UI control

---

## ✅ Checklist hoàn thành

### Theory:
- [ ] Đọc hiểu MouseTracker (Render Props)
- [ ] Đọc hiểu DataFetcher (Generic Render Props)
- [ ] Đọc hiểu withAuth (HOC)
- [ ] Đọc hiểu composeProviders (Utility)

### Mini Exercise:
- [ ] Implement Toggle component
- [ ] Toggle có on state
- [ ] Toggle có toggle function
- [ ] Toggle có setOn function
- [ ] TypeScript types đầy đủ
- [ ] Bonus: Controlled mode

### Real Exercise:
- [ ] Đọc hiểu AuthProvider với split contexts
- [ ] Đọc hiểu ThemeProvider với localStorage
- [ ] Đọc hiểu NotificationProvider với toast
- [ ] Đọc hiểu AppProvider composition
- [ ] Đọc hiểu withAuth HOC đầy đủ

### Interview Prep:
- [ ] Có thể giải thích Render Props
- [ ] Có thể giải thích HOC
- [ ] Có thể giải thích tại sao Hooks thay thế
- [ ] Có thể giải thích Provider Composition
- [ ] Có thể giải thích Split Contexts

---

## 🔑 Key Takeaways

1. **Hooks là default choice** - Dùng Hooks cho hầu hết cases
2. **HOC cho route protection** - withAuth, withFeatureFlag
3. **Split contexts** - Tách data và actions để optimize re-renders
4. **composeProviders** - Giải quyết Provider Hell
5. **Legacy understanding** - Hiểu HOC/Render Props để đọc code cũ

---

## 📚 Tài liệu tham khảo

- [React Render Props](https://react.dev/learn/render-props)
- [React Higher-Order Components](https://legacy.reactjs.org/docs/higher-order-components.html)
- [Kent C. Dodds - Advanced React Patterns](https://kentcdodds.com/blog/advanced-react-component-patterns)

---

**Next Session:** 2.2.1 - Zustand Basics
