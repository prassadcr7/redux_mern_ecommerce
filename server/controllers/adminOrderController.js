const orderModel = require('../models/orderModel.js')
const getOrdersFromDB = async(req,res) => {
    // console.log('get cart items')
    const user = req.user;
    try{
         console.log('inside getting order')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const orderData = await orderModel.find();
      
        const data = orderData.map((element,index) => element.order)
          console.log(orderData)
        return res.json({success:true,message:'items',orderData})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

module.exports = {getOrdersFromDB}