const express = require('express');
const orderController = require('../controller/order.controller');
const router = express.Router();
router.get('/place-order/:address/:contact/:itemList/:email',orderController.placedOrder);
module.exports = router;
// const orderController=require("../controller/OrderController");
// const express = require("express");
// const router = express.Router();


// router.get("/adminorder",orderController.adminOrder);
// router.get("/customerorder",orderController.customerOrder);
// router.get("/orderdeliver/:qty/:email/:orderProductId/:productId",orderController.orderdeliver);
// router.get("/removeorder/:orderId",orderController.removeOrder);

// module.exports =router;