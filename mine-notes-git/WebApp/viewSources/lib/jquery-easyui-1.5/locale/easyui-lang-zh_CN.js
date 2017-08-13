if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
	$.fn.datagrid.defaults.pageList = [20,50,100,300,1000];
	$.fn.datagrid.defaults.pageSize = 20;
	$.fn.datagrid.defaults.striped=true;
}
if($.fn.window){
	$.fn.window.defaults.constrain=true;
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '该输入项为必输项';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};
	/**
	 * 给日期控件加一个通用的按钮.
	 * */
	var appendButtons=function(){
		var tbuttons=$.extend([],$.fn.datebox.defaults.buttons);
		tbuttons.splice(1,0,{text:'清除',handler:function(target){
			$(target).datebox('clear');
			$(target).datebox('hidePanel');
		}});//通用日期清除按钮;
		$.fn.datebox.defaults.buttons=tbuttons;
	};
	appendButtons();
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
if ($.fn.datetimespinner){
	$.fn.datetimespinner.defaults.selections = [[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]
}
if($.fn.validatebox){
$.extend($.fn.validatebox.defaults.rules, {
	validName :{ 
        validator : function(value,param){ 
            var flag ; 
                            var accountCode=param[1];
            $.ajax({ 
                url : param[0], 
                type : 'POST',                   
                timeout : 60000, 
                data:{accountCode:value}, 
                async: false,   
                success : function(data, textStatus, jqXHR) { 
                                            console.log(data);
                   flag=data;
                },
                dataType:"json"                                       
            });                
            return flag; 
        }, 
        message: '用户名已存在!' 
    },
    CHS: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    ZIP: {
        validator: function (value, param) {
            return /^[1-9]\d{5}$/.test(value);
        },
        message: '邮政编码不存在'
    },
    QQ: {
        validator: function (value, param) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码不正确'
    },
    mobile: {
        validator: function (value, param) {
            return /^1[34578]\d{9}$/.test(value);
        },
        message: '手机号码不正确'
    },
    houseMobile: {
    	validator: function (value, param) {
    		return /^(0[1-9]{2})\-\d{8}$|^(0[1-9]{3}\-(\d{7,8}))$/.test(value);
    	},
    	message: '固定电话号码不正确(023-66668888)'
    },
    allMobile:{
    	validator: function (value, param) {
    		return /^(0[1-9]{2})\-\d{8}$|^(0[1-9]{3}\-(\d{7,8}))$|^1[34578]\d{9}$/.test(value);
    	},
    	message: '电话号码不正确(023-66668888/手机号)'
    },
    loginName: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5\w]+$/.test(value);
        },
        message: '登录名称只允许汉字、英文字母、数字及下划线。'
    },
    safepass: {
        validator: function (value, param) {
            return safePassword(value);
        },
        message: '密码由字母和数字组成，至少6位'
    },
    equalTo: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入的字符不一至'
    },
    number: {
        validator: function (value, param) {
            return /^\d+$/.test(value);
        },
        message: '请输入数字'
    },
    numbertwo: {
        validator: function (value, param) {
            return /^[1-9][0-9]$/.test(value);
        },
        message: '请输入大于0的正整数'
    },
    idcard: {
        validator: function (value, param) {
            return idCard(value);
        },
        message:'请输入正确的身份证号码'
    }
});

/* 密码由字母和数字组成，至少6位 */
var safePassword = function (value) {
    return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
}

var idCard = function (value) {
    if (value.length == 18 && 18 != value.length) return false;
    var number = value.toLowerCase();
    var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    if (re == null || a.indexOf(re[1]) < 0) return false;
    if (re[2].length == 9) {
        number = number.substr(0, 6) + '19' + number.substr(6);
        d = ['19' + re[4], re[5], re[6]].join('-');
    } else d = [re[9], re[10], re[11]].join('-');
    if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
    return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
}

var isDateTime = function (format, reObj) {
    format = format || 'yyyy-MM-dd';
    var input = this, o = {}, d = new Date();
    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    var len = f1.length, len1 = f3.length;
    if (len != f2.length || len1 != f4.length) return false;
    for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
    for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    o.dd = s(o.dd, o.d, d.getDate(), 31);
    o.hh = s(o.hh, o.h, d.getHours(), 24);
    o.mm = s(o.mm, o.m, d.getMinutes());
    o.ss = s(o.ss, o.s, d.getSeconds());
    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    return reVal && reObj ? d : reVal;
    function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    }
};
/**
 * @author LFH
 * @date 2017.5.25
 * This plug rely on the Bootsrap.
 * To create a contextmenu for the body
 * If you use such as '$()' or '$(document)' to call this function,the function will return you 
 * the default contextmenu which contain 'refresh'、'back'、'forward' .
 * If you use your own selector,the function will use your selector to create a contextmenu.
 * @see 此方法依赖于Bootstrap,
 * @see  用于创建一个右键菜单
 * --如果使用$() 或$(document)调用此方法,则返回默认的右键菜单,包含刷新/后退/前进三项.
 * --如果使用自己的选择器调用,则以提供的元素创建右键菜单.
 * --其它menu内容请参照Easyui API
 * */
if($.fn.menu){
	$.fn.rightMenu=function(target,flag){
		var _this=this;
		var refresh=function  refresh(){
			var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
			if(keys) {  
				for(var i = keys.length; i--;)  
					{document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();}  //清除浏览器缓存
			}
			window.location.reload(window.location.href);
		};
		var back=function  back(){
			window.history.back(-1);
		};
		var forward=function forward(){
			window.history.forward();
		};
		$.fn.rightMenu.methods={
				refresh:refresh,
				back:back,
				forward:forward
		};
		var selector=$(this).selector;
		if(!!!selector||selector=="body"||selector=="document"||selector=="window"){
			$("<div id='body-right-menus' style='display:none;width:80px;background:#E8EEF3;border-radius:4px;'>" +
					"<div class='body-right-menus-item' data-act='refresh' style='margin-left:-20px;'><i class='glyphicon glyphicon-refresh'></i> 刷新</div>" +
					"<div class='body-right-menus-item' data-act='back' style='margin-left:-20px;'><i class='glyphicon glyphicon-arrow-left'></i> 后退</div>" +
					"<div class='body-right-menus-item' data-act='forward' style='margin-left:-20px;'><i class='glyphicon glyphicon-arrow-right'></i> 前进</div>" +
					"</div>").appendTo("body");
			$('#body-right-menus').menu({
				height:80,
				minWidth:80,
				noline:true
			});
			$(".body-right-menus-item","#body-right-menus").click(function(e){
				if(!!$(this).data("act")){
					$.fn.rightMenu.methods[$(this).data("act")].call(window,e);
				}
			});
			if(flag!==false){
				document.oncontextmenu=function(e){
					e.preventDefault();
					$('#body-right-menus').menu('show',{
						top:e.clientY,
						left:e.clientX
					});
				};
			}
			/**
			 * 向指定元素添加公用右键菜单
			 * */
			if(!!target){
				target.contextmenu(function(e){
					e.preventDefault();
					$('#body-right-menus').menu('show',{
						top:e.clientY,
						left:e.clientX
					});
				});
			}
		}else{
			$(this).show().menu({
				height:80,
				minWidth:80,
				noline:true
			});
			var _this=this;
			if(flag!==false){
				document.oncontextmenu=function(e){
					e.preventDefault();
					$(_this).menu('show',{
						top:e.clientY,
						left:e.clientX
					});
				};
			}
			/**
			 * 向指定元素追加公用右键菜单
			 * */
			if(!!target){
				target.contextmenu(function(e){
					e.preventDefault();
					$(_this).menu('show',{
						top:e.clientY,
						left:e.clientX
					});
				});
			}
		}
	};
}
}