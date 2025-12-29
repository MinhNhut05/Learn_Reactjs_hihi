/**
 * EXERCISE 1 SOLUTION: FORM BUILDER VỚI UTILITY TYPES
 */

import { useState, ChangeEvent, FormEvent } from 'react'

// ===== TYPE DEFINITIONS =====

interface FormFieldConfig {
  type: 'text' | 'email' | 'password' | 'number'
  label: string
  placeholder: string
  required: boolean
  defaultValue: string
}

type FormConfig = Record<string, FormFieldConfig>

type FormValues<T extends FormConfig> = Record<keyof T, string>

type FormErrors<T extends FormConfig> = Partial<Record<keyof T, string>>

// ===== FORM CONFIG =====

const loginFormConfig = {
  email: {
    type: 'email' as const,
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    defaultValue: '',
  },
  password: {
    type: 'password' as const,
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
    defaultValue: '',
  },
} satisfies FormConfig

// ===== VALIDATION FUNCTION =====

function validateForm<T extends FormConfig>(
  config: T,
  values: FormValues<T>
): FormErrors<T> {
  const errors: FormErrors<T> = {}

  for (const [fieldName, fieldConfig] of Object.entries(config)) {
    const value = values[fieldName as keyof T]

    // Check required
    if (fieldConfig.required && !value) {
      errors[fieldName as keyof T] = `${fieldConfig.label} is required`
      continue
    }

    // Validate email
    if (fieldConfig.type === 'email' && value && !value.includes('@')) {
      errors[fieldName as keyof T] = 'Invalid email format'
    }

    // Validate password
    if (fieldConfig.type === 'password' && value && value.length < 6) {
      errors[fieldName as keyof T] = 'Password must be at least 6 characters'
    }
  }

  return errors
}

// ===== FORM BUILDER COMPONENT =====

interface FormBuilderProps<T extends FormConfig> {
  config: T
  onSubmit: (values: FormValues<T>) => void
}

function FormBuilder<T extends FormConfig>({
  config,
  onSubmit,
}: FormBuilderProps<T>) {
  // Initialize values từ config defaultValue
  const initialValues = Object.entries(config).reduce((acc, [key, field]) => {
    acc[key as keyof T] = field.defaultValue
    return acc
  }, {} as FormValues<T>)

  const [values, setValues] = useState<FormValues<T>>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})

  const handleChange = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Clear error khi user bắt đầu type
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateForm(config, values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h3>Login Form</h3>

      {Object.entries(config).map(([fieldName, fieldConfig]) => (
        <div key={fieldName} style={{ marginBottom: '15px' }}>
          <label
            htmlFor={fieldName}
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            {fieldConfig.label}
            {fieldConfig.required && <span style={{ color: 'red' }}> *</span>}
          </label>

          <input
            id={fieldName}
            type={fieldConfig.type}
            placeholder={fieldConfig.placeholder}
            value={values[fieldName as keyof T]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(fieldName as keyof T, e.target.value)
            }
            style={{
              width: '100%',
              padding: '8px',
              border: errors[fieldName as keyof T]
                ? '1px solid red'
                : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />

          {errors[fieldName as keyof T] && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors[fieldName as keyof T]}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  )
}

// ===== DEMO COMPONENT =====

export default function Ex1_FormBuilder_Solution() {
  const handleSubmit = (values: FormValues<typeof loginFormConfig>) => {
    console.log('Form submitted:', values)
    alert(`Login successful!\nEmail: ${values.email}\nPassword: ${values.password}`)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Exercise 1 SOLUTION: Form Builder với Utility Types</h2>

      <FormBuilder config={loginFormConfig} onSubmit={handleSubmit} />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e9' }}>
        <h4>✅ Solution Features:</h4>
        <ul>
          <li>
            ✅ <strong>Record&lt;K, V&gt;</strong>: FormConfig = Record&lt;string,
            FormFieldConfig&gt;
          </li>
          <li>
            ✅ <strong>keyof</strong>: FormValues&lt;T&gt; = Record&lt;keyof T,
            string&gt;
          </li>
          <li>
            ✅ <strong>Partial</strong>: FormErrors&lt;T&gt; = Partial&lt;Record&lt;keyof
            T, string&gt;&gt;
          </li>
          <li>✅ Type-safe form handling với generics</li>
          <li>✅ Dynamic field rendering từ config</li>
          <li>✅ Validation: required, email format, password length</li>
          <li>✅ Real-time error clearing khi user types</li>
        </ul>
      </div>
    </div>
  )
}
