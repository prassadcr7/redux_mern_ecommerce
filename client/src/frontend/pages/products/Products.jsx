import {useSelector,useDispatch} from 'react-redux'
import {getProducts,getFilteredProducts} from '../../slices/productsSlice.js'
import {useEffect,useState } from 'react'
import ProductsList from './ProductsList.jsx'
import Filters from './Filters.jsx'
import './products.css'
const Products = () => {
    const data = useSelector((state) => state.products)
    console.log(data)
    const dispatch = useDispatch();
    const [productsArr,setProductsArr] = useState('')
    const [categories,setCategoriesFilter] = useState([])
    const [brands,setBrandsFilter] = useState([])
    
    useEffect( ()=>{
        dispatch(getProducts())
        dispatch(getFilteredProducts('women'))
        setProductsArr(data.data)
        return;
    },[])
    useEffect( ()=>{
        setProductsArr(data.data)
        return;
    },[data])
    useEffect( ()=>{
        if(productsArr){
            var filtArr=null;
            if(categories.length && brands.length){
                filtArr = (data.data).filter((element,index) => brands.includes(element.brand) && categories.includes(element.category))
            }
            else if(categories.length){
                filtArr = (data.data).filter((element,index) => categories.includes(element.category))
            }else if(brands.length){
                filtArr = (data.data).filter((element,index) => brands.includes(element.brand))
            }else{
                filtArr = data.data;
            }
            console.log(filtArr)
            setProductsArr(filtArr)
        }
        return;
    },[categories,brands])
    
    const sortProducts = (event) => {
        const value = event.target.value;
        if(value){
            const dataArr = [...productsArr].sort((a,b) => a.salePrice > b.salePrice ? 1 : -1)
            setProductsArr(dataArr)
        }else{
            setProductsArr(data.data)
        }
       
    }
    
    if(data.loading){
        return(
            <h1>Loading....Please Wait</h1>
        )
    }
    if(productsArr){
        return(
            <div className="wrapper max-w-screen-lg m-auto">
                <div className="products-container flex py-5">
                    <Filters setBrandsFilter={setBrandsFilter} setCategoriesFilter={setCategoriesFilter} brands={brands}
                        categories={categories}
                    />
                    <ProductsList productsArr={productsArr} sortProducts={sortProducts}/>
                </div>
            </div>
        )
    }

}
export default Products



