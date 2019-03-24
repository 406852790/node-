$(function(){
    $('.pagination').twbsPagination({
        totalPages: 10,// 总页数，最大页码数 - 应该是从服务器那里获取过来的
        visiblePages: 7, // 显示的按钮的个数
        first : '首页',
        prev: '上一页',
        next : '下一页',
        last : '尾页',
    // 当分页按被点击的时候，触发的事件，默认会在初始化的时候，调用一次
        onPageClick: function (event, page) {
      // 两个参数
      //  event 是事件对象   page 是当前的页码数
            console.log('分页按钮被点击了');
            console.log(page)
    }
    })
})