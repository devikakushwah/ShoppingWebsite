const pool = require('../util/database');
module.exports = class Product {
    constructor(productName,productCategory,productPrice,productStock,frontViewImage,backViewImage,leftViewImage,rightViewImage,productDescription,productAddDate,productIsDeleted) {
        this.productName = productName;
        this.productCategory = productCategory;
        this.productPrice = productPrice;
        this.productStock = productStock;
        this.productDescription = productDescription;
        this.frontViewImage = frontViewImage;
        this.backViewImage = backViewImage;
        this.leftViewImage = leftViewImage;
        this.rightViewImage = rightViewImage;
    this.productAddDate= productAddDate;
        this.productIsDeleted = 0;
    }
    
    static fetchProduct() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from product";
                    con.query(sql, (err, results) => {
                        if (err) reject(err);
                        else resolve(results);
                    });
                }
                else
                    reject(err);
            });
        })
    }
    static recentlyProduct() {
      return new Promise((resolve, reject) => {
          pool.getConnection((err, con) => {
              if (!err) {
                  let sql = "select * from product order by id desc";
                  con.query(sql, (err, results) => {
                      if (err) reject(err);
                      else resolve(results);
                  });
              }
              else
                  reject(err);
          });
      })
  }
    static fetchAllProduct(currentUserId){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql ="";
               if(currentUserId){
                sql = "select product.id,product.pname,product.product_price,product.product_stock,product.description,product.frontview,cart.productId from product left outer join cart on product.id=cart.productId and cart.userId="+currentUserId;
               }
               else
                sql = "select * from product";
              con.query(sql,(err,queryResults)=>{
                con.release();
                err ? reject(err) : resolve(queryResults);
              });
            }
            else
              reject(err);
          })
        });
      }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                console.log("connection success");
                
              if(!err){  
               let sql = "insert into product(pname,category_id,product_price,product_stock,frontview,backview,leftview,rightview,description,date,isdeleted) values(?,?,?,?,?,?,?,?,?,?,?)";
            con.query(sql,[this.productName,
                this.productCategory,
                this.productPrice,
                this.productStock,
                this.frontViewImage,
                this.backViewImage,
                this.leftViewImage,
                this.rightViewImage,
                this.productDescription,
                this.productDate,
                this.productIsDeleted],(err,queryResult)=>{
                 con.release(); 
                 err ? reject(err) : resolve(queryResult);
               });
              }
              else 
                reject(err);
            });
        });
    }
    static fetchProductById(){
      return new Promise((resolve,reject)=>{
          console.log(productId);
          console.log("beforre");
        pool.getConnection((err,con)=>{
          if(!err){
             let sql = "select categories.category_name,product.pname,product.product_price,product.product_stock,product.description,product.date from product inner join categories on categories.id=product.category_id";
             con.query(sql,[productId*1],(err,result)=>{
              
                err ? reject(err) : resolve(result);
               con.release();
             });
          }
          else
            reject(err);
        });
      });
   }
  
  }
      // static delete(productId){
      //   return new Promise((resolve,reject)=>{
      //     pool.getConnection((err,con)=>{
      //       if(!err){
      //           let sql = "delete from product where id =?";
      //           con.query(sql,[parseInt(productId)],(err,result)=>{
      //             err ? reject(err) : resolve(result);
      //             con.release();
      //           });
      //       }
      //       else
      //         reject(err);
      //     });
      //   });
      // }
  
    
//  update(){
//    return new Promise((resolve,reject)=>{
//      pool.getConnection((err,con)=>{
//        if(!err){
//          let sql = "update product set name=?,price=?,description=?,imageUrl=? where id=?";
//          con.query(sql,[this.name,this.price*1,this.description,this.imageUrl,this.id*1],(err,result)=>{
//            err ? reject(err) : resolve(result);
//            con.release();
//          });
//        }
//        else
//          reject(err);
//      }); 
//    });
//  }
