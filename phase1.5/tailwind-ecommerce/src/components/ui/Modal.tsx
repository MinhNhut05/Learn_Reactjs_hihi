/**
 * Modal Component - Session 1.5.6
 *
 * Accessible modal using Headless UI Dialog with Tailwind styling.
 *
 * Features:
 * - Smooth enter/leave animations
 * - Click outside to close
 * - Keyboard accessible (Escape to close)
 * - Focus trap
 * - Backdrop blur effect
 *
 * Usage:
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
 *   Modal content here...
 * </Modal>
 */

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
}: ModalProps) {
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
            <Dialog.Panel
              className={cn(
                'w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl',
                'transform transition-all',
                sizeClasses[size],
                className
              )}
            >
              {/* Header */}
              {(title || description) && (
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                  {title && (
                    <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={cn('p-6', !title && !description && 'pt-6')}>
                {children}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className={cn(
                  'absolute top-4 right-4',
                  'p-1 rounded-lg',
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
