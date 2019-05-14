/**
 * created by liulian on 2019/04/07
 */

require(['jquery', 'bootstrap', 'login', 'layui'], function () {

    $(document).ready(function () {
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
        $(".drop-menu li").bind("click", accAvalue);
        $('.ul-item-type li').bind("click", accAvalue);
        $('.ul-item-price li').bind("click", AccCheckValue);
        $('.ul-item-hole li').bind("click", AccCheckValue);
        $('.ul-item-position li').bind("click", AccCheckValue);

        // 选项卡切换
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            $(".active-tab span").html(activeTab);
            $(".previous-tab span").html(previousTab);
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

    function initUI() {
        $.ajax({
            type: "get",
            url: "http://localhost:8080/rentHouseSortByConTime",
            dataType: "json",
            success: function (response) {
                var count = response.count;
                fillNum(response);

                /**综合排序分页 */
                fillMoren(count);

                $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
                    var text = $(e.target).text()
                    if (text == "综合排序") {
                        /**综合排序分页 */
                        fillMoren(count);
                    }
                    if (text == "最新上架") {
                        /**最新上架分页 */
                        fillTime(count);
                    }
                    if (text == "价格") {
                        /**按面积排序 */
                        fillPrice(count);
                    }
                    if (text == "面积") {
                        /**按面积排序 */
                        fillArea(count);
                    }
                })
            },
            error: function (response) {
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
        '<p>已经为您找到' + response.count + '套房</p>\n' +
        '</div>\n' +
        '<ul id="myTab" class="nav nav-tabs">\n' +
        '<li class="active"><a href="#home" data-toggle="tab">综合排序</a></li>\n' +
        '<li><a href="#latest" data-toggle="tab">最新上架</a></li>\n' +
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
    }
    /**
     * 综合排序分页函数
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
                        url: "http://localhost:8080/rentHouseByPage",
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
     * 最新上架分页函数
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
                        url: "http://localhost:8080/rentHouseByTime",
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
                        url: "http://localhost:8080/rentHouseByPrice",
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
                        url: "http://localhost:8080/rentHouseByArea",
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
     * 
     * @param {*} response 
     * 综合排序的渲染数据
     */
    function fillData(response) {
        $(".result-item").remove();
        $("#home").append(fillZonghe(response));
    }

    /**
     * 
     * @param {*} response 
     * 最新上架的渲染数据
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
     * @param {*} response 
     */
    function fillZonghe(response) {
        console.log(response);
        var result = ""
        for (var i = 0; i < response.list.length; i++) {
            result +=
                '<div class="result-item">\n' +
                '<div class="result-img">\n' +
                '<a href="detilHouse.html?id=' + response.list[i].id + '">\n' +
                '<img style="width:250px; height:182px;" src="' + response.list[i].url[0] + '" />\n' +
                '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                '<div class="detil-house">\n' +
                '<span>' + response.list[i].name + '</span>\n' +
                '<span>' + response.list[i].area_type + '</span>\n' +
                '</div>\n' +
                '<div class="detil-address">\n' +
                '<span>' + response.list[i].address + ' /</span>\n' +
                '<span>' + response.list[i].area + '㎡ / </span>\n' +
                '<span>' + response.list[i].position + '</span>\n' +
                '</div>\n' +
                '<div class="detil-time">\n' +
                '<i class="iconfont iconshijian"></i><span>' + response.list[i].con_time + '</span>\n' +
                '</div>\n' +
                '<div class="ddetil-type">\n' +
                '<button class="btn" disabled>近地铁</button>\n' +
                '<button class="btn" disabled>' + response.list[i].heating + '</button>\n' +
                '<button class="btn" disabled>随时看房</button>\n' +
                '</div>\n' +
                '<div class="detil-price">\n' +
                '<span>' + response.list[i].price + '/月</span>\n' +
                '</div>\n' +
                '</div>\n' +
                '<hr>\n' +
                '</div>\n'
        }
        return result;
    }

    function fillZonghe2(response) {
        var result = ""
        for (var i = 0; i < response.length; i++) {
            result +=
                '<div class="result-item">\n' +
                '<div class="result-img">\n' +
                '<a href="detilHouse.html?id=' + response[i].id + '">\n' +
                '<img style="width:250px; height:182px;" src="' + response[i].url[0] + '" />\n' +
                '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                '<div class="detil-house">\n' +
                '<span>' + response[i].name + '</span>\n' +
                '<span>' + response[i].area_type + '</span>\n' +
                '</div>\n' +
                '<div class="detil-address">\n' +
                '<span>' + response[i].address + ' /</span>\n' +
                '<span>' + response[i].area + '㎡ / </span>\n' +
                '<span>' + response[i].position + '</span>\n' +
                '</div>\n' +
                '<div class="detil-time">\n' +
                '<i class="iconfont iconshijian"></i><span>' + response[i].con_time + '</span>\n' +
                '</div>\n' +
                '<div class="ddetil-type">\n' +
                '<button class="btn" disabled>近地铁</button>\n' +
                '<button class="btn" disabled>' + response[i].heating + '</button>\n' +
                '<button class="btn" disabled>随时看房</button>\n' +
                '</div>\n' +
                '<div class="detil-price">\n' +
                '<span>' + response[i].price + '/月</span>\n' +
                '</div>\n' +
                '</div>\n' +
                '<hr>\n' +
                '</div>\n'
        }
        return result;
    }
    /**
     * 得到a标签值的函数
     * 点击则发送请求重新渲染页面
     */
    function accAvalue() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var address = $(".select-body .active").children("a:eq(0)").text();
        var rent_type = $(".select-body .active").children("a:eq(1)").text();

        if (rent_type == "不限") {
            rent_type = 2;
        } else if (rent_type == "合租") {
            rent_type = 0;
        } else {
            rent_type = 1;
        }
        if (address == "全城") {
            address = "";
        }

        var price = "";
        var area = "";
        var position = "";
        var reqData = {
            "address": address,
            "rent_type": rent_type,
            "price": price,
            "area": area,
            "position": position
        }

        $.ajax({
            type: "post",
            url: "http://localhost:8080/renthouseBySql",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);
                console.log(response.rentHouseTests.length)
                /**渲染数据 */
                fill(response.rentHouseTests);
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
        console.log(response);
        var count = response.length;
        var result = "";
        result +=
            '<div class="result-title">\n' +
            '<p>已经为您找到' + count + '套房</p>\n' +
            '</div>\n' +
            '<ul id="myTab" class="nav nav-tabs">\n' +
            '<li class="active"><a href="#home" data-toggle="tab">综合排序</a></li>\n' +
            '<li><a href="#latest" data-toggle="tab">最新上架</a></li>\n' +
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
     * 得到多选框选中的值的函数
     * 点击则发送请求重新渲染页面
     */
    function AccCheckValue() {
        if ($(this).children().is(":checked")) {
            $(this).children().prop("checked", false);
        } else {
            $(this).children().prop("checked", true);
        }

        // 将price中的汉字全部去掉
        var price = "";
        var priceLast = "";
        $('input[name="price"]:checked').each(function () {
            var p = $(this).val();
            if (p.indexOf('元以上') >= 0) {
                price += p.replace('元以上', '-10000000');

            } else if (p.indexOf('元以下') >= 0) {
                var test = p.replace('元以下', '');
                var p = '0-'
                price += p + test;

            } else {
                price += p.replace('元', '');
            }
        });
        var rr = []
        rr = price.split("-");
        var first = rr[0];
        var last = rr[rr.length - 1];
        if(first){
            priceLast = first + "-" + last;
        }else{
            priceLast = "";
        }
 
        var area = "";
        $('input[name="area"]:checked').each(function () {
            if ($(this).val() == "4室以上") {
                var a = '5室';
                area += a;

            } else {
                area += $(this).val();
            }

        })

        var position = "";
        $('input[name="position"]:checked').each(function () {
            position += $(this).val();
        })

        var address = $(".select-body .active").children("a:eq(0)").text();
        var rent_type = $(".select-body .active").children("a:eq(1)").text();

        if (rent_type == "不限") {
            rent_type = 2;
        } else if (rent_type == "合租") {
            rent_type = 0;
        } else {
            rent_type = 1;
        }
        if (address == "全城") {
            address = "";
        }

        var reqData = {
            "address": address,
            "rent_type": rent_type,
            "price": priceLast,
            "area": area,
            "position": position
        }
        console.log(reqData)
        $.ajax({
            type: "post",
            url: "http://localhost:8080/renthouseBySql",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);
                console.log(response.rentHouseTests.length)
                /**渲染数据 */
                fill(response.rentHouseTests);
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
            url: "http://localhost:8080/rentHouseByName",
            data: reqData,
            dataType: "json",
            success: function (response) {
                /**渲染数据 */
                fill(response.rentHouseTests);
            },
            error: function (response) {
                console.log(response);
            }
        });

    }

}) 