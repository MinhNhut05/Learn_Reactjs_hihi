/**
 * Mini Exercise: E-commerce Modal (Quick View) - SOLUTION
 * Session 1.5.6 - Headless UI & Production
 */

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { cn } from '../../lib/utils'

// Sample product data
const sampleProduct = {
  id: 1,
  name: 'Premium Wireless Headphones',
  price: 299.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  description:
    'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.',
  features: ['Active Noise Cancellation', '30-hour Battery', 'Premium Comfort'],
}

interface QuickViewModalProps {
  open: boolean
  onClose: () => void
  product: typeof sampleProduct
  onAddToCart?: () => void
}

function QuickViewModal({
  open,
  onClose,
  product,
  onAddToCart,
}: QuickViewModalProps) {
  const handleAddToCart = () => {
    onAddToCart?.()
    onClose()
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop with blur */}
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

        {/* Modal container */}
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
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className={cn(
                  'absolute top-4 right-4 z-10',
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

              <div className="grid md:grid-cols-2">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col">
                  <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </Dialog.Title>

                  <p className="text-2xl font-bold text-brand-500 mt-2">
                    ${product.price.toFixed(2)}
                  </p>

                  <Dialog.Description className="text-gray-600 dark:text-gray-400 mt-4">
                    {product.description}
                  </Dialog.Description>

                  {/* Features */}
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      'mt-auto pt-6',
                      'w-full bg-brand-500 text-white',
                      'px-4 py-3 rounded-lg',
                      'font-medium',
                      'hover:bg-brand-600',
                      'active:scale-95',
                      'transition-all duration-200'
                    )}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

// Test component
export default function MiniModalSolution() {
  const [isOpen, setIsOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Mini: Quick View Modal - Solution</h1>

      <div className="space-y-4">
        <p className="text-gray-600">
          Click the button below to open the Quick View modal with Headless UI.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
          >
            Quick View
          </button>

          {addedToCart && (
            <span className="text-green-500 animate-pulse">
              Added to cart!
            </span>
          )}
        </div>
      </div>

      <QuickViewModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        product={sampleProduct}
        onAddToCart={handleAddToCart}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Features Implemented</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2 text-green-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Headless UI Dialog
          </li>
          <li className="flex items-center gap-2 text-green-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Transition animations (fade + scale)
          </li>
          <li className="flex items-center gap-2 text-green-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Backdrop blur effect
          </li>
          <li className="flex items-center gap-2 text-green-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Click outside to close
          </li>
          <li className="flex items-center gap-2 text-green-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Close button
          </li>
          <li className="flex items-center gap-2 text-green-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Keyboard accessible (Escape to close)
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Key Code Patterns</h2>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<Transition show={open} as={Fragment}>
  <Dialog onClose={onClose}>
    {/* Backdrop */}
    <Transition.Child
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    </Transition.Child>

    {/* Panel */}
    <Transition.Child
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Dialog.Panel>
        {/* Content */}
      </Dialog.Panel>
    </Transition.Child>
  </Dialog>
</Transition>`}
        </pre>
      </div>
    </div>
  )
}
