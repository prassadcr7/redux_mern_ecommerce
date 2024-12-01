import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './frontend/slices/productsSlice'
import userReducer from './globalslices/useSlice'
const globalStore = configureStore({
    reducer:{
        user:userReducer,
        products:productsReducer
    }
})
export default globalStore