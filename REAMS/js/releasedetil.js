/**
 * created by liulian on 2019/04/20
 */

require(['jquery', 'bootstrap', 'bootstrapvalidator', 'zh', 'login', 'popt', 'cityjson', 'cityset'], function () {

    $(document).ready(function () {

        $('.btn-order').click(function(){
            var phone = getUrlParam('phone');
            var url = "order.html?phone=" + phone;
            $(".jump").attr("href",url);
        })

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
        
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }

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
                laderhouse:{
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

        // Validate the form manually
        // $('#validateBtn').click(function () {
        //     var regionInfo = $("#defaultForm").val();
        //     console.log(regionInfo);


        // 阻止默认事件
        $("#defaultForm").submit(function (ev) { ev.preventDefault(); });

        $("#validateBtn").on("click", function () {
            $('.has-error .price span').css("top", "15%");
            var bootstrapValidator = $("#defaultForm").data('bootstrapValidator');
            bootstrapValidator.validate();

            // $('.mymodal').attr('id','myModal');

            // 这个到时候一定要打开
            // if (bootstrapValidator.isValid()) {
                // 所有数据
                var greenhouse_id ="";
                var renthous_id = "";
                var newHouse_id = ""
                var housey = "";
                var housex = "";
                var exam = 0;
                var community_id ="";
                var type = "";
                var name = $('input[name="name"]').val();
                var address = $('input[name="address"]').val();

                var area_type="";
                var houseone = $('input[name="houseone"]').val();
                var housetwo = $('input[name="housetwo"]').val();
                var housethree = $('input[name="housethree"]').val();
                area_type += houseone + "室" + housetwo + "厅" +housethree + "卫";
                
                var area = $('input[name="area"]').val();
                var price = $('input[name="price"]').val();
                var avg_price = $('input[name="avgprice"]').val();
                var build_use = $('select[name="type"] option:selected').val();
                var build_type =$('select[name="build-type"] option:selected').val();
                var heating = $('select[name="heating"] option:selected').val();
                var mortgage = $('select[name="mortgage"] option:selected').val();
                var elevator = $('select[name="elevator"] option:selected').val();
                var ladderhouse = $('input[name="laderhouse"]').val();
                var position = $('select[name="position"] option:selected').val();
                var decorate = $('select[name="decorate"] option:selected').val();
                
                var floor = "";
                var one = $('input[name="floor"]').val();
                var two = $('input[name="all"]').val();
                floor += '第'+one+'层共' + two+'层';

                var right_age = $('input[name="rightage"]').val();
                var build_time = $('input[name="datetime"]').val();
                var buid_num = $('input[name="buildnum"]').val();
                var con_time = $('input[name="contime"]').val();

                var introduce = $('textarea[name="introduce"]').val();
                var surrouding = $('textarea[name="surrounding"]').val();
                var keysale =  $('textarea[name="keysale"]').val();
                var traffic = $('textarea[name="traffic"]').val();

                var file = document.getElementById("pic").files[0];
                var data = new FormData;
                data.append("uploadedImageFile",file);
                data.append("name",name);
                data.append("address",address);
                data.append("avg_price",avg_price);
                data.append("build_time",build_time);
                data.append("build_type",build_type);
                data.append("build_num",buid_num);
                data.append("introduce",introduce);
                data.append("surrouding",surrouding);
                data.append("traffic",traffic);
                data.append("key_sale",keysale);
                data.append("area",area);
                data.append("area_type",area_type);
                data.append("price",price);
                data.append("floor",floor);
                data.append("position",position);
                data.append("decoration",decorate);
                data.append("ladder_house",ladderhouse);
                data.append("heating",heating);
                data.append("elevator",elevator);
                data.append("build_use",build_use);
                data.append("right_age",right_age);
                data.append("con_time",con_time);
                data.append("mortgage",mortgage);
                data.append("greenHouse_id",greenhouse_id);
                data.append("newHouse_id",newHouse_id);
                data.append("rentHouse_id",renthous_id);
                data.append("housey",housey);
                data.append("housex",housex);
                data.append("exam",exam);
                data.append("community_id",community_id);
                data.append("type",type);
                // data.append("")
                console.log(data);
                
                // 将数据传给后台
                // $("#defaultForm").submit();
                // $.ajax({
                //     xhrFields:{
                //         withCredentials:true
                //     },
                //     type: "post",
                //     url: "http://localhost:8080/greenHouseAdd",
                //     contentType:"multipart/form-data",
                //     contentType: false,
		        //     processData: false,
                //     data: data,
                //     dataType: "json",
                //     success: function (response) {
                //         console.log(response);

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
                //         var reqData = {
                //             "name":name,
                //             "sale_time":sale_time,
                //             "area_type":area_type,
                //             "area":area,
                //             "sale_type":sale_type,
                //             "price":price,
                //             "phone":phone,
                //             "greenhouse_id":greenhouse_id,
                //             "newhouse_id":newhouse_id,
                //             "renthouse_id":renthouse_id
                //         }
                //         // $.ajax({
                //         //     type: "post",
                //         //     url: "http://localhost:8080/saleorderAdd",
                //         //     data: reqData,
                //         //     dataType: "json",
                //         //     success: function (response) {
                //         //         console.log(response);
                //         //     },
                //         //     error:function(response){
                //         //         console.log(response);
                //         //     }
                //         // });
                //     },
                //     error:function(xhr,errorText,errorType){
                //         console.log(xhr);
                //     }
                // });
                $('.mymodal').attr('id', 'myModal');

            // }


            // else return;

        });
        //     $('#defaultForm').bootstrapValidator('validate');
        //     $('.has-error .price span').css("top","15%");
        // });

        $('#resetBtn').click(function () {
            $('#defaultForm').data('bootstrapValidator').resetForm(true);
        });

    });
});