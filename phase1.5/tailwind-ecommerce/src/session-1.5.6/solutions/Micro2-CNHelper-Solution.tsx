/**
 * Micro Exercise 2: cn() Helper - SOLUTION
 * Session 1.5.6 - Headless UI & Production
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn() helper - combines clsx + tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Test component
export default function Micro2CNHelperSolution() {
  const isActive = true
  const isDisabled = false
  const customClass = 'p-8' // Should override p-4

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Micro 2: cn() Helper - Solution</h1>

      {/* Test 1: Basic usage */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 1: Basic Usage</h2>
        <div className={cn('px-4 py-2', 'bg-blue-500', 'text-white rounded-lg')}>
          Basic: px-4 py-2 bg-blue-500 text-white rounded-lg
        </div>
        <code className="text-sm text-gray-500">
          Result: {cn('px-4 py-2', 'bg-blue-500', 'text-white rounded-lg')}
        </code>
      </div>

      {/* Test 2: Conditional classes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 2: Conditional Classes</h2>
        <div
          className={cn(
            'px-4 py-2 rounded-lg',
            isActive && 'bg-green-500 text-white',
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          isActive={String(isActive)}, isDisabled={String(isDisabled)}
        </div>
        <code className="text-sm text-gray-500">
          Result: {cn(
            'px-4 py-2 rounded-lg',
            isActive && 'bg-green-500 text-white',
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
        </code>
      </div>

      {/* Test 3: Conflicting classes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 3: Conflicting Classes</h2>
        <p className="text-sm text-gray-500">
          p-8 overrides p-4 (tailwind-merge)
        </p>
        <div className={cn('p-4 bg-yellow-500 rounded-lg', customClass)}>
          Base: p-4, Override: p-8 → Result: p-8
        </div>
        <code className="text-sm text-gray-500">
          Result: {cn('p-4 bg-yellow-500 rounded-lg', customClass)}
        </code>
      </div>

      {/* Test 4: Override colors */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 4: Override Colors</h2>
        <div
          className={cn(
            'px-4 py-2 rounded-lg bg-gray-100',
            'text-red-500',
            'text-blue-500'
          )}
        >
          Result is text-blue-500 (last wins)
        </div>
        <code className="text-sm text-gray-500">
          Result: {cn(
            'px-4 py-2 rounded-lg bg-gray-100',
            'text-red-500',
            'text-blue-500'
          )}
        </code>
      </div>

      {/* Test 5: Object syntax */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 5: Object Syntax (clsx)</h2>
        <div
          className={cn('px-4 py-2 rounded-lg', {
            'bg-green-500 text-white': isActive,
            'bg-red-500': !isActive,
            'opacity-50': isDisabled,
          })}
        >
          Object syntax with clsx
        </div>
        <code className="text-sm text-gray-500">
          Result: {cn('px-4 py-2 rounded-lg', {
            'bg-green-500 text-white': isActive,
            'bg-red-500': !isActive,
            'opacity-50': isDisabled,
          })}
        </code>
      </div>

      {/* Code example */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Implementation</h2>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage examples:
cn('base', condition && 'conditional')
cn('p-4', 'p-8')  // => 'p-8'
cn('text-red-500', 'text-blue-500')  // => 'text-blue-500'
cn('base', { active: isActive, disabled: isDisabled })`}
        </pre>
      </div>
    </div>
  )
}
