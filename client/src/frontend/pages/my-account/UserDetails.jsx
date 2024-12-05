import { useDispatch,useSelector } from "react-redux"
import AddressForm from './AddressForm'
import { useEffect, useState } from "react"
import {getUserLogout} from '../../../globalslices/useSlice'
import AddressList from './AddressList'
import OrderList from "./OrderList"
const UserDetails = () => {
    const [showAddressForm,setShowAddressForm] = useState(false)
    const dispatch= useDispatch()
    const {user,error,loading,address} = useSelector((state) => state.user)
    // console.log(address)

    if(user){
        return(
            <>
             {showAddressForm ? <div className="overlay" onClick={()=>setShowAddressForm(!setShowAddressForm)}></div> : ''}
            <div className="flex justify-between">
            <h1 className="text-2xl flex items-end">Hi, <span className="font-bold text-2xl">{user.email}</span></h1>
            <div className="flex justify-center mt-5 items-start">
                <button onClick={()=>dispatch(getUserLogout())} className="w-16 bg-black text-white h-9">Logout</button>
                </div>
            </div>
            <div className="flex justify-between mt-8 pb-1 border border-t-0 border-l-0 border-r-0">
                <h1 className="text-xl font-semibold flex items-end">Personal Info And Addresses</h1>
                <div>
                 <button className="h-10 bg-black text-white py-3 px-6 items-center flex rounded" onClick={() => setShowAddressForm(!showAddressForm)}>Add New Address</button>
                </div>
            </div>
            <div className="add-list mt-7">
                <AddressList address={address}/>
            </div>
            <div className="add-list mt-7">
                <OrderList/>
            </div>
            <AddressForm showAddressForm={showAddressForm} setShowAddressForm={setShowAddressForm}/>
            </>
    
            
        )
    }

}

export default UserDetails

