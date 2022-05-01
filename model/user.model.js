const pool = require('../util/database.js');
const bcrypt = require('bcryptjs');
module.exports = class User {
    constructor(email, password, name, mobile,date) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.mobile = mobile;
        this.date=date;

    }
    checkUser() {
        return new Promise((resolve, reject) => {

            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    let sql = "select * from register where email=?";
                    con.query(sql, [this.email], (err, results) => {
                        if (results.length > 0) {
                            const hashedPassword = results[0].password;

                            bcrypt.compare(this.password, hashedPassword,
                                async function (err, isMatch) {

                                    // Comparing the original password to
                                    // encrypted passwosrd   
                                    if (isMatch) {

                                        resolve(results);
                                    }

                                    if (!isMatch) {
                                        console.log("not matching..");

                                    }
                                })


                        }
                        else
                            reject(err);
                    });

                }
            });
        })
    }
    static customerList() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    let sql = "select * from register";
                    con.query(sql, (err, results) => {
                        if (err) reject(err);
                        else resolve(results);
                    });

                }
            });
        });
    }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    reject(err);
                }
                else {

                    let sql = "insert into register(name,mobile,email,password) values(?,?,?,?)";
                    con.query(sql, [this.name, this.mobile, this.email, this.password], (err, result) => {
                        if (err) reject(err);
                        else
                            resolve(result);
                    });
                }

            });
        });
    }

    static getCurrentUser(email) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from user where email=?";
                    con.query(sql, [email], (err, queryResult) => {
                        con.release();
                        err ? reject(err) : resolve(queryResult);
                    });
                }
                else
                    reject(err);
            })
        });
    }
    signup() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into register(name,email,mobile,password) values(?,?,?,?)";
                    con.query(sql, [this.name, this.email, this.mobile, this.password], (err, queryResult) => {
                        con.release();
                        err ? reject(err) : resolve(queryResult);
                    });
                }
                else
                    reject(err);
            });
        });
    }
    static getEmail(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from register where=? ";
                    con.query(sql, [userId * 1], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    });
                }
                else
                    reject(err);
            });
        });
    }
}
