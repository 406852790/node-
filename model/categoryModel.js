
const sqlhelper = require('../sqlHelper/sqlhelper');

module.exports = {
  getAllCategories(callback){
    let connection = sqlhelper.getConnection();
    let sql = `SELECT * FROM categories`;
    connection.query(sql,(err,result)=>{
      callback(err,result);
    });
  }
}