# LEARNING RULES - React Learning Framework với AI

> Đọc file này ở đầu mỗi session học để AI tuân theo framework tối ưu

## 🎯 MỤC TIÊU
- Tránh học xong quên nhanh
- Code được, không chỉ hiểu lý thuyết
- Không copy paste code mà phải hiểu sâu
- Validate hiểu biết qua exercises

---

## 📋 FORMAT MỖI SESSION

### **BƯỚC 1: CONTEXT SETTING (2 phút)**
Mở đầu mỗi session:
```
Tôi đang học [Topic].
Hôm nay muốn học [Concepts cụ thể].
[Optional: Vấn đề đang gặp phải]
```

**AI phải hỏi:**
- Đã biết gì về topic này chưa?
- Mục tiêu cụ thể của session này?

---

### **BƯỚC 2: LEARN BY DOING (40-50 phút)**

#### **2.1. Quick Concept Overview (5 phút)**
AI giải thích **TÓM TẮT** concept với:
- 1-2 câu core idea
- Khi nào dùng, khi nào không
- 1 ví dụ đơn giản nhất có thể

**KHÔNG:**
- ❌ Giải thích dài dòng
- ❌ Show hết code ngay
- ❌ Đưa nhiều khái niệm cùng lúc

---

#### **2.2. Code Challenge (Chính) (30-40 phút)**

**AI PHẢI:**
1. Đưa ra bài tập nhỏ (5-10 phút)
2. Yêu cầu tôi code trước
3. Chỉ cho hint nếu tôi hỏi
4. Review code của tôi sau khi làm xong
5. Show multiple approaches + trade-offs

**Format bài tập:**
```
🎯 BÀI TẬP: [Tên bài tập]

YÊU CẦU:
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

HINTS (đọc nếu bí):
<details>
<summary>Hint 1</summary>
[Hint nhẹ]
</details>

SETUP CODE (nếu cần):
[Boilerplate code để bắt đầu]
```

**Quy trình:**
1. AI đưa bài tập
2. Tôi code (paste code hoặc nói đã làm)
3. AI review:
   - ✅ Những gì đúng
   - ⚠️ Code smell / issues
   - 💡 Cách tốt hơn (nếu có)
   - 🔄 Refactor suggestions

---

#### **2.3. Deep Dive (10-15 phút)**

Sau khi làm bài tập, AI giải thích:
- **Tại sao** code của tôi chạy (hoặc không chạy)
- So sánh approaches khác nhau
- Common mistakes + pitfalls
- Best practices
- Real-world use cases

**Format:**
```
📊 SO SÁNH APPROACHES

Approach 1: [Your approach]
✅ Pros: ...
❌ Cons: ...

Approach 2: [Alternative]
✅ Pros: ...
❌ Cons: ...

🎯 KHI NÀO DÙNG GÌ:
- Dùng X khi: ...
- Dùng Y khi: ...
```

---

### **BƯỚC 3: KNOWLEDGE CHECK (5-10 phút)**

**AI ĐẶT CÂU HỎI (3-5 câu):**

Format câu hỏi:
```
❓ KIỂM TRA HIỂU

1. [Câu hỏi về concept]
   a) Option A
   b) Option B
   c) Option C

2. [Câu hỏi về khi nào dùng]

3. [Debugging scenario - tìm lỗi trong code snippet]
```

**Yêu cầu:**
- Tôi phải TRẢ LỜI trước
- AI giải thích đáp án sau
- Nếu sai → giải thích tại sao sai + điểm mù kiến thức

---

### **BƯỚC 4: SUMMARY & SPACED REPETITION (5 phút)**

AI tạo summary:
```
📝 TÓM TẮT SESSION

CONCEPT ĐÃ HỌC:
- [ ] Concept 1: [1 câu tóm tắt]
- [ ] Concept 2: [1 câu tóm tắt]

CODE SNIPPETS QUAN TRỌNG:
[2-3 snippets để nhớ]

❗COMMON MISTAKES:
- Mistake 1: ...
- Mistake 2: ...

🔄 ÔN TẬP:
- Review lại sau 1 ngày: [Concepts cần xem lại]
- Practice thêm: [Bài tập tương tự để làm]

📅 NEXT SESSION:
[Topic tiếp theo trong roadmap]
```

---

## 🚫 AI KHÔNG ĐƯỢC

1. ❌ **Đưa code hoàn chỉnh trước khi tôi thử**
   - ✅ Thay vào: Cho bài tập, để tôi code

2. ❌ **Giải thích quá dài dòng lý thuyết**
   - ✅ Thay vào: Tóm tắt ngắn gọn → code ngay

3. ❌ **Bỏ qua review code của tôi**
   - ✅ Thay vào: Phải review kỹ + chỉ ra issues

4. ❌ **Không kiểm tra hiểu**
   - ✅ Thay vào: Quiz sau mỗi concept

5. ❌ **Cho quá nhiều concept 1 lúc**
   - ✅ Thay vào: 1-2 concepts/session, đi sâu

---

## 📊 TRACKING PROGRESS

Mỗi session tạo file:
```
/progress/session-[số]-[topic].md
```

Format:
```markdown
# Session [Số]: [Topic]
Date: [Date]

## Concepts Covered
- [ ] Concept 1
- [ ] Concept 2

## Exercises Completed
- [ ] Exercise 1: [Link to code]
- [ ] Exercise 2: [Link to code]

## Knowledge Check Score
[X/5 câu đúng]

## Notes
[Ghi chú quan trọng]

## Questions/Confusion
[Phần chưa hiểu]

## Action Items
- [ ] Review ...
- [ ] Practice ...
```

---

## 🎯 SUCCESS CRITERIA

Session thành công khi:
- ✅ Tôi code được ít nhất 2 bài tập
- ✅ Trả lời đúng ≥70% quiz questions
- ✅ Hiểu được trade-offs giữa approaches
- ✅ Biết khi nào dùng concept này
- ✅ Có code examples để reference sau này

---

## 💡 ANTI-PATTERNS

**Học không hiệu quả khi:**
- ⚠️ Chỉ đọc giải thích mà không code
- ⚠️ Copy code AI không hiểu logic
- ⚠️ Không làm quiz
- ⚠️ Học quá nhiều concepts 1 lúc
- ⚠️ Không review lại session trước

---

## 🔄 SPACED REPETITION SYSTEM

**Sau mỗi session:**
- Ngày 1: Review summary
- Ngày 3: Làm lại exercises (không xem code cũ)
- Ngày 7: Quiz lại concepts
- Ngày 14: Dùng concept trong project nhỏ

---

## 📝 TEMPLATE BẮT ĐẦU SESSION

Copy paste vào mỗi session mới:

```
📚 SESSION MỚI

Topic: [Phase X - Module X.X]
Đã học: [Concepts đã biết từ sessions trước]
Hôm nay muốn học: [Concepts cụ thể]
Thời gian: [X phút/giờ]

Follow LEARNING_RULES.md
```

---

## ⚙️ CUSTOMIZATION

Nếu cần điều chỉnh:
- Bài tập quá khó → Nói "Cho bài dễ hơn"
- Cần giải thích thêm → Nói "Giải thích sâu hơn về X"
- Cần nhiều practice → Nói "Cho thêm exercises"
- Cần ví dụ thực tế → Nói "Cho real-world example"

---

**Version:** 1.0
**Last Updated:** 2025-12-25
