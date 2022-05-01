const pool = require('../util/database.js');
module.exports = class Cart {
  constructor(productId, userId) {
    this.productId = productId;
    this.userId = userId;
  }


  addCart() {
    return new Promise((resolve, reject) => {
      console.log("connection");
      pool.getConnection((err, con) => {
        if (!err) {
          console.log(this.userId);
          console.log(this.productId);
          let sql = "insert into cart(productId,userId) values(?,?)";
          con.query(sql, [this.productId, this.userId], (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          });
        }
        else
          reject(err);
      });
    });
  }

  removeCart() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "delete from cart where productId=? and userId=?";
          con.query(sql, [this.productId, this.userId], (err, queryResult) => {
            con.release();
            err ? reject(err) : resolve(queryResult);
          });
        }
        else
          reject(err);
      });
    });
  }
  static removeByProductId(pid) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "delete from cart where productId=?";
          con.query(sql, [pid * 1], (err, result) => {
            if (err) reject(err);
            else
              resolve(result);
          });
        }
        else {
          reject(err);
        }
      });
    });
  }
  static fetchCartItem(userId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "select product.id,product.pname,product.product_price,product.product_stock,product.Description,product.frontview,cart.id as cartId from product inner join cart on product.id = cart.productId where cart.userId = ?";
          con.query(sql, [userId * 1], (err, results) => {
            con.release();
            err ? reject(err) : resolve(results);
          });
        }
        else
          reject(err);
      });
    });
  }
  static removeByUserId(userId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "delete from cart where userId=?";
          con.query(sql, [userId * 1], (err, result) => {
            if (err) reject(err);
            else
              resolve(result);
          });
        }
        else {
          reject(err);
        }
      });
    });
  }
}