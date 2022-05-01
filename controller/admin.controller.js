const Admin = require('../model/admin.model');
const User = require('../model/user.model');
const Category = require('../model/category.model');
const Product = require('../model/product.model');
exports.loginPost = (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    console.log(request.body);
    const admin = new Admin(email, password);
    admin.checkAdmin()
        .then(result => {
            request.session.current_user = email;
            return response.render('admin/admin.dash.ejs');

        })
        .catch(err => {
            console.log(err);
            return response.send("Error.....");
        });

}
exports.adminDashBoard = (request, response, next) => {
    Category.fetchCategory()
        .then(results => {

            return response.render('admin/admin.dash.ejs'
                //    title : "Admin Dashboard"
            );

        })
        .catch(err => {
            console.log(err);
            return response.send("Error.....");
        });
}
exports.customerList = (request, response, next) => {
    User.customerList()
        .then(results => {
            response.render("admin/customer.ejs", {
                customerList: results
            });
        })
        .catch(err => {

        })

}
exports.categoryList = (request, response, next) => {
     Product.fetchAllProduct()
        .then(results => {
            console.log(results);
            return response.render("admin/categoryList.ejs", {

                categoryList: results

            });
        })
        .catch(err => {
            console.log(err);
            return response.send("Error.....");
        });
}
exports.loginPage = (request, response) => {
    response.render("./admin/login.admin.ejs");
}


