/**
 * created by liulian on 2019/04/12
 */

require(['jquery', 'bootstrap','login','popt','cityjson','cityset'], function () {

    $(document).ready(function () {
        $(".sub-nav li").bind("click",accAvalue);
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
        /** 省市区三级联动函数 */
        $("#city").click(function (e) {
            SelCity(this,e);
        });
        $("#root-city").click(function (e) { 
            SelCity(this,e);
        });
        $('.btn-more').click(function(){
            var phone = $('#phone').val();
            var url = "releaseDetil.html?phone=" + phone;
            $(".jump").attr("href",url);
        })

        /** 点击提交委托的函数 */
        $('#btn-sale').click(function(){
            postData();
        })
        // $('#myModal').modal(options)
   
    });


    /**
     * 得到a标签值的函数,并给当前点击的a标签加样式
     */
    function accAvalue(){
        $(this).siblings().removeClass('current');
        $(this).addClass('current');    
        // console.log($(this).text());
        if($(this).text() == "我要卖房"){
            $('.release-main').addClass('show');
            $('.release-main').removeClass('hide');
            $('.release-main-two').removeClass('show');
            $('.release-main-two').addClass('hide');
           
        }else{
            if($(this).text() == "我要出租"){
                $('.release-main').removeClass('show');
                $('.release-main').addClass('hide');
                $('.release-main-two').removeClass('hide');
                $('.release-main-two').addClass('show');
    
            }
        }
        
        
        
    }

    function postData(){
        var city = $('#city').val();
        var houseAdd = $('#houseAdd').val();
        var addLou = $('#add-lou').val();
        var addUnit = $('#add-unit').val();
        var addDoor = $('#add-door').val();
        var salePrice = $('#price').val();
        var name = $('#name').val();
        var phone = $('#phone').val();
        if(city == ""){
            $('#input_error').removeClass('hide')
            $('#city').addClass('input-error');
            $('#input_error_test').html("请选择正确的城市");
            $("#city").focus();
            return; 
        }else{
            $('#input_error').addClass('hide')
            $('#city').removeClass('input-error');
        }
        if(houseAdd == ""){
            $('#input_error').removeClass('hide')
            $('#houseAdd').addClass('input-error');
            $('#input_error_test').html("小区地址不能为空");
            $("#houseAdd").focus();
            return; 
        }else{
            $('#input_error').addClass('hide')
            $('#houseAdd').removeClass('input-error');
        }
        if(addLou == "" || addUnit == "" || addDoor == ""){
            $('#input_error').removeClass('hide')
            $('#add-lou').addClass('input-error');
            $('#input_error_test').html("请输入准确的地址");
            $("#add-lou").focus();
            return; 
        }else{
            $('#input_error').addClass('hide')
            $('#add-lou').removeClass('input-error');
        } 
        if(salePrice == ""){
            $('#input_error').removeClass('hide')
            $('#price').addClass('input-error');
            $('#input_error_test').html("期望售价不能为空呦");
            $("#price").focus();
            return; 
        }else{
            $('#input_error').addClass('hide')
            $('#price').removeClass('input-error');
        }
        if(name == ""){
            $('#input_error').removeClass('hide')
            $('#name').addClass('input-error');
            $('#input_error_test').html("称呼不能为空");
            $("#name").focus();
            return; 
        }else{
            $('#input_error').addClass('hide')
            $('#name').removeClass('input-error');
        }
        if(phone == "" || phone.length != 11){
            $('#input_error').removeClass('hide')
            $('#phone').addClass('input-error');
            $('#input_error_test').html("请输入有效的手机号码");
            $("#phone").focus();
            return; 
        }else{
            $('#input_error').addClass('hide')
            $('#phone').removeClass('input-error');
        }
        
        // var reqData = {
        //     "city":city,
        //     "houseAdd":houseAdd,
        //     "addLou":addLou,
        //     "addUnit":addUnit,
        //     "addDoor":addDoor,
        //     "salePrice":salePrice,
        //     "name":name,
        //     "phone":phone
        // }
        // id="myModal" 
        // console.log(reqData);
        // 向后台发送数据
        // $.ajax({
        //     type: "post",
        //     url: "",
        //     dataType: "json",
        //     data:reqData,
        //     success: function (response) {
        //         console.log(response);
               
        //     },
        //     error: function (jqXHR) {
        //         console.log("Error: " + jqXHR.status);
        //     }

        // });
        $('.ttt').attr('id','myModal');

    }


})