/**
 * created by liulian on 2019/04/19
 */
require(['jquery', 'bootstrap','login'], function () {
    $(document).ready(function () {
     
       /**
        * 填充页面数据
        *  */ 
        initUI();
    })
    
    function initUI(){
        // 根据id查找信息
        var rent_id = getUrlParam('id');
        var reqData = {
            "rent_id": rent_id,
        };
        $.ajax({
            type: "post",
            url: "http://localhost:8080/rentHouseById",
            data: reqData,
            dataType: "json",
            success: function (response) {
         
                fillData(response);
                $.ajax({
                    type: "get",
                    url: "http://localhost:8080/list",
                    data: reqData,
                    dataType: "json",
                    success: function (response) {
                        /** 好房推荐模块 */
                        share(response.rentHouses);
                    },
                    error:function(response){
                        console.log(response);
                    }
                });
            },
            error:function(response){
                console.log(response);
            }
        });

       
        
    }
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
    function fillData(response){
        console.log(response);
        var image = new Array;
        image = response.picList[0].url;
        console.log(image);
        if(response.rentHouse.heating){
            response.rentHouse.heating = '集中供暖';
        }else{
            response.rentHouse.heating = '自供暖';
        }
        if(response.communities.traffic!=""){
            var traffic = '公交便利';
        }
        if(response.rentHouse.rent_type){
            response.rentHouse.rent_type = '整租';
        }else{
            response.rentHouse.rent_type = '合租';
        }
        if(response.rentHouse.fire){
            response.rentHouse.fire = '有'
        }else{
            response.rentHouse.fire = '没有'
        }
        if(response.rentHouse.elevator){
            response.rentHouse.elevator = '有'
        }else{
            response.rentHouse.elevator = '没有'
        }


        var detilTitle = "";
        detilTitle += 
        '<div class="detil-title">\n' +
            '<div class="detil-biaoti">\n' +
                '<span>'+response.rentHouse.name+'</span>\n' +
                '<span>'+response.rentHouse.area_type+'</span>\n' +
                '<span>'+response.rentHouse.price+'元/月</span>\n' +
            '</div>\n'+
            '<div class="detil-text">\n'+
                '<div class="detil-time">\n'+
                    '<span>房源上架时间</span>\n'+
                    '<span>2019-03-04</span>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>' 
        $('.houseDetil-wrap').append(detilTitle);
        var lunbo = "";

        var detilLunbo = "";
            detilLunbo += 
            '<div class="detil-lunbo">\n'+
                '<div class="zoombox">\n'+
                    '<div class="zoompic">\n'+
                        '<img src=" '+ image[0] + '"width="684" height="394" alt="房源信息" />\n'+
                    '</div>\n'+     
                    '<div class="sliderbox">\n'+
                        '<div id="btn-left" class="arrow-btn dasabled"></div>\n'+
                        '<div class="slider" id="thumbnail">\n'+
                            '<ul>\n' 
                            var lunbonext="";
                            
                            for(var i = 0;i< image.length;i++){ 
                                lunbonext +=
                                '<li class="current">\n'+
                                    '<a href="'+ image[i]+'"target="_blank">\n'+
                                        '<img src="'+image[i]+' "width="115" height="74" alt="房源信息" />\n'+
                                    '</a>\n'+
                                '</li>\n' 
                            } 
                            var lunbosecond = "";
                            lunbosecond +=
                            '</ul>\n'+
                        '</div>\n'+
                        '<div id="btn-right" class="arrow-btn"></div>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="content-aside">\n'+
                    '<p class="aside-price">\n'+
                        '<span>'+response.rentHouse.price+'元/月</span>\n'+
                    '</p>\n'+
                    '<div class="aside-tab">\n'+
                        '<button class="btn" disabled>'+response.rentHouse.heating+'</button>\n'+
                        
                        '<button class="btn" disabled>'+traffic+'</button>\n'+
                    '</div>\n'+
                    '<hr>\n'+
                    '<ul class="aside-li">\n'+
                        '<p class="con-tab">\n'+
                            '<span><i class="iconfont iconfangzi"></i>'+response.rentHouse.rent_type+'</span>\n'+
                            '<span><i class="iconfont iconwankeicon-"></i>'+response.rentHouse.area_type+'</span>\n'+
                            '<span><i class="iconfont iconmianji"></i>'+response.rentHouse.price+'㎡</span>\n'+
                            '<span><i class="iconfont iconhaofangtuo400iconfontzhaoxiang"></i>'+response.rentHouse.position+'</span>\n'+
                        '</p>\n'+
                    '</ul>\n'+
                    '<div class="aside-man">\n'+
                        '<div class="aside-yonghu">\n'+
                            '<img src="'+response.agents[0].image+' "width="60" height="60" title="'+ response.agents[0].introduce+'" />\n'+
                        '</div>\n'+
                        '<div class="man-right">\n'+
                            '<span class="man-name">'+response.agents[0].name+'</span>\n'+
                            '<span class="man-detil">PPX经纪人</span>\n'+
                          
                        '</div>\n'+
                        '<div class="con-man">\n'+
                        '<span class="man-tab" title="'+response.agents[0].phone+'">联系他</span>\n'+
                    '</div>\n'+
                        
                    '</div>\n'+
                '</div>\n'+
            '</div>\n' 

            lunbo += detilLunbo+lunbonext+lunbosecond;
            $('.houseDetil-wrap').append(lunbo);

            require(['slide'],function(){
            });

            var detilHouse="";
            detilHouse +=
            '<div class="house-detil">\n'+
                '<div class="detil-title">\n'+
                    '<div class="detil-biaoti">\n'+
                        '<span>房屋信息</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="basic-info">\n'+
                    '<ul>\n'+
                        '<li class="f1 online">基本信息</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>发布:</span>\n'+
                            '<span>'+ response.rentHouse.con_time+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>入住:</span>\n'+
                            '<span>随时入住</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">&nbsp;</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>租期:</span>\n'+
                            '<span>'+response.rentHouse.rent_time+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>看房:</span>\n'+
                            '<span>需提前预约</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">&nbsp;</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>楼层:</span>\n'+
                            '<span>'+response.rentHouse.floor+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>电梯:</span>\n'+
                            '<span>'+response.rentHouse.elevator+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">&nbsp;</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>用水:</span>\n'+
                            '<span>'+response.rentHouse.eletric+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>用电:</span>\n'+
                            '<span>'+response.rentHouse.water+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">&nbsp;</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>燃气:</span>\n'+
                            '<span>'+response.rentHouse.fire+'</span>\n'+
                        '</li>\n'+
                    '</ul>\n'+
                '</div>\n'+
                '<hr>\n'+
                '<div class="equip-info">\n'+
                    '<ul>\n'+
                        '<li class="f1 online">配套设施</li>\n'
                        
                        if(response.rentHouse.tv){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont icondianshi"></i><span>电视</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont icondianshi-copy-copy"></i><span>电视</span></li>\n'
                        }
                        if(response.rentHouse.fridge){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconbingxiang"></i><span>冰箱</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconbingxiang-copy"></i><span>冰箱</span></li>\n'
                        }
                        if(response.rentHouse.washer){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconxiyiji"></i><span>洗衣机</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconxiyiji-copy"></i><span>洗衣机</span></li>\n'
                        }
                        if(response.rentHouse.air_condition){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconkongtiaoiconx"></i><span>空调</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconkongtiaoiconx-copy"></i><span>空调</span></li>\n'
                        }
                        if(response.rentHouse.shower){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconreshuiqi"></i><span>热水器</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconreshuiqi-copy"></i><span>热水器</span></li>\n'
                        }
                        if(response.rentHouse.bed){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconchuang"></i><span>床</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconchuang-copy"></i><span>床</span></li>\n'
                        }
                        if(response.rentHouse.wifi){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconWIFIwofi1"></i><span>WIFI</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconWIFIwofi1-copy"></i><span>WIFI</span></li>\n'
                        }
                        if(response.rentHouse.heating){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconnuanqi"></i><span>暖气</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconnuanqi-copy"></i><span>床</span></li>\n'
                        }
                        if(response.rentHouse.closespress){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconyigui"></i><span>衣柜</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconyigui-copy"></i><span>衣柜</span></li>\n'
                        }
                        if(response.rentHouse.gas){
                            detilHouse +=
                            '<li class="f1 online"><i class="iconfont iconyigui"></i><span>天然气</span></li>\n'
                        }else{
                            detilHouse +=
                            '<li class="f1 online iconNo"><i class="iconfont iconyigui-copy"></i><span>天然气</span></li>\n'
                        }    
                    '</ul>\n'+
                '</div>\n'+
            '</div>'
            '<hr>'         
            $('.houseDetil-wrap').append(detilHouse);
            
            var mapWrapper = "";
            mapWrapper += 
            '<div class="map-Wrapper">\n'+
                '<div class="detil-title">\n'+
                    '<div class="detil-biaoti">\n'+
                        '<span>地址和交通</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<iframe id="ted" src="./detil.html?x='+response.rentHouse.housex+'&y='+response.rentHouse.housey+'"></iframe>\n'+
           '</div>'
            $('.houseDetil-wrap').append(mapWrapper);
    }
    function share(response){
        console.log(response);
        var rootImg = new Array();
        var rootAddName = new Array();
        var rootAddDesc = new Array();
        var rootAreaType = new Array();
        var rootPosition = new Array();
        var rootPrice = new Array();
        var id = new Array();

        for (var i = 0; i < 4; i++) {
            rootImg[i] = response[i].url[0];
            rootAddName[i] = response[i].name;
            rootAddDesc[i] =response[i].address;
            rootAreaType[i] = response[i].type;
            rootPosition[i] = response[i].position;
            rootPrice[i] = response[i].price;
            id[i] = response[i].id;
        }

        var rootDesc = "";
        
            rootDesc +=
            '<div class="shareWrapper">\n'+
                '<div class="detil-title">\n'+
                    '<div class="detil-biaoti">\n'+
                        '<span>好房推荐</span>\n'+
                    '</div>\n'+
                '</div>\n'
            for (var j = 0; j < 4; j++) {
                rootDesc +=
             
                '<div class="root-detil">\n' +
                '   <a href="./detilHouse.html?id='+id[j]+'">\n' +
                '       <img src="' + rootImg[j] + '">\n' +
                '   </a>\n' +
                '   <p class="address">' + rootAddName[j] + '·' + rootAddDesc[j] + '·' + rootPosition[j] + '</p>\n' +
                '   <div class="span-bottom">\n' +
                '       <span class="area">' + rootAreaType[j] + '</span>\n' +
                '       <span class="price">' + rootPrice[j] + '元/月</span>\n' +
                '   </div>\n' +
                '</div>\n' 
            }
            rootDesc +='</div>'

        $('.houseDetil-wrap').append(rootDesc);

    }
   
}); 
