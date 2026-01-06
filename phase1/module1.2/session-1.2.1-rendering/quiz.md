# Quiz - Session 1.2.1: Rendering & Re-rendering

> **Score:** 8/10 (80%)
> **Date:** 2025-12-29

---

## Questions & Answers

### Câu 1: Render Triggers ✅
**Q:** Điều nào KHÔNG trigger re-render?
- A. setCount(count + 1)
- **B. ref.current += 1** ← Correct
- C. setCount(prev => prev)
- D. setCount(0) khi count = 0

**Answer:** B - useRef không trigger re-render

---

### Câu 2: useEffect Dependencies ✅
**Q:** useEffect không có dependency array chạy khi nào?
- A. Chỉ 1 lần
- **B. Sau mỗi render** ← Correct
- C. Không bao giờ
- D. Khi unmount

**Answer:** B - Không có [] = chạy sau mọi render

---

### Câu 3: useRef vs useState ✅
**Q:** Tại sao dùng useRef để đếm renders?
- A. Nhanh hơn
- **B. Không trigger re-render** ← Correct
- C. Lưu nhiều giá trị hơn
- D. Persist qua refresh

**Answer:** B

---

### Câu 4: Parent-Child Re-render ✅
**Q:** Parent re-render, Child không nhận props - điều gì xảy ra?
- A. Chỉ Parent
- **B. Cả Parent và Child** ← Correct
- C. Chỉ Child
- D. Không ai

**Answer:** B - Default behavior: parent re-render → all children re-render

---

### Câu 5: React.memo ✅
**Q:** MemoChild value={count}, click "Update Other" - re-render?
- A. Có
- **B. Không, props không đổi** ← Correct
- C. Có, memo không work với number
- D. Không, child không có state

**Answer:** B

---

### Câu 6: useCallback Purpose ❌
**Q:** Mục đích chính của useCallback?
- A. Làm function nhanh hơn
- B. Cache kết quả ← Your answer (Wrong)
- **C. Giữ function reference stable** ← Correct
- D. Tự động gọi khi mount

**Answer:** C - useCallback giữ reference stable, useMemo cache kết quả

---

### Câu 7: useCallback + memo ✅
**Q:** handleClick không có useCallback, MemoChild re-render?
- A. Không
- **B. Có, function mới mỗi render** ← Correct
- C. Không, logic không đổi
- D. Có, memo không work với function

**Answer:** B

---

### Câu 8: Functional Update ❌
**Q:** Tại sao empty deps [] hoạt động với functional update?
- A. useCallback auto detect
- B. setTodos stable ← Your answer (Wrong)
- **C. prev => cho latest value, không cần todos trong deps** ← Correct
- D. Filter là pure function

**Answer:** C - Functional update `prev =>` access latest state

---

### Câu 9: Shallow Comparison ✅
**Q:** user={{ name: 'John' }} mỗi render, MemoChild re-render?
- A. Không, name vẫn 'John'
- **B. Có, object MỚI mỗi render** ← Correct
- C. Không, memo compare deep
- D. Có, count thay đổi

**Answer:** B - Shallow comparison, object mới = props khác

---

### Câu 10: When NOT to use memo ✅
**Q:** Khi nào KHÔNG nên dùng memo?
- **A. Component render nhanh, đơn giản** ← Correct
- B. Expensive calculations
- C. Primitive props
- D. Long lists

**Answer:** A - Overhead của memo > benefit cho simple components

---

## Summary

- **Correct:** 8/10
- **Wrong:** Câu 6, 8
- **Key learnings:**
  - useCallback = stable function reference (not cache result)
  - Functional update `prev =>` = access latest state without deps
