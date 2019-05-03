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
                '</div>\n'+
                '<div class="content-aside">\n'+
                    '<p class="aside-price">\n'+
                        '<span>'+response.rentHouse.price+'元/月</span>\n'+
                    '</p>\n'+
                    '<div class="aside-tab">\n'+
                        '<button class="btn" disabled>'+response.rentHouse.heating+'</button>\n'+
                        '<button class="btn" disabled>集中供暖</button>\n'+
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
                        '<div class="aside-yonghu"></div>\n'+
                        '<div class="man-right">\n'+
                            '<span class="man-name">soul</span>\n'+
                            '<span class="man-detil">PPX经纪人</span>\n'+
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
                    '<ul>\n';
                        '<li class="f1 online">基本信息</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>发布:</span>\n'+
                            '<span>'+ response.rentHouse.con_time+'</span>\n'+
                        '</li>\n'+
                        '<li class="f1 online">\n'+
                            '<span>入住:</span>\n'+
                            '<span>随时入住</span>\n'+
                        '</li>\n'+

            //         <li class="f1 online">&nbsp;</li>
            //         <li class="f1 online">
            //             <span>租期:</span>
            //             <span>暂无数据</span>
            //         </li>
            //         <li class="f1 online">
            //             <span>看房:</span>
            //             <span>需提前预约</span>
            //         </li>
            //         <li class="f1 online">&nbsp;</li>
            //         <li class="f1 online">
            //             <span>楼层:</span>
            //             <span>高楼/32层</span>
            //         </li>
            //         <li class="f1 online">
            //             <span>电梯:</span>
            //             <span>有</span>
            //         </li>
            //         <li class="f1 online">&nbsp;</li>
            //         <li class="f1 online">
            //             <span>车位:</span>
            //             <span>暂无数据</span>
            //         </li>
            //         <li class="f1 online">
            //             <span>用水:</span>
            //             <span>民水</span>
            //         </li>
            //         <li class="f1 online">&nbsp;</li>
            //         <li class="f1 online">
            //             <span>用电:</span>
            //             <span>民电</span>
            //         </li>
            //         <li class="f1 online">
            //             <span>燃气:</span>
            //             <span>有</span>
            //         </li>

            //     </ul>
            // </div>
            // <hr>

            
  $('.houseDetil-wrap').append(detilHouse);
       
 
    }
   
}); 
