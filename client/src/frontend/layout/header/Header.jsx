import { NavLink } from "react-router-dom"
import { SiHomeassistant } from "react-icons/si";
import { LuShoppingCart } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import './header.css'
const Header = () => {
    const user = useSelector((state) => state.user)
    const cart = useSelector((state) => state.cart)
    // console.log(cart)
    let cartItems = null;
    if(cart){
        cartItems = cart.data.length;
    }
    return(
        <header className="max-w-screen-lg m-auto">
            <div className="flex items-center h-14 bg-black text-white items-center px-3">
                <div className="flex gap-2 items-center text-2xl">
                    <SiHomeassistant />
                    <h1>Ecommerce</h1>
                </div>
                <nav className="flex-grow">
                    <ul className="flex justify-center gap-6 items-center">
                    <li><NavLink to="home">Home</NavLink></li>
                    <li><NavLink to="products">Products</NavLink></li>
                    <li><NavLink to="contact-us">Contact Us</NavLink></li>
                    </ul>
                </nav>
                <div className="flex gap-5 items-center text-xl">
                    <p><NavLink to="/cart"><LuShoppingCart /></NavLink></p>
                    <div className="cart-value">{cartItems}</div>
                    <p><NavLink to= {user.isAuthenticated ? "/my-account" : "/auth/login"}><FaUser /></NavLink></p>
                </div>
            </div>

        </header>
    )
}

export default Header