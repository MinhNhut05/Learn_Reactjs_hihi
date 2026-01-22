// ============================================
// BÀI TẬP: Bookmarks Slice (với Async)
// ============================================

import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// ============================================
// BƯỚC 1: Định nghĩa Types
// ============================================

interface Bookmark {
  id: string;
  title: string;
  url: string;
  isFavorite: boolean;
}

// TODO ASYNC-1A: Thêm loading và error vào BookmarksState
// 👇 TODO: Thêm 2 fields:
//   - loading: 'idle' | 'pending' | 'succeeded' | 'failed'
//   - error: string | null
interface BookmarksState {
  items: Bookmark[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// TODO ASYNC-1B: Cập nhật initialState
// 👇 TODO: Thêm loading: 'idle' và error: null
const initialState: BookmarksState = {
  items: [],
  loading: "idle",
  error: null,
};

// ============================================
// ASYNC THUNK: Fetch bookmarks từ "API"
// ============================================

// Mock API - giả lập fetch từ server (delay 1 giây)
const mockFetchBookmarks = (): Promise<Bookmark[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: nanoid(),
          title: "Google",
          url: "https://google.com",
          isFavorite: true,
        },
        {
          id: nanoid(),
          title: "GitHub",
          url: "https://github.com",
          isFavorite: false,
        },
        {
          id: nanoid(),
          title: "YouTube",
          url: "https://youtube.com",
          isFavorite: true,
        },
      ]);
    }, 1000); // Delay 1 giây để thấy loading
  });
};

// TODO ASYNC-1C: Tạo fetchBookmarks async thunk
// 👇 TODO: Hoàn thành createAsyncThunk
//   - Gọi mockFetchBookmarks()
//   - Return kết quả
export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchAll",
  async () => {
    // 👇 TODO: Gọi mockFetchBookmarks() và return kết quả
    const data = await mockFetchBookmarks();
    return data;
  },
);

// ============================================
// SLICE
// ============================================

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: {
      reducer: (state, action: PayloadAction<Bookmark>) => {
        state.items.push(action.payload);
      },
      prepare: (title: string, url: string) => ({
        payload: {
          id: nanoid(),
          title,
          url,
          isFavorite: false,
        },
      }),
    },

    removeBookmark: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const bookmark = state.items.find((item) => item.id === action.payload);
      if (bookmark) {
        bookmark.isFavorite = !bookmark.isFavorite;
      }
    },
  },

  // TODO ASYNC-2: Thêm extraReducers
  // 👇 TODO: Handle 3 cases: pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      // TODO: pending - set loading = 'pending', error = null
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      // TODO: fulfilled - set loading = 'succeeded', items = action.payload
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload;
      })
      // TODO: rejected - set loading = 'failed', error = message
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

// ============================================
// EXPORTS
// ============================================

export const { addBookmark, removeBookmark, toggleFavorite } =
  bookmarksSlice.actions;

export const selectAllBookmarks = (state: RootState) => state.bookmarks.items;
export const selectFavoriteBookmarks = (state: RootState) =>
  state.bookmarks.items.filter((item) => item.isFavorite);

// TODO ASYNC-3: Thêm selectors cho loading và error
// 👇 TODO: Tạo 2 selectors
export const selectBookmarksLoading = (state: RootState) =>
  state.bookmarks.loading;
export const selectBookmarksError = (state: RootState) => state.bookmarks.error;

export default bookmarksSlice.reducer;
