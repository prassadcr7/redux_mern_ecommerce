import { useSelector,useDispatch } from "react-redux";
const CartTotal = () => {
    const data = useSelector((state) => state.cart)
    var priceBreakup = null;
    if(data.pricing){
        priceBreakup = data.pricing;
    }
    console.log(priceBreakup)
    if(priceBreakup){
        return(
            <>
            <div className="p-5 grid gap-3">
                <p className="flex justify-between text-lg font-semibold"><span className=" ">Total</span><span>{priceBreakup.total}</span></p>
                <p className="flex justify-between text-lg font-semibold"><span>Tax</span><span>{priceBreakup.tax}</span></p>
                <p className="flex justify-between text-xl font-bold"><span className="">Grand Total</span><span></span>{priceBreakup.totalAmount}</p>
            </div>
            </>
        )
    }

}
export default CartTotal