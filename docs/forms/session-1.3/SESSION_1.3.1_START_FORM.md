# 🚀 SESSION START FORM - Session 1.3.1

---

## 📋 SESSION INFO

**Session ID:** 1.3.1
**Session Title:** useState Advanced
**Module:** 1.3 - Hooks Deep Dive (MODULE MỚI)
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2.1 (36 sessions)

---

## 🎯 SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 1:** React Foundation (Session 8/11)
- **Module 1.3:** Hooks Deep Dive (Session 1/4) - BẮT ĐẦU MODULE MỚI
- **Previous Session:** 1.2.3 - Component Composition ✅ Completed
- **Next Session:** 1.3.2 - useEffect Mastery

**Prerequisites Completed:**
- ✅ Module 1.1: TypeScript cho React (4/4)
- ✅ Module 1.2: React Mental Model (3/3)
- ✅ Hiểu rendering, data flow, composition

**Why This Session Important:**
- Hiểu **lazy initialization** - tối ưu performance
- Master **functional updates** - tránh stale closures
- Học **object state** - immutable updates
- Nền tảng cho các hooks khác

---

## 📚 LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Lazy Initialization:**
   - Khi nào cần dùng
   - Tránh expensive calculations mỗi render
   - Syntax: `useState(() => ...)`

2. **Functional Updates:**
   - Stale closure problem
   - `setState(prev => ...)` pattern
   - Multiple setState calls

3. **Object State Updates:**
   - Immutability requirement
   - Spread operator `{ ...obj }`
   - Nested object updates

4. **Multiple States vs Single Object:**
   - Khi nào tách riêng
   - Khi nào gộp chung

---

## 🏗️ PROJECT SETUP REQUEST

**⚠️ MODULE MỚI - TẠO SHARED-PROJECT MỚI:**

```
phase1/module1.3/                        ← TẠO MỚI
├── session-1.3.1-usestate-advanced/     ← TẠO MỚI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/                      ← TẠO MỚI (Vite + React + TS)
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── App.tsx
        └── session-1.3.1/               ← TẠO MỚI (exercises)
            ├── 01-LazyInit.tsx
            ├── 01-LazyInit-Solution.tsx
            ├── 02-FunctionalUpdate.tsx
            └── 02-FunctionalUpdate-Solution.tsx
```

**Setup shared-project:**
```bash
cd phase1/module1.3
npm create vite@latest shared-project -- --template react-ts
cd shared-project
npm install
```

---

## 📖 TEACHING STYLE

> Xem: [LEARNING_STYLE.md](../rules/LEARNING_STYLE.md)

### **Learning Flow:**
```
PHASE 1: Đọc lý thuyết (45-60p) → Không code, chỉ đọc hiểu
PHASE 2: Tóm tắt (15p)         → Claude tạo checklist để review
PHASE 3: Làm bài tập (60-90p)  → Code tất cả exercises
PHASE 4: Quiz (15-30p)         → Knowledge Check, pass ≥80%
```

### **Exercise Format: "Focus Block" Style**

```tsx
function MyComponent() {
  // ╔════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE                         ║
  // ║  Mô tả ngắn gọn cần làm gì                 ║
  // ╚════════════════════════════════════════════╝



  return <div>...</div>
}
```

**Nguyên tắc:**
- ✅ Đánh dấu RÕ RÀNG chỗ cần code: `👉 YOUR CODE HERE`
- ✅ Boilerplate có sẵn
- ✅ Solution file hoàn chỉnh để tham khảo
- ❌ KHÔNG có TODO 1, TODO 2, TODO 3... rối mắt
- ❌ KHÔNG quá 2-3 exercises/session

---

## 📝 EXERCISES OVERVIEW

### **Exercise 1: Lazy Initialization (30 phút)** ⭐⭐

**Scenario:**
- So sánh 2 versions: direct init vs lazy init
- Component đọc từ localStorage
- Quan sát console.log behavior

**Concepts:**
- `useState(value)` vs `useState(() => value)`
- Expensive calculations
- Performance impact

**Expected Result:**
- Version A: logs mỗi lần render
- Version B: logs chỉ 1 lần (mount)

---

### **Exercise 2: Functional Updates (30 phút)** ⭐⭐

**Scenario:**
- Counter với button "Increment 3 times"
- 1 click → tăng 3 đơn vị
- So sánh direct update vs functional update

**Concepts:**
- Stale closure problem
- `setState(prev => prev + 1)` pattern
- Batching behavior

**Expected Result:**
- Version A (direct): tăng 1 (sai)
- Version B (functional): tăng 3 (đúng)

---

## 📊 DIFFICULTY & TIME ESTIMATE

**Độ khó:** ⭐⭐ Trung bình (concepts quan trọng)

**Thời gian dự kiến:**
- Setup module mới: 10 phút
- Đọc COMPLETE_THEORY.md: 30 phút
- Claude tóm tắt: 10 phút
- Exercise 1: 30 phút
- Exercise 2: 30 phút
- Quiz: 15 phút

**Total:** ~2 hours

---

## 🎯 SUCCESS CRITERIA

Session hoàn thành khi:

- ✅ Shared-project module 1.3 chạy được
- ✅ 2 exercises done với score ≥ 8/10
- ✅ Hiểu lazy initialization và khi nào dùng
- ✅ Hiểu functional updates và stale closures
- ✅ Quiz score ≥ 8/10 (6/8 câu)

---

## 🚀 READY TO START

**AI, please:**

1. ✅ Tạo folder `phase1/module1.3/`
2. ✅ Setup `shared-project/` (Vite + React + TS)
3. ✅ Tạo folder `session-1.3.1-usestate-advanced/` cho docs
4. ✅ Tạo **COMPLETE_THEORY.md** với concepts
5. ✅ Tạo **2 exercise files** với "Focus Block" format
6. ✅ Tạo **2 solution files** hoàn chỉnh
7. ✅ Update **App.tsx** để render exercises

**Lưu ý:**
- Đây là MODULE MỚI → cần tạo shared-project mới
- Chỉ 2 exercises (chất lượng > số lượng)
- Focus vào concepts, không phức tạp hóa

---

**LET'S START MODULE 1.3! 🚀**

---

**VERSION:** 1.0
**CREATED:** 2025-01-04
**FOR:** Session 1.3.1 - useState Advanced
**MODULE:** 1.3 - Hooks Deep Dive (NEW)
