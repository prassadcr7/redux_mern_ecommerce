const addressModel = require('../models/addressModel');

const addAddress = async(req,res) => {
    console.log(req.body)
    const address = req.body;
    const user = req.user;
    try{
        console.log('inside add address')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const newAddress = new addressModel({
            userId:user.id,address:address
            })
        const address = await newCart.save();
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
        const cartData = await cartModel.find({userId:user.id,deleted:0}).select('address -_id');
        console.log(cartData)
        // const data = cartData.map((element,index) => element.item)
        
        // return res.json({success:true,message:'items',data})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}


module.exports = { getAddress,addAddress }