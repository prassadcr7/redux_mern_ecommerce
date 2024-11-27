import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {checkSignup,checkLogin,checkLogout,checkAuth} from '../axios/user/axios'

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
const userSlice = createSlice({
    name:'user',
    initialState:{
        error:null,
        isAuthenticated:false,
        user:null
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
        
    }
})

export default userSlice.reducer