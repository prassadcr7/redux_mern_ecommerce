import {Outlet} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthLayout = () => {
    return(
        <>
        <div className='auth-container max-w-screen-lg m-auto'>
            <div className='auth-wrapper flex items-center justify-center h-screen'> 
            <ToastContainer />
                <div className='auth-section flex-1'>
                <img src='/public/ecommerce.png' width={'100%'}/>
                </div>
                <Outlet />
            </div>
        </div>

        </>
    )
}
export default AuthLayout