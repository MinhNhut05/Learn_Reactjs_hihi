/**
 * Exercise 4: Shopping Cart with Context + Reducer (SOLUTION)
 *
 * Học cách kết hợp useContext + useReducer để quản lý giỏ hàng
 * Đây là bài tập đơn giản để hiểu rõ pattern này
 */

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// ============================================================
// STEP 1: ĐỊNH NGHĨA TYPES
// ============================================================

// Product - sản phẩm trong giỏ hàng
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// State của giỏ hàng
interface CartState {
  items: CartItem[];
  totalAmount: number;
}

// ============================================================
// STEP 2: ĐỊNH NGHĨA ACTIONS
// ============================================================

// Discriminated Union - TypeScript sẽ biết payload của từng action
type CartAction =
  | { type: "ADD_ITEM"; payload: { id: string; name: string; price: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "INCREASE_QUANTITY"; payload: { id: string } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string } }
  | { type: "CLEAR_CART" };

// ============================================================
// STEP 3: INITIAL STATE & REDUCER FUNCTION
// ============================================================

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

// Helper function: tính tổng tiền
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Reducer function - xử lý tất cả actions
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Kiểm tra xem item đã có trong giỏ chưa
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Nếu đã có -> tăng quantity
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có -> thêm mới với quantity = 1
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems),
      };
    }

    case "REMOVE_ITEM": {
      // Xóa item khỏi giỏ hàng
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems),
      };
    }

    case "INCREASE_QUANTITY": {
      // Tăng số lượng
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems),
      };
    }

    case "DECREASE_QUANTITY": {
      // Giảm số lượng (nếu quantity = 1 thì xóa luôn)
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Loại bỏ items có quantity = 0

      return {
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems),
      };
    }

    case "CLEAR_CART": {
      // Xóa toàn bộ giỏ hàng
      return initialState;
    }

    default:
      return state;
  }
}

// ============================================================
// STEP 4: TẠO CONTEXTS (Tách State và Dispatch)
// ============================================================

// Tách riêng để tối ưu re-renders
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(
  undefined
);

// ============================================================
// STEP 5: PROVIDER COMPONENT
// ============================================================

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // useReducer returns [state, dispatch]
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

// ============================================================
// STEP 6: CUSTOM HOOKS
// ============================================================

// Hook để lấy state
export function useCartState(): CartState {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCartState must be used within CartProvider");
  }
  return context;
}

// Hook để lấy dispatch
export function useCartDispatch(): Dispatch<CartAction> {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within CartProvider");
  }
  return context;
}

// ============================================================
// DEMO COMPONENTS
// ============================================================

// Danh sách sản phẩm mẫu
const AVAILABLE_PRODUCTS = [
  { id: "1", name: "Laptop", price: 1200 },
  { id: "2", name: "Mouse", price: 25 },
  { id: "3", name: "Keyboard", price: 75 },
  { id: "4", name: "Monitor", price: 300 },
];

// Component hiển thị danh sách sản phẩm
function ProductList() {
  // Chỉ cần dispatch - không cần state của cart
  const dispatch = useCartDispatch();

  return (
    <div>
      <h3 style={{ marginBottom: "1rem" }}>Available Products</h3>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {AVAILABLE_PRODUCTS.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{product.name}</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>
                ${product.price}
              </div>
            </div>
            <button
              onClick={() =>
                dispatch({
                  type: "ADD_ITEM",
                  payload: product,
                })
              }
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component hiển thị giỏ hàng
function Cart() {
  // Cần cả state (để hiển thị items) và dispatch (để thay đổi quantity, xóa)
  const { items, totalAmount } = useCartState();
  const dispatch = useCartDispatch();

  return (
    <div>
      <h3 style={{ marginBottom: "1rem" }}>Shopping Cart</h3>

      {items.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "#999",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          Your cart is empty
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "8px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    ${item.price} × {item.quantity} = $
                    {item.price * item.quantity}
                  </div>
                </div>

                {/* Quantity controls */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QUANTITY",
                        payload: { id: item.id },
                      })
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#ff9800",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    -
                  </button>

                  <span
                    style={{
                      minWidth: "30px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_QUANTITY",
                        payload: { id: item.id },
                      })
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: { id: item.id },
                      })
                    }
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Clear */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              backgroundColor: "#c8e6c9",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Total: ${totalAmount.toFixed(2)}
            </div>
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Component hiển thị số lượng items trong cart (ví dụ như badge trên icon)
function CartBadge() {
  // Chỉ cần đọc state
  const { items } = useCartState();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        backgroundColor: "#f44336",
        color: "#fff",
        borderRadius: "12px",
        fontWeight: "bold",
        fontSize: "0.9rem",
      }}
    >
      Cart Items: {totalItems}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ShoppingCartSolution() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 4: Shopping Cart with Context + Reducer (Solution)</h2>

      <div
        style={{
          backgroundColor: "#e3f2fd",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>🎯 Học được gì từ bài này:</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>
            <strong>useContext + useReducer</strong> - Pattern quản lý state
            toàn cục
          </li>
          <li>
            <strong>Tách State và Dispatch</strong> - Tối ưu re-renders
          </li>
          <li>
            <strong>Custom Hooks</strong> - useCartState, useCartDispatch
          </li>
          <li>
            <strong>Complex State Logic</strong> - Xử lý logic phức tạp trong
            reducer
          </li>
        </ul>
      </div>

      {/* CartProvider bao bọc tất cả components cần access cart */}
      <CartProvider>
        <div style={{ marginBottom: "1rem" }}>
          <CartBadge />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            maxWidth: "1000px",
          }}
        >
          {/* Left: Product List */}
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <ProductList />
          </div>

          {/* Right: Cart */}
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Cart />
          </div>
        </div>
      </CartProvider>

      {/* Pattern Explanation */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f3e5f5",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>📚 Cấu trúc Pattern:</h4>
        <pre
          style={{
            backgroundColor: "#263238",
            color: "#ce93d8",
            padding: "1rem",
            borderRadius: "8px",
            overflow: "auto",
            margin: 0,
            fontSize: "0.85rem",
          }}
        >
          {`// 1. Định nghĩa Types
interface State { items: Item[] }
type Action = { type: "ADD" } | { type: "REMOVE" }

// 2. Tạo Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": return { ... }
    case "REMOVE": return { ... }
  }
}

// 3. Tạo Contexts
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// 4. Tạo Provider
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// 5. Tạo Custom Hooks
function useState() {
  const context = useContext(StateContext);
  if (!context) throw new Error("Must use within Provider");
  return context;
}

// 6. Sử dụng
<Provider>
  <Component />  {/* Có thể dùng useState() và useDispatch() */}
</Provider>`}
        </pre>
      </div>
    </div>
  );
}
