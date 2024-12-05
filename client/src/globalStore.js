import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './frontend/slices/productsSlice'
import userReducer from './globalslices/useSlice'
import cartReducer from './frontend/slices/cartSlice'
import orderReducer from './frontend/slices/orderSlice'
const globalStore = configureStore({
    reducer:{
        user:userReducer,
        products:productsReducer,
        cart:cartReducer,
        orders:orderReducer
    }
})
export default globalStore