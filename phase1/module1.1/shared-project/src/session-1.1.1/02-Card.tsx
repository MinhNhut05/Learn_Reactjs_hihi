/**
 * EXERCISE 2: CARD COMPONENT
 *
 * Yêu cầu:
 * 1. Tạo CardProps interface với:
 *    - title: string (required)
 *    - children: ReactNode (required)
 *    - footer?: ReactNode (optional)
 *    - className?: string (optional)
 *
 * 2. Implement Card component:
 *    - Render title trong .card-header
 *    - Render children trong .card-body
 *    - Render footer trong .card-footer (chỉ khi có)
 *    - Merge className prop với 'card'
 *
 * 3. Test với content khác nhau
 */

import { ReactNode } from "react";

// TODO: Define CardProps interface
interface CardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

// TODO: Implement Card component
function Card({ title, children, footer, className }: CardProps) {
  // TODO: Destructure props
  const cardClassName = className ? `card ${className}` : "card";
  return (
    <div className={cardClassName}>
      {/* TODO: Render header với title */}
      <div className="card-header">{title}</div>
      {/* TODO: Render body với children */}
      <div className="card-body">{children}</div>
      {/* TODO: Render footer nếu có */}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// ===== TEST COMPONENT =====
export default function Ex2_Card() {
  return (
    <div className="flex flex-col gap-20">
      {/* TODO: Test Card với title và children */}
      <Card title="hihi">
        <p>hello</p>
        <p>chao</p>
        <p>hi</p>
      </Card>
      {/* TODO: Test Card với footer */}
      <Card title="ao da banh" footer={<span>Price: $99.99</span>}>
        <p>hello</p>
        <p>chao</p>
        <p>hi</p>
      </Card>
      {/* TODO: Test Card với custom className */}
      <Card
        title="ao da banh"
        footer={<span>Price: $99.99</span>}
        className="highlight-card color"
      >
        <p>hello</p>
        <p>chao</p>
        <p>hi</p>
      </Card>
    </div>
  );
}
