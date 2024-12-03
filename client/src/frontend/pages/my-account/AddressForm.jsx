import { useState } from "react"

const AddressForm = () => {
    const [formData,setFormData] = useState({'firstName':'',lastName:'',street:'',city:'',state:'',country:'',zip:'',email:''})
    const onFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData,})
    }
    // border-8 border-r-0 border-l-0 border-r-0 border-b-0 border-cyan-400
    return(
        <div className="flex justify-center">        
            <form onSubmit className="w-1/2 px-5 py-4" style={{ boxShadow: '0px 0px 2px #d7cdcd'}}>
            <h1 className="font-bold text-xl mb-4  " >Address Form</h1>
            <div className="grid mb-3  "><label htmlFor="firstName" className="mb-1">First Name</label>
                <input type="text" onChange={onFormChange} value={formData.firstName} id="firstName" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="lastName" className="mb-1">Last Name</label>
                <input type="text" onChange={onFormChange} value={formData.lastName} id="lastName" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="street" className="mb-1">Street</label>
                <input type="text" onChange={onFormChange} value={formData.street} id="street" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="city" className="mb-1">City</label>
                <input type="text" onChange={onFormChange} value={formData.city} id="city" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="state" className="mb-1">state</label>
                <input type="text" onChange={onFormChange} value={formData.state} id="firstName" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="country" className="mb-1">Country</label>
                <input type="text" onChange={onFormChange} value={formData.country} id="firstName" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="zip" className="mb-1">Zip</label>
                <input type="text" onChange={onFormChange} value={formData.zip} id="zip" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3  "><label htmlFor="email" className="mb-1">Email</label>
                <input type="text" onChange={onFormChange} value={formData.email} id="email" className="border h-8 p-1  "/>
            </div>
            <div className="grid mb-3 flex justify-center">
                <button type="submit" id="submit" className="h-9 px-2 py-4 text-white bg-black flex items-center w-36 justify-center">Add Address</button>
            </div>
        </form>
         </div>

    )
}
export default AddressForm