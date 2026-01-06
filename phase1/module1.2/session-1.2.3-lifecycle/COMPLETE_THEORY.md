# Session 1.2.3: Component Lifecycle

## Overview

React components có lifecycle - từ lúc sinh ra (mount), tồn tại (update), đến khi mất đi (unmount). Hiểu lifecycle giúp bạn biết **khi nào** và **cách nào** để thực hiện side effects như fetch data, setup subscriptions, hay timers.

---

# PART 1: Lifecycle & useEffect Basics

> 📖 Đọc phần này trước khi làm Exercise 1

---

## 1. Component Lifecycle là gì?

Mỗi React component trải qua 3 phases:

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LIFECYCLE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   MOUNT              UPDATE              UNMOUNT             │
│   ┌────┐            ┌────┐              ┌────┐              │
│   │ 🟢 │ ────────▶ │ 🔄 │ ────────▶    │ 🔴 │              │
│   └────┘            └────┘              └────┘              │
│                                                              │
│   Component         Component           Component            │
│   xuất hiện         re-render           bị remove            │
│   lần đầu           (state/props        khỏi DOM             │
│                     thay đổi)                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.1 Mount (Mounting Phase)

- Component được **tạo ra lần đầu** và xuất hiện trên DOM
- Chạy **một lần duy nhất** khi component được render lần đầu
- Đây là lúc để: fetch initial data, setup subscriptions, add event listeners

```tsx
// Ví dụ: UserProfile mount khi user navigate đến trang profile
function UserProfile() {
  // Component này mount khi route là /profile
  return <div>User Profile</div>
}
```

### 1.2 Update (Updating Phase)

- Component **re-render** khi state hoặc props thay đổi
- Có thể xảy ra **nhiều lần** trong lifecycle của component
- Đây là lúc để: sync với external systems khi data thay đổi

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  // Mỗi khi click, state thay đổi → component UPDATE
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### 1.3 Unmount (Unmounting Phase)

- Component bị **remove khỏi DOM**
- Chạy **một lần duy nhất** trước khi component biến mất
- Đây là lúc để: cleanup subscriptions, clear timers, remove event listeners

```tsx
// UserProfile unmount khi user navigate đi khỏi /profile
// ➡️ Cần cleanup: clear intervals, unsubscribe, etc.
```

---

## 2. useEffect - Hook cho Side Effects

### 2.1 Side Effects là gì?

**Side effects** là những thứ xảy ra "bên ngoài" React render cycle:

- Fetch data từ API
- Thay đổi document title
- Setup event listeners
- Timers (setTimeout, setInterval)
- Subscriptions (WebSocket, Firebase, etc.)

### 2.2 useEffect Syntax

```tsx
useEffect(() => {
  // Effect code - chạy SAU mỗi render

  return () => {
    // Cleanup code - chạy TRƯỚC effect tiếp theo hoặc khi unmount
  }
}, [dependencies])
```

### 2.3 Dependencies Array - Quyết định khi nào effect chạy

```
┌────────────────────────────────────────────────────────────┐
│              DEPENDENCIES ARRAY CHEAT SHEET                 │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  useEffect(() => {}, [])     → Chạy MỘT LẦN khi mount      │
│                                                             │
│  useEffect(() => {}, [a, b]) → Chạy khi mount +            │
│                                 khi a hoặc b thay đổi       │
│                                                             │
│  useEffect(() => {})         → Chạy SAU MỖI render         │
│                                 (thường không nên dùng)     │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 3. useEffect với Empty Dependencies []

Khi dependencies là array rỗng `[]`, effect chỉ chạy **một lần khi mount**:

```tsx
function WelcomeMessage() {
  useEffect(() => {
    console.log('Component mounted!')
    // Chỉ log một lần khi component xuất hiện
  }, [])  // ← Empty array = chỉ chạy khi mount

  return <h1>Welcome!</h1>
}
```

**Use cases phổ biến:**
- Fetch initial data
- Setup one-time subscriptions
- Log analytics

---

## 4. useEffect với Dependencies [deps]

Khi có dependencies, effect chạy khi **mount + mỗi khi deps thay đổi**:

```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log(`Fetching user ${userId}`)
    // Fetch user data khi userId thay đổi
    fetchUser(userId).then(setUser)
  }, [userId])  // ← Chạy khi mount + khi userId thay đổi

  return <div>{user?.name}</div>
}
```

**Lưu ý:** React so sánh dependencies bằng `Object.is()` (shallow comparison)

---

## 5. useEffect không có Dependencies

Khi không có dependencies array, effect chạy **sau mỗi render**:

```tsx
function Logger({ value }) {
  useEffect(() => {
    console.log('Rendered with value:', value)
    // Log sau MỖI lần render
  })  // ← Không có dependencies = chạy sau mọi render

  return <div>{value}</div>
}
```

**⚠️ Cẩn thận:** Pattern này dễ gây infinite loops nếu effect update state!

---

## 6. Ví dụ Thực Tế: Lifecycle Logger

```tsx
function LifecycleDemo({ name }: { name: string }) {
  const [count, setCount] = useState(0)

  // Effect 1: Chỉ chạy khi MOUNT
  useEffect(() => {
    console.log(`🟢 ${name} MOUNTED`)

    return () => {
      console.log(`🔴 ${name} UNMOUNTED`)
    }
  }, [])

  // Effect 2: Chạy khi mount + mỗi khi count thay đổi
  useEffect(() => {
    console.log(`🔄 ${name} count changed to: ${count}`)
  }, [count])

  return (
    <div>
      <p>{name}: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  )
}

// Sử dụng:
function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
      {show && <LifecycleDemo name="Demo" />}
    </div>
  )
}
```

**Console output khi show = true:**
```
🟢 Demo MOUNTED
🔄 Demo count changed to: 0
```

**Click +1:**
```
🔄 Demo count changed to: 1
```

**Click Hide (show = false):**
```
🔴 Demo UNMOUNTED
```

---

## 7. Key Takeaways - Part 1

| Concept | Giải thích |
|---------|-----------|
| **Mount** | Component xuất hiện lần đầu trên DOM |
| **Update** | Component re-render do state/props thay đổi |
| **Unmount** | Component bị remove khỏi DOM |
| **useEffect(() => {}, [])** | Chạy một lần khi mount |
| **useEffect(() => {}, [a])** | Chạy khi mount + khi a thay đổi |
| **useEffect(() => {})** | Chạy sau mỗi render (cẩn thận!) |

---

# PART 2: Cleanup Functions & Practical Patterns

> 📖 Đọc phần này trước khi làm Exercise 2

---

## 8. Tại sao cần Cleanup?

### Problem: Memory Leaks

```tsx
// ❌ BAD: Timer chạy mãi mãi, ngay cả khi component unmount
function BadTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setSeconds(s => s + 1)  // Timer vẫn chạy sau khi component bị remove!
    }, 1000)
  }, [])

  return <div>{seconds}s</div>
}
```

**Vấn đề:**
- Component unmount nhưng interval vẫn chạy
- Cố gắng update state của component đã unmount
- **Memory leak** + **Console warning**

### Solution: Cleanup Function

```tsx
// ✅ GOOD: Clear interval khi unmount
function GoodTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)  // ← Cleanup!
    }
  }, [])

  return <div>{seconds}s</div>
}
```

---

## 9. Cleanup Function Hoạt động như nào?

```
┌─────────────────────────────────────────────────────────────┐
│                 CLEANUP FUNCTION TIMELINE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Mount:                                                      │
│  ┌──────────────────────────────────┐                       │
│  │ Effect runs (setup interval)     │                       │
│  └──────────────────────────────────┘                       │
│                                                              │
│  Update (deps changed):                                      │
│  ┌──────────────────────────────────┐                       │
│  │ 1. Cleanup runs (clear old)      │ ◄── Cleanup first!    │
│  │ 2. Effect runs (setup new)       │                       │
│  └──────────────────────────────────┘                       │
│                                                              │
│  Unmount:                                                    │
│  ┌──────────────────────────────────┐                       │
│  │ Cleanup runs (clear interval)    │ ◄── Cleanup only      │
│  └──────────────────────────────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Quan trọng:** Cleanup chạy:
1. **Trước mỗi effect tiếp theo** (khi deps thay đổi)
2. **Khi component unmount**

---

## 10. Pattern: Event Listeners

```tsx
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div>Mouse: {position.x}, {position.y}</div>
}
```

---

## 11. Pattern: Timers (setTimeout/setInterval)

### setTimeout

```tsx
function DelayedMessage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [])

  return show ? <p>Hello after 3 seconds!</p> : <p>Waiting...</p>
}
```

### setInterval

```tsx
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return  // Không setup interval nếu không running

    const intervalId = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])  // ← Re-run khi isRunning thay đổi

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}
```

---

## 12. Pattern: Fetch Data với Cleanup

```tsx
function UserData({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false  // Flag để cancel

    async function fetchUser() {
      setLoading(true)
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()

      if (!cancelled) {  // Chỉ update nếu chưa bị cancel
        setUser(data)
        setLoading(false)
      }
    }

    fetchUser()

    return () => {
      cancelled = true  // Cancel khi userId thay đổi hoặc unmount
    }
  }, [userId])

  if (loading) return <p>Loading...</p>
  return <div>{user?.name}</div>
}
```

**Tại sao cần cancel?**
- User có thể switch nhanh giữa các profiles
- Request cũ có thể complete sau request mới
- Không cancel → stale data hiển thị

---

## 13. Pattern: Countdown Timer

```tsx
function Countdown({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive || seconds <= 0) return

    const intervalId = setInterval(() => {
      setSeconds(s => s - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isActive, seconds])  // ← Cần cả isActive và seconds

  const reset = () => {
    setIsActive(false)
    setSeconds(initialSeconds)
  }

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

---

## 14. Common Mistakes & Fixes

### Mistake 1: Quên cleanup

```tsx
// ❌ BAD
useEffect(() => {
  const id = setInterval(() => {}, 1000)
  // Quên return cleanup!
}, [])

// ✅ GOOD
useEffect(() => {
  const id = setInterval(() => {}, 1000)
  return () => clearInterval(id)
}, [])
```

### Mistake 2: Sai dependencies

```tsx
// ❌ BAD: Missing dependency
useEffect(() => {
  fetchUser(userId)  // userId không có trong deps
}, [])

// ✅ GOOD
useEffect(() => {
  fetchUser(userId)
}, [userId])  // ← Thêm userId
```

### Mistake 3: Object/Array trong dependencies

```tsx
// ❌ BAD: Object tạo mới mỗi render → effect chạy liên tục
const options = { page: 1 }
useEffect(() => {
  fetch(url, options)
}, [options])  // ← options là object mới mỗi render!

// ✅ GOOD: Dùng primitive hoặc useMemo
useEffect(() => {
  fetch(url, { page: 1 })
}, [])  // ← Hoặc dùng useMemo cho options
```

---

## 15. Cleanup Checklist

Khi viết useEffect, luôn tự hỏi:

| Question | Nếu YES → Cần cleanup |
|----------|----------------------|
| Có setInterval không? | `clearInterval(id)` |
| Có setTimeout không? | `clearTimeout(id)` |
| Có addEventListener không? | `removeEventListener()` |
| Có subscribe không? | `unsubscribe()` |
| Có fetch/async không? | Cancel flag hoặc AbortController |

---

## 16. Key Takeaways - Part 2

| Pattern | Setup | Cleanup |
|---------|-------|---------|
| **Interval** | `setInterval()` | `clearInterval(id)` |
| **Timeout** | `setTimeout()` | `clearTimeout(id)` |
| **Event Listener** | `addEventListener()` | `removeEventListener()` |
| **Fetch** | `fetch()` | Cancel flag |
| **Subscription** | `subscribe()` | `unsubscribe()` |

---

## 17. Sẵn sàng làm Exercises!

Bây giờ bạn đã hiểu:
- ✅ Component lifecycle: mount, update, unmount
- ✅ useEffect với các loại dependencies
- ✅ Cleanup functions và tại sao cần chúng
- ✅ Common patterns: timers, event listeners, fetch

**Hãy làm Exercise 1 và 2 để thực hành!**
