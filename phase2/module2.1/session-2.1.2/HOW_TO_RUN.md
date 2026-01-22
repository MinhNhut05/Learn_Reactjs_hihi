# 🚀 HƯỚNG DẪN CHẠY SESSION 2.1.2

## 📖 Phương án 1: Chỉ đọc code (Khuyến khích)

Session này **KHÔNG BẮT BUỘC chạy project**. Bạn có thể:

1. **Đọc `THEORY.md`** - Hiểu lý thuyết trước
2. **Đọc code files** - Các file đã có giải thích chi tiết từng dòng
3. **Làm Mini Exercise** - Tự implement Toggle trong đầu hoặc trên giấy
4. **Review Solution** - So sánh với solution

### Lý do:
- Session này là về **patterns và concepts** - quan trọng là hiểu idea
- Code đã có giải thích chi tiết, đủ để học
- Chạy demo chỉ giúp visualize, không bắt buộc

---

## 💻 Phương án 2: Setup project để chạy demo (Optional)

Nếu muốn chạy và test các components:

### Bước 1: Tạo Vite project

```bash
cd /home/minhnhut_dev/Study/Study-fullstack-online/Reactjs/phase2/module2.1/session-2.1.2

# Tạo Vite project
npm create vite@latest demo-app -- --template react-ts

cd demo-app
npm install
```

### Bước 2: Copy code vào project

```bash
# Copy các files từ session-2.1.2 vào demo-app/src
cp -r ../components demo-app/src/
cp -r ../contexts demo-app/src/
cp -r ../hocs demo-app/src/
cp -r ../providers demo-app/src/
cp -r ../exercises demo-app/src/
```

### Bước 3: Tạo App.tsx để test

```tsx
// demo-app/src/App.tsx
import { MouseTracker } from './components/MouseTracker';
import { DataFetcher } from './components/DataFetcher';
import { AppProvider } from './providers/AppProvider';
import { ThemeDemo } from './contexts/theme/ThemeProvider';
import { NotificationDemo } from './contexts/notification/NotificationProvider';

function App() {
  return (
    <AppProvider>
      <div style={{ padding: '20px' }}>
        <h1>Session 2.1.2 - Demo</h1>

        {/* Render Props Demo */}
        <section>
          <h2>1. Render Props - MouseTracker</h2>
          <MouseTracker>
            {({ x, y }) => (
              <p>Mouse position: {x}, {y}</p>
            )}
          </MouseTracker>
        </section>

        {/* Theme Demo */}
        <section>
          <h2>2. Theme Provider</h2>
          <ThemeDemo />
        </section>

        {/* Notification Demo */}
        <section>
          <h2>3. Notification Provider</h2>
          <NotificationDemo />
        </section>
      </div>
    </AppProvider>
  );
}

export default App;
```

### Bước 4: Chạy dev server

```bash
cd demo-app
npm run dev
```

Truy cập http://localhost:5173

---

## 🎯 Khuyến nghị

**→ Bắt đầu với Phương án 1 (chỉ đọc code)**

Lý do:
1. Nhanh hơn, tập trung vào concepts
2. Code có giải thích chi tiết
3. Không cần setup phức tạp
4. Hiểu patterns > Chạy demo

**→ Chỉ dùng Phương án 2 nếu:**
- Bạn đã đọc hiểu code
- Muốn thử nghiệm modify code
- Muốn xem visual feedback

---

## 📚 Thứ tự học (Phương án 1)

```
1. Đọc THEORY.md                          ⏱️ 30-40 phút
   ↓
2. Đọc components/MouseTracker.tsx        ⏱️ 10 phút
   ↓
3. Đọc components/DataFetcher.tsx         ⏱️ 10 phút
   ↓
4. Đọc hocs/withAuth.tsx                  ⏱️ 15 phút
   ↓
5. Tự làm exercises/Toggle.starter.tsx    ⏱️ 30 phút
   ↓
6. Xem solutions/Toggle.solution.tsx      ⏱️ 10 phút
   ↓
7. Đọc contexts/auth/AuthProvider.tsx     ⏱️ 20 phút
   (Phần quan trọng nhất - Split Contexts!)
   ↓
8. Review README.md checklist             ⏱️ 10 phút
```

**TỔNG: ~2.5 giờ**

---

## ❓ Câu hỏi thường gặp

**Q: Tôi bắt buộc phải setup project không?**
A: KHÔNG. Chỉ cần đọc code là đủ học.

**Q: Làm sao biết đã hiểu chưa?**
A: Làm Mini Exercise (Toggle) xong là biết. Nếu làm được thì đã hiểu Render Props.

**Q: File nào quan trọng nhất?**
A: `contexts/auth/AuthProvider.tsx` - Split Contexts pattern. Đây là pattern được dùng nhiều trong production.

**Q: Phải học thuộc lòng không?**
A: KHÔNG. Hiểu idea là đủ. Khi cần thì tra lại code.

---

**Bắt đầu ngay:** Mở `THEORY.md` và đọc!
