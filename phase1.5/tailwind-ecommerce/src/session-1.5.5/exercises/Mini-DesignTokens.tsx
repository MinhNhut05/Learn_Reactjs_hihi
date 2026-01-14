/**
 * MINI EXERCISE: E-commerce Design Tokens (20 phut)
 *
 * MUC TIEU:
 * Tao complete design system cho E-commerce project:
 * - Colors: brand, accent, success, error, warning
 * - Button classes: btn-primary, btn-secondary, btn-outline
 * - Input class: input-field voi focus states
 *
 * YEU CAU:
 *
 * 1. UPDATE src/index.css voi @theme:
 *    - brand colors (green): 50, 100, 500, 600, 700, 900
 *    - accent color (amber/orange)
 *    - success (green), error (red), warning (amber)
 *
 * 2. UPDATE src/styles/components.css:
 *    - .btn (base class)
 *    - .btn-primary, .btn-secondary, .btn-outline
 *    - .input-field voi hover va focus states
 *
 * 3. SU DUNG design system trong component nay
 */

import { useState } from "react";

export default function MiniDesignTokens() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Mini: E-commerce Design System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Button Showcase */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Button Variants
          </h2>

          <div className="space-y-4">
            {/* Primary Button */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                .btn-primary
              </label>
              {/* TODO: Thay thanh className="btn-primary" */}
              <button className="btn-primary">Add to Cart</button>
            </div>

            {/* Secondary Button */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                .btn-secondary
              </label>
              {/* TODO: Thay thanh className="btn-secondary" */}
              <button className="btn-secondary">View Details</button>
            </div>

            {/* Outline Button */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                .btn-outline
              </label>
              {/* TODO: Thay thanh className="btn-outline" */}
              <button className="btn-outline">Learn More</button>
            </div>

            {/* Button Row */}
            <div className="pt-4 border-t">
              <label className="text-sm text-gray-500 block mb-2">
                Button Group
              </label>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium">
                  Buy Now
                </button>
                <button className="px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg font-medium">
                  Wishlist
                </button>
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
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Email Address
              </label>
              {/* TODO: Thay thanh className="input-field" */}
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
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Password
              </label>
              {/* TODO: Thay thanh className="input-field" */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field
                "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Color Palette */}
        <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Color Palette
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Brand Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Brand (Green)
              </h3>
              <div className="space-y-1">
                <div className="h-8 bg-brand-50 rounded flex items-center px-2 text-xs">
                  50
                </div>
                <div className="h-8 bg-brand-100 rounded flex items-center px-2 text-xs">
                  100
                </div>
                <div className="h-8 bg-brand-500 rounded flex items-center px-2 text-xs text-white">
                  500
                </div>
                <div className="h-8 bg-brand-600 rounded flex items-center px-2 text-xs text-white">
                  600
                </div>
                <div className="h-8 bg-brand-900 rounded flex items-center px-2 text-xs text-white">
                  900
                </div>
              </div>
              {/* TODO: Doi thanh bg-brand-* sau khi config */}
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Accent (Amber)
              </h3>
              <div className="space-y-1">
                <div className="h-8 bg-accent-50 rounded flex items-center px-2 text-xs">
                  50
                </div>
                <div className="h-8 bg-accent-100 rounded flex items-center px-2 text-xs">
                  100
                </div>
                <div className="h-8 bg-accent-500 rounded flex items-center px-2 text-xs text-white">
                  500
                </div>
                <div className="h-8 bg-accent-600 rounded flex items-center px-2 text-xs text-white">
                  600
                </div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Semantic
              </h3>
              <div className="space-y-1">
                <div className="h-8 bg-green-500 rounded flex items-center px-2 text-xs text-white">
                  Success
                </div>
                <div className="h-8 bg-red-500 rounded flex items-center px-2 text-xs text-white">
                  Error
                </div>
                <div className="h-8 bg-amber-500 rounded flex items-center px-2 text-xs text-white">
                  Warning
                </div>
                <div className="h-8 bg-blue-500 rounded flex items-center px-2 text-xs text-white">
                  Info
                </div>
              </div>
            </div>

            {/* Neutral */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Neutral
              </h3>
              <div className="space-y-1">
                <div className="h-8 bg-gray-50 rounded flex items-center px-2 text-xs">
                  50
                </div>
                <div className="h-8 bg-gray-200 rounded flex items-center px-2 text-xs">
                  200
                </div>
                <div className="h-8 bg-gray-500 rounded flex items-center px-2 text-xs text-white">
                  500
                </div>
                <div className="h-8 bg-gray-900 rounded flex items-center px-2 text-xs text-white">
                  900
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-medium">Success message</p>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium">Error message</p>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 text-sm font-medium">Warning message</p>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm font-medium">Info message</p>
        </div>
      </div>
    </div>
  );
}

/**
 * DESIGN SYSTEM CHECKLIST:
 *
 * 1. COLORS (@theme):
 *    [ ] brand-50, brand-100, brand-500, brand-600, brand-700, brand-900
 *    [ ] accent colors (optional)
 *    [ ] semantic: success, error, warning, info
 *
 * 2. BUTTONS (@layer components):
 *    [ ] .btn (base class)
 *    [ ] .btn-primary (green, main CTA)
 *    [ ] .btn-secondary (gray, secondary action)
 *    [ ] .btn-outline (bordered, tertiary)
 *
 * 3. INPUTS (@layer components):
 *    [ ] .input-field (base input with focus ring)
 *    [ ] .input-error (red border/ring)
 *    [ ] .input-success (green border/ring)
 *
 * 4. USAGE:
 *    [ ] Thay inline classes bang design system classes
 *    [ ] Dam bao consistency toan bo project
 */
