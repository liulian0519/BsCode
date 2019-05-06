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
                ,limit:1
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
                // console.log(response);
                total = response.total;
                fillData(response);
                
            },
            error:function(response){
                console.log(response);
            }
        });
    }
    function listByPagetest(current){
        $.ajax({
            type: "get",
            url: "http://localhost:8080/rentHouseByTime",
            data: {
                "pageNum":current
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                total = response.total;
                fillData(response);
                
            },
            error:function(response){
                console.log(response);
            }
        });
    }
    function fillData(response){
        console.log(response.list);
        $(".result-title").remove();
        $("#myTab").remove();
        $('.tab-content').remove();
        var result = "";
        
        result += 
        '<div class="result-title">\n'+
            '<p>已经为您找到112套房</p>\n'+
        '</div>\n'+
        '<ul id="myTab" class="nav nav-tabs">\n'+
            '<li class="active"><a href="#home" data-toggle="tab">综合排序</a></li>\n'+
            '<li><a href="#latest" data-toggle="tab">最新上架</a></li>\n'+
            '<li><a href="#price" data-toggle="tab">价格</a></li>\n'+
            '<li><a href="#area" data-toggle="tab">面积</a></li>\n'+
        '</ul>\n'+
        '<div id="myTabContent" class="tab-content">\n'+
            '<div class="tab-pane fade in active" id="home">\n'
            for(var i = 0;i<response.list.length;i++){
                result +=
                '<div class="result-item">\n'+
                    '<div class="result-img">\n'+
                        '<a href="detilHouse.html?id='+response.list[i].id+'">\n'+
                            '<img style="width:250px; height:182px;" src="'+ response.list[i].url[0] +'" />\n'+
                        '</a>\n'+
                    '</div>\n'+
                    '<div class="result-detil">\n'+
                        '<div class="detil-house">\n'+
                            '<span>'+ response.list[i].name +'</span>\n'+
                            '<span>' + response.list[i].area_type + '</span>\n'+
                        '</div>\n'+
                        '<div class="detil-address">\n'+
                            '<span>'+ response.list[i].address+'</span>\n'+
                            '<span>'+ response.list[i].area +'</span>\n'+
                            '<span>'+ response.list[i].position+'</span>\n'+
                        '</div>\n'+
                        '<div class="detil-time">\n'+
                            '<i class="iconfont iconshijian"></i><span>'+response.list[i].con_time+'</span>\n'+
                        '</div>\n'+
                        '<div class="ddetil-type">\n'+
                            '<button class="btn" disabled>近地铁</button>\n'+
                            '<button class="btn" disabled>'+ response.list[i].heating +'</button>\n'+
                            '<button class="btn" disabled>随时看房</button>\n'+
                        '</div>\n'+
                        '<div class="detil-price">\n'+
                            '<span>'+response.list[i].price +'/月</span>\n'+
                        '</div>\n'+
                    '</div>\n'+
                    '<hr>\n'+
                '</div>\n'
            }
            result +=
            '</div>\n'+
            '<div class="tab-pane fade" id="latest">\n'
            for(var i = 0;i<response.list.length;i++){
                result +=
                '<div class="result-item">\n'+
                    '<div class="result-img">\n'+
                        '<a href="detilHouse.html?id='+response.list[i].id+'">\n'+
                            '<img style="width:250px; height:182px;" src="'+ response.list[i].url[0] +'" />\n'+
                        '</a>\n'+
                    '</div>\n'+
                    '<div class="result-detil">\n'+
                        '<div class="detil-house">\n'+
                            '<span>'+ response.list[i].name +'</span>\n'+
                            '<span>' + response.list[i].area_type + '</span>\n'+
                        '</div>\n'+
                        '<div class="detil-address">\n'+
                            '<span>'+ response.list[i].address+'</span>\n'+
                            '<span>'+ response.list[i].area +'</span>\n'+
                            '<span>'+ response.list[i].position+'</span>\n'+
                        '</div>\n'+
                        '<div class="detil-time">\n'+
                            '<i class="iconfont iconshijian"></i><span>'+response.list[i].con_time+'</span>\n'+
                        '</div>\n'+
                        '<div class="ddetil-type">\n'+
                            '<button class="btn" disabled>近地铁</button>\n'+
                            '<button class="btn" disabled>'+ response.list[i].heating +'</button>\n'+
                            '<button class="btn" disabled>随时看房</button>\n'+
                        '</div>\n'+
                        '<div class="detil-price">\n'+
                            '<span>'+response.list[i].price +'/月</span>\n'+
                        '</div>\n'+
                    '</div>\n'+
                    '<hr>\n'+
                '</div>\n'
            }
            result += 
            '</div>\n'+
            '<div class="tab-pane fade" id="price">\n'+
                '<p>按价格排序。</p>\n'+
            '</div>\n'+
            '<div class="tab-pane fade" id="area">\n'+
                '<p>按面积。</p>\n'+
            '</div>\n'+
        '</div>\n'

        $(".select-result").append(result);
        
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