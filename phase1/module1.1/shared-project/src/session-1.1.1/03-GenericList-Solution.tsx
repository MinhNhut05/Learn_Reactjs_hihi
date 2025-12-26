/**
 * SOLUTION: GENERIC LIST COMPONENT
 */

import { ReactNode } from 'react'

// Types cho test data
interface User {
  id: number
  name: string
  email: string
}

interface Product {
  id: number
  title: string
  price: number
}

// Generic ListProps
interface ListProps<T> {
  items: T[]                                    // Array của type T
  renderItem: (item: T) => ReactNode           // Function render mỗi item
  keyExtractor: (item: T) => string | number   // Function lấy key
}

// Generic List Component
function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// ===== TEST COMPONENT =====
export default function Ex3_GenericListSolution() {
  // Sample data
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ]

  const products: Product[] = [
    { id: 1, title: 'Laptop', price: 999 },
    { id: 2, title: 'Mouse', price: 29 },
    { id: 3, title: 'Keyboard', price: 79 },
  ]

  const tags: string[] = ['React', 'TypeScript', 'Vite', 'Tailwind']

  return (
    <div className="flex flex-col gap-20">
      {/* List<User> */}
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

      {/* List<Product> */}
      <div>
        <h4>Product List</h4>
        <List<Product>
          items={products}
          renderItem={(product) => (
            <div>
              {product.title} - <span style={{ color: '#28a745', fontWeight: 600 }}>${product.price}</span>
            </div>
          )}
          keyExtractor={(product) => product.id}
        />
      </div>

      {/* List<string> */}
      <div>
        <h4>Tags List</h4>
        <List<string>
          items={tags}
          renderItem={(tag) => (
            <span className="badge badge-primary">{tag}</span>
          )}
          keyExtractor={(tag) => tag}
        />
      </div>
    </div>
  )
}
