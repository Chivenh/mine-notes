/**
 * Simplified Chinese translation for bootstrap-datetimepicker
 * Yuan Cheung <advanimal@gmail.com>
 */
;(function($){
	$.fn.datetimepicker.dates['zh-CN'] = {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
//			monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一", "十二"],
			monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一", "十二"],
			today: "今天",
			suffix: [],
			meridiem: ["上午", "下午"]
	};
	/**
	 * 将bootstrap的日期选择框进一步包装,设置自己的默认属性.
	 * */
	$.fn.mineBtDatePicker=function(params){
		var now=(new Date());
		var nowDate=now.getFullYear()+"-0"+(now.getMonth()+1)+"-0"+now.getDate();
		nowDate=nowDate.replace(/(\-)0(\d\d)/,"$1$2");//先给日期字符串月份,日期前加0,后面对2位月份和日期去掉前面的0
		$(this).each(function(){
			var _this=this;
			$(this).attr("autocomplete","off").datetimepicker($.extend({  
				format: 'yyyy-mm-dd', 
				autoclose: true,
				todayBtn: true,
				pickerPosition: "bottom-right",
				language:"zh-CN",
				minView:2,
				todayHighlight:true
			},params||{})).blur(function(e){
				if(!!$(this).val()){
					var d=Date.parse($(this).val());
					if(d!==d||$(this).val().indexOf("1899-12-31")>-1){
						$(this).val(nowDate);//将默认转换日期改为当天.
					}
				}
			}).click(function(e){
				$(this).datetimepicker('show');//保证点击能打开.
			}).after("<span style='position:relative;width:0;display:inline;'><i class='glyphicon glyphicon-remove clear-val-button' style='position:absolute;left:-18px;'></i></span>");
			$(this).next("span").find("i.clear-val-button").click(function(e){
				$(_this).val("");
			});//附加的清空小按钮.
			if(!!params&&params.defaultValue===true){
				$(this).val(nowDate);//设置文本框默认值为当天.
			}
		});
		return this;
	};
}(jQuery));
