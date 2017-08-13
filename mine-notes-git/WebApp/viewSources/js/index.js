/**
 * @author LFH
 */
$(function(){
    $.$$init();
});
(function(w,$){
    var mainControl={
        load:function(){
        	mainControl.init();
        	var $mainView=$("#main-contanier-view-frame");
        	$mainView.attr("src","/view/MainView/index.html");
        	$(".mine-link","#main-link-tabs").click(function(){
                var link=$(this).data("link");
                var home=$(this).data("home");
                (link&&link.length>0)&&$mainView.attr("src",link);
                (link&&link.length>0)||$mainView.empty();
                (home===true)&&$(".toggle-target","#main-link-tabs").removeClass("active");
            });
        },init:function(){
        	$("a").attr("draggable",false);
        }
    };
    $.$$init=mainControl.load;
}(window,jQuery));
