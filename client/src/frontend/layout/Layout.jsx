import {Outlet} from 'react-router-dom'
import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {getUserLogout} from '../../globalslices/useSlice.js'
const Layout = () => {
    // const dispatch = useDispatch()
    // dispatch(getUserLogout())
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
        
        
    )
}

export default Layout