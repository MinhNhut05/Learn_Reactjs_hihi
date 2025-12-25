# 🚀 CÁCH SỬ DỤNG - Đơn Giản Nhất Có Thể

> **TL;DR:** Mỗi session chỉ cần 3 bước: Copy form → Paste vào chat AI → Học

---

## 📁 PHÂN LOẠI FILES - Đọc Gì, Bỏ Qua Gì

### ✅ FILES BẠN CẦN (Chỉ 2 files!)

#### 1. **SESSION_START_FORM.md** ⭐⭐⭐
📍 Đường dẫn: `templates/SESSION_START_FORM.md`

**Tác dụng:** Form để bắt đầu MỖI session học
**Khi nào dùng:** Trước MỖI session
**Cách dùng:** Copy → Điền thông tin → Paste vào chat AI

#### 2. **PROGRESS_TRACKER.md** ⭐⭐
📍 Đường dẫn: `progress/PROGRESS_TRACKER.md`

**Tác dụng:** Check xem session tiếp theo là gì
**Khi nào dùng:** Trước mỗi session để biết học session nào
**AI tự động update:** Sau mỗi session (bạn không cần sửa)
**Chi tiết cách dùng:** Xem file `TRACKING_GUIDE.md`

---

### 📚 FILES REFERENCE (Chỉ đọc khi cần)

#### 3. **PHASE_1_DETAILED.md**
📍 Đường dẫn: `docs/roadmaps/PHASE_1_DETAILED.md`

**Tác dụng:** Xem chi tiết roadmap Phase 1
**Khi nào đọc:** Khi muốn biết session tiếp theo học gì, có bài tập gì

#### 4. **LEARNING_RULES.md**
📍 Đường dẫn: `docs/rules/LEARNING_RULES.md`

**Tác dụng:** Framework AI sẽ dạy theo (70% practice, 30% theory)
**Khi nào đọc:** Lần đầu setup (đã đọc rồi), hoặc khi AI không follow rules

---

### 🗂️ FILES KHÔNG CẦN ĐỌC (AI tự động xử lý)

- `AI_HANDLER_GUIDE.md` → Hướng dẫn cho AI, không phải cho bạn
- `SESSION_0_TS_WARMUP.md` → Đã học xong rồi
- `GET_STARTED_NOW.md` → Đã đọc rồi
- `FINAL_CHECKLIST_BEFORE_START.md` → Đã đọc rồi
- `MODULE_INTERVIEW_PREP_TEMPLATE.md` → AI tự động tạo, bạn chỉ đọc kết quả

---

## 🔄 WORKFLOW THỰC TẾ MỖI SESSION

### **TRƯỚC HỌC (2 phút)**

**Bước 1: Check session tiếp theo**
```bash
# Mở file này
cat progress/PROGRESS_TRACKER.md
```

Tìm dòng có `[ ]` (chưa học), ví dụ:
```
- [ ] Session 1.1.1: Props & State Typing  ← ĐÂY!
```

**Bước 2: Copy form**
```bash
cat templates/SESSION_START_FORM.md
```

Bạn sẽ thấy form như này:
```
📚 BẮT ĐẦU SESSION HỌC REACT

=== THÔNG TIN SESSION ===
Phase: [1/2/3/4/5/6]
Module: [Số module, VD: 1.1, 1.2, 2.1]
Session: [Số session, VD: 1.1.1, 1.1.2]
Topic: [Tên topic, VD: Props & State Typing]
...
```

**Bước 3: Điền thông tin**

Ví dụ cho Session 1.1.1:
```
📚 BẮT ĐẦU SESSION HỌC REACT

=== THÔNG TIN SESSION ===
Phase: 1
Module: 1.1
Session: 1.1.1
Topic: Props & State Typing

=== KIẾN THỨC NỀN ===
Đã học từ sessions trước:
- Session 0: TypeScript Warmup
- Đã biết: JavaScript ES6+, React hooks cơ bản

=== MỤC TIÊU HÔM NAY ===
Muốn học:
- Type vs Interface cho Props
- Optional props & default values
- Children typing
- Generic props

=== THỜI GIAN ===
Dự kiến: 2-3 giờ

=== YÊU CẦU AI ===
☑ Follow LEARNING_RULES.md
☑ Tạo folder: phase1/module1.1/session-1.1.1-props-typing
☑ Tạo file concepts.md + giải thích ngắn trong chat
☑ Setup boilerplate cho exercises
☑ Flow: Concept → Exercise → Review → Next
☑ Cuối session: Quiz + Update PROGRESS_TRACKER.md

=== READY ===
✅ Tôi đã sẵn sàng. Bắt đầu phần đầu tiên!
```

---

### **TRONG SESSION (2-3 giờ)**

**Bước 4: Mở chat MỚI với AI**
- Quan trọng: Chat mới, không dùng chat này
- Paste toàn bộ form đã điền vào chat mới

**Bước 5: AI tự động làm tất cả**
```
AI sẽ:
✅ Tạo folder phase1/module1.1/session-1.1.1-props-typing/
✅ Tạo file concepts.md, exercises/, quiz.md, summary.md
✅ Giải thích concepts
✅ Cho bài tập
✅ Đợi bạn code
```

**Bước 6: Bạn làm bài tập**
```
1. AI cho bài tập 1
2. Bạn code
3. Nhắn "xong"
4. AI review code của bạn
5. AI cho bài tập 2
6. Repeat...
```

**Bước 7: Cuối session**
```
AI sẽ:
✅ Cho quiz (5-7 câu)
✅ Tạo summary.md
✅ Tự động update PROGRESS_TRACKER (tick ✅ session này)
✅ Suggest session tiếp theo
```

---

### **SAU SESSION (10 phút)**

**Bước 8: Review summary**
```bash
# File summary AI vừa tạo
cat phase1/module1.1/session-1.1.1-props-typing/summary.md
```

**Bước 9: Xong!**
- Set reminder review sau 1, 3, 7 ngày
- Nghỉ ngơi
- Session tiếp theo làm lại từ Bước 1

---

## 💡 CÂU HỎI THƯỜNG GẶP

### ❓ "Mỗi session đều dùng form giống nhau à?"

**Trả lời:** ĐÚNG! Mỗi session đều:
1. Copy form từ `templates/SESSION_START_FORM.md`
2. Điền thông tin session (Phase, Module, Session, Topic)
3. Paste vào chat MỚI
4. AI xử lý tất cả

**Form giống nhau, chỉ khác:**
- Số Phase, Module, Session
- Topic name
- "Đã học" section (điền concepts từ sessions trước)

---

### ❓ "Tại sao có nhiều file quá?"

**Trả lời:** Hệ thống có nhiều file nhưng bạn CHỈ CẦN dùng 2 files:

**Files bạn dùng:**
1. `SESSION_START_FORM.md` → Copy mỗi session
2. `PROGRESS_TRACKER.md` → Check session tiếp theo

**Files khác:**
- Reference (đọc khi cần): PHASE_1_DETAILED.md, LEARNING_RULES.md
- AI tự động xử lý: AI_HANDLER_GUIDE.md, templates khác
- Đã đọc rồi: START_HERE.md, GET_STARTED_NOW.md

---

### ❓ "Tác dụng của từng loại file AI tạo?"

Sau mỗi session, AI tạo folder như này:

```
phase1/module1.1/session-1.1.1-props-typing/
├── 00-session-info.md      # Metadata session (không quan trọng)
├── 01-concepts.md           # ⭐ Giải thích concepts
├── 02-deep-dive.md          # ⭐ Deep dive chi tiết
├── exercises/               # ⭐ Bài tập bạn làm
│   ├── ex1-button/
│   ├── ex2-card/
│   └── ex3-list/
├── solutions/               # Solutions AI đưa sau khi review
├── quiz.md                  # ⭐ Quiz cuối session
└── summary.md               # ⭐⭐⭐ TÓM TẮT (QUAN TRỌNG NHẤT)
```

**Files quan trọng cần đọc lại:**
- `summary.md` → Review sau session, review sau 1, 3, 7 ngày
- `quiz.md` → Làm lại để check hiểu
- `01-concepts.md` → Reference khi quên

**Files khác:**
- Đọc 1 lần trong session là đủ

---

## 🎯 VÍ DỤ CỤ THỂ - Session 1.1.1

### Sáng nay bạn muốn học Session 1.1.1

**1. Check PROGRESS_TRACKER**
```bash
cat progress/PROGRESS_TRACKER.md | grep "1.1.1"
```
Thấy: `- [ ] Session 1.1.1: Props & State Typing`

**2. Copy form**
```bash
cat templates/SESSION_START_FORM.md
```

**3. Điền info (copy form, sửa thông tin)**
```
Phase: 1
Module: 1.1
Session: 1.1.1
Topic: Props & State Typing
Đã học: Session 0 TS Warmup
Muốn học: Type vs Interface, Optional props, Children typing, Generic props
```

**4. Mở chat MỚI → Paste form**

**5. AI bắt đầu dạy**
```
AI: ✅ Đã tạo folder phase1/module1.1/session-1.1.1-props-typing

📚 SESSION 1.1.1: Props & State Typing

Hôm nay học 4 concepts:
1. Type vs Interface
2. Optional props
3. Children typing
4. Generic props

---

🎯 CONCEPT 1: Type vs Interface

[AI giải thích ngắn]

Giờ làm bài tập 1...
```

**6. Bạn code, nhắn "xong", AI review**

**7. Repeat cho exercises 2, 3**

**8. Cuối session: Quiz**

**9. AI tạo summary.md và update PROGRESS_TRACKER**
```
- [✅] Session 1.1.1: Props & State Typing  ← AI tự tick
- [ ] Session 1.1.2: Event Handlers Typing  ← Session tiếp theo
```

**10. Bạn review summary, xong!**

---

## 📝 TEMPLATE MẪU CHO SESSION 1.1.1 (Copy Ngay)

Để dễ dàng hơn, đây là form ĐÃ ĐIỀN SẴN cho Session 1.1.1:

```
📚 BẮT ĐẦU SESSION HỌC REACT

=== THÔNG TIN SESSION ===
Phase: 1
Module: 1.1
Session: 1.1.1
Topic: Props & State Typing

=== KIẾN THỨC NỀN ===
Đã học từ sessions trước:
- Session 0: TypeScript Warmup (Generics, Utility Types)
- JavaScript ES6+, React hooks cơ bản

=== MỤC TIÊU HÔM NAY ===
Muốn học:
- Type vs Interface cho Props
- Optional props & default values
- Children typing (ReactNode vs ReactElement)
- Generic props

=== THỜI GIAN ===
Dự kiến: 2-3 giờ

=== YÊU CẦU AI ===
☑ Follow docs/rules/LEARNING_RULES.md
☑ Tạo folder: phase1/module1.1/session-1.1.1-props-typing
☑ Tạo file concepts.md + giải thích ngắn trong chat
☑ Setup boilerplate cho exercises
☑ Flow: Concept → Exercise → Review → Next
☑ Cuối session: Quiz + Update progress/PROGRESS_TRACKER.md

=== READY ===
✅ Tôi đã sẵn sàng. Bắt đầu phần đầu tiên!
```

**CHỈ CẦN:**
1. Copy đoạn trên
2. Mở chat MỚI với AI
3. Paste
4. Bắt đầu học!

---

## 🚀 TÓM TẮT - Workflow Cực Ngắn

```
MỖI SESSION:
1. Check PROGRESS_TRACKER → Biết session nào
2. Copy SESSION_START_FORM → Điền info
3. Paste vào chat MỚI
4. Học theo AI hướng dẫn
5. Review summary
6. Repeat cho session tiếp theo
```

**Đơn giản vậy thôi!** 🎉

---

## 💪 BẠN ĐÃ SẴN SÀNG

**Bây giờ hãy:**
1. Copy template mẫu Session 1.1.1 ở trên
2. Mở chat MỚI với AI
3. Paste
4. Bắt đầu học ngay!

**Không cần đọc thêm file nào nữa!**

---

**VERSION:** 1.0 - Super Simplified
**DATE:** 2025-12-25
