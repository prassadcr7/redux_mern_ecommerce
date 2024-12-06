import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
const OrderList = () => {
    const dispatch= useDispatch()
    const {data,error,loading} = useSelector((state) => state.orders)
    if(data){
        return(
            <div>
                <h1 className="font-semibold text-xl">Orders</h1>
                   <>
            <table className="w-full mt-5">
                <thead>
                    <tr className="text-center">
                        <td></td>
                        <td></td>
                        <td>Title</td>
                        <td>Quantity</td>
                        <td>Brand</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map((element,index) => {
                        return element.order.map((element1,index1) => {
                            const {total,brand,category,image,qty,salePrice,title,_id} = element1;
                            return <tr className="text-center mb-5">
                                <td className="w-[10%]"> <img src={`http://localhost:4000/images/${image}`} alt="Image" /></td>
                                <td>{element._id}</td>
                                <td>{title}</td>
                                <td>
                                <span className>{qty}</span>
                                </td>
                                <td>{brand}</td>
                                <td>${total}</td>
                            </tr>
                        })
                    })}

    
                </tbody>
            </table>
            </>
            </div>
        )
    }

}
export default OrderList