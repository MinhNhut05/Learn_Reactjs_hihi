# 🚀 SESSION START FORM - Session 1.2.3

---

## 📋 SESSION INFO

**Session ID:** 1.2.3
**Session Title:** Component Lifecycle
**Module:** 1.2 - React Mental Model
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2 (38 sessions)

---

## 🎯 SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 1:** React Foundation (Session 7/13)
- **Module 1.2:** React Mental Model (Session 3/3) - FINAL
- **Previous Session:** 1.2.2 - One-way Data Flow ✅ Completed (10/10)
- **Next Session:** 1.3.1 - useEffect Deep Dive (Module mới)

**Prerequisites Completed:**
- ✅ Session 1.2.1: Rendering & Re-rendering (8.6/10)
- ✅ Session 1.2.2: One-way Data Flow (10/10)
- ✅ Hiểu render triggers, lifting state up, composition

**Why This Session Important:**
- Hiểu **component lifecycle** - mount, update, unmount
- Master **useEffect** - side effects trong React
- Học **cleanup functions** - tránh memory leaks
- Hiểu **dependencies array** - control khi nào effect chạy

---

## 📚 LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Hiểu Component Lifecycle:**
   - Mount: component xuất hiện trên DOM
   - Update: component re-render
   - Unmount: component bị remove khỏi DOM

2. **Master useEffect:**
   - Syntax và cách hoạt động
   - Dependencies array: [], [deps], không có
   - Khi nào effect chạy

3. **Cleanup Functions:**
   - Tại sao cần cleanup
   - Return function trong useEffect
   - Tránh memory leaks

4. **Common Use Cases:**
   - Fetch data
   - Event listeners
   - Timers (setTimeout, setInterval)
   - Subscriptions

---

## 🏗️ PROJECT SETUP REQUEST

**Sử dụng shared-project đã có từ Module 1.2:**

```
phase1/module1.2/
├── session-1.2.3-lifecycle/         ← TẠO MỚI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/                  ← ĐÃ CÓ
    └── src/
        ├── session-1.2.1/           ← Đã hoàn thành
        ├── session-1.2.2/           ← Đã hoàn thành
        └── session-1.2.3/           ← TẠO MỚI (exercises)
            ├── 01-LifecycleLogger.tsx
            ├── 01-LifecycleLogger-Solution.tsx
            ├── 02-Timer.tsx
            └── 02-Timer-Solution.tsx
```

---

## 📖 TEACHING STYLE - GIỐNG 1.2.2

### **1. Exercise Format: "Focus Block" Style**

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

### **2. COMPLETE_THEORY.md:**

- PART 1: Lifecycle + useEffect basics (cho Exercise 1)
- PART 2: Cleanup functions + practical patterns (cho Exercise 2)

### **3. Review Style:**

- Score + điểm tốt + issues cần fix
- Giải thích như senior chỉ intern
- Code examples cụ thể

---

## 📝 EXERCISES OVERVIEW

### **Exercise 1: Lifecycle Logger (25 phút)** ⭐⭐

**Scenario:**
- Component log ra console khi mount/update/unmount
- Toggle visibility để thấy mount/unmount
- Counter để trigger updates

**Concepts:**
- useEffect với [] - chỉ mount
- useEffect với [deps] - mount + update khi deps thay đổi
- Cleanup function - unmount

**Structure:**
```tsx
function LifecycleLogger({ name }) {
  useEffect(() => {
    console.log(`${name} mounted`)
    return () => console.log(`${name} unmounted`)
  }, [])

  useEffect(() => {
    console.log(`${name} updated`)
  })
}
```

---

### **Exercise 2: Timer with Cleanup (30 phút)** ⭐⭐⭐

**Scenario:**
- Countdown timer từ 10 → 0
- Start/Stop/Reset buttons
- Auto cleanup khi unmount

**Concepts:**
- setInterval trong useEffect
- Cleanup để clear interval
- Tránh memory leaks

**Focus:**
```tsx
useEffect(() => {
  const intervalId = setInterval(() => {
    // update logic
  }, 1000)

  return () => clearInterval(intervalId)  // cleanup!
}, [dependencies])
```

---

## 📊 DIFFICULTY & TIME ESTIMATE

**Độ khó:** ⭐⭐ đến ⭐⭐⭐ (useEffect cần hiểu kỹ)

**Thời gian dự kiến:**
- Setup: 5 phút
- Đọc COMPLETE_THEORY.md: 25 phút
- Exercise 1: 25 phút
- Exercise 2: 30 phút
- Quiz: 15 phút
- Summary: 5 phút

**Total:** ~2 hours

---

## 🎯 SUCCESS CRITERIA

Session hoàn thành khi:

- ✅ 2 exercises done với score ≥ 8/10
- ✅ Hiểu mount/update/unmount lifecycle
- ✅ Biết cách dùng useEffect với dependencies
- ✅ Hiểu cleanup functions và khi nào cần
- ✅ Quiz score ≥ 8/10

---

## 🚀 READY TO START

**AI, please:**

1. ✅ Tạo folder `session-1.2.3-lifecycle/` cho docs
2. ✅ Tạo folder `src/session-1.2.3/` cho exercises
3. ✅ Tạo **COMPLETE_THEORY.md** với 2 PARTs
4. ✅ Tạo **2 exercise files** với "Focus Block" format
5. ✅ Tạo **2 solution files** hoàn chỉnh
6. ✅ Update **App.tsx** để import session 1.2.3

**Format exercise nhắc lại:**
- Đánh dấu `👉 YOUR CODE HERE` rõ ràng
- Boilerplate có sẵn
- Ít comments, không rối mắt
- Solution file để tham khảo
- Code đơn giản, focus vào concepts

---

**LET'S START SESSION 1.2.3! 🚀**

---

**VERSION:** 1.0
**CREATED:** 2025-01-04
**FOR:** Session 1.2.3 - Component Lifecycle
**PREVIOUS:** Session 1.2.2 (10/10) ✅
