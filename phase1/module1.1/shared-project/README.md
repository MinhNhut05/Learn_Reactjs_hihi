# Module 1.1 - TypeScript cho React

> Shared project cho tất cả exercises trong Module 1.1 (Sessions 1.1.1 - 1.1.4)

---

## 🚀 QUICK START

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy dev server:
```bash
npm run dev
```

### 3. Mở browser:
```
http://localhost:5173
```

### 4. Bắt đầu code:
- Mở file exercise trong `src/session-X.X.X/`
- Implement theo TODO comments
- Browser tự động reload khi save

---

## 📁 STRUCTURE

```
shared-project/
├── src/
│   ├── App.tsx                    ← Main app (comment/uncomment exercises)
│   ├── main.tsx                   ← Entry point
│   ├── index.css                  ← Global styles
│   │
│   ├── session-1.1.1/             ← Props & State Typing
│   │   ├── 01-Button.tsx          ← Exercise file
│   │   ├── 01-Button-Solution.tsx ← Solution file
│   │   ├── 02-Card.tsx
│   │   ├── 02-Card-Solution.tsx
│   │   ├── 03-GenericList.tsx
│   │   └── 03-GenericList-Solution.tsx
│   │
│   ├── session-1.1.2/             ← Event Handlers (Thêm sau)
│   ├── session-1.1.3/             ← Hooks với TypeScript (Thêm sau)
│   └── session-1.1.4/             ← Utility Types (Thêm sau)
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── EXERCISES_INDEX.md             ← Danh sách tất cả exercises
└── README.md                      ← File này
```

---

## 🎯 WORKFLOW

### Khi bắt đầu exercise mới:

1. **Mở file exercise:**
   ```
   src/session-1.1.1/01-Button.tsx
   ```

2. **Đọc requirements:**
   - Đọc comment đầu file
   - Check concepts trong `../session-1.1.1/01-concepts.md`

3. **Uncomment trong App.tsx:**
   ```tsx
   // Uncomment exercise đang làm
   import Ex1_Button from './session-1.1.1/01-Button'

   // Trong return:
   <Ex1_Button />
   ```

4. **Implement code:**
   - Follow TODO comments
   - Test trong browser
   - Fix TypeScript errors

5. **Review với AI:**
   ```
   Nhắn: "xong ex1"
   ```

6. **So sánh solution:**
   ```
   Mở: 01-Button-Solution.tsx
   ```

---

## 📚 EXERCISES LIST

### Session 1.1.1: Props & State Typing
- [ ] Exercise 1: Button Component
- [ ] Exercise 2: Card Component
- [ ] Exercise 3: Generic List Component

### Session 1.1.2: Event Handlers Typing
- [ ] Exercise 1: Login Form
- [ ] Exercise 2: Search Component

### Session 1.1.3: Hooks với TypeScript
- [ ] Exercise 1: useLocalStorage Hook
- [ ] Exercise 2: useDebounce Hook
- [ ] Exercise 3: useFetch Hook

### Session 1.1.4: Utility Types & Advanced
- [ ] Exercise 1: Form Builder
- [ ] Exercise 2: Props Extraction

Chi tiết: Xem [EXERCISES_INDEX.md](./EXERCISES_INDEX.md)

---

## 🎨 STYLES

Global styles đã được setup trong `src/index.css`:

**Classes có sẵn:**
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-sm`, `.btn-md`, `.btn-lg`
- Cards: `.card`, `.card-header`, `.card-body`, `.card-footer`
- Forms: `.form-group`, `.form-label`, `.form-input`, `.form-error`
- Lists: `.list`, `.list-item`
- Layout: `.section`, `.section-title`, `.exercise-container`
- Utilities: `.flex`, `.flex-col`, `.gap-10`, `.gap-20`

**Dùng className có sẵn thay vì tự viết CSS mới.**

---

## 🐛 TROUBLESHOOTING

### TypeScript errors:
```bash
# Check terminal để xem lỗi chi tiết
# Hoặc xem trong browser console
```

### Port already in use:
```bash
# Vite tự động dùng port khác (5174, 5175...)
# Check terminal để xem port nào
```

### Hot reload không hoạt động:
```bash
# Restart dev server
Ctrl+C
npm run dev
```

---

## 💡 TIPS

### Khi làm exercise:
- ✅ Đọc requirements kỹ
- ✅ Implement từng TODO một
- ✅ Test từng feature sau khi code
- ✅ Fix TypeScript errors ngay
- ❌ Không copy solution trước khi thử

### Khi gặp khó:
- Đọc lại concepts.md
- Check TypeScript error messages
- Hỏi AI hint (không xem solution ngay)

### Sau khi hoàn thành:
- Review code của bạn vs solution
- Hiểu tại sao solution approach khác
- Note lại insights trong PROGRESS_TRACKER.md

---

## 📖 DOCUMENTATION

- **Concepts:** `../session-X.X.X/01-concepts.md`
- **Deep Dive:** `../session-X.X.X/02-deep-dive.md`
- **Quiz:** `../session-X.X.X/quiz.md`
- **Summary:** `../session-X.X.X/summary.md`

---

## 🎯 NEXT STEPS

1. ✅ npm install
2. ✅ npm run dev
3. ✅ Mở http://localhost:5173
4. 💻 Bắt đầu Exercise 1!

**Ready to code?** Mở `src/session-1.1.1/01-Button.tsx` và bắt đầu! 🚀
