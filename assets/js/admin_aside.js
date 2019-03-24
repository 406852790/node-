$(function(){
    $.ajax({
        type: "get",
        url: "/getuserheadAndNickname",
        dataType: "json",
        success: function (res) {
            if(res.code==1){
                $('.profile> .avatar').attr('src',res.data.avatar);
                $('.profile > .name').text(res.data.nickname);
            }
        }
    });
})