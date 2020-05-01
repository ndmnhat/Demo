const pool = require('../config/database');

let services = {
    create : (data,callback) => {
        pool.query(
            `insert into User(Username,Password) value(?,?)`,
            [data.username,data.password],
            (error,result,fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null,result);
            }
        )
    },
    findOne : (data,callback) => {
        pool.query(
            `select * from User where Username = ?`,
            [data.username],
            (error,result,fields) => {
                if(error) {
                    console.log(error);
                    return callback(error);
                }
                if(!result.length) return callback(null,null);
                return callback(null,result[0]);
            }
        )
    }
}
module.exports = services;