
/**
 * created by liulian on 2019/05/20
 */


require(['jquery', 'bootstrap', 'bootstrapvalidator', 'zh', 'login', 'popt', 'cityjson', 'cityset'], function () {

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

        }
        $(".logout").bind("click", function () {
            alert("退出成功");
            setCookie('phone', "", -1);
            window.location.reload();
        });
        // $('.btn-order').click(function () {
        //     var phone = getUrlParam('phone');
        //     var url = "order.html?phone=" + phone;
        //     $(".jump").attr("href", url);
        // })

        function getFormatDate() {
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
            var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            return year + "-" + month + "-" + date;
        }

        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        // Generate a simple captcha
        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        var green_id = getUrlParam('id');
        $.ajax({
            type: "post",
            url: "http://localhost:8080/greenHouseById",
            data: {
                green_id: green_id
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                // console.log(response.greenHouse.area_type.substring(4,5))
                // $("type").val(response.greenHouse.build_use);
                
                var result = "";
                result += 
                '<div class="mainone">\n'+
                '<span class="title">房源基本信息</span>\n'+
                '<div class="form-group" style="margin-top:15px;">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>小区名称</label>\n'+
                    '<div class="col-lg-6">\n'+
                        '<input type="text" class="form-control" name="name" value="'+response.greenHouse.name+'"/>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>小区地址</label>\n'+
                    '<div class="col-lg-6">\n'+
                        '<input type="text" class="form-control" name="address" value="'+response.greenHouse.address+'" />\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>房屋户型</label>\n'+
                    '<div class="col-lg-3  houseone">\n'+
                        '<input type="text" class="form-control" maxlength="1" name="houseone" value="'+response.greenHouse.area_type.substring(0,1)+'"  />\n'+
                        '<span>室</span>\n'+
                    '</div>\n'+
                    '<div class="col-lg-3 housetwo">\n'+
                        '<input type="text" class="form-control" maxlength="1" name="housetwo" value="'+response.greenHouse.area_type.substring(2,3)+'"  />\n'+
                        '<span>厅</span>\n'+
                    '</div>\n'+
                    '<div class="col-lg-3 housethree">\n'+
                        '<input type="text" class="form-control" maxlength="1" name="housethree" value="'+response.greenHouse.area_type.substring(4,5)+'"  />\n'+
                        '<span>卫</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group area">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>房屋面积</label>\n'+
                    '<div class="col-lg-6">\n'+
                        '<input type="text" class="form-control" name="area" value="'+response.greenHouse.area+'"  />\n'+
                        '<span>㎡</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>预售价</label>\n'+
                    '<div class="col-lg-6 price">\n'+
                        '<input type="text" class="form-control" name="price" value="'+response.greenHouse.price+'"  />\n'+
                        '<span>万元</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label">小区均价</label>\n'+
                    '<div class="col-lg-6 price">\n'+
                        '<input type="text" class="form-control" name="avgprice" value="'+response.communityList[0].avg_price+'" />\n'+
                        '<span>平/月</span>\n'+
                    '</div>\n'+
                '</div>\n'+
               
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>房屋类型</label>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="type">\n'+
                            '<option value="请选择">请选择</option>\n'+
                            '<option value="住宅" selected>住宅</option>\n'+
                            '<option value="公寓">公寓</option>\n'+
                            '<option value="别墅">别墅</option>\n'+
                            '<option value="四合院">四合院</option>\n'+
                            '<option value="其他">其他</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="build-type">\n'+
                            '<option value="请选择">请选择</option>\n'+
                            '<option value="塔楼" selected>塔楼</option>\n'+
                            '<option value="板楼">板楼</option>\n'+
                            '<option value="塔板结合">塔板结合</option>\n'+
                            '<option value="其他">其他</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>供暖方式</label>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="heating">\n'+
                            '<option value="请选择">请选择</option>\n'+
                            '<option value="1" selected>集中供暖</option>\n'+
                            '<option value="0">自供暖</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>抵押信息</label>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="mortgage">\n'+
                            '<option value="请选择">请选择</option>\n'+
                            '<option value="1" selected>有抵押</option>\n'+
                            '<option value="0">无抵押</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>电梯情况</label>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="elevator">\n'+
                            '<option value="请选择">请选择</option>\n'+
                            '<option value="1" selected>有</option>\n'+
                            '<option value="0">没有</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                    '<div class="col-lg-4">\n'+
                        '<input type="text" class="form-control" name="laderhouse" value="'+response.greenHouse.ladder_house+'" />\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>房屋朝向</label>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="position">\n'+
                            '<option value="请选择" >请选择</option>\n'+
                            '<option value="东">东</option>\n'+
                            '<option value="西">西</option>\n'+
                            '<option value="南" selected>南</option>\n'+
                            '<option value="北">北</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                    '<div class="col-lg-4">\n'+
                        '<select class="form-control" name="decorate">\n'+
                            '<option value="请选择">请选择</option>\n'+
                            '<option value="精装修" selected>精装修</option>\n'+
                            '<option value="简装修">简装修</option>\n'+
                            '<option value="毛坯">毛坯</option>\n'+
                            '<option value="其他">其他</option>\n'+
                        '</select>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>楼层</label>\n'+
                    '<div class="col-lg-4 floor">\n'+
                        '<span class="left">第</span>\n'+
                        '<input type="text" class="form-control" name="floor" style="padding-left:100px;" value="'+response.greenHouse.floor.substring(0,2)+'" />\n'+
                        '<span>层</span>\n'+
                    '</div>\n'+
                    '<div class="col-lg-4 floor">\n'+
                        '<span class="left">共</span>\n'+
                        '<input type="text" class="form-control" name="all" style="padding-left:100px;"   value="'+response.greenHouse.floor.substring(4,6)+'" />\n'+
                        '<span>层</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>产权</label>\n'+
                    '<div class="col-lg-6 rightage">\n'+
                        '<input type="text" class="form-control" name="rightage" value="'+response.greenHouse.right_age+'" />\n'+
                        '<span>年</span>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>建筑年代</label>\n'+
                
                '<div class="col-lg-6 rightage">\n'+
                    '<input type="date" class="form-control" name="datetime" value="'+response.communityList[0].build_time+'" />\n'+
                '</div>\n'+
            '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont"></i>规划户数</label>\n'+
                    '<div class="col-lg-4 ">\n'+
                        '<input type="text"  class="form-control" name="buildnum" value="'+response.communityList[0].build_num+'" />\n'+
                    '</div>\n'+
                '</div>\n'+

                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>挂牌时间</label>\n'+
                    '<div class="col-lg-4 ">\n'+
                        '<input type="date" class="form-control" name="contime" value="'+response.greenHouse.con_time+'" />\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
            '<div class="mainthree">\n'+
                '<span class="title">房东基本信息</span>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>房东手机号码</label>\n'+
                    '<div class="col-lg-6">\n'+
                        '<input type="text" class="form-control" name="userPhone" value="'+response.greenHouse.user_phone+'" />\n'+
                    '</div>\n'+
                '</div>\n'+
            '</div>\n'+
            '<div class="maintwo">\n'+
                '<span class="title">房源个性描述</span>\n'+
                '<div class="form-group" style="margin-top:15px;">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>小区简介</label>\n'+
                    '<div class="col-lg-8">\n'+
                        '<textarea class="form-control" rows="3" name="introduce"></textarea>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>周边环境</label>\n'+
                    '<div class="col-lg-8">\n'+
                        '<textarea class="form-control" rows="3" name="surrounding"></textarea>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>户型优势</label>\n'+
                    '<div class="col-lg-8">\n'+
                        '<textarea class="form-control" rows="3" name="keysale"></textarea>\n'+
                    '</div>\n'+
                '</div>\n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>公交情况</label>\n'+
                    '<div class="col-lg-8">\n'+
                        '<textarea class="form-control" rows="3" name="traffic"></textarea>\n'+
                    '</div>\n'+
                '</div> \n'+
                '<div class="form-group">\n'+
                    '<label class="col-lg-3 control-label"><i class="iconfont iconbitian2-5"></i>上传图片</label>\n'+
                    '<div class="col-lg-8">\n'+
                        '<input type="file" id="pic" name="file">\n'+
                    '</div>\n'+
                '</div> \n'+
            '</div>\n'+
            '<div class="form-group">\n'+
                '<div class="col-lg-9 col-lg-offset-3">\n'+
                    '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" id="validateBtn">修改</button>\n'+
                '</div>\n'+
            '</div>\n'
            $('#defaultForm').append(result);          
          
            var model = "";
            model +=
        '<div class="modal mymodal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n'+
        '<div class="modal-dialog">\n'+
            '<div class="modal-content">\n'+
               '<div>\n'+
                    '<p>修改成功！请等待审核</p>\n'+
                    '<button class="btn btn-order"><a href="order.html?phone=' + cookie+'" class="jump">我的发布</a></button>\n'+
                    '<button class="btn btn-index"><a href="index.html">回首页</a></button>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n'
   
        $('.row').append(model); 
           
          
            $('textarea[name="introduce"]').val(response.communityList[0].introduce);
            $('textarea[name="surrounding"]').val(response.communityList[0].surrouding);
            $('textarea[name="traffic"]').val(response.communityList[0].traffic);
            $('textarea[name="keysale"]').val(response.communityList[0].key_sale);
            
            },
            error: function (response) {
                console.log(response);
            }
        });


        // 下边是复制过来的
        $('#defaultForm').bootstrapValidator({
            //        live: 'disabled',        
            message: '请输入有效信息',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: '小区名称不能为空'
                        }
                    }
                },
                address: {
                    validators: {
                        notEmpty: {
                            message: '小区地址不能为空'
                        }
                    }
                },
                houseone: {
                    validators: {
                        notEmpty: {
                            message: '厅室不能为空'
                        },
                        regexp: {
                            regexp: /^[0-9\.]+$/,
                            message: '只能是1位正整数'
                        },
                    }
                },
                housetwo: {
                    validators: {
                        notEmpty: {
                            message: '厅室不能为空'
                        },
                        regexp: {
                            regexp: /^[0-9\.]+$/,
                            message: '只能是1位正整数'
                        },
                    }
                },
                housethree: {
                    validators: {
                        notEmpty: {
                            message: '厅室不能为空'
                        },
                        regexp: {
                            regexp: /^[0-9\.]+$/,
                            message: '只能是1位正整数'
                        },
                    }
                },
                area: {
                    validators: {
                        notEmpty: {
                            message: '房屋面积不能为空'
                        }
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: '价钱不能为空'
                        }
                    }
                },

                username: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The username is required and cannot be empty'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        },
                        remote: {
                            url: 'remote.php',
                            message: 'The username is not available'
                        },
                        different: {
                            field: 'password',
                            message: 'The username and password cannot be the same as each other'
                        }
                    }
                },
                floor: {
                    validators: {
                        notEmpty: {
                            message: '楼层不能为空'
                        }
                    }
                },
                all: {
                    validators: {
                        notEmpty: {
                            message: '总楼层数不能为空'
                        }
                    }
                },
                rightage: {
                    validators: {
                        notEmpty: {
                            message: '产权年限不能为空'
                        }
                    }
                },
                laderhouse: {
                    validators: {
                        notEmpty: {
                            message: '梯户比例不能为空'
                        }
                    }
                },
                datetime: {
                    validators: {
                        notEmpty: {
                            message: '建筑年代不能为空'
                        }
                    }
                },
                contime: {
                    validators: {
                        notEmpty: {
                            message: '挂牌时间不能为空'
                        }
                    }
                },
                userPhone: {
                    validators: {
                        notEmpty: {
                            message: '房东手机号码不能为空'
                        }
                    }
                },
                introduce: {
                    validators: {
                        notEmpty: {
                            message: '小区简介不能为空'
                        }
                    }
                },
                surrounding: {
                    validators: {
                        notEmpty: {
                            message: '周边环境不能为空'
                        }
                    }
                },
                keysale: {
                    validators: {
                        notEmpty: {
                            message: '户型优势不能为空'
                        }
                    }
                },
                traffic: {
                    validators: {
                        notEmpty: {
                            message: '公交情况不能为空'
                        }
                    }
                },

                file: {
                    validators: {
                        notEmpty: {
                            message: '上传图片不能为空'
                        },
                        file: {
                            extension: 'png,jpg,jpeg',
                            type: 'image/png,image/jpg,image/jpeg',
                            message: '请重新选择图片'
                        }
                    }
                },
                captcha: {
                    validators: {
                        callback: {
                            message: 'Wrong answer',
                            callback: function (value, validator) {
                                var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                                return value == sum;
                            }
                        }
                    }
                }
            }
        });

        // 阻止默认事件
        // $("#defaultForm").submit(function (ev) { ev.preventDefault(); });

        // $("#defaultForm").on('click','#validateBtn',function(){
        //    console.log("123")
        //     });
        // $("#validateBtn").bind("click",function(event){
        //     event.stopPropagation();
        //     event.preventDefault()
        //     console.log("15151");
        // })
        $("#defaultForm").on("click",'#validateBtn', function () {
            $('.has-error .price span').css("top", "15%");
            var bootstrapValidator = $("#defaultForm").data('bootstrapValidator');
            bootstrapValidator.validate();

            // 这个到时候一定要打开
            if (bootstrapValidator.isValid()) {
                // 所有数据
                var greenhouse_id ="";
                var renthous_id = "";
                var newHouse_id = ""
                var housey = "";
                var housex = "";
                var rent_phone = "";
                var exam = 0;
                var community_id ="";
                var type = "";

            var name = $('input[name="name"]').val();
            var address = $('input[name="address"]').val();

            var area_type = "";
            var houseone = $('input[name="houseone"]').val();
            var housetwo = $('input[name="housetwo"]').val();
            var housethree = $('input[name="housethree"]').val();
            area_type += houseone + "室" + housetwo + "厅" + housethree + "卫";

            var area = $('input[name="area"]').val();
            var price = $('input[name="price"]').val();
            var avg_price = $('input[name="avgprice"]').val();
            var build_use = $('select[name="type"] option:selected').val();
            var build_type = $('select[name="build-type"] option:selected').val();

            var heating = $('select[name="heating"] option:selected').val();
            var mortgage = $('select[name="mortgage"] option:selected').val();
            var elevator = $('select[name="elevator"] option:selected').val();
            var ladderhouse = $('input[name="laderhouse"]').val();
            var position = $('select[name="position"] option:selected').val();
            var decorate = $('select[name="decorate"] option:selected').val();

            var floor = "";
            var one = $('input[name="floor"]').val();
            var two = $('input[name="all"]').val();
            floor += '第' + one + '层共' + two + '层';

            var right_age = $('input[name="rightage"]').val();

            var build_time = $('input[name="datetime"]').val();
            var build_num = $('input[name="buildnum"]').val();
            var con_time = $('input[name="contime"]').val();

            // // 房东信息
            
            var userPhone = $('input[name="userPhone"]').val();

            var introdunce = $('textarea[name="introduce"]').val();
            var surrouding = $('textarea[name="surrounding"]').val();
            var key_sale = $('textarea[name="keysale"]').val();
            var traffic = $('textarea[name="traffic"]').val();

            var file = document.getElementById("pic").files[0];
            var data = new FormData;
            data.append("green_id",green_id);
            data.append("uploadedImageFile", file);
            
            data.append("name", name);
            data.append("address", address);
            data.append("avg_price", avg_price);
            data.append("build_time", build_time);
            data.append("build_type", build_type);
            data.append("build_num", build_num);
            data.append("introduce", introdunce);
            data.append("surrouding", surrouding);
            data.append("traffic", traffic);
            data.append("key_sale", key_sale);
            data.append("area", area);
            data.append("area_type", area_type);
            data.append("price", price);
            data.append("floor", floor);
            data.append("position", position);
            data.append("decoration", decorate);
            data.append("ladder_house", ladderhouse);
            data.append("heating", heating);
            data.append("elevator", elevator);
            data.append("build_use", build_use);
            data.append("right_age", right_age);
            data.append("con_time", con_time);
          
            data.append("user_phone", userPhone);
            data.append("rent_phone", rent_phone);

            data.append("mortgage", mortgage);
            data.append("greenHouse_id", greenhouse_id);
            data.append("newhouse_id", newHouse_id);
            data.append("rentHouse_id", renthous_id);
            data.append("housey", housey);
            data.append("housex", housex);
            data.append("exam", exam);
            data.append("community_id", community_id);
            data.append("type", type);
         
            // console.log(data);

                $.ajax({
                        xhrFields: {
                    withCredentials: true
                },
                    type: "post",
                    url: "http://localhost:8080/greenhouseUpdate",
                          contentType: "multipart/form-data",
                contentType: false,
                processData: false,
                    data: data,
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                       
                    },
                    error: function (response) {
                        console.log(response);
                        alert("修改失败")
                    }
                });

            // 将数据传给后台
            // $("#defaultForm").submit();

            // 更新表信息
            // $.ajax({
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     type:"post",
            //     url: "http://localhost:8080/greenHouseAdd",
            //     contentType: "multipart/form-data",
            //     contentType: false,
            //     processData: false,
            //     data: data,
            //     dataType: "json",
            //     success: function (response) {
            //         console.log(response);
            //         // 插入成功则返回greenhouse相关信息

            //         var name = response.name;
            //         var sale_time = getFormatDate();
            //         var area_type = response.area_type;
            //         var area = response.area;
            //         var sale_type = "二手房";
            //         var price = response.price;
            //         var phone = getUrlParam('phone')
            //         var greenhouse_id = response.id;
            //         var newhouse_id = 0;
            //         var renthouse_id = 0;
            //         var user_phone = userPhone;
            //         var reqData = {
            //             "name": name,
            //             "sale_time": sale_time,
            //             "area_type": area_type,
            //             "area": area,
            //             "sale_type": sale_type,
            //             "price": price,
            //             "phone": phone,
            //             "greenhouse_id": greenhouse_id,
            //             "newhouse_id": newhouse_id,
            //             "renthouse_id": renthouse_id,
            //             "user_phone":user_phone
            //         }
            //         console.log(reqData);
            //         // 在我的发布中增加一条信息
            //         $.ajax({
            //             type: "post",
            //             url: "http://localhost:8080/saleorderAdd",
            //             data: reqData,
            //             dataType: "json",
            //             success: function (response) {
            //                 console.log(response);
            //             },
            //             error: function (response) {
            //                 console.log(response);
            //             }
            //         });

            //         // 更新房东表中的数据
            //         // 根据手机号查找信息，再更新
            //         $.ajax({
            //             type: "post",
            //             url: "http://localhost:8080/userByPhone",
            //             data: {
            //                 "phone": userPhone
            //             },
            //             dataType: "json",
            //             success: function (response) {
            //                 console.log(response);
            //                 console.log(response[0].id);
            //                 var id = response[0].id;
            //                 console.log(greenhouse_id);
            //                 $.ajax({
            //                     type: "post",
            //                     url: "http://localhost:8080/userUpdate",
            //                     data: {
            //                         id:id,
            //                         phone:userPhone,
            //                         greenHouse_id:greenhouse_id
            //                     },
            //                     dataType: "json",
            //                     success: function (response) {
            //                         console.log(response);
            //                     },
            //                     error: function (response) {
            //                         console.log(response);
            //                     }
            //                 });
            //             },
            //             error: function (response) {
            //                 console.log(response);
            //             }
            //         });

            //     },
            //     error: function (xhr, errorText, errorType) {
            //         console.log(xhr);
            //     }
            // });
            $('.mymodal').attr('id', 'myModal');

            }


            else return;

        });

        


    });
});