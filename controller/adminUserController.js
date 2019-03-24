//   负责控制所有跟用户操作相关的请求
// 引入userModel模块
const userModel=require('../model/userModel');

module.exports={
    // 处理用户的登录请求
    userLogin(req,res){
        let response={
            code:0,
            message:'用户名或者密码不正确'
        }
        // 得到提交过来的邮箱和密码
        let email=req.body.email;
        let password=req.body.password;
        // 根据邮箱和密码查询数据库
        userModel.getUserByEmailAndPassword(email,password,(err,result)=>{
            if(err) throw err;
            if(result[0]){
                if(result[0].status=='activated'){
                    // 存入数据到session里面
                    req.session.userInfo=result[0];
                    // 登录成功
                    response.code=1;
                    response.message='ok';
                }else{
                    response.message='您的账号还没有激活，请先激活';
                }
            }
            res.json(response);
        });
    },
    getAllUsers(req,res){
        userModel.getAllUsers((err,result)=>{
            let response={
                code:0,
                message:"error"
            };
            if(err) throw err;
            if(result.length!=0){
                response.code=1;
                response.message="请求成功";
                response.data=result;
            }else{
                response.code=1;
                response.message="数据库里面没有数据";
            }
            res.json(response);
        });
    },
    // 添加新用户
    addNewuser(req,res){
        let response={
            code:0,
            message:"error"
        };
        // 获取浏览器传递过来的数据
        let data=req.body;
        userModel.addNewuser(data,(err,result)=>{
            if(err) throw err;
            if(result){
                response.code=1;
                response.message="ok";
            }
            res.json(response);
        })
    },
    // 根据id查找用户
    getUserbyid(req,res){
        let response={
            code:0,
            message:"error"
        };
        // 获取点击的id、、
        let id=req.body.id;
        userModel.getUserbyid(id,(err,result)=>{
            if(err) throw err;
            if(result){
                response.code=1;
                response.message="ok";
                response.data=result[0];
            }
            res.json(response);
        })
    },
    // 修改用户信息
    updateUserById(req,res){
        let response={
            code:0,
            message:"error"
        };
        // 获取浏览器传递过来的数据
        let data=req.body;
        console.log(data);
        userModel.updateUserById(data,(err,result)=>{
            if(err) throw err;
            if(result){
                response.code=1;
                response.message="ok";
            }
            res.json(response);
        });
    },
    
    // 根据id删除用户信息
    delUserById(req,res){
        let response={
            code:0,
            message:"error"
        };
        // 获取浏览器传递过来的数据
        let ids=req.query.ids;
        console.log(ids);
        userModel.delUserById(ids,(err,result)=>{
            if(err) throw err;
            if(result){
                response.code=1;
                response.message="ok";
            }
            res.json(response);
        });
    },

    // 获取已经登录的用户的头像和昵称
    getuserheadAndNickname(req,res){
        let data={avatar,nickname}=req.session.userInfo;
        let response ={
            code:1,
            message:'ok',
            data:data
        }
        res.json(response);
    }



}