import AddNewProduct from './AddNewProduct'
import { useState,useEffect } from 'react'
import ProductsList from './ProductsList.jsx'
import {getProducts} from '../../slices/productsSlice'
import {useDispatch,useSelector} from 'react-redux'
import './products.css'
import { ImCross } from "react-icons/im";
const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)
    const [addProductToggle,setAddProductToggle] = useState(false)
    const [showOverlay,setShowOverlay] = useState(addProductToggle)
    useEffect(()=>{
        setShowOverlay(addProductToggle)
        return;
    },[addProductToggle])
    useEffect(()=>{
        dispatch(getProducts())
    return;
    },[])
 
    return (
    <>
    {showOverlay ? <div class="overlay" onClick={()=>{setAddProductToggle(!addProductToggle)}}></div> : ''}
    <div className="w-[85%] ml-[20%] pt-8  border border-t-0 border-r-0 pl-2 relative">
     <div className="add-product px-3 h-10 flex items-center justify-end">
        <button className="float-right bg-black text-white h-9 px-4 py-2 flex items-center" 
        onClick={()=>{setAddProductToggle(!addProductToggle)}}>Add New Product</button>
        </div> 
        <div className='admin-products'>
            <div className={`showAdd z-10 ${addProductToggle ? 'showAddActive' : ''}`}>
                <div className='flex justify-between items-center pt-2 pb-1 px-6 border-4 border-t-0 border-r-0 border-l-0 border-sky-400'>
                    <h1 className='font-semibold text-xl'>Add New Product</h1><span className='cursor-pointer' 
                    onClick={()=>{setAddProductToggle(!addProductToggle)}}><ImCross /></span></div>
                <AddNewProduct isAddFormVisible={addProductToggle} setAddProductToggle={setAddProductToggle}/>
            </div>
        </div>  
        <div className='products-list'>
            <ProductsList />
        </div>
    </div>
    </>
    )
}
export default Products