/**
 * EXERCISE 3: GENERIC LIST COMPONENT
 *
 * Yêu cầu:
 * 1. Tạo ListProps<T> interface với:
 *    - items: T[] (required)
 *    - renderItem: (item: T) => ReactNode (required)
 *    - keyExtractor: (item: T) => string | number (required)
 *
 * 2. Implement List<T> component:
 *    - Generic component works với bất kỳ type nào
 *    - Map qua items và render với renderItem
 *    - Dùng keyExtractor để tạo key cho mỗi item
 *
 * 3. Test với:
 *    - List<User>
 *    - List<Product>
 *    - List<string>
 */

import { ReactNode } from "react";

// TODO: Define types cho test data
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
}
// TODO: Define ListProps<T> interface

// TODO: Implement List<T> component
function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// ===== TEST COMPONENT =====
export default function Ex3_GenericList() {
  // Sample data
  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];

  const products: Product[] = [
    { id: 1, title: "Laptop", price: 999 },
    { id: 2, title: "Mouse", price: 29 },
    { id: 3, title: "Keyboard", price: 79 },
  ];

  const tags: string[] = ["React", "TypeScript", "Vite", "Tailwind"];

  return (
    <div className="flex flex-col gap-20">
      {/* TODO: Test List<User> */}
      <div>
        <h4>User List</h4>
        <List<User>
          items={users}
          renderItem={(user) => (
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
          )}
          keyExtractor={(user) => user.id}
        />
      </div>

      {/* TODO: Test List<Product> */}
      <div>
        <h4>Product List</h4>
        <List<Product>
          items={products}
          renderItem={(product) => (
            <div>
              <strong>{product.title}</strong> - {product.price}
            </div>
          )}
          keyExtractor={(product) => product.id}
        />
      </div>

      {/* TODO: Test List<string> */}
      <div>
        <h4>Tags List</h4>
        <List<String>
          items={tags}
          renderItem={(tag) => (
            <div>
              <span>{tag}</span>
            </div>
          )}
          keyExtractor={(tag) => tag.toString()}
        />
      </div>
    </div>
  );
}
