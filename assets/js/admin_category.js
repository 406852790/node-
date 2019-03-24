$(function(){
    // 给小图标注册点击事件
  $(".icons").on('click',function(){
    // 把隐藏的盒子显示出来
    $(".icons-contain").toggle();
  });

  // 给显示出来的大框里面的小图标注册点击事件
  $(".icons-inner > span").on('click',function(){
    // 把之前点击出现大框的小图标的图标修改
    // 是通过修改类名来修改小图标的
    // 只需要把点的小图标的类名，获取，设置给外面的按钮即可
    let classname = $(this).attr('class');
    $(".icons>span").attr('class',this.className);
    // 把大框隐藏
    //$(".icons-contain").hide();// 因为点击小的span是会冒泡到 .icons 这个div上的，虽然这个地方让大框隐藏了但是 .icons 这个div的点击事件又让大框显示了，需要阻止冒泡 - 自己实现.
  });
})