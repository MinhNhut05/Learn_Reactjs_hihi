// ============================================
// BÀI TẬP: BookmarkList Component (với Async)
// ============================================

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addBookmark,
  removeBookmark,
  toggleFavorite,
  selectAllBookmarks,
  fetchBookmarks,
  selectBookmarksError,
  selectBookmarksLoading,
  // TODO ASYNC-4A: Import thêm fetchBookmarks và selectors mới
  // 👇 TODO: Import fetchBookmarks, selectBookmarksLoading, selectBookmarksError
} from "./bookmarksSlice";

export default function BookmarkList() {
  const dispatch = useAppDispatch();

  const bookmarks = useAppSelector(selectAllBookmarks);

  // TODO ASYNC-4B: Lấy loading và error từ store
  // 👇 TODO: Dùng useAppSelector để lấy loading và error
  const loading = useAppSelector(selectBookmarksLoading); // ← Thay bằng useAppSelector(selectBookmarksLoading)
  const error = useAppSelector(selectBookmarksError); // ← Thay bằng useAppSelector(selectBookmarksError)

  // TODO ASYNC-4C: Fetch bookmarks khi component mount
  // 👇 TODO: Dùng useEffect để dispatch fetchBookmarks() khi loading === 'idle'
  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchBookmarks());
    }
    // Điền code ở đây
  }, [loading, dispatch]);

  // Local state cho form
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    dispatch(addBookmark(title, url));
    setTitle("");
    setUrl("");
  };

  // TODO ASYNC-4D: Hàm refresh
  const handleRefresh = () => {
    dispatch(fetchBookmarks());
    // 👇 TODO: dispatch fetchBookmarks()
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {/* Header với nút Load */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>🔖</span> Bookmarks
        </h2>

        {/* TODO ASYNC-4E: Nút Load/Refresh */}
        <button
          onClick={handleRefresh}
          disabled={loading === "pending"}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium
                     hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {/* 👇 TODO: Hiện "Loading..." khi pending, "Load from API" khi không */}
          {loading === "pending" ? "Loading..." : "Load from API"}
        </button>
      </div>
      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g., Google)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL (e.g., https://google.com)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add Bookmark
        </button>
      </form>
      {/* Bookmark List - Conditional rendering theo loading state */}
      {loading === "pending" && bookmarks.length === 0 ? (
        <p className="text-center text-gray-400 py-8">Loading...</p>
      ) : loading === "failed" ? (
        <p className="text-center text-red-500 py-8">{error}</p>
      ) : (
        <div className="space-y-3">
        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            No bookmarks yet. Click "Load from API" to fetch sample data.
          </p>
        ) : (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <button
                onClick={() => dispatch(toggleFavorite(bookmark.id))}
                className="text-2xl"
              >
                {bookmark.isFavorite ? "⭐" : "☆"}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">
                  {bookmark.title}
                </h3>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline truncate block"
                >
                  {bookmark.url}
                </a>
              </div>

              <button
                onClick={() => dispatch(removeBookmark(bookmark.id))}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                🗑️
              </button>
            </div>
          ))
        )}
        </div>
      )}
    </div>
  );
}
