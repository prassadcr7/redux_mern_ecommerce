import {getUserLogout} from '../../../globalslices/useSlice'
import { useDispatch } from 'react-redux'
const Home = () => {
    const dispatch = useDispatch()
    console.log(getUserLogout);
    dispatch(getUserLogout())
    return(
        <h1 onClick={()=>dispatch(getUserLogout())}>Home</h1>
    )
}

export default Home