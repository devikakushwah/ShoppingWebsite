const Order = require('../model/order.model');
const Cart = require('../model/cart.model');
exports.placedOrder = (request, response) => {
    let itemList = request.params.itemList;
    var item = JSON.parse(itemList);
    console.log(item);
    let contact = request.params.contact;
    let address = request.params.address;
    let email = request.params.email;
    const userId = request.session.current_user_id;
    // ---------------------
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


    const order = new Order(userId, address, contact, today, email, item);
     order.save()
         .then(result => {
             console.log(result);
             let currentUser = request.session.current_user_id;
             Cart.removeByUserId(currentUser)
                 .then(result => {
                     console.log(result);

                     return response.json({
                         message: "success"
                     });
                 })
                .catch(err => {
                    return response.json({
                         message: "error"
                     });
                 })

         })
         .catch(err => {
             return response.json({
                 message: "error"
             });
        });
  
}