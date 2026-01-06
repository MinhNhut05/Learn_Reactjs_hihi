# Session 1.3.1: useState Advanced - SUMMARY

> Checklist nhanh để review kiến thức

---

## 🎯 Core Concepts

### 1. Lazy Initialization

```tsx
// ❌ BAD: Chạy mỗi render
useState(expensiveFunction())

// ✅ GOOD: Chỉ chạy 1 lần
useState(() => expensiveFunction())
```

**Khi nào dùng:**
- [ ] Đọc từ localStorage/sessionStorage
- [ ] Parse JSON
- [ ] Expensive calculations
- [ ] Complex initial setup

**Khi nào KHÔNG cần:**
- [ ] Primitive values: `0`, `""`, `true`
- [ ] Simple objects: `{}`, `[]`
- [ ] Values đã có sẵn

---

### 2. Functional Updates

```tsx
// ❌ Stale closure
setCount(count + 1)

// ✅ Always fresh
setCount(prev => prev + 1)
```

**Khi nào dùng:**
- [ ] State mới phụ thuộc state cũ
- [ ] Nhiều setState trong 1 event
- [ ] setTimeout/setInterval
- [ ] Async callbacks

**Pattern:**
```tsx
// Counter
setCount(prev => prev + 1)

// Array
setItems(prev => [...prev, newItem])

// Object
setUser(prev => ({ ...prev, name: 'New' }))
```

---

### 3. Object State Updates

**Quy tắc vàng:** NEVER mutate!

```tsx
// ❌ WRONG: Mutation
user.age = 26;
setUser(user);

// ✅ RIGHT: New object
setUser({ ...user, age: 26 });
```

**Nested objects:**
```tsx
// Phải spread mỗi level
setProfile({
  ...profile,
  address: {
    ...profile.address,
    city: 'LA'
  }
});
```

---

### 4. Multiple States vs Single Object

**Tách riêng khi:**
- [ ] Các state KHÔNG liên quan
- [ ] Ít fields (< 3)
- [ ] Independent updates

**Gộp chung khi:**
- [ ] Các state THAY ĐỔI CÙNG NHAU
- [ ] Nhiều fields liên quan (form data)
- [ ] Complex structure

---

## 🔍 Common Mistakes Checklist

- [ ] ❌ Không dùng lazy init cho expensive ops
- [ ] ❌ Direct update khi cần functional: `setCount(count + 1)` x3
- [ ] ❌ Mutate object: `user.name = 'New'; setUser(user);`
- [ ] ❌ Quên spread nested: `{ ...obj, nested: { field: 'new' } }`
- [ ] ❌ Quá nhiều states riêng lẻ cho form (6+ fields)

---

## 📋 Pre-Coding Checklist

Trước khi code useState, tự hỏi:

1. **Initial value có expensive không?**
   - YES → `useState(() => ...)`
   - NO → `useState(...)`

2. **State mới phụ thuộc state cũ?**
   - YES → `setState(prev => ...)`
   - NO → `setState(value)`

3. **Update object?**
   - YES → Spread `{ ...obj, field: value }`
   - Nested? → Spread từng level

4. **Nhiều states liên quan?**
   - YES → Xem xét gộp hoặc useReducer
   - NO → Tách riêng OK

---

## 💡 Quick Reference

| Tình huống | Pattern |
|-----------|---------|
| localStorage | `useState(() => localStorage.getItem('key'))` |
| Counter increment | `setCount(c => c + 1)` |
| Add to array | `setItems(prev => [...prev, newItem])` |
| Update object | `setUser(prev => ({ ...prev, field: value }))` |
| Nested object | `{ ...obj, nested: { ...obj.nested, field: value } }` |
| Form (nhiều fields) | Single object với generic handler |

---

## 🎓 Key Takeaways

1. **Lazy init** = Performance optimization cho expensive initial values
2. **Functional update** = Giải quyết stale closure problem
3. **Immutability** = React cần new object để detect changes
4. **State structure** = Tách/gộp dựa trên "thay đổi cùng nhau" hay không

---

## ✅ Session Complete?

Tự đánh giá:

- [ ] Hiểu sự khác biệt direct vs lazy init
- [ ] Hiểu stale closure và cách fix
- [ ] Biết update object immutably
- [ ] Quyết định được tách/gộp states
- [ ] Exercise 1 score ≥ 8/10
- [ ] Exercise 2 score ≥ 8/10
- [ ] Quiz score ≥ 8/10

**Nếu tất cả checked → Ready for Session 1.3.2!** 🚀
