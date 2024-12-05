import './cart.css'
import {removeFromCart,changeQuantity,setTotalCartValue,setDisplayCart} from '../../slices/cartSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import {useEffect,useState} from 'react'
const DisplayCart = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state)
    const cartArr = data.cart.displayCart;
    // console.log(cartArr)
    useEffect(()=>{
        if(cartArr){
           dispatch(setTotalCartValue(cartArr))
       }
       return   
    },[cartArr])
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


