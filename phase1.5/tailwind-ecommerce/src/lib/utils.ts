/**
 * Utility Functions - Session 1.5.6
 *
 * cn() - Combines clsx and tailwind-merge for optimal class handling
 *
 * Usage:
 * cn('base-class', isActive && 'active', className)
 * cn('p-4 bg-white', 'p-8')  // => 'p-8 bg-white' (conflicts resolved)
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class values and merges Tailwind CSS classes intelligently.
 *
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 *
 * @example
 * // Conditional classes
 * cn('base', isActive && 'active', isDisabled && 'disabled')
 * // => 'base active' (if isActive is true)
 *
 * @example
 * // Conflict resolution
 * cn('p-4', 'p-8')
 * // => 'p-8' (last value wins for conflicting utilities)
 *
 * @example
 * // With props override
 * cn('p-4 rounded-lg', className)
 * // className can override any default value
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
