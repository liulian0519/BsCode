/**
 * created by liulian on 2019/05/07
 */
require(['jquery','bootstrap','login'],function(){
   
    $(document).ready(function () {
      
        /**渲染页面数据 */
        fillData();
    });

    function fillData(){
        var green_id = getUrlParam('id');
        var reqData = {
            "green_id":green_id
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/greenHouseById",
            data: reqData,
            dataType: "json",
            success: function (response) {
                // 填充数据
                initData(response);
            },
            error:function(jqXHR){
                console.log("Error: " + jqXHR.status);
            }
        });

    }
    /**
     * 
     * @param {*} response 
     */
    function initData(response){
        console.log(response);
        var image = new Array;
        image = response.picTests[0].url;

        var detilTitle = "";
        detilTitle +=
        '<div class="detil-title">\n'+
            '<span class="name">'+ response.greenHouse.name +' '+ response.greenHouse.area_type + ' '+ response.greenHouse.position +'</span>\n'+
        '</div>\n'
        $('.houseDetil-wrap').append(detilTitle);

        var detilSwiper = "";
        detilSwiper +=
            '<div class="detil-swiper">\n' +
                '<div class="swiper-container gallery-top">\n' +
            '<div class="swiper-wrapper">\n'
            for (var i = 0; i < image.length; i++) {
                detilSwiper += '<div class="swiper-slide" style="background-image:url(' + image[i] + '); "></div>\n'
            }
        detilSwiper +=
        '</div>\n' +
        '<div class="swiper-pagination"></div>\n' +
        '<div class="swiper-button-next swiper-button-white"></div>\n' +
        '<div class="swiper-button-prev swiper-button-white"></div>\n' +
        '</div>\n' +
        '<div class="swiper-container gallery-thumbs">\n' +
        '<div class="swiper-wrapper">\n'
        for (var i = 0; i < image.length; i++) {
            detilSwiper += '<div class="swiper-slide" style="background-image:url(' + image[i] + ')"></div>'
        }
        detilSwiper +=
        '</div>\n' +
        '</div>\n' +
        '</div>'
        $('.houseDetil-wrap').append(detilSwiper);
        require(['swiper'], function (Swiper) {
            swip(Swiper);
        });

        var detilCard = "";
        detilCard +=
        '<div class="card-wrap">\n'+
            '<div class="box-fixed">\n'+
                '<div class="card-price">\n'+
                    '<p class="left">'+ response.greenHouse.price +'<span>万</span></p>\n'+
                    '<input type="button" class="btn btn-preOrder" value="预约" />\n'+
                    '<p class="sub">首付及税费情况请咨询经纪人</p>\n'+
                '</div>\n'+
                '<hr>\n'+
                '<div class="card-detil">\n'+
                    '<div class="room">\n'+
                        '<div class="mainInfo">'+ response.greenHouse.area_type +'</div>\n'+
                        '<div class="subInfo">'+ response.greenHouse.floor +'</div>\n'+
                    '</div>\n'+
                    '<div class="type">\n'+
                        '<div class="mainInfo">'+ response.greenHouse.position +'</div>\n'+
                        '<div class="subInfo">'+ response.greenHouse.decoration +'</div>\n'+
                    '</div>\n'+
                    '<div class="area">\n'+
                        '<div class="mainInfo">'+ response.greenHouse.area +'平方米</div>\n'+
                        '<div class="subInfo">'+ response.greenHouse.build_type +' /' + response.communityList[0].build_time +'</div>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<hr>\n'+
                '<div class="card-house">\n'+
                    '<div class="communityName">\n'+
                        '<span class="label">小区名称</span>\n'+
                        '<span class="info">'+ response.greenHouse.name +'</span>\n'+
                        '<a class="map">地图</a>\n'+
                    '</div>\n'+
                    '<div class="areaName">\n'+
                        '<span class="label">所在区域</span>\n'+
                        '<span class="info">'+ response.greenHouse.address +'</span>\n'+
                    '</div>\n'+
                    '<div class="houseNum">\n'+
                        '<span class="label">规划户数</span>\n'+
                        '<span class="info">'+ response.communityList[0].build_num+'户</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<hr>\n'+
                '<div class="aside-man">\n'+
                    '<div class="aside-yonghu">\n'+
                        '<img src="'+response.agents[0].image+' "width="70" height="70" title="'+ response.agents[0].introduce+'" />\n'+
                    '</div>\n'+
                    '<div class="man-right">\n'+
                        '<span class="man-name">'+response.agents[0].name+'</span>\n'+
                        '<span class="man-detil">PPX经纪人</span>\n'+                
                    '</div>\n'+           
                    '<div class="reply">\n'+
                        '<div class="phone-btn">\n'+
                        '<span>'+response.agents[0].phone+'</span>\n'+
                    '</div>\n'+
                    '<div class="link">\n'+
                        '<span id="callme">联系经纪人</span>\n'+
                        '<img id="wxImg" src="./img/qr.jpg" style="display: none">\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n'
        $('.houseDetil-wrap').append(detilCard);
        /** 是否显示二维码 */
        $(".link").hover(function (){  
            $("#wxImg").show();  
        },function (){  
            $("#wxImg").hide();  
        }); 

        var communityWrap = "";
        communityWrap += 
        '<div class="community-wrap">\n'+
            '<div class="community-title">\n'+
                '<span class="name">房源基本信息</span>\n'+
            '</div>\n'+
            '<div class="basic-info">\n'+
                '<p class="basic-title">基本属性</p>\n'+
                '<ul class="x-box">\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">房屋户型：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.build_use +'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">所在楼层：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.floor +'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">房屋面积：</span>\n'+
                        '<span class="label-val tese-val">'+ response.greenHouse.area +' </span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">建筑类型：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.build_type +'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">房屋朝向：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.position +'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">装修情况：</span>\n'+
                        '<span class="label-val">'+response.greenHouse.decoration+'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">梯户比例：</span>\n'+
                        '<span class="label-val">'+response.greenHouse.ladder_house+'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">供暖方式：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.heating +'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">配备电梯：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.elevator+'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">产权年限：</span>\n'+
                        '<span class="label-val">'+response.greenHouse.right_age+'</span>\n'+
                    '</li>\n'+
                '</ul>\n'+
            '</div>\n'+
            '<div class="more-info">\n'+
                '<p class="basic-title">交易属性</p>\n'+
                '<ul class="x-box">\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">发布时间：</span>\n'+
                        '<span class="label-val">'+response.greenHouse.con_time+'</span>\n'+
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">房屋用途：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.build_use +'</span>\n'+ 
                    '</li>\n'+
                    '<li class="all-row">\n'+
                        '<span class="lab">抵押信息：</span>\n'+
                        '<span class="label-val">'+ response.greenHouse.mortgage +'</span>\n'+
                    '</li>\n'+
                '</ul>\n'+
            '</div>\n'+
        '</div>'
        $('.houseDetil-wrap').append(communityWrap);

        var housWrap = "";
        housWrap +=
        '<div class="house-wrap">\n'+
            '<div class="house-title">\n'+
                '<span class="name">房源特色</span>\n'+
            '</div>\n'+
            '<div class="house-content">\n'+
                '<div class="baseSale">\n'+
                    '<div class="name">核心卖点</div>\n'+
                    '<div class="content">\n'+
                        '<span>'+response.communityList[0].key_sale+'</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="baseSale">\n'+
                    '<div class="name">交通出行</div>\n'+
                    '<div class="content">\n'+
                        '<span>'+response.communityList[0].traffic+'</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="baseSale">\n'+
                    '<div class="name">周边配套</div>\n'+
                    '<div class="content">\n'+
                        '<span>'+response.communityList[0].surrouding+'</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="baseSale">\n'+
                    '<div class="name">小区介绍</div>\n'+
                    '<div class="content">\n'+
                        '<span>'+response.communityList[0].introduce+'</span>\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>'
        $('.houseDetil-wrap').append(housWrap);

        var imgWrap = "";
        imgWrap +=
        '<div class="img-Wrap">\n'+
            '<div class="img-title">\n'+
                '<span class="name">房源照片</span>\n'+
            '</div>\n'+
            '<div class="content">\n'
            for(var i=0;i<image.length;i++){
                imgWrap +=
                '<div data-index="'+ i +'">\n'+
                    '<img src="'+ image[i] +'" >\n'+
                '</div>\n'
            }
            imgWrap +=
            '</div>\n'+
            '</div>\n'
            $('.houseDetil-wrap').append(imgWrap);
    }
    // 获取地址栏中的id
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    // function initUI(Swiper){

    //     swip(Swiper);
    //      /** 卡片悬浮 */
    //      cardFix();
       

    // }

    /**
    * 轮播图具体实现函数
    * @param {*} Swiper 
    */
    function swip(Swiper) {
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            loop: true,
            freeMode: true,
            loopedSlides: 5,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            loop: true,
            loopedSlides: 5,
            pagination: {
            el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }

    /**
     * 实现卡片悬浮
     */
    function cardFix(){
        var fheight = $('.map-Wrapper').height() + 30; // 获取底部及底部上方边距的总高度
        var boxfixed = $('.box-fixed');  // 获取固定容器的jquery对象
        console.log(boxfixed);
        console.log(fheight)
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();  // 获取滚动条滚动的高度
            var contLeftTop = $('.detil-swiper').offset().top+20; // 右侧列表相对于文档的高度
            var scrollBottom = $(document).height() - $(window).scrollTop() - boxfixed.height();
            if (scrollTop >= contLeftTop) {
              if (scrollBottom > fheight) {  // 滚动条距离底部的距离大于fheight,添加tab_fix类,否则添加tab_fix_bottom类
                boxfixed.removeClass("tab_fix_bottom").addClass('tab_fix');
              } else {
                boxfixed.removeClass('tab_fix').addClass("tab_fix_bottom");
              }
            } else if (scrollTop < contLeftTop) {
              boxfixed.removeClass('tab_fix').removeClass("tab_fix_bottom");
            }
        });
    }
  
})
