const addressModel = require('../models/addressModel');

const addAddress = async(req,res) => {
   
    const userAddress = req.body;
    const user = req.user;
    console.log(user)
    try{
        console.log('inside add address')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        console.log(userAddress)
        const newAddress = new addressModel({
            userId:user.id,address:userAddress
            })
        const address = await newAddress.save();
        return res.json({success:true,message:'address added',address})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
   
}

const getAddress = async (req,res) => {
    
    const user = req.user;
    
    try{
        console.log('inside getting address')
        
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const addresses = await addressModel.find({userId:user.id,deleted:0}).select('address -_id');
        
        const data = addresses.map((element,index) => element.address)
        return res.json({success:true,message:'items',data})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}


module.exports = { getAddress,addAddress }