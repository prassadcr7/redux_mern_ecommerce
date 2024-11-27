import {NavLink} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {getUserSignup} from '../../../globalslices/useSlice'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const [formData,setFormData] = useState({username:'',email:'',password:''})
    const {error,loading,userCreated} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(error,loading,userCreated)
    const changeInput = (evenet) => {
        const key = event.target.name;
        const val = event.target.value;
        if(key && val){
            setFormData({...formData,[key]:val})
        }
    }
    const submitForm = async (event) => {
        event.preventDefault();
        dispatch(getUserSignup(formData))
    }
    useEffect(()=>{
        if(error){
            toast.error(error)
        }
        if(userCreated){
            toast.success('Registration Successful...Please Login')
            navigate('/auth/login')
        }

        return;
    },[error,userCreated])

    return(
        <div className="flex-1 flex justify-center">
        <form className="border p-5 border-t-[10px] border-t-blue-400" onSubmit={submitForm}>
            <h1 className="mt-[-10px] font-bold text-2xl">Sign Up</h1>
            <div className="login-form w-96">
            <div className="grid mt-3">
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" placeholder="Enter Your Username" onChange={()=>changeInput(event)}className="h-9 border p-1 rounded"/>
                </div>
                <div className="grid mt-3">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" placeholder="Enter Your Email" onChange={()=>changeInput(event)} className="h-9 border p-1 rounded"/>
                </div>
                <div className="grid mt-3">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" placeholder="Enter Your Password" onChange={()=>changeInput(event)} className="h-9 border p-1 rounded"/>
                </div>
                <p className="mt-2 font-semibold">Forgot Password?</p>
                {loading ? <p className="mt-2 font-semibold">Signing Up....</p> : ''}
                <div className="flex justify-center">
                    <button type="submit" name="login" className="h-12 mt-4 border w-48">Sign Up</button>
                </div>
                <p className="flex justify-center mt-4 font-semibold">Already a Member? <NavLink to="/auth/login"><span className="ml-1"> Log In! </span></NavLink></p>
            </div>
        </form>
    </div>
    )
}
export default Signup