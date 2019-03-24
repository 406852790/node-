// 负责跟用户操作相关的数据库操作
const mysql=require('mysql');

module.exports={
    // 根据邮箱和密码查询用户的方法
    getUserByEmailAndPassword(email,password,callback){
        let connection=mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'root',
            database:'阿里百秀'
        });
        connection.connect();
        // 准备sql语句
        let sql="SELECT * FROM users WHERE email='"+email+"' AND `password`='"+ password +"'";
        // 执行
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
        connection.end();
    },
    getAllUsers(callback){
        let connection=mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'root',
            database:'阿里百秀'
        });
        connection.connect();
        // 准备sql语句
        let sql="SELECT * FROM users";
        // 执行
        connection.query(sql,(err,result)=>{
            callback(err,result);
        });
        connection.end();
    },
    // 新增用户
    addNewuser(data,callback){
        let connection=mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'root',
            database:'阿里百秀'
        });
        connection.connect();
        // 准备sql语句
        let sql=`INSERT INTO users (email, \`password\`,slug,nickname) VALUES ('${data.email}', '${data.password}','${data.slug}','${data.nickname}')`;
        // 执行
        connection.query(sql,(err,result)=>{
            callback(err,result);
        });
        connection.end();
    },

    // 根据id输出用户信息
    getUserbyid(id,callback){
        let connection=mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'root',
            database:'阿里百秀'
        });
        connection.connect();
        // 准备sql语句
        let sql=`SELECT * FROM users WHERE id=${id}`;
        // 执行
        connection.query(sql,(err,result)=>{
            callback(err,result);
        });
        connection.end();
    },

    // 修改用户信息
    updateUserById(data,callback){
        let connection=mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'root',
            database:'阿里百秀'
        });
        connection.connect();
        // 准备sql语句
        let sql=`UPDATE users SET email='${data.email}',slug='${data.slug}',nickname='${data.nickname}',\`password\`='${data.password}' WHERE id='${data.id}'`;
        // let sql = `UPDATE users SET email='${data.email}',slug='${data.slug}',nickname='${data.nickname}',\`password\`='${data.password}' WHERE id = ${data.id}`;
        // 执行
        connection.query(sql,(err,result)=>{
            callback(err,result);
        });
        connection.end();
    },

    // 根据id删除用户信息
    delUserById(ids,callback){
        let connection=mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'root',
            database:'阿里百秀'
        });
        connection.connect();
        // 把数组拼接成字符串
        let que=ids.join();
         let sql=`DELETE FROM users WHERE id in (${que})`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        });
        connection.end();
    }
}