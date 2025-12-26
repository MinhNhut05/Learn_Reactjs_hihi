/**
 * SOLUTION: BUTTON COMPONENT
 *
 * File này chứa solution hoàn chỉnh để tham khảo.
 * Sau khi làm xong exercise, bạn có thể so sánh với solution này.
 */

// GIẢI THÍCH:
// - label, variant, onClick là BẮT BUỘC (không có ?)
// - size, disabled là OPTIONAL (có ?)
interface ButtonProps {
  label: string; // Text hiển thị (required)
  variant: "primary" | "secondary" | "danger"; // Màu button (required)
  onClick: () => void; // Click handler (required)
  size?: "sm" | "md" | "lg"; // Kích thước (optional)
  disabled?: boolean; // Trạng thái disable (optional)
}

function Button({
  label, // Required - không có default
  variant, // Required - không có default
  onClick, // Required - không có default
  size = "md", // Optional - default là 'md'
  disabled = false, // Optional - default là false
}: ButtonProps) {
  // Tạo className bằng cách ghép string
  // Ví dụ: variant="primary", size="md" → "btn btn-primary btn-md"
  const className = `btn btn-${variant} btn-${size}`;

  return (
    <button
      className={className} // Gắn CSS classes
      onClick={onClick} // Gắn click handler
      disabled={disabled} // Gắn disabled state
    >
      {label} {/* Hiển thị text */}
    </button>
  );
}

// ===== TEST COMPONENT =====
export default function Ex1_ButtonSolution() {
  return (
    <div className="flex flex-col gap-10">
      {/* Test các variants khác nhau */}
      <Button
        label="Primary Button"
        variant="primary"
        onClick={() => alert("Primary clicked!")}
      />

      <Button
        label="Secondary Button"
        variant="secondary"
        onClick={() => alert("Secondary clicked!")}
      />

      <Button
        label="Danger Button"
        variant="danger"
        onClick={() => alert("Danger clicked!")}
      />

      <hr />

      {/* Test các sizes khác nhau */}
      <Button label="Small" variant="primary" size="sm" onClick={() => {}} />
      <Button
        label="Medium (default)"
        variant="primary"
        size="md"
        onClick={() => {}}
      />
      <Button label="Large" variant="primary" size="lg" onClick={() => {}} />

      <hr />

      {/* Test disabled */}
      <Button
        label="Disabled Button"
        variant="danger"
        onClick={() => {}}
        disabled
      />
      <Button label="Enabled Button" variant="primary" onClick={() => {}} />
    </div>
  );
}
