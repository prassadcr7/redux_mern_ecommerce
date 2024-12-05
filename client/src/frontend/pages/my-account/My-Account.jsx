import { useDispatch,useSelector } from "react-redux"

import UserDetails from "./UserDetails.jsx"
const MyAccount = () => {
    const dispatch= useDispatch()
    return(
        <div className="max-w-screen-lg m-auto">
            <div className="mt-5">            
                <UserDetails/>
            <div>
            </div>
            </div>

        </div>
    )
}

export default MyAccount

