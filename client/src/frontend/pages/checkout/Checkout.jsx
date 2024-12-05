import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react"
import AddressList from "../my-account/AddressList"
import CartTotal from '../cart/CartTotal'
import {addOrder} from '../../slices/orderSlice'
const Checkout = () => {
    const dispatch= useDispatch()
    const {user,error,loading,address} = useSelector((state) => state.user)
    const {displayCart,pricing} = useSelector((state) => state.cart)
    const {sessionUrl} = useSelector((state) => state.orders)
    console.log(sessionUrl)
    if(sessionUrl){
        window.location.replace(sessionUrl)
    }
   var total=null;
    if(pricing){
        console.log(pricing.totalAmount)
        total= pricing.totalAmount;
    }
    if(user && address.length){
        return(
            <div className="max-w-screen-lg m-auto mt-10">
                <div >
                <AddressList address={address.slice(0,1)} />
                </div>
                <div>
                <CartTotal/>
                </div>
                <button onClick={()=>dispatch(addOrder({displayCart:displayCart,total:total}))} 
                    className="h-9 text-white bg-black px-3 py-2 flex items-center">Place Order</button>
            </div>
        )
    }

}
export default Checkout