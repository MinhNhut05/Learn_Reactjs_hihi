/**
 * EXERCISE 3: ADVANCED TYPE PATTERNS
 *
 * 🎯 MỤC TIÊU:
 * - Sử dụng Conditional Types cho type transformation
 * - Implement Type Guards cho runtime type checking
 * - Sử dụng Discriminated Unions cho state management
 * - Exhaustive checking với never type
 * - Template Literal Types cho dynamic keys
 *
 * 📚 CONCEPTS:
 * - Conditional Types: T extends U ? X : Y
 * - Type Guards: value is Type
 * - Discriminated Unions: Union với common discriminant property
 * - Exhaustive Checking: Ensures tất cả cases handled
 * - Template Literal Types: `${string}${string}`
 *
 * 💡 ĐỌC COMPLETE_THEORY.md PART 3 TRƯỚC KHI LÀM!
 */

import { useState } from 'react'

// ===== PART 1: CONDITIONAL TYPES =====

/**
 * TODO 1: Implement UnwrapPromise conditional type
 *
 * Yêu cầu:
 * - Generic type T
 * - Nếu T extends Promise<infer U> → return U
 * - Nếu không → return T
 *
 * 💡 Conditional type syntax: T extends U ? X : Y
 * 💡 infer keyword để extract type từ Promise
 */

type UnwrapPromise<T> = any // TODO: Implement conditional type
// Test cases:
// type A = UnwrapPromise<Promise<string>> // should be string
// type B = UnwrapPromise<number>          // should be number

/**
 * TODO 2: Implement ExtractArrayType conditional type
 *
 * Yêu cầu:
 * - Generic type T
 * - Nếu T là array (T extends (infer E)[]) → return E
 * - Nếu không → return never
 *
 * 💡 (infer E)[] = array of E
 * 💡 never = impossible type
 */

type ExtractArrayType<T> = any // TODO: Implement
// Test cases:
// type C = ExtractArrayType<string[]>  // should be string
// type D = ExtractArrayType<number>    // should be never

// ===== PART 2: TYPE GUARDS =====

/**
 * TODO 3: Implement isUser type guard
 *
 * Yêu cầu:
 * - Parameter: obj: unknown
 * - Return type predicate: obj is User
 * - Check:
 *   - obj is object
 *   - obj !== null
 *   - 'id' in obj && typeof obj.id === 'number'
 *   - 'name' in obj && typeof obj.name === 'string'
 *   - 'email' in obj && typeof obj.email === 'string'
 *
 * 💡 Type predicate: value is Type
 * 💡 Runtime checks để narrow type
 */

interface User {
  id: number
  name: string
  email: string
}

function isUser(obj: unknown): obj is User {
  // TODO: Implement type guard với thorough checks
  return false
}

/**
 * TODO 4: Implement isError type guard
 *
 * Yêu cầu:
 * - Check if obj is Error instance
 * - Return type predicate: obj is Error
 */

function isError(obj: unknown): obj is Error {
  // TODO: Implement
  return false
}

// ===== PART 3: DISCRIMINATED UNIONS =====

/**
 * TODO 5: Define ApiResponse discriminated union
 *
 * Yêu cầu:
 * - Union của 3 states:
 *   1. Loading: { status: 'loading' }
 *   2. Success: { status: 'success'; data: T }
 *   3. Error: { status: 'error'; error: string }
 * - Generic type T cho data
 * - 'status' là discriminant property
 *
 * 💡 Discriminated union: common property với literal types
 */

type ApiResponse<T> = any // TODO: Define discriminated union
  // | { status: 'loading' }
  // | { status: 'success'; data: T }
  // | { status: 'error'; error: string }

/**
 * TODO 6: Implement handleApiResponse với exhaustive checking
 *
 * Yêu cầu:
 * - Parameter: response: ApiResponse<T>
 * - Switch on response.status
 * - Case 'loading': return loading message
 * - Case 'success': return success message với data
 * - Case 'error': return error message
 * - Default: exhaustive check với never type
 *
 * 💡 Exhaustive checking đảm bảo handle tất cả cases
 */

function handleApiResponse<T>(response: ApiResponse<T>): string {
  // TODO: Implement với switch statement và exhaustive check
  switch (response.status) {
    // case 'loading':
    //   return 'Loading...'
    // case 'success':
    //   return `Success: ${JSON.stringify(response.data)}`
    // case 'error':
    //   return `Error: ${response.error}`
    // default:
    //   const _exhaustive: never = response
    //   throw new Error(`Unhandled case: ${_exhaustive}`)
  }

  return ''
}

// ===== PART 4: TEMPLATE LITERAL TYPES =====

/**
 * TODO 7: Define EventName template literal type
 *
 * Yêu cầu:
 * - Base events: 'click' | 'hover' | 'focus' | 'blur'
 * - Generate event handler names: `on${Capitalize<Event>}`
 * - Result: 'onClick' | 'onHover' | 'onFocus' | 'onBlur'
 *
 * 💡 Template literal: `${A}${B}`
 * 💡 Capitalize<T>: Uppercase first letter
 */

type Event = 'click' | 'hover' | 'focus' | 'blur'

type EventHandlerName = any // TODO: Define template literal type
// should be: 'onClick' | 'onHover' | 'onFocus' | 'onBlur'

/**
 * TODO 8: Define EventHandlers type với Record
 *
 * Yêu cầu:
 * - Record<EventHandlerName, () => void>
 * - Tất cả event handlers return void
 */

type EventHandlers = any // TODO: Define

// ===== PART 5: FETCH HOOK WITH DISCRIMINATED UNIONS =====

/**
 * TODO 9: Implement useFetchWithStates hook
 *
 * Yêu cầu:
 * - Generic type T
 * - State: ApiResponse<T>
 * - Initial state: { status: 'loading' }
 * - Fetch data từ URL
 * - Update state based on result:
 *   - Success → { status: 'success', data }
 *   - Error → { status: 'error', error: message }
 * - Return state
 *
 * 💡 Discriminated union cho state management
 * 💡 Type narrowing trong switch
 */

function useFetchWithStates<T>(url: string): ApiResponse<T> {
  // TODO: Implement
  // 1. useState với ApiResponse<T>, initial = { status: 'loading' }
  // 2. useEffect fetch data
  // 3. Update state based on success/error
  // 4. Return state

  return { status: 'loading' }
}

// ===== DEMO COMPONENT =====

interface Post {
  id: number
  title: string
  body: string
}

export default function Ex3_AdvancedPatterns() {
  const apiResponse = useFetchWithStates<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=3'
  )

  // TODO: Test type guards
  const testTypeGuards = () => {
    const validUser = { id: 1, name: 'John', email: 'john@example.com' }
    const invalidUser = { id: 1, name: 'John' }
    const error = new Error('Test error')
    const notError = 'error string'

    console.log('isUser(validUser):', isUser(validUser)) // should be true
    console.log('isUser(invalidUser):', isUser(invalidUser)) // should be false
    console.log('isError(error):', isError(error)) // should be true
    console.log('isError(notError):', isError(notError)) // should be false
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Exercise 3: Advanced Type Patterns</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. Conditional Types</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
          {`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type A = UnwrapPromise<Promise<string>> // string
type B = UnwrapPromise<number>          // number

type ExtractArrayType<T> = T extends (infer E)[] ? E : never

type C = ExtractArrayType<string[]>  // string
type D = ExtractArrayType<number>    // never`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Type Guards</h3>
        <button onClick={testTypeGuards}>Test Type Guards (Check Console)</button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Discriminated Unions - Fetch States</h3>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          {/* TODO: Handle apiResponse với switch statement */}
          <p>Status: {apiResponse.status}</p>

          {/* Example switch: */}
          {/* {(() => {
            switch (apiResponse.status) {
              case 'loading':
                return <div>Loading posts...</div>
              case 'success':
                return (
                  <div>
                    <h4>Posts:</h4>
                    {apiResponse.data.map(post => (
                      <div key={post.id} style={{ marginBottom: '10px' }}>
                        <strong>{post.title}</strong>
                        <p>{post.body.substring(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                )
              case 'error':
                return <div style={{ color: 'red' }}>Error: {apiResponse.error}</div>
              default:
                const _exhaustive: never = apiResponse
                throw new Error(`Unhandled: ${_exhaustive}`)
            }
          })()} */}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. Template Literal Types</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
          {`type Event = 'click' | 'hover' | 'focus' | 'blur'
type EventHandlerName = \`on\${Capitalize<Event>}\`
// 'onClick' | 'onHover' | 'onFocus' | 'onBlur'

type EventHandlers = Record<EventHandlerName, () => void>`}
        </pre>
      </section>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0' }}>
        <h4>✅ Testing Checklist:</h4>
        <ul>
          <li>Conditional types compile correctly</li>
          <li>Type guards return correct results</li>
          <li>Discriminated union handles all states</li>
          <li>Exhaustive checking prevents missing cases</li>
          <li>Template literal types generate correct names</li>
          <li>Fetch hook works với real API</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * 🎯 REQUIREMENTS RECAP:
 *
 * 1. ✅ UnwrapPromise conditional type
 * 2. ✅ ExtractArrayType conditional type
 * 3. ✅ isUser type guard với thorough checks
 * 4. ✅ isError type guard
 * 5. ✅ ApiResponse discriminated union
 * 6. ✅ handleApiResponse với exhaustive checking
 * 7. ✅ EventHandlerName template literal type
 * 8. ✅ EventHandlers Record type
 * 9. ✅ useFetchWithStates hook với discriminated unions
 * 10. ✅ Demo component test tất cả patterns
 *
 * 💡 Tips:
 * - Conditional types: T extends U ? X : Y
 * - Type guards: obj is Type predicate
 * - Discriminated unions: common literal property
 * - Exhaustive: default case với never type
 * - Template literals: `${A}${B}` syntax
 */
