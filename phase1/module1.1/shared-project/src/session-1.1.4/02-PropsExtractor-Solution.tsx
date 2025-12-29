/**
 * EXERCISE 2 SOLUTION: COMPONENT PROPS EXTRACTOR
 */

import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

// ===== PART 1: BUTTON COMPONENT =====

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

function Button({ variant, size, children, onClick, disabled }: ButtonProps) {
  const variantStyles = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
  }

  const sizeStyles = {
    sm: { padding: '5px 10px', fontSize: '12px' },
    md: { padding: '8px 16px', fontSize: '14px' },
    lg: { padding: '12px 24px', fontSize: '16px' },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  )
}

// ===== PART 2: ICON BUTTON =====

interface IconButtonProps extends ComponentProps<typeof Button> {
  icon: ReactNode
  iconPosition?: 'left' | 'right'
}

function IconButton({
  icon,
  iconPosition = 'left',
  children,
  ...buttonProps
}: IconButtonProps) {
  return (
    <Button {...buttonProps}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </div>
    </Button>
  )
}

// ===== PART 3: CARD COMPONENT =====

interface CardProps {
  title: string
  footer?: ReactNode
  className?: string
}

function Card({ title, footer, className, children }: PropsWithChildren<CardProps>) {
  return (
    <div
      className={className}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold',
        }}
      >
        {title}
      </div>

      <div style={{ padding: '16px' }}>{children}</div>

      {footer && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #ddd',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}

// ===== PART 4: POLYMORPHIC TEXT COMPONENT =====

type TextProps<E extends React.ElementType> = {
  as?: E
  children: ReactNode
} & Omit<ComponentProps<E>, 'as' | 'children'>

function Text<E extends React.ElementType = 'span'>({
  as,
  children,
  ...props
}: TextProps<E>) {
  const Component = as || 'span'
  return <Component {...props}>{children}</Component>
}

// ===== PART 5: PROFILE CARD =====

interface ProfileCardProps {
  name: string
  email: string
  role: string
  onEdit: () => void
}

function ProfileCard({ name, email, role, onEdit }: ProfileCardProps) {
  return (
    <Card
      title="User Profile"
      footer={
        <IconButton
          variant="primary"
          size="sm"
          icon={<span>✏️</span>}
          iconPosition="left"
          onClick={onEdit}
        >
          Edit Profile
        </IconButton>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Text as="h3" style={{ margin: 0 }}>
          {name}
        </Text>
        <Text as="p" style={{ margin: 0, color: '#666' }}>
          📧 {email}
        </Text>
        <Text as="p" style={{ margin: 0, color: '#666' }}>
          👤 Role: {role}
        </Text>
      </div>
    </Card>
  )
}

// ===== DEMO COMPONENT =====

export default function Ex2_PropsExtractor_Solution() {
  const handleEdit = () => {
    alert('Edit profile clicked!')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Exercise 2 SOLUTION: Component Props Extractor</h2>

      <h3>1. Button Component</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <Button variant="primary" size="sm" onClick={() => alert('Small')}>
          Small Primary
        </Button>
        <Button variant="secondary" size="md" onClick={() => alert('Medium')}>
          Medium Secondary
        </Button>
        <Button variant="danger" size="lg" onClick={() => alert('Large')}>
          Large Danger
        </Button>
        <Button variant="primary" size="md" disabled>
          Disabled
        </Button>
      </div>

      <h3>2. IconButton (Extends Button Props)</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <IconButton
          variant="primary"
          size="md"
          icon={<span>⭐</span>}
          iconPosition="left"
          onClick={() => alert('Favorite')}
        >
          Favorite
        </IconButton>
        <IconButton
          variant="secondary"
          size="md"
          icon={<span>🔗</span>}
          iconPosition="right"
          onClick={() => alert('Share')}
        >
          Share
        </IconButton>
      </div>

      <h3>3. Card (PropsWithChildren)</h3>
      <Card title="Example Card" footer={<button>Footer Action</button>}>
        <p>This is card content with children prop automatically added.</p>
      </Card>

      <h3>4. Text Polymorphic Component</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <Text as="h1">This is H1 (as="h1")</Text>
        <Text as="h2">This is H2 (as="h2")</Text>
        <Text as="p">This is paragraph (as="p")</Text>
        <Text as="a" href="/about" style={{ color: 'blue' }}>
          This is link (as="a" with href)
        </Text>
        <Text>Default span (no "as" prop)</Text>
      </div>

      <h3>5. ProfileCard (Combines All)</h3>
      <ProfileCard
        name="John Doe"
        email="john@example.com"
        role="Administrator"
        onEdit={handleEdit}
      />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e9' }}>
        <h4>✅ Solution Features:</h4>
        <ul>
          <li>
            ✅ <strong>ComponentProps</strong>: IconButton extends tất cả Button props
          </li>
          <li>
            ✅ <strong>PropsWithChildren</strong>: Card tự động có children prop
          </li>
          <li>
            ✅ <strong>Polymorphic</strong>: Text renders as different elements
          </li>
          <li>✅ Type-safe props extraction và composition</li>
          <li>✅ Spread props pattern (...buttonProps, ...props)</li>
          <li>✅ Generic component với ElementType</li>
        </ul>
      </div>
    </div>
  )
}
