/**
 * FilterSidebar Component - Session 1.5.2 → Updated 1.5.3 (Responsive)
 *
 * Sidebar cho filter options với responsive behavior:
 * - Mobile/Tablet: Hidden (sẽ có filter button để mở drawer)
 * - Desktop (lg+): Always visible, sticky sidebar
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (<1024px): hidden lg:block → completely hidden
 * - Desktop (≥1024px): visible, sticky positioned
 *
 * Sẽ được functional hóa ở các session sau với:
 * - Mobile drawer/modal version
 * - State management cho filters
 * - Animation transitions
 */

interface FilterSidebarProps {
  categories?: string[]
  onCategoryChange?: (category: string) => void
  onPriceRangeChange?: (range: string) => void
}

const defaultCategories = ['All', 'Electronics', 'Wearables', 'Accessories', 'Home', 'Sports']

export default function FilterSidebar({
  categories = defaultCategories,
  onCategoryChange,
  onPriceRangeChange,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block flex-none w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
      {/* Categories Section */}
      <section>
        <h2 className="font-bold text-lg mb-4 text-gray-800">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange?.(category)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                  ${index === 0
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Price Range Section */}
      <section className="mt-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Price Range</h2>
        <div className="space-y-3">
          <FilterCheckbox
            label="Under $100"
            onChange={() => onPriceRangeChange?.('under-100')}
          />
          <FilterCheckbox
            label="$100 - $200"
            onChange={() => onPriceRangeChange?.('100-200')}
          />
          <FilterCheckbox
            label="$200 - $300"
            onChange={() => onPriceRangeChange?.('200-300')}
          />
          <FilterCheckbox
            label="Over $300"
            onChange={() => onPriceRangeChange?.('over-300')}
          />
        </div>
      </section>

      {/* Rating Section */}
      <section className="mt-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Rating</h2>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Availability Section */}
      <section className="mt-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Availability</h2>
        <div className="space-y-3">
          <FilterCheckbox label="In Stock" defaultChecked />
          <FilterCheckbox label="Out of Stock" />
        </div>
      </section>

      {/* Clear Filters Button */}
      <button className="w-full mt-8 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Clear All Filters
      </button>
    </aside>
  )
}

// Filter Checkbox Component
function FilterCheckbox({
  label,
  defaultChecked = false,
  onChange,
}: {
  label: string
  defaultChecked?: boolean
  onChange?: () => void
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  )
}

/**
 * SIDEBAR LAYOUT ANALYSIS:
 *
 * Position in parent:
 * ┌─────────────────────────────────────────┐
 * │ [Sidebar w-64]  │  [Content flex-1]    │
 * │ flex-none       │                       │
 * │ hidden lg:block │                       │
 * └─────────────────────────────────────────┘
 *
 * Key classes:
 * - hidden lg:block: Ẩn mobile, hiện từ lg (1024px)
 * - flex-none: Không grow/shrink
 * - w-64: Width cố định 256px
 * - sticky top-24: Dính khi scroll (dưới header)
 * - h-fit: Height theo content
 *
 * Internal layout:
 * - space-y-3: Khoảng cách giữa checkboxes
 * - flex items-center gap-3: Align checkbox với label
 *
 * Future enhancements:
 * - State management cho selected filters
 * - Animation khi filter
 * - Mobile drawer version
 */
