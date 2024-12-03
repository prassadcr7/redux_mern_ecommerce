import {NavLink} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {getUserLogin,getUserLogout} from '../../../globalslices/useSlice'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [formData,setFormData] = useState({email:'',password:''})
    const {error,user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const changeInput = (event) => {
        const key = event.target.name;
        const val = event.target.value;
        if(key && val){
            setFormData({...formData,[key]:val})
        }
    }
    const submitForm = async (event) => {
        event.preventDefault();
        dispatch(getUserLogin(formData));
        
    }
    useEffect(()=>{
        if(error){
            toast.error(error)
        }
        if(user){
            navigate('/home')
        }

        return;
    },[error,user])

    return(
        <div className="flex-1 flex justify-center">
            <form className="border p-5 border-t-[10px] border-t-blue-400" onSubmit={submitForm}>
                <h1 className="mt-[-10px] font-bold text-2xl">Log In</h1>
                <div className="login-form w-96">
                    <div className="grid mt-3">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" placeholder="Enter Your Email" onChange={()=>changeInput(event)} className="h-9 border p-1 rounded"/>
                    </div>
                    <div className="grid mt-3">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" placeholder="Enter Your Password" onChange={()=>changeInput(event)} className="h-9 border p-1 rounded"/>
                    </div>
                    <p className="mt-2 font-semibold">Forgot Password?</p>
                    <div className="flex justify-center">
                        <button type="submit" name="login" className="h-12 mt-4 border w-48">Log In</button>
                    </div>
                    <p className="flex justify-center mt-4 font-semibold">Not a Member? <NavLink to="/auth/signup"><span className="ml-1"> Sign Up! </span></NavLink></p>
                </div>
            </form>
        </div>
    )
}
export default Login