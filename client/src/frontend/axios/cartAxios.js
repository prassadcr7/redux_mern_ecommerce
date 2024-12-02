import axios from 'axios'

const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/client/cart"
})

export const getCartItemsFromDB = async() => {
    try{
        const response = await apiCall.get('/get',{withCredentials:true});
        return response.data;
    }catch(error){
        console.log(error)
        return error;
    }
}

export const addItemToCartDB = async(item) => {
    try{
        const response = await apiCall.post('/add',{'item':item,'test':1},{
            withCredentials:true,
                headers:{
                    'content-type':'application/json'
                }
            }
        );
        console.log(response)
        return response.data;
        
    }catch(error){
        return error;
    }
}

export const removeItemFromCart = async(productId) => {
    console.log(productId)
    try{
        const response = await apiCall.delete(`delete/${productId}`,{
            withCredentials:true
        });
        console.log(response)
        return response.data;
    }catch(error){
        console.log(error)
        return error;
    }
}

export const changeItemQuantity = async (operation) => {
    console.log(operation)
    try{
        const response = await apiCall.post('/quantity',operation,{
            withCredentials:true,
            headers:{
                'content-type':'application/json'
            }
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}