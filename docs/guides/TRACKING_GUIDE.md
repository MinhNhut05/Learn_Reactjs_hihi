# TRACKING SYSTEM - Hướng dẫn sử dụng

> Giải thích chi tiết 2 files tracking và cách dùng

---

## 🎯 2 FILES TRACKING VÀ VAI TRÒ

### **1. PROGRESS_TRACKER.md** - Master Progress File
**Mục đích:** Track TOÀN BỘ learning journey (tất cả phases)

**Ai update:** AI tự động update SAU MỖI SESSION

**Nội dung:**
- ✅ Checklist tất cả sessions (Phase 1-6)
- 📊 Overall stats (sessions completed, quiz scores)
- 📝 Session log ngắn gọn
- 💡 AHA moments
- 🐛 Common mistakes
- 🔄 Review schedule

**Khi nào xem:**
- Đầu tuần: Check progress
- Khi muốn review: Xem sessions đã học
- Khi muốn track stats

---

### **2. SESSION_TEMPLATE.md** - Personal Notes Template
**Mục đích:** Template GHI CHÚ CHI TIẾT cho từng session (OPTIONAL)

**Ai update:** BẠN tự fill in (nếu muốn note chi tiết hơn AI)

**Nội dung:**
- Session info chi tiết
- Concepts với notes riêng
- Exercises với solution của bạn
- AI feedback
- Personal reflections

**Khi nào dùng:**
- Nếu bạn muốn personal notes CHI TIẾT hơn
- Nếu bạn thích viết reflection
- Nếu muốn customize tracking

**Lưu ý:** File này là OPTIONAL vì AI đã tạo đầy đủ files (concepts.md, summary.md, etc.)

---

## 🔄 WORKFLOW VỚI TRACKING FILES

### **Trước Session:**

1. Mở `PROGRESS_TRACKER.md`
2. Xem session tiếp theo cần học
3. Check prerequisites

---

### **Trong Session:**

**AI tự động làm:**
- Tạo `moduleX.X/session-X.X.X-topic/` với đầy đủ files
- Tạo `00-session-info.md`
- Tạo `01-concepts.md`
- Tạo `summary.md` cuối session

**Bạn (OPTIONAL):**
- Copy `SESSION_TEMPLATE.md` nếu muốn personal notes
- Fill in trong khi học

---

### **Sau Session:**

**AI tự động update `PROGRESS_TRACKER.md`:**

```markdown
## 📝 Session Log

### 2025-12-25 - Session 1.1.1: Props & State Typing
**Status:** ✅ Completed

**Concepts Learned:**
- Type vs Interface for Props
- Optional props & defaults
- Children typing
- Generic props

**Exercises Completed:**
- ✅ Exercise 1: Button Component
- ✅ Exercise 2: Card Component
- ✅ Exercise 3: Generic List

**Quiz Score:** 5/5 (100%)

**Time Spent:** 2.5 hours

**Key Insight:** Interface có thể extend, Type dùng cho unions/intersections
```

**AI cũng update checklist:**
```markdown
### Module 1.1: TypeScript cho React
- [✅] Session 1.1.1: Props & State Typing
- [ ] Session 1.1.2: Event Handlers Typing
- [ ] Session 1.1.3: Hooks với TypeScript
- [ ] Session 1.1.4: Utility Types
```

**AI cũng update stats:**
```markdown
**Total Sessions Completed:** 1 / 45
**Total Exercises Completed:** 3
**Average Quiz Score:** 100%
```

---

## 📊 SO SÁNH 2 APPROACHES

### **Approach A: Chỉ dùng AI-generated files** (Recommended)
**Files AI tạo mỗi session:**
```
moduleX.X/session-X.X.X-topic/
├── 00-session-info.md      # Session metadata
├── 01-concepts.md          # Concepts
├── 02-deep-dive.md         # Deep explanations
├── quiz.md                 # Knowledge check
└── summary.md              # Summary
```

**Pros:**
- ✅ Tự động, không tốn thời gian
- ✅ Consistent format
- ✅ AI update PROGRESS_TRACKER

**Cons:**
- ❌ Ít personal reflection

---

### **Approach B: AI files + Personal notes**
**Thêm vào:**
```
progress/
└── my-notes/
    └── session-1.1.1-my-notes.md   # Copy từ SESSION_TEMPLATE
```

**Pros:**
- ✅ Personal reflections
- ✅ Custom organization
- ✅ Deeper processing

**Cons:**
- ❌ Tốn thời gian fill in
- ❌ Cần discipline

---

## ✅ RECOMMENDED WORKFLOW

### **DÙNG CẢ 2 NHƯNG FOCUS VÀO AI FILES:**

**AI làm (tự động):**
1. Tạo session files đầy đủ
2. Update PROGRESS_TRACKER.md

**Bạn làm (quick):**
1. Review AI summary sau session (5 phút)
2. Note "AHA Moments" vào PROGRESS_TRACKER (2 phút)
3. Note "Common Mistakes" nếu có (2 phút)

**Optional:**
- Copy SESSION_TEMPLATE nếu muốn reflect sâu hơn

---

## 📋 AI UPDATE PROGRESS_TRACKER - MẪU

Cuối mỗi session, AI sẽ append vào PROGRESS_TRACKER:

```markdown
---

### 2025-12-26 - Session 1.1.2: Event Handlers Typing
**Status:** ✅ Completed

**Concepts Learned:**
- React.ChangeEvent<HTMLInputElement>
- React.FormEvent handling
- Custom event handler typing
- preventDefault with types

**Exercises Completed:**
- ✅ Exercise 1: Login Form
- ✅ Exercise 2: Search Component

**Quiz Score:** 4/5 (80%)

**Time Spent:** 2 hours

**Key Insight:** Generic event types prevent runtime errors

**Mistake Made:** Forgot to type event parameter → added to Common Mistakes log

---
```

Và update checklist:
```markdown
### Module 1.1: TypeScript cho React
- [✅] Session 1.1.1: Props & State Typing
- [✅] Session 1.1.2: Event Handlers Typing  ← NEW
- [ ] Session 1.1.3: Hooks với TypeScript
- [ ] Session 1.1.4: Utility Types
```

Và update stats:
```markdown
**Total Sessions Completed:** 2 / 45
**Total Exercises Completed:** 5
**Average Quiz Score:** 90%
```

---

## 💡 QUICK TIPS

### **Để track hiệu quả:**

1. **Mở PROGRESS_TRACKER đầu tuần**
   - Xem đã học được bao nhiêu
   - Plan sessions tuần này

2. **Check Review Schedule**
   - Daily/Weekly/Bi-weekly tasks
   - Đảm bảo không skip reviews

3. **Log AHA Moments ngay**
   - Khi có insight → ghi vào PROGRESS_TRACKER
   - Giúp nhớ lâu hơn

4. **Track Mistakes**
   - Mỗi lần sai → log vào Common Mistakes
   - Review trước mỗi session mới

---

## 🎯 TÓM TẮT

| File | Ai làm | Khi nào | Bắt buộc? |
|------|--------|---------|-----------|
| PROGRESS_TRACKER.md | AI auto-update | Sau mỗi session | ✅ YES |
| SESSION_TEMPLATE.md | Bạn fill in | Trong session | ❌ Optional |
| AI session files | AI tạo | Trong session | ✅ YES |

**Recommended:**
- Dùng AI auto-tracking (PROGRESS_TRACKER)
- Xem AI-generated session files
- Quick personal notes vào PROGRESS_TRACKER (AHA moments, mistakes)
- SESSION_TEMPLATE chỉ dùng nếu muốn deep reflection

---

**VERSION:** 1.0
**Updated:** 2025-12-25
