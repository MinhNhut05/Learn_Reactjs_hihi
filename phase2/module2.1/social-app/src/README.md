# Session 2.1.1 - Compound Components Pattern

## 📚 Mục lục

1. [Tổng quan Session](#tổng-quan-session)
2. [Learning Flow](#learning-flow)
3. [File Structure](#file-structure)
4. [Cách học](#cách-học)
5. [Bài tập](#bài-tập)

---

## Tổng quan Session

**Mục tiêu:** Học cách tạo Compound Components - một pattern phổ biến trong React UI libraries như Radix UI, Headless UI, Chakra UI.

**Sau session này bạn sẽ:**
- Hiểu Compound Components là gì và tại sao cần dùng
- Biết cách sử dụng Context API để share state giữa components
- Tự implement được Tabs component từ đầu
- Hiểu về TypeScript types cho compound components
- Biết cách thêm accessibility (a11y) đúng chuẩn

---

## Learning Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    SESSION 2.1.1 LEARNING FLOW                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STEP 1: Đọc lý thuyết (20 phút)                               │
│  📖 File: THEORY.md                                             │
│  ├── Compound Components là gì?                                 │
│  ├── Vấn đề với cách truyền thống (props)                      │
│  ├── Context API approach                                       │
│  └── Ví dụ code giải thích                                      │
│                           ↓                                     │
│  STEP 2: Exercise 1 - Basic Tabs (30 phút)                     │
│  📝 File: exercises/01-BasicTabs.tsx                            │
│  ├── Đọc requirements trong file                                │
│  ├── Điền code vào chỗ TODO                                     │
│  └── So sánh với solutions/01-BasicTabs.solution.tsx            │
│                           ↓                                     │
│  STEP 3: Exercise 2 - Add Styling (20 phút)                    │
│  📝 File: exercises/02-TabsStyling.tsx                          │
│  ├── Thêm Tailwind styling                                      │
│  ├── Active/inactive states                                     │
│  └── Hover effects                                              │
│                           ↓                                     │
│  STEP 4: Exercise 3 - Accessibility (20 phút)                  │
│  📝 File: exercises/03-TabsA11y.tsx                             │
│  ├── Thêm ARIA attributes                                       │
│  ├── Keyboard navigation                                        │
│  └── Focus management                                           │
│                           ↓                                     │
│  STEP 5: Final Exercise - ProfileTabs (40 phút)                │
│  📝 File: exercises/04-ProfileTabs.tsx                          │
│  ├── Combine tất cả kiến thức                                   │
│  ├── Thêm icons, badges                                         │
│  └── Build component hoàn chỉnh                                 │
│                           ↓                                     │
│  ✅ DONE! Review và tự đánh giá                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
src/
├── exercises/                    # 👈 BẠN LÀM BÀI Ở ĐÂY
│   ├── 01-BasicTabs.tsx         # Exercise 1: Basic implementation
│   ├── 02-TabsStyling.tsx       # Exercise 2: Thêm styling
│   ├── 03-TabsA11y.tsx          # Exercise 3: Accessibility
│   └── 04-ProfileTabs.tsx       # Exercise 4: Final project
│
├── solutions/                    # 👈 SO SÁNH SAU KHI LÀM XONG
│   ├── 01-BasicTabs.solution.tsx
│   ├── 02-TabsStyling.solution.tsx
│   ├── 03-TabsA11y.solution.tsx
│   └── 04-ProfileTabs.solution.tsx
│
├── components/ui/               # Shared UI components (icons, etc.)
│   └── Icons.tsx
│
├── App.tsx                      # Demo app để test
├── THEORY.md                    # 👈 ĐỌC LÝ THUYẾT Ở ĐÂY
└── README.md                    # 👈 BẠN ĐANG Ở ĐÂY
```

---

## Cách học

### Bước 1: Đọc lý thuyết
```bash
# Mở file THEORY.md và đọc kỹ
# Đọc từ đầu đến cuối, đừng skip
```

### Bước 2: Làm bài tập
```bash
# 1. Mở file exercise
# 2. Đọc phần REQUIREMENTS ở đầu file
# 3. Tìm các TODO markers và điền code
# 4. Test bằng cách uncomment trong App.tsx
# 5. So sánh với solution khi xong
```

### Bước 3: Chạy dev server
```bash
npm run dev
# Mở http://localhost:5173
# Uncomment exercise bạn đang làm trong App.tsx
```

---

## Bài tập

### Exercise 1: Basic Tabs (⭐ Dễ)
**File:** `exercises/01-BasicTabs.tsx`

**Học được:**
- Tạo Context cho Compound Components
- useContext hook với error handling
- Cách attach sub-components vào main component

**Kết quả mong đợi:**
```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
    <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

---

### Exercise 2: Tabs Styling (⭐ Dễ)
**File:** `exercises/02-TabsStyling.tsx`

**Học được:**
- Tailwind CSS cho tabs
- Active/inactive states
- Transition effects

---

### Exercise 3: Tabs Accessibility (⭐⭐ Trung bình)
**File:** `exercises/03-TabsA11y.tsx`

**Học được:**
- ARIA attributes (role, aria-selected, aria-controls)
- Keyboard navigation (Arrow keys, Home/End)
- Focus management

---

### Exercise 4: ProfileTabs (⭐⭐⭐ Khó)
**File:** `exercises/04-ProfileTabs.tsx`

**Học được:**
- Combine all concepts
- Icon support trong tabs
- Badge component
- Real-world component

---

## Checklist hoàn thành

- [ ] Đã đọc THEORY.md
- [ ] Exercise 1: Basic Tabs ✅
- [ ] Exercise 2: Tabs Styling ✅
- [ ] Exercise 3: Tabs Accessibility ✅
- [ ] Exercise 4: ProfileTabs ✅
- [ ] Build thành công: `npm run build`

---

## Commands

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build để check errors
npm run build
```

---

## Tips

1. **Đừng xem solution trước** - Cố gắng tự làm, dù sai cũng được
2. **Đọc error messages** - TypeScript errors giúp bạn hiểu vấn đề
3. **Console.log** - Debug bằng console.log nếu không hiểu flow
4. **Hỏi AI** - Nếu stuck quá 15 phút, hãy hỏi để được giải thích

---

**Bắt đầu:** Mở file `THEORY.md` và đọc lý thuyết! 📖
