const express = require('express');
const multer = require('multer');
const upload = multer({dest:'public/images'});
const productController = require('../controller/product.controller');
const auth = require('../middleware/auth');
const router = express.Router();
router.get('/add-product',auth.isAuth,productController.addProductPage);
router.post('/add-product',auth.isAuth,upload.array('images'),productController.addProductPost);
 router.get('/product-list',auth.isAuth,productController.productListPage);
// // router.get('/edit-product/:productId',auth.isAuth,productController.getProductById);
// router.get('/update-product/:productId',auth.isAuth,productController.getProductById);
module.exports = router;



