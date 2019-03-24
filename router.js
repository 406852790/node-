// 引入express模板
const express=require('express');
const router=express.Router();

//引入管理页面显示的控制
const pageController=require('./controller/adminPageController');
// 分发请求
router.get('/',(req,res)=>{
    // 展示主页，找控制器
    pageController.showIndex(req,res);
});
router.get('/admin',(req,res)=>{
    pageController.showAdminIndex(req,res);
});
router.get('/admin/users',(req,res)=>{
    pageController.showUsers(req,res);
});
router.get('/admin/comments',(req,res)=>{
    pageController.showComments(req,res);
  });
// 显示登录的页面
router.get('/admin/login',(req,res)=>{
    pageController.showLogin(req,res);
});
router.get('/admin/categories',(req,res)=>{
    pageController.showCategories(req,res);
});
router.get('/admin/posts',(req,res)=>{
    pageController.showposts(req,res);
});
// 显示文章添加页面
router.get('/admin/post-add',(req,res)=>{
    pageController.showpostadd(req,res);
});
// 显示前台页面
router.get('/list',(req,res)=>{
    pageController.showlist(req,res);
})



// 引入跟用户操作相关的controller.js
const userController=require('./controller/adminUserController');
// 提供一个给登录的ajax请求的url
router.post('/admin_login',(req,res)=>{
    userController.userLogin(req,res);
});
// 获取全部的用户信息
router.post('/getAllUsers',(req,res)=>{
    userController.getAllUsers(req,res);
});
// 监听新增用户信息
router.post('/addNewuser',(req,res)=>{
    userController.addNewuser(req,res);
});
// 根据id查找用户
router.post('/getUserbyid',(req,res)=>{
    userController.getUserbyid(req,res);
});
// 根据id修改用户信息
router.post('/updateUserById',(req,res)=>{
    userController.updateUserById(req,res);
});
// 根据id批量删除
router.get('/delUserById',(req,res)=>{
    userController.delUserById(req,res);
});
// 根据id删除

// 提供一个供浏览器请求头像和昵称的接口
router.get('/getuserheadAndNickname',(req,res)=>{
    userController.getuserheadAndNickname(req,res);
});

const postController = require('./controller/adminPostController');
// 提供一个文章的分页请求的接口
router.post('/getPostsByPagination',(req,res)=>{
  postController.getPostsByPagination(req,res);
});

// 添加新文章的接口
router.post('/addnewpost',(req,res)=>{
    postController.addnewpost(req,res);
});

// 根据id获取文章数据

router.post('/getPostById',(req,res)=>{
    postController.getPostById(req,res);
});





// 引入分类相关的控制器模块
const categoryController = require('./controller/adminCategoryController');
// 提供一个得到所有分类数据的接口
router.post('/getAllCategories',(req,res)=>{
  categoryController.getAllCategories(req,res);
});


// 引入文件管理模块
const fileController=require('./controller/adminFileController');
//提供一个图片上传的接口
  router.post('/uploadImg',(req,res)=>{
      fileController.uploadImg(req,res)
  })
// 暴露路由对象
module.exports=router;