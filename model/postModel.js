const mysql = require('mysql');
const sqlhelper = require('../sqlhelper/sqlhelper');
module.exports = {
  // 分页获取数据的处理
  getPostsByPagination(currentPage,pageSize,category_id,status,callback){
    // let connection = mysql.createConnection({
    //   host : '127.0.0.1',
    //   port : 3306,
    //   user : 'root',
    //   password : 'root',
    //   database : 'bx_27'
    // });
    // connection.connect();
    let connection = sqlhelper.getConnection();
    // 准备sql语句   
    let sql = `SELECT 
    p.id,title,u.nickname,created,p.\`status\`,c.\`name\`
     FROM posts p
     LEFT JOIN users u ON p.user_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id`

    // 有可能有条件筛选，也可能没有条件筛选，这个时候，需要前后端约定好，什么样式筛选，什么样式不筛选
    // 目前的约定是： 如果条件带回来的值是： all，就不筛选
    if(category_id != 'all' || status != 'all'){
      // 如果要进行筛选，需要一个sql的关键字 where
      sql += ` where `
    }
    // 如果有条件，还要继续把条件拼接上
    if(category_id != 'all'){
      sql += ` p.category_id = ${category_id} `
    }
    // 如果status！= all，也要根据status进行筛选
    if(status != 'all'){
      // 如果两个都不是all，需要一个and隔开两个条件
      if(category_id != 'all'){
        sql += ` and `
      }
      sql += ` p.\`status\` = '${status}' `
    }

    // 算出 从哪里开始获取
    //从哪里开始 = (页数 -1) * 每页的数据的条数
    let offset = (currentPage - 1) * pageSize;
    sql += ` LIMIT ${offset},${pageSize} `;

    connection.query(sql,(err,result)=>{
      callback(err,result);
    });
  },
  // 分页按钮，需要一个数据的总条数
  getPostCountByPagination(callback){
    // 实现的是获取文章的数据标的总条数
    let connection = sqlhelper.getConnection();
    let sql = `SELECT count(*) as total FROM posts`;
    connection.query(sql,(err,result)=>{
      callback(err,result);
    });
  },
// 新增文章的方法
addnewpost(data,callback){
    let connection=sqlhelper.getConnection();
    let sql=`insert into posts set
    title='${data.title}',
    content='${data.content}',
    slug='${data.slug}',
    feature='${data.feature}',
    category_id='${data.category}',
    created='${data.created}',                
    \`status\`='${data.status}',
    user_id='${data.user_id}'`;
    connection.query(sql,(err,result)=>{
      callback(err,result);
    });
  },

  // 根据id获取数据
  getPostById(id,callback){
    let connection=sqlhelper.getConnection();
    let sql=`SELECT * FROM posts WHERE id=${id}`;
    connection.query(sql,(err,result)=>{
      callback(err,result);
      console.log(result)
    });
  }
}