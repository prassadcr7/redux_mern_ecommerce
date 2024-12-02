import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './frontend/slices/productsSlice'
import userReducer from './globalslices/useSlice'
import cartReducer from './frontend/slices/cartSlice'
const globalStore = configureStore({
    reducer:{
        user:userReducer,
        products:productsReducer,
        cart:cartReducer
    }
})
export default globalStore