import axios from 'axios'

const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/client/products"
})

export const getProductsFromDB = async () => {
    try{
        const response = await apiCall.get("/get");
        return response.data;
    }catch(error){
        return error;
    }
} 

export const test = async (_id) => {

    try{
        console.log(8)
        const response = await apiCall.post("/test",_id,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        return error;
    }
} 