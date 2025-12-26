# PHASE 6: CAPSTONE PROJECTS (Chi Tiết)

> Thời gian: 3-4 tuần
> Mục tiêu: Build 3 production-ready projects cho portfolio

---

## 🎯 OVERVIEW

**Mục đích Phase 6:**
- Áp dụng TẤT CẢ kiến thức từ Phase 1-5
- Build real-world projects
- Portfolio pieces cho job applications
- Practice deployment
- Code review process

**Success Criteria:**
- [ ] 3 projects completed & deployed
- [ ] Clean, professional code
- [ ] Good UX/UI
- [ ] Responsive design
- [ ] Proper error handling
- [ ] Documentation (README)
- [ ] Live demo

---

## 📅 PROJECT 1: E-commerce Storefront (Week 1-2)

### **Overview**
Build modern e-commerce website với Next.js

### **Tech Stack**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Zustand (cart state)
- React Query (data fetching)
- Stripe (test mode - optional)

### **Features Required**

**Core Features:**
- [ ] Product listing với grid layout
- [ ] Product detail page
- [ ] Search functionality
- [ ] Filters (category, price range, rating)
- [ ] Shopping cart (add/remove/update quantity)
- [ ] Cart persistence (localStorage)
- [ ] Checkout flow (multi-step form)
- [ ] Order confirmation page

**Advanced Features (Pick 2-3):**
- [ ] Product reviews & ratings
- [ ] Wishlist
- [ ] Product recommendations
- [ ] Image zoom on product page
- [ ] Quick view modal
- [ ] Compare products
- [ ] Stripe payment integration (test mode)

**UI/UX:**
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Skeleton loaders
- [ ] Smooth animations

### **Pages Structure**
```
/                       # Home - featured products
/products               # All products với filters
/products/[id]          # Product detail
/cart                   # Shopping cart
/checkout               # Checkout flow
/checkout/success       # Order confirmation
/search?q=...          # Search results
```

### **Data**
- Use fake API (https://fakestoreapi.com) or
- Create mock data trong JSON files

### **Deliverables**
- [ ] GitHub repository
- [ ] Deployed to Vercel
- [ ] README với screenshots
- [ ] Demo video (optional)

---

## 📅 PROJECT 2: Dashboard Application (Week 3)

### **Overview**
Admin dashboard với authentication, CRUD operations, charts

### **Tech Stack**
- Next.js 14+ (App Router)
- TypeScript
- NextAuth.js (authentication)
- React Query
- Zustand
- Shadcn/ui or Material-UI
- Recharts (charts)
- Vitest + Testing Library

### **Features Required**

**Authentication:**
- [ ] Sign in với Google/GitHub
- [ ] Protected routes (middleware)
- [ ] Session management
- [ ] Sign out

**Dashboard:**
- [ ] Overview page với stats cards
- [ ] Charts (line, bar, pie)
- [ ] Recent activity
- [ ] Quick actions

**CRUD Features (Pick 1 resource type):**
**Option A: Users Management**
- [ ] Users table (sortable, filterable, paginated)
- [ ] Create user (modal form)
- [ ] Edit user
- [ ] Delete user (với confirmation)
- [ ] User details page

**Option B: Products Management**
- [ ] Products table
- [ ] Add product (with image upload)
- [ ] Edit product
- [ ] Delete product
- [ ] Bulk actions

**Option C: Tasks/Projects Management**
- [ ] Kanban board
- [ ] Create task
- [ ] Drag & drop
- [ ] Task details
- [ ] Status tracking

**UI Features:**
- [ ] Dark/Light theme toggle
- [ ] Responsive sidebar
- [ ] Breadcrumbs
- [ ] Search functionality
- [ ] Notifications (optional)

**Testing:**
- [ ] Unit tests cho components
- [ ] Integration tests
- [ ] Test coverage ≥70%

### **Pages Structure**
```
/                       # Public landing
/login                  # Sign in page
/dashboard              # Overview với charts
/dashboard/users        # Users management (or products/tasks)
/dashboard/users/[id]   # User detail
/dashboard/settings     # User settings
/dashboard/profile      # User profile
```

### **Deliverables**
- [ ] GitHub repository
- [ ] Deployed to Vercel
- [ ] README với setup instructions
- [ ] Test coverage report
- [ ] Demo credentials documented

---

## 📅 PROJECT 3: Your Choice - Advanced Project (Week 4)

### **Choose 1 Option:**

---

### **OPTION A: Social Media Clone**

**Inspiration:** Twitter/Instagram lite

**Core Features:**
- [ ] User authentication
- [ ] User profiles (avatar, bio, followers count)
- [ ] Create post (text + images)
- [ ] Posts feed với infinite scroll
- [ ] Like post
- [ ] Comment on post
- [ ] Follow/unfollow users
- [ ] User search
- [ ] Notifications (optional)

**Tech Stack:**
- Next.js 14+
- NextAuth
- Database (Firebase/Supabase/Prisma+PostgreSQL)
- Image upload (Cloudinary/Uploadcare)
- React Query
- Tailwind CSS

**Bonus Features:**
- [ ] Real-time updates (Socket.io)
- [ ] Hashtags
- [ ] Mentions (@username)
- [ ] Direct messages
- [ ] Stories (optional)

---

### **OPTION B: Notion-like Note Taking App**

**Core Features:**
- [ ] Rich text editor (Tiptap/Slate)
- [ ] Block-based editor (headings, paragraphs, lists, code)
- [ ] Drag & drop blocks
- [ ] Nested pages/folders
- [ ] Search functionality
- [ ] Real-time saving
- [ ] Markdown support
- [ ] Share pages (public/private)

**Tech Stack:**
- Next.js 14+
- Tiptap or Slate.js (editor)
- Database
- React DnD (drag & drop)

**Bonus Features:**
- [ ] Collaboration (real-time editing)
- [ ] Templates
- [ ] Export to PDF/Markdown
- [ ] Image uploads
- [ ] Code syntax highlighting

---

### **OPTION C: Trello-like Kanban Board**

**Core Features:**
- [ ] Boards, Lists, Cards
- [ ] Drag & drop (react-beautiful-dnd)
- [ ] Create/edit/delete boards
- [ ] Create/edit/delete cards
- [ ] Card details modal
- [ ] Assign cards to users
- [ ] Due dates
- [ ] Labels/tags
- [ ] Checklists within cards

**Tech Stack:**
- Next.js 14+
- react-beautiful-dnd
- Database
- NextAuth

**Bonus Features:**
- [ ] Activity log
- [ ] Attachments
- [ ] Comments on cards
- [ ] Real-time collaboration
- [ ] Calendar view

---

### **OPTION D: Real-time Chat Application**

**Core Features:**
- [ ] User authentication
- [ ] 1-on-1 chat rooms
- [ ] Group chat rooms
- [ ] Send messages (real-time)
- [ ] Message history
- [ ] Online/offline status
- [ ] Typing indicators
- [ ] Emoji support

**Tech Stack:**
- Next.js 14+
- Socket.io or Pusher
- Database
- NextAuth

**Bonus Features:**
- [ ] File sharing
- [ ] Voice messages
- [ ] Read receipts
- [ ] Message reactions
- [ ] Search messages

---

## 📊 UNIVERSAL REQUIREMENTS (Tất cả projects)

### **Code Quality:**
- [ ] TypeScript strict mode
- [ ] ESLint + Prettier
- [ ] No console.logs in production
- [ ] Proper error handling
- [ ] Loading states everywhere
- [ ] Empty states
- [ ] Error boundaries

### **UX/UI:**
- [ ] Responsive design (mobile-first)
- [ ] Smooth animations
- [ ] Good color scheme
- [ ] Consistent spacing
- [ ] Accessible (keyboard navigation)
- [ ] Loading skeletons

### **Performance:**
- [ ] Lighthouse score ≥85
- [ ] Image optimization
- [ ] Code splitting
- [ ] Fast page loads

### **Documentation:**
- [ ] README với:
  - Project description
  - Screenshots/GIF
  - Tech stack
  - Features list
  - Setup instructions
  - Demo link
  - Environment variables needed

### **Deployment:**
- [ ] Deploy to Vercel/Netlify
- [ ] Environment variables configured
- [ ] Custom domain (optional)
- [ ] HTTPS enabled

---

## 🎓 LEARNING OBJECTIVES

### **Technical Skills:**
- Full-stack development với Next.js
- Database integration
- Real-time features (optional)
- File uploads
- Authentication & authorization
- State management at scale
- Testing production apps

### **Professional Skills:**
- Project planning
- Feature prioritization
- Time management
- Git workflow (feature branches, PRs)
- Documentation writing
- Deployment process

---

## 📝 PROGRESS TRACKING

### **Week 1-2: Project 1**
- [ ] Day 1-2: Setup, design, data modeling
- [ ] Day 3-5: Core features implementation
- [ ] Day 6-7: Polish, testing, deployment

### **Week 3: Project 2**
- [ ] Day 1-2: Setup, authentication
- [ ] Day 3-4: Dashboard, CRUD features
- [ ] Day 5-6: Testing, refinement
- [ ] Day 7: Deployment, documentation

### **Week 4: Project 3**
- [ ] Day 1-2: Planning, setup
- [ ] Day 3-5: Main features
- [ ] Day 6: Polish, testing
- [ ] Day 7: Deploy, portfolio update

---

## 🎯 COMPLETION CRITERIA

**Mỗi project cần:**
- [ ] All core features working
- [ ] Deployed live
- [ ] GitHub repo public
- [ ] README hoàn chỉnh
- [ ] No critical bugs
- [ ] Good UX

**Overall Phase 6 Complete khi:**
- [ ] 3 projects done
- [ ] Portfolio website showcasing projects
- [ ] Resume updated với projects
- [ ] LinkedIn updated
- [ ] Ready cho job applications

---

## 💼 PORTFOLIO PRESENTATION

### **Portfolio Website (Optional but Recommended)**

Create simple portfolio site with:
- [ ] About me section
- [ ] Skills list
- [ ] 3 projects showcase với:
  - Screenshots
  - Description
  - Tech stack
  - Live demo link
  - GitHub link
- [ ] Contact form
- [ ] Resume download

---

## 🎊 CONGRATULATIONS!

Sau khi hoàn thành Phase 6, bạn đã:
- ✅ Học 45+ sessions React
- ✅ Build 6+ projects (phase finals + capstone)
- ✅ Master React ecosystem
- ✅ Production-ready skills
- ✅ Portfolio để apply jobs

**Next Steps:**
1. Apply for React Developer positions
2. Contribute to open source
3. Build more projects
4. Share knowledge (blog, YouTube)
5. Keep learning (stay updated)

**You're now a React Developer! 🚀**

---

**VERSION:** 1.0
**LAST UPDATED:** 2025-12-25
