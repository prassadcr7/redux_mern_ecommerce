const AddressList = ({address}) => {

    return(
        <>
        <ul className="grid gap-5 grid-cols-2">
            {address.map((element,index) => {
                const {city,zip,street,state,lastName,firstName,email,country} = element;
                return <li className="border p-3 mb-3 flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold">{firstName} {lastName}</h1>
                        <p>{street} , {city} , {state} , {country}</p>
                        <p>{zip}</p>
                        <p>{email}</p>
                    </div>
                    <div className=""><button className="h-7 bg-black text-white px-8 py-4 flex items-center">Edit</button></div>
                    <div><button className="h-7 bg-black text-white px-8 py-4 flex items-center">Delete</button></div>
                </li>
            })}
           
        </ul>
        </>
    )
} 

export default AddressList