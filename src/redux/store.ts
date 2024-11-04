import { configureStore } from '@reduxjs/toolkit';
import configSlice from '../redux/config/configSlice';



export const store = configureStore({
  reducer: {

   mainapi:configSlice
  },
})

export default store;