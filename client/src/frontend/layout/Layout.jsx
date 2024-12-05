import {Outlet} from 'react-router-dom'
import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'
import {getProducts} from '../slices/productsSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import {getCartItems,setDisplayCart,setTotalCartValue} from '../slices/cartSlice.js'
import {getOrders} from '../slices/orderSlice.js'
import { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getUserAddress} from '../../globalslices/useSlice.js'
const Layout = () => {
    const data = useSelector((state) => state)
    console.log(data)
    const cartItems = data.cart.data;
    const products = data.products.data;
    const displayCart = data.products.displayCart;
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProducts())
        dispatch(getCartItems())
        dispatch(getUserAddress())
        dispatch(getOrders())
        return;
    },[])



 
    useEffect(()=>{
        if(cartItems && products){
            dispatch(setDisplayCart({cartItems:cartItems,products:products}))
     }
     if(displayCart){
        dispatch(setTotalCartValue(displayCart))
    }
        return 
        
    },[cartItems,products,displayCart])

    return (
        <>
        <ToastContainer/>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}

export default Layout