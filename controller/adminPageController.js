module.exports={
    showIndex(req,res){
        res.render('index',{});
    },
    showAdminIndex(req,res){
        if(req.session.userInfo){
            // 证明登录了
            res.render('admin/index',{});
        }else{
            // 如果没有登录，就应该跳转到登录页面，强行让他登录
            // 在nodejs里面，跳转的写法：
            res.redirect('/admin/login');
        }   
    },
    showUsers(req,res){
        if(req.session.userInfo){
            // 证明登录了
            res.render('admin/users',{});
        }else{
            // 如果没有登录，就应该跳转到登录页面，强行让他登录
            // 在nodejs里面，跳转的写法：
            res.redirect('/admin/login');
        }   
        
    },
    showLogin(req,res){
        res.render('admin/login',{});
    },
    // 显示评论的页面
    showComments(req,res){
    // 读取对应的模板，显示即可
    if(req.session.userInfo){
        // 证明登录了
        res.render('admin/comments',{});
    }else{
        // 如果没有登录，就应该跳转到登录页面，强行让他登录
        // 在nodejs里面，跳转的写法：
        res.redirect('/admin/login');
    }   
    
  },
    showCategories(req,res){
        if(req.session.userInfo){
            // 证明登录了
            res.render('admin/categories',{});
        }else{
            // 如果没有登录，就应该跳转到登录页面，强行让他登录
            // 在nodejs里面，跳转的写法：
            res.redirect('/admin/login');
        }   
        
    },
    showposts(req,res){
        if(req.session.userInfo){
            // 证明登录了
            res.render('admin/posts',{});
        }else{
            // 如果没有登录，就应该跳转到登录页面，强行让他登录
            // 在nodejs里面，跳转的写法：
            res.redirect('/admin/login');
        }   
    },
    showpostadd(req,res){
        if(req.session.userInfo){
            // 证明登录了
            res.render('admin/post-add',{});
        }else{
            // 如果没有登录，就应该跳转到登录页面，强行让他登录
            // 在nodejs里面，跳转的写法：
            res.redirect('/admin/login');
        }   
    },
    showlist(req,res){
        res.render('list',{});
    }
}