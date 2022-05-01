const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();
router.post('/register',userController.registerPage);
router.get('/login',userController.loginPage);
router.get('/create-account',userController.createAccountPage);
router.post('/login',userController.loginPost);
router.get('/logout',userController.logout);
router.post('/forgot-password',(request, response,next)=>{
    return response.json({
        message: "success"
     });
});


module.exports=router;