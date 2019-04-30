/**
 * created by liulian on 2019/04/07
 */

require(['jquery', 'bootstrap','login','layui'], function () {

    $(document).ready(function () {
        $(".drop-menu li").bind("click",accAvalue);
        $('.ul-item-type li').bind("click",accAvalue);
        $('.ul-item-price li').bind("click",AccCheckValue);
        $('.ul-item-hole li').bind("click",AccCheckValue);
        $('.ul-item-position li').bind("click",AccCheckValue);

        // 选项卡切换
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text(); 
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text(); 
            $(".active-tab span").html(activeTab);
            $(".previous-tab span").html(previousTab);
        });

        /**
         * 查询后端分页后的数据
         */
        var current = 1;
        listByPage(current);
          
        /**根据数据进行分页layui框架 */
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
            , layer = layui.layer;
            laypage.render({
                elem: 'realData'
                , count: total //数据总数，从服务端得到
                ,limit:3
                , jump: function (obj, first) {
                    current = obj.curr;
                    console.log(obj.count)
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数
                    // document.getElementById('tab').innerHTML = thisDate(obj.curr);
                    //首次不执行
                    listByPage(obj.curr);
                    // getActivityList(obj);
                    // window.onload;
                    if (!first) {
                        //do something
                    }
                }
            });
        });

        
    });

    /**
    * 查询后端分页后的数据
    */
    function listByPage(current){
        $.ajax({
            type: "get",
            url: "http://localhost:8080/rentHouseByPage",
            data: {
                "pageNum":current
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                total = response.total;
            },
            error:function(response){
                console.log(response);
            }
        });
    }
    
    /**
     * 得到a标签值的函数
     */
    function accAvalue(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        console.log($(this).text());
    }
    /**
     * 得到多选框选中的值的函数
     */
    function AccCheckValue(){
        if($(this).children().is(":checked")){
            $(this).children().prop("checked", false);
        }else{
            $(this).children().prop("checked", true);
        }
        var chk_value = [];
        $('input[name="test"]:checked').each(function(){ 
            chk_value.push($(this).val()); 
        }); 
        console.log(chk_value);
    }
    
})