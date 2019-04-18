/**
 * created by liulian on 2019/04/13
 */

require(['jquery', 'bootstrap','login'], function () {

    $(document).ready(function () {
        $(".drop-menu li").bind("click",accAvalue);
        $(".ul-item-perPrice li").bind("click",AccCheckValue);
        $(".ul-item-tolPrice li").bind("click",AccCheckValue);
        $(".ul-item-area li").bind("click",AccCheckValue);
        $(".ul-item-type li").bind("click",AccCheckValue);
        $(".ul-item-status li").bind("click",AccCheckValue);
    });

    /**
     * 得到a标签值的函数
     */
    function accAvalue(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        console.log($(this).text());
    }
    /**
     * 得到多选框选中的值的函数
     */
    function AccCheckValue(){
        if($(this).children().is(":checked")){
            $(this).children().prop("checked", false);
        }else{
            $(this).children().prop("checked", true);
        }
        var chk_value = [];
        $('input[name="test"]:checked').each(function(){ 
            chk_value.push($(this).val()); 
        }); 
        console.log(chk_value);
    }
})