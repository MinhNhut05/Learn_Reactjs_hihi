# Session 1.3.3: useRef & useCallback - Complete Theory

## Muc luc (Table of Contents)

1. [useRef Fundamentals](#1-useref-fundamentals)
2. [useRef Use Cases](#2-useref-use-cases)
3. [useCallback Fundamentals](#3-usecallback-fundamentals)
4. [useCallback Use Cases](#4-usecallback-use-cases)
5. [When to Use vs NOT to Use](#5-when-to-use-vs-not-to-use)
6. [Common Mistakes & Fixes](#6-common-mistakes--fixes)
7. [Comparison Tables](#7-comparison-tables)

---

## 1. useRef Fundamentals

### 1.1 useRef la gi? (What is useRef?)

`useRef` la mot hook (hook) cho phep ban **tham chieu (reference)** den mot gia tri ma **khong trigger re-render** khi gia tri thay doi.

```tsx
import { useRef } from "react";

// Syntax co ban (Basic Syntax)
const ref = useRef<Type>(initialValue);

// ref.current chua gia tri hien tai
console.log(ref.current);
```

### 1.2 Dac diem chinh (Key Characteristics)

| Dac diem | Mo ta |
|----------|-------|
| **Persist across renders (ton tai qua cac lan render)** | Gia tri khong bi reset moi render |
| **No re-render (khong re-render)** | Thay doi `ref.current` KHONG trigger re-render |
| **Mutable (co the thay doi)** | Khac voi state, co the thay doi truc tiep |
| **Synchronous (dong bo)** | Thay doi ngay lap tuc, khong phai doi batch |

### 1.3 Syntax chi tiet (Detailed Syntax)

```tsx
// 1. DOM Reference (Tham chieu DOM)
const inputRef = useRef<HTMLInputElement>(null);
// Type: HTMLInputElement | null
// Initial: null (chua attach vao element nao)

// 2. Mutable Value (Gia tri co the thay doi)
const countRef = useRef<number>(0);
// Type: number
// Initial: 0

// 3. Generic Type Inference (Suy luan kieu)
const dataRef = useRef({ name: "John", age: 25 });
// Type: { name: string; age: number }
// Initial: { name: "John", age: 25 }
```

### 1.4 ref.current - Access va Modify

```tsx
function RefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);

  const handleClick = () => {
    // Access DOM element
    inputRef.current?.focus();

    // Modify value (khong trigger re-render!)
    countRef.current += 1;
    console.log("Count:", countRef.current); // Thay doi nhung UI KHONG update
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus & Count</button>
      <p>Count: {countRef.current}</p> {/* KHONG update tren UI! */}
    </div>
  );
}
```

### 1.5 useRef vs useState - Su khac biet quan trong

```tsx
function ComparisonExample() {
  // useState - trigger re-render
  const [stateCount, setStateCount] = useState(0);

  // useRef - KHONG trigger re-render
  const refCount = useRef(0);

  const incrementState = () => {
    setStateCount(prev => prev + 1); // Re-render xay ra
  };

  const incrementRef = () => {
    refCount.current += 1; // KHONG re-render
    console.log("Ref count:", refCount.current);
  };

  console.log("Component rendered"); // Chi log khi stateCount thay doi

  return (
    <div>
      <p>State: {stateCount}</p>
      <p>Ref: {refCount.current}</p> {/* Hien thi gia tri cu! */}
      <button onClick={incrementState}>+State</button>
      <button onClick={incrementRef}>+Ref (no UI update)</button>
    </div>
  );
}
```

---

## 2. useRef Use Cases

### 2.1 Use Case 1: DOM Access (Truy cap DOM)

**Kich ban (Scenario):** Focus input, scroll to element, measure dimensions

```tsx
function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // Null check quan trong!
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Hoac dung optional chaining
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

**Common DOM Element Types:**

| Element | Type |
|---------|------|
| `<input>` | `HTMLInputElement` |
| `<button>` | `HTMLButtonElement` |
| `<div>` | `HTMLDivElement` |
| `<form>` | `HTMLFormElement` |
| `<video>` | `HTMLVideoElement` |
| `<canvas>` | `HTMLCanvasElement` |

### 2.2 Use Case 2: Store Previous Value (Luu gia tri truoc do)

**Kich ban:** Track previous state value for comparison

```tsx
function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number | undefined>(undefined);

  // Update ref TRONG useEffect (sau khi render)
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current ?? "N/A"}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

**Giai thich flow:**
1. Render lan 1: count = 0, prevCount = undefined
2. useEffect chay: prevCount = 0
3. Click +1: count = 1, prevCount = 0 (vi ref update sau render)
4. useEffect chay: prevCount = 1

### 2.3 Use Case 3: Store Interval/Timeout IDs (Luu ID cua timer)

**Kich ban:** Timer can clear khi unmount hoac stop

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Luu intervalId trong ref, KHONG phai state!
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (isRunning) return; // Tranh nhieu interval

    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
    </div>
  );
}
```

**Tai sao dung ref thay vi state cho intervalId?**
- intervalId chi la internal value (gia tri noi bo)
- Thay doi intervalId KHONG can update UI
- Dung state se gay re-render khong can thiet

### 2.4 Use Case 4: Access DOM Measurements (Do kich thuoc DOM)

```tsx
function MeasureElement() {
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const measure = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  };

  return (
    <div>
      <div ref={divRef} style={{ padding: "20px", background: "#f0f0f0" }}>
        Resize the window and click measure
      </div>
      <button onClick={measure}>Measure</button>
      <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
    </div>
  );
}
```

---

## 3. useCallback Fundamentals

### 3.1 useCallback la gi? (What is useCallback?)

`useCallback` la mot hook cho phep ban **memoize (ghi nho)** mot function (ham) giua cac lan render. Function chi duoc tao lai khi dependencies (phu thuoc) thay doi.

```tsx
import { useCallback } from "react";

// Syntax co ban
const memoizedCallback = useCallback(
  () => {
    // function body
    doSomething(a, b);
  },
  [a, b] // Dependencies array (mang phu thuoc)
);
```

### 3.2 Tai sao can useCallback?

**Van de:** Moi lan component re-render, tat ca functions duoc tao moi.

```tsx
function ParentComponent() {
  const [count, setCount] = useState(0);

  // Function nay duoc TAO MOI moi lan render
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <ChildComponent onClick={handleClick} /> {/* Child re-render moi lan! */}
    </div>
  );
}

const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered"); // Log moi lan parent render!
  return <button onClick={onClick}>Child Button</button>;
});
```

**Giai phap:** Dung `useCallback` de giu nguyen reference (tham chieu) cua function.

### 3.3 Syntax chi tiet (Detailed Syntax)

```tsx
// 1. Basic useCallback
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []); // Khong co dependencies -> function khong bao gio thay doi

// 2. With dependencies
const handleSubmit = useCallback((data: FormData) => {
  console.log("Submitting:", data);
  console.log("User ID:", userId); // userId la dependency
}, [userId]); // Tao lai khi userId thay doi

// 3. With multiple dependencies
const calculate = useCallback(() => {
  return price * quantity * (1 - discount);
}, [price, quantity, discount]); // Tao lai khi bat ky gia tri nao thay doi
```

### 3.4 useCallback + React.memo Pattern

**Pattern quan trong nhat** cho performance optimization (toi uu hieu nang):

```tsx
// Parent Component
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Memoize callback
  const handleChildClick = useCallback(() => {
    console.log("Child clicked!");
  }, []); // Khong thay doi

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>

      {/* Child chi re-render khi handleChildClick thay doi (never) */}
      <MemoizedChild onClick={handleChildClick} />
    </div>
  );
}

// Memoized Child Component
const MemoizedChild = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
```

**Ket qua:**
- Type in input -> Parent re-render, Child KHONG re-render
- Click +1 -> Parent re-render, Child KHONG re-render
- Child chi render 1 lan luc mount (khi component duoc tao lan dau)

---

## 4. useCallback Use Cases

### 4.1 Use Case 1: Pass Callbacks to Memoized Children

```tsx
interface ButtonProps {
  onClick: () => void;
  label: string;
}

const MemoButton = React.memo(({ onClick, label }: ButtonProps) => {
  console.log(`Button "${label}" rendered`);
  return <button onClick={onClick}>{label}</button>;
});

function ButtonList() {
  const [count, setCount] = useState(0);

  // Memoized - chi tao 1 lan
  const handleAdd = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // Memoized - chi tao 1 lan
  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <MemoButton onClick={handleAdd} label="Add" />
      <MemoButton onClick={handleReset} label="Reset" />
    </div>
  );
}
```

### 4.2 Use Case 2: Dependency trong useEffect

```tsx
function DataFetcher({ userId }: { userId: string }) {
  const [data, setData] = useState(null);

  // Memoize fetch function
  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    const result = await response.json();
    setData(result);
  }, [userId]); // Chi tao lai khi userId thay doi

  // useEffect depend vao fetchData
  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData chi thay doi khi userId thay doi

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
```

### 4.3 Use Case 3: Event Handlers voi Closure (Bao dong)

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // SAI: Stale closure - count luon la 0
  const handleClickBad = useCallback(() => {
    console.log("Count:", count); // Luon log 0!
  }, []); // Missing dependency: count

  // DUNG: Fresh closure - count cap nhat
  const handleClickGood = useCallback(() => {
    console.log("Count:", count);
  }, [count]); // count la dependency

  // DUNG NHAT: Dung functional update de khong can dependency
  const increment = useCallback(() => {
    setCount(c => c + 1); // Khong can count trong deps
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={handleClickBad}>Log (stale)</button>
      <button onClick={handleClickGood}>Log (fresh)</button>
    </div>
  );
}
```

---

## 5. When to Use vs NOT to Use

### 5.1 Khi nao NEN dung useRef

| Nen dung | Vi du |
|----------|-------|
| Access DOM elements | Focus input, scroll, measure |
| Store previous value | Track previous state |
| Store mutable values | Interval IDs, timeout IDs |
| 3rd party library integration | Chart.js, D3, Google Maps |
| Values that don't affect UI | Internal counters, flags |

### 5.2 Khi nao KHONG nen dung useRef

| Khong nen dung | Vi sao |
|----------------|--------|
| Gia tri can hien thi tren UI | Dung useState de trigger re-render |
| Derived values (gia tri tinh toan) | Dung useMemo |
| Global state | Dung Context hoac state management |

### 5.3 Khi nao NEN dung useCallback

| Nen dung | Vi du |
|----------|-------|
| Pass callback to memoized child | `<MemoChild onClick={callback} />` |
| Dependency trong useEffect | `useEffect(() => {}, [callback])` |
| Expensive callback creation | Complex function initialization |
| Event handlers in lists | Avoid re-creating for each item |

### 5.4 Khi nao KHONG nen dung useCallback

```tsx
// KHONG CAN - khong pass to child
function Simple() {
  // Khong can useCallback!
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}

// KHONG CAN - child khong memoized
function Parent() {
  // Khong co tac dung vi Child khong dung React.memo
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return <Child onClick={handleClick} />; // Child khong memo = vo ich
}

// KHONG CAN - inline va don gian
function Form() {
  const [value, setValue] = useState("");

  // Khong can wrap useCallback cho inline handlers
  return <input onChange={e => setValue(e.target.value)} value={value} />;
}
```

---

## 6. Common Mistakes & Fixes

### 6.1 useRef Mistakes

```tsx
// SAI 1: Dung ref cho UI value
function Bad1() {
  const countRef = useRef(0);

  return (
    <div>
      <p>Count: {countRef.current}</p> {/* KHONG update! */}
      <button onClick={() => countRef.current++}>+1</button>
    </div>
  );
}

// DUNG: Dung useState cho UI
function Good1() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

// SAI 2: Khong null check
function Bad2() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current.focus(); // Error: current co the null!
  };
}

// DUNG: Null check voi optional chaining
function Good2() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current?.focus(); // Safe!
  };
}
```

### 6.2 useCallback Mistakes

```tsx
// SAI 1: Quen dependency - Stale closure
function Bad1() {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log(count); // Stale! Luon log gia tri cu
  }, []); // Missing: count
}

// DUNG: Them dependency
function Good1() {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log(count); // Fresh value
  }, [count]);
}

// SAI 2: Overuse - khong can thiet
function Bad2() {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // Vo ich neu khong pass to memoized child!

  return <button onClick={handleClick}>Click</button>;
}

// DUNG: Don gian la duoc
function Good2() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}

// SAI 3: Dung voi non-memoized child
function Bad3() {
  const callback = useCallback(() => {}, []);
  return <Child onClick={callback} />; // Child khong memo!
}

const Child = ({ onClick }) => { // Khong co React.memo
  return <button onClick={onClick}>Click</button>;
};

// DUNG: Child phai dung React.memo
const MemoChild = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

---

## 7. Comparison Tables

### 7.1 useRef vs useState

| Feature | useState | useRef |
|---------|----------|--------|
| Trigger re-render | Co (Yes) | Khong (No) |
| Persist across renders | Co | Co |
| Use for UI values | Co | Khong |
| Use for DOM access | Khong | Co |
| Use for mutable values | Khong | Co |
| Update syntax | `setState(new)` | `ref.current = new` |
| Type | `[value, setter]` | `{ current: value }` |

### 7.2 useCallback vs Regular Function

| Feature | useCallback | Regular function |
|---------|-------------|------------------|
| New reference each render | Khong (if deps same) | Co |
| Memoized | Co | Khong |
| Use with React.memo | Co | Breaks memoization |
| Has dependencies | Co | Khong |
| Memory overhead | Nho (small) | Khong |

### 7.3 Decision Matrix (Ma tran quyet dinh)

**Can luu gia tri?**
```
Gia tri anh huong UI?
├── Co -> useState
└── Khong -> useRef
```

**Can memoize function?**
```
Pass to child component?
├── Co
│   └── Child dung React.memo?
│       ├── Co -> useCallback
│       └── Khong -> Khong can
└── Khong -> Khong can
```

---

## Summary (Tom tat)

### useRef
- **Syntax:** `useRef<Type>(initialValue)`
- **Access:** `ref.current`
- **Dac diem:** Persist value, NO re-render
- **Use cases:** DOM access, previous value, timer IDs

### useCallback
- **Syntax:** `useCallback(fn, deps)`
- **Dac diem:** Memoize function reference
- **Use cases:** Pass to memoized children, useEffect dependency
- **Rule:** Chi dung khi co loi ich ro rang (measurable benefit)

### Golden Rules
1. **useRef** cho values khong anh huong UI
2. **useState** cho values can hien thi
3. **useCallback** CHI khi pass to React.memo children
4. Khong overuse - premature optimization is bad

---

**NEXT:** Lam 3 exercises de thuc hanh!
