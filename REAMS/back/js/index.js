/**
 * created by liulian on 2019/05/14
 */

    $(document).ready(function () {
        $.ajax({
            type: "get",
            url: "http://localhost:8080/list",
            
            dataType: "json",
            success: function (response) {
                console.log(response)
            },
            error:function(response){
                console.log(response)
            }
        });
    });
