import {useDispatch,useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import {getProducts,editProduct} from '../../slices/productsSlice'
import {deleteProduct} from '../../slices/productsSlice.js'
import { IoCloudUploadOutline } from "react-icons/io5"
const ProductsList = () => {
    const [showEditProduct,setShowEditProduct] = useState('');
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)
      if(products.loading){
        return(
            <h1>Loading....Please Wait!!</h1>
        )
    }
    if(products.data){
        return(
            <> 
            {showEditProduct ? <div className='overlay' onClick={()=>setShowEditProduct('')}></div> : ""}        
            <ul className='grid grid-cols-3 py-8 gap-4 px-2'>
                {products.data.map((element,index) => {
                    return <Product element={element} key={element._id} dispatch={dispatch} setShowEditProduct={setShowEditProduct}/>
                })}
            </ul>
            {showEditProduct ? <EditProduct element={showEditProduct} dispatch={dispatch} setShowEditProduct={setShowEditProduct}/> : ''}
            </>

        )
    }

}
export default ProductsList

const Product = ({element,dispatch,setShowEditProduct}) => {
    const {_id,title,salePrice,price,image,description,category} = element;
    return(
        <>
        <li className='p-5 bg-sky-100 rounded-lg '>
            <div className='grid justify-center gap-1' >
                <img src={`http://localhost:4000/images/${image}`} alt="title"/>
                <h2 className='text-lg font-semibold'>{title}</h2>
           {salePrice!== price ? <div className='flex justify-between'>
                <p className='line-through'>${price}</p>
                <p>${salePrice}</p>
                </div> : <p>${price}</p>}     
                
                <div className='flex justify-between'>
                    <button className='h-7 bg-black text-white py-2 px-4 flex items-center rounded' onClick={()=>setShowEditProduct(element)}>Edit</button>
                    <button className='h-7 bg-black text-white py-2 px-4 flex items-center rounded' onClick={()=>dispatch(deleteProduct({id:_id}))}>Delete</button>
                </div>
            </div>
        </li>
        </>
    )
}

const EditProduct = ({element,dispatch,setShowEditProduct}) => {
    const {_id,title,salePrice,price,image,description,category,brand} = element;
    if(image){
        var imgSplit = image.split('_')[1]
    }
    console.log(imgSplit)
    const [editFormData,setEditFormData] = useState({_id:_id,title:title,description:description,category:category,brand:brand,price:price,
                                            salePrice:salePrice,productImg:imgSplit})
    const [imagePreview,setImagePreview] = useState(`http://localhost:4000/images/${image}`)
    const onFormChange = (event) =>{
        const key = event.target.name;
        if(key == 'productImg'){
            const newImage = event.target.files[0];
            setEditFormData({...editFormData,[key]:newImage})
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); 
            };
            reader.readAsDataURL(newImage);
            return;
        }
        const value = event.target.value;
        setEditFormData({...editFormData,[key]:value})
    }

    const submitEditForm = () => {
        event.preventDefault();
        const formDataNew = new FormData();
        formDataNew.append("_id", _id);
        formDataNew.append("title", editFormData.title);
        formDataNew.append("description", editFormData.description);
        formDataNew.append("category", editFormData.category);
        formDataNew.append("brand", editFormData.brand);
        formDataNew.append("price", 10);
        formDataNew.append("salePrice", Number(editFormData.salePrice));
        formDataNew.append("image", editFormData.productImg); // File object from file input
        for (let pair of formDataNew.entries()) {
            console.log(pair[0], pair[1]);
        }
        if(editFormData.productImg){
            console.log(_id)
        dispatch(editProduct({product:formDataNew,id:_id}))
        setShowEditProduct('')
        }else{
        alert('Upload Image')
        }

    }
    return(
        <>
        <form onSubmit={submitEditForm} className='edit-form h-[740px] w-[400px] p-6 absolute bg-white top-1/2 left-1/2 transform translate-x-[-50%] 
        translate-y-[-50%] border-t-[10px] border-t-[#00d3ff] shadow z-10' >
            
            <div className="grid mb-3">
            <label htmlFor="productImg">Upload Image
                <div className="h-24 border border-dashed items-center mt-1 flex justify-around"> 
                    <div className="mt-4">
                        <img src={imagePreview} alt="Image Preview" className="w-[60px] h-auto" />
                    </div>
                    <p className="grid justify-center cursor-pointer"><span className="flex justify-center">
                            <IoCloudUploadOutline /></span>Drag & drop or click to upload</p>
                </div>
                <input type="file" name="productImg" id="productImg" style={{display:'none'}} onChange={onFormChange}/>
            </label>

            </div>
            <div className="grid mb-3">
            <label htmlFor="title" className='mb-1'>Title</label>
                <input type="text" name="title" id="title" className="border h-9 p-1" placeholder="Enter Product Title" onChange={onFormChange} 
                value={editFormData.title}/>
            </div>
            <div className="grid mb-3">
            <label htmlFor="description" className='mb-1'>Description</label>
                <textarea name="description" id="description" className="h-20 p-1 border" onChange={onFormChange} value={editFormData.description}/>
            </div>
            <div className="grid mb-3">
            <label htmlFor="category" className='mb-1'>Category</label>
                <select name="category" id="category" className="h-8 p-1 border" onChange={onFormChange} value={editFormData.category}>
                <option value="">-- Select --</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwear">Footwear</option>
                </select>
            </div>
            <div className="grid mb-3">
            <label htmlFor="brand" className='mb-1'>Brand</label>
                <select name="brand" id="brand" className="h-8 p-1 border" onChange={onFormChange} value={editFormData.brand}>
                <option value="nike">Nike</option>
                    <option value="adidas">Adidas</option>
                    <option value="puma">Puma</option>
                    <option value="levi's">Levi's</option>
                    <option value="zara">Zara</option>
                </select>
            </div>
            <div className="grid mb-3">
                <label htmlFor="" className='mb-1'>Price</label>
                <input type="text" name="price" id="price" className="border h-9 p-1" placeholder="Enter Product Price" onChange={onFormChange} value={editFormData.price}/>
            </div>
            <div className="grid mb-3">
                <label htmlFor="" classname='mb-1'>Sale Price</label>
                <input type="text" name="salePrice" id="salePrice" className="border h-9 p-1" placeholder="Enter Sale Price" onChange={onFormChange}
                 value={editFormData.salePrice}/>
            </div>
            <div className="flex justify-center mt-5">
                <button type="submit" className="h-9 bg-black text-white py-2 px-4 flex items-center">Apply Changes</button>
            </div>
        </form>
        </>
    )
}


