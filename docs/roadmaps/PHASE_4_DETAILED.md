# PHASE 4: NEXT.JS FRAMEWORK (Chi Tiết)

> Thời gian: 3-4 tuần
> Mục tiêu: Master Next.js App Router & full-stack development

---

## 📅 MODULE 4.1: Next.js Basics

### **Session 4.1.1: Routing & Navigation (3h)**

#### Concepts:
- File-based routing
- Layouts và Templates
- Route Groups
- Dynamic routes
- Parallel routes
- Intercepting routes

#### Bài tập:

**Exercise 1: Multi-page Website**
```typescript
// YÊU CẦU:
// Structure:
// - Home (/)
// - About (/about)
// - Blog (/blog, /blog/[slug])
// - Products (/products/[category]/[id])
// - Contact (/contact)

// Features:
// - Shared layout with header/footer
// - Nested layouts for blog
// - Loading UI cho mỗi route
// - Error UI (not-found, error)
```

**Exercise 2: Route Groups**
```typescript
// YÊU CẦU:
// (marketing) group: landing, pricing, about
// (app) group: dashboard, settings
// Different layouts cho mỗi group
```

---

### **Session 4.1.2: Server Components & Client Components (3h)**

#### Concepts:
- Server Components vs Client Components
- When to use which
- "use client" directive
- Composition patterns
- Data fetching in Server Components

#### Bài tập:

**Exercise 1: Blog với Server Components**
```typescript
// YÊU CẦU:
// - Posts list: Server Component
// - Like button: Client Component
// - Comments: mix Server + Client
// - Fetch data in Server Component
// - Streaming với Suspense
```

**Exercise 2: Dashboard Layout**
```typescript
// YÊU CẦU:
// - Server: fetch user data, permissions
// - Client: interactive sidebar, theme toggle
// - Proper composition pattern
```

---

### **Session 4.1.3: Data Fetching (3h)**

#### Concepts:
- fetch() in Server Components
- Caching strategies
- Revalidation (revalidate, tags)
- Streaming
- Loading states

#### Bài tập:

**Exercise 1: Dynamic Data Fetching**
```typescript
// YÊU CẦU:
// Fetch posts với different strategies:
// - Static (ISG)
// - Revalidate every 60s
// - Dynamic (no cache)
// - On-demand revalidation
```

**Exercise 2: Parallel Data Fetching**
```typescript
// YÊU CẦU:
// Dashboard với 3 data sources
// Fetch in parallel
// Suspense boundaries
// Error handling
```

---

### **Session 4.1.4: Metadata & SEO (2h)**

#### Concepts:
- Metadata object
- Dynamic metadata
- Open Graph images
- Sitemap generation
- robots.txt

#### Bài tập:

**Exercise 1: SEO-optimized Blog**
```typescript
// YÊU CẦU:
// - Dynamic metadata per post
// - Open Graph images
// - Twitter cards
// - JSON-LD structured data
// - Generate sitemap
```

---

## 📅 MODULE 4.2: Next.js Advanced

### **Session 4.2.1: Server Actions (3h)**

#### Concepts:
- Server Actions basics
- Form handling
- Progressive enhancement
- Revalidation after mutations
- Error handling

#### Bài tập:

**Exercise 1: Contact Form**
```typescript
// YÊU CẦU:
// Form với Server Action
// Validation (zod)
// Success/error states
// Email sending (simulation)
// Works without JS (progressive enhancement)
```

**Exercise 2: CRUD with Server Actions**
```typescript
// YÊU CẦU:
// Todo app với Server Actions:
// - Create todo
// - Update todo
// - Delete todo
// - Revalidate path after mutations
// - Optimistic updates
```

---

### **Session 4.2.2: API Routes (2h)**

#### Concepts:
- Route Handlers
- GET, POST, PUT, DELETE
- Request/Response objects
- CORS
- Rate limiting

#### Bài tập:

**Exercise 1: REST API**
```typescript
// YÊU CẦU:
// Build API endpoints:
// - GET /api/posts
// - POST /api/posts
// - GET /api/posts/[id]
// - PUT /api/posts/[id]
// - DELETE /api/posts/[id]

// Features:
// - Validation
// - Error handling
// - TypeScript types
```

---

### **Session 4.2.3: Authentication (3h)**

#### Concepts:
- NextAuth.js setup
- Providers (Google, GitHub, Credentials)
- Protected routes
- Session management
- Middleware

#### Bài tập:

**Exercise 1: Full Auth Flow**
```typescript
// YÊU CẦU:
// - Sign in with Google & GitHub
// - Protected dashboard route
// - Session in Server Components
// - Sign out functionality
// - Redirect after login
```

**Exercise 2: Role-based Access**
```typescript
// YÊU CẦU:
// - User roles (admin, user)
// - Protect routes based on role
// - Middleware for auth check
```

---

### **Session 4.2.4: Deployment & Optimization (2h)**

#### Concepts:
- Vercel deployment
- Environment variables
- Build optimization
- Image optimization
- Caching strategies

#### Bài tập:

**Exercise 1: Deploy Full App**
```typescript
// YÊU CẦU:
// - Setup Vercel project
// - Environment variables
// - Custom domain (optional)
// - Analytics
// - Preview deployments
```

---

## 📊 MODULE 4 FINAL: Full-stack Next.js Project (8-10h)

**Project: Blog Platform**

**Requirements:**
- [ ] Public blog posts (SSG)
- [ ] Author dashboard (protected)
- [ ] Create/edit/delete posts (Server Actions)
- [ ] Comments system
- [ ] Authentication (NextAuth)
- [ ] SEO optimized
- [ ] Responsive design
- [ ] Deploy to Vercel

**Tech Stack:**
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- NextAuth.js
- Database (Prisma + PostgreSQL or Firebase)

**Features:**
- Home page với latest posts
- Post detail page (dynamic route)
- Admin dashboard
- Post editor (markdown)
- User profile
- Dark mode

---

## 💼 MODULE 4 INTERVIEW PREP (1-2h)

**Topics:**
- Next.js App Router vs Pages Router
- Server Components benefits
- Data fetching strategies
- SEO best practices
- Authentication patterns

**Questions:**
- "Explain Server Components vs Client Components"
- "How does Next.js caching work?"
- "When to use SSG vs SSR vs ISR?"
- "How to protect routes in Next.js?"
- "Optimize a Next.js app for production"

---

## ✅ PHASE 4 COMPLETION CHECKLIST

- [ ] Understand Next.js routing deeply
- [ ] Know Server vs Client Components
- [ ] Master data fetching strategies
- [ ] Implement authentication
- [ ] Use Server Actions effectively
- [ ] Deploy to production
- [ ] SEO optimization
- [ ] Build full-stack blog project
- [ ] Pass interview prep ≥80%

**Next:** Phase 5 - Testing & Best Practices

---

**VERSION:** 1.0
**LAST UPDATED:** 2025-12-25
