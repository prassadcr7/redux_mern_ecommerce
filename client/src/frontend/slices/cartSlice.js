import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import {getCartItemsFromDB,addItemToCartDB,changeItemQuantity,removeItemFromCart} from '../axios/cartAxios'

export const getCartItems = createAsyncThunk('getItems',async () => {
    try{
        const data = await getCartItemsFromDB();
        return data;
    }catch(error){
        console.log(error)
        return error;
    }
})

export const addItemToCart = createAsyncThunk('add',async (item) => {
    try{
        const data = await addItemToCartDB(item);
        return data;
    }catch(error){
        return error;
    }
})

export const removeFromCart = createAsyncThunk('remove',async (productId) => {
    console.log(productId)
    try{
        const data = removeItemFromCart(productId);
        return data;
    }catch(error){
        return error;
    }
})

export const changeQuantity = createAsyncThunk('changeQuantity',async (operation) => {
    if((operation.quantity > 1 && operation.type === '-') || (operation.quantity > 0 && operation.type === '+')){
        try{
            const data = await changeItemQuantity(operation);
            console.log(data)
            return data;
        }catch(error){
            return error;
        }
    }

})

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        loading:false,
        error:null,
        data:[],
        pricing:{}
    },
    reducers:{
        setTotalCartValue:(state,action) => {
            console.log(action.payload)
            const dataArr = action.payload;
            if(action.payload){
                state.pricing.tax = 10;
                state.pricing.total = dataArr.reduce((accumulator,element,index) => {
                    return accumulator + Number(element.total);
                },0)
                state.pricing.totalAmount = state.pricing.tax + state.pricing.total;
            }
        },
        updateQuantity:(state,action) => {
            console.log(action)
            if(action.payload.type == '+'){
                state.data = state.data.map((element,index) => {
                    if(element._id === action.payload._id){
                        return {...element,qty:element.qty + 1}   
                    }
                    return element;
                })
            }else{
                state.data = state.data.map((element,index) => {
                    if(element._id === action.payload._id){
                        console.log(element.qty)
                        return {...element,qty:element.qty - 1}   
                    }
                    return element;
                })
            }
            return state;
        }
    },
    extraReducers:(builder) => {
        builder
        //add
        .addCase('add/fulfilled',(state,action) => {
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.data = [...state.data,action.payload.newData.item];
                toast.success('Item Added To Cart')
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase('add/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('add/pending',(state,action) => {
            state.loading = true;
            state.error = false;
        })
        //get items
        .addCase('getItems/fulfilled',(state,action) => {
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.data = action.payload.data;
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase('getItems/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('getItems/pending',(state,action) => {
            state.loading = true;
            state.data = []
            state.error = false;
        })

        //remove
        .addCase('remove/fulfilled',(state,action) => {
            console.log(action.payload)
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.data = state.data.filter((element,index) => element._id !== action.payload.deletedId);
                toast.success('Item removed from Cart')
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase('remove/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('remove/pending',(state,action) => {
            state.loading = true;
            state.error = false;
        })

        //quantity
        .addCase(changeQuantity.fulfilled,(state,action) => {
            console.log(action.payload)
            state.loading = true;
            if(action.payload.success){
                state.loading = false;
                state.data = state.data.map((element,index) => {
                   return element._id === action.payload.updatedItem._id ? {...element,qty:action.payload.updatedItem.qty} : element;
                
                })
                // toast.success('Item Quantity Changed Successfully')
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase('changeQuantity/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase('changeQuantity/pending',(state,action) => {
            state.loading = true;
            state.error = false;
        })

        
    }
})

export default cartSlice.reducer;
export const {addToCart,updateQuantity,setTotalCartValue} = cartSlice.actions;