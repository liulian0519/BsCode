/**
 * created by liulian on 2019/04/17
 */
require(['swiper','jquery', 'bootstrap','login'], function (Swiper) {
    
    $(document).ready(function () {
      
      initUI(Swiper);
   
    });

    /**
     * 渲染页面主函数
     * @param {*} Swiper 
     */
    function initUI(Swiper){
        /** 轮播图函数 */
        swip(Swiper);
        /** 卡片悬浮 */
        cardFix();

    }
    /**
     * 轮播图具体实现函数
     * @param {*} Swiper 
     */
    function swip(Swiper){
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            loop: true,
            freeMode: true,
            loopedSlides: 5, 
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
          });
          var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            loop:true,
            loopedSlides: 5, 
            pagination: {
            el: '.swiper-pagination',
          },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            thumbs: {
              swiper: galleryThumbs,
            },
          });
    }
    /**
     * 实现卡片悬浮
     */
    function cardFix(){
        var fheight = $('.goodhouse-Wrapper').height() + 30; // 获取底部及底部上方边距的总高度
        var boxfixed = $('.box-fixed');  // 获取固定容器的jquery对象
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();  // 获取滚动条滚动的高度
            var contLeftTop = $('.detil-swiper').offset().top+20; // 右侧列表相对于文档的高度
            var scrollBottom = $(document).height() - $(window).scrollTop() - boxfixed.height();
            if (scrollTop >= contLeftTop) {
              if (scrollBottom > fheight) {  // 滚动条距离底部的距离大于fheight,添加tab_fix类,否则添加tab_fix_bottom类
                boxfixed.removeClass("tab_fix_bottom").addClass('tab_fix');
              } else {
                boxfixed.removeClass('tab_fix').addClass("tab_fix_bottom");
              }
            } else if (scrollTop < contLeftTop) {
              boxfixed.removeClass('tab_fix').removeClass("tab_fix_bottom");
            }
        });
    }

    /** 是否显示二维码 */
    $(".link").hover(function (){  
      $("#wxImg").show();  
    },function (){  
      $("#wxImg").hide();  
    }); 


    $(".fold-button").click(function () {
      $(".flod-box").slideToggle("slow");
      $(".open").toggle();
      $(".clo").toggle();
  });
  $(".moreInfo-button").click(function () {
    $(".more-info").slideToggle("slow");
    $(".more").toggle();
    $(".sub").toggle();
});
    

    

});