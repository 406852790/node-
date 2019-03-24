/**
 *  专门封装跟数据库的增删改查的相关的代码
 * 
 */
// 写了几个model之后，发现  连接数据库的操作，是一直都是一样的，就把这段代码封装

const mysql = require('mysql');

module.exports = {
  getConnection(){
    let connection = mysql.createConnection({
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'root',
      database : '阿里百秀'
    });
    connection.connect();
    return connection;
  }
}