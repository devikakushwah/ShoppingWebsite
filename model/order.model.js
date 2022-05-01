
const pool = require("../util/database");

module.exports = class Order {
    constructor(userId, address, contact, order_date, email, itemList) {
        this.userId = userId;
        this.address = address;
        this.contact = contact;
        this.order_date = order_date;
        this.email = email;
        this.itemList = itemList;
    }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    console.log("insert ");
                    let sql = "insert into order_table(user_id,address,contact,date,email) values(?,?,?,?,?)";
                    con.query(sql, [this.userId, this.address, this.contact, this.order_date, this.email], (err, result) => {
                        if (err){
                            console.log(err);
                            reject(err);
                        } 
                        else
                        {
                             sql="select id from order_table where email=?";
                            con.query(sql,[this.email],(err,result)=>{
                                if(err)
                                    return reject(err);
                            
                        
                            else {
                            console.log("itemlist");
                            console.log(result);
                            for (let i = 0; i < this.itemList.length; i++) {
                                let sum = (this.itemList[i].product_stock) * (this.itemList[i].product_price);
                                sql = "insert into order_list(order_id,product_id,quantity,sum) values(?,?,?,?)";
                                con.query(sql, [result[0].id, this.itemList[i].id, this.itemList[i].productQty, sum], (err, result) => {
                                    if (err){
                                        console.log(err);
                                         reject(err);
                                    }
                                    else {
                                        resolve(result);
                                    }
                                });
                            }

                        }
                    });
                }
                        con.release();
                    });
                }
            });
        });
    }
}