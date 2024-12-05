import { useDispatch,useSelector } from "react-redux";
import { useSearchParams ,useNavigate} from "react-router-dom"
import {verifyPayment} from '../../slices/orderSlice'
import { useEffect } from "react";
import {getCartItems} from '../../slices/cartSlice'
const Verify = () => {
    const [params] = useSearchParams();
    const success = params.get('success')
    const orderId = params.get('orderId')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading,paymentSuccess,Paymenterror} = useSelector((state) => state.orders)
    useEffect(()=>{
        if(success && orderId){
            dispatch(verifyPayment({success,orderId}))
        }
    },[params])
    useEffect(()=>{
        dispatch(getCartItems())
    },[paymentSuccess])
    if(loading){
        return(
            <h1>Verifying Payment....Please wait</h1>
        )
    }
    if(paymentSuccess){ 
        navigate("/")
    }
    if(Paymenterror){
        navigate("/cart")
    }

}
export default Verify