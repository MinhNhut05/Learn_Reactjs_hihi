# PHASE 3: NEXT.JS FRAMEWORK (V2)

> Thời gian: 1.5-2 tuần (với 5h/ngày)
> Mục tiêu: Master Next.js App Router
> Sessions: 5 (2-3 bài tập/session, review gộp cuối)
> Mini Project: Blog Platform

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

## 📅 MODULE 3.1: Next.js Essentials (5 sessions)

### **Session 3.1.1: Routing & Layouts (2-3h)**

#### Concepts:
- File-based routing
- Layouts và Templates
- Route Groups
- Dynamic routes [slug]
- Loading và Error UI

#### Bài tập (2 bài):

**Exercise 1: Multi-page Website (60 phút)**
```typescript
// YÊU CẦU:
// Structure:
// - Home (/)
// - About (/about)
// - Blog (/blog, /blog/[slug])
// - Contact (/contact)

// Features:
// - Shared layout với header/footer
// - Nested layout cho blog
// - Loading UI cho mỗi route
// - not-found page
```

**Exercise 2: Route Groups (45 phút)**
```typescript
// YÊU CẦU:
// (marketing) group: landing, pricing, about
// (app) group: dashboard, settings
// Different layouts cho mỗi group
```

#### Knowledge Check (8 câu):
1. File-based routing hoạt động thế nào?
2. layout.tsx vs template.tsx?
3. Route groups () dùng để làm gì?
4. Dynamic routes [slug] vs [...slug] vs [[...slug]]?
5. loading.tsx hoạt động thế nào?
6. error.tsx vs global-error.tsx?
7. not-found.tsx khi nào được gọi?
8. Parallel routes (@) là gì?

---

### **Session 3.1.2: Server & Client Components (2-3h)**

#### Concepts:
- Server Components vs Client Components
- "use client" directive
- When to use which
- Composition patterns
- Data fetching in Server Components

#### Bài tập (2 bài):

**Exercise 1: Blog với Server Components (60 phút)**
```typescript
// YÊU CẦU:
// - Posts list: Server Component (fetch data)
// - Like button: Client Component (interactive)
// - Post detail: Server Component
// - Comments form: Client Component

// Implement proper composition
```

**Exercise 2: Dashboard Layout (45 phút)**
```typescript
// YÊU CẦU:
// - Sidebar: Client (interactive toggle)
// - Main content: Server (fetch data)
// - User menu: Client (dropdown)
// - Stats cards: Server (fetch from API)
```

#### Knowledge Check (10 câu):
1. Server Component mặc định hay Client?
2. "use client" boundary?
3. Props nào pass được từ Server → Client?
4. Tại sao Server Components tốt cho SEO?
5. useState/useEffect dùng được ở Server không?
6. Import Client component trong Server component?
7. Streaming với Suspense?
8. Composition pattern đúng?
9. Third-party libraries (hooks) dùng thế nào?
10. Serializable props?

---

### **Session 3.1.3: Data Fetching & Caching (2-3h)**

#### Concepts:
- fetch() in Server Components
- Caching strategies: force-cache, no-store
- Revalidation: time-based, on-demand
- generateStaticParams

#### Bài tập (2 bài):

**Exercise 1: Posts với Different Strategies (60 phút)**
```typescript
// YÊU CẦU:
// 1. Static posts (ISG) - cache forever
// 2. Revalidate every 60s
// 3. Dynamic (no cache) - real-time data
// 4. On-demand revalidation với tag

// So sánh behavior của mỗi strategy
```

**Exercise 2: Product Pages với generateStaticParams (45 phút)**
```typescript
// YÊU CẦU:
// /products/[category]/[id]
// - generateStaticParams cho top 10 products
// - fallback: blocking cho rest
// - Revalidate after 1 hour
```

#### Knowledge Check (10 câu):
1. fetch cache default?
2. force-cache vs no-store?
3. revalidate option?
4. revalidateTag vs revalidatePath?
5. generateStaticParams?
6. dynamicParams option?
7. Parallel fetching trong Server Components?
8. Waterfall requests?
9. unstable_noStore?
10. Route segment config?

---

### **Session 3.1.4: Server Actions & Forms (2-3h)**

#### Concepts:
- Server Actions basics
- Form handling với action
- useFormStatus, useFormState
- Validation với Zod
- Revalidation after mutations

#### Bài tập (2 bài):

**Exercise 1: Contact Form (60 phút)**
```typescript
// YÊU CẦU:
// 1. Form với Server Action
// 2. Validation (zod)
// 3. useFormStatus for pending state
// 4. Success/error messages
// 5. Works without JS (progressive enhancement)
```

**Exercise 2: CRUD Todo App (60 phút)**
```typescript
// YÊU CẦU:
// 1. Create todo - Server Action
// 2. Toggle complete - Server Action
// 3. Delete todo - Server Action
// 4. revalidatePath after mutations
// 5. Optimistic updates với useOptimistic
```

#### Knowledge Check (8 câu):
1. "use server" directive?
2. Server Action vs API Route?
3. useFormStatus?
4. useFormState?
5. Progressive enhancement?
6. formData.get()?
7. redirect() trong Server Action?
8. Error handling trong Server Actions?

---

### **Session 3.1.5: Metadata & Deployment (2h)**

#### Concepts:
- Metadata object & generateMetadata
- Open Graph images
- Sitemap & robots.txt
- Vercel deployment
- Environment variables

#### Bài tập (2 bài):

**Exercise 1: SEO-optimized Blog (45 phút)**
```typescript
// YÊU CẦU:
// - Static metadata cho homepage
// - Dynamic metadata cho blog posts
// - Open Graph images
// - Twitter cards
// - Generate sitemap.xml
// - robots.txt
```

**Exercise 2: Deploy to Vercel (30 phút)**
```typescript
// YÊU CẦU:
// 1. Push to GitHub
// 2. Connect Vercel
// 3. Setup environment variables
// 4. Custom domain (optional)
// 5. Preview deployments
```

#### Knowledge Check (8 câu):
1. Metadata export vs generateMetadata?
2. Template trong metadata?
3. OpenGraph images generation?
4. sitemap.ts?
5. robots.ts?
6. Vercel environment variables?
7. Preview vs Production deployments?
8. Edge runtime?

---

## 🎯 MODULE 3.R: Review & Mini Project

### **Mini Project: Blog Platform (6-8h)**

**Yêu cầu:**
Full-stack blog với Next.js App Router:

**Features:**
- [ ] Homepage với latest posts (SSG)
- [ ] Blog post detail (/blog/[slug])
- [ ] Contact form (Server Action)
- [ ] Admin: Create/Edit posts (protected)
- [ ] Comments system
- [ ] Search posts
- [ ] Dark mode

**Technical Requirements:**
- [ ] Next.js 14+ App Router
- [ ] TypeScript
- [ ] Server Components cho data fetching
- [ ] Client Components cho interactivity
- [ ] Server Actions cho mutations
- [ ] Proper caching strategy
- [ ] SEO optimized (metadata, sitemap)
- [ ] Deploy to Vercel

**Checklist:**
- [ ] Score ≥80% tất cả Knowledge Checks
- [ ] Blog hoạt động đầy đủ
- [ ] Deployed live

---

## ✅ PHASE 3 COMPLETION CHECKLIST

Hoàn thành Phase 3 khi:
- [ ] Hiểu Next.js routing system
- [ ] Biết Server vs Client Components
- [ ] Master data fetching strategies
- [ ] Implement Server Actions
- [ ] SEO optimization
- [ ] Deploy production app
- [ ] Làm xong Mini Project Blog
- [ ] Score ≥80% tất cả Knowledge Checks

**Next:** Phase 4 - Testing & AI Integration

---

## 📚 RESOURCES

**Official Docs:**
- https://nextjs.org/docs (App Router)
- https://nextjs.org/learn

**Videos:**
- Next.js 14 tutorial by Vercel
- Lee Robinson YouTube

---

**VERSION:** 2.0 (V2 - Fresher Optimized)
**DATE:** 2025-01-04
**CHANGES:**
- Giảm từ 8 xuống 5 sessions
- Focus App Router only
- 2-3 exercises/session
- Gộp review vào cuối
