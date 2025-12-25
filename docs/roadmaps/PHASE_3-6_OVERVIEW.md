# PHASE 3-6: OVERVIEW

> Các phase này sẽ có bản chi tiết khi bạn học đến
> Đây là overview để hiểu roadmap tổng thể

---

## 📅 PHASE 3: PERFORMANCE & OPTIMIZATION (1-2 tuần)

### **Module 3.1: Performance Optimization**

**Session 3.1.1: Profiling & Measuring (2h)**
- React DevTools Profiler
- Performance metrics (LCP, FID, CLS)
- Identifying bottlenecks
- **Exercise:** Profile slow app, identify issues

**Session 3.1.2: Memoization Strategies (2-3h)**
- React.memo deep dive
- useMemo vs useCallback revisited
- When NOT to memoize
- **Exercise:** Optimize re-rendering heavy app

**Session 3.1.3: Code Splitting & Lazy Loading (2h)**
- React.lazy() và Suspense
- Route-based code splitting
- Component-based splitting
- **Exercise:** Split large app into chunks

**Session 3.1.4: Virtualization (2h)**
- Long lists problem
- react-window / react-virtualized
- Infinite scroll with virtualization
- **Exercise:** 10,000 items table

---

### **Module 3.2: Advanced Patterns**

**Session 3.2.1: Render Props & HOCs (2h)**
- Render props pattern
- Higher-Order Components
- Use cases & trade-offs
- **Exercise:** withAuth HOC, DataProvider render prop

**Session 3.2.2: Error Boundaries & Portals (2h)**
- Error boundaries setup
- Graceful error handling
- Portals for modals/tooltips
- **Exercise:** Global error handler, Modal system

**Session 3.2.3: Web Vitals & Optimization (2h)**
- Image optimization
- Font loading strategies
- CSS optimization
- **Exercise:** Optimize landing page to 90+ Lighthouse score

---

## 📅 PHASE 4: NEXT.JS (3-4 tuần)

### **Module 4.1: Next.js Fundamentals**

**Session 4.1.1: App Router Basics (3h)**
- File-based routing
- Layouts & Templates
- Loading & Error UI
- **Exercise:** Multi-page website

**Session 4.1.2: Data Fetching (3h)**
- Server Components vs Client Components
- fetch() in Server Components
- Streaming
- **Exercise:** Blog với SSR

**Session 4.1.3: Routing & Navigation (2h)**
- Dynamic routes
- Route groups
- Parallel routes
- **Exercise:** E-commerce routes

**Session 4.1.4: Metadata & SEO (2h)**
- Meta tags generation
- Open Graph
- Sitemap & robots.txt
- **Exercise:** SEO-optimized site

---

### **Module 4.2: Next.js Advanced**

**Session 4.2.1: Server Actions (3h)**
- Server Actions basics
- Form handling với Server Actions
- Revalidation
- **Exercise:** CRUD with Server Actions

**Session 4.2.2: API Routes (2h)**
- Route Handlers
- REST API in Next.js
- Authentication API
- **Exercise:** API for mobile app

**Session 4.2.3: Authentication (3h)**
- NextAuth.js setup
- Protected routes
- Session management
- **Exercise:** Full auth flow

**Session 4.2.4: Deployment & Optimization (2h)**
- Vercel deployment
- Environment variables
- ISR (Incremental Static Regeneration)
- **Exercise:** Deploy production app

---

## 📅 PHASE 5: TESTING & BEST PRACTICES (1-2 tuần)

### **Module 5.1: Testing**

**Session 5.1.1: Testing Library Basics (2-3h)**
- Render components
- Query elements
- User interactions
- **Exercise:** Test todo app

**Session 5.1.2: Testing Hooks & Context (2h)**
- Testing custom hooks
- Testing Context providers
- Mocking
- **Exercise:** Test useAuth hook

**Session 5.1.3: Integration Testing (2h)**
- Testing data fetching
- Testing forms
- Testing routing
- **Exercise:** Test user flow

**Session 5.1.4: E2E Testing Intro (2h)**
- Playwright basics
- Critical path testing
- **Exercise:** E2E checkout flow

---

### **Module 5.2: Professional Practices**

**Session 5.2.1: Project Structure (2h)**
- Folder organization
- File naming conventions
- Component organization
- **Exercise:** Refactor messy codebase

**Session 5.2.2: Code Quality (2h)**
- ESLint + Prettier
- Husky pre-commit hooks
- TypeScript strict mode
- **Exercise:** Setup tooling template

**Session 5.2.3: Accessibility (2h)**
- ARIA basics
- Keyboard navigation
- Screen reader testing
- **Exercise:** Make app accessible

**Session 5.2.4: Documentation (2h)**
- Component documentation
- Storybook basics
- README best practices
- **Exercise:** Document component library

---

## 📅 PHASE 6: CAPSTONE PROJECTS (3-4 tuần)

### **Project 1: Marketing Website (1 tuần)**

**Requirements:**
- Next.js với App Router
- CMS integration (Contentful hoặc Sanity)
- Blog với MDX
- Contact form
- SEO optimization
- Responsive design
- Deploy to Vercel

**Tech Stack:**
- Next.js 14+
- TypeScript
- Tailwind CSS
- Contentful/Sanity CMS

---

### **Project 2: Dashboard Application (1.5 tuần)**

**Requirements:**
- Authentication với NextAuth
- Role-based access
- CRUD operations với React Query
- Charts & data visualization
- Tables với sorting/filtering/pagination
- Dark/light theme
- Zustand state management
- Unit tests

**Tech Stack:**
- Next.js 14+
- TypeScript
- React Query
- Zustand
- Shadcn/ui hoặc Material-UI
- Recharts
- Testing Library

**Features:**
- Users management
- Analytics dashboard
- Settings page
- Profile management
- Notifications

---

### **Project 3: Your Choice (1.5 tuần)**

Chọn 1 trong các options:

**Option A: E-commerce Storefront**
- Product catalog với filters
- Shopping cart
- Checkout flow
- Order history
- Stripe integration (test mode)
- Product search
- Reviews & ratings

**Option B: Social Media Clone**
- User profiles
- Posts feed với infinite scroll
- Like, comment, share
- Follow/unfollow
- Real-time notifications (optional)
- Image upload

**Option C: Productivity App**
- Notion-like: Blocks editor
- Trello-like: Kanban board
- Todoist-like: Task manager
- With drag & drop
- Rich text editing
- Collaboration features

**Option D: Portfolio Website with CMS**
- Personal portfolio
- Blog
- Projects showcase
- Contact form
- Admin panel
- Analytics

---

## 📊 COMPLETION CRITERIA

### **Mỗi Project cần có:**
- [ ] Clean, well-organized code
- [ ] TypeScript strict mode
- [ ] Responsive design
- [ ] Error handling
- [ ] Loading states
- [ ] README với setup instructions
- [ ] Deployed live
- [ ] GitHub repo
- [ ] At least 80% test coverage (Dashboard project)

### **Overall Phase 1-6 Complete khi:**
- [ ] Hoàn thành 45+ sessions
- [ ] Average quiz score ≥80%
- [ ] 3 capstone projects done & deployed
- [ ] Portfolio có 3 projects showcase
- [ ] Tự tin giải thích mọi concepts
- [ ] Ready for job interviews

---

## 🎯 TIMELINE OVERVIEW

| Phase | Duration | Sessions | Focus |
|-------|----------|----------|-------|
| Phase 1 | 2-3 tuần | 16 | TypeScript, Hooks, Mental Model |
| Phase 2 | 2-3 tuần | 12 | State Management, Data Fetching |
| Phase 3 | 1-2 tuần | 6 | Performance, Patterns |
| Phase 4 | 3-4 tuần | 8 | Next.js Framework |
| Phase 5 | 1-2 tuần | 6 | Testing, Best Practices |
| Phase 6 | 3-4 tuần | 3 projects | Real Projects |

**Total:** 12-18 tuần (3-4.5 tháng) với 5h/ngày

---

## 📚 RESOURCES BY PHASE

### Phase 3:
- web.dev/vitals
- React DevTools Profiler docs
- Patterns.dev

### Phase 4:
- nextjs.org/docs
- nextjs.org/learn
- Vercel guides

### Phase 5:
- testing-library.com
- playwright.dev
- web.dev/accessibility

### Phase 6:
- Real-world examples
- Awwwards.com (inspiration)
- dribbble.com (design)

---

## 💡 NOTES

**Chi tiết đầy đủ cho Phase 3-6:**
- Sẽ được tạo khi bạn hoàn thành phase trước đó
- Format giống Phase 1 & 2
- Mỗi session có concepts + exercises + quiz

**Tại sao chưa tạo chi tiết ngay:**
- Tránh overwhelm
- Focus vào Phase hiện tại
- Có thể adjust based on progress
- Technology updates (Next.js, tools)

---

**Khi bạn đến Phase 3, nhắn tôi tạo PHASE_3_DETAILED.md!**
