import {Outlet} from 'react-router-dom'
import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'
import {getProducts} from '../slices/productsSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import {getUserLogout} from '../../globalslices/useSlice.js'
import { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
    const data = useSelector((state) => state)
    console.log(data)
    const dispatch = useDispatch()
    // dispatch(getUserLogout())
    useEffect(()=>{
        dispatch(getProducts())
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