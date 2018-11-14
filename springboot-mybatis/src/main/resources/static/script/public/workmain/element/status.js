
//===================================
// 设置页面元素状态用对象
//===================================

$ELS = {};

/**
 * 使指定对象无效
 */
$ELS.disabled = function(ele){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
				// 为下拉列表
				ele.disable(true);
			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	var imgid = "dtimg_" + idname;
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  $(ele).addClass("disabled");
		  $(ele).attr("disabled", true);
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  		// 是否有标尺
		  		var rule = $(ele).attr("rule");
		  		if(!StringUtil.isNull(rule) && (rule.toLowerCase() == "true" || rule == "1")){
		  			$(ele).removeClass("inputTextRule");
		  		}
		  		$(ele).addClass("disabled");
				$(ele).attr("disabled", true);
		  		break;
		  		
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			var selecter = $(ele).attr("selecter");
	  			if(StringUtil.isNull(selecter)){
		        	selecter = "false";
		        }
		        if(selecter != "true" && selecter != "false" && selecter != "1" && selecter != "0"){
		        	selecter = "false";
		        }
		        if(selecter == "1"){
		        	selecter = "true";
		        }
		        if(selecter == "0"){
		        	selecter = "false";
		        }
	  			if(selecter == "true"){
	  				var str = "";
	  				if(exttype=="date"){
			    		str = "Calendar";
			    	}else if(exttype=="datetime"){
			    		str = "DateTimeSelector";
			    	}else if(exttype == "timestamp"){
			    		str = "DateTimeSelector";
			    	}else{
			    		str = "TimeSelector";
			    	}
		    	  $("#" + imgid).attr("src", _CONTEXTPATH_ + "images/style/" + str +"_g.gif");
	  			}
	  			$(ele).addClass("disabled");
				$(ele).attr("disabled", true);
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				ElementEffect.CreateObj[idname].setEnable(false);
	  			}
	  			break;
		  };
		  
		  break;
	  case 'submit':
	  case 'reset':
	  case 'button':
		  var disclassA = $(ele + '_wrapA').attr("disclass");
		  //$(ele + '_wrapA').addClass("disabled");
		  $(ele + '_wrapA').addClass(disclassA);
		  $(ele).addClass("disabled");
	  	  $(ele + " img").addClass("disabled");
		  $(ele).attr("disabled", true);
		  $(ele + '_wrapA').attr("disabled", true);
	  	  break;
	  case 'checkbox':
		  $(ele).attr("disabled", true);
		  break;
	  case 'radio':
		  $(ele).attr("disabled", true);
		  break;
	  case 'file':
	  	  var id = $(ele).attr("id");
	  	  var divid = "div_" + id;
	  	  
	  	  // 取得风格
		  var face = $(ele).attr("face");
		  if(StringUtil.isNull(face) || face == ""){
		  	face = "button";
		  }
		  face = face.toLowerCase();
		  if(face != "link" && face != "button"){
		  	face = "button";
		  }
		  $("#" + divid).removeClass("selectFileDivHover_" + face);
		  $("#" + divid).addClass("selectFileDivDis_" + face);
		  $(ele).attr("disabled", true);
		  break;

	}
};

/**
 * 使指定对象有效
 */
$ELS.enabled = function(ele){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
				// 为下拉列表
				ele.disable(false);
			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	var imgid = "dtimg_" + idname;
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  $(ele).removeClass("disabled");
		  $(ele).addClass("inputText");
		  $(ele).attr("disabled", false);
		  break;
		  
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  		// 是否有标尺
		  		var rule = $(ele).attr("rule");
		  		if(!StringUtil.isNull(rule) && (rule.toLowerCase() == "true" || rule == "1")){
		  			$(ele).addClass("inputTextRule");
		  		}
				$(ele).removeClass("disabled");
				$(ele).addClass("inputText");
				$(ele).attr("disabled", false);
		  		break;
		  		
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			$(ele).removeClass("disabled");
	  		    $(ele).addClass("inputText");
		  		var selecter = $(ele).attr("selecter");
		  		if(StringUtil.isNull(selecter)){
		        	selecter = "false";
		        }
		        if(selecter != "true" && selecter != "false" && selecter != "1" && selecter != "0"){
		        	selecter = "false";
		        }
		        if(selecter == "1"){
		        	selecter = "true";
		        }
		        if(selecter == "0"){
		        	selecter = "false";
		        }
		  		if(selecter == "true"){
		  			var str = "";
			    	if(exttype=="date"){
			    		str = "Calendar";
			    	}else if(exttype=="datetime"){
			    		str = "DateTimeSelector";
			    	}else if(exttype == "timestamp"){
			    		str = "DateTimeSelector";
			    	}else{
			    		str = "TimeSelector";
			    	}
		    	  $("#" + imgid).attr("src", top._globPlateUserInfo.loginWebUrl + "images/style/" + str +".gif");
		  		}
		  		$(ele).attr("disabled", false);
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				ElementEffect.CreateObj[idname].setEnable(true);
	  			}
	  			break;
		  };
		  break;
		  
	  case 'submit':
	  case 'reset':
	  case 'button':
		  var disclassA = $(ele + '_wrapA').attr("disclass");
		  //$(ele + '_wrapA').removeClass("disabled");
		  $(ele + '_wrapA').removeClass(disclassA);
		  $(ele).removeClass("disabled");
	  	  $(ele + " img").removeClass("disabled");
	  	  $(ele).attr("disabled", false);
	  	  $(ele + '_wrapA').attr("disabled", false);
		  break;
	  case 'checkbox':
		  $(ele).attr("disabled", false);
		  break;
	  case 'radio':
		  $(ele).attr("disabled", false);
		  break;
	  case 'file':
	  	  var id = $(ele).attr("id");
	  	  var divid = "div_" + id;
	  	  
	  	  // 取得风格
		  var face = $(ele).attr("face");
		  if(StringUtil.isNull(face) || face == ""){
		  	face = "button";
		  }
		  face = face.toLowerCase();
		  if(face != "link" && face != "button"){
		  	face = "button";
		  }
		  $("#" + divid).removeClass("selectFileDivDis_" + face);
		  $(ele).attr("disabled", false);
		  break;
	}
};


/**
 * 设置对象只读方式
 */
$ELS.readOnly = function(ele, bEnabled){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
//			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
//				// 为下拉列表
//				ele.disable(true);
//			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	var imgid = "dtimg_" + idname;
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  if(bEnabled){
			  $(ele).addClass("readonly");
			  $(ele).blur();
		  }else{
			  $(ele).removeClass("readonly");
		  }
		  $(ele).attr("readOnly", bEnabled);
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  		// 是否有标尺
		  		var rule = $(ele).attr("rule");
		  		if(!StringUtil.isNull(rule) && (rule.toLowerCase() == "true" || rule == "1")){
		  			if(bEnabled){
		  				$(ele).removeClass("inputTextRule");
		  			}else{
		  				$(ele).addClass("inputTextRule");
		  			}
		  		}
		  		if(bEnabled){
		  			$(ele).addClass("readonly");
		  			$(ele).blur();
		  		}else{
		  			$(ele).removeClass("readonly");
		  		}
				$(ele).attr("readOnly", bEnabled);
//				if(bEnabled){
//					$(ele).focus(function(){$(ele).blur();});
//				}else{
//					$(ele).focus(function(){});
//				}
		  		break;
		  		
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			var selecter = $(ele).attr("selecter");
	  			if(StringUtil.isNull(selecter)){
		        	selecter = "false";
		        }
		        if(selecter != "true" && selecter != "false" && selecter != "1" && selecter != "0"){
		        	selecter = "false";
		        }
		        if(selecter == "1"){
		        	selecter = "true";
		        }
		        if(selecter == "0"){
		        	selecter = "false";
		        }
	  			if(selecter == "true"){
	  				var str = "";
	  				if(exttype=="date"){
			    		str = "Calendar";
			    	}else if(exttype=="datetime"){
			    		str = "DateTimeSelector";
			    	}else if(exttype == "timestamp"){
			    		str = "DateTimeSelector";
			    	}else{
			    		str = "TimeSelector";
			    	}
	  			    if(bEnabled){
	  			    	$("#" + imgid).attr("src", _CONTEXTPATH_ + "images/style/" + str +"_g.gif");
	  			    }else{
	  			    	$("#" + imgid).attr("src", _CONTEXTPATH_ + "images/style/" + str +".gif");
	  			    }
	  			}
	  			if(bEnabled){
	  				$(ele).addClass("readonly");
	  				$(ele).blur();
	  			}else{
	  				$(ele).removeClass("readonly");
	  			}
				$(ele).attr("readOnly", bEnabled);
				if(bEnabled){
					 $(ele).click(
						 function(){}
					 );
//					 $(ele).focus(function(){$(ele).blur();});
				}else{
					$(ele).click(
						 function(){
			        			ElementEffect.openWdatePicker(id, wdatepickformat);
			        		}
					);
//					$(ele).focus(function(){});
				}
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				ElementEffect.CreateObj[idname].setEnable(!bEnabled);
	  			}
	  			break;
		  };
		  
		  break;
	}
};


/**
 * 设置对象只读方式，且无边框
 */
$ELS.setNoBorder = function(ele){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
//			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
//				// 为下拉列表
//				ele.disable(true);
//			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	var imgid = "dtimg_" + idname;
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  $(ele).attr("disabled", false);
		  $(ele).attr("readOnly", true);
		  $(ele).addClass("noborder");
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  		// 是否有标尺
		  		var rule = $(ele).attr("rule");
		  		if(!StringUtil.isNull(rule) && (rule.toLowerCase() == "true" || rule == "1")){
		  			$(ele).removeClass("inputTextRule");
		  		}
		  		$(ele).attr("disabled", false);
				$(ele).attr("readOnly", true);
				$(ele).addClass("noborder");
		  		break;
		  		
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			var selecter = $(ele).attr("selecter");
	  			if(StringUtil.isNull(selecter)){
		        	selecter = "false";
		        }
		        if(selecter != "true" && selecter != "false" && selecter != "1" && selecter != "0"){
		        	selecter = "false";
		        }
		        if(selecter == "1"){
		        	selecter = "true";
		        }
		        if(selecter == "0"){
		        	selecter = "false";
		        }
	  			if(selecter == "true"){
	  				var str = "";
	  				if(exttype=="date"){
			    		str = "Calendar";
			    	}else if(exttype=="datetime"){
			    		str = "DateTimeSelector";
			    	}else if(exttype == "timestamp"){
			    		str = "DateTimeSelector";
			    	}else{
			    		str = "TimeSelector";
			    	}
	  			    $("#" + imgid).remove();
	  			}
	  			$(ele).attr("disabled", false);
				$(ele).attr("readOnly", true);
				$(ele).addClass("noborder");
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				ElementEffect.CreateObj[idname].setEnable(!bEnabled);
	  			}
	  			break;
		  };
		  
		  break;
	}
};

/**
 * 隐藏指定对象
 */
$ELS.hide = function(ele){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
				// 为下拉列表
				ele.show(false);
			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	var imgid = "dtimg_" + idname;
	var orgele = idname;
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  $(ele).attr("display", "none");
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			$(ele).hide();
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				ElementEffect.CreateObj[idname].hide();
	  			}
	  			break;
		  };
		  break;
	  case 'submit':
	  case 'reset':
	  case 'button':
		  var eleobj = document.getElementById(orgele);
		  if(eleobj.parentNode && eleobj.parentNode.getAttribute("exttype") == "zInputBtnWrap"){
			  eleobj.parentNode.style.display = 'none';
		  }
		  $(ele).hide();
		  break;
	  case 'checkbox':
		  $(ele).hide();
		  break;
	  case 'radio':
		  $(ele).hide();
		  break;
	  case 'file':
	      var id = $(ele).attr("id");
	  	  var divid = "div_" + id;
	  	  
	  	  $("#" + divid).hide();
		  $(ele).attr("disabled", true);
		  break;
	}
};

/**
 * 显示指定对象
 */
$ELS.show = function(ele){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
				// 为下拉列表
				ele.show(true);
			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	var imgid = "dtimg_" + idname;
	var orgele = idname;
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  $(ele).show();
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			$(ele).show();
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				ElementEffect.CreateObj[idname].show();
	  			}
	  			break;
		  };
		  break;
	  case 'submit':
	  case 'reset':
	  case 'button':
		  var eleobj = document.getElementById(orgele);
		  if(eleobj.parentNode && eleobj.parentNode.getAttribute("exttype") == "zInputBtnWrap"){
			  eleobj.parentNode.style.display = '';
		  }
		  $(ele).show();
		  break;
	  case 'checkbox':
		  $(ele).show();
		  break;
	  case 'radio':
		  $(ele).show();
		  break;
	  case 'file':
	  	  var id = $(ele).attr("id");
	  	  var divid = "div_" + id;
	  	  
	  	  $("#" + divid).show();
		  $(ele).attr("disabled", false);
		  break;
	}
};

/**
 * 设置指定对象的值
 */
$ELS.setValue = function(ele, value){
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
				// 为下拉列表
				ele.setComboText(value);
			}
			return;
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return;
			}
		}
	}else{
		idname = ele;
	}
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  retvalue = $(ele).val(value);
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  		retvalue = $(ele).val(value);
		  		break;
		  		
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			retvalue = $(ele).val(value);
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				$("#" + ElementEffect.CreateObj[idname].parentid).val(value);
	  				ElementEffect.CreateObj[idname].setValue(value);
	  			}
	  			break;
		  };
		  
		  break;
	  case 'submit':
	  case 'reset':
	  case 'button':
		  retvalue = $(ele).val(value);
	  	  break;
	  case 'checkbox':
	  	  $(ele).attr("checked", value);
		  break;
	  case 'radio':
	  	  $(ele).attr("checked", value);
		  break;
	}
};

/**
 * 取指定对象的值
 */
$ELS.getValue = function(ele){
	var retvalue;
	var imgid = "";
	var idname = "";
	if(typeof(ele)=="object"){
		// 是对象
		// 判断是否为下拉列表
		if(typeof(ele.DOMlist) == 'object'){
			if(typeof(ele.DOMlist.className) == "string" && ele.DOMlist.className.indexOf('dhx_combo_list') >= 0){
				// 为下拉列表
				return ele.getSelectedValue();
			}
			return "";
		}else{
			if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
				idname = $(ele).attr("id");
			}else{
				return "";
			}
		}
	}else{
		idname = ele;
	}
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	switch (eletype) {
	  case 'textarea':
		  retvalue = $(ele).val();
		  break;
	  case 'text':
	  case 'password':
		  var exttype = $(ele).attr("exttype");
		  if(StringUtil.isNull(exttype)){
			  exttype = "str";
		  }
		  exttype = exttype.toLowerCase();
		  switch (exttype) {
		  	case 'str':
		  	case 'int':
		  	case 'number':
		  	case 'numstr':
		  	case 'sfzhm':
		  	case 'zzjgdm':
		  		retvalue = $(ele).val();
		  		break;
		  		
		  	case 'date':
	  		case 'time':
	  		case 'datetime':
	  		case 'timestamp':
	  			retvalue = $(ele).val();
	  			break;
	  			
	  		case 'ip':
	  			if(typeof(ElementEffect.CreateObj[idname]) == "object"){
	  				retvalue = ElementEffect.CreateObj[idname].getValue();
	  			}
	  			break;
		  };
		  
		  break;
	  case 'submit':
	  case 'reset':
	  case 'button':
		  retvalue = $(ele).val();
	  	  break;
	  case 'checkbox':
	  	  $(ele).attr("checked");
		  break;
	  case 'radio':
	  	  $(ele).attr("checked");
		  break;
	}
	return retvalue;
}


/**
 * 清除Input File内容
 * @param {} ele
 */
$ELS.clearFileObj = function(ele){
	if(typeof(ele)=="object"){
		if(null != $(ele).attr("id") && "" != $(ele).attr("id") && $(ele).attr("id").length > 0){
			idname = $(ele).attr("id");
		}else{
			return;
		}
	}else{
		idname = ele;
	}
	ele = "#" + idname;
	var eletype = $(ele).attr("type");
	if(eletype != 'file')return;
	
	// 预览选择的图片img对象名称
    var dispimg = $(ele).attr("dispimg");
    if(StringUtil.isNull(dispimg) || dispimg == ""){
    	dispimg = "";
    }
    // 显示选择文件路径编辑框对象名称
    var disparea = $(ele).attr("displayarea");
    if(StringUtil.isNull(disparea) || disparea == ""){
    	disparea = "";
    }
    // 清除内容
    var file = $$(idname);
    file.value = "";
    if(file.value){
    	if ( $$B.ie ) {//ie
			with(file.parentNode.insertBefore(document.createElement('form'), file)){
				appendChild(file); reset(); removeNode(false);
			}
		} else {//opera
			file.type = "text"; file.type = "file";
		}
    }

    // 清除相关联的内容
    if(disparea != ""){
    	$("#" + disparea).val("");
    }
	if(dispimg != ""){
		if(ImagePreview.MODE == "filter"){
			var filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + ImagePreview.TRANSPARENT + "\")";
			$("#" + dispimg).css("filter", filter);
		}
		$("#" + dispimg).attr("src", ImagePreview.TRANSPARENT);
		if(StringUtil.isNotNull(ElementEffect.CreateObj[dispimg])){
			ElementEffect.CreateObj[dispimg]._data = "";
			ElementEffect.CreateObj[dispimg]._upload = null;
			ElementEffect.CreateObj[dispimg]._preload = null;
		}
	}
}