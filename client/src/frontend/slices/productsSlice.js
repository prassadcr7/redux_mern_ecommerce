import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getProductsFromDB} from '../axios/clientAxios'
export const getProducts = createAsyncThunk('getProducts', async () => {
    try{
        const data = await getProductsFromDB();
        return data;
    }catch(error){
        return error;
    }
})
const productsSlice = createSlice({
    name:'products',
    initialState:{
        loading:null,
        data: [],
        filteredProducts:[]
    },
    reducers:{
        getFilteredProducts:(state,action) => {
            state.filteredProducts = state.data ? (state.data).filter((element,index) => element.category === action.payload) : [];
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getProducts.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.data = action.payload.data;
                state.error = null;
            }else{
                state.error = action.payload.message;
            }
        })
        .addCase(getProducts.pending,(state,action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProducts.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default productsSlice.reducer

export const {getFilteredProducts} = productsSlice.actions;
