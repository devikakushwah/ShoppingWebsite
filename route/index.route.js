const express = require('express');
const indexController = require('../controller/index.controller');
const router = express.Router();
router.get('/',indexController.homePage);
router.get('/check/:address/:contact/:itemList',(request, response)=>{
    console.log("checking");
    return response.json({
        message: "success"
     });
})
router.get('/about',indexController.aboutPage);
router.get('/contact',indexController.contactPage);
module.exports=router;