import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  wishlistProducts: any[];
}

const initialState: WishlistState = {
  wishlistProducts: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<any>) => {
      const productId = action.payload.id;
      const index = state.wishlistProducts.findIndex((item) => item.id === productId);

      if (index >= 0) {
        state.wishlistProducts.splice(index, 1);
      } else {
        state.wishlistProducts.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
