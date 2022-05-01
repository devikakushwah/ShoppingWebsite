const Category = require('../model/category.model');
const path = require('path');
exports.addCategory = (request, response, next) => {
  console.log(request.file);
  let category = new Category();
  category.categoryName = request.body.cname;
  category.categoryImage = request.file.filename;
  category.save()
    .then(result => {
      response.render('./admin/admin.dash.ejs');
    })
    .catch(err => {
      response.send("Error.......");
    });
};
exports.addCategoryPage = (request, response,next) => {
   response.render('./admin/addCategory.ejs');
}