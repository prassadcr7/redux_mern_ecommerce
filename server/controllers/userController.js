const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const createToken = (id,type,email) => {
    return jwt.sign({id,type,email},process.env.JWT_SECRET,{expiresIn : '20m'});
}
const registerUser = async(req,res) => {
    console.log(req.headers)
    const {username,email,password} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:'User Already Exists'})
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const newUser = new userModel({
            username:username,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        console.log(user)
        return res.json({success:true})
    }catch(error){
        return res.json({success:false,message:'error'})
    }
   
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    console.log(req.headers)
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist...Please Create Account"})
        }
        
        const match = await bcrypt.compare(password,user.password)
        if(match){
            const token = createToken({id:user._id,type:user.type,email:user.email})
            return res.cookie('token', token, { httpOnly: true, secure: false })
            .json({ success: true, user: { 
            email: user.email,
            type: user.type
            } });
        }else{
            return res.json({success:false,message:'invalid password'})
        }
        
    }catch(error){
        return res.json({success:false,message:'error'})
    }
}

const logoutUser = async (req,res) => {
    console.log(req.cookies); 
    try{
        console.log(7)
        return res.clearCookie('token', { httpOnly: true, secure: false, path: '/' })
   .json({ success: true, message: "Logged Out Successfully" });
    }catch(error){
        return res.json({success:false,message:'error'})
    }
}


module.exports = { loginUser,registerUser,logoutUser }