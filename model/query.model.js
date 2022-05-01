const pool = require("../util/database");

module.exports = class Query{
    constructor(name,email,mobile,subject,description){
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.subject= subject;
        this.description = description;
    }
    save(){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err, con) => {
              if(err) reject(err);
              else{
                  let sql = "insert into query(name,email,mobile,subject,description) values(?,?,?,?,?)";
                  con.query(sql,[this.name,this.email,this.mobile,this.subject,this.description],(err,result)=>{
                      if(err) reject(err);
                      else resolve(result);
                  });
                }
          })
        });
    }
    static view(){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err, con) => {
              if(err) reject(err);
              else{
                  let sql = "select * from query";
                  con.query(sql,(err,result)=>{
                      if(err) reject(err);
                      else resolve(result);
                  });
                }
          })
        });
    }
}