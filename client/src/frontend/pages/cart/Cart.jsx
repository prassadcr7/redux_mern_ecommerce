import DisplayCart from "./DisplayCart"
import CartTotal from './CartTotal';
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const navigate = useNavigate()
    return(
        <div className="max-w-screen-lg m-auto">
            <div className="mt-10">
                <DisplayCart />
            </div>
            <div className="mt-16 float-right">
                <CartTotal/>
                <div className="flex justify-center"><button onClick={()=>navigate('/checkout')} className="flex items-center h-10 bg-black text-white mt-5 px-8 py-4">
                    PROCEED TO CHECKOUT</button></div>    
            </div>
        </div>
    )
}

export default Cart