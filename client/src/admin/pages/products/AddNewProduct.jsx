import { useState,useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector,useDispatch } from "react-redux";
import {addNewProduct} from '../../slices/productsSlice.js'
import { ToastContainer, toast } from "react-toastify";
const AddNewProduct = ({isAddFormVisible,setAddProductToggle}) => {
    const data = useSelector((state)=>state.products)
    console.log(data)
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({title:'',description:'',category:'',brand:'',price:'',salePrice:'',productImage:''})
    const [imagePreview, setImagePreview] = useState('../../../public/imagep.jpg');
    console.log(formData)
    useEffect(()=>{
        if(!isAddFormVisible){
            setFormData({title:'',description:'',category:'',brand:'',price:'',salePrice:'',productImage:''})
            setImagePreview('../../../public/imagep.jpg')
        }
        return;
    },[isAddFormVisible])

    const onFormChange = (evenet) => {
        const key = evenet.target.name;
        if(key == 'productImage'){
            const image = event.target.files[0];
            setFormData({...formData,[key]:image})
            const reader = new FileReader();

            // Set up the reader to display the image preview
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview state
            };

            // Read the file as a data URL (base64 string)
            reader.readAsDataURL(image);
            return;
        }
        const value = event.target.value;
        setFormData({...formData,[key]:value})
    }

    const submitFormData = (event) => {
        event.preventDefault();
        const formDataNew = new FormData();
        formDataNew.append("title", formData.title);
        formDataNew.append("description", formData.description);
        formDataNew.append("category", formData.category);
        formDataNew.append("brand", formData.brand);
        formDataNew.append("price", Number(formData.price));
        formDataNew.append("salePrice", Number(formData.salePrice));
        formDataNew.append("image", formData.productImage); // File object from file input
        dispatch(addNewProduct(formDataNew))
        setAddProductToggle(!isAddFormVisible)
    }
    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const image = event.dataTransfer.files[0];
        if(image){ 
            setFormData({...formData,'productImage':image})
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); 
            };
            reader.readAsDataURL(image);
            return;
        }
    };
    
    if(data.loading){
        return <h1>Loading....Please Wait</h1>
    }
    return(
        <>
        <form onSubmit={submitFormData} className="addNewProduct">
            <div className="grid mb-3">
                <label htmlFor="productImage">Upload Image
                    <div className="h-24 border border-dashed items-center mt-1 flex justify-around" onDragOver={handleDragOver} onDrop={handleDrop}> 
                        <div className="mt-4">
                            <img src={imagePreview} alt="Image Preview" className="w-[60px] h-auto"  />
                        </div>
                        <p className="grid justify-center cursor-pointer"><span className="flex justify-center">
                                <IoCloudUploadOutline /></span>Drag & drop or click to upload</p>
                    </div>
                    <input type="file" name="productImage" id="productImage" style={{display:'none'}} onChange={onFormChange}/>
                </label>
  
            </div>
            <div className="grid mb-3">
            <label htmlFor="title" className='mb-1'>Title</label>
                <input type="text" name="title" id="title" className="border h-9 p-1" placeholder="Enter Product Title" onChange={onFormChange} 
                value={formData.title}/>
            </div>
            <div className="grid mb-3">
            <label htmlFor="description" className='mb-1'>Description</label>
                <textarea name="description" id="description" className="h-20 p-1 border" onChange={onFormChange} />
            </div>
            <div className="grid mb-3">
            <label htmlFor="category" className='mb-1'>Category</label>
                <select name="category" id="category" className="h-8 p-1 border" onChange={onFormChange}>
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
                <select name="brand" id="brand" className="h-8 p-1 border" onChange={onFormChange}>
                    <option value="">-- Select --</option>
                    <option value="nike">Nike</option>
                    <option value="adidas">Adidas</option>
                    <option value="puma">Puma</option>
                    <option value="levi's">Levi's</option>
                    <option value="zara">Zara</option>
                </select>
            </div>
            <div className="grid mb-3">
                <label htmlFor="" className='mb-1'>Price</label>
                <input type="text" name="price" id="price" className="border h-9 p-1" placeholder="Enter Product Price" onChange={onFormChange}/>
            </div>
            <div className="grid mb-3">
                <label htmlFor="" classname='mb-1'>Sale Price</label>
                <input type="text" name="salePrice" id="salePrice" className="border h-9 p-1" placeholder="Enter Sale Price" onChange={onFormChange}/>
            </div>
            <div className="flex justify-center mt-5">
                <button type="submit" className="h-9 bg-black text-white py-2 px-4 flex items-center">Add Product</button>
            </div>
        </form>
        </>
    )
}

export default AddNewProduct;