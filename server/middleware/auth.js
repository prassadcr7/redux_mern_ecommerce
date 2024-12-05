const  jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next) => {
    
    const token = req.cookies.token;
    console.log(token)
    if(!token){
        return res.json({success:false,message:"Not Authorized login again"})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(token_decode)
        req.user = token_decode.id;
        next();
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

module.exports =  authMiddleware;