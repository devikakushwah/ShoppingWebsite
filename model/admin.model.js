const pool = require('../util/database.js');
const bcrypt = require('bcryptjs');
module.exports = class Admin {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkAdmin() {
        return new Promise((resolve, reject) => {

            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    let sql = "select * from login where email=?";
                    con.query(sql, [this.email], (err, results) => {
                        if (results.length > 0) {
                            const hashedPassword = results[0].password;

                            bcrypt.compare(this.password, hashedPassword,
                                async function (err, isMatch) {
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
    
}