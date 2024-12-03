import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {checkSignup,checkLogin,checkLogout,checkAuth,addAddressToDB,getAddressfromDB} from '../axios/user/axios'
import { toast } from "react-toastify";
export const getUserSignup = createAsyncThunk('userSignup',async(formData)=>{
    try{
        const data = await checkSignup(formData);
        return data;
    }catch(error){
        console.log(error)
    }
})

export const getUserLogin = createAsyncThunk('userLogin',async(formData)=>{
    try{
        const data = await checkLogin(formData);
        console.log(data)
        if(data.success){
            toast.success("Logged In");
        }else{
        toast.error(data.message)
        }
        return data;
       
    }catch(error){
        console.log(error)
    }
})

export const getUserLogout = createAsyncThunk('userLogout',async()=>{
    console.log('logout fn')
    try{
        const data = await checkLogout();
        console.log(data)
        if(data.success){
            toast.success("Logged Out");
        }else{
        toast.error(data.message)
        }
        return data;
       
    }catch(error){
        console.log(error)
    }
})

export const checkUserAuth = createAsyncThunk('userAuth',async()=>{
    try{
        const data = await checkAuth();
        return data;
       
    }catch(error){
        console.log(error)
    }
})

export const getUserAddress = createAsyncThunk('getUserAddress',async()=>{
    try{
        const data = await getAddressfromDB();
        // console.log(data);
        if(!data.success)
        toast.error(data.message)
        return data;
       
    }catch(error){
        console.log(error)
    }
})

export const addUserAddress = createAsyncThunk('userAddress',async(formData)=>{
    console.log(formData)
    try{
        const data = await addAddressToDB(formData);
        console.log(data)
        if(!data.success)
        toast.error(data.message)
        return data;
    }catch(error){
        console.log(error)
    }
})


const userSlice = createSlice({
    name:'user',
    initialState:{
        error:null,
        isAuthenticated:false,
        user:null,
        address:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUserSignup.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.userCreated = true;
            }
            if(!action.payload.success){
                state.error = action.payload.message;
            }
        })
        .addCase(getUserSignup.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        
        .addCase(getUserSignup.pending,(state,action) => {
            state.loading = true;
            state.token = null;
            state.error = null;
        })

        .addCase(getUserLogin.fulfilled,(state,action) => {
            console.log(action.payload.user)
            state.loading = false;
            if(action.payload.success){
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            }
            if(!action.payload.success){
                state.error = action.payload.message;
                state.isAuthenticated = false;
            }
        })
        .addCase(getUserLogin.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        
        .addCase(getUserLogin.pending,(state,action) => {
            state.loading = true;
            state.token = null;
            state.error = null;
            state.user = null;
        })

        .addCase(checkUserAuth.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            }
            if(!action.payload.success){
                state.error = action.payload.message;
                state.isAuthenticated = false;
            }
        })
        .addCase(checkUserAuth.rejected,(state,action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload.message;
        })
        
        .addCase(checkUserAuth.pending,(state,action) => {
            state.loading = true;
        })


        .addCase(getUserLogout.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
                state.user = null;
                state.token = null;
                state.isAuthenticated = null;
            }
            if(!action.payload.success){
                state.error = action.payload.message;
                state.isAuthenticated = false;
            }
        })
        .addCase(getUserLogout.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        
        .addCase(getUserLogout.pending,(state,action) => {
            state.loading = true;
        })

        .addCase(getUserAddress.fulfilled,(state,action) => {
            // console.log(action.payload)
            state.loading = false;
            if(action.payload.success){
                state.address = action.payload.data;
            }
            if(!action.payload.success){
                state.error = action.payload.message;
            }
        })
        .addCase(getUserAddress.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        
        .addCase(getUserAddress.pending,(state,action) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(addUserAddress.fulfilled,(state,action) => {
            state.loading = false;
            if(action.payload.success){
            state.address = [...state.address,action.payload.address];
            toast.success('Item Added To Cart')
            }
            if(!action.payload.success){
                state.error = action.payload.message;
            }
        })
        .addCase(addUserAddress.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        
        .addCase(addUserAddress.pending,(state,action) => {
            state.loading = true;
            state.error = null;
        })
        
    }
})

export default userSlice.reducer