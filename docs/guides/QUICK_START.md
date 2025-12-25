# QUICK START GUIDE 🚀

> Đọc file này ĐẦU TIÊN trước khi bắt đầu

---

## 📖 BẠN CÓ GÌ?

Tôi vừa tạo cho bạn một **hệ thống học React hoàn chỉnh**:

### 1. **LEARNING_RULES.md** ⭐ QUAN TRỌNG NHẤT
- Framework chuẩn cho mỗi session học
- Quy tắc AI phải tuân theo
- Format bài tập, quiz, review
- **ĐỌC FILE NÀY ĐẦU MỖI SESSION**

### 2. **PHASE_1_DETAILED.md**
- Chi tiết 16 sessions của Phase 1
- Mỗi session có:
  - Concepts cần học
  - 3-5 bài tập thực hành
  - Knowledge check questions
  - Deep dive discussions

### 3. **Progress Tracking System**
- `PROGRESS_TRACKER.md`: Track overall progress
- `SESSION_TEMPLATE.md`: Template cho mỗi session
- Spaced repetition schedule

### 4. **README.md**
- Overview toàn bộ roadmap
- Cách sử dụng hệ thống
- Tips & troubleshooting

---

## 🎯 BẮT ĐẦU NGAY BÂY GIỜ

### Step 1: Đọc hiểu framework (10 phút)
```bash
# Đọc file này TRƯỚC:
cat LEARNING_RULES.md
```

**Hiểu rõ:**
- Session format 4 bước
- AI sẽ cho bài tập TRƯỚC khi show code
- Bạn phải TỰ CODE, AI sẽ review
- Có quiz sau mỗi session

---

### Step 2: Session đầu tiên (2-3 giờ)

**Tạo session notes:**
```bash
cd progress
cp SESSION_TEMPLATE.md session-1.1.1-props-typing.md
```

**Bắt đầu chat MỚI với AI:**
```
📚 SESSION MỚI - Phase 1 Module 1.1 Session 1.1.1

Topic: TypeScript Props & State Typing
Đã biết: JavaScript, TypeScript cơ bản, React hooks cơ bản
Hôm nay muốn học: Type cho Props, State, Children trong React
Thời gian: 2-3 giờ

Follow LEARNING_RULES.md
Bắt đầu từ PHASE_1_DETAILED.md - Session 1.1.1
```

**AI sẽ:**
1. Hỏi thêm về level hiện tại
2. Giải thích ngắn concept (5 phút)
3. Cho bài tập 1 (Button Component)
4. Đợi bạn code
5. Review code của bạn
6. Tiếp tục exercises 2, 3
7. Deep dive giải thích
8. Quiz
9. Summary

---

### Step 3: Sau session

**Fill in session notes:**
- Concepts learned
- Code examples
- Quiz score
- Key takeaways

**Update progress:**
```bash
# Edit PROGRESS_TRACKER.md
# Check off: Session 1.1.1 completed
```

**Tạo folder cho exercises:**
```bash
mkdir -p exercises/1.1.1-props-typing
# Move code vào đây
```

---

## 📋 TEMPLATE CHAT CHO MỖI SESSION

Copy paste template này mỗi session mới:

```
📚 SESSION MỚI

Topic: [Phase X - Module X.X - Session X.X.X]
Concept: [Tên concept từ PHASE_1_DETAILED.md]

Đã học từ sessions trước:
- [List concepts đã biết]

Hôm nay muốn học:
- [Concepts từ PHASE_1_DETAILED.md]

Vấn đề/câu hỏi:
- [Nếu có]

Thời gian: [X giờ]

Follow LEARNING_RULES.md
```

---

## 🎓 LEARNING RULES TÓM TẮT

### AI PHẢI:
1. ✅ Cho bài tập TRƯỚC code
2. ✅ Review code của bạn
3. ✅ So sánh multiple approaches
4. ✅ Hỏi đáp kiểm tra hiểu
5. ✅ Tạo summary cuối session

### AI KHÔNG ĐƯỢC:
1. ❌ Show code hoàn chỉnh trước khi bạn thử
2. ❌ Giải thích dài dòng lý thuyết
3. ❌ Bỏ qua review code
4. ❌ Không có quiz
5. ❌ Dạy quá nhiều concepts cùng lúc

### BẠN PHẢI:
1. ✅ TỰ code bài tập
2. ✅ Trả lời quiz
3. ✅ Hỏi nếu không hiểu
4. ✅ Review lại sau 1, 3, 7, 14 ngày

---

## 📚 PHASE 1 ROADMAP

**Module 1.1: TypeScript cho React (4-5 days)**
- Session 1.1.1: Props & State Typing
- Session 1.1.2: Event Handlers Typing
- Session 1.1.3: Hooks với TypeScript
- Session 1.1.4: Utility Types

**Module 1.2: React Mental Model (5-6 days)**
- Session 1.2.1: Rendering & Re-rendering
- Session 1.2.2: Reconciliation & Keys
- Session 1.2.3: Closure trong React
- Session 1.2.4: One-way Data Flow

**Module 1.3: Hooks Deep Dive (5-6 days)**
- Session 1.3.1: useState Advanced
- Session 1.3.2: useEffect Mastery
- Session 1.3.3: useMemo & useCallback
- Session 1.3.4: useContext & useReducer
- Session 1.3.5: useRef Deep Dive
- Session 1.3.6: Custom Hooks Patterns

**Final: Todo App (1 day)**

---

## 💡 TIPS QUAN TRỌNG

### Học hiệu quả:
1. **1 session/day hoặc ít hơn**
   - Không vội, quality > quantity
   - Mỗi session focus sâu 1 topic

2. **Code nhiều, đọc ít**
   - 30% lý thuyết, 70% thực hành
   - Mỗi concept ít nhất 2-3 exercises

3. **Review thường xuyên**
   - Ngày 1, 3, 7, 14
   - Làm lại exercises không xem code cũ

4. **Track progress**
   - Update PROGRESS_TRACKER.md
   - Celebrate small wins

### Tránh:
- ❌ Học 3-4 sessions/day (sẽ quên nhanh)
- ❌ Chỉ đọc không code
- ❌ Copy paste code
- ❌ Skip quiz
- ❌ Không review

---

## 🔄 SPACED REPETITION

**Sau mỗi session:**
```
Day 0 (hôm nay): Learn + Practice
Day 1 (ngày mai): Review summary (10 phút)
Day 3: Làm lại exercises (30 phút)
Day 7: Quiz lại (15 phút)
Day 14: Dùng trong project nhỏ
```

**Setup reminders:**
- Calendar/Notion/Todoist
- Hoặc check PROGRESS_TRACKER.md hàng ngày

---

## 🆘 NẾU GẶP VẤN ĐỀ

### "Bài tập quá khó"
→ Nói với AI: "Cho bài dễ hơn" hoặc "Cho hints"

### "Giải thích quá ngắn, chưa hiểu"
→ Nói: "Giải thích sâu hơn về [concept X]"

### "Cần practice thêm"
→ Nói: "Cho thêm exercises về [topic]"

### "Muốn ví dụ thực tế"
→ Nói: "Cho real-world example"

### "AI show code quá sớm"
→ Nhắc: "Follow LEARNING_RULES.md - đừng show code, cho tôi bài tập trước"

---

## 📊 SUCCESS METRICS

**Session thành công khi:**
- ✅ Code được ít nhất 2 bài tập
- ✅ Quiz score ≥70%
- ✅ Hiểu trade-offs
- ✅ Biết khi nào dùng concept

**Phase 1 complete khi:**
- ✅ Hoàn thành 16/16 sessions
- ✅ Average quiz score ≥80%
- ✅ Làm xong Final Todo App
- ✅ Tự tin giải thích concepts

---

## 🎯 NEXT STEPS

### Ngay bây giờ:
1. [ ] Đọc LEARNING_RULES.md (10 phút)
2. [ ] Đọc PHASE_1_DETAILED.md - Session 1.1.1 (5 phút)
3. [ ] Tạo session notes từ template
4. [ ] Bắt đầu session đầu tiên với AI

### Tuần này:
- [ ] Complete Module 1.1 (4 sessions)
- [ ] Review mỗi tối
- [ ] Update progress tracker

### Tháng này:
- [ ] Complete Phase 1
- [ ] Final Todo App
- [ ] Review & quiz

---

## 📁 FILE STRUCTURE RECAP

```
Reactjs/
├── README.md                    # Overview
├── QUICK_START.md              # ← BẠN ĐANG ĐỌC
├── LEARNING_RULES.md           # ⭐ Framework (đọc đầu mỗi session)
├── PHASE_1_DETAILED.md         # 16 sessions chi tiết
│
├── progress/
│   ├── PROGRESS_TRACKER.md     # Track progress
│   ├── SESSION_TEMPLATE.md     # Template notes
│   └── session-X.X.X-*.md      # Your session notes
│
├── exercises/
│   └── X.X.X-*/                # Exercise code
│
└── projects/
    └── phase1-final-todo/      # Final project
```

---

## ✅ CHECKLIST TRƯỚC KHI BẮT ĐẦU

- [ ] Đã đọc QUICK_START.md này
- [ ] Đã đọc LEARNING_RULES.md
- [ ] Đã đọc Session 1.1.1 trong PHASE_1_DETAILED.md
- [ ] Đã tạo session notes từ template
- [ ] Đã setup folder exercises/
- [ ] Đã hiểu session format 4 bước
- [ ] Sẵn sàng code (không copy paste!)

---

**Bạn đã sẵn sàng! Bắt đầu session đầu tiên thôi! 🚀**

**Câu hỏi?** Hỏi AI trong session tiếp theo!
