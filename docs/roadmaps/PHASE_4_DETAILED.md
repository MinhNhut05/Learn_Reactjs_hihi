# PHASE 4: TESTING BASICS (V2.1 - Job Ready)

> Thời gian: 3-4 ngày (với 5h/ngày)
> Mục tiêu: Testing basics để đủ dùng cho job
> Sessions: 2 (1-2 bài tập/session, tập trung core skills)

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

## ⚠️ LƯU Ý

> **AI Integration module đã được bỏ** để tập trung vào core skills cần cho job.
> Bạn có thể tự học AI Integration sau khi đi làm nếu cần.

---

## 📅 MODULE 4.1: Testing Basics (2 sessions)

### **Session 4.1.1: Unit Testing với Vitest (2-3h)**

#### Concepts:
- Vitest setup với React
- Testing React components
- Testing hooks
- Mocking modules
- Coverage reports

#### Bài tập:

**🔸 Mini: Counter Tests (20 phút)**
```typescript
// Test Counter component:
// - Initial render
// - Increment click
// - Decrement click
// - Reset functionality

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('renders initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('increments count when + button clicked', async () => {
    render(<Counter />)
    await userEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('decrements count when - button clicked', async () => {
    render(<Counter />)
    await userEvent.click(screen.getByRole('button', { name: '-' }))
    expect(screen.getByText('-1')).toBeInTheDocument()
  })
})
```

**🔶 Real: E-commerce Component Tests (45 phút)**
```typescript
// Viết tests cho E-commerce components:
//
// PRODUCT CARD:
// - Renders product info correctly
// - Add to Cart button works
// - Shows sale badge when on sale
//
// CART:
// - Displays cart items
// - Updates quantity
// - Shows correct total
//
// Sử dụng Vitest + React Testing Library
```

#### Knowledge Check (8 câu):
1. Vitest vs Jest?
2. @testing-library/react là gì?
3. render() function trả về gì?
4. screen queries (getBy, queryBy, findBy) khác gì?
5. userEvent vs fireEvent?
6. waitFor dùng khi nào?
7. Mocking modules với vi.mock()?
8. Test coverage là gì?

---

### **Session 4.1.2: Integration Testing (2-3h)**

#### Concepts:
- Testing component interactions
- Testing forms
- Testing API calls (MSW)
- Testing React Query

#### Bài tập:

**🔸 Mini: Form Submission Test (25 phút)**
```typescript
// Test login form:
// - Fill inputs
// - Submit form
// - Mock API response
// - Verify success/error UI

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'fake-token', user: { name: 'John' } }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('LoginForm', () => {
  it('submits form and shows success', async () => {
    render(<LoginForm />)
    
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, John!')).toBeInTheDocument()
    })
  })

  it('shows error on failed login', async () => {
    server.use(
      rest.post('/api/login', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }))
      })
    )
    
    render(<LoginForm />)
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })
})
```

**🔶 Real: E-commerce Integration Tests (45 phút)**
```typescript
// Integration tests cho E-commerce:
//
// CHECKOUT FLOW:
// - Add product to cart
// - Go to cart
// - Update quantity
// - Proceed to checkout
// - Verify total
//
// Mock APIs với MSW
// Test user journey cơ bản
```

#### Knowledge Check (8 câu):
1. Integration test vs Unit test?
2. MSW (Mock Service Worker) là gì?
3. Testing loading states?
4. React Query wrapper cho tests?
5. Async testing với waitFor?
6. act() warning là gì?
7. Cleanup between tests?
8. Khi nào cần mock API?

---

## ✅ PHASE 4 COMPLETION CHECKLIST

Hoàn thành Phase 4 khi:
- [ ] Setup được Vitest + React Testing Library
- [ ] Viết được unit tests cho components
- [ ] Viết được integration tests với MSW
- [ ] Hiểu testing best practices
- [ ] Score ≥80% tất cả Knowledge Checks

---

## 🎉 COURSE COMPLETION

Hoàn thành khóa học khi:
- [ ] ✅ Phase 1: React Foundation
- [ ] ✅ Phase 1.5: Tailwind CSS → E-commerce UI
- [ ] ✅ Phase 2: State Management (RTK + Zustand + React Query)
- [ ] ✅ Phase 3: Next.js → E-commerce Full-stack
- [ ] ✅ Phase 4: Testing Basics
- [ ] ✅ Có thể demo projects

**You are now a Job-Ready React Developer!**

**Portfolio Projects:**
1. E-commerce với Next.js (Phase 1.5 + 3)
2. Social App (Phase 2)

**Skills để nói trong phỏng vấn:**
- React + TypeScript
- Redux Toolkit & Zustand (state management)
- React Query (data fetching)
- Next.js (SSR, App Router)
- Tailwind CSS
- Testing với Vitest

**Next Steps:**
- Apply for jobs với portfolio
- Học thêm AI Integration nếu cần (sau khi đi làm)
- Build thêm projects
- Contribute to open source

---

## 📚 RESOURCES

**Testing:**
- https://vitest.dev/
- https://testing-library.com/docs/react-testing-library/intro/
- https://mswjs.io/

**Best Practices:**
- Kent C. Dodds: Testing Library guides
- Testing Trophy (Unit → Integration → E2E)

---

**VERSION:** 2.1 (Job-Ready Focus)
**DATE:** 2025-01-13
**CHANGES:**
- Bỏ AI Integration module (3 sessions) để tập trung core skills
- Giữ Testing Basics (2 sessions)
- Rút gọn exercises
- Cập nhật completion checklist
