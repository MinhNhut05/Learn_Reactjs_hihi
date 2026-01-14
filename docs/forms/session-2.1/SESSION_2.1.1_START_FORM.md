# SESSION START FORM - Session 2.1.1

---

## SESSION INFO

**Session ID:** 2.1.1
**Session Title:** Compound Components Pattern
**Module:** 2.1 - Advanced React Patterns
**Phase:** Phase 2 - State Management & Data Fetching
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vị trí trong Roadmap:**
- **Phase 2:** State Management & Data Fetching (Session 1/12)
- **Previous Phase:** 1.5 - Tailwind CSS Mastery (Completed)
- **Next Session:** 2.1.2 - Advanced Patterns (Render Props, HOC)

**Prerequisites Completed:**
- Phase 1.5 - Tailwind CSS Mastery
- E-commerce project hoàn thiện
- Hiểu React hooks (useState, useContext, useReducer)
- TypeScript basics

**Why This Session Important:**
- **Foundation Pattern** - Compound Components là base cho nhiều UI libraries
- **Real-world Usage** - Radix UI, Headless UI, Chakra đều dùng pattern này
- **Flexibility** - Tạo components linh hoạt, dễ customize
- **Interview Topic** - Câu hỏi phổ biến trong React interviews

---

## LEARNING OBJECTIVES

Sau session này, tôi sẽ:

1. **Hiểu Compound Components Pattern** là gì và khi nào dùng
2. **Implement Tabs component** với compound pattern
3. **Implement Accordion component** với compound pattern
4. **Sử dụng React.Children và cloneElement** (approach cũ)
5. **Sử dụng Context API** cho compound components (approach mới)
6. **Áp dụng vào Social App** - ProfileTabs component

---

## PROJECT SETUP

**Project:** Social App (Mới)
**Location:** `phase2/module2.1/social-app/`

**Initial Setup:**
```bash
# Tạo project với Vite + React + TypeScript
npm create vite@latest social-app -- --template react-ts
cd social-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Folder Structure:**
```
social-app/
├── src/
│   ├── components/
│   │   ├── compound/           # Compound components
│   │   │   ├── Tabs/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── TabList.tsx
│   │   │   │   ├── Tab.tsx
│   │   │   │   ├── TabPanels.tsx
│   │   │   │   └── TabPanel.tsx
│   │   │   └── Accordion/
│   │   │       ├── index.tsx
│   │   │       ├── AccordionItem.tsx
│   │   │       ├── AccordionTrigger.tsx
│   │   │       └── AccordionContent.tsx
│   │   └── ui/                 # Basic UI components
│   ├── pages/
│   │   └── Profile.tsx         # Uses ProfileTabs
│   └── App.tsx
```

---

## KEY CONCEPTS TO COVER

### 1. Compound Components là gì?

```typescript
// KHÔNG PHẢI Compound - Props drilling nightmare
<Tabs
  tabs={[
    { label: "Posts", content: <PostList /> },
    { label: "About", content: <AboutSection /> },
    { label: "Friends", content: <FriendsList /> }
  ]}
  activeTab={0}
  onChange={setActiveTab}
  tabStyle="underline"
  panelStyle="padded"
/>

// COMPOUND Pattern - Flexible & Readable
<Tabs defaultValue="posts">
  <Tabs.List>
    <Tabs.Tab value="posts">Posts</Tabs.Tab>
    <Tabs.Tab value="about">About</Tabs.Tab>
    <Tabs.Tab value="friends">Friends</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="posts"><PostList /></Tabs.Panel>
    <Tabs.Panel value="about"><AboutSection /></Tabs.Panel>
    <Tabs.Panel value="friends"><FriendsList /></Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

**Lợi ích:**
- Flexible API - User quyết định structure
- Readable - Dễ hiểu component hierarchy
- Customizable - Dễ thêm custom styling, components
- Separation of Concerns - Mỗi sub-component làm 1 việc

---

### 2. Approach 1: React.Children + cloneElement (Legacy)

```typescript
// Parent truyền props xuống children thông qua cloneElement
interface TabsProps {
  children: React.ReactNode;
  defaultIndex?: number;
}

function Tabs({ children, defaultIndex = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  // Clone children và inject props
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => setActiveIndex(index),
      });
    }
    return child;
  });

  return <div className="tabs">{enhancedChildren}</div>;
}
```

**Nhược điểm:**
- Chỉ works với direct children
- Khó debug
- TypeScript types phức tạp
- Fragile khi wrap children

---

### 3. Approach 2: Context API (Modern - Recommended)

```typescript
// 1. Tạo Context
interface TabsContextType {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

// 2. Custom hook để access context
function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return context;
}

// 3. Root component provides context
interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void;
}

function Tabs({ children, defaultValue, onChange }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue);

  const handleChange = (value: string) => {
    setActiveValue(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue: handleChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// 4. Sub-components consume context
interface TabProps {
  children: React.ReactNode;
  value: string;
}

function Tab({ children, value }: TabProps) {
  const { activeValue, setActiveValue } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      className={`tab ${isActive ? "tab-active" : ""}`}
      onClick={() => setActiveValue(value)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
}

// 5. Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export { Tabs };
```

---

### 4. TypeScript cho Compound Components

```typescript
// Định nghĩa compound component với sub-components
interface TabsComponent extends React.FC<TabsProps> {
  List: typeof TabList;
  Tab: typeof Tab;
  Panels: typeof TabPanels;
  Panel: typeof TabPanel;
}

// Hoặc dùng Object.assign
const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
}) as TabsComponent;
```

---

### 5. Accessibility (a11y) cho Tabs

```typescript
// TabList
<div role="tablist" aria-label="Profile sections">
  {children}
</div>

// Tab
<button
  role="tab"
  aria-selected={isActive}
  aria-controls={`panel-${value}`}
  id={`tab-${value}`}
  tabIndex={isActive ? 0 : -1}
>
  {children}
</button>

// TabPanel
<div
  role="tabpanel"
  id={`panel-${value}`}
  aria-labelledby={`tab-${value}`}
  hidden={!isActive}
>
  {children}
</div>
```

---

## REAL-WORLD EXAMPLES

### Radix UI Tabs
```typescript
import * as Tabs from "@radix-ui/react-tabs";

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>
```

### Headless UI Tabs
```typescript
import { Tab } from "@headlessui/react";

<Tab.Group>
  <Tab.List>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </Tab.List>
  <Tab.Panels>
    <Tab.Panel>Content 1</Tab.Panel>
    <Tab.Panel>Content 2</Tab.Panel>
  </Tab.Panels>
</Tab.Group>
```

### Chakra UI Tabs
```typescript
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

## INTERVIEW Q&A

### Q1: Compound Components là gì? Tại sao dùng?

**Answer:**
> Compound Components là pattern cho phép các components làm việc cùng nhau để tạo một UI hoàn chỉnh. Parent component quản lý state, các child components chia sẻ state thông qua Context.
>
> **Dùng khi:**
> - Component có nhiều parts liên quan (Tabs, Accordion, Menu)
> - Cần API flexible cho users
> - Muốn tránh prop drilling
>
> **Ví dụ:** `<select>` và `<option>` trong HTML là compound components.

---

### Q2: So sánh React.Children.map vs Context approach?

**Answer:**
| Aspect | Children.map + cloneElement | Context API |
|--------|---------------------------|-------------|
| Flexibility | Chỉ direct children | Bất kỳ depth nào |
| TypeScript | Khó type | Dễ type |
| Debug | Khó trace | Dễ trace |
| Performance | Clone mỗi render | Chỉ re-render khi context change |
| Recommendation | Legacy | Modern, preferred |

---

### Q3: Làm sao handle controlled vs uncontrolled Tabs?

**Answer:**
```typescript
interface TabsProps {
  // Uncontrolled
  defaultValue?: string;
  // Controlled
  value?: string;
  onChange?: (value: string) => void;
}

function Tabs({ defaultValue, value, onChange, children }: TabsProps) {
  // Internal state for uncontrolled
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  // Use external value if controlled
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue: handleChange }}>
      {children}
    </TabsContext.Provider>
  );
}
```

---

## EXERCISES

### Mini Exercise: Basic Tabs (30 phút)

**Mục tiêu:** Tạo Tabs component với Context API

**Requirements:**
```typescript
// Usage sẽ như thế này:
<Tabs defaultValue="posts">
  <Tabs.List>
    <Tabs.Tab value="posts">Posts</Tabs.Tab>
    <Tabs.Tab value="about">About</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="posts">Posts content here</Tabs.Panel>
    <Tabs.Panel value="about">About content here</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

**Checklist:**
- [ ] TabsContext với activeValue và setActiveValue
- [ ] useTabsContext hook với error handling
- [ ] Tabs root component với Provider
- [ ] TabList, Tab, TabPanels, TabPanel components
- [ ] Proper TypeScript types
- [ ] Basic Tailwind styling

---

### Real Exercise: ProfileTabs for Social App (60 phút)

**Mục tiêu:** Build ProfileTabs component hoàn chỉnh cho Social App

**Requirements:**

```typescript
// ProfileTabs với 4 tabs
<ProfileTabs userId={userId}>
  <ProfileTabs.List>
    <ProfileTabs.Tab value="posts" icon={<PostIcon />}>
      Posts <ProfileTabs.Badge count={42} />
    </ProfileTabs.Tab>
    <ProfileTabs.Tab value="about" icon={<InfoIcon />}>
      About
    </ProfileTabs.Tab>
    <ProfileTabs.Tab value="friends" icon={<UsersIcon />}>
      Friends <ProfileTabs.Badge count={128} />
    </ProfileTabs.Tab>
    <ProfileTabs.Tab value="photos" icon={<PhotoIcon />}>
      Photos <ProfileTabs.Badge count={56} />
    </ProfileTabs.Tab>
  </ProfileTabs.List>

  <ProfileTabs.Panels>
    <ProfileTabs.Panel value="posts">
      <PostList userId={userId} />
    </ProfileTabs.Panel>
    <ProfileTabs.Panel value="about">
      <AboutSection userId={userId} />
    </ProfileTabs.Panel>
    <ProfileTabs.Panel value="friends">
      <FriendsList userId={userId} />
    </ProfileTabs.Panel>
    <ProfileTabs.Panel value="photos">
      <PhotoGallery userId={userId} />
    </ProfileTabs.Panel>
  </ProfileTabs.Panels>
</ProfileTabs>
```

**Features:**
1. **Icons in tabs** - Tab có thể chứa icon
2. **Badge component** - Hiển thị count
3. **Underline indicator** - Active tab có underline animation
4. **Keyboard navigation** - Arrow keys để chuyển tab
5. **Responsive** - Stack vertical trên mobile
6. **Accessibility** - Proper ARIA attributes

**Styling (Tailwind):**
```typescript
// Tab styling
const tabStyles = {
  base: "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors",
  active: "text-blue-600 border-b-2 border-blue-600",
  inactive: "border-b-2 border-transparent",
};

// Badge styling
const badgeStyles = "ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full";
```

**Checklist:**
- [ ] ProfileTabs với Context
- [ ] Tab với icon support
- [ ] Badge sub-component
- [ ] Underline animation với Tailwind
- [ ] Keyboard navigation (ArrowLeft, ArrowRight)
- [ ] Mobile responsive (horizontal scroll hoặc stack)
- [ ] ARIA attributes đầy đủ
- [ ] Dark mode support

---

## SUCCESS CRITERIA

Session 2.1.1 hoàn thành khi:

- [ ] Hiểu Compound Components pattern
- [ ] Phân biệt được Children.map vs Context approach
- [ ] Hoàn thành Mini Exercise - Basic Tabs
- [ ] Hoàn thành Real Exercise - ProfileTabs
- [ ] ProfileTabs có keyboard navigation
- [ ] ProfileTabs accessible (ARIA)
- [ ] Code TypeScript không có errors
- [ ] Styling với Tailwind hoàn chỉnh

---

## COMMON PITFALLS

1. **Quên throw error trong useContext hook**
   ```typescript
   // ❌ Sai
   const context = useContext(TabsContext);
   return context; // có thể null

   // ✅ Đúng
   const context = useContext(TabsContext);
   if (!context) {
     throw new Error("Tab must be used within Tabs");
   }
   return context;
   ```

2. **Không handle controlled vs uncontrolled**
   - Luôn support cả 2 modes
   - Check `value !== undefined` để biết controlled

3. **Quên accessibility**
   - role="tablist", role="tab", role="tabpanel"
   - aria-selected, aria-controls, aria-labelledby

4. **Không dùng proper TypeScript**
   ```typescript
   // ✅ Dùng interface cho compound
   interface TabsComponent extends React.FC<TabsProps> {
     List: typeof TabList;
     Tab: typeof Tab;
   }
   ```

---

## DIFFICULTY & TIME ESTIMATE

**Độ khó:** Medium

**Thời gian dự kiến:**
- Theory & Concepts: 30 phút
- Mini Exercise (Basic Tabs): 30 phút
- Real Exercise (ProfileTabs): 60 phút
- Review & Polish: 20 phút

**Total:** ~2.5 hours

---

## READY TO START

**AI, please:**

1. **Setup Social App project** nếu chưa có
2. **Giải thích Compound Components** với ví dụ
3. **Guide Mini Exercise** - Basic Tabs step by step
4. **Guide Real Exercise** - ProfileTabs với tất cả features
5. **Review code** và suggest improvements

**Lưu ý quan trọng:**
- Dùng **Context approach** (không dùng cloneElement)
- Focus vào **TypeScript types** đúng chuẩn
- **Accessibility** là bắt buộc
- **Tailwind** cho tất cả styling

---

**VERSION:** 1.0
**CREATED:** 2025-01-13
**FOR:** Session 2.1.1 - Compound Components
**PROJECT:** Social App
**PREVIOUS SESSION:** 1.5.R - Review & Polish
**NEXT SESSION:** 2.1.2 - Advanced Patterns
