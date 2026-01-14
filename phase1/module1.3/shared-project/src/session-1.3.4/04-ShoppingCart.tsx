/**
 * Exercise 4: Shopping Cart with Context + Reducer
 *
 * TODO: Tạo một ứng dụng giỏ hàng đơn giản sử dụng Context + Reducer
 *
 * Yêu cầu:
 * 1. Tạo CartState interface với items và totalAmount
 * 2. Tạo CartAction type với các actions: ADD_ITEM, REMOVE_ITEM, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART
 * 3. Viết cartReducer để xử lý các actions
 * 4. Tạo CartProvider với Context (tách State và Dispatch contexts)
 * 5. Tạo custom hooks: useCartState và useCartDispatch
 * 6. Tạo components: ProductList, Cart, CartBadge
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

// TODO: Định nghĩa CartItem interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // TODO: Thêm các properties: id, name, price, quantity
}

// TODO: Định nghĩa CartState interface
interface CartState {
  items: CartItem[];
  totalAmount: number;
}

// ============================================================
// STEP 2: ĐỊNH NGHĨA ACTIONS
// ============================================================

// TODO: Định nghĩa CartAction type với discriminated union
type CartAction =
  | { type: "ADD_ITEM"; payload: { id: string; name: string; price: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "INCREASE_QUANTITY"; payload: { id: string } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string } }
  | { type: "CLEAR_CART" };

// ============================================================
// STEP 3: INITIAL STATE & REDUCER FUNCTION
// ============================================================

// TODO: Tạo initialState
const initialState: CartState = {
  items: [],
  totalAmount: 0,
  // TODO: Khởi tạo giá trị ban đầu
};

// TODO: Viết helper function calculateTotal
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// TODO: Viết cartReducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const indexItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatesItems: CartItem[];
      if (indexItem >= 0) {
        updatesItems = state.items.map((item, index) =>
          index === indexItem ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatesItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return {
        items: updatesItems,
        totalAmount: calculateTotal(updatesItems),
      };
    }

    // TODO: Xử lý case "REMOVE_ITEM"
    // Gợi ý: Filter để loại bỏ item theo id
    case "REMOVE_ITEM": {
      const updatesItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        items: updatesItems,
        totalAmount: calculateTotal(updatesItems),
      };
    }
    // TODO: Xử lý case "INCREASE_QUANTITY"
    // Gợi ý: Map và tìm item theo id, tăng quantity lên 1
    case "INCREASE_QUANTITY": {
      const updatesItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        items: updatesItems,
        totalAmount: calculateTotal(updatesItems),
      };
    }
    // TODO: Xử lý case "DECREASE_QUANTITY"
    // Gợi ý: Map và giảm quantity, filter để loại bỏ items có quantity = 0
    case "DECREASE_QUANTITY": {
      const updatesItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return {
        items: updatesItems,
        totalAmount: calculateTotal(updatesItems),
      };
    }
    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

// ============================================================
// STEP 4: TẠO CONTEXTS
// ============================================================

// TODO: Tạo CartStateContext
const CartStateContext = createContext<CartState | undefined>(undefined);

// TODO: Tạo CartDispatchContext
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(
  undefined
);

// ============================================================
// STEP 5: PROVIDER COMPONENT
// ============================================================

interface CartProviderProps {
  children: ReactNode;
}

// TODO: Viết CartProvider component
export function CartProvider({ children }: CartProviderProps) {
  // TODO: Sử dụng useReducer với cartReducer và initialState
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // TODO: Wrap children với 2 Providers (StateContext và DispatchContext)
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

// TODO: Viết useCartState hook
export function useCartState(): CartState {
  // TODO: Sử dụng useContext để lấy CartStateContext
  // TODO: Kiểm tra context !== undefined, nếu không thì throw Error
  // TODO: Return context
  const context = useContext(CartStateContext);
  if (context !== undefined) {
    return context;
  }
  throw new Error("useCartState must be used within CartProvider");
}

// TODO: Viết useCartDispatch hook
export function useCartDispatch(): Dispatch<CartAction> {
  // TODO: Sử dụng useContext để lấy CartDispatchContext
  // TODO: Kiểm tra context !== undefined, nếu không thì throw Error
  // TODO: Return context
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("Not implemented");
  }
  return context;
}

// ============================================================
// DEMO COMPONENTS
// ============================================================

// Danh sách sản phẩm mẫu (đã cho sẵn)
const AVAILABLE_PRODUCTS = [
  { id: "1", name: "Laptop", price: 1200 },
  { id: "2", name: "Mouse", price: 25 },
  { id: "3", name: "Keyboard", price: 75 },
  { id: "4", name: "Monitor", price: 300 },
];

// TODO: Viết ProductList component
function ProductList() {
  const dispatch = useCartDispatch();
  // TODO: Lấy dispatch từ useCartDispatch

  // TODO: Render danh sách sản phẩm với button "Add to Cart"
  // Khi click button, dispatch action ADD_ITEM
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
      {/* TODO: Render products here */}
      <div>Product list will appear here</div>
    </div>
  );
}

// TODO: Viết Cart component
function Cart() {
  const { items, totalAmount } = useCartState();
  const dispatch = useCartDispatch();

  // TODO: Lấy state từ useCartState
  // TODO: Lấy dispatch từ useCartDispatch

  // TODO: Render giỏ hàng
  // - Nếu giỏ trống, hiển thị "Your cart is empty"
  // - Nếu có items, hiển thị từng item với:
  //   + Buttons để tăng/giảm quantity
  //   + Button để remove item
  // - Hiển thị tổng tiền và button Clear Cart

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

// TODO: Viết CartBadge component
function CartBadge() {
  const { items } = useCartState();
  // TODO: Lấy state từ useCartState
  // TODO: Tính tổng số items (reduce để cộng tất cả quantity)
  // TODO: Hiển thị badge với số lượng
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
      }}
    >
      {totalItems}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ShoppingCart() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 4: Shopping Cart with Context + Reducer</h2>

      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          border: "1px solid #ffc107",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>📝 Hướng dẫn:</h4>
        <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>Đọc kỹ các TODO comments trong code</li>
          <li>Làm theo thứ tự từ STEP 1 đến STEP 6</li>
          <li>Tham khảo file Solution nếu gặp khó khăn</li>
          <li>Chạy thử và kiểm tra xem các chức năng hoạt động chưa</li>
        </ol>
      </div>

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

      {/* Checklist */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>✅ Checklist:</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>☐ Định nghĩa CartItem và CartState interfaces</li>
          <li>☐ Định nghĩa CartAction type với tất cả actions</li>
          <li>☐ Viết calculateTotal helper function</li>
          <li>☐ Viết cartReducer với tất cả cases</li>
          <li>☐ Tạo 2 Contexts (State và Dispatch)</li>
          <li>☐ Viết CartProvider component</li>
          <li>☐ Viết useCartState và useCartDispatch hooks</li>
          <li>☐ Hoàn thành ProductList component</li>
          <li>☐ Hoàn thành Cart component</li>
          <li>☐ Hoàn thành CartBadge component</li>
          <li>☐ Test tất cả chức năng hoạt động</li>
        </ul>
      </div>
    </div>
  );
}
