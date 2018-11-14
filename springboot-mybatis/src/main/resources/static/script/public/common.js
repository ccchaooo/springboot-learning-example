//=================================================================================
// 公用js
//=================================================================================

//=================================================================================
// 目录
// 1. 处理值：转null为空串     						nullToEmpty(val)
// 2. 处理对象值：转null为空串                 				nullToEmptyForObject(obj)
// 3. 置光标         									setFocusToLast($obj)
// 4. 处理回车转移焦点                  						shiftFocusWhenEnter($objs)
// 5. 必输入域检查                 							requiredFieldCheck(starCls, win, callbackFun)
// 6. 置页面数据，显示用                     					setPageShowData(obj)
// 7. 设置未经渲染的输入域值                          				setInputArea(obj)
// 8. 组织机构为纯数字时，格式化为带分隔符                          	formatZzjgdm(zzjgdm)
// 9. 数字格式化为本地字符串						numberFormatToStr(_number)
// 10. 数据格式化为人民币显示格式					numToRMBFormat(_number, _color, _prev)	
// 11. 数字格式化 									fnumber(s, n)
// 11. 数字格式化金额								fmoney(s, n)
// 12. 加载样式块									includeStyleElement(styles, styleId)
// 13. 返回空格字符串								getSpaceNum(num)		
// 14. js获取项目根路径(上下文)						getContextPath()
// 15. js获取项目域名路径							getDomainPath()
// 16. 以post方式提交数据到servlet					openPostWindow(url, data, name)
// 17. 为grid列表取合适的页记录条数					getFittingPageSize(listId, lineHeight, defautVal)				
// 18. 取url中"?"符后的字串，以MAP形式返回			GetRequest() 
// 19. 取资源URL地址								getBinContentURL(argObj) 
// 20. 取数据库时间                                 getSysDate()
// 21. 图片等比例缩放                               autoResizeImage(maxWidth, maxHeight, objImg) 
// 22. 取Grid列表的合适显示行数                     getGridSuitableRowNum(listHeight, pageSize)
//=================================================================================

/**
 * 处理值：转null为空串
 * @return val
 */
function nullToEmpty(val){
	if(typeof val == 'undefined' 
		|| val == null || (""+val).replace(/^(\s+)|(\s+)$/,'') == 'null'){
		return "";
	}else{
		return val;
	}
}

/**
 * 处理对象值：转null为空串
 * @return object
 */
function nullToEmptyForObject(obj){
	var _obj = obj;
	try{
		$.each(obj, function(k, v){
			_obj[k] = nullToEmpty(v);
			if(v != null && typeof v == 'object'){
				nullToEmptyForObject(v);
			};
		});
	}catch(e){}
	
	return _obj;
}

/**
 * 置光标
 */
function setFocusToLast($obj){
	if($obj.length == 0) return;
	if($obj.attr("type") != 'text'){
		$obj.focus();
		return;
	}else{
		$obj[0].focus();      
		var r = $obj[0].createTextRange();       
		r.moveStart("character",$obj[0].value.length);      
		r.collapse(true);      
		r.select(); 		
	}
}

/**
 * 处理回车转移焦点
 */
function shiftFocusWhenEnter($objs){
	$objs.keyup(function(event){
		var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
		var $this = $(this);
		var _id = $this.attr("id");
		var _name = $this.attr("name");
		
		if(keycode == 13){
			var curIndex = -1;
			$objs.each(function(index,ele){
				if(_id && ele.id == _id || _name && ele.name == _name){
					curIndex = index;
					return false;
				}
			});
			
			if(curIndex != -1 && curIndex != $objs.length-1){
				$objs[curIndex+1].focus();
				var val = $objs[curIndex+1].value;
				if(null != val){					
					$objs[curIndex+1].value = val;//让光标在最后
				}
			}
		}		
	});
}

/**
 * 必输入域检查
 * @param starCls
 * 		星号样式
 * @param win
 *      dhtmx.Alert所在窗口
 * 结构：<label for="C_HTLYDM" class="control-label"><span class="required-field">*</span>名称：</label>
 */
function requiredFieldCheck(starCls, win, callbackFun){
	var pass = true;
	$("span."+starCls).each(function(){
		var $label = $(this).closest("label");
		var _title = $label.text().replace(/[*:：]/g,"");
		var _id = $label.attr("for");
		if(_id && $("#"+_id).val() == ""){
			pass = false;
			win.dhtmlx.alert({
									title:"提示信息",
									type:"alert-error",
									ok:"确 定",
									text:_title+"不能为空，请输入相应内容!",
									callback:function(result){
										callbackFun();
										window.setTimeout(function(){$("#"+_id).focus();}, 100);
									}
								});
			return false;					
		}
	});
	
	return pass;
}

/**
 * 必输入域检查
 * @param $star
 * 		星号必输标志所在的HTML标签
 * @param win
 *      dhtmx.Alert所在窗口
 * 如：<span for="C_HTLYDM" class="control-label"><span class="required-field">*</span>名称：</span>
 */
function requiredFieldCheck2($star, win, callbackFun){
	var pass = true;
	$star.each(function(){
		var $label = $(this).parent();
		var _title = $label.text().replace(/[*:：]/g,"");
		var _id = $label.attr("for");
		if(_id && $("#"+_id).val() == ""){
			pass = false;
			win.dhtmlx.alert({
									title:"提示信息",
									type:"alert-error",
									ok:"确 定",
									text:_title+"不能为空，请输入相应内容!",
									callback:function(result){
										callbackFun();
										window.setTimeout(function(){$("#"+_id).focus();}, 100);
									}
								});
			return false;					
		}
	});
	
	return pass;
}

/*
 * 输入域检查
 * 结构：
 * if (!IsNotNul($("#N_HGS"),"合格数")||
	   !IsNotNul($("#N_SZS"),"试制数")
   ) return;
 */
function IsNotNul(obj,eMsg){
    var val = $(obj).val();
    if($.trim(val) == ""){
    	top.dhtmlx.alert({
    		title:"提示信息",
			type:"alert-error",
			ok:"确 定",
			text:eMsg+"不能为空，请输入相应内容!",
			callback:function(result){
				$(obj).focus();
			}
		});
        try{
            $(obj).focus();
        }catch(e){
        }
        return false;
    }
    return true;
}

/**
 * 置页面数据，显示用
 */
function setPageShowData(obj){
	$.each(obj, function(k, v){
		var $this = $("#"+k);
		if($this.length > 0){
			$this.text(v == null || v == undefined ? "" : v);
		}
        if(v != null && typeof v == 'object'){
        	if(v instanceof Date){
        		$this.text(DateTime.toString(v));
        	}else if(v instanceof Object){
        		setPageShowData(v);
        	}
        }		
	});
}

/**
 * 设置未经渲染的输入域值
 */
function setInputArea(obj){
    $.each(obj, function(k, v){
        if($("#"+k).length>0){
        	var $this = $("#"+k);
        	var type = $this.attr("type");
        	if(type != "radio" && type != "checkbox"){
	        	if( $("#"+k).get(0).tagName=='SELECT' ){
	        		$this.val(v==null || v==undefined ? "" : v).trigger('change');
	        	}else{	        		
	        		$this.val(v==null || v==undefined ? "" : v);
	        	}
        	}
        }
        if($(":radio[name="+k+"]").length > 0){
        	if(v!=null && v!=undefined && v!=""){        		
        		$(":radio[name="+k+"][value="+v+"]").attr('checked', true);   
        	}
        } 
    });	
}

/**
 * 组织机构为纯数字时，格式化为带分隔符
 */
function formatZzjgdm(zzjgdm){
	if(typeof(zzjgdm) == "undefined" || zzjgdm == null){
		return "";
	}
	if(zzjgdm.indexOf("-") != -1 || zzjgdm.length != 9){
		return zzjgdm;
	}
	
	return zzjgdm.substring(0,8)+"-"+zzjgdm.substring(8,9);
}

/**
 * 数字格式化为本地字符串
 */
function numberFormatToStr(_number){
	if(isNaN(_number)) return "";
	if(_number == 0) return "0.00";
	
	return parseFloat(_number).toLocaleString();
}

/**
 * 数据格式化为人民币显示格式
 */
function numToRMBFormat(_number, _color, _prev){
	var ret = numberFormatToStr(_number);
	if(ret == "") return "";
	
	//if(!!!_prev)  _prev = "￥";
	_prev = "";	
	if(!!!_color) _color = "green";
	if(_color){
		ret = "<font color='"+_color+"' style='font-weight:bold;'>"+_prev+ret+"</font>";
	}
	return ret;
}

/**
 * 数字格式化
 */
function fnumber(s, n){
	if( s == null || s == "" ){
		return "";
	}
	n = n > 0 && n <= 20 ? n: 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
	    r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
	    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ",": "");
	}
	return t.split("").reverse().join("") + "." + r;
}

/**
 * 数字格式化金额
 */
function fmoney(s, n) {
	if( s == null || s == "" ){
		return "";
	}
    n = n > 0 && n <= 20 ? n: 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ",": "");
    }
    return t.split("").reverse().join("") + "." + r;
}

/**
 * 加载样式块
 */
function includeStyleElement(styles, styleId){
	var style = document.getElementById(styleId);
	if(style){
		document.body.removeChild(style);
	}
	
	style = document.createElement("style");
	style.id = styleId;
	//为ie设置属性
	/*
	if (isIE()) {
	style.type = "text/css";
	style.media = "screen"
	}
	*/
	(document.getElementsByTagName("head")[0] || document.body).appendChild(style);
	if (style.styleSheet) { //for ie
		style.styleSheet.cssText = styles;
	} else {//for w3c
		style.appendChild(document.createTextNode(styles));
	}
}

/**
 * 返回空格字符串
 * @param num
 * @returns {String}
 */
function getSpaceNum(num){
	var space="";
	for(var i=0;i<num;i++){
		space+="&nbsp;";
	}
	return space;
}

/**
 * js获取项目根路径(上下文)
 */
function getContextPath(){
    var href=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=href.indexOf(pathName);
    var rootPath=href.substring(0, pos);
    var appName=pathName.substring(0, pathName.substr(1).indexOf('/')+1);
    return(rootPath+appName);
}

/**
 * js获取项目域名路径
 */
function getDomainPath(){
    var href=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=href.indexOf(pathName);
    return href.substring(0, pos);	
}

/**
 * 以post方式提交数据到servlet
 * @param url
 * 		提交地址
 * @param data
 * 		提交字符串
 * @param name
 * 		target名称
 */
function openPostWindow(url, data, name){
    var frm = document.createElement("form");  
    frm.id="frm";  
    frm.method="post";  
    frm.action=url;  
    frm.target=name;  
      
    var hideIpt = document.createElement("input");  
    hideIpt.type="hidden";  
    hideIpt.name= "data"
    hideIpt.value= data;
    frm.appendChild(hideIpt);   
    document.body.appendChild(frm);  

    if(frm.fireEvent)frm.fireEvent("onsubmit");
    frm.submit();
    document.body.removeChild(frm);
}


function openPostGLWindow(url, data, name, callback){
    var $frm = $("<form>", {
        id: 'frm',
        method: 'post',
        action: url,
        target: name
    });

    var $hideIpt = $("<input>", {
        type: 'hidden',
        name: 'data',
        value: data
    });

    $(document.body).append($frm.append($hideIpt));
    $frm.trigger('submit');
    $frm.remove();

    if(callback && typeof callback == 'function'){
        try{
            if($.browser.msid){
                callback();
            }else{
                window.setTimeout(callback, 100);
            }
        }catch(e){}
    }
}



/**
 * 为grid列表取合适的页记录条数
 * @param listId
 * 		容器列表Id
 * @param lineHeight
 *      行高
 * @param defaultVal
 *      默认值
 */
function getFittingPageSize(listId, lineHeight, defautVal){
	try{
		var list = document.getElementById(listId);
		var height = list.offsetHeight;
		var pageSize = Math.ceil(height/lineHeight);	
		if(pageSize > defautVal){
			return pageSize;
		}else{
			return defautVal;
		}
	}catch(e){
		return defautVal;
	}
}

/**
 * 取url中"?"符后的字串，以MAP形式返回
 * @return
 */
function GetRequest() {
	var url = location.search; // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/**
 * 取资源URL地址
 * @param argObj
 *    argObj.binbh 资源编号
 *    argObj.userid当前登录人ID
 *    argObj.ywlx  业务类型
 *    argObj.getMode 取数模式(0 - 普通、1 - 下载)
 *    argObj.clientSSO 用户是否单点登录( 1 - 是、0 - 否)
 */
function getBinContentURL(argObj){
	var retURL = "";
	
	try{
		if(!AjaxProxy) return "";
		if(!argObj.binbh || !argObj.userid || !argObj.ywlx
		    || !argObj.getMode){
			alert("请检查参数！");
			return "";
		}
	
		var ajax = new AjaxProxy();
		ajax.setCacheData(false);
		ajax.addParm("PC_YYFWDM", "000001");
		ajax.addParm("PN_BINBH", argObj.binbh);
		
		ajax.addParm("PN_USERID", argObj.userid);
		ajax.addParm("PC_YWLX", argObj.ywlx);
		ajax.addParm("PC_GETMODE", argObj.getMode);
		ajax.addParm("PC_CLIENTSSO", (argObj.clientSSO?argObj.clientSSO:"0"));
		
		ajax.addParm("PC_CHECKLOGIN", "0");
		ajax.addParm("PC_GETFILETYPE", "0");
		ajax.addParm("PC_THUMBCREATEFS", "");
		ajax.addParm("PN_THUMBWIDTH", 0);
		ajax.addParm("PN_THUMBHEIGHT", 0);
		
		ajax.invokeProc("APPUSER.PLATE_PUBLIC.PF_PLATE_GETBINCONTENT_URL", false);
		
		var ret = ajax.getInt("PN_RET")*1;
		var msg = ajax.getString("PC_MSG");
		if(ret == 0){
			retURL = ajax.getString("PC_URL");	
		}
	}catch(e){
		alert("取资源URL时出错！");
	}
	
	return retURL;
}

/**取数据库时间**/
function getSysDate(){
	var result = "";
	
	try{
		if(!AjaxProxy) return "";
	
		var ajax = new AjaxProxy();
		ajax.setCacheData(false);
		ajax.addParm("PC_FORMAT", "YYYY-MM-DD");
		
		ajax.invokeProc("APPUSER.PLATE_PUBLIC.PF_GET_CURRENT_DATETIME", false);
		
		var ret = ajax.getInt("PN_RET")*1;
		var msg = ajax.getString("PC_MSG");
		if(ret == 0){
			result = ajax.getString("PC_DATESTR");	
		}
	}catch(e){
		alert("取数据库当前时间出错！");
	}
	
	return result;
	
}

/**
 * 初始化用户指定流程待处理节点下拉列表：同步
 * @param $container 下拉列表
 * @param args 调用过程参数
 * @param defVal 默认选中值
 */
function initUserWaitTaskNodeDropdown($container, args, defVal){
	var ajax=new AjaxProxy();
	ajax.addParm("PN_USERID", args.N_USERID);  //当前操作用户Id
	ajax.addParm("PC_WF_KEY", args.C_WF_KEY);  //流程标志
	ajax.invokeProc("APPUSER.CTRI_PUB_YWLC.PF_CTRI_PUB_YWLC_DBRW_NODES", false);
	var row=ajax.getRowCount("P_RESULT");
	
	//$container.append("<option value=''></option>");
    if(row>0){
	    for(var i=1;i<=row;i++){
	      data={
			C_WF_TASKNODE    : ajax.getString("P_RESULT",i,"C_WF_TASKNODE"),
			C_WF_TASKNODENAME: ajax.getString("P_RESULT",i,"C_WF_TASKNODENAME")
	      }
	      
	      $container.append("<option value='"+data.C_WF_TASKNODE+"'>"+data.C_WF_TASKNODENAME+"</option>");
	    }
	 }
	 
	 if(defVal){
	 	$("option[value='"+defVal+"']", $container).attr({selected: true});	
	 }
}

/**
 * 合并相同数据行
 * @param datas 整页的数据
 * @param id grid绑定的ID名称(为空时是从1开始连续增加)
 * @param key datas中要合并数据的key
 * @param col 要合并行数据对应列数
 * @param grid 
 */
function rowSpan(datas,id,key,col,grid){
	var starts = [];
	if(id==""||id==null){
		starts.push(1);
	}else{
		var obj0 = datas[0];
		starts.push(eval("obj0."+id));
	}
	var rows = [];
	var a = 1;
	for ( var i = 0; i <= datas.length-2; i++) {
		var obj1 = datas[i];
		var value1 = eval("obj1."+key);
		var obj2 = datas[i+1];
		var value2 = eval("obj2."+key);
		if(value1 != value2){
			if(id==""||id==null){
				starts.push((i+2));
			}else{
				starts.push(eval("obj2."+id));
			}
			rows.push(a);
			a = 1;
		}else{
			a = a+1;
		}
		if(i == datas.length-2 && value1 == value2){
			rows.push(a);
		}
	}
	for ( var i = 0; i < starts.length; i++) {
		var start = starts[i];
		var row = rows[i];
		grid.setRowspan(start, col, row);
	}

}

/**
 * 图片等比例缩放
 * @param maxWidth
 *     最大宽度
 * @param maxHeight
 *     最大高度
 * @param objImg
 *     图片dom对象
 */
function autoResizeImage(maxWidth, maxHeight, objImg) {
	var img = new Image();
	img.src = objImg.src;
	var hRatio;
	var wRatio;
	var Ratio = 1;
	var w = img.width;
	var h = img.height;
	wRatio = maxWidth / w;
	hRatio = maxHeight / h;
	if (maxWidth == 0 && maxHeight == 0) {
		Ratio = 1;
	} else if (maxWidth == 0) {//  
		if (hRatio < 1)
			Ratio = hRatio;
	} else if (maxHeight == 0) {
		if (wRatio < 1)
			Ratio = wRatio;
	} else if (wRatio < 1 || hRatio < 1) {
		Ratio = (wRatio <= hRatio ? wRatio : hRatio);
	}
	if (Ratio < 1) {
		w = w * Ratio;
		h = h * Ratio;
	}
	objImg.height = h;
	objImg.width = w;
}

/**
 * 取Grid列表的合适显示行数
 * @param listHeight
 *     Grid列表容器高度
 * @param pageSize
 *     默认值    
 */
function getGridSuitableRowNum(listHeight, pageSize){
	try{
		var rowHeight = 40;//行高度
		var _pageSize = Math.round(listHeight/rowHeight);
		if(_pageSize < 5){
			_pageSize = pageSize;
		}
		return _pageSize;
	}catch(e){
		return pageSize;
	}
}

/**
 * js生成UUID(Universally Unique IDentifier) 
 * @param len
 *     长度
 * @param radix
 *     基数（2,10,16）
 */
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;
 
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
 
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
 
    return uuid.join('');
}
