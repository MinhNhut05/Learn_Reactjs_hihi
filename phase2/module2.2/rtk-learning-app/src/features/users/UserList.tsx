// ============================================
// SESSION 2.2.2 - UserList Component
// ============================================

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUsers, selectAllUsers, selectUsersLoading, selectUsersError } from './usersSlice';
import UserCard from './UserCard';
import { UserSkeletonList } from './UserSkeleton';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function UserList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  // Fetch on mount (only if idle)
  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchUsers());
    }
  }, [loading, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>👥</span> Users
        </h2>
        <button
          onClick={handleRefresh}
          disabled={loading === 'pending'}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium
                     hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors flex items-center gap-2"
        >
          {loading === 'pending' ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading...
            </>
          ) : (
            'Refresh'
          )}
        </button>
      </div>

      {/* Content */}
      {loading === 'pending' && users.length === 0 ? (
        <UserSkeletonList count={5} />
      ) : loading === 'failed' ? (
        <ErrorMessage message={error || 'Failed to load users'} onRetry={handleRefresh} />
      ) : users.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No users found</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
