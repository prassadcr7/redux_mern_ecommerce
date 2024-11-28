import { configureStore } from "@reduxjs/toolkit";
import userReducer from './globalslices/useSlice'
const globalStore = configureStore({
    reducer:{
        user:userReducer
    }
})
export default globalStore