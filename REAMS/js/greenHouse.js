/**
 * created by liulian on 2019/04/27
 */

require(['jquery', 'bootstrap','login'], function () {

    $(document).ready(function () {
        $(".drop-menu li").bind("click", accAvalue);
        $('.ul-item-type li').bind("click", AccCheckValue);
        $('.ul-item-position li').bind("click", AccCheckValue);
        $('.ul-item-use li').bind("click", AccCheckValue);
        $('.ul-item-heating li').bind("click", AccCheckValue);
    });

    function accAvalue(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    }

    function AccCheckValue(){
        if ($(this).children().is(":checked")) {
            $(this).children().prop("checked", false);
        } else {
            $(this).children().prop("checked", true);
        }
    }
})