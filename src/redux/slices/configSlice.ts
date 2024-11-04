import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
  products: any[];
  wishlistProducts: any[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  products: [],
  wishlistProducts: [],
  isLoading: false,
  page: 1,
  hasMore: true,
};


export const getProductsAction = createAsyncThunk(
  'products/getProducts',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products?limit=5&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const exists = state.wishlistProducts.some(item => item.id === product.id);
      if (exists) {
        state.wishlistProducts = state.wishlistProducts.filter(item => item.id !== product.id);
      } else {
        state.wishlistProducts.push(product);
      }
    },
    resetProducts: (state) => {
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        if (action.payload.length > 0) {
          state.products = [...state.products, ...action.payload];
          state.page += 1;
          if (action.payload.length < 5) {
            state.hasMore = false;
          }
        } else {
          state.hasMore = false;
        }
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.isLoading = false;
        state.hasMore = false;
      });
  },
});

export const { toggleWishlist, resetProducts } = productSlice.actions;
export default productSlice.reducer;
