// ✅ SOLUTION: Login Form với Event Handlers Typing

import { ChangeEvent, FormEvent, useState } from 'react'

function LoginFormSolution() {
  // State cho form data và error
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Handler cho username input
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setError('') // Clear error khi user type
  }

  // Handler cho password input
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setError('') // Clear error khi user type
  }

  // Validation function
  const validate = (): boolean => {
    // Check username required
    if (username.trim() === '') {
      setError('Username is required')
      return false
    }

    // Check username min length
    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return false
    }

    // Check password required
    if (password.trim() === '') {
      setError('Password is required')
      return false
    }

    // Check password min length
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    // All validations passed
    return true
  }

  // Form submit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent page reload

    // Validate trước khi submit
    if (!validate()) {
      return // Stop nếu validation fail
    }

    // Submit logic - nếu validation pass
    console.log('✅ Login successful!')
    console.log('Username:', username)
    console.log('Password:', password)

    // Clear form sau khi submit
    setUsername('')
    setPassword('')
    setError('')

    // Trong thực tế, bạn sẽ gọi API ở đây:
    // await loginAPI({ username, password })
  }

  return (
    <div className="login-form">
      <h2>Login Form (Solution)</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Conditional render error message */}
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}

        <button type="submit">Login</button>
      </form>

      {/* Info */}
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Username: min 3 characters</li>
          <li>Password: min 6 characters</li>
        </ul>
        <p><strong>Try:</strong></p>
        <ul>
          <li>Submit empty form → See required errors</li>
          <li>Enter "ab" + "12345" → See min length errors</li>
          <li>Enter "user123" + "password" → Success!</li>
        </ul>
      </div>
    </div>
  )
}

export default LoginFormSolution
