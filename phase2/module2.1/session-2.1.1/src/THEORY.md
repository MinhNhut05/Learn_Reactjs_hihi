# Compound Components Pattern - Lý thuyết

## 📖 Mục lục

1. [Compound Components là gì?](#1-compound-components-là-gì)
2. [Vấn đề với cách truyền thống](#2-vấn-đề-với-cách-truyền-thống)
3. [Giải pháp: Compound Components](#3-giải-pháp-compound-components)
4. [Context API Approach](#4-context-api-approach)
5. [TypeScript cho Compound Components](#5-typescript-cho-compound-components)
6. [Real-world Examples](#6-real-world-examples)

---

## 1. Compound Components là gì?

**Compound Components** là một React pattern cho phép nhiều components **làm việc cùng nhau** để tạo thành một UI hoàn chỉnh.

### Ví dụ trong HTML

Bạn đã dùng compound components mà không biết - trong HTML:

```html
<select>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
  <option value="c">Option C</option>
</select>
```

- `<select>` là **parent** - quản lý state (value được chọn)
- `<option>` là **children** - hiển thị lựa chọn
- Chúng **"hiểu nhau"** mà không cần truyền props explicit

### Đặc điểm chính

1. **Implicit State Sharing** - Components chia sẻ state "ngầm" thông qua Context
2. **Flexible API** - User quyết định cấu trúc, không bị ràng buộc bởi props
3. **Declarative** - Code dễ đọc, dễ hiểu
4. **Separation of Concerns** - Mỗi component làm một việc

---

## 2. Vấn đề với cách truyền thống

### ❌ Cách truyền thống: Props Configuration

```tsx
// Component với API "config object"
<Tabs
  tabs={[
    {
      id: "posts",
      label: "Posts",
      content: <PostList />,
      icon: <PostIcon />,
      badge: 42,
      disabled: false
    },
    {
      id: "about",
      label: "About",
      content: <AboutSection />,
      icon: <InfoIcon />
    },
    {
      id: "friends",
      label: "Friends",
      content: <FriendsList />,
      icon: <UsersIcon />,
      badge: 128
    }
  ]}
  defaultActiveTab="posts"
  onChange={(tabId) => console.log(tabId)}
  variant="underline"
  size="medium"
  showDivider={true}
  tabClassName="custom-tab"
  panelClassName="custom-panel"
  // ... còn nhiều props nữa 😱
/>
```

### Vấn đề:

| Vấn đề | Mô tả |
|--------|-------|
| **Props Explosion** | Quá nhiều props, khó nhớ hết |
| **Inflexible** | Muốn thêm custom content giữa các tab? Không được! |
| **TypeScript Hell** | Type cho `tabs` array rất phức tạp |
| **Hard to Customize** | Muốn style tab thứ 2 khác? Phải thêm props |
| **Tightly Coupled** | Logic và UI bị gắn chặt với nhau |

---

## 3. Giải pháp: Compound Components

### ✅ Compound Components API

```tsx
<Tabs defaultValue="posts">
  <Tabs.List>
    <Tabs.Tab value="posts">
      <PostIcon />
      Posts
      <Badge count={42} />
    </Tabs.Tab>

    <Tabs.Tab value="about">
      <InfoIcon />
      About
    </Tabs.Tab>

    <Tabs.Tab value="friends">
      <UsersIcon />
      Friends
      <Badge count={128} />
    </Tabs.Tab>
  </Tabs.List>

  {/* Có thể thêm custom content ở đây! */}
  <div className="my-custom-divider" />

  <Tabs.Panels>
    <Tabs.Panel value="posts">
      <PostList />
    </Tabs.Panel>

    <Tabs.Panel value="about">
      <AboutSection />
    </Tabs.Panel>

    <Tabs.Panel value="friends">
      <FriendsList />
    </Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

### Lợi ích:

| Lợi ích | Mô tả |
|---------|-------|
| **Flexible** | User quyết định structure, có thể thêm bất kỳ content nào |
| **Readable** | Nhìn code biết ngay UI structure |
| **Customizable** | Style từng tab riêng biệt dễ dàng |
| **TypeScript Friendly** | Mỗi component có types riêng, đơn giản |
| **Separation of Concerns** | Mỗi component làm một việc rõ ràng |

---

## 4. Context API Approach

Đây là cách **hiện đại và recommended** để implement Compound Components.

### Cách hoạt động:

```
┌─────────────────────────────────────────────────────┐
│  Tabs (Root Component)                              │
│  ┌───────────────────────────────────────────────┐  │
│  │  TabsContext.Provider                         │  │
│  │  value = { activeValue, setActiveValue }      │  │
│  │                                               │  │
│  │     ┌─────────────┐    ┌─────────────┐       │  │
│  │     │  Tabs.List  │    │ Tabs.Panels │       │  │
│  │     │             │    │             │       │  │
│  │     │  ┌───────┐  │    │  ┌───────┐  │       │  │
│  │     │  │Tab    │──┼────┼─▶│Panel  │  │       │  │
│  │     │  │value= │  │    │  │value= │  │       │  │
│  │     │  │"posts"│  │    │  │"posts"│  │       │  │
│  │     │  └───────┘  │    │  └───────┘  │       │  │
│  │     │      ↑      │    │      ↑      │       │  │
│  │     │      │      │    │      │      │       │  │
│  │     │  useContext │    │  useContext │       │  │
│  │     └─────────────┘    └─────────────┘       │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Step-by-step Implementation:

#### Step 1: Tạo Context

```tsx
import { createContext } from 'react';

// 1. Định nghĩa type cho Context
interface TabsContextType {
  activeValue: string;           // Tab nào đang active
  setActiveValue: (value: string) => void;  // Function để đổi tab
}

// 2. Tạo Context với default value là null
const TabsContext = createContext<TabsContextType | null>(null);
```

**Giải thích:**
- `TabsContextType` định nghĩa shape của context value
- Default value là `null` vì khi component được dùng ngoài Provider, ta muốn throw error

#### Step 2: Tạo Custom Hook

```tsx
import { useContext } from 'react';

function useTabsContext() {
  const context = useContext(TabsContext);

  // Throw error nếu dùng ngoài Provider
  if (!context) {
    throw new Error(
      'Tabs components must be used within <Tabs>. ' +
      'Wrap your Tab, TabList, TabPanel inside a Tabs component.'
    );
  }

  return context;
}
```

**Giải thích:**
- Hook này đảm bảo context luôn có giá trị
- Error message giúp developer biết vấn đề ngay

#### Step 3: Tạo Root Component (Provider)

```tsx
import { useState, ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
}

function Tabs({ children, defaultValue }: TabsProps) {
  // State quản lý tab active
  const [activeValue, setActiveValue] = useState(defaultValue);

  return (
    // Provide context cho tất cả children
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabsContext.Provider>
  );
}
```

**Giải thích:**
- Root component giữ state (`activeValue`)
- Wrap children trong `Provider` để share state

#### Step 4: Tạo Sub-components

```tsx
// TabList - wrapper cho các Tab buttons
function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="tab-list">
      {children}
    </div>
  );
}

// Tab - button để chuyển tab
function Tab({ children, value }: { children: ReactNode; value: string }) {
  // Lấy context
  const { activeValue, setActiveValue } = useTabsContext();

  // Check nếu tab này đang active
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => setActiveValue(value)}
      className={isActive ? 'tab active' : 'tab'}
    >
      {children}
    </button>
  );
}

// TabPanels - wrapper cho các Panel
function TabPanels({ children }: { children: ReactNode }) {
  return (
    <div className="tab-panels">
      {children}
    </div>
  );
}

// TabPanel - content của mỗi tab
function TabPanel({ children, value }: { children: ReactNode; value: string }) {
  const { activeValue } = useTabsContext();

  // Chỉ render nếu panel này active
  if (activeValue !== value) {
    return null;
  }

  return (
    <div className="tab-panel">
      {children}
    </div>
  );
}
```

#### Step 5: Attach Sub-components

```tsx
// Cách 1: Object.assign
const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
});

// Export
export { Tabs };
```

**Kết quả:**
```tsx
// Giờ có thể dùng như này:
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

## 5. TypeScript cho Compound Components

### Định nghĩa Types

```tsx
import { ReactNode } from 'react';

// Context type
interface TabsContextType {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

// Props types
interface TabsProps {
  children: ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void;
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

interface TabProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
  className?: string;
}
```

### Compound Component Type

```tsx
// Định nghĩa type cho compound component
interface TabsComponent extends React.FC<TabsProps> {
  List: React.FC<TabListProps>;
  Tab: React.FC<TabProps>;
  Panels: React.FC<TabPanelsProps>;
  Panel: React.FC<TabPanelProps>;
}

// Cách tạo với đúng type
const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
}) as TabsComponent;
```

---

## 6. Real-world Examples

### Radix UI Tabs
```tsx
import * as Tabs from '@radix-ui/react-tabs';

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
```tsx
import { Tab } from '@headlessui/react';

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
```tsx
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

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

## Tóm tắt

| Concept | Mô tả |
|---------|-------|
| **Compound Components** | Pattern cho phép components share state implicitly |
| **Context API** | Cách modern để implement, flexible, TypeScript friendly |
| **Provider Pattern** | Root component provide context, children consume |
| **Custom Hook** | Hook với error handling khi dùng ngoài Provider |
| **Object.assign** | Cách attach sub-components vào main component |

---

## Tiếp theo

Đã hiểu lý thuyết? Bắt đầu làm bài tập:

**File:** `exercises/01-BasicTabs.tsx`

Mở file và làm theo hướng dẫn! 💪
