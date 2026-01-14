/**
 * Real Exercise: E-commerce Complete - SOLUTION
 * Session 1.5.6 - Headless UI & Production
 *
 * Complete e-commerce implementation with:
 * - Headless UI components (Dialog, Menu, Transition)
 * - CVA for button variants
 * - cn() helper for class merging
 * - Dark mode support
 * - Responsive design
 */

import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// ============================================
// Button with CVA
// ============================================

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 active:scale-95',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100',
        outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50 focus:ring-brand-500 dark:hover:bg-brand-900/20',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400 dark:text-gray-300 dark:hover:bg-gray-800',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 active:scale-95',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, fullWidth, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

// ============================================
// Sample Data
// ============================================

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', '30-hour Battery', 'Premium Comfort'],
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 399.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Feature-rich smartwatch with health tracking and notifications.',
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'Durable backpack with dedicated laptop compartment.',
    features: ['15.6" Laptop Fit', 'Water Resistant', 'USB Port'],
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
    description: 'RGB mechanical keyboard with custom switches.',
    features: ['Cherry MX Switches', 'RGB Backlight', 'Hot-swappable'],
  },
  {
    id: 5,
    name: 'Desk Lamp',
    price: 49.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    description: 'Adjustable LED desk lamp with multiple brightness levels.',
    features: ['5 Brightness Levels', 'USB Charging', 'Touch Control'],
  },
  {
    id: 6,
    name: 'Coffee Mug',
    price: 24.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    description: 'Insulated coffee mug that keeps drinks hot for hours.',
    features: ['Double Wall', '12oz Capacity', 'Dishwasher Safe'],
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

// ============================================
// Header Component with Dropdown
// ============================================

function Header({
  cartCount,
  onCartClick,
}: {
  cartCount: number
  onCartClick: () => void
}) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-brand-500">E-Shop</span>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-brand-500 dark:text-gray-300 transition-colors">
                Products
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-500 dark:text-gray-300 transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-500 dark:text-gray-300 transition-colors">
                Deals
              </a>
            </nav>
          </div>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className={cn(
                  'w-full px-4 py-2 pl-10 rounded-lg',
                  'border border-gray-200 dark:border-gray-700',
                  'bg-gray-50 dark:bg-gray-800',
                  'text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-brand-500',
                  'placeholder:text-gray-400'
                )}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User Dropdown with Headless UI Menu */}
            <Menu as="div" className="relative">
              <Menu.Button
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg',
                  'text-gray-600 dark:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  'transition-colors'
                )}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden sm:inline">Account</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={cn(
                    'absolute right-0 mt-2 w-48 origin-top-right',
                    'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
                    'ring-1 ring-black/5 dark:ring-white/10',
                    'focus:outline-none p-1'
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                          active ? 'bg-brand-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        )}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                          active ? 'bg-brand-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        )}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Orders
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                          active ? 'bg-brand-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        )}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full',
                          active ? 'bg-red-500 text-white' : 'text-red-500'
                        )}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className={cn(
                'relative p-2 rounded-lg',
                'text-gray-600 dark:text-gray-300',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'transition-colors'
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
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

// ============================================
// Filter Dropdown
// ============================================

function Filters({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Menu as="div" className="relative">
        <Menu.Button
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
            'text-gray-700 dark:text-gray-200',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            'transition-colors'
          )}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Category: {selectedCategory}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={cn(
              'absolute left-0 mt-2 w-48 origin-top-left',
              'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
              'ring-1 ring-black/5 dark:ring-white/10',
              'focus:outline-none p-1 z-10'
            )}
          >
            {categories.map((category) => (
              <Menu.Item key={category}>
                {({ active }) => (
                  <button
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full',
                      active ? 'bg-brand-500 text-white' : 'text-gray-900 dark:text-gray-100',
                      selectedCategory === category && !active && 'bg-brand-50 dark:bg-brand-900/20 text-brand-600'
                    )}
                  >
                    {selectedCategory === category && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {category}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

// ============================================
// Product Card
// ============================================

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
    <div
      className={cn(
        'group bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden',
        'hover:shadow-lg transition-all duration-300',
        'border border-gray-100 dark:border-gray-700'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View button - appears on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={onQuickView}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
          >
            Quick View
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-medium text-gray-900 dark:text-white mt-1">{product.name}</h3>
        <p className="text-brand-500 font-semibold mt-1">${product.price.toFixed(2)}</p>

        <Button
          variant="primary"
          fullWidth
          onClick={onAddToCart}
          className="mt-3"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

// ============================================
// Quick View Modal
// ============================================

function QuickViewModal({
  open,
  onClose,
  product,
  onAddToCart,
}: {
  open: boolean
  onClose: () => void
  product: typeof products[0] | null
  onAddToCart: () => void
}) {
  if (!product) return null

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={cn(
                'relative bg-white dark:bg-gray-800 rounded-xl shadow-xl',
                'max-w-3xl w-full overflow-hidden'
              )}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className={cn(
                  'absolute top-4 right-4 z-10 p-2 rounded-lg',
                  'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'transition-colors'
                )}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <Dialog.Title className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                    {product.name}
                  </Dialog.Title>
                  <p className="text-3xl font-bold text-brand-500 mt-2">
                    ${product.price.toFixed(2)}
                  </p>

                  <Dialog.Description className="text-gray-600 dark:text-gray-400 mt-4">
                    {product.description}
                  </Dialog.Description>

                  {/* Features */}
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="mt-auto pt-6 flex gap-3">
                    <Button variant="primary" size="lg" fullWidth onClick={onAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

// ============================================
// Cart Drawer
// ============================================

function CartDrawer({
  open,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        {/* Drawer */}
        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm mt-1">Add items to get started</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-brand-500 font-semibold mt-1">
                            ${item.price.toFixed(2)}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <Button variant="primary" size="lg" fullWidth>
                    Checkout
                  </Button>

                  <button
                    onClick={onClose}
                    className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

// ============================================
// Main Component
// ============================================

export default function RealEcommerceSolution() {
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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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

  const handleAddFromQuickView = () => {
    if (selectedProduct) {
      addToCart(selectedProduct)
      setIsQuickViewOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <span className="text-gray-500 dark:text-gray-400">
            {filteredProducts.length} products
          </span>
        </div>

        {/* Filters */}
        <Filters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Quick View Modal */}
      <QuickViewModal
        open={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddFromQuickView}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  )
}
