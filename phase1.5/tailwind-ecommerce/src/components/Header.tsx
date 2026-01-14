/**
 * Header Component - Session 1.5.5 (Design System Version)
 *
 * E-commerce navigation header với đầy đủ interactive states:
 * - Logo với hover effect
 * - Search bar với focus states (ring, transition)
 * - User dropdown menu (group hover pattern)
 * - Cart với badge animation
 * - Navigation links với hover underline
 * - Smooth transitions everywhere
 *
 * UPDATE 1.5.5: Sử dụng brand colors (green) từ design system
 * - blue-* → brand-*
 * - Search input sử dụng input-field class
 */

import { useState } from 'react'

interface HeaderProps {
  cartItemCount?: number
  onMenuToggle?: () => void
  userName?: string
}

export default function Header({
  cartItemCount = 0,
  onMenuToggle,
  userName = 'User'
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Logo - với hover effect */}
        <div className="flex-none">
          <a
            href="/"
            className="
              text-xl md:text-2xl font-bold text-brand-600
              hover:text-brand-700
              transition-colors duration-200
            "
          >
            ShopName
          </a>
        </div>

        {/* Search Bar - với focus states */}
        <div className="hidden md:block flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="
                w-full px-4 py-2 pl-10
                border border-gray-300 rounded-lg
                outline-none
                transition-all duration-200
                hover:border-gray-400
                focus:border-transparent
                focus:ring-2 focus:ring-brand-500
                focus:shadow-md
              "
            />
            <span
              className={`
                absolute left-3 top-1/2 -translate-y-1/2
                transition-colors duration-200
                ${isSearchFocused ? 'text-brand-500' : 'text-gray-400'}
              `}
            >
              🔍
            </span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex-none flex items-center gap-2 md:gap-4">
          {/* Hamburger Menu - Mobile/Tablet only */}
          <button
            onClick={onMenuToggle}
            className="
              block lg:hidden p-2 rounded-full
              hover:bg-gray-100
              active:scale-95
              transition-all duration-150
            "
            aria-label="Toggle menu"
          >
            <span className="text-xl">☰</span>
          </button>

          {/* Mobile Search Icon */}
          <button
            className="
              block md:hidden p-2 rounded-full
              hover:bg-gray-100
              active:scale-95
              transition-all duration-150
            "
          >
            <span className="text-xl">🔍</span>
          </button>

          {/* Cart - với hover và badge animation */}
          <button
            className="
              relative p-2 rounded-full
              hover:bg-gray-100
              active:scale-95
              transition-all duration-150
              group
            "
          >
            <span className="text-xl group-hover:scale-110 inline-block transition-transform">
              🛒
            </span>
            {cartItemCount > 0 && (
              <span
                className="
                  absolute -top-1 -right-1
                  bg-red-500 text-white text-xs
                  w-5 h-5 rounded-full
                  flex items-center justify-center
                  animate-pulse
                "
              >
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </button>

          {/* User Dropdown - Group hover pattern */}
          <div className="hidden md:block relative group">
            {/* Trigger */}
            <button
              className="
                flex items-center gap-2 p-2 rounded-full
                hover:bg-gray-100
                transition-all duration-150
              "
            >
              <span className="text-xl">👤</span>
              <span
                className="
                  text-xs text-gray-400
                  group-hover:rotate-180
                  transition-transform duration-200
                "
              >
                ▼
              </span>
            </button>

            {/* Dropdown Menu - appears on group hover */}
            <div
              className="
                absolute top-full right-0 mt-1
                w-48 bg-white rounded-lg shadow-lg border border-gray-100
                opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-200
                z-30
              "
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Hello, {userName}</p>
                <p className="text-xs text-gray-500">View your account</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <DropdownItem href="/profile">My Profile</DropdownItem>
                <DropdownItem href="/orders">Orders</DropdownItem>
                <DropdownItem href="/wishlist">Wishlist</DropdownItem>
                <DropdownItem href="/settings">Settings</DropdownItem>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 py-1">
                <DropdownItem href="/logout" isDestructive>
                  Sign Out
                </DropdownItem>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Desktop only */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="flex justify-center gap-8 px-6 py-3">
          <NavLink href="/" isActive>Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/categories">Categories</NavLink>
          <NavLink href="/deals" highlight>Deals</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>
      </nav>
    </header>
  )
}

// Navigation Link Component với hover underline effect
function NavLink({
  href,
  children,
  isActive = false,
  highlight = false,
}: {
  href: string
  children: React.ReactNode
  isActive?: boolean
  highlight?: boolean
}) {
  return (
    <a
      href={href}
      className={`
        relative text-sm font-medium
        transition-colors duration-200
        group
        ${isActive
          ? 'text-brand-600'
          : highlight
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-600 hover:text-brand-600'
        }
      `}
    >
      {children}

      {/* Animated underline */}
      <span
        className={`
          absolute bottom-0 left-0 w-full h-0.5
          bg-current
          transform origin-left
          transition-transform duration-200
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
        `}
      />
    </a>
  )
}

// Dropdown Item Component
function DropdownItem({
  href,
  children,
  isDestructive = false,
}: {
  href: string
  children: React.ReactNode
  isDestructive?: boolean
}) {
  return (
    <a
      href={href}
      className={`
        block px-4 py-2 text-sm
        transition-colors duration-150
        ${isDestructive
          ? 'text-red-600 hover:bg-red-50'
          : 'text-gray-700 hover:bg-gray-50 hover:text-brand-600'
        }
      `}
    >
      {children}
    </a>
  )
}

/**
 * INTERACTIVE PATTERNS USED:
 *
 * 1. FOCUS STATES (Search Input):
 *    - focus:ring-2 focus:ring-blue-500
 *    - focus:border-transparent
 *    - focus:shadow-md
 *    - Icon color change on focus (useState)
 *
 * 2. GROUP HOVER (User Dropdown):
 *    - Parent: class="group"
 *    - Arrow: group-hover:rotate-180
 *    - Dropdown: opacity-0 invisible → group-hover:opacity-100 group-hover:visible
 *    - Translate: translate-y-2 → group-hover:translate-y-0
 *
 * 3. HOVER STATES:
 *    - Logo: hover:text-blue-700
 *    - Buttons: hover:bg-gray-100
 *    - Cart icon: group-hover:scale-110
 *    - Nav links: hover:text-blue-600
 *
 * 4. ACTIVE STATES:
 *    - Buttons: active:scale-95
 *
 * 5. TRANSITIONS:
 *    - All interactive elements have transitions
 *    - duration-150 cho micro interactions
 *    - duration-200 cho hover effects
 *
 * 6. NAV LINK UNDERLINE:
 *    - Animated underline using transform scale
 *    - scale-x-0 → group-hover:scale-x-100
 *    - origin-left để animate từ trái qua phải
 *
 * 7. BADGE ANIMATION:
 *    - animate-pulse cho cart badge
 */
