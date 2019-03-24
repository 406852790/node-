$(function () {
    // 把所有分类都动态加载过来
    $.ajax({
        type: "post",
        url: "/getAllCategories",
        success: function (res) {
            console.log(res);
            if(res.code==1){
                // 把动态获取的分类生成下拉框
                let html=``;
                for(let i=0;i<res.data.length;i++){
                    html +=`<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('#category').html(html);
            }
        }
    });


    // 图片上传
    $("#feature").on('change',function(){
        // 获取图片
        let pic=this.files[0];
        //把图片转化为二进制
        let fd=new FormData();
        fd.append('pic',pic);
        fd.append('name','二狗');
        //把图片的二进制数据用ajax的方式上
        $.ajax({
            type: "post",
            url: "/uploadImg",
            data: fd,
            // jq发送二进制数据的时候，需要两个额外的设置
            contentType:false,
            processData:false,
            success: function (res) {
                if(res.code==1){
                    $("#preview").show().attr('src',res.data);
                    $("#featureImg").val(res.data);
                }
            }
        });
    });



    function searchob(){
        let search = location.search;
        // 去掉问号
        search=search.substring(1);
        // 分割&符号
        let temp=search.split('&');
        // 准备一个空对象
        let result={};
        // 把数字里面的每个元素变成对象的键值对
        temp.forEach((e,i)=>{
            let arr =e.split('=');
            result[arr[0]]=arr[1];
        });
        return result;
    }

    // 现在新增和编辑使用的是同一个页面，需要先判断，访问这个页面的时候，到底是新增还是编辑
    if(location.search){
        // 获取url里面携带的id   location.search 可能会比较复杂
        // 吧location.search变成一个对象，直接从对象里面点出你想要的数据
        let result=searchob();
        let id=result.id;
        console.log(id)
        $.ajax({
            type: "post",
            url: "/getPostById",
            data: {
                id:id
            },
            success: function (res) {
                console.log(res)
                if(res.code==1){
                    $("#title").val(res.data.title);
                    console.log(res.data)
                    $("#content").val(res.data.content);
                    // 需要先把内容填入文本域，再把文本域变成富文本
                    CKEDITOR.replace("content");
                    $("#slug").val(res.data.slug);
                    // 处理图像
                    // 处理隐藏域
                    $("featureImg").val(res.data.feature);
                    // 处理图片
                    $("#preview").show().attr('src',res.data.feature);
                    $("#category").val(res.data.category_id);
                    $("#status").val(res.data.status);
                    // 处理日期
                    $("#created").val(res.data.created.substring(0,16));
                }
            }
        });
    }
    else {
        // 新增页面
        CKEDITOR.replace('content');
        // 点击保存把文章保存到数据库
        $("#btn-save").on('click',function(){
            // 解决内容缺失的问题
            CKEDITOR.instances.content.updateElement();
            let data=$("#form").serialize();
            $.ajax({
                type: "post",
                url: "/addnewpost",
                data: data,
                success: function (res) {
                    console.log(res);
                    if(res.code==1){
                        alert('新增成功');
                        location.reload();
                    }
                }
            });

        });

    }
  });