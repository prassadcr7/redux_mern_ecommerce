import axios from 'axios'

const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/admin/orders"
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
