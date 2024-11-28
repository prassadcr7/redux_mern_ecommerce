import axios from 'axios'
const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/admin/products"
})

export const addProductsToDB = async (formData) => {
    try{
        const response = await apiCall.post('/add',formData);
        return response.data;
    }catch(error){
        return error;
    }
}

export const getProductsFromDB = async () => {
    try{
        const response = await apiCall.get('/get');
        return response.data;
    }catch(error){
        return error;
    }
}

export const editProductsInDB = async (product,id) => {
    console.log(id)
    try{
        const response = await apiCall.put(`/edit/${id}`,product, {
            headers: {
                'Content-Type': 'multipart/form-data',  
    }});
        return response.data;
    }catch(error){
        return error;
    }
}

export const deleteProductsFromDB = async ({id}) => {
    try{
        const response = await apiCall.delete(`/delete/${id}`);
        return response.data;
    }catch(error){
        return error;
    }
}