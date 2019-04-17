/**
 * created by liulian on 2019/04/07
 */

require(['jquery', 'bootstrap','login'], function () {

    $(document).ready(function () {
        $(".drop-menu li").bind("click",accAvalue);
        $('.ul-item-type li').bind("click",accAvalue);
        $('.ul-item-price li').bind("click",AccCheckValue);
        $('.ul-item-hole li').bind("click",AccCheckValue);
        $('.ul-item-position li').bind("click",AccCheckValue);

        // 选项卡切换
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text(); 
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text(); 
            $(".active-tab span").html(activeTab);
            $(".previous-tab span").html(previousTab);
        });
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