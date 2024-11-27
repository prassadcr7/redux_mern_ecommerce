import {createSlice} from '@reduxjs/toolkit'

const ordersSlice = createSlice({
    name:'orders',
    initialState:{
        loading:false,
        error:false,
        data:[]
    },
    reducers:{
        getOrders:(state,action)=>{
            return state;
        }
    }
})
export default ordersSlice.reducer;
export const {getOrders} = ordersSlice.actions;

