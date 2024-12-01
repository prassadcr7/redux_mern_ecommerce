const {getProductsFromDB} = require('../controllers/productsController.js')
const express = require('express');

const productRouter = express.Router();

productRouter.get('/get',getProductsFromDB);

module.exports = productRouter;


