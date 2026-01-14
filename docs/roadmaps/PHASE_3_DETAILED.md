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

#### Bài tập:

**🔹 Micro 1: Dynamic Route (5 phút)**
```typescript
// Tạo file cho route /products/[id]
// Log params.id trong component
```

**🔹 Micro 2: Layout Component (5 phút)**
```typescript
// Tạo layout.tsx với header chung
// Children render bên dưới header
```

**🔸 Mini: Basic Routes (15 phút)**
```typescript
// Tạo cấu trúc routes:
// - / (home)
// - /products
// - /products/[id]
// - /cart
// - Shared layout với navigation
```

**🔶 Real: E-commerce Routes Setup (45 phút)**
```typescript
// Setup routing cho E-commerce với Next.js:
//
// (marketing) group:
// - / (landing page)
// - /about
//
// (shop) group:
// - /products (listing)
// - /products/[category] (category page)
// - /products/[category]/[id] (product detail)
// - /cart
// - /checkout
//
// Layout riêng cho mỗi group
// Loading UI cho product pages
// Not-found page
//
// Tiếp tục build từ Social App Phase 2
// Chuyển đổi sang Next.js App Router
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

#### Bài tập:

**🔹 Micro 1: Server Component Fetch (5 phút)**
```typescript
// Viết async Server Component
// Fetch data trực tiếp trong component (không useEffect)
```

**🔹 Micro 2: "use client" Boundary (5 phút)**
```typescript
// Tạo Client Component với useState
// Import vào Server Component
```

**🔸 Mini: Mixed Components (15 phút)**
```typescript
// ProductCard component:
// - Server: fetch product data, render static info
// - Client: "Add to Cart" button (onClick)
// - Đúng composition pattern
```

**🔶 Real: E-commerce Product Pages (45 phút)**
```typescript
// Xây dựng product pages với đúng component type:
//
// PRODUCTS LIST PAGE (Server):
// - Fetch products từ API
// - Render ProductCard grid
// - Filter sidebar (Client component cho interactive)
//
// PRODUCT DETAIL PAGE:
// - Product info (Server - SEO)
// - Image gallery (Client - interactive)
// - Add to Cart button (Client)
// - Reviews section (Server fetch + Client form)
//
// Tích hợp với project E-commerce từ session trước
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

#### Bài tập:

**🔹 Micro 1: Fetch với Cache (5 phút)**
```typescript
// Fetch với force-cache (default)
// Fetch với no-store (dynamic)
```

**🔹 Micro 2: Revalidate (5 phút)**
```typescript
// Thêm revalidate: 60 vào fetch
// Hiểu ISR hoạt động như thế nào
```

**🔸 Mini: Static vs Dynamic (15 phút)**
```typescript
// Tạo 2 pages:
// - /products: Static (build time)
// - /products/[id]: Dynamic hoặc ISR
// So sánh behavior
```

**🔶 Real: E-commerce Caching Strategy (45 phút)**
```typescript
// Áp dụng caching cho E-commerce:
//
// STATIC (force-cache):
// - Categories list
// - Featured products (revalidate mỗi giờ)
//
// ISR (revalidate):
// - Product detail pages (revalidate 60s)
// - generateStaticParams cho top 20 products
//
// DYNAMIC (no-store):
// - Cart page (user-specific)
// - Checkout
// - User profile
//
// Implement revalidateTag cho product updates
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

#### Bài tập:

**🔹 Micro 1: Basic Server Action (5 phút)**
```typescript
// Tạo Server Action đơn giản
// Log formData trong action
```

**🔹 Micro 2: useFormStatus (5 phút)**
```typescript
// Tạo SubmitButton với useFormStatus
// Disable khi pending
```

**🔸 Mini: Contact Form (20 phút)**
```typescript
// Form với Server Action:
// - Input fields (name, email, message)
// - Validation với Zod
// - useFormStatus cho loading
// - Success/error message
```

**🔶 Real: E-commerce Cart & Checkout (45 phút)**
```typescript
// Xây dựng cart system với Server Actions:
//
// CART ACTIONS:
// - addToCart(productId, quantity)
// - updateQuantity(itemId, quantity)
// - removeFromCart(itemId)
// - revalidatePath sau mỗi action
//
// CHECKOUT FORM:
// - Shipping info form
// - Zod validation
// - useFormState cho errors
// - useOptimistic cho cart updates
// - Redirect sau khi order thành công
//
// Hoàn thiện flow mua hàng
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

#### Bài tập:

**🔹 Micro 1: Static Metadata (5 phút)**
```typescript
// Export metadata object cho page
// Title, description, keywords
```

**🔹 Micro 2: Dynamic Metadata (5 phút)**
```typescript
// generateMetadata function cho [id] page
// Fetch data để tạo title động
```

**🔸 Mini: SEO Setup (15 phút)**
```typescript
// Setup SEO cho products:
// - Static metadata cho /products
// - Dynamic metadata cho /products/[id]
// - Open Graph image
```

**🔶 Real: E-commerce SEO & Deploy (45 phút)**
```typescript
// Hoàn thiện SEO cho E-commerce:
//
// METADATA:
// - Homepage: brand metadata
// - Products: dynamic title, description
// - Product detail: OG image, Twitter card
//
// TECHNICAL SEO:
// - sitemap.ts (all products)
// - robots.ts
// - Canonical URLs
//
// DEPLOYMENT:
// - Push to GitHub
// - Deploy to Vercel
// - Setup environment variables
// - Test production build
//
// Đây là project hoàn chỉnh của Phase 3!
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

## 🎯 MODULE 3.R: Review & Project Completion

> Review + Hoàn thiện E-commerce Next.js

### **Review Challenges (1h)**

**Challenge 1: Routing từ đầu (20 phút)**
```typescript
// Tạo cấu trúc routes mới không xem code cũ:
// - Route groups
// - Dynamic routes
// - Layouts
```

**Challenge 2: Server/Client Mix (20 phút)**
```typescript
// Build component với đúng pattern:
// - Server Component fetch data
// - Client Component cho interactivity
```

**Challenge 3: Server Action (20 phút)**
```typescript
// Tạo form với:
// - Server Action
// - Validation
// - Loading state
// - Error handling
```

---

### **E-commerce Next.js - Final Checklist**

**Pages hoàn thành:**
- [ ] Landing page (marketing)
- [ ] Products listing với filters
- [ ] Product detail với gallery
- [ ] Cart page
- [ ] Checkout flow
- [ ] Order confirmation

**Technical Requirements:**
- [ ] Đúng Server/Client component usage
- [ ] Caching strategy hợp lý
- [ ] Server Actions cho mutations
- [ ] SEO optimized (metadata, sitemap)
- [ ] Loading & error UI
- [ ] Deployed on Vercel

**Pass Criteria:**
- ✅ Full shopping flow hoạt động
- ✅ Score ≥80% Knowledge Checks
- ✅ Live deployment

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
