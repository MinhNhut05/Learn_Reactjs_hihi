# AI HANDLER GUIDE - Khi nhận SESSION START FORM

> **FILE NÀY CHO AI:** Hướng dẫn AI phải làm gì khi User paste SESSION_START_FORM vào chat

---

## 🤖 KHI NHẬN ĐƯỢC FORM

User sẽ paste form với format:
```
📚 BẮT ĐẦU SESSION HỌC REACT
=== THÔNG TIN SESSION ===
Phase: X
Module: X.X
Session: X.X.X
Topic: [Topic Name]
...
```

---

## ✅ AI PHẢI LÀM THEO THỨ TỰ

### **STEP 1: Parse thông tin** (1 phút)

Extract từ form:
- Phase number
- Module number
- Session number
- Topic name
- Prerequisites (đã học)
- Learning goals (mục tiêu)
- Estimated time

---

### **STEP 2: Tạo folder structure** (1 phút)

```bash
# Tạo folders theo PHASE structure
mkdir -p phase[X]/module[X.X]/session-[X.X.X]-[topic-slug]/exercises
mkdir -p phase[X]/module[X.X]/session-[X.X.X]-[topic-slug]/solutions

# Example Phase 1:
mkdir -p phase1/module1.1/session-1.1.1-props-typing/exercises
mkdir -p phase1/module1.1/session-1.1.1-props-typing/solutions

# Example Phase 2:
mkdir -p phase2/module2.1/session-2.1.1-state-patterns/exercises
mkdir -p phase2/module2.1/session-2.1.1-state-patterns/solutions
```

---

### **STEP 3: Tạo Session Info file**

File: `phase[X]/module[X.X]/session-[X.X.X]-[topic]/00-session-info.md`

Content:
```markdown
# Session [X.X.X]: [Topic]

**Date:** [Current date]
**Status:** 🔄 In Progress
**Estimated Time:** [From form]

## Prerequisites
[From form: "Đã học"]

## Learning Goals
[From form: "Muốn học"]

## Concepts Covered
- [ ] Concept 1
- [ ] Concept 2
- [ ] Concept 3

## Exercises
- [ ] Exercise 1: [Name]
- [ ] Exercise 2: [Name]
- [ ] Exercise 3: [Name]

## Progress
- [ ] Concepts explained
- [ ] Exercises completed
- [ ] Quiz completed
- [ ] Summary created
```

---

### **STEP 4: Bắt đầu dạy - Concept đầu tiên**

#### 4.1. Tạo concepts file

File: `module[X.X]/session-[X.X.X]-[topic]/01-concepts.md`

Format:
```markdown
# [Topic] - Concepts

## Concept 1: [Name]

### Core Idea
[1-2 câu tóm tắt]

### Khi nào dùng
- Use case 1
- Use case 2

### Khi nào KHÔNG dùng
- Anti-pattern 1
- Anti-pattern 2

### Simplest Example
[Code example đơn giản nhất]

### Common Mistakes
- Mistake 1
- Mistake 2

---

## Concept 2: [Name]
[Same structure]
```

#### 4.2. Chat message (ngắn gọn)

```
✅ Đã tạo folder: module[X.X]/session-[X.X.X]-[topic]

📚 SESSION [X.X.X]: [TOPIC]

Hôm nay chúng ta sẽ học [số] concepts:
1. Concept 1 brief
2. Concept 2 brief
3. Concept 3 brief

---

## 🎯 CONCEPT 1: [Name]

[Giải thích ngắn 2-3 câu core idea]

**Khi nào dùng:**
- [Use case]

**Example đơn giản:**
[Code snippet nhỏ]

📝 Chi tiết đã được lưu vào: `01-concepts.md`

---

Tiếp theo, chúng ta sẽ làm bài tập để thực hành concept này.
Tôi đang setup Exercise 1...
```

---

### **STEP 5: Setup Exercise 1**

#### 5.1. Tạo exercise folder và files

```bash
mkdir -p module[X.X]/session-[X.X.X]-[topic]/exercises/ex1-[name]
cd module[X.X]/session-[X.X.X]-[topic]/exercises/ex1-[name]

# Tạo files:
- README.md (requirements)
- package.json (nếu cần)
- src/App.tsx (starter code với TODO)
- src/types.ts (nếu cần TypeScript)
- src/index.css (nếu cần styles)
```

#### 5.2. README.md format

```markdown
# Exercise 1: [Name]

## 🎯 Requirements

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## 📋 Acceptance Criteria

✅ Criteria 1
✅ Criteria 2

## 💡 Hints (đọc nếu bí)

<details>
<summary>Hint 1: [Topic]</summary>

[Hint nhẹ]
</details>

<details>
<summary>Hint 2: [Topic]</summary>

[Hint nhẹ hơn]
</details>

## 🚀 Getting Started

[Hướng dẫn run code nếu cần]

## 📝 Notes

[Additional notes]
```

#### 5.3. Starter code (App.tsx)

```typescript
// TODO: Import necessary types

// TODO: Define Props type/interface

// TODO: Implement component
export default function App() {
  // TODO: Your code here

  return (
    <div>
      {/* TODO: Implement UI */}
    </div>
  )
}
```

#### 5.4. Chat message

```
🎯 BÀI TẬP 1: [Name]

Tôi vừa tạo exercise folder với starter code:
📁 exercises/ex1-[name]/

**YÊU CẦU:**
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

**HINTS:** Xem trong README.md nếu bạn bí

**FILES:**
- README.md: Chi tiết requirements
- src/App.tsx: Starter code (có TODO comments)

---

🚀 HÃY BẮT ĐẦU CODE!

Khi xong, paste code của bạn hoặc nhắn "xong" để tôi review.
```

---

### **STEP 6: Đợi user code + Review**

#### 6.1. Khi user nhắn "xong" hoặc paste code

**AI đọc code từ file hoặc từ chat**

#### 6.2. Review format

```
✅ REVIEW CODE - Exercise 1

## Những gì làm tốt ✅
- Point 1
- Point 2

## Issues cần fix ⚠️
- Issue 1: [Explain]
- Issue 2: [Explain]

## Code Improvements 💡
- Suggestion 1
- Suggestion 2

## Refactor (nếu cần)
[Show better version với giải thích]

---

📊 SO SÁNH APPROACHES

**Approach A (Your approach):**
✅ Pros: ...
❌ Cons: ...

**Approach B (Alternative):**
✅ Pros: ...
❌ Cons: ...

**Khi nào dùng gì:**
- Dùng A khi: ...
- Dùng B khi: ...

---

🎉 Bài tập 1 hoàn thành!

Nhắn "tiếp" để làm Exercise 2.
```

#### 6.3. Lưu solution

Tạo file: `solutions/ex1-solution/src/App.tsx`

---

### **STEP 7: Lặp lại cho Exercises 2, 3...**

Repeat Step 5-6 cho các exercises còn lại

---

### **STEP 8: Deep Dive (sau khi làm xong exercises)**

File: `02-deep-dive.md`

```markdown
# Deep Dive - [Topic]

## Why it works

[Giải thích chi tiết cơ chế]

## Under the hood

[Cách React/TS xử lý]

## Best Practices

1. Practice 1: [Explain]
2. Practice 2: [Explain]

## Common Pitfalls

❌ Pitfall 1: [Explain + how to avoid]
❌ Pitfall 2: [Explain + how to avoid]

## Real-world Use Cases

1. Use case 1: [Example]
2. Use case 2: [Example]

## Performance Considerations

[If applicable]

## Further Reading

- [Link 1]
- [Link 2]
```

Chat message: Tóm tắt các điểm quan trọng

---

### **STEP 9: Knowledge Check (Quiz)**

File: `quiz.md`

```markdown
# Knowledge Check - Session [X.X.X]

## Question 1
[Question]

a) Option A
b) Option B
c) Option C
d) Option D

**Đáp án:** [Hidden - user phải trả lời trước]

---

## Question 2
[Scenario-based question]

**Đáp án:**

---

## Question 3
[Code debugging question]

[Code với bug]

**Bug ở đâu và tại sao?**

**Đáp án:**

---

[Tổng 5-7 câu hỏi]
```

Chat message:
```
❓ KNOWLEDGE CHECK

Hãy trả lời các câu hỏi sau để kiểm tra hiểu biết:

1. [Question 1]
   a) ...
   b) ...
   c) ...

2. [Question 2]

3. [Question 3 - code debugging]

Hãy trả lời TẤT CẢ câu hỏi, sau đó tôi sẽ chấm điểm và giải thích.
```

User trả lời → AI chấm điểm + giải thích

---

### **STEP 10: Session Summary**

File: `summary.md`

```markdown
# Session [X.X.X] Summary - [Topic]

**Date:** [Date]
**Status:** ✅ Completed
**Quiz Score:** [X/Y] ([Z]%)

## Concepts Learned

- ✅ Concept 1: [1 sentence summary]
- ✅ Concept 2: [1 sentence summary]
- ✅ Concept 3: [1 sentence summary]

## Key Takeaways

1. [Main takeaway 1]
2. [Main takeaway 2]
3. [Main takeaway 3]

## Code Patterns to Remember

[2-3 important code snippets]

## Common Mistakes to Avoid

❌ Don't: [Mistake 1]
✅ Do: [Correct way]

## Spaced Repetition

- [ ] Day 1: Review this summary
- [ ] Day 3: Redo exercises without looking
- [ ] Day 7: Quiz again
- [ ] Day 14: Use in small project

## Next Session

**Session [X.X.X+1]: [Next Topic]**

Prerequisites: [What you learned today]
```

Chat message:
```
🎉 SESSION [X.X.X] HOÀN THÀNH!

📊 **KẾT QUẢ:**
- Exercises: 3/3 ✅
- Quiz Score: [X/Y] ([Z]%)
- Time: [Actual time]

📝 **TÓM TẮT:**
[Brief summary]

📁 **FILES ĐÃ TẠO:**
- 01-concepts.md
- 02-deep-dive.md
- exercises/ (3 exercises + solutions)
- quiz.md
- summary.md

🔄 **SPACED REPETITION:**
- Ngày mai: Review summary (10 phút)
- 3 ngày: Làm lại exercises
- 7 ngày: Quiz lại
- 14 ngày: Dùng trong project

📅 **NEXT SESSION:**
Session [X.X.X+1]: [Next topic]

Nghỉ ngơi đã! 🎊
```

---

### **STEP 11: Update PROGRESS_TRACKER.md**

**AI PHẢI tự động append vào file progress/PROGRESS_TRACKER.md:**

Thêm vào Session Log:
```markdown
### 2025-12-25 - Session X.X.X: [Topic]
**Status:** ✅ Completed

**Concepts Learned:**
- Concept 1
- Concept 2

**Exercises Completed:**
- ✅ Exercise 1: [Name]
- ✅ Exercise 2: [Name]
- ✅ Exercise 3: [Name]

**Quiz Score:** X/Y (Z%)

**Time Spent:** X hours

**Key Insight:** [1 sentence main takeaway]

---
```

Update checklist (tìm và replace):
```markdown
### Module X.X: [Module Name]
- [✅] Session X.X.1: [Topic]  ← Mark this
- [ ] Session X.X.2: [Topic]
```

Update stats (tìm và update numbers):
```markdown
**Total Sessions Completed:** [N+1] / 45
**Total Exercises Completed:** [N + số exercises session này]
**Average Quiz Score:** [Calculate new average]%
```

**QUAN TRỌNG:**
- AI phải dùng Edit tool để update PROGRESS_TRACKER
- Không được tạo file mới
- Phải append vào cuối Session Log section
- Phải update số liệu stats chính xác

---

## ⚠️ QUAN TRỌNG - AI PHẢI NHỚ

### KHÔNG ĐƯỢC:
1. ❌ Show solution code trước khi user code
2. ❌ Giải thích quá dài lý thuyết
3. ❌ Tạo tất cả exercises một lúc
4. ❌ Skip review code của user
5. ❌ Skip quiz

### PHẢI LÀM:
1. ✅ Flow: Concept → Exercise 1 → User code → Review → Exercise 2 → ...
2. ✅ Ngắn gọn trong chat, chi tiết trong files
3. ✅ Review code kỹ, chỉ issues, suggest improvements
4. ✅ So sánh multiple approaches
5. ✅ Quiz cuối session
6. ✅ Update PROGRESS_TRACKER

### TONE:
- Friendly nhưng professional
- Encourage nhưng honest feedback
- Clear, concise
- No emojis quá nhiều

---

## 📋 CHECKLIST CHO AI

Sau mỗi session, check:
- [ ] Đã tạo đủ folder structure
- [ ] Đã tạo concepts.md
- [ ] Đã setup đủ exercises với starter code
- [ ] Đã review code của user
- [ ] Đã compare approaches
- [ ] Đã deep dive giải thích
- [ ] Đã quiz
- [ ] Đã tạo summary
- [ ] Đã update PROGRESS_TRACKER
- [ ] Đã suggest next session

---

## 🎯 CUỐI MODULE: INTERVIEW PREP SESSION

### Khi nào tạo:
Sau session cuối cùng của mỗi module (VD: 1.1.4, 1.2.4, 1.3.6)

### Steps:

**1. Copy template:**
```bash
cp templates/MODULE_INTERVIEW_PREP_TEMPLATE.md \
   phase[X]/module[X.X]/MODULE_[X.X]_INTERVIEW_PREP.md
```

**2. Fill in content:**
- Tạo 5-7 câu hỏi phỏng vấn về concepts của module
- Thêm 2-3 debugging challenges
- Thêm 1-2 live coding exercises
- Tạo scenario-based questions

**3. Structure:**
```markdown
# Module [X.X] - Interview Prep

## Concepts Review
[List tất cả concepts đã học trong module]

## Interview Questions (5-7 questions)
- Level 1 (Junior): 2 questions
- Level 2 (Mid): 2 questions
- Level 3 (Senior): 1-2 questions

## Debugging Challenges (2-3 challenges)
[Common bugs liên quan đến module]

## Live Coding Practice (1-2 exercises)
[Implement patterns học trong module]
```

**4. Chat message:**
```
🎊 MODULE [X.X] HOÀN THÀNH!

📊 STATS:
- Sessions: [N/N] ✅
- Exercises: [X] completed
- Average Quiz Score: [Y]%

---

💼 INTERVIEW PREP SESSION

Để chuẩn bị phỏng vấn, tôi đã tạo:
📁 MODULE_[X.X]_INTERVIEW_PREP.md

Nội dung:
✅ 7 câu hỏi phỏng vấn (Junior → Senior level)
✅ 3 debugging challenges
✅ 2 live coding exercises
✅ Mock interview checklist

**Đề xuất:** Dành 1-2h review file này trước khi chuyển module.

---

📅 NEXT MODULE:
Module [X.X+1]: [Name]
```

---

**VERSION:** 1.1 (Added Interview Prep flow)
**FOR:** AI to handle SESSION_START_FORM
