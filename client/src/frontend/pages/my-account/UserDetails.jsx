import { useDispatch,useSelector } from "react-redux"
import AddressForm from './AddressForm'
const UserDetails = () => {
    const dispatch= useDispatch()
    const {user,error,loading} = useSelector((state) => state.user)
    console.log(user)
    if(user){
        return(
            <>
            <h1 className="text-2xl">Hi, <span className="font-bold text-2xl">{user.email}</span></h1>
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Personal Info And Addresses</h1>
                <div>
                 <button className="h-10 bg-black text-white py-3 px-6 items-center flex rounded">Add New Address</button>
                </div>
            </div>
            <AddressForm/>
            </>
    
            
        )
    }

}

export default UserDetails
