import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {addProductsToDB,getProductsFromDB,editProductsInDB,deleteProductsFromDB} from '../axios/productsAxios'
import { toast } from "react-toastify";
export const addNewProduct = createAsyncThunk('addNewProduct',async(formData)=>{
    try{
        const data = await addProductsToDB(formData)
        console.log(data)
        if(data.success){
            toast.success("Product added successfully! ");
        }else{
        toast.error(data.message)
        }
        return data;
    }catch(error){
        toast.error(error.message)
        return error;
    }
})

export const getProducts = createAsyncThunk('getProducts', async() => {
    try{
        const data = await getProductsFromDB();
        return data;
    }catch(error){
        return error;
    }
})


export const editProduct = createAsyncThunk('editProduct',async({product,id})=>{
    try{
        console.log(product,id)
        const data = await editProductsInDB(product,id)
        console.log(data)
        if(data.success){
            toast.success("Product has been edited");
        }else{
        toast.error(data.message)
        }
        return data;
    }catch(error){
        toast.error(error.message)
        return error;
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async(id) => {
    console.log(id)
    try{
        const data = await deleteProductsFromDB(id);
        console.log(data)
        if(data.success){
            toast.success("Product deleted successfully! ");
        }else{
        toast.error(data.message)
        }
        return data;
    }catch(error){
        toast.error(data.message)
        return error;
    }
})
const productsSlice = createSlice({
    name:'products',
    initialState:{

    },
    reducers:{
        deleteItem:(state,action) => {
            console.log(action)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.data = action.payload.data;
                state.error = null;
            }
            if(!action.payload.success){
                state.error = action.payload.message;
            }
        }) 
        .addCase('getProducts/pending',(state,action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getProducts.rejected,(state,action) => {
            console.log('rejected')
            state.loading = false;
            state.error = action.payload.message;
        }) 
        //add product
        .addCase(addNewProduct.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.data = [...state.data,action.payload.product]
            }else{
                state.error = action.payload.message;
            }
        })  
        .addCase(addNewProduct.pending,(state,action) => {
            state.loading = true;
            state.error = false;
        })  
        .addCase(addNewProduct.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        }) 

        //edit product
        .addCase(editProduct.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.data = state.data.map((element,index) => {
                    if(element._id === action.payload.product._id){
                        return action.payload.product;
                    }
                    return element;
                })
            }else{
                state.error = action.payload.message;
            }
        })  
        .addCase(editProduct.pending,(state,action) => {
            state.loading = true;
            state.error = false;
        })  
        .addCase(editProduct.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        }) 

        //delete product
        .addCase('deleteProduct/fulfilled',(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.data = state.data.filter((element,index) => {
                    return element._id !== action.payload.response._id;
                })
            }else{
                state.error = action.payload.message;
            }
        })  
        .addCase('deleteProduct/pending',(state,action) => {
            state.loading = true;
            state.error = false;
        })  
        .addCase('deleteProduct/rejected',(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })  
    }
})

export default productsSlice.reducer;
export const {deleteItem} = productsSlice.actions;
