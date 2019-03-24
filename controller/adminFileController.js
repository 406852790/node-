const formidable=require('formidable');  

module.exports={
    // 处理图片上传的方法
    uploadImg(req,res){
        let response={
            code:0,
            message:'err'
        }
        //创建一个可以解析上传回来的数据的对象
        let form=new formidable.IncomingForm();
        //设定图片上传的目录
        form.uploadDir=__dirname+'/../uploads';
        //设定上传回来的图片，保留后缀名
        form.keepExtensions=true;
        //使用form对象，解析传递回来的数据、
        form.parse(req,(err,fields,files)=>{
            if(err) throw err;
            let path=files.pic.path.substring(37,87);
            response.code=1;
            response.message='ok';
            response.data=path;
            res.json(response);
        })

    }
}