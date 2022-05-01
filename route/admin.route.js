const express= require('express');
const auth= require('../middleware/auth.js');
const adminController = require('../controller/admin.controller');
const router=express.Router();
router.get('/',adminController.loginPage);
 router.post('/',adminController.loginPost);
router.get('/dashboard',auth.isAuth,adminController.adminDashBoard);
router.get('/customer-list',auth.isAuth,adminController.customerList);
router.get('/category-list',auth.isAuth,adminController.categoryList);
router.get('/comment-list',(request, response) => {
    response.send("<h1>hello</h1>")
})
module.exports=router;