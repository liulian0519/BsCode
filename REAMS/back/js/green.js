/**
 * created by liulian on 2019/05/15
 */

$.ajax({
    type: "get",
    url: "http://localhost:8080/rentlistByExam",
    dataType: "json",
    success: function (response) {
        // console.log(response)
        var rent = response.rentHouseTests;
      
        console.log(rent);
        var noExam = new Array();
        var examy = new Array();
        var examn = new Array();
        for (var i = 0; i < rent.length; i++) {
            if (rent[i].exam == 0) {
                noExam.push(rent[i]);
            } else if (rent[i].exam == 1) {
                examy.push(rent[i])
            } else {
                examn.push(rent[i])
            }
        }
        console.log(noExam);
        console.log(examy)
        console.log(examn);
        $("#noexam").append(fillNo(noExam));
        $("#examy").append(fillY(examy));
        $("#examn").append(fillN(examn));

    },
    error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
    }

});
function fillNo(response) {
    console.log(response.length)
    var detil = "";
    if(response.length == 0){
        // console.log("22222");
        detil +=
        '<div class="nothing">暂时没有需要审核的房源信息！</div>'
    }
   
    for (var i = 0; i < response.length; i++) {
        detil +=
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
        '</div>\n' +
        '<div class="detil-address">\n' +
        '<span>' + response[i].address + ' /</span>\n' +
        '<span>' + response[i].area + '㎡ / </span>\n' +
        '<span>' + response[i].position + '</span>\n' +
        '</div>\n' +
        '<div class="detil-time">\n' +
        '<i class="iconfont iconshijian"></i><span>' + response[i].con_time + '</span>\n' +
        '</div>\n' +
        '<div class="ddetil-type">\n' +
        '<button class="btn" disabled>近地铁</button>\n' +
        '<button class="btn" disabled>' + response[i].heating + '</button>\n' +
        '<button class="btn" disabled>随时看房</button>\n' +
        '</div>\n' +
        '<div class="detil-price">\n' +
        '<span>' + response[i].price + '/月</span>\n' +
        '</div>\n' +
        '</div>\n' +
        '<hr>\n' +
        '</div>\n'
           
    }
    return detil;

}
function fillY(response) {

    var detil = "";
    if(response.length == 0){
        // console.log("22222");
        detil +=
        '<div class="nothing">暂时没有审核成功的房源！</div>'
    }
    for (var i = 0; i < response.length; i++) {
        if(response[i].heating == 0){
            response[i].heating = "自供暖"
        }else{
            response[i].heating ="集中供暖"
        }
        detil +=
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
        '</div>\n' +
        '<div class="detil-address">\n' +
        '<span>' + response[i].address + ' /</span>\n' +
        '<span>' + response[i].area + '㎡ / </span>\n' +
        '<span>' + response[i].position + '</span>\n' +
        '</div>\n' +
        '<div class="detil-time">\n' +
        '<i class="iconfont iconshijian"></i><span>' + response[i].con_time + '</span>\n' +
        '</div>\n' +
        '<div class="ddetil-type">\n' +
        '<button class="layui-btn layui-btn-danger" >近地铁</button>\n' +
        '<button class="layui-btn layui-btn-warm">' + response[i].heating + '</button>\n' +
        '<button class="layui-btn layui-btn-normal">随时看房</button>\n' +
        '</div>\n' +
        '<div class="btnGroup">\n' +
        '<button class="layui-btn layui-btn-normal btn-yes">已通过</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '<hr>\n' +
        '</div>\n'
    }
    return detil;

}
function fillN(response) {

    var detil = "";
    if(response.length == 0){
        // console.log("22222");
        detil +=
        '<div class="nothing">暂时没有未通过审核的房源！</div>'
    }
    for (var i = 0; i < response.length; i++) {
        detil +=
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
        '</div>\n' +
        '<div class="detil-address">\n' +
        '<span>' + response[i].address + ' /</span>\n' +
        '<span>' + response[i].area + '㎡ / </span>\n' +
        '<span>' + response[i].position + '</span>\n' +
        '</div>\n' +
        '<div class="detil-time">\n' +
        '<i class="iconfont iconshijian"></i><span>' + response[i].con_time + '</span>\n' +
        '</div>\n' +
        '<div class="ddetil-type">\n' +
        '<button class="btn" disabled>近地铁</button>\n' +
        '<button class="btn" disabled>' + response[i].heating + '</button>\n' +
        '<button class="btn" disabled>随时看房</button>\n' +
        '</div>\n' +
        '<div class="detil-price">\n' +
        '<span>' + response[i].price + '/月</span>\n' +
        '</div>\n' +
        '</div>\n' +
        '<hr>\n' +
        '</div>\n'
    }
    return detil;

}
function examy(response) {
    var idx = "getX" + response;
    var idy = "getY" + response;

    var x = $("#" + idx).val();
    var y = $("#" + idy).val();
    var exam = 1;
    var id = response;

    var reqData = {
        "housex": x,
        "housey": y,
        "exam": exam,
        "id": id
    };
    console.log(reqData)
    if (x != "" && y != "") {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/update",
            data: reqData,
            dataType: "json",
            success: function (response) {
                console.log(response);
                alert("审核成功");
                window.location.reload();
            },
            error: function (response) {
                console.log(response)
            }
        });
        // console.log("dui")
    } else {
        alert("请先填写有效的坐标点");
        // console.log("cuo")
    }
}
function examn(response) {
    var exam = 2
    var reqData = {
        "exam": exam,
        "id": response
    };
    layui.use('layer', function () {
        // var element = layui.element;
        layer.confirm('确定要审核不通过吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            console.log("111");
            $.ajax({
                type: "post",
                url: "http://localhost:8080/update",
                data: reqData,
                dataType: "json",
                success: function (response) {
                    // console.log(response);
                    // alert("审核成功");
                    window.location.reload();
                },
                error: function (response) {
                    console.log(response)
                }
            });

        }, function () {
            console.log("222");
        });
    });


}