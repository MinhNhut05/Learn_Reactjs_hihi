// 📚 EXERCISE 1: Login Form với Event Handlers Typing
// 🎯 Đọc PART 1 trong COMPLETE_THEORY.md trước khi code!

import { ChangeEvent, FormEvent, useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // TODO 1: Tạo state cho username, password, và error message
  // Hint: useState<string>('')

  // TODO 2: Tạo handleUsernameChange
  // - Type: ChangeEvent<HTMLInputElement>
  // - Update username state
  // - Clear error state
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
  };
  // TODO 3: Tạo handlePasswordChange
  // - Type: ChangeEvent<HTMLInputElement>
  // - Update password state
  // - Clear error state
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  // TODO 4: Tạo validate function
  // - Return type: boolean
  // - Check username: required, min 3 characters
  // - Check password: required, min 6 characters
  // - Set error message cụ thể cho từng case
  // - Return true nếu pass, false nếu fail
  const validate = (): boolean => {
    if (username.trim() === "") {
      setError("Username is required");
      return false;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (password.trim() === "") {
      setError("Password is required");
      return false;
    }

    // Check password min length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // All validations passed
    return true;
  };
  // TODO 5: Tạo handleSubmit
  // - Type: FormEvent<HTMLFormElement>
  // - e.preventDefault() để prevent page reload
  // - Gọi validate(), return early nếu fail
  // - Console.log username và password nếu pass
  // - Clear form (reset username, password về '')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    console.log("✅ Login successful!");
    console.log("Username:", username);
    console.log("Password:", password);
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login-form">
      <h2>Login Form</h2>

      {/* TODO 6: Form element với onSubmit */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          {/* TODO 7: Input cho username
              - type="text"
              - placeholder="Enter username"
              - value={username}
              - onChange={handleUsernameChange}
          */}
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          <label>Password:</label>
          {/* TODO 8: Input cho password
              - type="password"
              - placeholder="Enter password"
              - value={password}
              - onChange={handlePasswordChange}
          */}

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* TODO 9: Conditional render error message
            - Hiển thị error nếu có
            - Style: color red
            - Syntax: {error && <div>...</div>}
        */}
        {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>}

        {/* TODO 10: Submit button
            - type="submit"
            - text: "Login"
        */}
        <button type="submit">submit</button>
      </form>

      {/* Info */}
      <div style={{ margin: "20px", fontSize: "12px", color: "#666" }}>
        <p>
          <strong>Requirements:</strong>
        </p>
        <ul>
          <li>Username: min 3 characters</li>
          <li>Password: min 6 characters</li>
        </ul>
      </div>
    </div>
  );
}

export default LoginForm;
