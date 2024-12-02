import './cart.css'
import {removeFromCart,changeQuantity,setTotalCartValue} from '../../slices/cartSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import {useEffect,useState} from 'react'
const DisplayCart = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state)
    const cartItems = data.cart.data;
    const products = data.products.data;
    const [loading,setLoading] = useState(true)
    const [cartArr,setCartArr] = useState([])

    const getDataArr = () => {
        if(cartItems && products){
            const cart = cartItems.map((element,index) => {
                const found = products.find((innerElement,innerIndex) => element._id === innerElement._id)
                if(found){
                    return {...element,image:found.image,title:found.title,brand:found.brand,category:found.category,
                        total:Number(element.qty*element.salePrice)
                    }
                }
                return element;
            })
            if(cart){
                setLoading(false)
                setCartArr(cart)
                dispatch(setTotalCartValue(cart))
            }
        }
    }
    useEffect(()=>{
        if(cartItems && products){
            getDataArr()
     }
        return 
        
    },[cartItems,products])

    if(loading){
        return(
            <h1>Loading....Please Wait</h1>
        )
    }
    if(cartArr){
        return(
            <>
            <table className="w-full">
                <thead>
                    <tr className="text-center">
                        <td></td>
                        <td>Title</td>
                        <td>Quantity</td>
                        <td>Brand</td>
                        <td>Total</td>
                        <td>Remove</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {cartArr.map((element,index) => {
                        const {total,brand,category,image,qty,salePrice,title,_id} = element;
                        return <tr className="text-center mb-5">
                            <td className="w-[10%]"> <img src={`http://localhost:4000/images/${image}`} alt="Image" /></td>
                            <td>{title}</td>
                            <td><button className='w-5 border' disabled= {qty === 1 ? true : false}
                            onClick={()=>dispatch(changeQuantity({id:_id,type:'-',quantity:qty}))}>-</button>
                            <span className='border border-r-0 border-l-0'>{qty}</span>
                            <button className='w-5 border'
                            onClick={()=>dispatch(changeQuantity({id:_id,type:'+',quantity:qty}))}>+</button></td>
                            <td>{brand}</td>
                            <td>${total}</td>
                            <td><span className='flex justify-center cursor-pointer' onClick={()=>dispatch(removeFromCart(_id))}><MdDelete /></span></td>
                        </tr>
                    })}
    
                </tbody>
            </table>
            </>
        )
    }
    
}

export default DisplayCart;