
//======================================
// 初始化工作页面，本文件需要init.js支持
//======================================
// 装载需要的JS文件

NetWorkSrv.loadScript(_CONTEXTPATH_ + "controls/My97DatePicker/WdatePicker.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "plugins/moment/min/moment.min.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "plugins/moment/locale/zh-cn.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js");

NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/verify/IdentityVerify.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/verify/InputMask.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/verify/InputDateTimeMask.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/verify/InputFilter.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/object/StringUtil.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/object/CJL.0.1.min.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/object/DateTime.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/object/IpV4Box.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/object/ImageFileUpLoad.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/object/Image.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/page/Page.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/element/style.js");
NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/element/status.js");
/*NetWorkSrv.loadScript(_CONTEXTPATH_ + "script/public/workmain/page/banBackspace2GoBack.js");*/


//if(document.addEventListener){
//	document.addEventListener("DOMContentLoaded", loadready, false);
//}else if(document.attachEvent){
//	document.attachEvent("onreadystatechange", function(){
//		if((/loaded|complete/).test(document.readyState))
//			loadready();
//	});
//}
//
//	
//function loadready(){
//	ElementEffect.initChildren(document.body);
//}


$("document").ready(function() {
		// 动态装载CSS
		try {
			      NetWorkSrv.loadCSS(_CONTEXTPATH_ + "plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css")
            NetWorkSrv.loadCSS(_CONTEXTPATH_ + "script/public/workmain/style/initworkpage.css");
        }catch(e){
            // 动态装载CSS
        	  NetWorkSrv.loadCSS(_CONTEXTPATH_ + "plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css");
            NetWorkSrv.loadCSS(_CONTEXTPATH_ + "style/public/workmain/style/initworkpage.css");
        }
		// 初始化页面效果
		initExplorer();
		ElementEffect.initChildren(document.body);
		if(typeof(pageReady)=="function"){ 
			window.setTimeout(pageReady, 0);
		}
	}
);
