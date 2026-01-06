# Session 1.3.2: useEffect Mastery - Complete Theory

> **Hook khó nhất và hay bị lạm dụng nhất trong React**

---

## 📚 Mục lục

1. [useEffect Fundamentals](#1-useeffect-fundamentals)
2. [Dependencies Array Deep Dive](#2-dependencies-array-deep-dive)
3. [Cleanup Functions](#3-cleanup-functions)
4. [Data Fetching Patterns](#4-data-fetching-patterns)
5. [Common Mistakes & Fixes](#5-common-mistakes--fixes)
6. [When NOT to Use useEffect](#6-when-not-to-use-useeffect)

---

## 1. useEffect Fundamentals

### 1.1. Effect là gì?

**Side Effect** = Bất kỳ thao tác nào tương tác với "thế giới bên ngoài" React:

```
┌─────────────────────────────────────────────────────────────────┐
│                         REACT WORLD                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│  │    State    │ →  │   Render    │ →  │     DOM     │          │
│  └─────────────┘    └─────────────┘    └─────────────┘          │
│                            ↓                                     │
│                     ┌─────────────┐                              │
│                     │  useEffect  │ ← Side Effects happen here   │
│                     └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      OUTSIDE WORLD                               │
│  • API calls (fetch, axios)                                      │
│  • Browser APIs (localStorage, document.title)                   │
│  • Event listeners (window.resize, scroll)                       │
│  • Timers (setTimeout, setInterval)                              │
│  • Third-party libraries                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2. Syntax cơ bản

```tsx
useEffect(
  () => {
    // Effect code runs AFTER render

    return () => {
      // Cleanup code (optional)
    };
  },
  [dependencies] // Dependency array (optional)
);
```

### 1.3. Effect Timing - Khi nào effect chạy?

```
Component Lifecycle với useEffect:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. MOUNT (Component xuất hiện lần đầu)
   ┌──────────────────────────────────────────────┐
   │ Initial Render → DOM Update → useEffect runs │
   └──────────────────────────────────────────────┘

2. UPDATE (State hoặc props thay đổi)
   ┌─────────────────────────────────────────────────────────────────┐
   │ Re-render → DOM Update → Cleanup (prev effect) → New effect    │
   └─────────────────────────────────────────────────────────────────┘

3. UNMOUNT (Component biến mất)
   ┌──────────────────────────────────────────────┐
   │ Cleanup runs → Component removed from DOM    │
   └──────────────────────────────────────────────┘
```

**Quan trọng:** Effect chạy SAU khi React đã render và cập nhật DOM!

```tsx
function Example() {
  console.log("1. Render"); // Runs first

  useEffect(() => {
    console.log("2. Effect"); // Runs after DOM update
  });

  return <div>Hello</div>;
}

// Console output:
// 1. Render
// 2. Effect
```

### 1.4. So sánh useEffect với Class Lifecycle

```tsx
// Class Component (Legacy)
class MyComponent extends React.Component {
  componentDidMount() {
    // Setup: API calls, subscriptions
  }

  componentDidUpdate(prevProps, prevState) {
    // Response to changes
  }

  componentWillUnmount() {
    // Cleanup: remove subscriptions
  }
}

// Function Component (Modern)
function MyComponent() {
  useEffect(() => {
    // = componentDidMount + componentDidUpdate

    return () => {
      // = componentWillUnmount
    };
  }, [dependencies]);
}
```

---

## 2. Dependencies Array Deep Dive

### 2.1. Ba trường hợp của Dependencies

```tsx
// CASE 1: No dependency array = Runs EVERY render
useEffect(() => {
  console.log("Runs on EVERY render");
});
// ⚠️ DANGEROUS: Usually not what you want!

// CASE 2: Empty array = Runs ONCE on mount
useEffect(() => {
  console.log("Runs ONCE on mount");
}, []);
// ✅ Good for: Initial setup, one-time API calls

// CASE 3: With dependencies = Runs when dependencies change
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
// ✅ Good for: Reacting to specific state/props changes
```

### 2.2. Visual: Dependencies Array Behavior

```
┌────────────────────────────────────────────────────────────────────┐
│                    DEPENDENCIES ARRAY CHEAT SHEET                  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  useEffect(() => {...})          → Runs: Mount + EVERY Update     │
│                                     ⚠️ Usually a bug!             │
│                                                                    │
│  useEffect(() => {...}, [])      → Runs: Mount only               │
│                                     ✅ One-time setup              │
│                                                                    │
│  useEffect(() => {...}, [a])     → Runs: Mount + when 'a' changes │
│                                     ✅ React to 'a'                │
│                                                                    │
│  useEffect(() => {...}, [a, b])  → Runs: Mount + when a OR b      │
│                                     changes                        │
│                                     ✅ React to multiple values    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 2.3. How React Compares Dependencies

React dùng **Object.is()** để so sánh dependencies:

```tsx
// Primitive values (number, string, boolean)
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count changed to:", count);
}, [count]);
// ✅ Works: Object.is(0, 1) = false → effect runs

// Objects & Arrays - BE CAREFUL!
const [user, setUser] = useState({ name: "John" });

useEffect(() => {
  console.log("User changed:", user);
}, [user]);
// ⚠️ setUser({ name: "John" }) → NEW object → effect runs again!
// Object.is({name: "John"}, {name: "John"}) = false (different references)
```

### 2.4. Common Dependency Patterns

```tsx
// ✅ Pattern 1: Primitives as dependencies
const [count, setCount] = useState(0);
const [name, setName] = useState("");

useEffect(() => {
  document.title = `${name} clicked ${count} times`;
}, [count, name]);

// ✅ Pattern 2: Props as dependencies
function UserProfile({ userId }: { userId: string }) {
  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // Re-fetch when userId changes
}

// ⚠️ Pattern 3: Object properties (extract primitive)
const user = { id: 1, name: "John" };

// ❌ Bad: Object changes reference on every render
useEffect(() => {}, [user]);

// ✅ Good: Extract the specific property
useEffect(() => {}, [user.id]);

// ✅ Pattern 4: Functions in dependencies
function SearchComponent({ query }: { query: string }) {
  const search = useCallback(() => {
    // search logic
  }, [query]);

  useEffect(() => {
    search();
  }, [search]); // Function wrapped in useCallback
}
```

### 2.5. ESLint Rule: exhaustive-deps

```tsx
// React's ESLint plugin sẽ warn nếu bạn bỏ sót dependencies

const [count, setCount] = useState(0);
const [name, setName] = useState("");

// ⚠️ ESLint Warning: React Hook useEffect has a missing dependency: 'name'
useEffect(() => {
  console.log(count, name);
}, [count]); // Missing 'name'!

// ✅ Fixed
useEffect(() => {
  console.log(count, name);
}, [count, name]);
```

**Nguyên tắc:** LUÔN thêm tất cả values từ component scope mà effect sử dụng vào dependencies array!

---

## 3. Cleanup Functions

### 3.1. Tại sao cần Cleanup?

**Memory Leak** = Khi component bị unmount nhưng vẫn còn:
- Event listeners đang lắng nghe
- Timers đang chạy
- Network requests đang pending
- Subscriptions chưa được hủy

```tsx
// ❌ Memory Leak Example
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);

    // ❌ MISSING CLEANUP!
    // When component unmounts, listener still exists
    // Tries to setPosition on unmounted component → Error!
  }, []);
}
```

### 3.2. Cleanup Function Syntax

```tsx
useEffect(() => {
  // SETUP: Runs when effect executes
  const handleMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener("mousemove", handleMove);

  // CLEANUP: Returned function runs:
  // 1. Before the effect runs again (on update)
  // 2. When component unmounts
  return () => {
    window.removeEventListener("mousemove", handleMove);
  };
}, []);
```

### 3.3. Cleanup Execution Timeline

```
Timeline với Cleanup:
━━━━━━━━━━━━━━━━━━━━━

Mount:
┌──────────────────────────────────────────┐
│ Render → DOM Update → Effect (Setup)    │
└──────────────────────────────────────────┘

Update (when dependency changes):
┌────────────────────────────────────────────────────────────────┐
│ Render → DOM Update → Cleanup (old) → Effect (new setup)      │
└────────────────────────────────────────────────────────────────┘

Unmount:
┌──────────────────────────────────────────┐
│ Cleanup runs → Component removed         │
└──────────────────────────────────────────┘
```

### 3.4. Common Cleanup Patterns

#### Pattern 1: Event Listeners

```tsx
function WindowSizeTracker() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>Window: {size.width} x {size.height}</div>;
}
```

#### Pattern 2: Timers (setInterval)

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

#### Pattern 3: Timers (setTimeout)

```tsx
function DelayedMessage({ message }: { message: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return show ? <div>{message}</div> : <div>Loading...</div>;
}
```

#### Pattern 4: AbortController for Fetch

```tsx
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`/api/users/${userId}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

---

## 4. Data Fetching Patterns

### 4.1. Basic Data Fetching

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 4.2. Race Condition Problem

**Race Condition** xảy ra khi có nhiều requests đồng thời và response trả về không theo thứ tự:

```
Timeline của Race Condition:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

User types: "A" → "AB" → "ABC" nhanh liên tục

Time →
┌────────────────────────────────────────────────────────────────────┐
│ Request 1: "A"   ─────────────────────────────→ Response 1 (slow)  │
│ Request 2: "AB"  ────────→ Response 2 (fast)                       │
│ Request 3: "ABC" ──────────────→ Response 3 (medium)               │
└────────────────────────────────────────────────────────────────────┘

Expected: Show results for "ABC" (latest)
Actual:   Show results for "A" (Response 1 arrives last!)

❌ BUG: User sees stale data!
```

### 4.3. Solving Race Conditions

#### Solution 1: ignore flag

```tsx
function SearchUsers({ query }: { query: string }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let ignore = false; // Flag to track if effect is still "current"

    fetch(`/api/users?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          // Only update if this effect hasn't been cleaned up
          setUsers(data);
        }
      });

    return () => {
      ignore = true; // Cleanup: mark this effect as "stale"
    };
  }, [query]);

  return <UserList users={users} />;
}
```

#### Solution 2: AbortController (Recommended)

```tsx
function SearchUsers({ query }: { query: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/users?q=${query}`, {
          signal: abortController.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          // Don't set error for aborted requests
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <UserList users={users} />
    </div>
  );
}
```

### 4.4. Complete Data Fetching Pattern

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface FetchState {
  users: User[];
  loading: boolean;
  error: string | null;
}

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState<FetchState>({
    users: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Don't fetch if search term is empty
    if (!searchTerm.trim()) {
      setState({ users: [], loading: false, error: null });
      return;
    }

    const abortController = new AbortController();

    const fetchUsers = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?username_like=${searchTerm}`,
          { signal: abortController.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: User[] = await res.json();
        setState({ users: data, loading: false, error: null });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err.message,
          }));
        }
      }
    };

    fetchUsers();

    return () => {
      abortController.abort();
    };
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />

      {state.loading && <p>Loading...</p>}
      {state.error && <p style={{ color: "red" }}>Error: {state.error}</p>}

      <ul>
        {state.users.map((user) => (
          <li key={user.id}>
            {user.name} (@{user.username})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 5. Common Mistakes & Fixes

### 5.1. Infinite Loop

```tsx
// ❌ INFINITE LOOP - Missing dependencies
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Changes count → triggers effect → changes count → ...
  }); // No dependency array = runs every render!
}

// ❌ INFINITE LOOP - Object as dependency
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const filters = { page: 1 }; // NEW object every render!

  useEffect(() => {
    fetch("/api/users").then((res) => res.json()).then(setUsers);
  }, [filters]); // filters changes every render → infinite loop!
}

// ✅ FIX 1: Use primitive value
useEffect(() => {
  fetch("/api/users").then((res) => res.json()).then(setUsers);
}, [page]); // page is a number

// ✅ FIX 2: useMemo for objects
const filters = useMemo(() => ({ page }), [page]);
```

### 5.2. Missing Dependencies

```tsx
// ❌ Missing dependency - ESLint will warn
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(setResults);
  }, []); // ⚠️ Missing 'query'! Won't re-fetch when query changes
}

// ✅ Fix: Add query to dependencies
useEffect(() => {
  fetchResults(query).then(setResults);
}, [query]);
```

### 5.3. Stale Closures

```tsx
// ❌ Stale closure - count is always 0 inside interval
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // Always logs 0! (stale closure)
      setCount(count + 1); // Always sets to 1!
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps = count is captured once at 0
}

// ✅ Fix 1: Add count to dependencies (but creates new interval each change)
useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [count]);

// ✅ Fix 2: Use functional update (recommended)
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => prev + 1); // Always uses current value
  }, 1000);

  return () => clearInterval(interval);
}, []); // No need for count in deps!
```

### 5.4. No Cleanup for Subscriptions

```tsx
// ❌ Memory leak - no cleanup
useEffect(() => {
  window.addEventListener("resize", handleResize);
  // Component unmounts but listener still exists!
}, []);

// ✅ Fix: Always cleanup subscriptions
useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

### 5.5. Async Function Directly in useEffect

```tsx
// ❌ Can't make useEffect callback async directly
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []); // ERROR: useEffect expects cleanup function, not Promise

// ✅ Fix: Define async function inside
useEffect(() => {
  const fetchDataAsync = async () => {
    const data = await fetchData();
    setData(data);
  };

  fetchDataAsync();
}, []);

// ✅ Alternative: IIFE (Immediately Invoked Function Expression)
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

---

## 6. When NOT to Use useEffect

### 6.1. Don't Use Effect for Derived State

```tsx
// ❌ Bad: Using effect to compute derived state
function FilteredList({ items, filter }: Props) {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(items.filter((i) => i.includes(filter)));
  }, [items, filter]);
  // Unnecessary re-render cycle!
}

// ✅ Good: Compute during render
function FilteredList({ items, filter }: Props) {
  const filteredItems = items.filter((i) => i.includes(filter));
  // or use useMemo if computation is expensive:
  // const filteredItems = useMemo(() => items.filter(...), [items, filter]);
}
```

### 6.2. Don't Use Effect for Event Handlers

```tsx
// ❌ Bad: Tracking clicks with effect
function Button() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log(`Button clicked ${clicks} times`);
  }, [clicks]);

  return <button onClick={() => setClicks(c => c + 1)}>Click</button>;
}

// ✅ Good: Log directly in event handler
function Button() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    console.log(`Button clicked ${newClicks} times`);
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### 6.3. Don't Use Effect for Props Sync

```tsx
// ❌ Bad: Syncing props to state with effect
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [localUserId, setLocalUserId] = useState(userId);

  useEffect(() => {
    setLocalUserId(userId);
  }, [userId]);
  // Unnecessary! Just use userId directly
}

// ✅ Good: Use props directly or with key
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  // Just use userId directly!
}

// Or reset component completely with key:
<UserProfile key={userId} userId={userId} />
```

### 6.4. When TO Use useEffect

```tsx
// ✅ Use for: Synchronization with external systems
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);

// ✅ Use for: Browser APIs
useEffect(() => {
  document.title = `You have ${unreadCount} messages`;
}, [unreadCount]);

// ✅ Use for: Data fetching (until you have a better solution)
useEffect(() => {
  fetchData().then(setData);
}, []);

// ✅ Use for: Event listeners on window/document
useEffect(() => {
  window.addEventListener("online", handleOnline);
  return () => window.removeEventListener("online", handleOnline);
}, []);
```

---

## 📊 Quick Reference Cheat Sheet

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      useEffect CHEAT SHEET                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  SYNTAX:                                                                │
│  useEffect(() => { setup; return cleanup; }, [dependencies]);          │
│                                                                         │
│  DEPENDENCIES:                                                          │
│  • No array      → Runs every render (usually a bug!)                   │
│  • Empty []      → Runs once on mount                                   │
│  • [a, b]        → Runs on mount + when a or b changes                  │
│                                                                         │
│  CLEANUP NEEDED FOR:                                                    │
│  • Event listeners    → removeEventListener()                           │
│  • Timers             → clearInterval() / clearTimeout()                │
│  • Fetch requests     → AbortController.abort()                         │
│  • Subscriptions      → unsubscribe()                                   │
│                                                                         │
│  COMMON MISTAKES:                                                       │
│  • Infinite loop      → Missing or wrong dependencies                   │
│  • Stale closure      → Use functional updates                          │
│  • Memory leak        → Missing cleanup                                 │
│  • Race condition     → Use AbortController or ignore flag              │
│                                                                         │
│  DON'T USE FOR:                                                         │
│  • Derived state (compute during render)                                │
│  • Event handler logic (put in handler)                                 │
│  • Props sync (use props directly)                                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Resources

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [React Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React Docs: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [A Complete Guide to useEffect (Dan Abramov)](https://overreacted.io/a-complete-guide-to-useeffect/)

---

**Next:** Làm 3 exercises để thực hành các concepts này!
