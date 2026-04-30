import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  date: string;
  status: 'Delivered' | 'On the way' | 'Cancelled';
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
