# 🚀 SESSION START FORM - Session 1.2.2

---

## 📋 SESSION INFO

**Session ID:** 1.2.2
**Session Title:** One-way Data Flow
**Module:** 1.2 - React Mental Model
**Phase:** Phase 1 - React Foundation
**Roadmap Version:** V2 (38 sessions)

---

## 🎯 SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 1:** React Foundation (Session 6/13)
- **Module 1.2:** React Mental Model (Session 2/3)
- **Previous Session:** 1.2.1 - Rendering & Re-rendering ✅ Completed (8.6/10)
- **Next Session:** 1.2.3 - Component Lifecycle

**Prerequisites Completed:**
- ✅ Session 1.2.1: Rendering & Re-rendering (8.6/10)
- ✅ Hiểu render triggers, React.memo, useCallback

**Why This Session Important:**
- Hiểu **data flow một chiều** - core concept của React
- Học **props drilling** và nhận ra vấn đề của nó
- Master **lifting state up** - pattern quan trọng nhất
- Hiểu **component composition** - tránh props drilling

---

## 📚 LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Hiểu One-way Data Flow:**
   - Data chảy từ parent → children (top-down)
   - Events bubble từ children → parent (bottom-up)
   - Tại sao React chọn one-way thay vì two-way binding

2. **Nhận biết Props Drilling:**
   - Props phải pass qua nhiều levels
   - Vấn đề: code khó maintain, components bị coupled
   - Khi nào props drilling OK vs không OK

3. **Master Lifting State Up:**
   - Di chuyển state lên ancestor chung
   - Share state giữa siblings
   - Single source of truth

4. **Áp dụng Component Composition:**
   - Dùng children prop
   - Render props pattern (basic)
   - Tránh props drilling bằng composition

---

## 🏗️ PROJECT SETUP REQUEST

**Sử dụng shared-project đã có từ 1.2.1:**

```
phase1/module1.2/
├── session-1.2.2-data-flow/     ← TẠO MỚI (docs)
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md
│
└── shared-project/              ← ĐÃ CÓ
    └── src/
        ├── session-1.2.1/       ← Đã hoàn thành
        └── session-1.2.2/       ← TẠO MỚI (exercises)
            ├── 01-LiftingState.tsx
            ├── 01-LiftingState-Solution.tsx
            ├── 02-Composition.tsx
            └── 02-Composition-Solution.tsx
```

---

## 📖 TEACHING STYLE - CẢI TIẾN TỪ 1.2.1

### **1. Exercise Format: "Focus Block" Style**

```tsx
function Parent() {
  // ╔════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE                         ║
  // ║  Mô tả ngắn gọn cần làm gì                 ║
  // ╚════════════════════════════════════════════╝



  return (
    <div>
      <ChildA /* props */ />
      <ChildB /* props */ />
    </div>
  )
}

// Components đã có sẵn - không cần sửa
function ChildA({ value, onChange }) {
  return <input value={value} onChange={onChange} />
}
```

**Nguyên tắc:**
- ✅ Đánh dấu RÕ RÀNG chỗ cần code: `👉 YOUR CODE HERE`
- ✅ Boilerplate có sẵn (components con, layout)
- ✅ Không CSS phức tạp - chỉ inline style cơ bản
- ✅ Solution file hoàn chỉnh để tham khảo
- ❌ KHÔNG có TODO 1, TODO 2, TODO 3... rối mắt
- ❌ KHÔNG code những phần lặp lại vô nghĩa

### **2. COMPLETE_THEORY.md:**

Giữ nguyên format 1.2.1:
- PART 1: Concepts cho Exercise 1
- PART 2: Concepts cho Exercise 2
- Mỗi part có: Vấn đề → Giải pháp → Code example → Tips

### **3. Review Style:**

Giữ nguyên:
- Score + điểm tốt + issues cần fix
- Giải thích như senior chỉ intern
- Code examples cụ thể

---

## 📝 EXERCISES OVERVIEW

### **Exercise 1: Lifting State Up (30 phút)** ⭐⭐

**Scenario:**
- 2 input fields (Celsius và Fahrenheit)
- Nhập 1 bên → bên kia tự động convert
- Cả 2 phải sync với nhau

**Concepts:**
- State phải ở đâu? → Parent (shared ancestor)
- Lifting state up pattern
- Single source of truth

**Structure:**
```
TemperatureConverter (Parent - state ở đây)
├── TemperatureInput (Celsius)
└── TemperatureInput (Fahrenheit)
```

---

### **Exercise 2: Component Composition (30 phút)** ⭐⭐

**Scenario:**
- Card component có header, body, footer
- Thay vì pass content qua props → dùng children/composition

**Concepts:**
- children prop
- Compound components pattern (đơn giản)
- Tránh props drilling

**So sánh:**
```tsx
// ❌ Props drilling
<Card title="Hello" body="World" footer="..." />

// ✅ Composition
<Card>
  <Card.Header>Hello</Card.Header>
  <Card.Body>World</Card.Body>
</Card>
```

---

## 📊 DIFFICULTY & TIME ESTIMATE

**Độ khó:** ⭐⭐ Trung bình (concepts quan trọng nhưng không phức tạp)

**Thời gian dự kiến:**
- Setup: 5 phút (AI tạo files mới trong shared-project)
- Đọc COMPLETE_THEORY.md: 20 phút
- Exercise 1: 30 phút
- Exercise 2: 30 phút
- Quiz: 15 phút
- Summary: 5 phút

**Total:** ~2 hours

---

## 🎯 SUCCESS CRITERIA

Session hoàn thành khi:

- ✅ 2 exercises done với score ≥ 8/10
- ✅ Hiểu one-way data flow
- ✅ Biết khi nào cần lifting state up
- ✅ Hiểu children prop và composition
- ✅ Quiz score ≥ 8/10

---

## 🚀 READY TO START

**AI, please:**

1. ✅ Tạo folder `session-1.2.2-data-flow/` cho docs
2. ✅ Tạo folder `src/session-1.2.2/` cho exercises
3. ✅ Tạo **COMPLETE_THEORY.md** với 2 PARTs
4. ✅ Tạo **2 exercise files** với "Focus Block" format
5. ✅ Tạo **2 solution files** hoàn chỉnh
6. ✅ Update **App.tsx** để import session 1.2.2

**Format exercise nhắc lại:**
- Đánh dấu `👉 YOUR CODE HERE` rõ ràng
- Boilerplate có sẵn
- Ít comments, không rối mắt
- Solution file để tham khảo
- Code đơn giản, focus vào concepts

---

**LET'S START SESSION 1.2.2! 🚀**

---

**VERSION:** 1.0
**CREATED:** 2025-12-29
**FOR:** Session 1.2.2 - One-way Data Flow
