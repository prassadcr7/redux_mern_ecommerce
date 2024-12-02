import DisplayCart from "./DisplayCart"
import CartTotal from './CartTotal';
const Cart = () => {
    return(
        <div className="max-w-screen-lg m-auto">
            <div className="mt-10">
                <DisplayCart />
            </div>
            <div className="mt-16 float-right border w-[350px]">
                <CartTotal/>
            </div>
        </div>
    )
}

export default Cart