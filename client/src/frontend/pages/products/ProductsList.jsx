import { useEffect, useState } from "react";
import ProductsListing from "../../components/ProductListing";
const ProductsList = ({productsArr,sortProducts,data,setProductsArr}) => {
    const [searchValue,setSearchValue] = useState('')
    const handleSearch = (event) => {
        setSearchValue(event.target.value)
    }
    
    useEffect(()=>{
        if(searchValue){
            const searchResult = productsArr.filter((element,index) => (element.title).toLowerCase().includes(searchValue))
            setProductsArr(searchResult)
        }else{
            setProductsArr(data.data)
        }
    },[searchValue])
    return(
        <>
        <div className="w-4/5">
            <div className="flex justify-between">
            <h1 className="font-semibold text-xl text-left">Products</h1>
            <div>
                <input type="text" className="border outline-none p-1 w-[240px]" placeholder="Enter Item You want to search"
                onChange={handleSearch}/>
            </div>
            <select name="psort" className="border" onChange={()=>sortProducts(event)}>
                <option value="">-- Select --</option>
                <option value="price">Price</option>
            </select>
            </div>
            <ProductsListing productsArr={productsArr}/>
        </div>
        </>
    )
}
    
export default ProductsList;