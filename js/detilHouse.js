/**
 * created by liulian on 2019/04/19
 */
require(['jquery', 'bootstrap','login','slide'], function () {
    $(document).ready(function () {
        var x = getUrlParam('x');
        var y = getUrlParam('y');
        console.log(x,y)
        
    })
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
   

   
});