const express = require('express');
const Cart = require('../model/cart.model');
const cartController = require('../controller/cart.controller');
const userAuth = require('../middleware/userAuth');
const router = express.Router();
 router.get("/add-to-cart/:pid",userAuth.isAuth,cartController.addToCart);
 router.get("/remove-from-cart/:pid",userAuth.isAuth,cartController.removeFromCart);
router.get("/",cartController.viewCart);
router.get("/view-cart",userAuth.isAuth,cartController.viewCart);
router.get('/remove-product/:pid',userAuth.isAuth,cartController.removeCart);
router.get("/get-cart-item-local",userAuth.isAuth,cartController.getCartItem);
module.exports = router;