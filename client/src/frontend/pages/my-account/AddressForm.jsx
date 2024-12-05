import { useState } from "react"
import { useDispatch } from "react-redux"
import {addUserAddress,getUserAddress} from '../../../globalslices/useSlice'
const AddressForm = ({showAddressForm,setShowAddressForm}) => {
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({'firstName':'',lastName:'',street:'',city:'',state:'',country:'',zip:'',email:''})
    // console.log(formData)
    const onFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name,value)
        setFormData({...formData,[name]:value})
    }
    const submitForm = (event) => {
        event.preventDefault();
        console.log(formData)
        dispatch(addUserAddress(formData));
    }
  if(showAddressForm){
    return(
        <div className="flex justify-center z-10">        
            <form onSubmit={submitForm} className="w-1/2 px-5 py-4 absolute z-10" 
            style={{ boxShadow: '0px 0px 2px #d7cdcd',top:'50%',left:'50%',transform:'translate(-50%,-50%)',backgroundColor:'#fbf6f6'}}>
            <h1 className="font-bold text-xl mb-4  " >Address Form</h1>
            <div className="grid mb-3  "><label htmlFor="firstName" className="mb-1">First Name</label>
                <input type="text" onChange={onFormChange}  name="firstName" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="lastName" className="mb-1">Last Name</label>
                <input type="text" onChange={onFormChange} value={formData.lastName}  name="lastName" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="street" className="mb-1">Street</label>
                <input type="text" onChange={onFormChange} value={formData.street}  name="street" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="city" className="mb-1">City</label>
                <input type="text" onChange={onFormChange} value={formData.city}  name="city" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="state" className="mb-1">state</label>
                <input type="text" onChange={onFormChange} value={formData.state}  name="state" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="country" className="mb-1">Country</label>
                <input type="text" onChange={onFormChange} value={formData.country}  name="country" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="zip" className="mb-1">Zip</label>
                <input type="text" onChange={onFormChange} value={formData.zip}  name="zip" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="email" className="mb-1">Email</label>
                <input type="text" onChange={onFormChange} value={formData.email}  name="email" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3 flex justify-center">
                <button type="submit" id="submit" className="h-9 px-2 py-4 text-white bg-black flex items-center w-36 justify-center">Add Address</button>
            </div>
        </form>
         </div>

    )
  }
 
}
export default AddressForm