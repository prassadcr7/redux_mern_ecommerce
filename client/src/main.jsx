import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CheckAuth from './components/Check-auth.jsx'
import globalStore from './globalStore.js'
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
    <Provider store={globalStore}>
    <App /></Provider>
)
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
