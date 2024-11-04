import {createSlice} from '@reduxjs/toolkit';
import {getProductsAction} from './configAction';

interface ConfigModal {
  isLoading: boolean;
  count: number;
  products?: any;
  matched: boolean;
  wishlistProducts: any;
  cartProducts: any;
}

type ActionType = {
  type: string;
  payload: any;
};

let initialState = {
  isLoading: false,
  count: 0,
  products: [],
  matched: false,
  wishlistProducts: [],
  cartProducts: [],
};

const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload.id;
      const existingProductIndex = state.wishlistProducts.findIndex(
        product => product.id === productId,
      );

      if (existingProductIndex >= 0) {
        state.wishlistProducts.splice(existingProductIndex, 1);
      } else {
        state.wishlistProducts.push(action.payload);
      }
    },

    plus: (state, action) => {
      const existingProduct = state.cartProducts.find(product => product.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 }); 
      }
    },

    minus: (state, action) => {
      const existingProduct = state.cartProducts.find(product => product.id === action.payload.id);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload.id);
        } else {
          existingProduct.quantity -= 1; 
        }
      }
    },

    removeFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload.id); 
    },
  },  

  extraReducers: builder => {
    builder.addCase(getProductsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsAction.fulfilled, (state, action) => {
      console.log('action', action);
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsAction.rejected, state => {
      state.isLoading = false;
    });

    builder.addMatcher(
      action => action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.isLoading = false;
        state.matched = true;
      },
    );
    builder.addDefaultCase((state, action) => {
      console.log('default case', action);
      state.isLoading = false;
    });
  },
  selectors: {
    getProducts: (state: ConfigModal) => state.products,
  },
});

export const {getProducts} = ConfigSlice.selectors;

export const {toggleWishlist, plus, minus, removeFromCart} =
  ConfigSlice.actions;

export default ConfigSlice.reducer;
