import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category?: string;
  rating?: number;
}

interface WishlistState {
  wishlistData: WishlistItem[];
}

const initialState: WishlistState = {
  wishlistData: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const index = state.wishlistData.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.wishlistData.splice(index, 1);
      } else {
        state.wishlistData.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlistData = state.wishlistData.filter(item => item.id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
