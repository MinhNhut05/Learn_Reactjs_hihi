// ============================================
// SESSION 2.2.2 - PostCard Component
// ============================================

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePost, selectPostsDeleting } from './postsSlice';
import type { Post } from './postsSlice';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const dispatch = useAppDispatch();
  const deletingId = useAppSelector(selectPostsDeleting);
  const isDeleting = deletingId === post.id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all
                  ${isDeleting ? 'opacity-50' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50
                     rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
        >
          {isDeleting ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-100" />

      {/* Body */}
      <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <span>👤</span>
        <span>User {post.userId}</span>
      </div>
    </div>
  );
}
