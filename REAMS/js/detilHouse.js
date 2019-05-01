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
        console.log(response.picList[0].url)
        var image = new Array;
        image = response.picList[0].url;
        console.log(image);

        var detilTitle = "";
        detilTitle += 
        '<div class="detil-title">\n' +
            '<div class="detil-biaoti">\n' +
                '<span>'+response.rentHouse.name+'</span>\n' +
                '<span>'+response.rentHouse.area_type+'</span>\n' +
                '<span>'+response.rentHouse.price+'</span>\n' +
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
                '</div>\n'
            '</div>\n' 
            lunbo += detilLunbo+lunbonext+lunbosecond;
       
            $('.houseDetil-wrap').append(lunbo);
            require(['slide'],function(){
            });

            

       
 
    }
   
}); 
