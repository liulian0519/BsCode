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

                $(".userOwner").hover(function () {

                    $(this).find('#user2').show();
                    $(this).find('#user').hide();
                }, function () {
                    $(this).find('#user2').hide();
                    $(this).find('#user').show();
                });     
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
            var phone = response[i].user_phone.substring(0, 3) + '****' + response[i].user_phone.substring(7, 11);
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
                        '<span class="block-type"><a href="modifyRelease.html?id=' + response[i].id + '">修改</a></span>\n'+
                        '<div class="userOwner" style="float:right;padding-right:30px"><span>房东:</span><span id="user">'+phone+'</span><span id="user2" style="display:none">'+response[i].user_phone+'</span></div>\n'+
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
                    console.log(response.newHouses);
                    $("#myorder").append(fillNew(response.newHouses,response.preOrders));
                    // 删除操作
                    $(".delete").on("click", function () {
                        console.log($(this).attr('id').substring(9));
                    }); 
                    // 修改操作
                    // $(".modify").on("click", function () {
                    //     // console.log($(this).attr('id').substring(9));
                    //     // $('.ttt').attr('id','myModal');
                    //     // var id = $(this).attr('id').substring(9);
                    //     // var rent_phone = $();
                    //     // var c ;
                    //     // $("#prePhone").bind("input oninput",function(event){
                    //     //     // console.log($("#prePhone").val())
                    //     //     rent_phone = $("#prePhone").val();
                    //     //     console.log(rent_phone)
                    //     //     c = rent_phone;
                    //     // }(c));
                    //     // console.log(c)
                    //     var rent_phone = $(this).children("#prePhone").val();
                    //     var order_time =  $("#preTime").val();
                    //     var reqData = {
                    //         "id":id,
                    //         "rent_phone":rent_phone,
                    //         "order_time" :order_time,
                    //     }
                        
                    //     $(".preorder").bind("click",function(){
                    //         console.log(reqData)
                    //     });
                    //     // $.ajax({
                    //     //     type: "post",
                    //     //     url: "http://localhost:8080/preorderUpdate",
                    //     //     data: {
                    //     //         id:id
                    //     //     },
                    //     //     dataType: "json",
                    //     //     success: function (response) {
                    //     //         console.log(response);
                    //     //         alert("修改成功");
                    //     //         window.location.reload();
                    //     //     },
                    //     //     error:function (response) { 
                    //     //         console.log(response);
                    //     //         alert("修改失败");
                    //     //         window.location.reload();
                    //     //     }
                    //     // });
                    // }); 

                    if($("#newTime").text() == "已过期"){
                        $("#newDelete").removeClass("hide");
                    }
                }
                if(response.greenHouseTests.length !=0){
                    $("#myorder").append(fillGreen(response.greenHouseTests,response.preOrders));
                    if($("#greenTime").text() == "已过期"){
                        $(".greenDelete").removeClass("hide");
                    }
                    $(".greenDelete").on("click", function () {
                        // console.log($(this).attr('id').substring(11))
                        var id = $(this).attr('id').substring(11)
                        $.ajax({
                            type: "post",
                            url: "http://localhost:8080/preorderDelete",
                            data: {
                                id:id
                            },
                            dataType: "json",
                            success: function (response) {
                                console.log(response);
                                alert("删除成功");
                                window.location.reload();
                            },
                            error:function (response) { 
                                console.log(response);
                                alert("删除失败");
                                window.location.reload();
                            }
                        });
                    }); 
                }
                if(response.rentHouses.length!=0){
                    $("#myorder").append(fillRent(response.rentHouses,response.preOrders));
                    // console.log($("#rentTime").text())
                    if($("#rentTime").text() == "已过期"){
                        $(".rentDelete").removeClass("hide");
                    }
                    $(".rentDelete").on("click", function () {
                        // console.log($(this).attr('id').substring(10));
                        // 删除操作
                        var id = $(this).attr('id').substring(10)
                        $.ajax({
                            type: "post",
                            url: "http://localhost:8080/preorderDelete",
                            data: {
                                id:id
                            },
                            dataType: "json",
                            success: function (response) {
                                console.log(response);
                                alert("删除成功");
                                window.location.reload();
                            },
                            error:function (response) { 
                                console.log(response);
                                alert("删除失败");
                                window.location.reload();
                            }
                        });
                    }); 
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
    function fillNew(response,preOrders){
        console.log(response);
        console.log(preOrders);
        var preoderID = new Array()
        for(var i = 0;i<preOrders.length;i++){
            for(var j=0;j<response.length;j++){
                if(preOrders[i].newhouse_id == response[j].id){
                    preoderID.push(preOrders[i].id)
                }
            }
        }
        console.log(preoderID)
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
            detil +=
                '<div class="result-item">\n' +
                '<div class="result-img">\n' +
                '<a href="newHouseDetil.html?id=' + response[i].id + '">\n' +
                '<img src="' + response[i].url[0] + '">\n' +
                '</a>\n' +
                '</div>\n' +
                '<div class="result-detil">\n' +
                '<div id="box" class="detil-title">\n' +
                '<span class="name">\n' +
                '<a href="newHouseDetil.html?id=' + response[i].id + '">' + response[i].name + '</a>\n' +
                '</span>\n' +
                '<span class="block-type" style="background: ' + ba + ';">' + response[i].status + '</span>\n' +
                '<span class="block-type" style="background: ' + typeBg + ';">' + response[i].type + '</span>\n' +
                '<span id="newDelete'+preoderID[i]+'" class="block-type hide delete" style="background:#FE615A;">删除</span>\n'+
                '<span class="logo" style="background:#DAAc24">新房</sapn>\n'+
                '</div>\n' +
                '<div class="detil-content" style=" margin-bottom: 48px;">\n' +
                '<a><i class="iconfont iconditu"></i>' + response[i].address + '</a>\n' +
                // '<span id="newModify'+preoderID[i]+'" class="block-type  modify" style="background:#B199FF;" data-toggle="modal" data-target="#myModal">修改</span>\n'+
                '</div>\n' +
                '<div class="detil-surround">\n' +
                '<span class="surround-type" style="background: ' + ba + '; color:#fff">' + response[i].status + '</span>\n' +
                '<span class="surround-type">随时看房</span>\n' +
                '<span id="newTime" class="surround-type" style="background:'+bat+';color:#fff;margin-left:20px">'+time+'</span>\n' +
                '<sapn style=";color:'+textba+'" >时间&nbsp'+response[i].order_time+'</span>\n'+
                '<sapn style="margin-left:10px;color:'+textba+'">手机号码&nbsp'+response[i].rent_phone+'</span>\n'+
                '</div>\n' +
                '<div class="detil-price">\n' +
                '<p>' + response[i].price + '<span>元/平</span></p>\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="modal ttt fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n'+
            '<div class="modal-dialog">\n'+
                '<div class="modal-content">\n'+
                    '<div>\n'+
                        '<p>请输入预约信息</p>\n'+
                        '<span class="preSpan">预约时间</span>\n'+
                        '<input type="date" id="preTime" class="form-control">\n'+
                        '<span class="preSpan1">手机号码</span>\n'+
                        '<input type="text" id="prePhone" class="form-control" >\n'+
                        '<button class="btn preorder">确定</button>\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n'+
                '<hr>\n'
        }
        return detil;
    }
    function fillGreen(response,preOrders){
        console.log(response);
        console.log(preOrders);
        var preoderID = new Array();
        for(var i = 0;i<preOrders.length;i++){
            for(var j=0;j<response.length;j++){
                if(preOrders[i].greenhouse_id == response[j].id){
                    preoderID.push(preOrders[i].id)
                }
            }
        }
        console.log(preoderID)
        var detil = "";
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
                        '<span id="greenDelete'+preoderID+'" class="block-type hide greenDelete delete" style="background:#FE615A;">删除</span>\n'+
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
                        '<span id="greenTime" class="surround-type" style="background:'+bat+';color:#fff;margin-left:12px">'+time+'</span>\n' +
                        '<sapn style="color:'+textba+'">时间&nbsp'+response[i].order_time+'</span>\n'+
                        '<sapn style="margin-left:10px;color:'+textba+'">手机号码&nbsp'+response[i].rent_phone+'</span>\n'+
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
    function fillRent(response,preOrders){
        var preoderID = new Array();
        for(var i = 0;i<preOrders.length;i++){
            for(var j=0;j<response.length;j++){
                if(preOrders[i].renthouse_id == response[j].id){
                    preoderID.push(preOrders[i].id)
                }
            }
        }
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
                // $("#test1").addClass("show")
                // $("#test1").removeClass("hide");
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
                '<span id="rentDelete'+preoderID+'" class="block-type hide rentDelete delete" style="background:#FE615A;">删除</span>\n'+
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
                '<span id="rentTime" class="surround-type" style="background:'+bat+';color:#fff;margin-left:12px">'+time+'</span>\n' +
                '<sapn style="color:'+textba+'">时间&nbsp'+response[i].order_time+'</span>\n'+
                '<sapn style="margin-left:10px;color:'+textba+'">手机号码&nbsp'+response[i].rent_phone+'</span>\n'+
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
        return year + "-" + month + "-" + date;  
    } 
    
});