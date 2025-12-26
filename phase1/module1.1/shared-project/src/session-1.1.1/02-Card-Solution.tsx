/**
 * SOLUTION: CARD COMPONENT
 */

import { ReactNode } from "react";

interface CardProps {
  title: string; // Tiêu đề card (required)
  children: ReactNode; // Nội dung bên trong (required)
  footer?: ReactNode; // Footer (optional)
  className?: string; // Custom className (optional)
}

function Card({ title, children, footer, className }: CardProps) {
  // Merge className: 'card' + custom className (nếu có)
  const cardClassName = className ? `card ${className}` : "card";

  return (
    <div className={cardClassName}>
      <div className="card-header">{title}</div>

      <div className="card-body">{children}</div>

      {/* Chỉ render footer khi có */}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// ===== TEST COMPONENT =====
export default function Ex2_CardSolution() {
  return (
    <div className="flex flex-col gap-20">
      {/* Card cơ bản */}
      <Card title="User Profile">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </Card>

      {/* Card với footer */}
      <Card title="Product Details" footer={<span>Price: $99.99</span>}>
        <p>Amazing product with great features!</p>
        <p>In stock: 15 items</p>
      </Card>

      {/* Card với JSX children phức tạp */}
      <Card title="Shopping Cart">
        <ul className="list">
          <li className="list-item">Item 1 - $10</li>
          <li className="list-item">Item 2 - $20</li>
          <li className="list-item">Item 3 - $30</li>
        </ul>
      </Card>

      {/* Card với custom className */}
      <Card
        title="Highlighted Card"
        className="highlight-card"
        footer="This is a special card"
      >
        <p>This card has custom styles!</p>
      </Card>
    </div>
  );
}
