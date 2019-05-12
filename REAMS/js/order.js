/**
 * created by liulian on 2019/04/23
 */

require(['jquery', 'bootstrap','bootstrapvalidator','login'], function () {

    $(document).ready(function () {

        var phone = getUrlParam('phone');
        console.log(phone);
        fillData(phone);

        function getUrlParam(name) {
            var search = decodeURIComponent(location.search);
            var reg = new RegExp(".*" + name + "\\=" + "([^&]*)(&?.*|)", "g");
            return search.replace(reg, "$1");

        }

    }); 

    function fillData(phone){
        $.ajax({
            type: "post",
            url: "http://localhost:8080/selectByPhone",
            data: {
                "phone":phone
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                // fill(response.greenHouseTests);
                // $(".result-item").remove();
                // console.log(response.agents.length)
                var img = "";
                if(response.agents.length){
                    img = response.agents[0].image
                }else{
                    img = "../img/person.png"
                }
                console.log(img)
                
                // if(!response.agents[0].image){
                //     response.agents[0].image = '../img/person.png';
                // }
                var left = "";
                left +=
                '<div class="head-path">\n'+
                    '<img style="border:1px solid #ccc;border-radius:50%;width:80px;height: 80px" src="'+img+'">\n'+
                '</div>\n'+
                '<ul class="nav nav-stacked main-nav">\n'+
                    '<li class="active"><a href="#myContribute" data-toggle="tab">我的发布</a></li>\n'+
                    '<li><a href="#myorder"  data-toggle="tab">我的订单</a></li>\n'+
                    '<li><a href="#mydetil" data-toggle="tab">我的信息</a></li>\n'+
                '</ul>\n'
                // $(".left-wrapper").append(left);

                var right ="";
                right +=
                '<div id="myTabContent" class="tab-content">\n' +
                    '<div class="tab-pane fade in active" id="myContribute"></div>\n' +
                    '<div class="tab-pane fade" id="myorder">\n'+
                    '<p>最新</p>\n'+ 
                    '</div>\n' +
                    '<div class="tab-pane fade" id="mydetil">\n'+
                    '<p>最kk</p>\n'+ 
                    '</div>\n' +
                '</div>\n'
                // $(".right-wrapper").append(right);
                // $("#myContribute").append(fill(response.greenHouseTests));
            },
            error:function(response){
                console.log(response);
            }
        });
    }
    function fill(response){
       console.log(response)
        var detil = "";
        if(response.length <=0){
            detil +=
            '<div class="detil-title">\n'+
                '<div class="info-no">\n'+
                '<img src="//img.58cdn.com.cn/crop/biz/pc/vip_new/images/yinhe-info/fbtiezi.png" alt=""></img>\n'+
                '<span class="name">您暂时还没有发布信息呦！</span>\n'+
            
                '</div>\n'+
            '</div>\n'
            
        }
        for(var i=0;i<response.length;i++){
            detil +=
            '<div class="result-item">\n'+
                '<div class="result-img">\n'+
                    '<a href="greenHouseDetil.html?id=' + response[i].id + '">\n' +
                        '<img src="'+response[i].url[0]+'">\n'+
                    '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                    '<div class="detil-title">\n'+
                        '<span class="name">\n'+
                            '<a href="greenHouseDetil.html?id=' + response[i].id + '">'+response[i].name+'|'+response[i].area_type+'|'+response[i].position+'</a>\n'+
                        '</span>\n'+
                    '</div>\n'+
                    '<div class="detil-content">\n'+
                        '<a><i class="iconfont iconditu"></i>'+response[i].address+'</a>\n'+
                        '<a><i class="iconfont iconfangzi1"></i>'+response[i].floor+' | '+response[i].build_time+'建 | '+response[i].area_type+' | '+response[i].area+'平方米 | '+response[i].position+' </a>\n'+
                        '<a><i class="iconfont iconshijian"></i>' + response[i].con_time + '</a>\n' +
                        '</div>\n'+
                    '<div class="detil-surround">\n'+
                        '<span class="block-type" style="background: #FB9252;">'+response[i].build_use+'</span>\n'+
                        '<span class="surround-type">随时看房</span>\n'+
                    '</div>\n'+
                    '<div class="detil-price">\n' +
                        '<p>'+response[i].price+'<span>万</span></p>\n' +
                    '</div>\n' +
                '</div>\n' +
                '<hr>\n' +
            '</div>\n'              
        }
        return detil;
        
    }
});