
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import {getOrdersFromDB} from '../axios/orderAxios'

export const getOrders = createAsyncThunk('getOrders',async () => {
    try{
        const data = await getOrdersFromDB();
        console.log(data)
        return data;
    }catch(error){
        return error;
    }
})
const ordersSlice = createSlice({
    name:'orders',
    initialState:{
        loading:false,
        error:false,
        data:[]
    },
    reducers:{
    },
    extraReducers:(builder) => 
        builder
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
})
export default ordersSlice.reducer;
// export const {getOrders} = ordersSlice.actions;

