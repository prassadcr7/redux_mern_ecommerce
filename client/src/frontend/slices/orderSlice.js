import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import {getOrdersFromDB,addOrdersToDB,verifyCardPayment} from '../axios/orderAxios'


export const getOrders = createAsyncThunk('getOrders',async (operation) => {
    try{
        const data = await getOrdersFromDB();
        console.log(data)
        return data;
    }catch(error){
        return error;
    }
})

export const addOrder = createAsyncThunk('addOrder',async ({displayCart,total}) => {
    try{
        const data = await addOrdersToDB(displayCart,total);
        console.log(data)
        return data;
    }catch(error){
        return error;
    }
})


export const verifyPayment = createAsyncThunk('verify',async ({success,orderId}) => {
    try{
        const data = await verifyCardPayment(success,orderId);
        console.log(data)
        return data;
    }catch(error){
        return error;
    }
})
const orderSlice = createSlice({
    name:'orders',
    initialState:{
        loading:false,
        error:null,
        data:[],
        sessionUrl:null
    },
    reducers:{
    }, 
    extraReducers:(builder) => {
        builder
        //add
        .addCase('addOrder/fulfilled',(state,action) => {
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.data = [...state.data,action.payload.order];
                state.sessionUrl = action.payload.session_url
                toast.success('Ordewr Placed')
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase('addOrder/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('addOrder/pending',(state,action) => {
            state.loading = true;
            state.error = false;
        })
        //get orders
        .addCase('getOrders/fulfilled',(state,action) => {
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.data = action.payload.orderData;
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase('getOrders/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('getOrders/pending',(state,action) => {
            state.loading = true;
            state.data = []
            state.error = false;
        })

        .addCase('verify/fulfilled',(state,action) => {
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.paymentSuccess = true;
                toast.success(action.payload.message);
            }else{
                state.Paymenterror = action.payload.message;
                toast.error(action.payload.message)
            }
        })
        .addCase('verify/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('verify/pending',(state,action) => {
            state.loading = true;
            state.data = []
            state.error = false;
        })

        
    }
})

export default orderSlice.reducer;
// export const {addToCart,updateQuantity,setTotalCartValue,setDisplayCart} = cartSlice.actions;