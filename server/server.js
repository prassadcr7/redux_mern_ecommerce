const { connectDB } = require('./config/db.js');
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT || 4000;
const userRouter = require('./routes/userRoute.js')
const adminRouter = require('./routes/adminRoute.js')

app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['GET','POST','DELETE','PUT'],
    allowHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials : true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/admin/products",adminRouter)
app.use("/images",express.static('uploads'))
connectDB()

app.listen(port,()=>{
    console.log('server is running on ' +port)
})