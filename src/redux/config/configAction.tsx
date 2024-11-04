import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const getProductsApi = async () => {
  return axios.get('https://fakestoreapi.com/products');
};


export const getProductsAction = createAsyncThunk(
  'config/getProducts',
  async (args, thunkApi) => {
    //console.log('args', args);
    try {
      //console.log('getProductsAction', args, thunkApi);
      const response = await getProductsApi();
      //console.log('getProductsApi', response);
      if (response) {
        return thunkApi.fulfillWithValue(response.data);
      }
      throw new Error(response?.data?.error as string);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);