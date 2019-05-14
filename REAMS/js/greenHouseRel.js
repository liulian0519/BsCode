/**
 * created by liulian on 2019/04/27
 */

require(['jquery', 'bootstrap','login','layui'], function () {

    $(document).ready(function () {
        $(".drop-menu li").bind("click", accAvalue);
        $('.ul-item-type li').bind("click", AccCheckValue);
        $('.ul-item-position li').bind("click", AccCheckValue);
        $('.ul-item-use li').bind("click", AccCheckValue);
        $('.ul-item-heating li').bind("click", AccCheckValue);
         // 选项卡切换
         $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            $(".active-tab span").html(activeTab);
            $(".previous-tab span").html(previousTab);
        });
        var cookie = getCookie('phone');
        console.log(cookie);
        var phone = cookie.substring(0, 3) + '****' + cookie.substring(7, 11);
        if(cookie!=null&&cookie!=""){
            var result = "";
            result +=
            '<li id="nothing">\n'+
            '<a href="order.html"><span>欢迎您！'+phone+'</span></a>\n'+
            '</li>\n'+
            '<li id="nothing">\n'+
            '<a class="logout" href="#"><span>退出</span></a>\n'+
            '</li>\n';
            $('#t').addClass('hide');
            $("#list").append(result);
        }
        $(".logout").bind("click", function(){
            alert("退出成功");
            setCookie('phone', "",  -1);
            window.location.reload();
        });
        var name = getUrlParam('name');
        if(name){
            search(name);
        }
        
        /**
         * 搜索框搜索
         */
        $('.search-input').keydown(function (e) {
            var event = window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode == 13) {
                var val = $(this).val();
                /**触发搜索事件 */
                search(val);
            }
        });
          
  

        /**
         * 渲染页面总函数
         */
        if(!name){
            initUI(); 
        }
        
      
        // console.log(name)
           
    });
    function getUrlParam(name) {
        var search = decodeURIComponent(location.search);
        var reg = new RegExp(".*" + name + "\\=" + "([^&]*)(&?.*|)", "g");
        return search.replace(reg, "$1");
        // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // var r = window.location.search.substr(1).match(reg);
        // if (r != null) return unescape(r[2]); return null;
    }
    function initUI(){
        $.ajax({
            type: "get",
            url: "http://localhost:8080/listCount",
            dataType: "json",
            success: function (response) {
                fillNum(response);
                var count = response.count;
                /**
                 * 默认排序分页
                 */
                fillMoren(count);
                $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
                    var text = $(e.target).text();
                    console.log(text);
                    if (text == "综合排序") {
                        /**综合排序分页 */
                        fillMoren(count);
                    }
                    if (text == "最新") {
                        /**最新上架分页 */
                        fillTime(count);
                    }
                    if (text == "总价") {
                        /**按面积排序 */
                        fillPrice(count);
                    }
                    if (text == "面积") {
                        /**按面积排序 */
                        fillArea(count);
                    }
                })

            },
            error:function(response){
                console.log(response);
            }
        });
    }
    function fillNum(response){
        var num;
        var count = response.count;
        var total = response.total;
        
        if(count>0){
            num = count;
           
        }
        if(total>0){
            num = total;
        }
        console.log(num);
        var result = "";
        result +=
        '<div class="result-title">\n' +
            '<p>已经为您找到' + num + '套房</p>\n' +
        '</div>\n' +
        '<ul id="myTab" class="nav nav-tabs">\n' +
            '<li class="active"><a href="#home" data-toggle="tab">综合排序</a></li>\n' +
            '<li><a href="#latest" data-toggle="tab">最新</a></li>\n' +
            '<li><a href="#price" data-toggle="tab">总价</a></li>\n' +
            '<li><a href="#area" data-toggle="tab">面积</a></li>\n' +
        '</ul>\n' +
        '<div id="myTabContent" class="tab-content">\n' +
        '<div class="tab-pane fade in active" id="home">\n' +
        // '<p>moren</p>\n'+  
        '<div id="realData"></div>\n' + 
        // '<div id="realDatacopy"></div>\n' + 
        '</div>\n' +
        '<div class="tab-pane fade" id="latest">\n' +
        // '<p>最新</p>\n'+ 
        '<div id="realData2"></div>\n' +  
        '</div>\n' +
        '<div class="tab-pane fade" id="price">\n' +
        // '<p>总价</p>\n'+ 
        '<div id="realData3"></div>\n' +    
        '</div>\n' +
        '<div class="tab-pane fade" id="area">\n' +
        // '<p>面积</p>\n'+   
        '<div id="realData4"></div>\n' +   
        '</div>\n' +
        '</div>\n'
        $(".select-result").append(result);
    }
     /**
     * 综合排序分页
     */
    function fillMoren(count){
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;
               
            laypage.render({
                elem: realData
                , theme: '#3072f6'
                , count: count
                , limit: 2
                , jump: function (e) {
                    $.ajax({
                        type: "get",
                        url: "http://localhost:8080/greenhouseByPage",
                        data: {
                            "pageNum": e.curr
                        },
                        dataType: "json",
                        success: function (response) {
                            /**渲染数据 */
                            
                            fillData(response);

                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });
                }
            });
        });
    }

     /**
     * 最新的分页
     * @param {} response 
     */
    function fillTime(count) {

        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            laypage.render({
                elem: realData2
                , theme: '#3072f6'
                , count: count
                , limit: 2
                , jump: function (e) {

                    $.ajax({
                        type: "get",
                        url: "http://localhost:8080/greenhouseByTime",
                        data: {
                            "pageNum": e.curr
                        },
                        dataType: "json",
                        success: function (response) {
                            /**渲染数据 */
                            fillLatest(response);

                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });

                }
            });
        });
    }
        /**
     * 按价格降序分页
     */
    function fillPrice(count) {
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            laypage.render({
                elem: realData3
                , theme: '#3072f6'
                , count: count
                , limit: 2
                , jump: function (e) {

                    $.ajax({
                        type: "get",
                        url: "http://localhost:8080/greenhouseByPrice",
                        data: {
                            "pageNum": e.curr
                        },
                        dataType: "json",
                        success: function (response) {
                            /**渲染数据 */
                            fillPriceAll(response);

                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });

                }
            });
        });
    }

     /**
     * 按面积升序分页
     */
    function fillArea() {
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            laypage.render({
                elem: realData4
                , theme: '#3072f6'
                , count: 4
                , limit: 2
                , jump: function (e) {

                    $.ajax({
                        type: "get",
                        url: "http://localhost:8080/greenhouseByArea",
                        data: {
                            "pageNum": e.curr
                        },
                        dataType: "json",
                        success: function (response) {
                            /**渲染数据 */
                            fillAreaAll(response);

                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });

                }
            });
        });
    }

    /**
     * 综合排序渲染数据
     */
    function fillData(response){
        $(".result-item").remove();
        $("#home").append(fillZonghe(response));
    }
 
    /**
     * 
     * @param {*} response 
     * 最新的渲染数据
     */
    function fillLatest(response) {
        $(".result-item").remove();
        $("#latest").append(fillZonghe(response));
    }
    /**
     * 
     * @param {*} response 
     * 按价格降序渲染数据
     */
    function fillPriceAll(response) {
        $(".result-item").remove();
        $("#price").append(fillZonghe(response));
    }
    /**
     * 按面积升序渲染数据
     * @param {*} response 
     */
    function fillAreaAll(response) {
        $(".result-item").remove();
        $("#area").append(fillZonghe(response));
    }
    /**
     * 数据公共部分
     */
    function fillZonghe(response){
       
        var detil = "";
        for(var i=0;i<response.list.length;i++){
            detil +=
            '<div class="result-item">\n'+
                '<div class="result-img">\n'+
                    '<a href="greenHouseDetil.html?id=' + response.list[i].id + '">\n' +
                        '<img src="'+response.list[i].url[0]+'">\n'+
                    '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                    '<div class="detil-title">\n'+
                        '<span class="name">\n'+
                            '<a href="greenHouseDetil.html?id=' + response.list[i].id + '">'+response.list[i].name+'|'+response.list[i].area_type+'|'+response.list[i].position+'</a>\n'+
                        '</span>\n'+
                    '</div>\n'+
                    '<div class="detil-content">\n'+
                        '<a><i class="iconfont iconditu"></i>'+response.list[i].address+'</a>\n'+
                        '<a><i class="iconfont iconfangzi1"></i>'+response.list[i].floor+' | '+response.list[i].build_time+'建 | '+response.list[i].area_type+' | '+response.list[i].area+'平方米 | '+response.list[i].position+' </a>\n'+
                        '<a><i class="iconfont iconshijian"></i>' + response.list[i].con_time + '</a>\n' +
                        '</div>\n'+
                    '<div class="detil-surround">\n'+
                        '<span class="block-type" style="background: #FB9252;">'+response.list[i].build_use+'</span>\n'+
                        '<span class="surround-type">随时看房</span>\n'+
                    '</div>\n'+
                    '<div class="detil-price">\n' +
                        '<p>'+response.list[i].price+'<span>万</span></p>\n' +
                    '</div>\n' +
                '</div>\n' +
                '<hr>\n' +
            '</div>\n'              
        }
        return detil;
        
    }

    function fillZonghe2(response){
       
        var detil = "";
        for(var i=0;i<response.length;i++){
            detil +=
            '<div class="result-item">\n'+
                '<div class="result-img">\n'+
                    '<a href="greenHouseDetil.html?id=' + response[i].id + '">\n' +
                        '<img src="'+response[i].url[0]+'">\n'+
                    '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                    '<div class="detil-title">\n'+
                        '<span class="name">\n'+
                            '<a href="greenHouseDetil.html?id=' + response[i].id + '">'+response[i].name+'|'+response[i].area_type+'|'+response[i].position+'</a>\n'+
                        '</span>\n'+
                    '</div>\n'+
                    '<div class="detil-content">\n'+
                        '<a><i class="iconfont iconditu"></i>'+response[i].address+'</a>\n'+
                        '<a><i class="iconfont iconfangzi1"></i>'+response[i].floor+' | '+response[i].build_time+'建 | '+response[i].area_type+' | '+response[i].area+'平方米 | '+response[i].position+' </a>\n'+
                        '<a><i class="iconfont iconshijian"></i>' + response[i].con_time + '</a>\n' +
                        '</div>\n'+
                    '<div class="detil-surround">\n'+
                        '<span class="block-type" style="background: #FB9252;">'+response[i].build_use+'</span>\n'+
                        '<span class="surround-type">随时看房</span>\n'+
                    '</div>\n'+
                    '<div class="detil-price">\n' +
                        '<p>'+response[i].price+'<span>万</span></p>\n' +
                    '</div>\n' +
                '</div>\n' +
                '<hr>\n' +
            '</div>\n'              
        }
        return detil;
        
    }
    /**
     * 得到标签页值并渲染数据
     */
    function accAvalue() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var address = $(".select-body .active").children("a:eq(0)").text();
        if (address == "全城") {
            address = "";
        }
        console.log(address);
        
        var heating = 2;
        var area_type = "";
        var position = "";
        var build_use = "";

        var reqData = {
            "address":address,
            "area_type":area_type,
            "position":position,
            "build_use":build_use,
            "heating":heating 
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/greenhouseBysql",
            data: reqData,
            dataType: "json",
            success: function (response) {
                /**渲染数据 */
                fill(response.greenHouseTests);
            },
            error: function (response) {
                console.log(response);
            }
        });
    }
    function fill(response) {
        $(".result-title").remove();
        $(".nav-tabs").remove();
        $(".tab-content").remove();
        
        var count = response.length;
        var result = "";
        result +=
            '<div class="result-title">\n' +
            '<p>已经为您找到' + count + '套房</p>\n' +
            '</div>\n' +
            '<ul id="myTab" class="nav nav-tabs">\n' +
            '<li class="active"><a href="#home" data-toggle="tab">综合排序</a></li>\n' +
            '<li><a href="#latest" data-toggle="tab">最新</a></li>\n' +
            '<li><a href="#price" data-toggle="tab">价格</a></li>\n' +
            '<li><a href="#area" data-toggle="tab">面积</a></li>\n' +
            '</ul>\n' +
            '<div id="myTabContent" class="tab-content">\n' +
            '<div class="tab-pane fade in active" id="home">\n' +
            // '<p>moren排序。</p>\n'+
            '<div id="realData"></div>\n' +
            '</div>\n' +
            '<div class="tab-pane fade" id="latest">\n' +
            // 按时间排序
            // '<p>按shijians排序。</p>\n'+
            '<div id="realData2"></div>\n' +
            '</div>\n' +
            '<div class="tab-pane fade" id="price">\n' +
            // '<p>按价格排序。</p>\n' +
            '<div id="realData3"></div>\n' +
            '</div>\n' +
            '<div class="tab-pane fade" id="area">\n' +
            // '<p>按面积。</p>\n' +
            '<div id="realData4"></div>\n' +
            '</div>\n' +
            '</div>\n'
        $(".select-result").append(result);
        $("#home").append(fillZonghe2(response));
        
        var newDataTime = response;
        newDataTime.sort(timedown);

        $("#latest").append(fillZonghe2(newDataTime));

        var newDataPrice = response;
        newDataPrice.sort(pricedown);

        $("#price").append(fillZonghe2(newDataPrice));

        var newDataArea = response;
        newDataArea.sort(areaup);

        $("#area").append(fillZonghe2(newDataArea));
    }
    // 时间降序函数
    function timedown(x, y) {
        return new Date(y.con_time).getTime() - new Date(x.con_time).getTime()
    }
    // 价钱降序函数
    function pricedown(x, y) {
        return x.price - y.price;
    }
    // 面积降序函数
    function areaup(x, y) {
        return x.area - y.area;
    }
   /**
    * 多选框按钮事件
    */
    function AccCheckValue(){
        if ($(this).children().is(":checked")) {
            $(this).children().prop("checked", false);
        } else {
            $(this).children().prop("checked", true);
        }

        var area_type = "";
        $('input[name="type"]:checked').each(function () {
            if ($(this).val() == "4室以上") {
                var a = '5室';
                area_type += a;

            } else {
                area_type += $(this).val();
            }

        });
        var position = "";
        $('input[name="position"]:checked').each(function () {
            position += $(this).val();
        });
        var address = $(".select-body .active").children("a:eq(0)").text();
        if (address == "全城") {
            address = "";
        }
        var use = "";
        $('input[name="use"]:checked').each(function () {
            use += $(this).val();
        });
        var heating = 2;
        $('input[name="heating"]:checked').each(function () {
            if($(this).val() == "集中供暖"){
                heating=1;
            }else if($(this).val() == "自供暖"){
                heating = 0;
            }else{
                heating = 2
            }
        });
        var reqData = {
            "address":address,
            "area_type":area_type,
            "position":position,
            "build_use":use,
            "heating":heating
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/greenhouseBysql",
            data: reqData,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                // console.log(response.rentHouseTests.length)
                /**渲染数据 */
                fill(response.greenHouseTests);
            },
            error: function (response) {
                console.log(response);
            }
        });
    }
    
    /**
     * 搜索事件
     */
    function search(val) {
        var name = val;
        var reqData = {
            "name": name
        }

        $.ajax({
            type: "post",
            url: "http://localhost:8080/slectByName",
            data: reqData,
            dataType: "json",
            success: function (response) {
              
                /**渲染数据 */
                fill(response.greenHouseTests);
            },
            error: function (response) {
                console.log(response);
            }
        });

    }
}) 