// ============================================
// SESSION 2.2.2 - REAL EXERCISE: Posts Slice (CRUD)
// ============================================
// Mục tiêu: Full CRUD với createAsyncThunk
//
// API: https://jsonplaceholder.typicode.com/posts
// ============================================

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Types
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  creating: boolean;
  deleting: number | null; // ID của post đang delete
}

const initialState: PostsState = {
  items: [],
  loading: 'idle',
  error: null,
  creating: false,
  deleting: null,
};

// ============================================
// ASYNC THUNKS
// ============================================

// READ - Fetch all posts (limit to 10)
export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}?_limit=10`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return (await response.json()) as Post[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// CREATE - Add new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (post: { title: string; body: string; userId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return (await response.json()) as Post;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// DELETE - Remove post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete post');
      return postId; // Return ID để remove from state
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// ============================================
// SLICE
// ============================================

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.items = [];
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== FETCH ==========
      .addCase(fetchPosts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch posts';
      })

      // ========== CREATE ==========
      .addCase(createPost.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload); // Add to beginning
      })
      .addCase(createPost.rejected, (state) => {
        state.creating = false;
      })

      // ========== DELETE ==========
      .addCase(deletePost.pending, (state, action) => {
        state.deleting = action.meta.arg; // ID from argument
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleting = null;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleting = null;
      });
  },
});

// Exports
export const { resetPosts } = postsSlice.actions;

// Selectors
export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsCreating = (state: RootState) => state.posts.creating;
export const selectPostsDeleting = (state: RootState) => state.posts.deleting;

export default postsSlice.reducer;
