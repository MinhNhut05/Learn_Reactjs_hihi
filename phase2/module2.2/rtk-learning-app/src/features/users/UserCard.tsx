// ============================================
// SESSION 2.2.2 - UserCard Component
// ============================================

import type { User } from './usersSlice';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  // Get initials for avatar
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
          <p className="text-sm text-gray-500">@{user.username}</p>

          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <span>📧</span>
              <span className="truncate">{user.email}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <span>🏢</span>
              <span className="truncate">{user.company.name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
