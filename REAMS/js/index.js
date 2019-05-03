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
                    'left': '195px'
                })

            }
            if (index == 1) {

                $(this).find("a").addClass("style2");
                // console.log($("li").eq(0).find("a"));
                $(".search-menu li").eq(0).find("a").removeClass("style1");
                $(".search-menu li").eq(2).find("a").removeClass("style3");
                $(".search-menu i").css({
                    'left': '274px'
                })
            }
            if (index == 2) {
                $(this).find("a").addClass("style3");
                $(".search-menu li").eq(0).find("a").removeClass("style1");
                $(".search-menu li").eq(1).find("a").removeClass("style2");
                $(".search-menu i").css({
                    'left': '356px'
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
            url: "http://localhost:8080/list",
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
        // var greenDetil = new Array();

        var greenImg = new Array();
        var addName = new Array(); 
        var addDesc = new Array();
        var area = new Array();
        var areaType = new Array();
        var price = new Array();
        var id = new Array();

        for (var i = 0; i <4; i++) {
            greenImg[i] = response.greenHouses[i].url[0];
            addName[i] = response.greenHouses[i].name;
            addDesc[i] = response.greenHouses[i].address;
            area[i] = response.greenHouses[i].area;
            areaType[i] = response.greenHouses[i].type;
            price[i] = response.greenHouses[i].price;
            id[i] = response.greenHouses[i].id;

        }
      
        var greenHouse = "";
        greenHouse +=
            '<div class="greenHouse">\n' +
            '   <div class="green-title">\n' +
            '       <div class="title-name">' + '二手好房' + '</div>\n' +
            '       <div class="greenDesc">\n' +
            '           <span class="span-left">' + '好房源那么多我们为你精选' + '</span>\n' +
            '           <a class="span-right" href="./greenHouse.html">More +</a>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        $('#house_wrapper').append(greenHouse);

        var greenDesc = ""
        for (var i = 0; i < 4; i++) {
            greenDesc +=
                '   <div class="green-detil">\n' +
                '       <a href="./greenHouseDetil.html?id='+id[i]+'">\n' +
                '           <img src="' + greenImg[i] + '">\n' +
                '       </a>\n' +
                '           <div class="address">\n' +
                '               <p>' + addName[i] + '</p>\n' +
                '               <p class="p-over">' + addDesc[i] + '</p>\n' +
                '           </div>\n' +
                '           <div class="sapn-bottome">\n' +
                '               <span class="area">' + areaType[i] + '·' + area[i] + '㎡</span>\n' +
                '               <span class="price">' + price[i] + '万</span>\n' +
                '           </div>\n' +
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
            '       <div class="title-name">' + '优选新房' + '</div>\n' +
            '       <div class="newDesc">\n' +
            '           <span class="span-left">' + '真实信息准确同步，楼盘动态一手掌握' + '</span>\n' +
            '           <a class="span-right" href="./newHouse.html">More +</a>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        $('#house_wrapper').append(newHouse);

        console.log(response.newHouses);
        var newImg = new Array();
        var newAddName = new Array();
        var newPrice = new Array();
        var id = new Array();

        for (var i = 0; i <3; i++) {
          
            newImg[i] = response.newHouses[i].url[0];
            newAddName[i] = response.newHouses[i].name;
            newPrice[i] =response.newHouses[i].price;
            id[i] = response.newHouses[i].id;
        }

        var newDesc = "";
        for (var j = 0; j < 3; j++) {
            newDesc +=
                '<div class="new-detil">\n' +
                '   <a href="./newHouseDetil.html?id='+id[j]+'">\n' +
                '       <img src="' + newImg[j] + '">\n' +
                '   </a>\n' +
                '   <span class="new-addName">' + newAddName[j] + '</span>\n' +
                '   <span class="new-addPrice">' + newPrice[j] + '元/平</span>\n' +
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
            '       <div class="title-name">' + '品质租房' + '</div>\n' +
            '       <div class="rootDesc">\n' +
            '           <span class="span-left">' + '高品质租房体验，从PPX开始' + '</span>\n' +
            '           <a class="span-right" href="./rootHouse.html">More +</a>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        $('#house_wrapper').append(rootHouse);
        var rootImg = new Array();
        var rootAddName = new Array();
        var rootAddDesc = new Array();
        var rootAreaType = new Array();
        var rootPosition = new Array();
        var rootPrice = new Array();
        var id = new Array();

        for (var i = 0; i < 4; i++) {
            rootImg[i] = response.rentHouses[i].url[0];
            rootAddName[i] = response.rentHouses[i].name;
            rootAddDesc[i] =response.rentHouses[i].address;
            rootAreaType[i] = response.rentHouses[i].type;
            rootPosition[i] = response.rentHouses[i].position;
            rootPrice[i] = response.rentHouses[i].price;
            id[i] = response.rentHouses[i].id;
        }

        var rootDesc = "";
        for (var j = 0; j < 4; j++) {
            rootDesc +=
                '<div class="root-detil">\n' +
                '   <a href="./detilHouse.html?id='+id[j]+'">\n' +
                '       <img src="' + rootImg[j] + '">\n' +
                '</a>\n' +
                '   <p class="address">' + rootAddName[j] + '·' + rootAddDesc[j] + '·' + rootPosition[j] + '</p>\n' +
                '   <div class="span-bottom">\n' +
                '       <span class="area">' + rootAreaType[j] + '</span>\n' +
                '       <span class="price">' + rootPrice[j] + '元/月</span>\n' +
                '   </div>\n' +
                '</div>'
        }
        $('.rootHouse').append(rootDesc);
    }
})

