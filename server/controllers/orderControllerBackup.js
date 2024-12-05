const orderModel = require('../models/orderModel.js')
const paypal = require('../paypal.js')
const getOrdersFromDB = async(req,res) => {
    // console.log('get cart items')
    const user = req.user;
    try{
         console.log('inside getting order')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const orderData = await orderModel.find({userId:user.id,payment:false});
      
        const data = orderData.map((element,index) => element.order)
          console.log(orderData)
        return res.json({success:true,message:'items',orderData})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const addOrderToDB = async(req,res) => {
    const {cartData,totalAmount} = req.body;
    // console.log(cartData)
    const user = req.user;
    try{
        console.log('inside adding ordere')
        if(!user){
            return res.json({success:false,message:'User Authorization Failed'})
        }
        const createPaymentJson = {
            intent: 'sale',
            payer: {
              payment_method: 'paypal'
            },
            redirect_urls: {
              return_url: 'http://localhost:5178/checkout/success',
              cancel_url: 'http://localhost:5178/checkout/cancel'
            },
            transactions: [
                {
                    item_list: {
                        items: cartData.map((element,index) => {
                            return {
                                name:element.title,
                                sku:element._id,
                                price:element.salePrice,
                                currency:'USD',
                                quantity:element.qty
                            }
                        })
                    }
                },
                {
                    amount: {
                        total: totalAmount,
                        currency: 'USD'
                },
                description: 'Payment description here'
            }]
          };
          paypal.payment.create(createPaymentJson, async(error, paymentInfo) => {
            if (error) {
              console.error(error);
              return res.json({success:false,message:'Payment Error'})
            } else {
              console.log("payment successfull", paymentInfo);
              const newOrder = new orderModel({
                userId:user.id,order:cartData,totalAmount:totalAmount
                })
                const order = await newOrder.save();
        // return res.json({success:true,message:'inserted',order})
              return res.json({success:false,message:'Payment Error',order,paymentInfo})
              // Redirect the user to payment.links[1].href for approval
            }
          });
  
        
        
 
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    console.log(orderId,success)
    try{
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:'paid'})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:'not paid'}) 
        }
    }catch(error){
        res.json({success:false,error:'error'})
    }
}



module.exports = {addOrderToDB,getOrdersFromDB,verifyOrder}