import { configureStore } from '@reduxjs/toolkit'
import configSlice from '../config/configSlice'



export const store = configureStore({
  reducer: {
   // reducer for slice goes here
   mainapi:configSlice
  },
})

export default store;