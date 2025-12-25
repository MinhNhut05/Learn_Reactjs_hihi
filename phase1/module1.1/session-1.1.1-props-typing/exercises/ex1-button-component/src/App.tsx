// Import React nếu cần (với React 17+ không bắt buộc trong JSX files)

// TODO: Define ButtonProps interface
// Requirements:
// - label: string (required)
// - variant: 'primary' | 'secondary' | 'danger' (required)
// - size: 'sm' | 'md' | 'lg' (optional)
// - onClick: function (required)
// - disabled: boolean (optional)

// GIẢI THÍCH:
// - label, variant, onClick là BẮT BUỘC (không có ?)
// - size, disabled là OPTIONAL (có ?)
interface ButtonProps {
  label: string;                                 // Text hiển thị (required)
  variant: "primary" | "secondary" | "danger";  // Màu button (required)
  onClick: () => void;                          // Click handler (required)
  size?: "sm" | "md" | "lg";                    // Kích thước (optional)
  disabled?: boolean;                           // Trạng thái disable (optional)
}

// BUTTON COMPONENT
function Button({
  label,               // Required props - không có default
  variant,             // Required props - không có default
  onClick,             // Required props - không có default
  size = "md",         // Optional - default là "md"
  disabled = false,    // Optional - default là false
}: ButtonProps) {
  // Tạo className bằng cách ghép string
  // Ví dụ: variant="primary", size="md" → "btn btn-primary btn-md"
  const className = `btn btn-${variant} btn-${size}`;

  return (
    <button
      className={className}   // Gắn CSS classes
      onClick={onClick}        // Gắn click handler
      disabled={disabled}      // Gắn disabled state
    >
      {label}                  {/* Hiển thị text */}
    </button>
  );
}

// TEST APP - Thử tất cả variants và options
export default function App() {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        maxWidth: "400px",
      }}
    >
      <h2>Button Component Test</h2>

      {/* Test các variants khác nhau */}
      <Button
        label="Primary Button"
        variant="primary"
        onClick={() => alert('Primary clicked!')}
      />

      <Button
        label="Secondary Button"
        variant="secondary"
        onClick={() => alert('Secondary clicked!')}
      />

      <Button
        label="Danger Button"
        variant="danger"
        onClick={() => alert('Danger clicked!')}
      />

      <hr />
      <h3>Different Sizes</h3>

      {/* Test các sizes khác nhau */}
      <Button label="Small" variant="primary" size="sm" onClick={() => {}} />
      <Button label="Medium (default)" variant="primary" size="md" onClick={() => {}} />
      <Button label="Large" variant="primary" size="lg" onClick={() => {}} />

      <hr />
      <h3>Disabled State</h3>

      {/* Test disabled */}
      <Button label="Disabled Button" variant="danger" onClick={() => {}} disabled />
      <Button label="Enabled Button" variant="primary" onClick={() => {}} />
    </div>
  );
}

// Optional: Add some basic styles
const styles = `
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .btn-sm { padding: 4px 8px; font-size: 12px; }
  .btn-md { padding: 8px 16px; font-size: 14px; }
  .btn-lg { padding: 12px 24px; font-size: 16px; }

  .btn-primary { background: #007bff; color: white; }
  .btn-secondary { background: #6c757d; color: white; }
  .btn-danger { background: #dc3545; color: white; }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
