const adminModel = require('../models/adminModel.js')

const getProductsFromDB = async (req,res) => {
    
    try{
        const data = await adminModel.find();
        console.log(data)
        return res.json({success:true,data})
    }catch(error){
        return res.json({success:false,message:'error'})
    }
}

module.exports = {getProductsFromDB}