// ============================================
// SESSION 2.2.2 - MINI EXERCISE: Users Slice (Async)
// ============================================
// Mục tiêu: Học createAsyncThunk và extraReducers
//
// API: https://jsonplaceholder.typicode.com/users
// ============================================

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

interface UsersState {
  entities: User[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  error: null,
};

// Async Thunk - Fetch all users
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return (await response.json()) as User[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Reset state
    resetUsers: (state) => {
      state.entities = [];
      state.loading = 'idle';
      state.error = null;
    },
  },
  // extraReducers cho async actions
  extraReducers: (builder) => {
    builder
      // Pending - bắt đầu fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      // Fulfilled - thành công
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entities = action.payload;
      })
      // Rejected - lỗi
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Unknown error';
      });
  },
});

// Exports
export const { resetUsers } = usersSlice.actions;

// Selectors
export const selectAllUsers = (state: RootState) => state.users.entities;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
