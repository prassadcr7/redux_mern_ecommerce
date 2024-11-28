const {addProductToDB,getProductsFromDB,deleteProductFromDB,editProductInDB} = require('../controllers/adminController.js')
const express = require('express')
const adminRouter = express.Router()
const multer = require('multer')

//image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Correct syntax for destination
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`); // Works fine
    }
});

const upload = multer({storage:storage})

adminRouter.post('/add',upload.single("image"),addProductToDB)
adminRouter.get('/get',getProductsFromDB)
adminRouter.put('/edit/:id',upload.single("image"),editProductInDB)
adminRouter.delete('/delete/:id',deleteProductFromDB)

module.exports = adminRouter