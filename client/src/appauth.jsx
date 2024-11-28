import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import globalStore from './globalStore.js'
import CheckAuth from './components/Check-auth.jsx'
import AuthLayout from './auth/layout/AuthLayout.jsx'
import Login from './auth/pages/login/Login.jsx'
import Signup from './auth/pages/signup/Signup.jsx'
import Layout from './frontend/layout/Layout.jsx'
import Home from './frontend//pages/home/HomeNew.jsx'
import Products from './frontend//pages/products/products.jsx'
import Men from './frontend//pages/men/Men.jsx'
import Women from './frontend//pages/women/Women.jsx'
import Kids from './frontend//pages/kids/Kids.jsx'
import Accessories from './frontend//pages/accessories/Accessories.jsx'
import Cart from './frontend//pages/cart/Cart.jsx'
import adminStore from './admin/adminStore.js'
import AdminLayout from './admin/layout/Layout.jsx'
import AdminOrders from './admin/pages/orders/Orders.jsx'
import {checkUserAuth} from './globalslices/useSlice.js'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkUserAuth())
    return;
  },[dispatch])
 
  const router = createBrowserRouter([
    {
      path:"/auth",
      element:(
        <CheckAuth><AuthLayout /></CheckAuth>
       ),
      children:[
        {
          path:"login",
          element:<Login />,
        },
        {
          path:"signup",
          element:<Signup />,
        },
      ]
    },
    {
      path:"/",
      element:(
        <CheckAuth><Layout /></CheckAuth>
      ),
      children:[
          {
              path:"home",
              element:<Home />,
          },
          {
              path:"products",
              element:<Products />,
          },
          {
              path:"men",
              element:<Men />,
          },
          {
              path:"women",
              element:<Women />,
          }, 
          {
              path:"kids",
              element:<Kids />,
          }, 
          {
              path:"accessories",
              element:<Accessories />,
          },      
          {
              path:"cart",
              element:<Cart />,
          }
      ]
    },
    {
      path:"/admin",
      element:(
        
        <CheckAuth><Provider store={adminStore}><AdminLayout /></Provider></CheckAuth>
        
      ),
      children:[
        {
          path:"orders",
          element:<AdminOrders />,
        },
      ]
    },

  ])
  return(
  
      <RouterProvider router={router} />
  
  )
}

export default App
