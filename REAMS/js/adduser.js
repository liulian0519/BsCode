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
        $(".logout").bind("click", function(){
            alert("退出成功");
            setCookie('phone', "",  -1);
            window.location.reload();
        });

        // 表单验证
        $('#defaultForm').bootstrapValidator({
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
                            message: '请输入有效的客户名'
                        }
                    }
                },
                address:{
                    validators: {
                        notEmpty: {
                            message: '请输入有效的客户地址'
                        }
                    }
                },
                phone:{
                    validators: {
                        notEmpty: {
                            message: '请输入有效的手机号码'
                        }
                    }
                }

            }
        });
           // 阻止默认事件
        $("#defaultForm").submit(function (ev) { ev.preventDefault(); });

        $("#validateBtn").on("click", function () {
            $('.has-error .price span').css("top", "15%");
            var bootstrapValidator = $("#defaultForm").data('bootstrapValidator');
            bootstrapValidator.validate();
            if (bootstrapValidator.isValid()) {
                var name = $('input[name="name"]').val();
                var address = $('input[name="address"]').val();
                var phone = $('input[name="phone"]').val();
                var rentHouse_id = 0;
                var newHouse_id = 0;
                var greenHouse_id = 0;
                var type = 0;

                var owner={
                    "name":name,
                    "address":address,
                    "phone":phone,
                    "rentHouse_id":rentHouse_id,
                    "newHouse_id":newHouse_id,
                    "greenHouse_id":greenHouse_id
                }
                var rent={
                    "name":name,
                    "address":address,
                    "phone":phone,
                    "rentHouse_id":rentHouse_id,
                    "newHouse_id":newHouse_id,
                    "greenHouse_id":greenHouse_id,
                    "type":type
                }

                var identy = $('select[name="identy"] option:selected').val();
                console.log(identy);
                if(identy == '房东'){
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/userAdd",
                        data: owner,
                        dataType: "json",
                        success: function (response) {
                            alert("提交成功");
                            window.location.reload();
                        },
                        error:function(response){
                            console.log(response);
                        }
                    });
                    // console.log(owner);
                }
                if(identy == '房客'){
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/rentAdd",
                        data: rent,
                        dataType: "json",
                        success: function (response) {
                            alert("提交成功");
                            window.location.reload();
                        },
                        error:function(response){
                            console.log(response);
                        }
                    });
                }
                // 发送数据
                // http://localhost:8080/userAdd
            }
            else return;

        });
        $('#resetBtn').click(function () {
            $('#defaultForm').data('bootstrapValidator').resetForm(true);
        });
    });
});
