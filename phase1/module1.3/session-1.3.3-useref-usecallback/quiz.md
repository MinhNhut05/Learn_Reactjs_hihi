# Session 1.3.3 Quiz - useRef & useCallback

**Pass Criteria (Tieu chi dat):** >= 8/10 cau dung

---

## Question 1: useRef Syntax

`useRef` tra ve (returns) gi?

A) Mot gia tri don (single value)
B) Mot array `[value, setValue]`
C) Mot object `{ current: value }`
D) Mot function de update value

<details>
<summary>Dap an (Answer)</summary>

**C) Mot object `{ current: value }`**

`useRef` tra ve mot object co property (thuoc tinh) `current` chua gia tri hien tai.

```tsx
const ref = useRef(0);
console.log(ref); // { current: 0 }
console.log(ref.current); // 0
```

</details>

---

## Question 2: useRef vs useState

Diem khac biet chinh (main difference) giua `useRef` va `useState` la gi?

A) `useRef` chi dung cho DOM elements
B) `useState` nhanh hon (faster) `useRef`
C) `useRef` KHONG trigger re-render khi thay doi, `useState` co
D) `useRef` chi dung trong class components

<details>
<summary>Dap an (Answer)</summary>

**C) `useRef` KHONG trigger re-render khi thay doi, `useState` co**

- `useRef`: Thay doi `ref.current` -> KHONG re-render
- `useState`: Goi `setState` -> component RE-RENDER

Day la diem khac biet quan trong nhat. `useRef` dung cho values khong can hien thi tren UI.

</details>

---

## Question 3: DOM Reference Type

Khi tao ref cho mot `<input>` element, type nao dung nhat?

A) `useRef<HTMLElement>(null)`
B) `useRef<HTMLInputElement>(null)`
C) `useRef<InputElement>(null)`
D) `useRef<Input>(null)`

<details>
<summary>Dap an (Answer)</summary>

**B) `useRef<HTMLInputElement>(null)`**

Moi HTML element co type rieng:
- `<input>` -> `HTMLInputElement`
- `<button>` -> `HTMLButtonElement`
- `<div>` -> `HTMLDivElement`
- `<form>` -> `HTMLFormElement`

</details>

---

## Question 4: Null Check

Tai sao can null check khi access `ref.current` cho DOM elements?

A) Vi TypeScript yeu cau
B) Vi ref.current co the la `null` truoc khi component mount
C) Vi DOM co the bi xoa
D) Khong can null check

<details>
<summary>Dap an (Answer)</summary>

**B) Vi ref.current co the la `null` truoc khi component mount**

Khi khoi tao: `useRef<HTMLInputElement>(null)` -> `current` = `null`
Sau khi mount: `current` = actual DOM element

Nen can check truoc khi access methods:
```tsx
// Cach 1: Optional chaining
inputRef.current?.focus();

// Cach 2: If check
if (inputRef.current) {
  inputRef.current.focus();
}
```

</details>

---

## Question 5: Previous Value Pattern

De luu previous value cua mot state, ban can:

A) Dung useState khac
B) Dung useRef va update trong useEffect
C) Dung useMemo
D) Dung useCallback

<details>
<summary>Dap an (Answer)</summary>

**B) Dung useRef va update trong useEffect**

Pattern (mau):
```tsx
const [count, setCount] = useState(0);
const prevCountRef = useRef<number | undefined>(undefined);

useEffect(() => {
  // Update ref SAU khi render
  prevCountRef.current = count;
}, [count]);
```

Tai sao useEffect? Vi useEffect chay SAU render, nen `prevCountRef.current` se la gia tri truoc khi update.

</details>

---

## Question 6: Timer ID Storage

Tai sao nen luu interval ID trong `useRef` thay vi `useState`?

A) Vi `useRef` nhanh hon
B) Vi interval ID can hien thi tren UI
C) Vi thay doi interval ID KHONG can trigger re-render
D) Vi `useState` khong the luu numbers

<details>
<summary>Dap an (Answer)</summary>

**C) Vi thay doi interval ID KHONG can trigger re-render**

Interval ID chi la internal value (gia tri noi bo):
- Khong can hien thi tren UI
- Thay doi no khong can update giao dien
- Dung `useState` se gay re-render khong can thiet

```tsx
const intervalRef = useRef<number | null>(null);

const start = () => {
  intervalRef.current = window.setInterval(() => {
    // ...
  }, 1000);
};
```

</details>

---

## Question 7: useCallback Purpose

Muc dich chinh (main purpose) cua `useCallback` la gi?

A) Memoize return value cua function
B) Giu nguyen reference (tham chieu) cua function giua cac lan render
C) Tang toc do thuc thi cua function
D) Tu dong toi uu hoa component

<details>
<summary>Dap an (Answer)</summary>

**B) Giu nguyen reference (tham chieu) cua function giua cac lan render**

`useCallback` memoize function reference, khong phai result:
- Function chi duoc tao lai khi dependencies thay doi
- Giup memoized children khong re-render khong can thiet

```tsx
// Moi render: handleClick la CUNG MOT function (same reference)
const handleClick = useCallback(() => {
  // ...
}, []);
```

</details>

---

## Question 8: useCallback + React.memo

Khi nao `useCallback` thuc su co hieu qua (effective)?

A) Luon luon co hieu qua
B) Chi khi pass callback to child component dung React.memo
C) Chi khi callback phuc tap
D) Chi khi component render nhieu lan

<details>
<summary>Dap an (Answer)</summary>

**B) Chi khi pass callback to child component dung React.memo**

`useCallback` chi co tac dung khi:
1. Pass callback to child component
2. Child component duoc wrap boi `React.memo`

Neu child khong dung `React.memo`, no se re-render anyway -> `useCallback` vo ich.

```tsx
// Co hieu qua
const MemoChild = React.memo(({ onClick }) => ...);
<MemoChild onClick={memoizedCallback} />

// Khong hieu qua
const Child = ({ onClick }) => ...;
<Child onClick={memoizedCallback} /> // Child khong memo!
```

</details>

---

## Question 9: Dependencies Array

Xem code sau:
```tsx
const [count, setCount] = useState(0);

const handleClick = useCallback(() => {
  console.log(count);
}, []);
```

Van de (problem) cua code nay la gi?

A) Khong co van de
B) `count` se luon la 0 (stale closure)
C) `handleClick` khong bao gio duoc tao
D) TypeScript error

<details>
<summary>Dap an (Answer)</summary>

**B) `count` se luon la 0 (stale closure)**

Day la "stale closure" (bao dong cu) problem:
- `[]` empty deps = function khong bao gio thay doi
- Function "nho" gia tri `count` luc duoc tao (= 0)
- Du `count` thay doi, function van dung gia tri cu

Fix:
```tsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // Them count vao deps
```

</details>

---

## Question 10: Functional Update

Xem code sau:
```tsx
const handleIncrement = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

Tai sao khong can `count` trong dependencies?

A) Vi setCount tu dong cap nhat
B) Vi functional update `c => c + 1` nhan gia tri hien tai tu React
C) Vi count la primitive value
D) Vi useCallback tu dong track dependencies

<details>
<summary>Dap an (Answer)</summary>

**B) Vi functional update `c => c + 1` nhan gia tri hien tai tu React**

Functional update pattern:
- `setCount(c => c + 1)` - `c` la gia tri hien tai tu React
- KHONG phai closure, khong phai bien ben ngoai
- Nen khong can them `count` vao dependencies

So sanh:
```tsx
// SAI - can [count]
setCount(count + 1);

// DUNG - khong can deps
setCount(c => c + 1);
```

Day la best practice de tranh stale closures.

</details>

---

## Score Card (Bang diem)

| Score | Result |
|-------|--------|
| 10/10 | Excellent! |
| 8-9/10 | Pass - Hieu tot useRef & useCallback |
| 6-7/10 | Review lai theory truoc khi tiep tuc |
| < 6/10 | Doc lai COMPLETE_THEORY.md va lam lai quiz |

---

## Key Takeaways Summary

1. **useRef** = persist value WITHOUT re-render
2. **useState** = persist value WITH re-render
3. **useRef use cases:** DOM access, previous value, timer IDs
4. **useCallback** = memoize function REFERENCE
5. **useCallback + React.memo** = toi uu hieu nang
6. **Functional update** = tranh stale closures, giam dependencies

---

**NEXT SESSION:** 1.3.4 - useMemo & Custom Hooks
