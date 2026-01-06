# PHASE 4: TESTING & AI INTEGRATION (V2)

> Thời gian: 1.5-2 tuần (với 5h/ngày)
> Mục tiêu: Testing basics + AI Integration
> Sessions: 5 (2-3 bài tập/session, review gộp cuối)
> Capstone: AI-Powered Task Manager

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

## 📅 MODULE 4.1: Testing Basics (2 sessions)

### **Session 4.1.1: Unit Testing với Vitest (2-3h)**

#### Concepts:
- Vitest setup với React
- Testing React components
- Testing hooks
- Mocking modules
- Coverage reports

#### Bài tập (2 bài):

**Exercise 1: Test Components (60 phút)**
```typescript
// YÊU CẦU:
// Test Button component:
// - Renders correctly
// - Handles click events
// - Shows loading state
// - Disabled state

// Test Counter component:
// - Initial value
// - Increment/Decrement
// - Reset functionality
```

**Exercise 2: Test Custom Hooks (45 phút)**
```typescript
// YÊU CẦU:
// Test useCounter hook:
// - Initial value
// - increment, decrement, reset
// - Edge cases

// Test useLocalStorage hook:
// - Get/set values
// - Persist after re-render
```

#### Knowledge Check (8 câu):
1. Vitest vs Jest?
2. @testing-library/react?
3. render() function?
4. screen queries (getBy, queryBy, findBy)?
5. userEvent vs fireEvent?
6. waitFor?
7. Mocking modules?
8. Test coverage?

---

### **Session 4.1.2: Integration Testing (2-3h)**

#### Concepts:
- Testing component interactions
- Testing forms
- Testing API calls (MSW)
- Testing React Query

#### Bài tập (2 bài):

**Exercise 1: Test Login Form (60 phút)**
```typescript
// YÊU CẦU:
// Test LoginForm:
// - Input validation
// - Form submission
// - Success/error states
// - Redirect after login

// Mock API với MSW
```

**Exercise 2: Test Data Fetching (45 phút)**
```typescript
// YÊU CẦU:
// Test UsersList component:
// - Loading state
// - Success với data
// - Error state
// - Empty state

// Test với React Query wrapper
```

#### Knowledge Check (8 câu):
1. Integration test vs Unit test?
2. MSW (Mock Service Worker)?
3. Testing loading states?
4. React Query wrapper cho tests?
5. Async testing?
6. act() warning?
7. Cleanup between tests?
8. Test database/API?

---

## 📅 MODULE 4.2: AI Integration (3 sessions)

### **Session 4.2.1: OpenAI API Basics (2-3h)**

#### Concepts:
- OpenAI API setup
- Chat completions
- System prompts
- Temperature & parameters
- Error handling & rate limits

#### Bài tập (2 bài):

**Exercise 1: Simple Chatbot (60 phút)**
```typescript
// YÊU CẦU:
// 1. Next.js API route cho OpenAI
// 2. Chat interface UI
// 3. Send message → get response
// 4. Loading state
// 5. Error handling
// 6. Environment variables

// API: /api/chat
// POST { message: string }
// Response: { reply: string }
```

**Exercise 2: System Prompts (45 phút)**
```typescript
// YÊU CẦU:
// Chatbot với different personas:
// 1. Helpful assistant
// 2. Code reviewer
// 3. Language tutor

// Switch persona → different system prompt
```

#### Knowledge Check (8 câu):
1. OpenAI API key security?
2. Chat completions vs Completions?
3. System prompt là gì?
4. Temperature parameter?
5. max_tokens?
6. Rate limiting?
7. Streaming responses?
8. Cost estimation?

---

### **Session 4.2.2: Streaming & UI (2-3h)**

#### Concepts:
- Streaming responses
- AI SDK (Vercel)
- Typewriter effect
- Markdown rendering
- Conversation history

#### Bài tập (2 bài):

**Exercise 1: Streaming Chat (60 phút)**
```typescript
// YÊU CẦU:
// 1. Streaming response từ OpenAI
// 2. Typewriter effect khi nhận chunks
// 3. Cancel generation button
// 4. Render markdown trong response

// Dùng Vercel AI SDK
import { useChat } from 'ai/react'
```

**Exercise 2: Conversation Memory (45 phút)**
```typescript
// YÊU CẦU:
// 1. Lưu conversation history
// 2. Send history với mỗi request
// 3. Clear conversation button
// 4. Max context window handling
```

#### Knowledge Check (8 câu):
1. Streaming vs non-streaming?
2. Vercel AI SDK?
3. useChat hook?
4. ReadableStream?
5. Token counting?
6. Context window?
7. Markdown rendering (react-markdown)?
8. Syntax highlighting (code blocks)?

---

### **Session 4.2.3: AI Features in Apps (2-3h)**

#### Concepts:
- Text generation use cases
- Structured output (JSON mode)
- Function calling
- Embeddings basics

#### Bài tập (2 bài):

**Exercise 1: AI Task Generator (60 phút)**
```typescript
// YÊU CẦU:
// Input: Project description
// Output: List of tasks với:
// - title
// - description
// - priority (high/medium/low)
// - estimated time

// Dùng JSON mode cho structured output
```

**Exercise 2: Smart Search (60 phút)**
```typescript
// YÊU CẦU:
// 1. Input: Natural language query
// 2. AI extracts: filters, sort, keywords
// 3. Apply to product search
// 4. Show AI explanation

// Example:
// Input: "Show me cheap laptops under 1000$"
// AI extracts: { category: "laptop", maxPrice: 1000, sort: "price-asc" }
```

#### Knowledge Check (8 câu):
1. JSON mode?
2. Function calling?
3. Structured output benefits?
4. Prompt engineering basics?
5. Error handling for AI?
6. Fallback khi AI fail?
7. AI response validation?
8. User feedback loop?

---

## 🎯 CAPSTONE PROJECT: AI-Powered Task Manager

### **Project Requirements (2-3 tuần)**

Build full-stack Task Manager với AI features:

**Core Features:**
- [ ] Authentication (NextAuth)
- [ ] CRUD tasks (Server Actions)
- [ ] Categories & tags
- [ ] Due dates & priorities
- [ ] Search & filter

**AI Features:**
- [ ] **AI Task Generator:** Describe project → AI generates tasks
- [ ] **Priority Suggester:** AI suggests priority based on description
- [ ] **Daily Summary:** AI summarizes today's tasks
- [ ] **Smart Search:** Natural language search

**Technical Stack:**
- [ ] Next.js 14 App Router
- [ ] TypeScript
- [ ] Tailwind CSS
- [ ] Zustand (client state)
- [ ] React Query (server state)
- [ ] OpenAI API
- [ ] Database (Prisma + PostgreSQL)
- [ ] Deploy to Vercel

**Project Structure:**
```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (app)/
│   ├── dashboard/
│   ├── tasks/
│   │   ├── [id]/
│   │   └── new/
│   └── settings/
├── api/
│   ├── ai/
│   │   ├── generate-tasks/
│   │   ├── suggest-priority/
│   │   └── daily-summary/
│   └── tasks/
```

**Milestones:**
1. Week 1: Core CRUD + Auth
2. Week 2: AI Features
3. Week 3: Polish + Deploy

---

## ✅ PHASE 4 COMPLETION CHECKLIST

Hoàn thành Phase 4 khi:
- [ ] Biết testing basics với Vitest
- [ ] Integration testing với MSW
- [ ] OpenAI API integration
- [ ] Streaming responses
- [ ] Structured AI output
- [ ] Làm xong Capstone Project
- [ ] Score ≥80% tất cả Knowledge Checks
- [ ] Deployed production app

---

## 🎉 COURSE COMPLETION

Hoàn thành khóa học khi:
- [ ] ✅ Phase 1: React Foundation
- [ ] ✅ Phase 1.5: Tailwind CSS
- [ ] ✅ Phase 2: State Management
- [ ] ✅ Phase 3: Next.js
- [ ] ✅ Phase 4: Testing & AI
- [ ] ✅ Capstone Project deployed

**You are now a Fresher/Junior React Developer!**

**Next Steps:**
- Apply for jobs
- Build more projects
- Learn advanced patterns
- Contribute to open source

---

## 📚 RESOURCES

**Testing:**
- https://vitest.dev/
- https://testing-library.com/docs/react-testing-library/intro/
- https://mswjs.io/

**AI:**
- https://platform.openai.com/docs
- https://sdk.vercel.ai/docs
- Prompt Engineering Guide

---

**VERSION:** 2.0 (V2 - Fresher Optimized)
**DATE:** 2025-01-04
**CHANGES:**
- Bỏ Backend module (chuyển ra khỏi scope)
- Giữ AI Integration
- Testing basics only (không advanced)
- 2-3 exercises/session
- Capstone project cuối cùng
