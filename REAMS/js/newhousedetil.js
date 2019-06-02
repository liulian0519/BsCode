/**
 * created by liulian on 2019/04/17
 */
require(['jquery','bootstrap', 'login'], function () {

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
    /** 渲染页面数据 */
    fillData();
  });

  /**渲染数据 */
  function fillData() { 
    var new_id = getUrlParam('id');
    var reqData = {
      "new_id": new_id,
    };
    $.ajax({
      type: "post",
      url: "http://localhost:8080/newHouseById",
      data: reqData,
      dataType: "json",
      success: function (response) {
        initData(response);
        $.ajax({
          type: "get",
          url: "http://localhost:8080/list",
          dataType: "json",
          success: function (response) {
            /**好房推荐模块 */
              share(response.newHouses);
            
          },
          error: function (jqXHR) {
              console.log("Error: " + jqXHR.status);
          }
    
        });

        /**
        * 预约函数
        */
       $('.ttt').attr('id','myModal');
       $(".preorder").bind("click",function(){
        var time = $("#preTime").val();
        var rent_phone = $("#prePhone").val();
        console.log(time);
        // 将时间发送，并设置正确回调
        var phone = getCookie('phone');
        var order_time = time;
        var order_type = "新房";
        var newHouse_id = getUrlParam('id');
        var reqDatas = {
          "phone":phone,
          "order_time":order_time,
          "order_type":order_type,
          "newhouse_id":newHouse_id,
          "rent_phone":rent_phone,
          "area_type":"",
          "area":"",
          "price":"",
          "name":"",
          "greenhouse_id":"0",
          "renthouse_id":"0"
        }
        console.log(reqDatas);
        $.ajax({
          type: "post",
          url: "http://localhost:8080/preorderAdd",
          data: reqDatas,
          dataType: "json",
          success: function (response) {
            alert("预约成功，去个人中心查看呦");
            window.location.reload();
            console.log(response);

          },
          error:function(response){
            console.log(response)
          }
        });
        // 
        // window.location.reload();

       })
       
      },
      error: function (response) {
        console.log(response);
      }
    });


    
  }

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
 
  function initData(response) {
    console.log(response);
    if (response.newHouse.status == 0) {
      response.newHouse.status = ' 预售'
    } else if (response.newHouse.status == 1) {
      response.newHouse.status = '在售'
    } else {
      response.newHouse.status = '售罄'
    }
    for(var i= 0;i<response.houseType.length;i++){
      if (response.houseType[i].status == 0) {
        response.houseType[i].status = ' 预售'
      } else if (response.houseType[i].status == 1) {
        response.houseType[i].status = '在售'
      } else {
        response.houseType[i].status = '售罄'
      }
    }
    if(response.newHouse.heating){
      response.newHouse.heating = '集中供暖'
    }else{
      response.newHouse.heating = '自供暖'
    }
    var thouse = new Array();
    var fhouse = new Array();
    for(var i = 0;i<response.houseType.length;i++){
      if(response.houseType[i].area_type.indexOf("3室")>-1){
        thouse.push(response.houseType[i])
      }
      if(response.houseType[i].area_type.indexOf("4室")>-1){
        fhouse.push(response.houseType[i])
      }
    }
    var ll;
    if(response.houseType.length>=3){
        ll = 3;
    }else{
      ll = response.houseType.length;
    }
  
    var green;
    var midu;
    if(response.buildings[0].area_size<3.5){
      midu = "低密度"
    }else{
      midu = ""
    }
    var image = new Array;
    image = response.picTestList[0].url;

    var detilTitle = "";
    detilTitle +=
      '<div class="detil-title">\n' +
      '<span class="name">' + response.newHouse.name + '</span>\n' +
      '<span class="block-type" style="background: #5F94FF;">' + response.newHouse.status + '</span>\n' +
      '<span class="block-type" style="background: #FB9252;">' + response.newHouse.type + '</span>\n' +
      '<div class="sub-title">\n' +
      '<span>' + response.newHouse.name + '</span>\n' +
      '</div>\n' +
      '</div>'
    $('.houseDetil-wrap').append(detilTitle);

    var detilSwiper = "";
    detilSwiper +=
      '<div class="detil-swiper">\n' +
      '<div class="swiper-container gallery-top">\n' +
      '<div class="swiper-wrapper">\n'
    for (var i = 0; i < image.length; i++) {
      console.log(image[i])
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
          '<p>'+response.newHouse.price+'<span>元/平(均价)</span></p>\n'+
          '<p class="sub-price">此价格来源于日常交易积累</p>\n'+
          '<span class="block-tag">'+response.newHouse.type+'</span>\n'+
          '<span class="block-tag">绿化率高</span>\n'+
          '<span class="block-tag">'+midu+'</span>\n'+
        '</div>\n'+
        '<div class="preOrder">\n'+
          '<input type="button" class="btn btn-preOrder" id="btnOrder"  value="预约" data-toggle="modal" data-target="#myModal" />\n'+
        '</div>\n'+
        '<div class="modal ttt fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n'+
            '<div class="modal-dialog">\n'+
                '<div class="modal-content">\n'+
                    '<div>\n'+
                        '<p>请选择预信息</p>\n'+
                        '<span class="preSpan">预约时间</span>\n'+
                        '<input type="date" id="preTime" class="form-control" value="2019-05-15">\n'+
                        '<span class="preSpan1">手机号码</span>\n'+
                        '<input type="text" id="prePhone" class="form-control">\n'+
                        '<button class="btn preorder">确定</button>\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n'+
        '<hr>\n'+
        '<div class="mid-info">\n'+
          '<ul class="info-list">\n'+
            '<li class="info-item">\n'+
              '<span class="title">物业类型:</span>\n'+
              '<p class="content">'+response.newHouse.type+'</p>\n'+
            '</li>\n'+
            '<li class="info-item">\n'+
              '<span class="title">项目地址:</span>\n'+
              '<p class="content">'+response.newHouse.address+'</p>\n'+
            '</li>\n'+
            '<li class="info-item">\n'+
              '<span class="title">规划户数:</span>\n'+
              '<p class="content">'+response.buildings[0].build_user+'户</p>\n'+
            '</li>\n'+
            '<li class="info-item">\n'+
              '<span class="title">楼盘户型:</span>\n'+
              '<p class="content">三居室 &nbsp; 四居室</p>\n'+
              '<a class="all-type">全部户型</a>\n'+
            '</li>\n'+
          '</ul>\n'+ 
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
      '</div>\n'+
    '</div>\n'
    
    $('.houseDetil-wrap').append(detilCard);
    
    /** 是否显示二维码 */
    $(".link").hover(function () {
      console.log("111")
      $("#wxImg").show();
    }, function () {
      $("#wxImg").hide();
    });
  
    var detilHouseType = "";
    detilHouseType +=
    '<div class="housetype-wrap">\n'+
      '<div class="type-title">\n'+
        '<span class="name">户型介绍</span>\n'+
      '</div>\n'+
      '<ul id="myTab" class="nav nav-tabs">\n'+
        '<li class="active"><a href="#home" data-toggle="tab">全部户型</a></li>\n'+
        '<li><a href="#price" data-toggle="tab">三居室</a></li>\n'+
        '<li><a href="#time" data-toggle="tab">四居室</a></li>\n'+
      '</ul>\n'+
      '<div id="myTabContent" class="tab-content">\n'+
        '<div class="tab-pane fade in active" id="home">\n'
          for(var i = 0;i<ll;i++){
            detilHouseType +=
            '<div class="result-item">\n'+
              '<div class="result-img">\n'+
                '<a id="myhousetype" data-toggle="modal" data-target="#housetype'+response.houseType[i].id+'">\n'+
                  '<img src="'+response.houseType[i].house_img+'" />\n'+
                '</a>\n'+
              '</div>\n'+ 
              '<div class="modal fade" id="housetype'+response.houseType[i].id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n'+
                '<div class="modal-dialog" role="document">\n'+
                  '<img src="'+response.houseType[i].house_img+'"/>\n'+
                '</div>\n'+
              '</div> \n'+
              '<div class="housetype-detil">\n'+
                '<div class="housetype-title">\n'+
                  '<p class="name">\n'+
                    '<span class="name-f1">'+response.houseType[i].area+'平米 户型 ' +response.houseType[i].area_type+'</span>\n'+
                    '<span class="block-tag">'+response.houseType[i].status+'</span>\n'+
                  '</p>\n'+
                  '<span class="sub-name">'+response.houseType[i].area+'m²</span>\n'+
                '</div>\n'+
                '<div class="tag">\n'+
                  '<span class="block-tag">全明格局</span>\n'+
                  '<span class="block-tag">多卫</span>\n'+
                  '<span class="block-tag">阳台</span>\n'+
                  '<span class="block-tag">干湿分离</span>\n'+
                '</div>\n'+
                '<div class="housetype-price">\n'+
                  '<span>'+response.houseType[i].price+'</span>\n'+
                '</div>\n'+
              '</div>\n'+
            '</div>\n'
          }
          detilHouseType +=
    '<div class="flod-box">\n'
    for(var i = ll;i<response.houseType.length;i++){
      detilHouseType +=
      '<div class="result-item">\n'+
        '<div class="result-img">\n'+
          '<a id="myhousetype" data-toggle="modal" data-target="#housetype'+response.houseType[i].id+'">\n'+
            '<img src="'+response.houseType[i].house_img+'" />\n'+
          '</a>\n'+
        '</div>\n'+ 
        '<div class="modal fade" id="housetype'+response.houseType[i].id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n'+
          '<div class="modal-dialog" role="document">\n'+
            '<img src="'+response.houseType[i].house_img+'"/>\n'+
          '</div>\n'+
        '</div> \n'+
        '<div class="housetype-detil">\n'+
          '<div class="housetype-title">\n'+
            '<p class="name">\n'+
              '<span class="name-f1">'+response.houseType[i].area+'平米 户型 ' +response.houseType[i].area_type+'</span>\n'+
              '<span class="block-tag">'+response.houseType[i].status+'</span>\n'+
            '</p>\n'+
            '<span class="sub-name">'+response.houseType[i].area+'m²</span>\n'+
          '</div>\n'+
          '<div class="tag">\n'+
            '<span class="block-tag">全明格局</span>\n'+
            '<span class="block-tag">多卫</span>\n'+
            '<span class="block-tag">阳台</span>\n'+
            '<span class="block-tag">干湿分离</span>\n'+
          '</div>\n'+
          '<div class="housetype-price">\n'+
            '<span>'+response.houseType[i].price+'</span>\n'+
          '</div>\n'+
        '</div>\n'+
      '</div>\n'
    }
    detilHouseType +=
    '</div>\n'+
    '<div class="fold-button">\n'+
      '<span class="open">展开</span>\n'+
      '<span class="clo" style="display:none;">收起</span>\n'+
    '</div>\n'+
  '</div>\n'+

    '<div class="tab-pane fade" id="price">\n'
    for(var i = 0;i<thouse.length;i++){
      detilHouseType +=
      '<div class="result-item">\n'+
        '<div class="result-img">\n'+
          '<a id="myhousetype" data-toggle="modal" data-target="#thousetype'+thouse[i].id+'">\n'+
            '<img src="'+thouse[i].house_img+'" />\n'+
          '</a>\n'+
        '</div>\n'+ 
        '<div class="modal fade" id="thousetype'+thouse[i].id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n'+
          '<div class="modal-dialog" role="document">\n'+
            '<img src="'+thouse[i].house_img+'"/>\n'+
          '</div>\n'+
        '</div> \n'+
        '<div class="housetype-detil">\n'+
          '<div class="housetype-title">\n'+
            '<p class="name">\n'+
              '<span class="name-f1">'+thouse[i].area+'平米 户型 ' +thouse[i].area_type+'</span>\n'+
              '<span class="block-tag">'+thouse[i].status+'</span>\n'+
            '</p>\n'+
            '<span class="sub-name">'+thouse[i].area+'m²</span>\n'+
          '</div>\n'+
          '<div class="tag">\n'+
            '<span class="block-tag">全明格局</span>\n'+
            '<span class="block-tag">多卫</span>\n'+
            '<span class="block-tag">阳台</span>\n'+
            '<span class="block-tag">干湿分离</span>\n'+
          '</div>\n'+
          '<div class="housetype-price">\n'+
            '<span>'+thouse[i].price+'</span>\n'+
          '</div>\n'+
        '</div>\n'+
      '</div>\n'
    }
    detilHouseType +=
    '</div>\n'+
    '<div class="tab-pane fade" id="time">\n'
    for(var i = 0;i<fhouse.length;i++){
      detilHouseType +=
      '<div class="result-item">\n'+
        '<div class="result-img">\n'+
          '<a id="myhousetype" data-toggle="modal" data-target="#fhousetype'+fhouse[i].id+'">\n'+
            '<img src="'+fhouse[i].house_img+'" />\n'+
          '</a>\n'+
        '</div>\n'+ 
        '<div class="modal fade" id="fhousetype'+fhouse[i].id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n'+
          '<div class="modal-dialog" role="document">\n'+
            '<img src="'+fhouse[i].house_img+'"/>\n'+
          '</div>\n'+
        '</div> \n'+
        '<div class="housetype-detil">\n'+
          '<div class="housetype-title">\n'+
            '<p class="name">\n'+
              '<span class="name-f1">'+fhouse[i].area+'平米 户型 ' +fhouse[i].area_type+'</span>\n'+
              '<span class="block-tag">'+fhouse[i].status+'</span>\n'+
            '</p>\n'+
            '<span class="sub-name">'+fhouse[i].area+'m²</span>\n'+
          '</div>\n'+
          '<div class="tag">\n'+
            '<span class="block-tag">全明格局</span>\n'+
            '<span class="block-tag">多卫</span>\n'+
            '<span class="block-tag">阳台</span>\n'+
            '<span class="block-tag">干湿分离</span>\n'+
          '</div>\n'+
          '<div class="housetype-price">\n'+
            '<span>'+fhouse[i].price+'</span>\n'+
          '</div>\n'+
        '</div>\n'+
      '</div>\n'
    }
    detilHouseType +=
    '</div>\n'+
    '</div>\n'+
    '</div>\n'+
    '</div>\n'
    $('.houseDetil-wrap').append(detilHouseType);
    // require(['bootstrap'], function () {
    // });
    /**显示更多 */
    $(".fold-button").click(function () {
      $(".flod-box").slideToggle("slow");
      $(".open").toggle();
      $(".clo").toggle();
    });
    

    var detilBuild = "";
    detilBuild +=
    '<div class="build-wrap">\n'+
      '<div class="build-title">\n'+
        '<span class="name">楼栋信息</span>\n'+
      '</div>\n'+
      '<div class="basic-info">\n'+
        '<p class="basic-title">基本信息</p>\n'+
          '<ul class="x-box">\n'+
            '<li class="all-row">\n'+
              '<span class="lab">物业类型：</span>\n'+
              '<span class="label-val">'+response.newHouse.type+'</span>\n'+
            '</li>\n'+
            '<li class="all-row">\n'+
              '<span class="lab">参考价格：</span>\n'+
              '<span class="label-val">\n'+
                '<span>均价'+response.newHouse.price+'</span>\n'+
              '</span>\n'+
            '</li>\n'+
            '<li class="all-row">\n'+
              '<span class="lab">项目特色：</span>\n'+
              '<span class="label-val tese-val"title="绿化率高 低密度 ">绿化率高 低密度</span>\n'+
            '</li>\n'+
            '<li class="all-row">\n'+
              '<span class="lab">楼盘地址：</span>\n'+
              '<span class="label-val">'+response.newHouse.address+'</span>\n'+
            '</li>\n'+
            '<li class="all-row">\n'+
              '<span class="lab">开发商：</span>\n'+
              '<span class="label-val">'+response.buildings[0].developer+'</span>\n'+
            '</li>\n'+
          '</ul>\n'+
          '<div class="more-info">\n'+
            '<p class="basic-title">更多信息</p>\n'+
              '<ul class="x-box">\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">建筑类型：</span>\n'+
                  '<span class="label-val">'+response.buildings[0].build_type+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">建筑面积：</span>\n'+
                  '<span class="label-val">\n'+
                    '<span>'+response.buildings[0].build_area+'</span>\n'+
                  '</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">规划户数：</span>\n'+
                  '<span class="label-val">'+response.buildings[0].build_user+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">产权年限：</span>\n'+
                  '<span class="label-val">'+response.buildings[0].right_age+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">绿化率：</span>\n'+
                  '<span class="label-val">'+response.buildings[0].green_percent+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">容积率：</span>\n'+
                  '<span class="label-val">'+response.buildings[0].area_size+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">物业费：</span>\n'+
                  '<span class="label-val">'+response.newHouse.fee+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">供暖方式：</span>\n'+
                  '<span class="label-val">'+response.newHouse.heating+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">供电方式：</span>\n'+
                  '<span class="label-val">'+response.newHouse.electric+'</span>\n'+
                '</li>\n'+
                '<li class="all-row1">\n'+
                  '<span class="lab">供水方式：</span>\n'+
                  '<span class="label-val">'+response.newHouse.water+'</span>\n'+
                '</li>\n'+

              '</ul>\n'+
            '</div>\n'+
            '<div class="moreInfo-button">\n'+
              '<span class="more">更多</span>\n'+
              '<span class="sub" style="display:none;">收起</span>\n'+
            '</div>\n'+
          '</div>\n'+
        '</div>\n' 
        $('.houseDetil-wrap').append(detilBuild);

        $(".moreInfo-button").click(function () {
          $(".more-info").slideToggle("slow");
          $(".more").toggle();
          $(".sub").toggle();
        });

        var detilMap = "";
        detilMap +=
        '<div class="map-Wrapper">\n'+
          '<div class="map-title">\n'+
            '<div class="title-name">\n'+
              '<span>地址和交通</span>\n'+
            '</div>\n'+
          '</div>\n'+
          '<iframe id="ted" src="./detil.html?x='+response.newHouse.housex+'&y='+response.newHouse.housey+'"></iframe>\n'+
        '</div>'

        $('.houseDetil-wrap').append(detilMap);

       
  }
  function share(response){
    console.log(response)
    var detilShare = "";
    detilShare +=
    '<div class="goodhouse-Wrapper">\n'+
      '<div class="goodhouse-title">\n'+
        '<div class="title-name">\n'+
          '<span>好房推荐</span>\n'+
        '</div>\n'+
      '</div>\n'
      var newImg = new Array();
      var newAddName = new Array();
      var newPrice = new Array();
      var id = new Array();

      for (var i = 0; i <3; i++) {
        
          newImg[i] = response[i].url[0];
          newAddName[i] = response[i].name;
          newPrice[i] =response[i].price;
          id[i] = response[i].id;
      }

      
      for (var j = 0; j < 3; j++) {
          detilShare+=
              '<div class="new-detil">\n' +
              '   <a href="./newHouseDetil.html?id='+id[j]+'">\n' +
              '       <img src="' + newImg[j] + '">\n' +
              '   </a>\n' +
              '   <span class="new-addName">' + newAddName[j] + '</span>\n' +
              '   <span class="new-addPrice">' + newPrice[j] + '元/平</span>\n' +
              '</div>'
      }
    $('.houseDetil-wrap').append(detilShare);
    cardFix();
  }

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
  function cardFix() {
    var fheight = $('.goodhouse-Wrapper').height() + 30; // 获取底部及底部上方边距的总高度
    var boxfixed = $('.box-fixed');  // 获取固定容器的jquery对象
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();  // 获取滚动条滚动的高度
      var contLeftTop = $('.detil-swiper').offset().top + 20; // 右侧列表相对于文档的高度
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
  
 
    
});