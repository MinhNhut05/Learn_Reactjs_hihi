# 🚀 HƯỚNG DẪN CHẠY PROJECT

## Bước 1: Cài đặt Dependencies

Mở terminal tại folder này và chạy:

```bash
cd phase1/module1.1/session-1.1.1-props-typing/exercises/ex1-button-component

npm install
```

**Giải thích:**
- `npm install` sẽ cài đặt tất cả packages trong `package.json`
- Packages bao gồm: React, TypeScript, Vite (build tool)
- Folder `node_modules/` sẽ được tạo (chứa tất cả dependencies)

**Thời gian:** ~1-2 phút (tùy tốc độ internet)

---

## Bước 2: Chạy Development Server

Sau khi cài đặt xong, chạy:

```bash
npm run dev
```

**Giải thích:**
- Vite sẽ start development server
- Server chạy ở `http://localhost:5173` (hoặc port khác nếu 5173 đang dùng)
- File sẽ tự động reload khi bạn save code (hot reload)

**Kết quả:**
Terminal sẽ hiển thị:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Bước 3: Mở Browser

Mở trình duyệt và truy cập: **http://localhost:5173**

Bạn sẽ thấy:
- Các button với variants khác nhau (primary, secondary, danger)
- Các button với sizes khác nhau (sm, md, lg)
- Button disabled

Click vào button để test onClick handler!

---

## Bước 4: Edit Code và Xem Kết Quả

1. Mở file `src/App.tsx`
2. Thay đổi code (ví dụ: đổi text "Primary Button" → "Click Me!")
3. Save file (Ctrl+S / Cmd+S)
4. Browser tự động reload → thấy thay đổi ngay lập tức

**Magic của Hot Reload:** Không cần refresh browser thủ công!

---

## Bước 5: Stop Server

Khi học xong, dừng server bằng cách:
- Nhấn `Ctrl+C` trong terminal
- Hoặc đóng terminal

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"
**Nguyên nhân:** Chưa cài dependencies
**Fix:** Chạy `npm install`

### Lỗi: "Port 5173 is already in use"
**Nguyên nhân:** Port đang được dùng bởi process khác
**Fix:** Vite tự động dùng port khác (5174, 5175...), check terminal để xem port nào

### Lỗi TypeScript trong code
**Nguyên nhân:** Syntax sai hoặc type sai
**Fix:** Đọc error message trong terminal, nó sẽ chỉ rõ lỗi ở dòng nào

---

## 📁 Cấu Trúc Project

```
ex1-button-component/
├── src/
│   ├── App.tsx          ← Component chính (code của bạn)
│   ├── main.tsx         ← Entry point (mount React vào DOM)
│   └── index.css        ← Styles
├── index.html           ← HTML template
├── package.json         ← Dependencies & scripts
├── tsconfig.json        ← TypeScript config
├── vite.config.ts       ← Vite config
└── SETUP_GUIDE.md       ← File này
```

**File bạn cần quan tâm:**
- `src/App.tsx` - Nơi bạn code component

**File không cần động đến:**
- Các file config (tsconfig.json, vite.config.ts)
- main.tsx (đã setup sẵn)

---

## 🎯 Next Steps

Sau khi chạy được project:
1. ✅ Thử click các buttons → xem alerts
2. ✅ Edit code trong App.tsx → xem live reload
3. ✅ Thử thêm button mới với props khác
4. ✅ Thử truyền sai props (ví dụ: `variant="success"`) → xem TypeScript error

Sẵn sàng thì nhắn "sẵn sàng ex2" để làm Exercise 2!
