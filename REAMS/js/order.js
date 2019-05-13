/**
 * created by liulian on 2019/04/23
 */

require(['jquery', 'bootstrap','bootstrapvalidator','login'], function () {

    $(document).ready(function () {

        var phone = getUrlParam('phone');
        console.log(phone);
        /**
         * 根据手机号渲染页面
         */
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
                fillcon(response.greenHouseTests);
                $(".result-item").remove();
                console.log(response.agents.length)
                var img = "";
                if(response.agents.length){
                    img = response.agents[0].image
                }else{
                    img = "../img/person.png"
                }
                console.log(img);

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
                $(".left-wrapper").append(left);

                var right ="";
                right +=
                '<div id="myTabContent" class="tab-content">\n' +
                    '<div class="tab-pane fade in active" id="myContribute"></div>\n' +
                    '<div class="tab-pane fade" id="myorder">\n'+
                    '<p>最新</p>\n'+ 
                    '</div>\n' +
                    '<div class="tab-pane fade" id="mydetil">\n'+
                    // '<p>最kk</p>\n'+ 
                    '</div>\n' +
                '</div>\n'
                $(".right-wrapper").append(right);

                $("#myContribute").append(fillcon(response.greenHouseTests));

                /**
                 * 填充个人资料页面
                 */
                // 手机号应从导航或者token中获取，这里只是做示范
                fillDetil(response.agents[0].phone);

               

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
                            alert("修改成功！");
                            window.location.reload();
                        },
                        error:function(response){
                            // console.log(response);
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
});