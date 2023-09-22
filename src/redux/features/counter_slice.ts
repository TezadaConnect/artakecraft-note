import { createSlice } from '@reduxjs/toolkit';

export type CounterStateType = {
  count: number;
};

const initialState: CounterStateType = {
  count: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    }
  }
});

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
