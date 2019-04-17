/**
 * created by liulian on 2019/04/06
 *  封装登录函数
 */

$('#myLogin').on('click', function () {
    console.log("1145263")
    /** 获取图片验证码 */
    acceptImg();
    /** 模态框隐藏之后的函数 */
    $('#login').on('hidden.bs.modal', function (e) {
        console.log("12344")
    })

});

/** 
 * 图片验证码是否正确 
 * 正确 将手机号+图片验证码发送，并设计倒计时
 * 不正确，提示用户重新输入 
*/
$('#verify_code').on('click', function () {

    imgCodeReg();
})

/**
 * 执行登录逻辑
 * 将手机号+短信验证码传给后台
 * 正确则登录
 * 不正确。 
 * 
*/
$('#reLogin').on('click', function () {

    doLogin();
})



   /**
     * 获取图片验证码
     */
    function acceptImg() {
        // $.ajax({
        //     type:"GET",
        //     // url:"./dataImg.json",
        //     dataType:"json",
        //     success:function(data){
        //         // console.log(data.imgurl);
        //     },
        //     error:function(jqXHR){
        //         console.log("Error: "+jqXHR.status);
        //     }
        // });
        var imgSrc = "https://upassport.ke.com/freshCaptch?t=1554431733278"
        $("#verifyimg").attr('src', imgSrc);
    }

    /**
     * 图片验证码+手机号
     */
    function imgCodeReg() {
        var phoneNum = $('#phone_num').val();
        var imgCode = $('#img_code').val();
        // var phoneCode = $('#phone_code').val();


        if (phoneNum == "" || phoneNum.length !== 11) {
            $('#login_error').removeClass('hide')
            $('.border-t').addClass('input-error');
            $('#login_error').html("请输入有效的手机号码");
            $("#phone_num").focus();
            return;
        } else {
            $('#login_error').addClass('hide');
            $('.border-t').removeClass('input-error');
        }

        if (imgCode == "") {
            $('#login_error').removeClass('hide')
            $('.border-m').addClass('input-error');
            $('#login_error').html("请输入图片验证码");
            $("#img_code").focus();
            return;
        } else {
            $('#login_error').addClass('hide');
            $('.border-m').removeClass('input-error');

            /** 此处应挪至ajax成功之后 
             * 
             *  设计倒计时
            */
            var t = $('#verify_code');
            console.log(t);
            verifyCodeTime(t);
        }


        var reqData = {
            "phoneNum": phoneNum,
            "imgCode": imgCode
        };
        console.log(reqData);
        // 传给后台 如果成功设计倒计时
    }


    /**
     * 倒计时函数
     */
    var time = 10;
    function verifyCodeTime(obj) {
        console.log(obj);
        if (time == 0) {
            // obj.removeAttribute("disabled");
            // obj.removeAttr('disabled');
            obj.removeClass('disabled')
            obj.text("获取验证码");
            time = 60;
            return


        } else {
            // console.log(obj.text())
            // obj.attr('disabled','true');
            obj.addClass('disabled')
            obj.text(time + "s后重新发送");
            time--;
        }
        setTimeout(function () {
            verifyCodeTime(obj);
        }, 1000)

    }

    /**
     * 主要登录逻辑
     */
    function doLogin() {
        var phoneNum = $('#phone_num').val();
        var phoneCode = $('#phone_code').val();


        if (phoneCode == "") {
            $('#login_error').removeClass('hide')
            $('.border-c').addClass('input-error');
            $('#login_error').html("短信验证码不能为空");
            $("#phone_code").focus();
            return;
        }



        var reqData = {
            "phoneNum": phoneNum,
            "phoneCode": phoneCode
        };

        // 传给后台 如果成功则登录
        // $.ajax({
        //     type:"post",
        //     url:"/",
        //     dataType:"json",
        //     data:reqData,
        //     success:function(data){
        //         console.log(data);
        //     },
        //     error:function(jqXHR){
        //         console.log("Error: "+jqXHR.status);
        //     }
        // });

        // 所有均正确 重新请求数据，显示登录的手机号
        // 隐藏模态框
        $('#login').modal('hide')

        window.location.reload();



    }