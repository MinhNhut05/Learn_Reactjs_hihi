// ============================================
// SESSION 2.2.2 - PostList Component
// ============================================

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchPosts,
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
} from './postsSlice';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { PostSkeletonList } from './PostSkeleton';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);

  // Fetch on mount
  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchPosts());
    }
  }, [loading, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>📝</span> Posts
        </h2>
        <button
          onClick={handleRefresh}
          disabled={loading === 'pending'}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium
                     hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Create Form */}
      <div className="mb-6">
        <PostForm />
      </div>

      {/* Content */}
      {loading === 'pending' && posts.length === 0 ? (
        <PostSkeletonList count={5} />
      ) : loading === 'failed' ? (
        <ErrorMessage message={error || 'Failed to load posts'} onRetry={handleRefresh} />
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No posts found</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
