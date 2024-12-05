import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../slices/cartSlice";
import { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
const ProductsListing = ({productsArr}) => {
    const isLoggedIn = useSelector((state) => state.user.isAuthenticated)
    // console.log(useSelector((state) => state.cart))
    const [displayProducts,setDisplayProducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goToLogin = () => {
        navigate("/auth/login")
    }
    const goToCart = () => {
        navigate("/cart")
    }

    const cartData = useSelector((state) => state.cart.data);
    useEffect(()=> {
        if(cartData && productsArr){
            const newProducts = productsArr.map((element,index) => {
                const found = cartData.find((prodElement,prodIndex) => prodElement._id === element._id)
                if(found){
                    return {...element,isCart:1}
                }
                return element;
            })
            if(newProducts){
                setDisplayProducts(newProducts);
            }

        }

    },[cartData,productsArr])

    const [displayData,setDisplayData] = useState([])
    const [currentPage,setCurrentIndex] = useState(0)
    const [totalPages,setTotalPages] = useState('')
    console.log(currentPage)
        useEffect(()=>{
            if(displayProducts){
                const itemsPP = 3;
                const totalPages = Math.ceil(displayProducts.length/itemsPP)
                setTotalPages(totalPages)
                const firstIndex = (currentPage * itemsPP)- currentPage;
                const listArr = displayProducts.slice(firstIndex,firstIndex+itemsPP)
                console.log(firstIndex,'first',firstIndex+itemsPP,'lastIndex')
                setDisplayData(listArr)
            }
        },[currentPage,displayProducts])


if(displayData && totalPages){
    return(
        <>
        <ul className='products-list grid grid-cols-3 gap-4  mt-5'>
        {displayData.map((element,index) => {
            const {_id,brand,category,description,image,title,salePrice,price,isCart} = element;
            return <li key={_id} className="p-4 border rounded">
                    <div className='grid justify-center gap-1' >
                        <img src={`http://localhost:4000/images/${image}`} alt="title"/>
                        <h2 className='text-lg font-semibold'>{title}</h2>
                        <div className="flex justify-between"><p>{category}</p>
                        <p>{brand}</p></div>
                        
                        {salePrice!== price ? <p className="flex gap-1 items-center">${salePrice}<span className='line-through text-xs'>${price}</span></p>
                         : <p>${price}</p>}     
                        <div className='flex justify-center'>
                           {isCart ? <button className='h-9 bg-black text-white py-2 px-4 flex items-center rounded' 
                            onClick={goToCart}>Go To Cart</button>
                                : <button className='h-9 bg-black text-white py-2 px-4 flex items-center rounded' 
                            onClick={ isLoggedIn ? ()=>dispatch(addItemToCart({_id:_id,salePrice:salePrice,qty:1})) : goToLogin}>
                                Add To Cart</button>} 
                        </div>
                    </div>
                </li>
            })}
    </ul>
    <div className="flex justify-center my-6">            
         <button  onClick={()=>setCurrentIndex((prev)=>prev-1)} 
        className="h-7 bg-black text-white py-1 flex items-center px-2 cursor-pointer mx-1" disabled= {currentPage<=1 ?true : false}>prev</button> 
        {[...Array(totalPages)].map((element,index) => {
            return <span onClick={()=>setCurrentIndex(index+1)} className="mx-1 border px-1" style={{color:currentPage==index+1 ?'blue' : ''}}>{index+1}</span>
        })}
       <button onClick={()=>setCurrentIndex((prev)=>prev+1)} 
        className="h-7 bg-black text-white py-1 px-2 flex items-center cursor-pointer mx-1" disabled= {totalPages===currentPage ?true : false}>next</button> 
        </div>

    </>
    )
}
  
}
export default ProductsListing