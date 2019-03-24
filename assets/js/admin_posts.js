$(function(){
    // 封好请求1分页数据的接口
    function getpostbypagination(currentPage,pageSize,category_id,status){
        $.ajax({
            type: "post",
            url: "/getPostsByPagination",
            data: {
                currentPage,pageSize,category_id,status
              },// 这里需要传递两个参数，一个是当前是第几页，每页显示多少条,
            success: function (res) {
                console.log(res);
                if(res.code == 1){
                    let html = template("tp",res.data);
                    $('tbody').html(html);
                    // 数据回来之后，才能生成分页按钮
                    initPagination(currentPage,res.pageMax);
                }
            }
        });
    };
    //一开始加载页面就把文字的列表显示出来
    getpostbypagination(1,10,'all','all');

    //封装好的生成分页按钮的结构的方法
    function initPagination(currentPage,pageMax){
         // 总共显示的按钮数
        let buttonCount = 5;
        // 算出开始位置
        let start = currentPage - Math.floor(buttonCount / 2);
        if(start <= 1){
            start = 1;
          }
          // 算出结束的位置 ,不是根据当前算出的
          let end = start + (buttonCount - 1);
          // 开始位置有最小，请问，结束位置是否有最大？ 肯定有最大位置，但是这个最大位置，不是一定的，而是必须从服务端，计算回来的
          if(end >= pageMax){
            end = pageMax;
            // 此时有能会造成，前面的按钮个数不够 ,需要重新计算开始的页码
            start = end - (buttonCount - 1);
            // 重新计算了开始位置之后，还是可能导致开始页码小于等于1，还是需要重新设定
            if(start <=1){
              start = 1;
            }
          }
        
          let html = "";
          // 当当前页不是第一页，就有上一页
          if(currentPage != 1){
            html += `<li><a data-index="${currentPage-1}" href="javascript:void(0);">上一页</a></li>`
          }
          // 根据开头结尾生成结构
          for(let i = start; i <= end; i++){
            html += `<li><a data-index="${i}" href="javascript:void(0);">${i}</a></li>`;
          }
          // 当前页不是最后一页，就还有下一页
          if(currentPage != pageMax){
            html += `<li><a data-index="${currentPage+1}" href="javascript:void(0);">下一页</a></li>`
          }
          // 把累加好的结构，放到ul里面
          $('.pagination').html(html);
        }

     // 也要使用委托的方式注册
  $(".pagination").on('click','a',function(){
    // 根据当前点击的按钮，得到对应要切换的页码
    // 我们在生成结构的时候，使用了一个自定义属性 data-index 存储了这个a标签对应的页码数，只要得到这个a标签的自定义属性即可
    let index= parseInt($(this).attr('data-index'));

    let category_id = $("#category_id").val();
    let status = $("#status").val();
    // 根据页码请求数据
    getpostbypagination(index,10,category_id,status);
  });


  /// 动态的加载所有的分类
  $.ajax({
    type: "post",
    url: "/getAllCategories",
    success: function (res) {
      console.log(res.data);
      if(res.code == 1){
        // 把动态获取的分类，生成下拉框
        let html = `<option value="all">所有分类</option>`;
        for(let i = 0; i < res.data.length; i++){
          html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
        }
        $("#category_id").html(html);
      }
    }
  });

  // 点击筛选按钮
  $("#filter").on('click',function(){
    // 根据已经选好的条件，把这些筛选的条件，发送到服务器，筛选出数据
    let category_id = $("#category_id").val();
    let status = $("#status").val();
    console.log(category_id,status);
    // 获取了筛选的条件，把筛选的条件发送回服务端即可
    getpostbypagination(1,10,category_id,status);
  });





})