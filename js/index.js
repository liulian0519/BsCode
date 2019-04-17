/**
 * created by liulian on 2019/04/03
 */
require(['jquery', 'bootstrap', 'login'], function () {

    $(document).ready(function () {
        initUI();
    });


    /**
     * 渲染页面的主函数
     */
    function initUI() {
        /**搜索框选项卡切换 */
        searchTab();
        /** 展示首页的房源信息 */
        fillData();
    }

    /**
     * 搜索框选项卡切换
     */
    function searchTab() {
        $(".search-body p").not(":first").hide();
        $(".search-box ul li").click(function () {
            var index = $(this).index();;
            console.log(index);
            if (index == 0) {
                $(this).find("a").addClass("style1");
                $(".search-menu li").eq(1).find("a").removeClass("style2");
                $(".search-menu li").eq(2).find("a").removeClass("style3");
                $(".search-menu i").css({
                    'left': '274px'
                })

            }
            if (index == 1) {

                $(this).find("a").addClass("style2");
                // console.log($("li").eq(0).find("a"));
                $(".search-menu li").eq(0).find("a").removeClass("style1");
                $(".search-menu li").eq(2).find("a").removeClass("style3");
                $(".search-menu i").css({
                    'left': '356px'
                })
            }
            if (index == 2) {
                $(this).find("a").addClass("style3");
                $(".search-menu li").eq(0).find("a").removeClass("style1");
                $(".search-menu li").eq(1).find("a").removeClass("style2");
                $(".search-menu i").css({
                    'left': '436px'
                })
            }
            var index = $(this).index();
            $(".search-box p").eq(index).show().siblings().hide();
        })


    }

    /**
     * 填充页面房源信息
     */
    function fillData() {

        $.ajax({
            type: "get",
            url: "./testJson/index.json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                /** 渲染二手房部分 */
                initGreenHouse(response);
                /** 渲染新房部分 */
                initNewHouse(response);
                /** 渲染租房部分 */
                initRootHouse(response);
            },
            error: function (jqXHR) {
                console.log("Error: " + jqXHR.status);
            }

        });
    }

    /**
     * 渲染二手房部分的页面信息
     * @param {Array} response 
     */
    function initGreenHouse(response) {
        // 存放二手房相关信息的数组
        var greenDetil = new Array();

        var greenImg = new Array();
        var addName = new Array();
        var addDesc = new Array();
        var area = new Array();
        var areaType = new Array();
        var price = new Array();

        for (var i = 0; i < response.length; i++) {
            greenDetil[i] = response[i].greenHouse;
            greenImg[i] = greenDetil[i].img;
            addName[i] = greenDetil[i].addName;
            addDesc[i] = greenDetil[i].addDesc;
            area[i] = greenDetil[i].area;
            areaType[i] = greenDetil[i].areaType;
            price[i] = greenDetil[i].price;

        }
        console.log(greenDetil.length)

        var greenHouse = "";
        greenHouse +=
            '<div class="greenHouse">\n' +
            '   <div class="green-title">\n' +
            '       <div class="title-name">' + response[0].greenTitle + '</div>\n' +
            '       <div class="greenDesc">\n' +
            '           <span class="span-left">' + response[0].greenDesc + '</span>\n' +
            '           <a class="span-right" href="./greenHouse.html">More +</a>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        $('#house_wrapper').append(greenHouse);

        var greenDesc = ""
        for (var i = 0; i < greenDetil.length; i++) {
            greenDesc +=
                '   <div class="green-detil">\n' +
                '       <img src="' + greenImg[i] + '">\n' +
                '       <div class="address">\n' +
                '           <p>' + addName[i] + '</p>\n' +
                '           <p>' + addDesc[i] + '</p>\n' +
                '       </div>\n' +
                '       <div class="sapn-bottome">\n' +
                '           <span class="area">' + areaType[i] + '·' + area[i] + '</span>\n' +
                '           <span class="price">' + price[i] + '</span>\n' +
                '       </div>\n' +
                '   </div>'
        }
        $('.greenHouse').append(greenDesc);
    }

    /**
     * 渲染新房部分的页面信息
     * @param {Array} response
     */
    function initNewHouse(response) {
        var newHouse = "";
        newHouse +=
            '<div class="newHouse">\n' +
            '   <div class="new-title">\n' +
            '       <div class="title-name">' + response[0].newTitle + '</div>\n' +
            '       <div class="newDesc">\n' +
            '           <span class="span-left">' + response[0].newDesc + '</span>\n' +
            '           <a class="span-right" href="./newHouse.html">More +</a>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        $('#house_wrapper').append(newHouse);

        var newDetil = new Array();

        var newImg = new Array();
        var newAddName = new Array();
        var newPrice = new Array();

        for (var i = 0; i < 3; i++) {
            newDetil[i] = response[i].newHouse;
            newImg[i] = newDetil[i].img;
            newAddName[i] = newDetil[i].addName;
            newPrice[i] = newDetil[i].price;

        }

        var newDesc = "";
        for (var j = 0; j < newDetil.length; j++) {
            newDesc +=
                '<div class="new-detil">\n' +
                '   <img src="' + newImg[j] + '">\n' +
                '   <span class="new-addName">' + newAddName[j] + '</span>\n' +
                '   <span class="new-addPrice">' + newPrice[j] + '</span>\n' +
                '</div>'
        }
        $('.newHouse').append(newDesc);
    }

    /**
     * 渲染租房部分的页面信息
     * @param {Array} response
     */
    function initRootHouse(response) {
        var rootHouse = "";
        rootHouse +=
            '<div class="rootHouse">\n' +
            '   <div class="root-title">\n' +
            '       <div class="title-name">' + response[0].rootTitle + '</div>\n' +
            '       <div class="rootDesc">\n' +
            '           <span class="span-left">' + response[0].rootDesc + '</span>\n' +
            '           <a class="span-right" href="./rootHouse.html">More +</a>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        $('#house_wrapper').append(rootHouse);

        var rootDetil = new Array();
        var rootImg = new Array();
        var rootAddName = new Array();
        var rootAddDesc = new Array();
        var rootAreaType = new Array();
        var rootPosition = new Array();
        var rootPrice = new Array();

        for (var i = 0; i < response.length; i++) {
            rootDetil[i] = response[i].rootHouse;
            rootImg[i] = rootDetil[i].img;
            rootAddName[i] = rootDetil[i].addName;
            rootAddDesc[i] = rootDetil[i].addDesc;
            rootAreaType[i] = rootDetil[i].areaType;
            rootPosition[i] = rootDetil[i].position;
            rootPrice[i] = rootDetil[i].price;
        }

        var rootDesc = "";
        for (var j = 0; j < rootDetil.length; j++) {
            rootDesc +=
                '<div class="root-detil">\n' +
                '   <img src="' + rootImg[j] + '">\n' +
                '   <p class="address">' + rootAddName[j] + '·' + rootAddDesc[j] + '·' + rootPosition[j] + '</p>\n' +
                '   <div class="span-bottom">\n' +
                '       <span class="area">' + rootAreaType[j] + '</span>\n' +
                '       <span class="price">' + rootPrice[j] + '</span>\n' +
                '   </div>\n' +
                '</div>'
        }
        $('.rootHouse').append(rootDesc);
    }
})

