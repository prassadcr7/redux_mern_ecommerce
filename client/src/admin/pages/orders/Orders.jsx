import { useDispatch,useSelector } from "react-redux"
const Orders = () => {
    const dispatch= useDispatch()
    const {data,error,loading} = useSelector((state) => state.orders)
    if(data){
    return(
        <div className="w-[85%] ml-[20%] pt-8  border border-t-0 border-r-0 pl-2">
               
       
            <div>
                <h1 className="font-semibold text-xl">Orders</h1>
                   <>
            <table className="w-full mt-5">
                <thead>
                    <tr className="text-center">
                        <td></td>
                        <td>Title</td>
                        <td>Quantity</td>
                        <td>Brand</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map((element,index) => {
                        console.log(element._id)
                        return element.order.map((element1,index1) => {
                            const {total,brand,category,image,qty,salePrice,title,_id} = element1;
                            return <tr className="text-center mb-5">
                                <td className="w-[10%]"> <img src={`http://localhost:4000/images/${image}`} alt="Image" /></td>
                                <td>{title}</td>
                                <td>
                                <span className>{qty}</span>
                                </td>
                                <td>{brand}</td>
                                <td>${total}</td>
                                <td><button className="bg-black text-white h-9 w-20">Shipped</button></td>
                                <td><button className="bg-black text-white h-9 w-20">Delivered</button></td>
                            </tr>
                        })
                    })}

    
                </tbody>
            </table>
            </>
            </div>
        
               

        </div>
    )
}
}
export default Orders



   
    

