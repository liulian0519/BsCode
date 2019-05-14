/**
 * created by liulian on 2019/05/14
 */

$.ajax({
    type: "get",
    url: "http://localhost:8080/rentHouseSortByConTime",
    dataType: "json",
    success: function (response) {
        console.log(response);
        /** 渲染二手房部分 */
        // initGreenHouse(response);
        /** 渲染新房部分 */
        // initNewHouse(response);
        /** 渲染租房部分 */
        // initRootHouse(response);
    },
    error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
    }

});
