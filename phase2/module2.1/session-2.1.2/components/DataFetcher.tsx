/**
 * SESSION 2.1.2 - RENDER PROPS: VÍ DỤ NÂNG CAO
 * =============================================
 *
 * DataFetcher: Component generic để fetch data từ API
 *
 * VẤN ĐỀ CẦN GIẢI QUYẾT:
 * - Bạn có nhiều components cần fetch data
 * - Mỗi component cần handle: loading, error, data
 * - Logic fetch giống nhau, nhưng render khác nhau
 *
 * GIẢI PHÁP: Render Props
 * - DataFetcher quản lý logic fetch (loading, error, data)
 * - Mỗi component tự quyết định cách render
 */

import { useState, useEffect, ReactNode } from "react";

// ============================================
// BƯỚC 1: ĐỊNH NGHĨA TYPES
// ============================================

/**
 * FetchState: Trạng thái của việc fetch data
 *
 * Sử dụng Union Type để represent 3 states:
 * 1. Loading: Đang fetch
 * 2. Error: Fetch thất bại
 * 3. Success: Fetch thành công
 */
interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * DataFetcherProps: Props với Generic Type
 *
 * T: Type của data được fetch
 * - url: Endpoint để fetch
 * - children: Render prop function
 *
 * LƯU Ý: children nhận FetchState<T> và return ReactNode
 */
interface DataFetcherProps<T> {
  url: string;
  children: (state: FetchState<T>) => ReactNode;
}

// ============================================
// BƯỚC 2: GENERIC COMPONENT
// ============================================

/**
 * DataFetcher: Generic component để fetch data
 *
 * Sử dụng Generic <T>:
 * - T là type của data được fetch
 * - Cho phép TypeScript infer type từ cách sử dụng
 */
export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  // State quản lý fetch lifecycle
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Reset state khi URL thay đổi
    setState({ data: null, isLoading: true, error: null });

    // AbortController để cancel request nếu component unmount
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Chỉ update state nếu request chưa bị abort
        if (!abortController.signal.aborted) {
          setState({ data, isLoading: false, error: null });
        }
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        if (!abortController.signal.aborted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    }

    fetchData();

    // Cleanup: Cancel pending request
    return () => {
      abortController.abort();
    };
  }, [url]); // Re-fetch khi URL thay đổi

  // ============================================
  // KEY POINT: GỌI children VỚI FULL STATE
  // ============================================
  // Component sử dụng sẽ có toàn quyền quyết định:
  // - Hiển thị loading spinner như thế nào
  // - Render error như thế nào
  // - Render data như thế nào

  return <>{children(state)}</>;
}

// ============================================
// BƯỚC 3: VÍ DỤ SỬ DỤNG
// ============================================

/**
 * VÍ DỤ 1: Fetch và hiển thị danh sách users
 */
interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  return (
    <DataFetcher<User[]> url="https://jsonplaceholder.typicode.com/users">
      {({ data, isLoading, error }) => {
        // LOADING STATE
        if (isLoading) {
          return <div className="loading">Loading users...</div>;
        }

        // ERROR STATE
        if (error) {
          return <div className="error">Error: {error.message}</div>;
        }

        // SUCCESS STATE
        if (!data) {
          return <div>No users found</div>;
        }

        return (
          <ul className="user-list">
            {data.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}

/**
 * VÍ DỤ 2: Fetch và hiển thị danh sách posts (khác render)
 */
interface Post {
  id: number;
  title: string;
  body: string;
}

export function PostList() {
  return (
    <DataFetcher<Post[]> url="https://jsonplaceholder.typicode.com/posts">
      {({ data, isLoading, error }) => {
        if (isLoading) {
          // Khác loading UI
          return (
            <div className="skeleton">
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton-card" />
              ))}
            </div>
          );
        }

        if (error) {
          // Khác error UI
          return (
            <div className="error-banner">
              <span>⚠️</span>
              <p>Failed to load posts: {error.message}</p>
              <button>Retry</button>
            </div>
          );
        }

        // Khác data UI
        return (
          <div className="post-grid">
            {data?.slice(0, 6).map((post) => (
              <article key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
              </article>
            ))}
          </div>
        );
      }}
    </DataFetcher>
  );
}

// ============================================
// SO SÁNH: CUSTOM HOOK APPROACH (MODERN)
// ============================================

/**
 * useFetch: Custom hook làm điều tương tự
 *
 * ĐÂY LÀ CÁCH HIỆN ĐẠI, ĐƯỢC KHUYẾN KHÍCH!
 * Render Props vẫn được dùng trong một số library
 * nhưng custom hooks thường cleaner hơn.
 */
export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, isLoading: true, error: null });
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!abortController.signal.aborted) {
          setState({ data, isLoading: false, error: null });
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        if (!abortController.signal.aborted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    }

    fetchData();
    return () => abortController.abort();
  }, [url]);

  return state;
}

/**
 * UserListWithHook: Sử dụng custom hook
 *
 * SO SÁNH:
 * - Render Props: <DataFetcher>{(state) => ...}</DataFetcher>
 * - Custom Hook: const state = useFetch(); return ...
 *
 * Custom Hook:
 * - Không có wrapper component
 * - Không có nested callback
 * - Dễ compose nhiều hooks
 * - Better TypeScript inference
 */
export function UserListWithHook() {
  const { data, isLoading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No users</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default DataFetcher;
