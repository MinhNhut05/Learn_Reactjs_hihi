// ============================================
// SESSION 2.2.1 - Filter Slice
// ============================================

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type FilterValue = 'all' | 'active' | 'completed';

interface FilterState {
  value: FilterValue;
}

const initialState: FilterState = {
  value: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterValue>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter.value;
export default filterSlice.reducer;
