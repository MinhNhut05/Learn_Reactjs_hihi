/**
 * EXERCISE 1: BUTTON COMPONENT
 *
 * Yêu cầu:
 * 1. Tạo ButtonProps interface với:
 *    - label: string (required)
 *    - variant: 'primary' | 'secondary' | 'danger' (required)
 *    - size: 'sm' | 'md' | 'lg' (optional, default 'md')
 *    - onClick: click handler (required)
 *    - disabled: boolean (optional, default false)
 *
 * 2. Implement Button component:
 *    - Destructure props với default values
 *    - Tạo className động: 'btn btn-{variant} btn-{size}'
 *    - Render button với className, onClick, disabled, label
 *
 * 3. Test component với các variants và sizes khác nhau
 */
interface ButtonProps {
  label: string; // Text hiển thị (required)
  variant: "primary" | "secondary" | "danger"; // Màu button (required)
  onClick: () => void; // Click handler (required)
  size?: "sm" | "md" | "lg"; // Kích thước (optional)
  disabled?: boolean; // Trạng thái disable (optional)
}
// TODO: Import React types nếu cần

// TODO: Define ButtonProps interface

// TODO: Implement Button component
function Button({
  label,
  variant,
  onClick,
  size = "md",
  disabled = false,
}: ButtonProps) {
  const className = `btn btn-${variant} btn-${size}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
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
