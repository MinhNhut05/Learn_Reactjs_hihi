/**
 * Micro Exercise 2: cn() Helper
 * Session 1.5.6 - Headless UI & Production
 *
 * MỤC TIÊU:
 * Tạo cn() helper function kết hợp clsx + tailwind-merge
 *
 * YÊU CẦU:
 * 1. Import clsx và twMerge
 * 2. Tạo function cn() nhận nhiều ClassValue
 * 3. Return twMerge(clsx(inputs))
 * 4. Test với conditional classes
 * 5. Test với conflicting classes
 *
 * THỜI GIAN: 5 phút
 *
 * GỢI Ý:
 * - import { clsx, type ClassValue } from 'clsx'
 * - import { twMerge } from 'tailwind-merge'
 * - cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
 */

// TODO: Import clsx và tailwind-merge
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: Tạo cn() helper function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// // Placeholder cn function - replace this
// function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// Test component
export default function Micro2CNHelper() {
  const isActive = true;
  const isDisabled = false;
  const customClass = "p-8"; // Should override p-4

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Micro 2: cn() Helper</h1>

      {/* ========================================
          GIẢI THÍCH: cn() HELPER LÀ GÌ?
          ======================================== */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-blue-800">
          cn() Helper giải quyết 2 vấn đề:
        </h2>

        {/* VẤN ĐỀ 1 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-700">
            Vấn đề 1: Conditional classes rất xấu
          </h3>
          <div className="bg-white p-4 rounded border font-mono text-sm">
            <p className="text-red-600">❌ Không dùng cn():</p>
            <pre className="text-gray-700 mt-1">{`className={\`base \${isActive ? 'bg-green-500' : ''} \${isDisabled ? 'opacity-50' : ''}\`}`}</pre>
            <p className="text-green-600 mt-3">✅ Dùng cn():</p>
            <pre className="text-gray-700 mt-1">{`className={cn('base', isActive && 'bg-green-500', isDisabled && 'opacity-50')}`}</pre>
          </div>
          <p className="text-sm text-gray-600">
            → <strong>clsx</strong> giúp viết conditional classes sạch hơn
          </p>
        </div>

        {/* VẤN ĐỀ 2 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-700">
            Vấn đề 2: Tailwind classes bị conflict
          </h3>
          <div className="bg-white p-4 rounded border font-mono text-sm">
            <p className="text-red-600">❌ Không dùng cn():</p>
            <pre className="text-gray-700 mt-1">{`<div className="p-4 p-8" />
// Kết quả: CẢ HAI p-4 VÀ p-8 đều apply! (không đúng ý)`}</pre>
            <p className="text-green-600 mt-3">✅ Dùng cn():</p>
            <pre className="text-gray-700 mt-1">{`<div className={cn("p-4", "p-8")} />
// Kết quả: CHỈ p-8 apply (p-8 override p-4)`}</pre>
          </div>
          <p className="text-sm text-gray-600">
            → <strong>tailwind-merge</strong> giúp class sau override class trước khi conflict
          </p>
        </div>

        {/* USE CASE THỰC TẾ */}
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-700">
            Use case thực tế: Component cho phép override styles
          </h3>
          <div className="bg-white p-4 rounded border font-mono text-sm">
            <pre className="text-gray-700">{`// Button component có default padding p-4
function Button({ className, children }) {
  return (
    <button className={cn("p-4 bg-blue-500", className)}>
      {children}
    </button>
  );
}

// Khi dùng:
<Button className="p-8" />
// → p-8 sẽ OVERRIDE p-4 (thay vì cả 2 apply)`}</pre>
          </div>
          <p className="text-sm text-gray-600">
            → Cho phép user override default styles của component một cách sạch sẽ
          </p>
        </div>

        {/* TÓM TẮT */}
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="font-semibold text-blue-800">TÓM TẮT:</p>
          <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
            <li>
              <strong>cn() = clsx + tailwind-merge</strong>
            </li>
            <li>
              <strong>clsx:</strong> Viết conditional classes dễ dàng
            </li>
            <li>
              <strong>tailwind-merge:</strong> Resolve conflicts (class sau thắng)
            </li>
            <li>
              <strong>Khi nào dùng:</strong> Mọi lúc cần conditional hoặc merge classes
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Test 1: Basic usage */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 1: Basic Usage</h2>
        <div
          className={cn("px-4 py-2", "bg-blue-500", "text-white rounded-lg")}
        >
          Basic: px-4 py-2 bg-blue-500 text-white rounded-lg
        </div>
      </div>

      {/* Test 2: Conditional classes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 2: Conditional Classes</h2>
        <div
          className={cn(
            "px-4 py-2 rounded-lg",
            isActive && "bg-green-500 text-white",
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          isActive={String(isActive)}, isDisabled={String(isDisabled)}
        </div>
      </div>

      {/* Test 3: Conflicting classes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 3: Conflicting Classes</h2>
        <p className="text-sm text-gray-500">
          Với tailwind-merge: p-8 sẽ override p-4
        </p>
        <div className={cn("p-4 bg-yellow-500 rounded-lg", customClass)}>
          Base: p-4, Override: p-8 → Kết quả nên là p-8
        </div>
      </div>

      {/* Test 4: Override colors */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Test 4: Override Colors</h2>
        <p className="text-sm text-gray-500">
          text-blue-500 sẽ override text-red-500
        </p>
        <div
          className={cn(
            "px-4 py-2 rounded-lg bg-gray-100",
            "text-red-500",
            "text-blue-500" // Should win
          )}
        >
          Result should be text-blue-500
        </div>
      </div>

      {/* Expected output */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Expected Behavior</h2>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
          {`// clsx handles conditionals
cn('base', false && 'hidden', true && 'visible')
// => 'base visible'

// tailwind-merge resolves conflicts
cn('p-4', 'p-8')
// => 'p-8' (not 'p-4 p-8')

cn('text-red-500', 'text-blue-500')
// => 'text-blue-500' (last wins)

cn('px-4 py-2', 'p-8')
// => 'p-8' (p-8 overrides both px-4 and py-2)`}
        </pre>
      </div>
    </div>
  );
}
