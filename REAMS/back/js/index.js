/**
 * created by liulian on 2019/05/14
 */

$.ajax({
    type: "get",
    url: "http://localhost:8080/listByExam",
    dataType: "json",
    success: function (response) {
        // console.log(response)
        var green = response.greenHouseTests
        // console.log(green);
        var noExam = new Array();
        var examy = new Array();
        var examn = new Array();
        for (var i = 0; i < green.length; i++) {
            if (green[i].exam == 0) {
                noExam.push(green[i]);
            } else if (green[i].exam == 1) {
                examy.push(green[i])
            } else {
                examn.push(green[i])
            }
        }
        console.log(noExam);
        console.log(examy)
        console.log(examn);
        $("#noexam").append(fillNo(noExam));
        $("#examy").append(fillY(examy));
        $("#examn").append(fillN(examn));

        $("#btnY").click(function () {
            console.log("jinlai")
            // var id = response.


        });

    },
    error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
    }

});
function fillNo(response) {

    var detil = "";
    for (var i = 0; i < response.length; i++) {
        detil +=
            '<div class="result-item">\n' +
            '<div class="result-img">\n' +
            '<a href="greenHouseDetil.html?id=' + response[i].id + '">\n' +
            '<img src="' + response[i].url[0] + '">\n' +
            '</a>\n' +
            '</div>\n' +
            '<div class="result-detil">\n' +
            '<div class="detil-title">\n' +
            '<span class="name">\n' +
            '<a href="greenHouseDetil.html?id=' + response[i].id + '" target="_blank">' + response[i].name + '|' + response[i].area_type + '|' + response[i].position + '</a>\n' +
            '</span>\n' +
            '</div>\n' +
            '<div class="detil-content">\n' +
            '<a><i class="iconfont iconditu"></i>' + response[i].address + '</a>\n' +
            '<a><i class="iconfont iconfangzi1"></i>' + response[i].floor + ' | ' + response[i].build_time + '建 | ' + response[i].area_type + ' | ' + response[i].area + '平方米 | ' + response[i].position + ' </a>\n' +
            '<a><i class="iconfont iconshijian"></i>' + response[i].con_time + '</a>\n' +
            '</div>\n' +
            '<div class="detil-surround">\n' +
            '<span class="block-type" style="background: #FB9252;">' + response[i].build_use + '</span>\n' +
            '<span class="surround-type">随时看房</span>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="right">\n' +
            '<div class="goMap">\n' +
            '<a href="getmapxy.html" target="_blank" style="margin-left:30px">在地图上寻找该地点</a>\n' +
            '<div class="layui-form-item">\n' +
            '<label class="layui-form-label">地点X坐标</label>\n' +
            '<div class="layui-input-block">\n' +
            '<input type="text" id="getX' + response[i].id + '" name="getx" placeholder="请输入该地址所对应的x坐标" class="layui-input">\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="layui-form-item">\n' +
            '<label class="layui-form-label">地点Y坐标</label>\n' +
            '<div class="layui-input-block">\n' +
            '<input type="text" id="getY' + response[i].id + '" name="gety" placeholder="请输入该地址所对应的y坐标" class="layui-input">\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="btnGroup">\n' +
            '<button class="layui-btn layui-btn-normal" name="' + response[i].id + '"onclick="examy(' + response[i].id + ')">通过</button>\n' +
            '<button class="layui-btn layui-btn-danger" id="btnN" onclick="examn(' + response[i].id + ')">驳回</button>\n' +
            '</div>\n' +
            '</div>\n' +

            '<hr>\n' +
            '</div>\n'
    }
    return detil;

}
function fillY(response) {

    var detil = "";
    for (var i = 0; i < response.length; i++) {
        detil +=
            '<div class="result-item">\n' +
            '<div class="result-img">\n' +
            '<a href="greenHouseDetil.html?id=' + response[i].id + '">\n' +
            '<img src="' + response[i].url[0] + '">\n' +
            '</a>\n' +
            '</div>\n' +
            '<div class="result-detil">\n' +
            '<div class="detil-title">\n' +
            '<span class="name">\n' +
            '<a href="greenHouseDetil.html?id=' + response[i].id + '" target="_blank">' + response[i].name + '|' + response[i].area_type + '|' + response[i].position + '</a>\n' +
            '</span>\n' +
            '</div>\n' +
            '<div class="detil-content">\n' +
            '<a><i class="iconfont iconditu"></i>' + response[i].address + '</a>\n' +
            '<a><i class="iconfont iconfangzi1"></i>' + response[i].floor + ' | ' + response[i].build_time + '建 | ' + response[i].area_type + ' | ' + response[i].area + '平方米 | ' + response[i].position + ' </a>\n' +
            '<a><i class="iconfont iconshijian"></i>' + response[i].con_time + '</a>\n' +
            '</div>\n' +
            '<div class="detil-surround">\n' +
            '<span class="block-type" style="background: #FB9252;">' + response[i].build_use + '</span>\n' +
            '<span class="surround-type">随时看房</span>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="btnGroup">\n' +
            '<button class="layui-btn layui-btn-normal btn-yes">已通过</button>\n' +
            '</div>\n' +
            '<hr>\n' +
            '</div>\n'
    }
    return detil;

}
function fillN(response) {

    var detil = "";
    for (var i = 0; i < response.length; i++) {
        detil +=
            '<div class="result-item">\n' +
            '<div class="result-img">\n' +
            '<a href="greenHouseDetil.html?id=' + response[i].id + '">\n' +
            '<img src="' + response[i].url[0] + '">\n' +
            '</a>\n' +
            '</div>\n' +
            '<div class="result-detil">\n' +
            '<div class="detil-title">\n' +
            '<span class="name">\n' +
            '<a href="greenHouseDetil.html?id=' + response[i].id + '" target="_blank">' + response[i].name + '|' + response[i].area_type + '|' + response[i].position + '</a>\n' +
            '</span>\n' +
            '</div>\n' +
            '<div class="detil-content">\n' +
            '<a><i class="iconfont iconditu"></i>' + response[i].address + '</a>\n' +
            '<a><i class="iconfont iconfangzi1"></i>' + response[i].floor + ' | ' + response[i].build_time + '建 | ' + response[i].area_type + ' | ' + response[i].area + '平方米 | ' + response[i].position + ' </a>\n' +
            '<a><i class="iconfont iconshijian"></i>' + response[i].con_time + '</a>\n' +
            '</div>\n' +
            '<div class="detil-surround">\n' +
            '<span class="block-type" style="background: #FB9252;">' + response[i].build_use + '</span>\n' +
            '<span class="surround-type">随时看房</span>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="btnGroup">\n' +
            '<button class="layui-btn layui-btn-danger btn-no">未通过</button>\n' +
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