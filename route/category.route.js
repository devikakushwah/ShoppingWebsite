const express = require('express');
const multer = require('multer');
const upload = multer({dest:'public/images'});
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/auth');
const router = express.Router();
router.get('/add-category',auth.isAuth,categoryController.addCategoryPage);
router.post('/add-category',auth.isAuth,upload.single('images'),categoryController.addCategory);
module.exports = router;



