import ProductsListing from "../../components/ProductListing";
const ProductsList = ({productsArr,sortProducts}) => {
    return(
        <>
        <div className="w-4/5">
            <div className="flex justify-between">
            <h1 className="font-semibold text-xl text-left">Products</h1>
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