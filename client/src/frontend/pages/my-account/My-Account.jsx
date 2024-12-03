import { useDispatch,useSelector } from "react-redux"
import {getUserLogout} from '../../../globalslices/useSlice.js'
import UserDetails from "./UserDetails.jsx"
const MyAccount = () => {
    const dispatch= useDispatch()
    return(
        <div className="max-w-screen-lg m-auto">
            <UserDetails/>
            <div>
                <div className="flex justify-center mt-5">
                <button onClick={()=>dispatch(getUserLogout())} className="w-16 bg-black text-white h-9">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default MyAccount

