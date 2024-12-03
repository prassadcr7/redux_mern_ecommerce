import axios from 'axios'

const apiCall = axios.create({
    baseURL:'http://localhost:4000/api/user'
})

export const checkSignup = async (formData) => {
    console.log(formData)
    try{
        const response = await apiCall.post('/register',formData,{
            withCredentials:true
        })
        return response.data;
    }catch(error){
        return error;
    }
}

export const checkLogin = async (formData) => {
    try{
        const response = await apiCall.post('/login',formData,{
            withCredentials:true
        })
        return response.data;
    }catch(error){
        return error;
    }
}

export const checkLogout = async () => {
    try{
        const response = await apiCall.post('/logout',{},{
            withCredentials: true,  // Ensures credentials (like cookies) are included
          })
        return response.data;
    }catch(error){
        return error;
    }
}

export const checkAuth = async () => {
    try{
        const response = await apiCall.get('/check-auth',{
            withCredentials:true,
            headers:{
                'cache-control' : 'no-store,no-cache,must-revalidate,proxy-revalidate',
            }
            
        })
        return response.data;
    }catch(error){
        return error;
    }
}


const addressApi = axios.create({
    baseURL:'http://localhost:4000/api/user/address'
})

export const addAddressToDB = async (formData) => {
    try{
        const response = await addressApi.post('/add',formData,{
            withCredentials:true
        })
        return response.data;
    }catch(error){
        return error;
    }
}

export const getAddressToDB = async () => {
    try{
        const response = await addressApi.post('/get',{},{
            withCredentials:true
        })
        return response.data;
    }catch(error){
        return error;
    }
}