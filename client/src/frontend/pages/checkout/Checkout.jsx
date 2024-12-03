import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react"
import AddressList from "../my-account/AddressList"
import CartTotal from '../cart/CartTotal'
const Checkout = () => {
    const dispatch= useDispatch()
    const {user,error,loading,address} = useSelector((state) => state.user)
    console.log(user,address[0])
    if(user && address.length){
        return(
            <div className="max-w-screen-lg m-auto mt-10">
                <div >
                <AddressList address={address.slice(0,1)} />
                </div>
                <div>
                <CartTotal/>
                </div>
            </div>
        )
    }

}
export default Checkout