/**
 * EXERCISE 2: COMPONENT PROPS EXTRACTOR
 *
 * 🎯 MỤC TIÊU:
 * - Extract props từ existing component với ComponentProps
 * - Extend component props với new props
 * - PropsWithChildren pattern
 * - Polymorphic component với dynamic element types
 *
 * 📚 CONCEPTS:
 * - ComponentProps<typeof Component>: Extract props từ component
 * - PropsWithChildren<T>: Tự động add children prop
 * - Polymorphic component: Component có thể render as different elements
 * - Omit<T, K>: Remove props khi extend
 *
 * 💡 ĐỌC COMPLETE_THEORY.md PART 2 TRƯỚC KHI LÀM!
 */

import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

// ===== PART 1: BUTTON COMPONENT =====

/**
 * TODO 1: Tạo Button component
 *
 * Yêu cầu:
 * - Props:
 *   - variant: 'primary' | 'secondary' | 'danger'
 *   - size: 'sm' | 'md' | 'lg'
 *   - children: ReactNode
 *   - onClick?: () => void
 *   - disabled?: boolean
 * - Styling:
 *   - primary: blue background
 *   - secondary: gray background
 *   - danger: red background
 *   - Size affects padding
 */

interface ButtonProps {
  // TODO: Define button props
}

function Button({}: ButtonProps) {
  // TODO: Implement Button component
  // 1. Define variant styles (primary, secondary, danger)
  // 2. Define size styles (sm, md, lg)
  // 3. Render button with styles

  return <button>Button</button>
}

// ===== PART 2: ICON BUTTON (Extract Props) =====

/**
 * TODO 2: Tạo IconButton extends Button props
 *
 * Yêu cầu:
 * - Extract tất cả props từ Button sử dụng ComponentProps<typeof Button>
 * - Thêm new props:
 *   - icon: ReactNode
 *   - iconPosition?: 'left' | 'right'
 * - Render icon + children dựa vào iconPosition
 *
 * 💡 ComponentProps<typeof Button> lấy tất cả props của Button
 * 💡 Không cần duplicate ButtonProps
 */

interface IconButtonProps {
  // TODO: Extract Button props
  // TODO: Add icon và iconPosition props
}

function IconButton({}: IconButtonProps) {
  // TODO: Implement IconButton
  // 1. Destructure icon, iconPosition, và ...buttonProps
  // 2. Render Button với buttonProps spread
  // 3. Render icon dựa vào iconPosition

  return <Button variant="primary" size="md">IconButton</Button>
}

// ===== PART 3: CARD COMPONENT (PropsWithChildren) =====

/**
 * TODO 3: Tạo Card component với PropsWithChildren
 *
 * Yêu cầu:
 * - Props:
 *   - title: string
 *   - footer?: ReactNode
 *   - className?: string
 *   - children: ReactNode (use PropsWithChildren)
 * - Render card với header, body, optional footer
 *
 * 💡 PropsWithChildren<T> tự động add children prop
 */

interface CardProps {
  // TODO: Define props (không cần children, dùng PropsWithChildren)
}

function Card({}: PropsWithChildren<CardProps>) {
  // TODO: Implement Card component
  // 1. Render card-header với title
  // 2. Render card-body với children
  // 3. Conditionally render card-footer

  return (
    <div>
      <div>Header</div>
      <div>Body</div>
    </div>
  )
}

// ===== PART 4: POLYMORPHIC TEXT COMPONENT =====

/**
 * TODO 4: Tạo polymorphic Text component
 *
 * Yêu cầu:
 * - Generic component: Text<E extends React.ElementType>
 * - Props:
 *   - as?: E (element type: 'h1' | 'h2' | 'p' | 'span' | 'a')
 *   - children: ReactNode
 *   - ...rest: props tương ứng với element type
 * - Default element: 'span'
 * - Render as element được chọn
 *
 * 💡 Polymorphic component có thể render as khác nhau elements
 * 💡 Props tự động match với element type
 * 💡 Ví dụ: as="a" → có href, as="button" → có onClick
 */

type TextProps<E extends React.ElementType> = {
  // TODO: Define polymorphic props
  // 1. as?: E
  // 2. children: ReactNode
  // 3. Extract và merge với ComponentProps<E>
}

function Text<E extends React.ElementType = 'span'>({}: TextProps<E>) {
  // TODO: Implement polymorphic Text
  // 1. Destructure as, children, ...props
  // 2. const Component = as || 'span'
  // 3. Render Component với props spread

  return <span>Text</span>
}

// ===== PART 5: PROFILE CARD (Combine All) =====

/**
 * TODO 5: Tạo ProfileCard kết hợp tất cả components
 *
 * Yêu cầu:
 * - Props:
 *   - name: string
 *   - email: string
 *   - role: string
 *   - onEdit: () => void
 * - Sử dụng:
 *   - Card cho layout
 *   - Text polymorphic cho name (as="h3"), email, role
 *   - IconButton cho Edit button
 */

interface ProfileCardProps {
  // TODO: Define props
}

function ProfileCard({}: ProfileCardProps) {
  // TODO: Implement ProfileCard
  // 1. Render Card với title="User Profile"
  // 2. Body: name (h3), email (p), role (p)
  // 3. Footer: IconButton với "Edit" + icon
  // 4. Dùng Text polymorphic component

  return (
    <div>
      <h3>Profile Card</h3>
    </div>
  )
}

// ===== DEMO COMPONENT =====

export default function Ex2_PropsExtractor() {
  const handleEdit = () => {
    alert('Edit profile clicked!')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Exercise 2: Component Props Extractor</h2>

      {/* TODO: Test tất cả components */}

      {/* 1. Button */}
      {/* <Button variant="primary" size="md" onClick={() => alert('Clicked')}>
        Primary Button
      </Button> */}

      {/* 2. IconButton */}
      {/* <IconButton
        variant="secondary"
        size="md"
        icon={<span>⭐</span>}
        iconPosition="left"
        onClick={() => alert('Icon clicked')}
      >
        Favorite
      </IconButton> */}

      {/* 3. Card */}
      {/* <Card title="Example Card" footer={<button>Footer Action</button>}>
        <p>This is card content</p>
      </Card> */}

      {/* 4. Text polymorphic */}
      {/* <Text as="h1">Heading 1</Text>
      <Text as="p">Paragraph</Text>
      <Text as="a" href="/about">Link</Text> */}

      {/* 5. ProfileCard */}
      {/* <ProfileCard
        name="John Doe"
        email="john@example.com"
        role="Administrator"
        onEdit={handleEdit}
      /> */}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0' }}>
        <h4>✅ Testing Checklist:</h4>
        <ul>
          <li>Button renders với different variants và sizes</li>
          <li>IconButton có icon + text</li>
          <li>Card có header, body, footer</li>
          <li>Text renders as different elements (h1, p, a)</li>
          <li>ProfileCard kết hợp tất cả components</li>
          <li>TypeScript autocomplete works cho tất cả props</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * 🎯 REQUIREMENTS RECAP:
 *
 * 1. ✅ Button component với variant, size, children
 * 2. ✅ IconButton extends Button props với ComponentProps
 * 3. ✅ Card component với PropsWithChildren
 * 4. ✅ Text polymorphic component với generic element type
 * 5. ✅ ProfileCard kết hợp tất cả components
 * 6. ✅ Type-safe props extraction
 * 7. ✅ Props autocomplete works correctly
 *
 * 💡 Tips:
 * - ComponentProps<typeof Component> = Extract props từ component
 * - PropsWithChildren<T> = T & { children?: ReactNode }
 * - Polymorphic: Generic type E extends React.ElementType
 * - Spread props với ...rest pattern
 */
