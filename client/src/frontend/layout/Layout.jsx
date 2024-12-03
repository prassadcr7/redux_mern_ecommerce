import {Outlet} from 'react-router-dom'
import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'
import {getProducts} from '../slices/productsSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import {getCartItems} from '../slices/cartSlice.js'
import { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getUserAddress} from '../../globalslices/useSlice.js'
const Layout = () => {
    const data = useSelector((state) => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProducts())
        dispatch(getCartItems())
        dispatch(getUserAddress())
        return;
    },[])
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