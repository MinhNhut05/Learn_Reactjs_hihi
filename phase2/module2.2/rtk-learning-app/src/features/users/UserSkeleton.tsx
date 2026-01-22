// ============================================
// SESSION 2.2.2 - UserSkeleton Component
// ============================================

export default function UserSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-gray-200" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="space-y-2 mt-3">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Multiple skeletons for loading state
export function UserSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <UserSkeleton key={i} />
      ))}
    </div>
  );
}
