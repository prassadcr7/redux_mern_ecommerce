import { IoIosLogOut } from "react-icons/io";
import {getUserLogout} from '../../../globalslices/useSlice'
import { useDispatch } from "react-redux";
const Header = () => {
    const dispatch = useDispatch();
    return (
        <div className="admin-container h-16 flex items-center justify-end border">
        <p className="logout flex justify-center items-center px-4 py-2 h-9 w-fit bg-black text-white float-right mx-3 cursor-pointer gap-1" 
        onClick={()=>dispatch(getUserLogout())}>
            <span><IoIosLogOut/></span>Logout</p>
        </div>
        
    )
}
export default Header