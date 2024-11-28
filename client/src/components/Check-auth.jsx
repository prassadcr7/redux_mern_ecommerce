import { useLocation,useNavigate,Navigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
const CheckAuth = ({ children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuthenticated,user} = useSelector((state) => state.user)
    if(isAuthenticated){
        if(isAuthenticated && (location.pathname.includes('auth'))){
            if(user.type == 'admin'){
                return <Navigate to="/admin"/>;
            }else{
                return <Navigate to="/home"/>;
            }
            
        }

        if(isAuthenticated && user.type === 'admin' && location.pathname.includes("home")  ){
            return <Navigate to="/admin"/>; 
        }
        if(isAuthenticated && user.type !== 'admin' && location.pathname.includes('admin')  ){
            return <Navigate to="/home"/>; 
        }
    }else{
        if(!isAuthenticated && !(location.pathname.includes('auth'))){
            return <Navigate to="/auth"/>;
        }
    }


return <>{children}</>;
}
export default CheckAuth;