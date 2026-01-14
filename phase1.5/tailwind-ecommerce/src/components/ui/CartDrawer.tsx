/**
 * CartDrawer Component - Session 1.5.6
 *
 * Slide-in drawer for shopping cart using Headless UI Dialog.
 *
 * Features:
 * - Slides in from right
 * - Overlay backdrop
 * - Keyboard accessible
 * - Smooth animations
 *
 * Usage:
 * <CartDrawer
 *   open={isCartOpen}
 *   onClose={() => setIsCartOpen(false)}
 *   items={cartItems}
 *   onRemoveItem={(id) => removeFromCart(id)}
 *   onUpdateQuantity={(id, qty) => updateQuantity(id, qty)}
 * />
 */

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { cn } from '../../lib/utils'
import { Button } from './Button'

interface CartItem {
  id: string | number
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem?: (id: string | number) => void
  onUpdateQuantity?: (id: string | number, quantity: number) => void
  onCheckout?: () => void
}

export function CartDrawer({
  open,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

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
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Drawer container */}
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
                  Shopping Cart
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className={cn(
                    'p-2 rounded-lg',
                    'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'transition-colors'
                  )}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg
                      className="w-16 h-16 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm mt-1">
                      Add items to get started
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        {/* Product image */}
                        {item.image && (
                          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-brand-500 font-semibold mt-1">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                onUpdateQuantity?.(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className={cn(
                                'w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600',
                                'flex items-center justify-center',
                                'text-gray-600 dark:text-gray-300',
                                'hover:bg-gray-100 dark:hover:bg-gray-700',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'transition-colors'
                              )}
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity?.(item.id, item.quantity + 1)
                              }
                              className={cn(
                                'w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600',
                                'flex items-center justify-center',
                                'text-gray-600 dark:text-gray-300',
                                'hover:bg-gray-100 dark:hover:bg-gray-700',
                                'transition-colors'
                              )}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem?.(item.id)}
                          className={cn(
                            'p-1.5 rounded-lg',
                            'text-gray-400 hover:text-red-500',
                            'hover:bg-red-50 dark:hover:bg-red-900/20',
                            'transition-colors'
                          )}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
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
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout button */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={onCheckout}
                  >
                    Checkout
                  </Button>

                  {/* Continue shopping */}
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

export default CartDrawer
