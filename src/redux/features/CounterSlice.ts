import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  Value: number;
}

const initialState: CounterState = {
  Value: 0,
};

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  // actions
  reducers: {
    increment: state => {
      state.Value += 1;
    },
    decrement: state => {
      state.Value -= 1;
    },
    incrementByAmount: (state, actions: PayloadAction<number>) => {
      state.Value = actions.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
