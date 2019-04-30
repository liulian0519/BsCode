/**
 * created by liulian on 2019/04/19
 */
require(['jquery', 'bootstrap','login','slide'], function () {
    $(document).ready(function () {
     
       /**
        * 填充页面数据
        *  */ 
        initUI();
    })
    
    function initUI(){
        // 根据id查找信息
        var rent_id = getUrlParam('id');
        var reqData = {
            "rent_id": rent_id,
           
        };
        $.ajax({
            type: "post",
            url: "http://localhost:8080/rentHouseById",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);
                // 请开始你的表演
            }
        });



    }
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
   

   
}); 