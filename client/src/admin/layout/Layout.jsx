import { Outlet,NavLink } from "react-router-dom"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import {useDispatch, useSelector} from 'react-redux'
import {getOrders} from '../slices/ordersSlice'
import {getProducts} from '../slices/productsSlice'
import { TfiPanel } from "react-icons/tfi";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCartPlusFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
    const data = useSelector((state) => state)
    const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(getProducts())
        dispatch(getOrders())
    return;
    },[])
    return(
        <>
        <div className="admin-header max-w-screen-lg m-auto ">
        <Header />
        <ToastContainer/>
        <div className="flex border border-t-0 min-h-screen">
            <div className="side-bar w-[15%] mx-3 absolute top-0 min-h-screen">
            <div className="flex h-14 items-center gap-2 text-2xl font-bold">
           <span><TfiPanel/></span> <h1 className=""><NavLink to="/admin/dashboard">Admin Panel</NavLink></h1>
           </div>
            <ul className="pt-8 mt-2 grid justify-center">
                <NavLink to="/admin/dashboard"><li className="flex h-10 gap-2 items-center cursor-pointer"><span><MdOutlineDashboard/></span>Dashboard</li></NavLink>
                <NavLink to="/admin/products"><li className="flex h-10 gap-2 items-center cursor-pointer"><span><FaShoppingBag/></span>Products</li></NavLink>
                <NavLink to="/admin/orders"><li className="flex h-10 gap-2 items-center cursor-pointer"><span><BsCartPlusFill/></span>Orders</li></NavLink>
            </ul>
            </div>
            
            
            
            <Outlet />
            </div>
        
        {/* <Footer /> */}
        </div>
        </>
    )
}
export default Layout;