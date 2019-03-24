//  创建一个服务器
const express=require('express');
const app=express();
// 监听端口
app.listen(8888,function(){
    console.log('点击开始 http://127.0.0.1:8888');
})
app.set('view engine','ejs');
// 处理静态文件
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));
// 注册处理post请求中间件
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// 引入session中间件
const session=require('express-session');
// 注册
app.use(session({
    secret:'dadadqdq',
}))
// 注册路由，分发请求
const router=require('./router');
app.use(router);