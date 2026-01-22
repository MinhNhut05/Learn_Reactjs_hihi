// ============================================
// SESSION 2.2.2 - PostSkeleton Component
// ============================================

export default function PostSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse">
      {/* Title skeleton */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
      </div>

      <hr className="my-3 border-gray-100" />

      {/* Body skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-4">
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

export function PostSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
