const {loginUser,registerUser,logoutUser} = require('../controllers/userController.js')
const express = require('express');
const authMiddleware = require('../middleware/auth.js')
const userRouter = express.Router();
console.log(88)
userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser);
userRouter.post('/logout',logoutUser);
userRouter.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({success:true,message:"User Authenticated",user})
});
module.exports = userRouter