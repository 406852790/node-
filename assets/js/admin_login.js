$(function(){
    // 点击登录按钮，实现用户的登录
    $("#btn-login").on('click',function(){
        // 验证表单
        let email=$("#email").val();
        let password=$("#password").val();
        // 验证邮箱是否满足规律
        if(!/^\w+[@]\w+[.]\w+$/.test(email)){
            $('.alert').removeClass('hidden').children('span').text('邮箱格式不正确');
            return;
          }

          let data = $('.login-wrap').serialize();
          console.log(data);
          // 发送请求
          $.ajax({
            type: "post",
            url: "/admin_login",
            data: data ,
            dataType: "json",
            success: function (response) {
              // console.log(response);
              if(response.code == 1){
                // 登录成功，可以提示一下，也可以不提示，直接跳转到主页
                location.href = '/admin';
              }else {
                // 提示用户
                $('.alert').removeClass('hidden').children('span').text(response.message);
              }
            }
          });  
    });



})