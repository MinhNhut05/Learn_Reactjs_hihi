/**
 * Exercise 1: useMemo Basics
 * Difficulty: Medium
 *
 * MỤC TIÊU HỌC:
 * - Hiểu useMemo syntax
 * - Memoize expensive calculations
 * - Dependencies array
 *
 * HƯỚNG DẪN:
 * 1. Tìm các chỗ có comment "// TODO: ..." và điền code đúng
 * 2. Mở Console (F12) để xem khi nào calculations chạy
 * 3. Dùng Force Re-render để test memoization
 */

import { useState, useMemo } from "react";

// =============================================================================
// TYPES
// =============================================================================

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

// Sample data - 20 products
const PRODUCTS: Product[] = [
  { id: 1, name: "iPhone 15", category: "Electronics", price: 999 },
  { id: 2, name: "MacBook Pro", category: "Electronics", price: 2499 },
  { id: 3, name: "AirPods Pro", category: "Electronics", price: 249 },
  { id: 4, name: "iPad Air", category: "Electronics", price: 599 },
  { id: 5, name: "Nike Air Max", category: "Shoes", price: 150 },
  { id: 6, name: "Adidas Ultraboost", category: "Shoes", price: 180 },
  { id: 7, name: "Converse Classic", category: "Shoes", price: 65 },
  { id: 8, name: "React Book", category: "Books", price: 45 },
  { id: 9, name: "TypeScript Guide", category: "Books", price: 35 },
  { id: 10, name: "JavaScript Patterns", category: "Books", price: 40 },
  { id: 11, name: "Samsung Galaxy", category: "Electronics", price: 899 },
  { id: 12, name: "Sony Headphones", category: "Electronics", price: 350 },
  { id: 13, name: "Puma RS-X", category: "Shoes", price: 110 },
  { id: 14, name: "New Balance 990", category: "Shoes", price: 185 },
  { id: 15, name: "Clean Code", category: "Books", price: 50 },
  { id: 16, name: "Design Patterns", category: "Books", price: 55 },
  { id: 17, name: "Dell XPS", category: "Electronics", price: 1299 },
  { id: 18, name: "Reebok Classic", category: "Shoes", price: 85 },
  { id: 19, name: "Node.js Guide", category: "Books", price: 42 },
  { id: 20, name: "Apple Watch", category: "Electronics", price: 399 },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function UseMemoBasics() {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [renderCount, setRenderCount] = useState(0);

  // Force re-render để test (không liên quan đến filter)
  const forceRerender = () => setRenderCount((c) => c + 1);

  // ============================================================================
  // TODO 1: Memoize filtered products
  // Thay thế dòng dưới bằng useMemo
  // Chỉ tính lại khi PRODUCTS, searchTerm, hoặc selectedCategory thay đổi
  // ============================================================================

  // ❌ CHƯA ĐÚNG - Sẽ chạy lại mỗi render
  // const filteredProducts = PRODUCTS.filter((product) => {
  //   console.log("🔍 Filtering products..."); // Log mỗi lần filter

  //   const matchesSearch = product.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());

  //   const matchesCategory =
  //     selectedCategory === "All" || product.category === selectedCategory;

  //   return matchesSearch && matchesCategory;
  // });

  const filteredProducts = useMemo(() => {
    console.log("🔍 Filtering products...");
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      console.log(matchesCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, PRODUCTS]);

  // ✅ TODO: Thay bằng useMemo như sau:
  // const filteredProducts = useMemo(() => {
  //   console.log("🔍 Filtering products...");
  //   return PRODUCTS.filter((product) => {
  //     const matchesSearch = product.name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const matchesCategory =
  //       selectedCategory === "All" || product.category === selectedCategory;
  //     return matchesSearch && matchesCategory;
  //   });
  // }, [/* Điền dependencies */]);

  // ============================================================================
  // TODO 2: Memoize sorted products
  // Thay thế dòng dưới bằng useMemo
  // Chỉ tính lại khi filteredProducts hoặc sortBy thay đổi
  // ============================================================================

  const sortedProducts = useMemo(() => {
    console.log("📊 Sorting products..."); // Log mỗi lần sort
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });
  }, [filteredProducts, sortBy]);

  // ✅ TODO: Thay bằng useMemo như sau:
  // const sortedProducts = useMemo(() => {
  //   console.log("📊 Sorting products...");
  //   return [...filteredProducts].sort((a, b) => {
  //     if (sortBy === "name") {
  //       return a.name.localeCompare(b.name);
  //     }
  //     return a.price - b.price;
  //   });
  // }, [/* Điền dependencies */]);

  // ============================================================================
  // TODO 3: Memoize statistics
  // Thay thế dòng dưới bằng useMemo
  // Tính toán stats từ sortedProducts
  // ============================================================================

  // ❌ CHƯA ĐÚNG - Sẽ chạy lại mỗi render

  const stats = useMemo(() => {
    console.log("📈 Calculating stats...");
    if (sortedProducts.length === 0) {
      return { total: 0, average: 0, min: 0, max: 0 };
    }

    const prices = sortedProducts.map((p) => p.price);
    const total = prices.reduce((sum, p) => sum + p, 0);

    return {
      total,
      average: Math.round(total / prices.length),
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [sortedProducts]);

  // ✅ TODO: Thay bằng useMemo như sau:
  // const stats = useMemo(() => {
  //   console.log("📈 Calculating stats...");
  //   if (sortedProducts.length === 0) {
  //     return { total: 0, average: 0, min: 0, max: 0 };
  //   }
  //   const prices = sortedProducts.map((p) => p.price);
  //   const total = prices.reduce((sum, p) => sum + p, 0);
  //   return {
  //     total,
  //     average: Math.round(total / prices.length),
  //     min: Math.min(...prices),
  //     max: Math.max(...prices),
  //   };
  // }, [/* Điền dependencies */]);

  // Categories for filter
  const categories = ["All", "Electronics", "Shoes", "Books"];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 1: useMemo Basics - Product Filter</h2>
      <p>
        <strong>Mục tiêu:</strong> Dùng useMemo để memoize filter, sort, và
        stats calculations
      </p>

      {/* Debug info */}
      <div
        style={{
          background: "#fff3cd",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
        }}
      >
        <strong>Debug:</strong> Render count: {renderCount}
        <button onClick={forceRerender} style={{ marginLeft: "1rem" }}>
          Force Re-render
        </button>
        <br />
        <small>
          👉 Mở Console (F12) và click Force Re-render. Nếu useMemo hoạt động
          đúng, sẽ KHÔNG thấy log filter/sort/stats
        </small>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", minWidth: "200px" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "price")}
          style={{ padding: "0.5rem" }}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            background: "#e3f2fd",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <strong>Total:</strong> ${stats.total.toLocaleString()}
        </div>
        <div
          style={{
            background: "#e8f5e9",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <strong>Average:</strong> ${stats.average.toLocaleString()}
        </div>
        <div
          style={{
            background: "#fff3e0",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <strong>Min:</strong> ${stats.min.toLocaleString()}
        </div>
        <div
          style={{
            background: "#fce4ec",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <strong>Max:</strong> ${stats.max.toLocaleString()}
        </div>
      </div>

      {/* Product list */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Found: {sortedProducts.length} products</strong>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>Name</th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>Category</th>
            <th style={{ padding: "0.5rem", textAlign: "right" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "0.5rem" }}>{product.name}</td>
              <td style={{ padding: "0.5rem" }}>{product.category}</td>
              <td style={{ padding: "0.5rem", textAlign: "right" }}>
                ${product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hints */}
      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          💡 Hints (click to expand)
        </summary>
        <div
          style={{
            background: "#f5f5f5",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <h4>TODO 1 - Filtered Products:</h4>
          <pre>{`const filteredProducts = useMemo(() => {
  // filter logic here
}, [searchTerm, selectedCategory]);`}</pre>

          <h4>TODO 2 - Sorted Products:</h4>
          <pre>{`const sortedProducts = useMemo(() => {
  // sort logic here
}, [filteredProducts, sortBy]);`}</pre>

          <h4>TODO 3 - Stats:</h4>
          <pre>{`const stats = useMemo(() => {
  // stats calculation here
}, [sortedProducts]);`}</pre>
        </div>
      </details>
    </div>
  );
}
