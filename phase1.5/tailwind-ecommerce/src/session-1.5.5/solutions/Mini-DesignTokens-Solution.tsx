/**
 * SOLUTION - Mini: E-commerce Design Tokens
 *
 * Design system hoan chinh voi:
 * - Brand colors (green)
 * - Button variants
 * - Input fields
 * - Badges va Alerts
 */

import { useState } from 'react'

export default function MiniDesignTokensSolution() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Mini: E-commerce Design System - SOLUTION</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Button Showcase */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Button Variants</h2>

          <div className="space-y-4">
            {/* Primary Button */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">.btn-primary</label>
              <button className="btn-primary">Add to Cart</button>
            </div>

            {/* Secondary Button */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">.btn-secondary</label>
              <button className="btn-secondary">View Details</button>
            </div>

            {/* Outline Button */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">.btn-outline</label>
              <button className="btn-outline">Learn More</button>
            </div>

            {/* Button Row */}
            <div className="pt-4 border-t">
              <label className="text-sm text-gray-500 block mb-2">Button Group</label>
              <div className="flex gap-3">
                <button className="btn-primary">Buy Now</button>
                <button className="btn-outline">Wishlist</button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Showcase */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Input Fields</h2>

          <form className="space-y-4">
            {/* Default Input */}
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>

        {/* Color Palette */}
        <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Color Palette</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Brand Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Brand (Green)</h3>
              <div className="space-y-1">
                <div className="h-8 bg-brand-50 rounded flex items-center px-2 text-xs">50</div>
                <div className="h-8 bg-brand-100 rounded flex items-center px-2 text-xs">100</div>
                <div className="h-8 bg-brand-500 rounded flex items-center px-2 text-xs text-white">500</div>
                <div className="h-8 bg-brand-600 rounded flex items-center px-2 text-xs text-white">600</div>
                <div className="h-8 bg-brand-900 rounded flex items-center px-2 text-xs text-white">900</div>
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Accent (Amber)</h3>
              <div className="space-y-1">
                <div className="h-8 bg-accent-50 rounded flex items-center px-2 text-xs">50</div>
                <div className="h-8 bg-accent-100 rounded flex items-center px-2 text-xs">100</div>
                <div className="h-8 bg-accent-500 rounded flex items-center px-2 text-xs text-white">500</div>
                <div className="h-8 bg-accent-600 rounded flex items-center px-2 text-xs text-white">600</div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Semantic</h3>
              <div className="space-y-1">
                <div className="h-8 bg-success rounded flex items-center px-2 text-xs text-white">Success</div>
                <div className="h-8 bg-error rounded flex items-center px-2 text-xs text-white">Error</div>
                <div className="h-8 bg-warning rounded flex items-center px-2 text-xs text-white">Warning</div>
                <div className="h-8 bg-info rounded flex items-center px-2 text-xs text-white">Info</div>
              </div>
            </div>

            {/* Neutral */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Neutral</h3>
              <div className="space-y-1">
                <div className="h-8 bg-gray-50 rounded flex items-center px-2 text-xs">50</div>
                <div className="h-8 bg-gray-200 rounded flex items-center px-2 text-xs">200</div>
                <div className="h-8 bg-gray-500 rounded flex items-center px-2 text-xs text-white">500</div>
                <div className="h-8 bg-gray-900 rounded flex items-center px-2 text-xs text-white">900</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages using alert classes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="alert-success">
          <p className="text-sm font-medium">Success message</p>
        </div>
        <div className="alert-error">
          <p className="text-sm font-medium">Error message</p>
        </div>
        <div className="alert-warning">
          <p className="text-sm font-medium">Warning message</p>
        </div>
        <div className="alert-info">
          <p className="text-sm font-medium">Info message</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <span className="badge-brand">Brand</span>
          <span className="badge-success">Success</span>
          <span className="badge-error">Error</span>
          <span className="badge-warning">Warning</span>
          <span className="badge-info">Info</span>
        </div>
      </div>
    </div>
  )
}

/**
 * DESIGN SYSTEM COMPLETE:
 *
 * 1. COLORS (in @theme):
 *    - brand-50 to brand-900 (green)
 *    - accent-50 to accent-600 (amber)
 *    - success, error, warning, info
 *
 * 2. BUTTONS (in @layer components):
 *    - .btn (base)
 *    - .btn-primary, .btn-secondary, .btn-outline
 *    - .btn-ghost, .btn-danger
 *
 * 3. INPUTS:
 *    - .input-field
 *    - .input-error, .input-success
 *
 * 4. FORM HELPERS:
 *    - .form-label
 *    - .form-helper, .form-error
 *
 * 5. ALERTS:
 *    - .alert-success, .alert-error
 *    - .alert-warning, .alert-info
 *
 * 6. BADGES:
 *    - .badge-brand, .badge-success
 *    - .badge-error, .badge-warning, .badge-info
 */
