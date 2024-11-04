import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsAction } from '../config/configAction';

export const getProductsAction = createAsyncThunk(
  'products/getProducts',
  async (page: number) => {
    const response = await getProductsAction(page); // fetch products based on the page
    return response.data;
  }
);

const configSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    wishlistProducts: [],
    isLoading: false,
    currentPage: 1,
    hasMore: true,
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.wishlistProducts.findIndex((p) => p.id === product.id);
      if (index > -1) {
        state.wishlistProducts.splice(index, 1);
      } else {
        state.wishlistProducts.push(product);
      }
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMore = true;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.length > 0) {
          state.products = [...state.products, ...action.payload];
          state.currentPage += 1;
          state.hasMore = action.payload.length === 5; // if received less than 5, no more data
        } else {
          state.hasMore = false;
        }
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleWishlist, resetPagination } = configSlice.actions;
export default configSlice.reducer;
