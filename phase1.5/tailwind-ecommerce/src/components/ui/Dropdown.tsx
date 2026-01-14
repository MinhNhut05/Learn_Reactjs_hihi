/**
 * Dropdown Component - Session 1.5.6
 *
 * Accessible dropdown menu using Headless UI Menu with Tailwind styling.
 *
 * Features:
 * - Keyboard navigation (arrows, enter, escape)
 * - Auto-positioning
 * - Focus management
 * - Smooth animations
 *
 * Usage:
 * <Dropdown
 *   trigger={<button>Options</button>}
 *   items={[
 *     { label: 'Edit', onClick: () => {} },
 *     { label: 'Delete', onClick: () => {}, danger: true },
 *   ]}
 * />
 */

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface DropdownItem {
  label: string
  onClick: () => void
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({
  trigger,
  items,
  align = 'right',
  className,
}: DropdownProps) {
  return (
    <Menu as="div" className={cn('relative inline-block text-left', className)}>
      {/* Trigger button */}
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>

      {/* Dropdown panel */}
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
            'absolute mt-2 w-56 origin-top-right',
            'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
            'ring-1 ring-black/5 dark:ring-white/10',
            'focus:outline-none',
            'z-50',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="p-1">
            {items.map((item, index) => (
              <Menu.Item key={index} disabled={item.disabled}>
                {({ active, disabled }) => (
                  <button
                    onClick={item.onClick}
                    disabled={disabled}
                    className={cn(
                      'group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm',
                      'transition-colors duration-150',
                      active && !item.danger && 'bg-brand-500 text-white',
                      active && item.danger && 'bg-red-500 text-white',
                      !active && !item.danger && 'text-gray-900 dark:text-gray-100',
                      !active && item.danger && 'text-red-500',
                      disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {item.icon && (
                      <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

// Alternative: Composable dropdown parts
export function DropdownMenu({ children }: { children: ReactNode }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {children}
    </Menu>
  )
}

export function DropdownTrigger({ children }: { children: ReactNode }) {
  return <Menu.Button as={Fragment}>{children}</Menu.Button>
}

export function DropdownContent({
  children,
  align = 'right',
}: {
  children: ReactNode
  align?: 'left' | 'right'
}) {
  return (
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
          'absolute mt-2 w-56 origin-top-right',
          'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
          'ring-1 ring-black/5 dark:ring-white/10',
          'focus:outline-none p-1',
          'z-50',
          align === 'right' ? 'right-0' : 'left-0'
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  )
}

export function DropdownItem({
  children,
  onClick,
  danger = false,
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  danger?: boolean
  disabled?: boolean
}) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <button
          onClick={onClick}
          className={cn(
            'group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm',
            'transition-colors duration-150',
            active && !danger && 'bg-brand-500 text-white',
            active && danger && 'bg-red-500 text-white',
            !active && !danger && 'text-gray-900 dark:text-gray-100',
            !active && danger && 'text-red-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

export default Dropdown
