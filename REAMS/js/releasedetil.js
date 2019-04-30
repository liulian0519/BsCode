/**
 * created by liulian on 2019/04/20
 */

require(['jquery', 'bootstrap','bootstrapvalidator','zh','login','popt','cityjson','cityset'], function () {

    $(document).ready(function () {
     
     // Generate a simple captcha
     function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));
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
            address:{
                validators:{
                    notEmpty:{
                        message:'小区地址不能为空'
                    }
                }
            },
            houseone:{
                validators:{
                    notEmpty:{
                        message:'厅室不能为空'
                    },
                    regexp: { 
                        regexp: /^[0-9\.]+$/, 
                        message: '只能是1位正整数' 
                    }, 
                }
            },
            housetwo:{
                validators:{
                    notEmpty:{
                        message:'厅室不能为空'
                    },
                    regexp: { 
                        regexp: /^[0-9\.]+$/, 
                        message: '只能是1位正整数' 
                    }, 
                }
            },
            housethree:{
                validators:{
                    notEmpty:{
                        message:'厅室不能为空'
                    },
                    regexp: { 
                        regexp: /^[0-9\.]+$/, 
                        message: '只能是1位正整数' 
                    }, 
                }
            },
            area:{
                validators:{
                    notEmpty:{
                        message:'房屋面积不能为空'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'价钱不能为空'
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
            floor:{
                validators:{
                    notEmpty:{
                        message:'楼层不能为空'
                    }
                }
            },
            all:{
                validators:{
                    notEmpty:{
                        message:'总楼层数不能为空'
                    }
                }
            },
            rightage:{
                validators:{
                    notEmpty:{
                        message:'产权年限不能为空'
                    }
                }
            },
            datetime:{
                validators:{
                    notEmpty:{
                        message:'建筑年代不能为空'
                    }
                }
            },
            contime:{
                validators:{
                    notEmpty:{
                        message:'挂牌时间不能为空'
                    }
                }
            },
            introduce:{
                validators:{
                    notEmpty:{
                        message:'小区简介不能为空'
                    }
                }
            },
            surrounding:{
                validators:{
                    notEmpty:{
                        message:'周边环境不能为空'
                    }
                }
            },
            keysale:{
                validators:{
                    notEmpty:{
                        message:'户型优势不能为空'
                    }
                }
            },
            traffic:{
                validators:{
                    notEmpty:{
                        message:'公交情况不能为空'
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

    // Validate the form manually
    // $('#validateBtn').click(function () {
    //     var regionInfo = $("#defaultForm").val();
    //     console.log(regionInfo);

        
        // 阻止默认事件
        $("#defaultForm").submit(function(ev){ev.preventDefault();});
    
    $("#validateBtn").on("click", function(){
        $('.has-error .price span').css("top","15%");
        var bootstrapValidator = $("#defaultForm").data('bootstrapValidator');
        bootstrapValidator.validate();

        // $('.mymodal').attr('id','myModal');

        // 这个到时候一定要打开
        if(bootstrapValidator.isValid()){
            // var regionInfo = $("#defaultForm").val();
            // 所有数据
            var name = $('input[name="name"]').val();
            var type = $('select[name="type"] option:selected').val();
            var regionInfo = {
                "name": name,
                "type":type
               
            };
            console.log(regionInfo);
            // 将数据传给后台
            // $("#defaultForm").submit();
            $('.mymodal').attr('id','myModal');
           
        }
     
     
        else return;

    });
    //     $('#defaultForm').bootstrapValidator('validate');
    //     $('.has-error .price span').css("top","15%");
    // });

    $('#resetBtn').click(function () {
        $('#defaultForm').data('bootstrapValidator').resetForm(true);
    });
        
    });
});