import {useSelector,useDispatch} from 'react-redux'
import {getProducts,getFilteredProducts} from '../../slices/productsSlice.js'
import {useEffect,useState } from 'react'
import ProductListing from '../../components/ProductListing.jsx'
const Women = () => {
    const dispatch = useDispatch();
    const {loading,error,filteredProducts} = useSelector((state) => state.products)
    useEffect( ()=>{
        const fetchData = () => setTimeout(()=>{
            dispatch(getFilteredProducts('women'))
        },1000)
        fetchData()
        return clearTimeout(fetchData);
    },[])
    if(error){
        <h1>{error}</h1>
    }
    if(loading){
        return(
            <h1>Loading....Please Wait</h1>
        )
    }
    if(filteredProducts){
        return(
            <div className="wrapper max-w-screen-lg m-auto">
                <ProductListing productsArr={filteredProducts}/>
            </div>
        )
    }
}
export default Women


