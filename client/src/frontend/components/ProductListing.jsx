import { useSelector,useDispatch } from "react-redux";
import { Navigate,useNavigate } from "react-router-dom";
const ProductsListing = ({productsArr}) => {
    const isLoggedIn = useSelector((state) => state.user.isAuthenticated)
    console.log(isLoggedIn)
    const navigate = useNavigate()
    const test = () => {
        navigate("/auth/login")
    }
    return(
        <ul className='products-list grid grid-cols-3 gap-4  mt-5'>
        {productsArr.map((element,index) => {
            const {_id,brand,category,description,image,title,salePrice,price} = element;
            return <li key={_id} className="p-4 border rounded">
                    <div className='grid justify-center gap-1' >
                        <img src={`http://localhost:4000/images/${image}`} alt="title"/>
                        <h2 className='text-lg font-semibold'>{title}</h2>
                        <div className="flex justify-between"><p>{category}</p>
                        <p>{brand}</p></div>
                        
                        {salePrice!== price ? <p className="flex gap-1 items-center">${salePrice}<span className='line-through text-xs'>${price}</span></p>
                         : <p>${price}</p>}     
                        <div className='flex justify-center'>
                            <button className='h-9 bg-black text-white py-2 px-4 flex items-center rounded' 
                            onClick={ isLoggedIn ? ()=>dispatch(deleteProduct({id:_id})) : test}>
                                Add To Cart</button>
                        </div>
                    </div>
                </li>
            })}
    </ul>
    )
}
export default ProductsListing