import axios from 'axios'

const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/user/orders"
})

export const getOrdersFromDB = async() => {
    try{
        const response = await apiCall.get('/get',{withCredentials:true});
        console.log(response)
        return response.data;
    }catch(error){
        console.log(error)
        return error;
    }
}

export const addOrdersToDB = async(cartData,totalAmount) => {
    console.log(cartData,totalAmount)
    try{
        const response = await apiCall.post('/add',{cartData,totalAmount},{withCredentials:true});
        return response.data;
    }catch(error){
        console.log(error)
        return error;
    }
}

export const verifyCardPayment = async(success,orderId) => {
    console.log(success,orderId)
    try{
        const response = await apiCall.post('/verify',{success,orderId},{withCredentials:true});
        return response.data;
    }catch(error){
        console.log(error)
        return error;
    }
}