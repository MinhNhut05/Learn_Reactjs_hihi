// ============================================
// SESSION 2.2.1 - MINI EXERCISE: Counter App
// ============================================
// Mục tiêu: Hiểu createSlice, PayloadAction, Immer
//
// TODO 1: Implement increment reducer
// TODO 2: Implement decrement reducer
// TODO 3: Implement incrementByAmount reducer
// TODO 4: Implement reset reducer
// ============================================

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// State interface
interface CounterState {
  value: number;
}

// Initial state
const initialState: CounterState = {
  value: 0,
};

// Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // TODO 1: Tăng value lên 1
    // Hint: Với Immer, bạn có thể viết state.value += 1
    increment: (state) => {
      // 👇 Implement here
      state.value += 1;
    },

    // TODO 2: Giảm value đi 1
    decrement: (state) => {
      // 👇 Implement here
      state.value -= 1;
    },

    // TODO 3: Tăng value theo số được truyền vào
    // Hint: action.payload chứa số cần tăng
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // 👇 Implement here
      state.value += action.payload;
    },

    // TODO 4: Reset về 0
    reset: (state) => {
      // 👇 Implement here
      state.value = 0;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// Selectors
export const selectCount = (state: RootState) => state.counter.value;

// Export reducer
export default counterSlice.reducer;
