const Category = require('../model/category.model');
const path = require('path');
const Product = require('../model/product.model');
exports.productListPage = (request, response, next) => {
  Product.fetchProduct()
    .then(results => {
      response.render('./admin/productList.ejs', {
        productList: results
      });
    })
    .catch(err => {
      console.log(err);
      response.send("error");
    })

}
exports.addProductPage = (request, response, next) => {
  Category.fetchCategory()
    .then(results => {
      console.log(results);
      response.render("./admin/addProduct.ejs", {
        categoryList: results
      });
    })
    .catch(err => {
      console.log(err);
      response.send("error found");
    });
}
exports.addProductPost = (request, response, next) => {
  let productName = request.body.productName;
  console.log(request.body);
  console.log(request.files);
  console.log(request.files.length);

  let categoryName = request.body.categoryName;
  let productPrice = request.body.productPrice;
  let productQuantity = request.body.productQuantity;
  let productDescription = request.body.productDescription;
  let frontViewImage = "";
  let backViewImage = "";
  let leftViewImage = "";
  let rightViewImage = "";
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }
  today = yyyy + '/' + mm + '/' + dd;
  console.log(today);
  if (request.files.length > 0) {
    frontViewImage = request.files[0].filename;
    if (request.files.length > 1) {
      backViewImage = request.files[1].filename;
      if (request.files.length > 2) {
        leftViewImage = request.files[2].filename;
        if (request.files.length > 3) {
          rightViewImage = request.files[3].filename;
        }
      }
    }
  }
  const product = new Product(productName, categoryName, productPrice
    , productQuantity, frontViewImage, backViewImage, leftViewImage, rightViewImage, productDescription,today);
  console.log("before save");
  product.save()
    .then(results => {
      response.render("./admin/admin.dash.ejs");
    })
    .catch(err => {
      response.send("<h1>error</h1>");
    })
}

