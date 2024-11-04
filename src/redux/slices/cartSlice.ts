import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartProduct {
  id: number;
  quantity: number;

}

interface CartState {
  cartProducts: CartProduct[];
}

const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    plus: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.cartProducts.find((product) => product.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    minus: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.cartProducts.find((product) => product.id === action.payload.id);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
        } else {
          existingProduct.quantity -= 1;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const { plus, minus, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
