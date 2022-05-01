const Cart = require('../model/cart.model');
exports.addToCart = (request, response, next) => {
  let productId = request.params.pid;
  let userId = request.session.current_user_id;
  let cart = new Cart(productId, userId);
  cart.addCart()
    .then(result => {
      return response.json({
        message: "success"
      });
    })
    .catch(err => {
      return response.json({
        message: "error"
      });
    });
}
exports.removeFromCart = (request, response, next) => {
  let productId = request.params.pid;
  let userId = request.session.current_user_id;
  const cart = new Cart(productId, userId);
  cart.removeCart()
    .then(result => {
      return response.json({
        message: "success"
      });
    })
    .catch(err => {
      return response.json({
        message: "error"
      })
    });
}
exports.viewCart = (request, response, next) => {

  let userId = request.session.current_user_id;
  Cart.fetchCartItem(userId)
    .then(results => {
        response.render("./user/viewCart.ejs", {
        cartItemList: results,
        isLoggedIn: request.session.current_user_id
      });
    })
    .catch(err=>{
      console.log(err);
    });

}
exports.removeCart=(request,response,next)=>{
  let productId = request.params.pid;
  Cart.removeByProductId(productId)
  .then((result)=>{
      return response.json({
          message: "success"
       });
  })
  .catch((err)=>{
      return response.json({
          message: "error"
       });
  })
}
exports.getCartItem=(request,response,next)=>{
    let userId = request.session.current_user_id;
    Cart.fetchCartItem(userId)
    .then(results=>{
        return response.json(results);
    })
    .catch();
}
