const express= require('express');
const Query = require('../model/query.model');
const queryController = require('../controller/query.controller');
const router=express.Router();
router.post('/add-query',queryController.queryPage);
router.get('/view',(request,response) => {
    Query.view()
    .then(results=>{
     response.send("result show");
    })
    .catch(err =>{
        console.log(err);
        response.send(err);
    })
});
module.exports=router;