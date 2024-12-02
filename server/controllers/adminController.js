const adminModel = require('../models/adminModel.js')

const addProductToDB = async(req,res) => {
    const {description,title,price,salePrice,category,brand} = req.body;
    let image_filename = req.file.filename;
    console.log(image_filename)
    try{
        console.log('inside adding')
        const newProduct = new adminModel({
            title:title,category:category,price:price,brand:brand,description:description,salePrice:salePrice,image:image_filename
        })
        const product = await newProduct.save();
        return res.json({success:true,message:'inserted',product})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const getProductsFromDB = async (req,res) => {
    try{
        const data = await adminModel.find();
        return res.json({success:true,data})
    }catch(error){
        return res.json({success:false,message:'error'})
    }
}

const editProductInDB = async(req,res) => {
    const _id = req.params.id
    console.log(_id)
    const {description,title,price,salePrice,category,brand} = req.body;
    let image_filename = '';
    console.log(req.file.filename)
    if(req.file.filename)   image_filename = req.file.filename;
    try{
        console.log('inside edit')
        const product = await adminModel.findByIdAndUpdate(_id,{
            title:title,category:category,price:price,brand:brand,description:description,salePrice:salePrice,image:image_filename
        }, { new: true })

        return res.json({success:true,message:'inserted',product})
    }catch(error){
        return res.json({success:false,message:'Error'})
    }
}

const deleteProductFromDB = async (req,res) => {
    const id = req.params.id;
    try{
        const response = await adminModel.findByIdAndDelete(id);
        return res.json({success:true,response})
    }catch(error){
        return res.json({success:false,message:'error'})
    }
}



module.exports = {addProductToDB,getProductsFromDB,editProductInDB,deleteProductFromDB}