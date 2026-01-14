/**
 * Real Exercise: E-commerce Complete
 * Session 1.5.6 - Headless UI & Production
 *
 * MỤC TIÊU:
 * Hoàn thiện E-commerce project với production-ready features
 *
 * YÊU CẦU:
 *
 * 1. HEADER COMPONENT:
 *    - Logo
 *    - Navigation links
 *    - Search bar
 *    - User dropdown menu (Headless UI Menu)
 *    - Cart icon với badge
 *
 * 2. PRODUCT GRID:
 *    - Grid responsive (1 col mobile, 2 tablet, 4 desktop)
 *    - Mỗi card có hover effects
 *    - "Quick View" button mở modal
 *    - "Add to Cart" button
 *
 * 3. QUICK VIEW MODAL:
 *    - Headless UI Dialog
 *    - Product details
 *    - Add to Cart
 *
 * 4. CART DRAWER:
 *    - Slide-in từ phải
 *    - List cart items
 *    - Update quantity
 *    - Remove items
 *    - Subtotal
 *    - Checkout button
 *
 * 5. FILTER DROPDOWN:
 *    - Category filter
 *    - Price range filter
 *    - Headless UI Listbox hoặc Menu
 *
 * 6. TECHNICAL REQUIREMENTS:
 *    - Tất cả buttons dùng CVA
 *    - Sử dụng cn() helper
 *    - Dark mode support
 *    - Mobile responsive
 *    - Smooth animations
 *
 * THỜI GIAN: 60 phút
 */

import { useState } from 'react'
// TODO: Import required components
// import { Dialog, Transition, Menu } from '@headlessui/react'
// import { Fragment } from 'react'
// import { cn } from '../../lib/utils'
// import { Button } from '../../components/ui/Button'
// import { Modal } from '../../components/ui/Modal'
// import { Dropdown } from '../../components/ui/Dropdown'
// import { CartDrawer } from '../../components/ui/CartDrawer'

// Sample data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium wireless headphones with noise cancellation.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 399.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Feature-rich smartwatch with health tracking.',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'Durable backpack with laptop compartment.',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
    description: 'RGB mechanical keyboard with custom switches.',
  },
  {
    id: 5,
    name: 'Desk Lamp',
    price: 49.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    description: 'Adjustable LED desk lamp with multiple brightness levels.',
  },
  {
    id: 6,
    name: 'Coffee Mug',
    price: 24.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    description: 'Insulated coffee mug that keeps drinks hot.',
  },
]

const categories = ['All', 'Electronics', 'Accessories', 'Home']

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

// TODO: Implement Header component
function Header({
  cartCount,
  onCartClick,
}: {
  cartCount: number
  onCartClick: () => void
}) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-brand-500">E-Shop</div>

          {/* TODO: Add navigation */}
          {/* TODO: Add search bar */}

          <div className="flex items-center gap-4">
            {/* TODO: Add user dropdown with Headless UI Menu */}
            <button className="text-gray-600">User</button>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-brand-500"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// TODO: Implement ProductCard component with Quick View
function ProductCard({
  product,
  onQuickView,
  onAddToCart,
}: {
  product: typeof products[0]
  onQuickView: () => void
  onAddToCart: () => void
}) {
  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* TODO: Add Quick View button that appears on hover */}
        <button
          onClick={onQuickView}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Quick View
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-brand-500 font-semibold mt-1">${product.price}</p>

        {/* TODO: Use Button component with CVA */}
        <button
          onClick={onAddToCart}
          className="w-full mt-3 bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// TODO: Implement Filter component with Dropdown
function Filters({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <div className="flex gap-4 mb-6">
      {/* TODO: Replace with Headless UI Menu or Listbox */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}

// Main component
export default function RealEcommerce() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter products
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  // Cart functions
  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleQuickView = (product: typeof products[0]) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>

        {/* Filters */}
        <Filters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() => handleQuickView(product)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </main>

      {/* TODO: Quick View Modal */}
      {/* Use Modal component or create inline */}
      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
            <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
            <p className="text-2xl font-bold text-brand-500 mt-4">
              ${selectedProduct.price}
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  addToCart(selectedProduct)
                  setIsQuickViewOpen(false)
                }}
                className="flex-1 bg-brand-500 text-white py-2 rounded-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-red-500">
              TODO: Convert to Headless UI Modal with animations!
            </p>
          </div>
        </div>
      )}

      {/* TODO: Cart Drawer */}
      {/* Use CartDrawer component */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>Close</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-brand-500">${item.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal:</span>
                    <span>
                      $
                      {cart
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full mt-4 bg-brand-500 text-white py-3 rounded-lg">
                    Checkout
                  </button>
                </div>
              </div>
            )}

            <p className="mt-4 text-sm text-red-500">
              TODO: Convert to CartDrawer component with slide animation!
            </p>
          </div>
        </div>
      )}

      {/* Checklist */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t">
        <h2 className="text-xl font-semibold mb-4">Implementation Checklist</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Components</h3>
            <ul className="space-y-1 text-sm">
              <li>[ ] Header with user dropdown (Headless UI Menu)</li>
              <li>[ ] Product cards with hover effects</li>
              <li>[ ] Quick View modal (Headless UI Dialog)</li>
              <li>[ ] Cart drawer (Headless UI Dialog)</li>
              <li>[ ] Filter dropdown (Headless UI Menu/Listbox)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Technical</h3>
            <ul className="space-y-1 text-sm">
              <li>[ ] All buttons use CVA</li>
              <li>[ ] Using cn() helper</li>
              <li>[ ] Smooth animations</li>
              <li>[ ] Mobile responsive</li>
              <li>[ ] Dark mode support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
