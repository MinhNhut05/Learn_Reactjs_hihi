# PHASE 5: TESTING & BEST PRACTICES (Chi Tiết)

> Thời gian: 1-2 tuần
> Mục tiêu: Professional-grade testing & code quality

---

## 📅 MODULE 5.1: Testing

### **Session 5.1.1: Unit Testing với Vitest (2-3h)**

#### Concepts:
- Vitest setup
- Testing Library basics
- Render components
- Query elements
- User interactions
- Assertions

#### Bài tập:

**Exercise 1: Test Simple Components**
```typescript
// YÊU CẦU:
// Test Button component:
// - Renders với correct text
// - onClick được gọi
// - Disabled state works
// - Different variants render correctly

// Test Card component:
// - Props rendering
// - Children rendering
// - Optional props
```

**Exercise 2: Test Form**
```typescript
// YÊU CẦU:
// Test Login Form:
// - Input changes update state
// - Form submission
// - Validation errors display
// - Success callback được gọi
```

---

### **Session 5.1.2: Component Testing (2h)**

#### Concepts:
- Testing hooks
- Testing context
- Mocking
- Testing async code
- Coverage

#### Bài tập:

**Exercise 1: Test Custom Hooks**
```typescript
// YÊU CẦU:
// Test useLocalStorage hook:
// - Initial value từ localStorage
// - setValue updates localStorage
// - JSON parsing/stringifying
// - Error handling
```

**Exercise 2: Test Context Provider**
```typescript
// YÊU CẦU:
// Test ThemeProvider:
// - Default theme
// - Toggle theme
// - Theme persists
// - useTheme hook works
```

---

### **Session 5.1.3: E2E Testing với Playwright (2h)**

#### Concepts:
- Playwright setup
- Page object model
- Selectors
- Assertions
- Screenshots

#### Bài tập:

**Exercise 1: Test User Flow**
```typescript
// YÊU CẦU:
// E2E test: Todo app
// - Visit homepage
// - Add todo
// - Mark as complete
// - Delete todo
// - Verify UI updates
```

**Exercise 2: Test Authentication Flow**
```typescript
// YÊU CẦU:
// - Login
// - Navigate to protected page
// - Logout
// - Verify redirect
```

---

## 📅 MODULE 5.2: Best Practices

### **Session 5.2.1: Code Quality & Linting (2h)**

#### Concepts:
- ESLint configuration
- Prettier setup
- Husky pre-commit hooks
- TypeScript strict mode
- Import sorting

#### Bài tập:

**Exercise 1: Setup Quality Tools**
```typescript
// YÊU CẦU:
// - ESLint với recommended rules
// - Prettier configuration
// - Husky pre-commit hook (lint + format)
// - TypeScript strict mode
// - VS Code settings
```

**Exercise 2: Fix Messy Codebase**
```typescript
// YÊU CẦU:
// Cho codebase với issues:
// - Inconsistent formatting
// - Type errors
// - ESLint warnings
// - Unused imports

// Fix tất cả để pass linting
```

---

### **Session 5.2.2: Accessibility (2h)**

#### Concepts:
- ARIA basics
- Semantic HTML
- Keyboard navigation
- Focus management
- Screen reader testing

#### Bài tập:

**Exercise 1: Accessible Modal**
```typescript
// YÊU CẦU:
// Modal component với:
// - Focus trap
// - ESC to close
// - ARIA labels
// - Focus restoration
// - Screen reader announcements
```

**Exercise 2: Accessible Form**
```typescript
// YÊU CẦU:
// Form với:
// - Proper labels
// - Error announcements
// - Required fields marked
// - Keyboard navigation
```

---

### **Session 5.2.3: Production Checklist (2h)**

#### Concepts:
- Performance optimization review
- Security best practices
- Error monitoring setup
- Analytics
- Documentation

#### Bài tập:

**Exercise 1: Production Readiness**
```typescript
// YÊU CẦU:
// Checklist app để verify:
// - Environment variables secured
// - HTTPS enabled
// - Error boundaries
// - Loading states
// - Meta tags
// - Lighthouse score
// - Accessibility score
// - No console.logs
```

---

## 📊 MODULE 5 FINAL: Testing Coverage Project (4-5h)

**Project: Test Todo App**

**Requirements:**
- [ ] Unit tests cho tất cả components
- [ ] Integration tests cho user flows
- [ ] E2E tests cho critical paths
- [ ] Test coverage ≥80%
- [ ] All tests passing
- [ ] CI/CD setup (GitHub Actions)

**Tests Required:**
- [ ] Add todo
- [ ] Toggle todo
- [ ] Delete todo
- [ ] Filter todos (all/active/completed)
- [ ] Clear completed
- [ ] Persist to localStorage
- [ ] Error handling

---

## 💼 MODULE 5 INTERVIEW PREP (1-2h)

**Topics:**
- Testing strategies
- Unit vs Integration vs E2E
- Accessibility principles
- Code quality tools
- Production best practices

**Questions:**
- "How do you test React components?"
- "Unit test vs E2E test - when to use which?"
- "How to test custom hooks?"
- "What's your code quality workflow?"
- "Common accessibility issues in React"
- "How to make a component accessible?"

---

## ✅ PHASE 5 COMPLETION CHECKLIST

- [ ] Write unit tests confidently
- [ ] Test hooks và context
- [ ] E2E testing với Playwright
- [ ] Setup linting và formatting
- [ ] Understand accessibility basics
- [ ] Production-ready checklist
- [ ] Test coverage ≥80% project
- [ ] Pass interview prep ≥80%

**Next:** Phase 6 - Capstone Projects

---

**VERSION:** 1.0
**LAST UPDATED:** 2025-12-25
