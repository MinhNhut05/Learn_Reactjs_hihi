# PHASE 3: PERFORMANCE & OPTIMIZATION (Chi Tiết)

> Thời gian: 1-2 tuần
> Mục tiêu: Master performance optimization & advanced patterns

---

## 📅 MODULE 3.1: Performance Optimization

### **Session 3.1.1: React.memo & Memoization (2-3h)**

#### Concepts:
- React.memo deep dive (khi nào dùng, khi nào KHÔNG)
- useMemo vs useCallback revisited
- Referential equality problems
- Premature optimization anti-pattern

#### Bài tập:

**Exercise 1: Profiling App**
```typescript
// YÊU CẦU:
// 1. Dùng React DevTools Profiler
// 2. Identify unnecessary re-renders
// 3. Apply React.memo where needed
// 4. Measure improvement

// App có 1000 items list + filters
// Optimize to reduce renders by 80%
```

**Exercise 2: Memoization Trade-offs**
```typescript
// YÊU CẦU:
// So sánh 3 approaches:
// A. No memoization
// B. React.memo everywhere
// C. Strategic memoization

// Measure: render time, memory usage
// Explain when each approach is better
```

**Exercise 3: Custom Equality Function**
```typescript
// YÊU CẦU:
// React.memo with custom comparison
// Deep object props
// Array props optimization
```

---

### **Session 3.1.2: Code Splitting & Lazy Loading (2h)**

#### Concepts:
- React.lazy() và Suspense
- Route-based code splitting
- Component-based splitting
- Webpack chunks analysis

#### Bài tập:

**Exercise 1: Route-based Splitting**
```typescript
// YÊU CẦU:
// App with 5 routes
// Lazy load each route
// Add loading fallback
// Analyze bundle sizes before/after
```

**Exercise 2: Component Splitting**
```typescript
// YÊU CẦU:
// Heavy component (chart library, editor)
// Lazy load when user interacts
// Preload on hover
```

**Exercise 3: Error Boundaries**
```typescript
// YÊU CẦU:
// Error boundary for lazy components
// Retry mechanism
// Fallback UI
```

---

### **Session 3.1.3: Virtualization (2h)**

#### Concepts:
- Virtual scrolling concepts
- react-window library
- react-virtualized alternative
- Infinite scroll with virtualization

#### Bài tập:

**Exercise 1: Virtual List**
```typescript
// YÊU CẦU:
// Render 10,000 items smoothly
// Use react-window
// Variable height items
// Measure: FPS, memory
```

**Exercise 2: Virtual Grid**
```typescript
// YÊU CẦU:
// Photo gallery with 1000+ images
// Grid virtualization
// Lazy load images
// Smooth scrolling 60fps
```

---

## 📅 MODULE 3.2: Advanced Patterns

### **Session 3.2.1: Error Boundaries (2h)**

#### Concepts:
- Error boundaries setup
- Error recovery strategies
- Logging errors
- Graceful degradation

#### Bài tập:

**Exercise 1: Global Error Handler**
```typescript
// YÊU CẦU:
// Error boundary component
// Log to service (Sentry simulation)
// User-friendly error UI
// Reset functionality
```

**Exercise 2: Granular Error Boundaries**
```typescript
// YÊU CẦU:
// Multiple error boundaries
// Section-specific fallbacks
// Prevent whole app crash
```

---

### **Session 3.2.2: Portals & Refs (2h)**

#### Concepts:
- Portals for modals/tooltips
- Advanced useRef patterns
- Imperative handles
- Focus management

#### Bài tập:

**Exercise 1: Modal System**
```typescript
// YÊU CẦU:
// Modal với Portal
// Accessibility (trap focus, ESC to close)
// Stack multiple modals
// Animation
```

**Exercise 2: Tooltip Component**
```typescript
// YÊU CẦU:
// Tooltip with Portal
// Position calculation
// Smart positioning (avoid viewport edges)
```

---

### **Session 3.2.3: Suspense & Concurrent Features (2-3h)**

#### Concepts:
- Suspense for data fetching
- useTransition
- useDeferredValue
- Concurrent rendering

#### Bài tập:

**Exercise 1: Suspense Data Fetching**
```typescript
// YÊU CẦU:
// Implement Suspense for API calls
// Nested Suspense boundaries
// Error boundaries combo
```

**Exercise 2: useTransition Demo**
```typescript
// YÊU CẦU:
// Large list filtering
// Use useTransition for smooth UX
// isPending state
// Compare with/without transition
```

---

## 📊 MODULE 3 FINAL: Performance Audit Project

**Project: Optimize Landing Page (4-5h)**

**Requirements:**
- [ ] Landing page với nhiều sections
- [ ] Images optimization (next/image or lazy loading)
- [ ] Code splitting
- [ ] Font loading optimization
- [ ] CSS optimization
- [ ] Lighthouse score 90+
- [ ] Measure Web Vitals (LCP, FID, CLS)

**Deliverables:**
- Before/after screenshots
- Performance metrics comparison
- Lighthouse reports
- Deployed live site

---

## 💼 MODULE 3 INTERVIEW PREP (1-2h)

**Topics:**
- Performance optimization strategies
- Code splitting best practices
- Virtual scrolling concepts
- Error handling patterns
- Concurrent React features

**Questions:**
- "How would you optimize a slow React app?"
- "Explain React.memo vs useMemo"
- "When to use code splitting?"
- "Debugging: Why is this component re-rendering?"
- "Design a modal system"

---

## ✅ PHASE 3 COMPLETION CHECKLIST

- [ ] Hiểu performance profiling với DevTools
- [ ] Biết khi nào dùng/không dùng React.memo
- [ ] Implement code splitting properly
- [ ] Understand virtualization concepts
- [ ] Error boundaries setup
- [ ] Portals for overlays
- [ ] Suspense & Concurrent features
- [ ] Optimize landing page project 90+ score
- [ ] Pass interview prep quiz ≥80%

**Next:** Phase 4 - Next.js Framework

---

**VERSION:** 1.0
**LAST UPDATED:** 2025-12-25
