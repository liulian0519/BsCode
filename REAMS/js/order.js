/**
 * created by liulian on 2019/04/23
 */

require(['jquery', 'bootstrap','bootstrapvalidator','login'], function () {

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
        }else{
            alert("请先登录");
            window.open("index.html","_self");
            $("#login").addClass("in")
        }
        $(".logout").bind("click", function(){
            alert("退出成功");
            setCookie('phone', "",  -1);
            window.location.reload();
        });

        
        /**
         * 根据手机号渲染页面
         */
        fillData(cookie);

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
                fillcon(response.greenHouseTests);
                $(".result-item").remove();
                console.log(response.agents.length)
                var imgg = "";
                if(response.agents.length){
                    imgg = response.agents[0].image
                }else{
                    imgg = "../img/person.png"
                }
                console.log(imgg);

                var left = "";
                left +=
                '<div class="head-path">\n'+
                    '<img style="border:1px solid #ccc;border-radius:50%;width:80px;height: 80px" src="'+imgg+'">\n'+
                '</div>\n'+
                '<ul class="nav nav-stacked main-nav">\n'+
                    '<li class="active"><a href="#myContribute" data-toggle="tab">我的发布</a></li>\n'+
                    '<li><a href="#myorder"  data-toggle="tab">我的预约</a></li>\n'+
                    '<li><a href="#mydetil" data-toggle="tab">我的信息</a></li>\n'+
                '</ul>\n'
                $(".left-wrapper").append(left);

                var right ="";
                right +=
                '<div id="myTabContent" class="tab-content">\n' +
                    '<div class="tab-pane fade in active" id="myContribute"></div>\n' +
                    '<div class="tab-pane fade" id="myorder">\n'+
                    // '<p>最新</p>\n'+ 
                    '</div>\n' +
                    '<div class="tab-pane fade" id="mydetil">\n'+
                    // '<p>最kk</p>\n'+ 
                    '</div>\n' +
                '</div>\n'
                $(".right-wrapper").append(right);
                /**
                 * 填充我的发布
                 */
                $("#myContribute").append(fillcon(response.greenHouseTests));

                var phone = getCookie('phone');

                /**
                 * 填充个人预约
                 */
                fillorder(phone);



                /**
                 * 填充个人资料页面
                 */
                fillDetil(phone);

            },
            error:function(response){
                console.log(response);
            }
        });
    }
    function fillcon(response){
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
            if(response[i].exam == 1){
                var exam = "审核通过";
                var ba = '#5F94FF';
            }else if(response[i].exam == 0){
                var exam = "未审核";
                var ba = '#849aae';
            }else{
                var exam = "审核未通过";
                var ba = '#fe615a';
            }
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
                        '<span class="block-type" style="background: '+ba+'; margin-left:100px;">'+exam+'</span>\n'+
                        

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
    function fillorder(response){
        $.ajax({
            type: "post",
            url: "http://localhost:8080/agent/list",
            data: {
                "phone":response
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                var detil = "";
                if(response.newHouses.length <= 0 && response.rentHouses.length <= 0 && response.greenHouseTests.length<=0){

                detil +=
                '<div class="detil-title">\n'+
                '<div class="info-no">\n'+
                '<img src="//img.58cdn.com.cn/crop/biz/pc/vip_new/images/yinhe-info/fbtiezi.png" alt=""></img>\n'+
                '<span class="name">您暂时还没有预约看房呦！</span>\n'+
            
                '</div>\n'+
                '</div>\n'  
                $("#myorder").append(detil);
                }
                if(response.newHouses.length!=0){
                    $("#myorder").append(fillNew(response.newHouses));
                }
                if(response.greenHouseTests.length !=0){
                    $("#myorder").append(fillGreen(response.greenHouseTests));
                }
                if(response.rentHouses.length!=0){
                    $("#myorder").append(fillRent(response.rentHouses));
                }
            },
            error:function(response){
                console.log(response);
            }
        }); 
    }
    function fillDetil(phone){
        $.ajax({
            type: "post",
            url: "http://localhost:8080/agent/listByPhone",
            data: {
                "phone":phone
            },
            dataType: "json",
            success: function (response) {
                console.log(response);  
                $("#mydetil").append(fillziliao(response));
                $('.modify').bind("click", function (e) {
                    $('#name').removeAttr("disabled");
                    $("input[name=name]").focus();
                });
                $('.btn-more').bind("click", function (e) {
                    
                    var file = document.getElementById('head-path').files[0];
                    var name = $("input[name=name]").val();
                    var phone = $("input[name=phone]").val();
                    var id = response[0].id;
                    var introduce ="";
                    var type = 0;

                    var data = new FormData;
                    data.append("uploadImageFile",file);
                    data.append("name",name);
                    data.append("phone",phone);
                    data.append("id",id);
                    data.append("type",type);
                    data.append("introduce",introduce);
                    // console.log(data)
                    $.ajax({
                        xhrFields:{
                            withCredentials:true
                        },
                        type: "post",
                        url: "http://localhost:8080/agentUpdate",
                        contentType:"multipart/form-data",
                        contentType: false,
                        processData: false,
                        data: data,
                        dataType: "json",
                        success: function (response) {
                            console.log(response)
                            alert("修改成功！");
                            window.location.reload();
                        },
                        error:function(response){
                            console.log(response);
                            alert("修改成功");
                            window.location.reload();

                        }
                    });
                });
            },
            error:function(response){
                console.log(response)
            }
        });
    }
    function fillziliao(response){
        var result = "";
        result +=
        '<div class="result-item">\n'+
            '<div class="detil-tile">修改个人资料</div>\n'+
            '<div class="result-img">\n'+
                '<img src="'+response[0].image+'" style="width:80px;height: 80px">\n'+
                '<input type="file" id="head-path">\n'+
            '</div>\n'+
            '<div class="info">\n'+
                '<div class="form-group">\n'+
                    '<label class="col-sm-2 control-label">用户名</label>\n'+
                    '<div class="col-sm-4">\n'+
                        '<input type="text" class="form-control" name="name" id="name" value="'+response[0].name+'" disabled="true">\n'+
                    '</div>\n'+
                    '<span class="modify"><i class="iconfont iconxiugai"></i></span>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-sm-2 control-label">手机号</label>\n'+
                    '<div class="col-sm-4">\n'+
                        '<input type="text" class="form-control" id="phone" name="phone" value="'+response[0].phone+'" disabled="true">\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
            '<div class="form-group">\n'+
                '<div class="col-sm-11">\n'+
                    '<button class="btn btn-more">提交</button>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n'
        
        return result;
    }
    function tab(date1,date2){
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if(oDate1.getTime() > oDate2.getTime()){
            console.log('第一个大');
            return false;
        } else {
            console.log('第二个大');
            return true;
        }
    }
    function fillNew(response){
        console.log(response);
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
            var now = getFormatDate();
            console.log(now);
            console.log(response[i].order_time)
            tab(now,response[i].order_time);
            var time =""
            if(tab(now,response[i].order_time)){
                // time = response[i].order_time;
                time = "已预约";
                var bat = "#59A5EB";
                var textba = "#333"
            }else{
                time = "已过期"
                var bat = "#C0C5CF";
                var textba = "#9395a5"
            }
        //     console.log(now)
        //     console.log(response[i].order_time);
        
        //    console.log(timedown(now,response[i].order_time));
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
                '<span class="logo" style="background:#DAAc24">新房</sapn>\n'+
                '</div>\n' +
                '<div class="detil-content" style=" margin-bottom: 48px;">\n' +
                '<a><i class="iconfont iconditu"></i>' + response[i].address + '</a>\n' +
                // '<a><i class="iconfont iconfangzi1"></i>户型 ' + housetype[i] + ' </a>\n' +
                '</div>\n' +
                '<div class="detil-surround">\n' +
                '<span class="surround-type" style="background: ' + ba + '; color:#fff">' + response[i].status + '</span>\n' +
                '<span class="surround-type">随时看房</span>\n' +
                '<span class="surround-type" style="background:'+bat+';color:#fff;margin-left:150px">'+time+'</span>\n' +
                '<sapn style="color:'+textba+'">'+response[i].order_time+'</span>\n'+
                // '<i class="iconfont iconxiugai"></i>\n'+

                '</div>\n' +
                '<div class="detil-price">\n' +
                '<p>' + response[i].price + '<span>元/平</span></p>\n' +
                '</div>\n' +
                '</div>\n' +
                '<hr>\n'
        }
        return detil;
    }
    function fillGreen(response){
        for(var i=0;i<response.length;i++){
            var now = getFormatDate();
            console.log(now);
            console.log(response[i].order_time)
            tab(now,response[i].order_time);
            var time =""
            if(tab(now,response[i].order_time)){
                // time = response[i].order_time;
                time = "已预约";
                var bat = "#59A5EB";
                var textba = "#333"
            }else{
                time = "已过期"
                var bat = "#C0C5CF"
                var textba = "#9395a5"
            }
            var detil = "";
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
                        '<span class="logo">二手房</sapn>\n'+
                    '</div>\n'+
                    '<div class="detil-content">\n'+
                        '<a><i class="iconfont iconditu"></i>'+response[i].address+'</a>\n'+
                        '<a><i class="iconfont iconfangzi1"></i>'+response[i].floor+' | '+response[i].build_time+'建 | '+response[i].area_type+' | '+response[i].area+'平方米 | '+response[i].position+' </a>\n'+
                        '<a><i class="iconfont iconshijian"></i>' + response[i].con_time + '</a>\n' +
                        '</div>\n'+
                    '<div class="detil-surround">\n'+
                        '<span class="block-type" style="background: #FB9252;">'+response[i].build_use+'</span>\n'+
                        '<span class="surround-type">随时看房</span>\n'+
                        // '<span class="surround-type" style="background:#59A5EB; color:#fff;margin-left:150px">已预约</span>\n' +
                        // '<span class="block-type" style="background: '+ba+'; margin-left:100px;">'+exam+'</span>\n'+
                        '<span class="surround-type" style="background:'+bat+';color:#fff;margin-left:150px">'+time+'</span>\n' +
                        '<sapn style="color:'+textba+'">'+response[i].order_time+'</span>\n'+

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
    function fillRent(response){
        var result = ""
        for (var i = 0; i < response.length; i++) {
            if(response[i].heating == 1){
                response[i].heating = "集中供暖"
            }else{
                response[i].heating = "自供暖"
            }
            var now = getFormatDate();
            tab(now,response[i].order_time);
            var time =""
            if(tab(now,response[i].order_time)){
                // time = response[i].order_time;
                time = "已预约";
                var bat = "#59A5EB";
                var textba = "#333"
            }else{
                time = "已过期"
                var bat = "#C0C5CF"
                var textba = "#9395a5"
            }
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
                '<span class="logo" style="background:#B199FF">租房</sapn>\n'+
                '</div>\n' +
                '<div class="detil-address">\n' +
                '<span>' + response[i].address + ' /</span>\n' +
                '<span>' + response[i].area + '㎡ / </span>\n' +
                '<span>' + response[i].position + '</span>\n' +
                '</div>\n' +
                '<div class="detil-time" style="margin-bottom:50px">\n' +
                '<i class="iconfont iconshijian"></i><span>' + response[i].con_time + '</span>\n' +
                '</div>\n' +
                '<div class="ddetil-type">\n' +
                '<button class="btn" disabled>' + response[i].heating + '</button>\n' +
                '<button class="btn" disabled>随时看房</button>\n' +
                '<span class="surround-type" style="background:'+bat+';color:#fff;margin-left:158px">'+time+'</span>\n' +
                '<sapn style="color:'+textba+'">'+response[i].order_time+'</span>\n'+
                '</div>\n' +
                '<div class="detil-price">\n' +
                '<p>'+response[i].price+'<span>元/月</span></p>\n' +
                // '<span>' + response[i].price + '/月</span>\n' +
                '</div>\n' +
                '</div>\n' +
                '<hr>\n' +
                '</div>\n'
        }
        return result;
    }
    function getFormatDate(){  
        var nowDate = new Date();   
        var year = nowDate.getFullYear();  
        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;  
        var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();  
        // var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();  
        // var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();  
        // var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();  
        return year + "-" + month + "-" + date;  
    }  
});