/**
 * created by liulian on 2019/04/13
 */

require(['jquery', 'bootstrap', 'login', 'layui'], function () {

    $(document).ready(function () {
        $(".drop-menu li").bind("click", accAvalue);
        $(".ul-item-perPrice li").bind("click", AccCheckValue);
        $(".ul-item-area li").bind("click", AccCheckValue);
        $(".ul-item-type li").bind("click", AccCheckValue);
        $(".ul-item-status li").bind("click", AccCheckValue);

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

        /**渲染页面总函数 */
        if(!name){
     
            initUI();
        }

    });
    function getUrlParam(name) {
        var search = decodeURIComponent(location.search);
        var reg = new RegExp(".*" + name + "\\=" + "([^&]*)(&?.*|)", "g");
        return search.replace(reg, "$1");
        // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // var r = window.location.search.substr(1).match(reg);
        // if (r != null) return unescape(r[2]); return null;
    }
    /**
     * 渲染页面总函数
     */
    function initUI() {

        $.ajax({
            type: "get",
            url: "http://localhost:8080/newHouseList",
            dataType: "json",
            success: function (response) {
                // console.log(response.length);
                var count = response.length;
                var result = "";
                result +=
                    '<div class="result-title">\n' +
                    '<p>已经为您找到' + count + '套房</p>\n' +
                    '</div>\n' +
                    '<ul id="myTab" class="nav nav-tabs">\n' +
                    '<li class="active"><a href="#home" data-toggle="tab">默认排序</a></li>\n' +
                    '<li><a href="#price" data-toggle="tab">价钱</a></li>\n' +

                    '</ul>\n' +
                    '<div id="myTabContent" class="tab-content">\n' +
                    '<div class="tab-pane fade in active" id="home">\n' +
                    // '<p>moren</p>\n'+ 
                    '<div id="realData"></div>\n' +
                    '</div>\n' +
                    '<div class="tab-pane fade" id="price">\n' +
                    // '<p>价钱</p>\n' +
                    '<div id="realData2"></div>\n' +
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
                    if (text == "默认排序") {
                        /**综合排序分页 */
                        fillMoren(count);
                    }
                    if (text == "价钱") {
                        /**价钱分页 */
                        fillPrice(count);
                    }

                })

            },
            error: function (response) {
                console.log(response);
            }
        });
    }

    /**
    * 综合排序分页
    */
    function fillMoren(count) {
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
                        url: "http://localhost:8080/newHouseByPage",
                        data: {
                            "pageNum": e.curr
                        },
                        dataType: "json",
                        success: function (response) {
                            // console.log(response)
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
     * 价格降序分页
     * @param {*} response 
     */
    function fillPrice(count) {
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
                        url: "http://localhost:8080/newHouseByPrice",
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
    function fillData(response) {
        $(".result-item").remove();
        $("#home").append(fillZonghe(response));
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
    * 数据公共部分
    */
    function fillZonghe(response) {
        // console.log(response);
        var housetype = new Array();
        for (var i = 0; i < response.list.length; i++) {
            housetype.push(response.list[i].area_type);
        }
        var detil = "";
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].status == 0) {
                response.list[i].status = '预售';
                var ba = "#Fc7B75"
            } else if (response.list[i].status == 1) {
                response.list[i].status = '在售';
                var ba = "#FB9295"
            } else {
                response.list[i].status = '售罄';
                var ba = "#849aae"
            }
            if (response.list[i].type == "普通住宅" || response.list[i].type == "住宅") {
                var typeBg = "#59A5EB";
            } else {
                var typeBg = "#B199ff";
            }
            detil +=
                '<div class="result-item">\n' +
                '<div class="result-img">\n' +
                '<a href="newHouseDetil.html?id=' + response.list[i].id + '">\n' +
                '<img src="' + response.list[i].url[0] + '">\n' +
                '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                '<div class="detil-title">\n' +
                '<span class="name">\n' +
                '<a href="newHouseDetil.html?id=' + response.list[i].id + '">' + response.list[i].name + '</a>\n' +
                '</span>\n' +
                '<span class="block-type" style="background: ' + ba + ';">' + response.list[i].status + '</span>\n' +
                '<span class="block-type" style="background: ' + typeBg + ';">' + response.list[i].type + '</span>\n' +
                '</div>\n' +
                '<div class="detil-content">\n' +
                '<a><i class="iconfont iconditu"></i>' + response.list[i].address + '</a>\n' +
                '<a><i class="iconfont iconfangzi1"></i>户型 ' + housetype[i] + ' </a>\n' +
                '</div>\n' +
                '<div class="detil-surround">\n' +
                '<span class="surround-type" style="background: ' + ba + '; color:#fff">' + response.list[i].status + '</span>\n' +
                '<span class="surround-type">随时看房</span>\n' +
                '</div>\n' +
                '<div class="detil-price">\n' +
                '<p>' + response.list[i].price + '<span>元/平</span></p>\n' +
                '</div>\n' +
                '</div>\n' +
                '<hr>\n'
        }
        return detil;

    }

    /**
     * 得到a标签值的函数
     */
    function accAvalue() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        console.log($(this).text());

        var address = $(".select-body .active").children("a:eq(0)").text();
        if (address == "全城") {
            address = "";
        }
        var price = "";
        var heating = "";
        var status = 3;
        var type = "";
        var reqData = {
            "address": address,
            "price": price,
            "heating": heating,
            "status": status,
            "type": type
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/newHouseBySql",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);

                /**渲染数据 */
                fill(response.newHouseTests);
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
            '<li class="active"><a href="#home" data-toggle="tab">默认排序</a></li>\n' +
            '<li><a href="#price" data-toggle="tab">价钱</a></li>\n' +

            '</ul>\n' +
            '<div id="myTabContent" class="tab-content">\n' +
            '<div class="tab-pane fade in active" id="home">\n' +
            // '<p>moren</p>\n'+ 
            '<div id="realData"></div>\n' +
            '</div>\n' +
            '<div class="tab-pane fade" id="price">\n' +
            // '<p>价钱</p>\n' +
            '<div id="realData2"></div>\n' +
            '</div>\n' +

            '</div>\n'
        $(".select-result").append(result);
        $("#home").append(fillZonghe2(response));
    }
    function fillZonghe2(response) {
        var detil = "";
        var housetype = new Array();
        for (var i = 0; i < response.length; i++) {
            housetype.push(response[i].area_type);
        }
        var detil = "";
        for (var i = 0; i < response.length; i++) {
            if (response[i].status == 0) {
                response[i].status = '预售';
                var ba = "#Fc7B75"
            } else if (response[i].status == 1) {
                response[i].status = '在售';
                var ba = "#FB9295"
            } else {
                response[i].status = '售罄';
                var ba = "#849aae"
            }
            if (response[i].type == "普通住宅" || response[i].type == "住宅") {
                var typeBg = "#59A5EB";
            } else {
                var typeBg = "#B199ff";
            }
            detil +=
                '<div class="result-item">\n' +
                '<div class="result-img">\n' +
                '<a href="newHouseDetil.html?id=' + response[i].id + '">\n' +
                '<img src="' + response[i].url[0] + '">\n' +
                '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                '<div class="detil-title">\n' +
                '<span class="name">\n' +
                '<a href="newHouseDetil.html?id=' + response[i].id + '">' + response[i].name + '</a>\n' +
                '</span>\n' +
                '<span class="block-type" style="background: ' + ba + ';">' + response[i].status + '</span>\n' +
                '<span class="block-type" style="background: ' + typeBg + ';">' + response[i].type + '</span>\n' +
                '</div>\n' +
                '<div class="detil-content">\n' +
                '<a><i class="iconfont iconditu"></i>' + response[i].address + '</a>\n' +
                '<a><i class="iconfont iconfangzi1"></i>户型 ' + housetype[i] + ' </a>\n' +
                '</div>\n' +
                '<div class="detil-surround">\n' +
                '<span class="surround-type" style="background: ' + ba + '; color:#fff">' + response[i].status + '</span>\n' +
                '<span class="surround-type">随时看房</span>\n' +
                '</div>\n' +
                '<div class="detil-price">\n' +
                '<p>' + response[i].price + '<span>元/平</span></p>\n' +
                '</div>\n' +
                '</div>\n' +
                '<hr>\n'
        }
        return detil;
    }
    /** 
     * 得到多选框选中的值的函数
     */
    function AccCheckValue() {
        if ($(this).children().is(":checked")) {
            $(this).children().prop("checked", false);
        } else {
            $(this).children().prop("checked", true);
        }
        var price = "";
        var priceLast = "";
        $('input[name="price"]:checked').each(function () {
            var p = $(this).val();
            console.log(p);
            if (p.indexOf('元/m²以上') >= 0) {
                price += p.replace('元/m²以上', '-10000000');

            } else if (p.indexOf('元/m²以下') >= 0) {
                console.log("11")
                var test = p.replace('元/m²以下', '');
                var p = '0-'
                price += p + test;

            } else {
                price += p.replace('元/m²', '');
            }
        });
        var rr = []
        rr = price.split("-");
        var first = rr[0];
        var last = rr[rr.length - 1];
        priceLast = first + "-" + last;
        if(first){
            priceLast = first + "-" + last;
        }else{
            priceLast = "";
        }
        
        console.log(priceLast)
        var address = $(".select-body .active").children("a:eq(0)").text();
        if (address == "全城") {
            address = "";
        }
        var heating = "";
        $('input[name="heating"]:checked').each(function () {
            heating += $(this).val();
        });
        var status = 3;
        $('input[name="status"]:checked').each(function () {
            if($(this).val() == "在售"){
                status = 1;
            }else if($(this).val() == "预售"){
                status = 0;
            }else{
                status = 2;
            }
        });
        var type = "";
        $('input[name="type"]:checked').each(function () {
           type += $(this).val();
        });
        var reqData = {
            "address": address,
            "price": priceLast,
            "heating": heating,
            "status": status,
            "type": type
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/newHouseBySql",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);
                // console.log(response.rentHouseTests.length)
                /**渲染数据 */
                fill(response.newHouseTests);
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
            url: "http://localhost:8080/newHouseByName",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);
               
                /**渲染数据 */
                fill(response.newHouseTests);
            },
            error: function (response) {
                console.log(response);
            }
        });

    }
});
