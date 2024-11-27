import {configureStore } from '@reduxjs/toolkit'
import orderReducer from './slices/ordersSlice'
import productsRouter from './slices/productsSlice.js'
const adminStore = configureStore({
    reducer:{
        orders:orderReducer,
        products:productsRouter
    }
}) 

export default adminStore