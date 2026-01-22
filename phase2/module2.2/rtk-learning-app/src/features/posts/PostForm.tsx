// ============================================
// SESSION 2.2.2 - PostForm Component
// ============================================

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPost, selectPostsCreating } from './postsSlice';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useAppDispatch();
  const creating = useAppSelector(selectPostsCreating);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    try {
      // unwrap() throws if rejected
      await dispatch(
        createPost({
          title: title.trim(),
          body: body.trim(),
          userId: 1, // Hardcoded for demo
        })
      ).unwrap();

      // Clear form on success
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post content..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     text-gray-800 placeholder-gray-400 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!title.trim() || !body.trim() || creating}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold
                   hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors flex items-center justify-center gap-2"
      >
        {creating ? (
          <>
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
            Creating...
          </>
        ) : (
          'Create Post'
        )}
      </button>
    </form>
  );
}
