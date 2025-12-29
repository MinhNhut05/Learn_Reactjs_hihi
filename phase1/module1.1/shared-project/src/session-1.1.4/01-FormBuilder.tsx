/**
 * EXERCISE 1: FORM BUILDER VỚI UTILITY TYPES
 *
 * 🎯 MỤC TIÊU:
 * - Sử dụng Record<K, V> cho dynamic form config
 * - Sử dụng Partial<T> cho optional form errors
 * - Sử dụng Pick<T, K> và Omit<T, K> cho field selection
 * - Type-safe form handling
 *
 * 📚 CONCEPTS:
 * - Record<K, V>: Dynamic object với typed keys
 * - Partial<T>: Làm tất cả properties optional
 * - Pick<T, K>: Chọn specific properties
 * - Omit<T, K>: Loại bỏ specific properties
 * - keyof operator: Lấy keys của type
 *
 * 💡 ĐỌC COMPLETE_THEORY.md PART 1 TRƯỚC KHI LÀM!
 */

import { useState, ChangeEvent, FormEvent } from "react";

// ===== TYPE DEFINITIONS =====

/**
 * TODO 1: Định nghĩa FormFieldConfig interface
 *
 * Yêu cầu:
 * - type: 'text' | 'email' | 'password' | 'number'
 * - label: string
 * - placeholder: string
 * - required: boolean
 * - defaultValue: string
 *
 * 💡 Đây là config cho MỖI field trong form
 */
interface FormFieldConfig {
  // TODO: Định nghĩa properties ở đây
  type: "text" | "email" | "password" | "number";
  label: string;
  placeholder: string;
  required: boolean;
  defaultValue: string;
}

/**
 * TODO 2: Định nghĩa FormConfig type sử dụng Record<K, V>
 *
 * Yêu cầu:
 * - Key: string (tên field dynamic)
 * - Value: FormFieldConfig
 *
 * 💡 Record<K, V> cho phép dynamic keys type-safe
 * 💡 Ví dụ: { email: {...}, password: {...} }
 */
type FormConfig = Record<string, FormFieldConfig>;

/**
 * TODO 3: Định nghĩa FormValues type sử dụng Record<keyof T, V>
 *
 * Yêu cầu:
 * - Generic type T extends FormConfig
 * - Key: keyof T (tất cả keys của config)
 * - Value: string (tất cả form values là string)
 *
 * 💡 keyof T lấy tất cả keys từ config
 * 💡 Đảm bảo FormValues có ĐÚNG keys như FormConfig
 */

type FormValues<T extends FormConfig> = 

/**
 * TODO 4: Định nghĩa FormErrors type sử dụng Partial<Record<K, V>>
 *
 * Yêu cầu:
 * - Generic type T extends FormConfig
 * - Key: keyof T
 * - Value: string (error message)
 * - OPTIONAL: Không phải tất cả fields đều có error
 *
 * 💡 Partial<Record<K, V>> = tất cả properties optional
 * 💡 Chỉ show error khi có, không bắt buộc tất cả fields
 */
type FormErrors<T extends FormConfig> = any; // TODO: Định nghĩa type

// ===== FORM CONFIG =====

/**
 * TODO 5: Tạo loginFormConfig
 *
 * Yêu cầu:
 * - email field:
 *   - type: 'email'
 *   - label: 'Email'
 *   - placeholder: 'Enter your email'
 *   - required: true
 *   - defaultValue: ''
 * - password field:
 *   - type: 'password'
 *   - label: 'Password'
 *   - placeholder: 'Enter your password'
 *   - required: true
 *   - defaultValue: ''
 *
 * 💡 Dùng satisfies FormConfig để type check
 */
const loginFormConfig = {
  // TODO: Định nghĩa email field
  // TODO: Định nghĩa password field
} satisfies FormConfig;

// ===== VALIDATION FUNCTION =====

/**
 * TODO 6: Implement validateForm function
 *
 * Yêu cầu:
 * - Generic function: validateForm<T extends FormConfig>
 * - Parameters:
 *   - config: T
 *   - values: FormValues<T>
 * - Return: FormErrors<T>
 * - Logic:
 *   - Loop qua tất cả fields trong config
 *   - Check nếu field required && value empty → add error
 *   - Email field: check format (contains '@')
 *   - Password field: check length >= 6
 *
 * 💡 Dùng Object.entries(config) để loop
 * 💡 Return object với errors (optional fields)
 */
function validateForm<T extends FormConfig>(
  config: T,
  values: FormValues<T>
): FormErrors<T> {
  const errors: FormErrors<T> = {};

  // TODO: Implement validation logic
  // 1. Loop qua config với Object.entries()
  // 2. Check required fields
  // 3. Validate email format (nếu type === 'email')
  // 4. Validate password length (nếu type === 'password')

  return errors;
}

// ===== FORM BUILDER COMPONENT =====

/**
 * TODO 7: Implement FormBuilder component
 *
 * Yêu cầu:
 * - Generic component: FormBuilder<T extends FormConfig>
 * - Props:
 *   - config: T
 *   - onSubmit: (values: FormValues<T>) => void
 * - State:
 *   - values: FormValues<T> (initialize từ config.defaultValue)
 *   - errors: FormErrors<T>
 * - Logic:
 *   - Render input cho MỖI field trong config
 *   - handleChange: Update values khi input thay đổi
 *   - handleSubmit: Validate → nếu no errors → call onSubmit
 *   - Display errors dưới mỗi input
 *
 * 💡 Dùng Object.entries(config) để render fields
 * 💡 e.target.value luôn là string
 */
interface FormBuilderProps<T extends FormConfig> {
  config: T;
  onSubmit: (values: FormValues<T>) => void;
}

function FormBuilder<T extends FormConfig>({
  config,
  onSubmit,
}: FormBuilderProps<T>) {
  // TODO: Initialize state với FormValues và FormErrors
  // 💡 Hint: Loop config để tạo initial values từ defaultValue

  // TODO: Implement handleChange function
  // Parameters: field: keyof T, value: string
  // Update values[field] = value

  // TODO: Implement handleSubmit function
  // 1. Prevent default
  // 2. Validate form
  // 3. Nếu có errors → set errors state
  // 4. Nếu không có errors → call onSubmit(values)

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        /* TODO: Call handleSubmit */
      }}
      style={{ maxWidth: "400px", margin: "20px auto" }}
    >
      <h3>Login Form</h3>

      {/* TODO: Render fields dynamically */}
      {/*
        1. Object.entries(config) để loop
        2. Mỗi field render:
           - label
           - input với type, placeholder từ config
           - error message (nếu có)
        3. handleChange khi input thay đổi
      */}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}

// ===== DEMO COMPONENT =====

/**
 * TODO 8: Test FormBuilder với loginFormConfig
 */
export default function Ex1_FormBuilder() {
  const handleSubmit = (values: FormValues<typeof loginFormConfig>) => {
    console.log("Form submitted:", values);
    alert(
      `Login successful!\nEmail: ${values.email}\nPassword: ${values.password}`
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exercise 1: Form Builder với Utility Types</h2>

      {/* TODO: Render FormBuilder với loginFormConfig */}
      {/* <FormBuilder config={loginFormConfig} onSubmit={handleSubmit} /> */}

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h4>✅ Testing Checklist:</h4>
        <ul>
          <li>Submit empty form → Show "required" errors</li>
          <li>Enter invalid email (no @) → Show "invalid email" error</li>
          <li>Enter short password (&lt; 6 chars) → Show "too short" error</li>
          <li>Enter valid data → Success alert</li>
          <li>Check TypeScript autocomplete for FormValues</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * 🎯 REQUIREMENTS RECAP:
 *
 * 1. ✅ FormFieldConfig interface với type, label, placeholder, required, defaultValue
 * 2. ✅ FormConfig type = Record<string, FormFieldConfig>
 * 3. ✅ FormValues<T> type = Record<keyof T, string>
 * 4. ✅ FormErrors<T> type = Partial<Record<keyof T, string>>
 * 5. ✅ loginFormConfig với email và password fields
 * 6. ✅ validateForm function với generic type
 * 7. ✅ FormBuilder component render dynamic fields
 * 8. ✅ Validation logic: required, email format, password length
 * 9. ✅ Error display dưới mỗi input
 * 10. ✅ onSubmit chỉ call khi no errors
 *
 * 💡 Tips:
 * - Dùng Object.entries(config) để loop
 * - Type safety: TypeScript sẽ autocomplete keys
 * - FormValues và FormErrors phải match FormConfig keys
 * - Partial makes errors optional
 */
