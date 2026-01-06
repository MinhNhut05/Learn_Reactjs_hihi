/**
 * SOLUTION - BÀI TẬP 2: CONTACT FORM với Validation
 */

import { useState, useEffect, FormEvent, ChangeEvent, FocusEvent, ReactNode } from 'react'

// ============================================
// Types & Interfaces
// ============================================

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: 'general' | 'support' | 'sales' | 'other'
  message: string
}

interface FormFieldState {
  value: string
  error: string
  touched: boolean
}

type FormState = Record<keyof ContactFormData, FormFieldState>

// ============================================
// useDebounce Hook
// ============================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// ============================================
// Validation Functions
// ============================================

function validateName(value: string): string {
  if (!value.trim()) return 'Name is required'
  if (value.trim().length < 2) return 'Name must be at least 2 characters'
  return ''
}

function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Invalid email format'
  return ''
}

function validatePhone(value: string): string {
  // Optional field
  if (!value.trim()) return ''
  const phoneRegex = /^\d{10,11}$/
  if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
    return 'Phone must be 10-11 digits'
  }
  return ''
}

function validateSubject(value: string): string {
  if (!value || value === '') return 'Please select a subject'
  return ''
}

function validateMessage(value: string): string {
  if (!value.trim()) return 'Message is required'
  if (value.trim().length < 10) return 'Message must be at least 10 characters'
  if (value.length > 500) return 'Message must be less than 500 characters'
  return ''
}

// ============================================
// FormField Component
// ============================================

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  value: string
  error: string
  touched: boolean
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  error,
  touched,
  placeholder,
  onChange,
  onBlur
}: FormFieldProps) {
  const showError = touched && error

  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#374151'
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: `1px solid ${showError ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: '8px',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
      />
      {showError && (
        <div style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444' }}>
          {error}
        </div>
      )}
    </div>
  )
}

// ============================================
// SelectField Component
// ============================================

interface SelectFieldProps {
  label: string
  name: string
  value: string
  error: string
  touched: boolean
  options: Array<{ value: string; label: string }>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: FocusEvent<HTMLSelectElement>) => void
}

function SelectField({
  label,
  name,
  value,
  error,
  touched,
  options,
  onChange,
  onBlur
}: SelectFieldProps) {
  const showError = touched && error

  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#374151'
        }}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: `1px solid ${showError ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: '8px',
          outline: 'none'
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {showError && (
        <div style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444' }}>
          {error}
        </div>
      )}
    </div>
  )
}

// ============================================
// TextAreaField Component
// ============================================

interface TextAreaFieldProps {
  label: string
  name: string
  value: string
  error: string
  touched: boolean
  placeholder?: string
  maxLength?: number
  rows?: number
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void
}

function TextAreaField({
  label,
  name,
  value,
  error,
  touched,
  placeholder,
  maxLength = 500,
  rows = 5,
  onChange,
  onBlur
}: TextAreaFieldProps) {
  const showError = touched && error
  const isNearLimit = value.length > maxLength * 0.8

  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#374151'
        }}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: `1px solid ${showError ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: '8px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        {showError ? (
          <div style={{ fontSize: '14px', color: '#ef4444' }}>{error}</div>
        ) : (
          <div />
        )}
        <div
          style={{
            fontSize: '14px',
            color: isNearLimit ? '#f59e0b' : '#9ca3af'
          }}
        >
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  )
}

// ============================================
// FormStatus Component
// ============================================

interface FormStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

function FormStatus({ status, message }: FormStatusProps) {
  if (status === 'idle') return null

  const statusStyles = {
    loading: { backgroundColor: '#dbeafe', color: '#1e40af' },
    success: { backgroundColor: '#dcfce7', color: '#15803d' },
    error: { backgroundColor: '#fee2e2', color: '#dc2626' }
  }

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
        ...statusStyles[status]
      }}
    >
      {status === 'loading' && '⏳ Sending message...'}
      {status === 'success' && `✅ ${message || 'Message sent successfully!'}`}
      {status === 'error' && `❌ ${message || 'Failed to send message'}`}
    </div>
  )
}

// ============================================
// Main ContactForm Component
// ============================================

const createInitialFieldState = (): FormFieldState => ({
  value: '',
  error: '',
  touched: false
})

const initialFormState: FormState = {
  name: createInitialFieldState(),
  email: createInitialFieldState(),
  phone: createInitialFieldState(),
  subject: createInitialFieldState(),
  message: createInitialFieldState()
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // Debounced values
  const debouncedName = useDebounce(formState.name.value, 500)
  const debouncedEmail = useDebounce(formState.email.value, 500)
  const debouncedPhone = useDebounce(formState.phone.value, 500)
  const debouncedMessage = useDebounce(formState.message.value, 500)

  // Debounced validation
  useEffect(() => {
    if (formState.name.touched) {
      setFormState(prev => ({
        ...prev,
        name: { ...prev.name, error: validateName(debouncedName) }
      }))
    }
  }, [debouncedName])

  useEffect(() => {
    if (formState.email.touched) {
      setFormState(prev => ({
        ...prev,
        email: { ...prev.email, error: validateEmail(debouncedEmail) }
      }))
    }
  }, [debouncedEmail])

  useEffect(() => {
    if (formState.phone.touched) {
      setFormState(prev => ({
        ...prev,
        phone: { ...prev.phone, error: validatePhone(debouncedPhone) }
      }))
    }
  }, [debouncedPhone])

  useEffect(() => {
    if (formState.message.touched) {
      setFormState(prev => ({
        ...prev,
        message: { ...prev.message, error: validateMessage(debouncedMessage) }
      }))
    }
  }, [debouncedMessage])

  // Handle field change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        value,
        error: '' // Clear error on change
      }
    }))
  }

  // Handle field blur
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormState

    // Mark as touched
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[fieldName],
        touched: true
      }
    }))

    // Validate immediately on blur
    let error = ''
    switch (fieldName) {
      case 'name':
        error = validateName(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'phone':
        error = validatePhone(value)
        break
      case 'subject':
        error = validateSubject(value)
        break
      case 'message':
        error = validateMessage(value)
        break
    }

    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[fieldName],
        error
      }
    }))
  }

  // Validate all fields
  const validateAll = (): boolean => {
    const newFormState: FormState = {
      name: {
        value: formState.name.value,
        error: validateName(formState.name.value),
        touched: true
      },
      email: {
        value: formState.email.value,
        error: validateEmail(formState.email.value),
        touched: true
      },
      phone: {
        value: formState.phone.value,
        error: validatePhone(formState.phone.value),
        touched: true
      },
      subject: {
        value: formState.subject.value,
        error: validateSubject(formState.subject.value),
        touched: true
      },
      message: {
        value: formState.message.value,
        error: validateMessage(formState.message.value),
        touched: true
      }
    }

    setFormState(newFormState)

    return Object.values(newFormState).every(field => !field.error)
  }

  // Check if form is valid
  const isFormValid = (): boolean => {
    return (
      formState.name.value.trim() !== '' &&
      !formState.name.error &&
      formState.email.value.trim() !== '' &&
      !formState.email.error &&
      !formState.phone.error && // Phone is optional
      formState.subject.value !== '' &&
      !formState.subject.error &&
      formState.message.value.trim() !== '' &&
      !formState.message.error
    )
  }

  // Handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateAll()) return

    setSubmitStatus('loading')

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate

      if (success) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you! Your message has been sent.')
        setFormState(initialFormState) // Reset form
      } else {
        setSubmitStatus('error')
        setSubmitMessage('Failed to send message. Please try again.')
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitMessage('')
      }, 5000)
    }, 2000)
  }

  const subjectOptions = [
    { value: '', label: 'Select a subject...' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales Question' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '24px', color: '#1f2937' }}>Contact Us</h1>

      <FormStatus status={submitStatus} message={submitMessage} />

      <form onSubmit={handleSubmit}>
        <FormField
          label="Name *"
          name="name"
          type="text"
          value={formState.name.value}
          error={formState.name.error}
          touched={formState.name.touched}
          placeholder="John Doe"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormField
          label="Email *"
          name="email"
          type="email"
          value={formState.email.value}
          error={formState.email.error}
          touched={formState.email.touched}
          placeholder="john@example.com"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormField
          label="Phone (Optional)"
          name="phone"
          type="tel"
          value={formState.phone.value}
          error={formState.phone.error}
          touched={formState.phone.touched}
          placeholder="0123456789"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <SelectField
          label="Subject *"
          name="subject"
          value={formState.subject.value}
          error={formState.subject.error}
          touched={formState.subject.touched}
          options={subjectOptions}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextAreaField
          label="Message *"
          name="message"
          value={formState.message.value}
          error={formState.message.error}
          touched={formState.message.touched}
          placeholder="Tell us what's on your mind..."
          maxLength={500}
          rows={5}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <button
          type="submit"
          disabled={!isFormValid() || submitStatus === 'loading'}
          style={{
            width: '100%',
            padding: '12px 24px',
            backgroundColor: isFormValid() && submitStatus !== 'loading' ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: isFormValid() && submitStatus !== 'loading' ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
        >
          {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
