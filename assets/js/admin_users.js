$(function(){
    $.ajax({
        type: "post",
        url: "/getAllUsers",
        success: function (res) {
            if(res.code==1){
                let html=template("tp",res.data);
                $('tbody').html(html);
            }
            
        }
    });
    $('#add_user').on('click',function(){
        // 邮箱验证
        let email=$('#email').val();
        if(!/^\w+[@]\w+[.]\w+$/.test(email)){
            $('.alert').removeClass('hidden').children('span').text('邮箱格式错误');
            return;
        };
        // 别名验证
        let slug=$('#slug').val();
        if(slug.trim().length == 0){
            $('.alert').removeClass('hidden').children('span').text('别名不能为空');
            return;
        };
        // 昵称验证
        let nickname=$('#nickname').val();
        if(nickname.trim().length == 0){
            $('.alert').removeClass('hidden').children('span').text('昵称不能为空');
            return;
        };
        // 密码验证
        let password=$('#password').val();
        if(password.trim().length <= 3  || password.trim().length >= 12){
            $('.alert').removeClass('hidden').children('span').text('密码长度应该为3-12位之间')
        };
        let data=$("#form").serialize();
        $.ajax({
            type:'post',
            url:'/addNewuser',
            data:data,
            dataType:'json',
            success:function(res){
                if(res.code==1){
                    alert('新增成功');
                    // 刷新页面
                    location.reload();
                }
            }
        });
    });

    // 根据id查找用户信息
    // 1 点击编辑按钮
    // 因为所有的编辑按钮都是动态生成，所以需要使用委托的方式注册事件
    $('tbody').on('click','.edit',function(){
         // 把id存储到了这个a标签所对应的tr上面
        let id = $(this).parent().parent().attr('data-userid');
        // let id = $(this).parent().parent().attr('data-userid');
        //  使用ajax获取服务器中的数据，获取最新的id
        $.ajax({
            type:'post',
            url:'/getUserbyid',
            data:{
                id:id
            },
            dataType:'json',
            success:function(res){
                if(res.code==1){
                    // 把得到的数据填入左边的表单中
                    $("#email").val(res.data.email);
                    $("#slug").val(res.data.slug);
                    $("#nickname").val(res.data.nickname);
                    $("#password").val(res.data.password);
                    $(".add").addClass('hidden').next().removeClass('hidden');
                    let form=$('#form');
                    if(form.children().eq(0).attr('type')=='hidden'){
                        form.children().eq(0).val(id);
                    }else{
                        // 否则就创建
                        var hidden = $('<input type="hidden" name="id" value="' + id + '">');
                        // 把表单放在最前面
                        form.prepend(hidden);
                    }
                }
            }
        });
    });

    // 点击保存时修改用户数据，
    $('#btn-save').on('click',function(){
        // 邮箱验证
        let email=$('#email').val();
        if(!/^\w+[@]\w+[.]\w+$/.test(email)){
            $('.alert').removeClass('hidden').children('span').text('邮箱格式错误');
            return;
        };
        // 别名验证
        let slug=$("#slug").val();
        if(slug.trim().length==0){
            $('.alert').removeClass('hidden').children('span').text('别名不能为空');
            return;
        };
        // 昵称验证
        let nickname=$('#nickname').val();
        if(nickname.trim().length == 0){
            $('.alert').removeClass('hidden').children('span').text('昵称不能为空');
            return;
        };
        // 密码验证
        let password=$('#password').val();
        if(password.trim().length <= 3  || password.trim().length >= 12){
            $('.alert').removeClass('hidden').children('span').text('密码长度应该为3-12位之间')
        };
        let data=$("#form").serialize();
        $.ajax({
            type:'post',
            url:'/updateUserById',
            data:data,
            dataType:'json',
            success:function(res){
                if(res.code==1){
                    alert('修改成功');
                    // 刷新页面
                    location.reload();
                }
            }
        });

    });

     // 点击取消 -- 要做的事情：1 把输入框清空，2 把保存和取消隐藏，把添加显示 3 把动态生成的隐藏域，移除

     $('#btn-cancel').on('click',function(){
        $("#email").val('');
        $("#slug").val('');
        $("#nickname").val('');
        $("#password").val('');
        $(".add").removeClass('hidden').next().addClass('hidden');
        let form=$('#form')
        if(form.children().eq(0).attr('type')=='hidden'){
            form.children().eq(0).remove();
        }

     })

    // 批量删除
    // 1 全选反选 2 点击批量删除，把选中的数据同时删掉
    // 全选反选
     $('thead input').on('click',function(){
          // 设置下面的多选框跟当前这个多选的选中状态一致
          let status=$(this).prop('checked')
          $('tbody input').prop('checked',status);
            // 如果是全选，把批量删除显示
            if(status){
                $('#multiple').show();
            }else{
                $('#multiple').hide();
            }
     });

    //  下面多选框的点击
    $('tbody').on('click','input',function(){
        // 判断选中的个数和多选框的个数是否一致
        let cks=$('tbody input');
        let checks=$('tbody input:checked');
        if(cks.size()==checks.size()){
            $('thead input').prop('checked',true);
        }else{
            $('thead input').prop('checked',false);
        };
        if(checks.size()>=2){
            $('#multiple').show();
        }else{
            $('#multiple').hide();
        }
    });

    // 点击批量删除
    $('#multiple').on('click',function(){
        if(!confirm('您确定要删除这些数据吗')) return ;
        // 获取勾选的id
        let ids=[];
        let checks=$('tbody input:checked');
        checks.each(function(i,e){
            let id=$(e).parent().parent().attr('data-userid');
            ids.push(id);
        })
        $.ajax({
            type:'get',
            url:'/delUserById',
            data:{
                ids : ids
            },
            dataType:'json',
            success:function(res){
                if(res.code==1){
                    alert('删除成功');
                    // 刷新页面
                    location.reload();
                }else{
                    alert('删除失败')
                }
            }
        });
    });



});