/**
 * Exercise 1: useMemo Basics - SOLUTION
 *
 * Đã điền đầy đủ các chỗ trống với giải thích
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

export default function UseMemoBasicsSolution() {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [renderCount, setRenderCount] = useState(0);

  // Force re-render để test (không liên quan đến filter)
  const forceRerender = () => setRenderCount((c) => c + 1);

  // ============================================================================
  // SOLUTION 1: Memoize filtered products
  // useMemo nhận 2 tham số:
  // 1. Factory function - return giá trị cần cache
  // 2. Dependencies array - chỉ tính lại khi deps thay đổi
  // ============================================================================
  const filteredProducts = useMemo(
    () => {
      console.log("🔍 Filtering products..."); // Chỉ log khi thực sự filter

      return PRODUCTS.filter((product) => {
        // Check if product name includes search term (case insensitive)
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        // Check if matches selected category (or "All")
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });
    },
    // Dependencies: chỉ re-filter khi 1 trong 3 giá trị này thay đổi
    [PRODUCTS, searchTerm, selectedCategory]
  );

  // ============================================================================
  // SOLUTION 2: Memoize sorted products
  // Phụ thuộc vào filteredProducts (đã memoized) và sortBy
  // Dùng spread [...] để tạo copy, tránh mutate original array
  // ============================================================================
  const sortedProducts = useMemo(
    () => {
      console.log("📊 Sorting products..."); // Chỉ log khi thực sự sort

      // Spread để không mutate filteredProducts
      return [...filteredProducts].sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return a.price - b.price;
      });
    },
    // Dependencies: filteredProducts thay đổi → cần sort lại
    // sortBy thay đổi → cần sort lại
    [filteredProducts, sortBy]
  );

  // ============================================================================
  // SOLUTION 3: Memoize statistics
  // Tính từ sortedProducts - expensive nếu list lớn
  // ============================================================================
  const stats = useMemo(
    () => {
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
    },
    // Chỉ cần sortedProducts vì tất cả tính từ đây
    [sortedProducts]
  );

  // Categories for filter
  const categories = ["All", "Electronics", "Shoes", "Books"];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 1: useMemo Basics - SOLUTION ✅</h2>
      <p>
        <strong>Mục tiêu:</strong> Dùng useMemo để memoize filter, sort, và
        stats calculations
      </p>

      {/* Debug info */}
      <div
        style={{
          background: "#d4edda",
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
          ✅ Click Force Re-render - Console sẽ KHÔNG log filter/sort/stats vì
          useMemo cache kết quả
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

      {/* Key takeaways */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#e8f5e9",
          borderRadius: "4px",
        }}
      >
        <h4>📝 Key Takeaways:</h4>
        <ol>
          <li>
            <code>useMemo</code> cache kết quả tính toán, chỉ tính lại khi deps
            thay đổi
          </li>
          <li>
            <strong>Chain memoization:</strong> filteredProducts →
            sortedProducts → stats
          </li>
          <li>
            <strong>Force re-render</strong> không trigger calculation vì deps
            không đổi
          </li>
          <li>
            <strong>Console log</strong> giúp verify khi nào thực sự
            re-calculate
          </li>
        </ol>
      </div>
    </div>
  );
}
