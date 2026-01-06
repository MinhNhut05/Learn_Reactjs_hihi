/**
 * Exercise 2: Card Component - SOLUTION
 *
 * Key concepts:
 * 1. Compound components pattern: Card.Header, Card.Body, Card.Footer
 * 2. children prop: flexible content
 * 3. Composition over props drilling
 */

import React from "react";

// ============================================================
// Card Component với Compound Pattern
// ============================================================

interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div style={styles.card}>{children}</div>;
}

// Sub-components attached to Card
Card.Header = function CardHeader({ children }: CardProps) {
  return <div style={styles.header}>{children}</div>;
};

Card.Body = function CardBody({ children }: CardProps) {
  return <div style={styles.body}>{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardProps) {
  return <div style={styles.footer}>{children}</div>;
};

// ============================================================
// Demo Component
// ============================================================

export default function CompositionDemo() {
  const handleEdit = () => alert("Edit clicked!");
  const handleDelete = () => alert("Delete clicked!");

  return (
    <div style={styles.container}>
      <h2>Component Composition Demo</h2>

      {/* Card 1: User Profile */}
      <Card>
        <Card.Header>
          <h3 style={{ margin: 0 }}>User Profile</h3>
        </Card.Header>
        <Card.Body>
          <p>Name: John Doe</p>
          <p>Email: john@example.com</p>
          <p>Role: Developer</p>
        </Card.Body>
        <Card.Footer>
          <button onClick={handleEdit} style={styles.button}>
            Edit
          </button>
          <button onClick={handleDelete} style={styles.buttonDanger}>
            Delete
          </button>
        </Card.Footer>
      </Card>

      {/* Card 2: Product */}
      <Card>
        <Card.Header>
          <span style={styles.badge}>New</span>
          <h3 style={{ margin: 0 }}>MacBook Pro M3</h3>
        </Card.Header>
        <Card.Body>
          <p>The most powerful MacBook ever.</p>
          <p style={styles.price}>$1,999</p>
        </Card.Body>
        <Card.Footer>
          <button style={styles.buttonPrimary}>Add to Cart</button>
        </Card.Footer>
      </Card>

      {/* Card 3: Minimal - chỉ có Body */}
      <Card>
        <Card.Body>
          <p style={{ textAlign: "center", color: "#666" }}>
            This card only has a body - no header or footer!
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

// ============================================================
// Styles
// ============================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  header: {
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e0e0e0",
  },
  body: {
    padding: "16px",
  },
  footer: {
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },
  button: {
    padding: "8px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
  },
  buttonPrimary: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  buttonDanger: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
  badge: {
    display: "inline-block",
    padding: "2px 8px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "4px",
    fontSize: "12px",
    marginBottom: "8px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#28a745",
  },
};
