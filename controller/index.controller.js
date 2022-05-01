const Product = require('../model/product.model');
const Category = require('../model/category.model');
exports.homePage = (request, response) => {
    let currentUserId = request.session.current_user_id;
    console.log(currentUserId);

    Promise.all([Category.fetchCategory(), Product.fetchProduct(currentUserId),Product.recentlyProduct()])
        .then(results => {
            return response.render("./index1.ejs", {
                categoryList: results[0],
                productList: results[1],
                recentlyProduct: results[2],
                isLoggedIn: request.session.current_user_id
            });
        })
        .catch(err => {
            console.log(err);
            return response.send("Error.....");
        });
};
exports.aboutPage = (request, response) => {
    
     response.render("./user/About.ejs");
  }
  exports.contactPage = (request, response) => {
      response.render("./user/ContactUs.ejs");
  }

