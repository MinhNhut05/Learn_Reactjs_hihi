/**
 * EXERCISE 3 SOLUTION: ADVANCED TYPE PATTERNS
 */

import { useState, useEffect } from 'react'

// ===== PART 1: CONDITIONAL TYPES =====

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type ExtractArrayType<T> = T extends (infer E)[] ? E : never

// Test cases
type TestA = UnwrapPromise<Promise<string>> // string
type TestB = UnwrapPromise<number> // number
type TestC = ExtractArrayType<string[]> // string
type TestD = ExtractArrayType<number> // never

// ===== PART 2: TYPE GUARDS =====

interface User {
  id: number
  name: string
  email: string
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    typeof (obj as any).id === 'number' &&
    'name' in obj &&
    typeof (obj as any).name === 'string' &&
    'email' in obj &&
    typeof (obj as any).email === 'string'
  )
}

function isError(obj: unknown): obj is Error {
  return obj instanceof Error
}

// ===== PART 3: DISCRIMINATED UNIONS =====

type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function handleApiResponse<T>(response: ApiResponse<T>): string {
  switch (response.status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return `Success: ${JSON.stringify(response.data)}`
    case 'error':
      return `Error: ${response.error}`
    default:
      // Exhaustive checking
      const _exhaustive: never = response
      throw new Error(`Unhandled case: ${_exhaustive}`)
  }
}

// ===== PART 4: TEMPLATE LITERAL TYPES =====

type Event = 'click' | 'hover' | 'focus' | 'blur'

type EventHandlerName = `on${Capitalize<Event>}`
// 'onClick' | 'onHover' | 'onFocus' | 'onBlur'

type EventHandlers = Record<EventHandlerName, () => void>

// Example EventHandlers object
const handlers: EventHandlers = {
  onClick: () => console.log('clicked'),
  onHover: () => console.log('hovered'),
  onFocus: () => console.log('focused'),
  onBlur: () => console.log('blurred'),
}

// ===== PART 5: FETCH HOOK WITH DISCRIMINATED UNIONS =====

function useFetchWithStates<T>(url: string): ApiResponse<T> {
  const [state, setState] = useState<ApiResponse<T>>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setState({ status: 'loading' })

        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setState({ status: 'success', data })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setState({
          status: 'error',
          error: err instanceof Error ? err.message : 'An error occurred',
        })
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return state
}

// ===== DEMO COMPONENT =====

interface Post {
  id: number
  title: string
  body: string
}

export default function Ex3_AdvancedPatterns_Solution() {
  const apiResponse = useFetchWithStates<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=3'
  )

  const testTypeGuards = () => {
    const validUser = { id: 1, name: 'John', email: 'john@example.com' }
    const invalidUser = { id: 1, name: 'John' }
    const error = new Error('Test error')
    const notError = 'error string'

    console.log('isUser(validUser):', isUser(validUser)) // true
    console.log('isUser(invalidUser):', isUser(invalidUser)) // false
    console.log('isError(error):', isError(error)) // true
    console.log('isError(notError):', isError(notError)) // false

    // Demonstrate type narrowing
    if (isUser(validUser)) {
      console.log('User name:', validUser.name) // TypeScript knows it's User
    }
  }

  const testConditionalTypes = () => {
    console.log('Conditional Types:')
    console.log('UnwrapPromise<Promise<string>> = string')
    console.log('UnwrapPromise<number> = number')
    console.log('ExtractArrayType<string[]> = string')
    console.log('ExtractArrayType<number> = never')
  }

  const testTemplateLiterals = () => {
    console.log('Event Handlers:', Object.keys(handlers))
    // ['onClick', 'onHover', 'onFocus', 'onBlur']

    handlers.onClick()
    handlers.onHover()
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Exercise 3 SOLUTION: Advanced Type Patterns</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. Conditional Types</h3>
        <button onClick={testConditionalTypes}>Test Conditional Types (Check Console)</button>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
          {`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ExtractArrayType<T> = T extends (infer E)[] ? E : never

type A = UnwrapPromise<Promise<string>> // string ✅
type B = UnwrapPromise<number>          // number ✅
type C = ExtractArrayType<string[]>     // string ✅
type D = ExtractArrayType<number>       // never ✅`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Type Guards</h3>
        <button onClick={testTypeGuards}>Test Type Guards (Check Console)</button>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
          {`function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj && typeof (obj as any).id === 'number' &&
    'name' in obj && typeof (obj as any).name === 'string' &&
    'email' in obj && typeof (obj as any).email === 'string'
  )
}`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Discriminated Unions - Fetch States</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        >
          {(() => {
            switch (apiResponse.status) {
              case 'loading':
                return (
                  <div style={{ color: '#007bff' }}>
                    <strong>Loading posts...</strong>
                  </div>
                )

              case 'success':
                return (
                  <div>
                    <h4 style={{ color: '#28a745' }}>✅ Success - Posts Loaded:</h4>
                    {apiResponse.data.map((post) => (
                      <div
                        key={post.id}
                        style={{
                          marginBottom: '15px',
                          padding: '10px',
                          backgroundColor: 'white',
                          borderRadius: '4px',
                        }}
                      >
                        <strong>
                          {post.id}. {post.title}
                        </strong>
                        <p style={{ margin: '5px 0 0', color: '#666' }}>
                          {post.body.substring(0, 100)}...
                        </p>
                      </div>
                    ))}
                  </div>
                )

              case 'error':
                return (
                  <div style={{ color: '#dc3545' }}>
                    <strong>❌ Error:</strong> {apiResponse.error}
                  </div>
                )

              default:
                // Exhaustive checking
                const _exhaustive: never = apiResponse
                throw new Error(`Unhandled case: ${_exhaustive}`)
            }
          })()}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. Template Literal Types</h3>
        <button onClick={testTemplateLiterals}>
          Test Template Literals (Check Console)
        </button>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
          {`type Event = 'click' | 'hover' | 'focus' | 'blur'
type EventHandlerName = \`on\${Capitalize<Event>}\`
// Result: 'onClick' | 'onHover' | 'onFocus' | 'onBlur' ✅

type EventHandlers = Record<EventHandlerName, () => void>`}
        </pre>
      </section>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e9' }}>
        <h4>✅ Solution Features:</h4>
        <ul>
          <li>
            ✅ <strong>Conditional Types</strong>: UnwrapPromise, ExtractArrayType với
            infer
          </li>
          <li>
            ✅ <strong>Type Guards</strong>: isUser, isError với type predicates
          </li>
          <li>
            ✅ <strong>Discriminated Unions</strong>: ApiResponse với 'status'
            discriminant
          </li>
          <li>
            ✅ <strong>Exhaustive Checking</strong>: never type trong default case
          </li>
          <li>
            ✅ <strong>Template Literal Types</strong>: EventHandlerName generation
          </li>
          <li>✅ useFetchWithStates hook với discriminated unions</li>
          <li>✅ Type narrowing works perfectly trong switch statements</li>
        </ul>
      </div>
    </div>
  )
}
