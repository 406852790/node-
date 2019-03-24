
const postModel = require('../model/postModel');

module.exports = {
  // 分页获取文章数据的业务处理
  getPostsByPagination(req,res){
    let response = {
      code : 0,
      message : 'err'
    }
    // 分页获取数据，需要四个参数，
    // 一个是页码，一个是每页显示的条数
    let currentPage = req.body.currentPage;
    let pageSize = req.body.pageSize;
    // 此时除了分页功能之外，还要提供筛选的功能
    let category_id = req.body.category_id;
    let status = req.body.status;
    // console.log(req.body);
    postModel.getPostsByPagination(currentPage,pageSize,category_id,status,(err,result)=>{
      if(err) throw err;
      if(result.length != 0){
        response.code = 1;
        response.message= 'ok';
        response.data = result;

        // 还要获取数据的总条数
        postModel.getPostCountByPagination((err2,result2)=>{
          if(err2) throw err2;
          let count = result2[0].total;
          console.log(result2);
          // 计算出总共有多少页
          // 最大页码数 = ceil(总条数 / 每页获取多少条)
          let pageMax = Math.ceil(count / pageSize);
          // 把最大页码数带回浏览器
          response.pageMax = pageMax;

          res.json(response);
        });

      }else {
        response.message = '没有获取到满足条件的数据'
        res.json(response);
      }      
    })
  },
  addnewpost(req,res){
    let response={
      code:0,
      message:'error'
    }
    // 获取从浏览器哪里来的数据
    let data=req.body;
    console.log(data)
    // data中没有作者的id，将作者的id给data
    let user_id=req.session.userInfo.id;
    data.user_id=user_id;
    postModel.addnewpost(data,(err,result)=>{
      if(err) throw err;
      if(result){
        response.code=1;
        response.message='ok';
      }
      res.json(response);
    })
  },
  // 根据id获取文章
  getPostById(req,res){
    let response={
      code:0,
      message:'error'
    }
    // 获取id
    let id=req.body.id;
    console.log(id)
    postModel.getPostById(id,(err,result)=>{
      if(err) throw err;
      if(result.length > 0){
        response.code=1;
        response.message='ok';
        response.data=result[0];
      }
      res.json(response);
      
    })
  }
}