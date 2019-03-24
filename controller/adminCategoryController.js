
// 引入专门操作分类数据的model
const categoryModel = require('../model/categoryModel');

module.exports = {
  getAllCategories(req,res){
    let response = {
      code : 0,
      message : 'err'
    }
    categoryModel.getAllCategories((err,result)=>{
      if (err) throw err;
      if(result.length != 0){
        response.code = 1;
        response.message = 'ok',
        response.data = result;
      }else {
        response.message = '没有获取到满足条件的数据';
      }
      res.json(response);
    })
  }
}