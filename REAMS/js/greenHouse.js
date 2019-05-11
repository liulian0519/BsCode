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

        /**
         * 渲染页面总函数
         */
        initUI();
    });

    /**
     * 渲染页面总函数
     */
    function initUI(){
        $.ajax({
            type: "get",
            url: "http://localhost:8080/listCount",
            dataType: "json",
            success: function (response) {
                var count = response.count;
                var result = "";
                result +=
                '<div class="result-title">\n' +
                    '<p>已经为您找到' + response.count + '套房</p>\n' +
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
                        '<div id="realDatacopy"></div>\n' + 
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
                        /**按价格排序 */
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
    function fillData(response){
        $(".result-item").remove();
        $("#home").append(fillZonghe(response));
    }
    function fillDataCopy(response){
        $(".result-title").remove();
        $("#realData").remove();
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
        console.log(response);
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


    function accAvalue() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var address = $(".select-body .active").children("a:eq(0)").text();
        if (address == "全城") {
            address = "";
        }
  
        var current = 1;
        var heating = 2;
        var area_type = "";
        var position = "";
                    var build_use = "";
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/greenhouseBySql",
                        data: {
                            "pageNum": current,
                            "address": address,
                            "area_type": area_type,
                            "position": position,
                            "build_use": build_use,
                            "heating": heating
                        },
                        dataType: "json",
                        success: function (response) {
                            total =response.total
                            // console.log(response);
                            // console.log(response.total)
                            // /**渲染数据 */
                            // fillDataCopy(response);

                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });
                   

        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            laypage.render({
                elem: realDatacopy
                , theme: '#3072f6'
                , count: total
                , limit: 2
                , jump: function (e) {

                    console.log(e);
                    var heating = 2;
                    var area_type = "";
                    var position = "";
                    var build_use = "";
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/greenhouseBySql",
                        data: {
                            "pageNum": e.curr,
                            "address": address,
                            "area_type": area_type,
                            "position": position,
                            "build_use": build_use,
                            "heating": heating
                        },
                        dataType: "json",
                        success: function (response) {
                            console.log(response);
                            console.log(response.total)
                            /**渲染数据 */
                            fillDataCopy(response);

                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });


                }
            });
        });

    }

    function AccCheckValue(){
        if ($(this).children().is(":checked")) {
            $(this).children().prop("checked", false);
        } else {
            $(this).children().prop("checked", true);
        }
    }
}) 