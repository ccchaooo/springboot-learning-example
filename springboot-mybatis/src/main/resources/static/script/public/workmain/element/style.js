
//=======================================
// 页面元素效果设置
//=======================================


var ElementEffect = {};
ElementEffect.CreateObj = {};

/**
 * 初始化input域对象
 * @param {} ele
 */
ElementEffect.initControlStyle = function(ele){
	if(!ele.InitCtrlStyleFlag){ //避免多次初始化
		if(StringUtil.isNull(ele.type) || typeof(ele.type) == "undefined") return;
		var eletype = ele.type;
		eletype = eletype.toLowerCase();
		// 判断对象是否存在扩展属性
		if(null == $(ele).attr("exttype") || "" == $(ele).attr("exttype")){
			return;
		}
		switch (eletype) {
		  case 'textarea':
			  // 取得扩展类型
			  var exttype = $(ele).attr("exttype");
			  if(StringUtil.isNull(exttype)){
				 exttype = "";
			  }
			  exttype = exttype.toLowerCase();
			  // 如果扩展属性为'no'则不做渲染
			  if(exttype == 'no'){
				  return;
			  }
			  if(exttype == 'noborder'){
				  $(ele).attr("disabled", false);
				  $(ele).attr("readOnly", true);
				  $(ele).addClass("noborder");
				  return;
				
			  }

			  if(null == ele.isFocus){
				  ele.isFoucs = false;
			  }
			  $(ele).addClass("inputText");
			  
			  $(ele).mousemove(function() {
				  if(!ele.isFocus && !ele.readOnly && !ele.disabled){
					  this.style.borderColor = "#00aaee";
			  	  }
			  });
			  $(ele).mouseout(function() {
			  	  if(!ele.isFocus && !ele.readOnly && !ele.disabled){
			  		  this.style.borderColor = "";
			  	  }
			  });
			  $(ele).focus(function(){
				  if(!ele.readOnly && !ele.disabled){
					  this.style.borderColor = "#00aaee";
					  $(ele).addClass("inputTextFocus");
					  ele.isFocus = true;
				  }
			  });
			  
			  $(ele).blur(function() {
			      this.style.borderColor = "";
				  $(ele).removeClass("inputTextFocus");
				  ele.isFocus = false;
			  });
			
			  if (ele.disabled == true) {
				  $(ele).addClass("disabled");
			  };
			  if (ele.readOnly){
				  $(ele).attr("disabled", false);
				  $(ele).addClass("readonly");
			  }
		    break;  
		    
		  case 'text':
		  case 'password':
			
			  // 取得扩展类型
        var exttype = $(ele).attr("exttype");
        
        exttype = exttype.toLowerCase();
        // 如果扩展属性为'no'则不做渲染
        if(exttype == 'no'){
         return;
        }
        // 如果扩展属性为'noborder', 则没有边框，不允许输入
        if(exttype == 'noborder'){
          if(isIE6){
        	 	$(ele).css("height", "16px");
        	  $(ele).css("line-height", "16px");
          }
          $(ele).attr("disabled", false);
          $(ele).attr("readOnly", true);
          $(ele).css("border", "0px");
          return;
        }
			
  			// 设置相关样式
  			if(null == ele.isFocus){
  				ele.isFocus = false;
  			}

			  // 取得输入长度
			  var len = $(ele).attr("len");
			  if(StringUtil.isNull(len)){
				  len = "0";
			  }
			  if(!StringUtil.isInt(len)){
				  len = "0";
			  }
			  len = len * 1;
			  // 取得小数位数
			  var precision = $(ele).attr("precision");
			  if(StringUtil.isNull(precision)){
				  precision = "0";
			  }
			  if(!StringUtil.isInt(precision)){
				  precision = "0";
			  }
			  precision = precision * 1;
			
			  // 取得正负号
			  var sign = $(ele).attr("sign");
			  if(StringUtil.isNull(sign)){
				  sign = "";
			  }
			  if(sign != "+" && sign != "-"){
				  sign = "";
			  }
			
			  // 取得是否大小写
			  var capslk = $(ele).attr("capslk");
			  if(StringUtil.isNull(capslk)){
				  capslk = "";
			  }
			  if(capslk != "false" && capslk != "true" && capslk != "0" && capslk != "1"){
				  capslk = "";
			  }
			  if(capslk == "false"){
				  capslk = "0";
			  }
			  if(capslk == "true"){
				  capslk = "1";
			  }
			
			  // 取得是否允许空格
			  var space = $(ele).attr("space");
			  if(StringUtil.isNull(space)){
				  space = "0";
			  }
			  if(space != "false" && space != "true" && space != "0" && space != "1"){
				  space = "0";
			  }
			  if(space == "false"){
				  space = "0";
			  }
			  if(space == "true"){
				  space = "1";
			  }
			
			  // 取得是否允许下划线
			  var underline = $(ele).attr("underline");
			  if(StringUtil.isNull(underline)){
				  underline = "0";
			  }
			  if(underline != "false" && underline != "true" && underline != "0" && underline != "1"){
				  underline = "0";
			  }
			  if(underline == "false"){
				  underline = "0";
			  }
			  if(underline == "true"){
				  underline = "1";
			  }
			  // 取得是否允许加号
			  var plus = $(ele).attr("plus");
			  if(StringUtil.isNull(plus)){
				  plus = "0";
			  }
			  if(plus != "false" && plus != "true" && plus != "0" && plus != "1"){
				  plus = "0";
			  }
			  if(plus == "false"){
				  plus = "0";
			  }
			  if(plus == "true"){
				  plus = "1";
			  }
			
			  // 取得是否允许减号
			  var minus = $(ele).attr("minus");
			  if(StringUtil.isNull(minus)){
				  minus = "0";
			  }
			  if(minus != "false" && minus != "true" && minus != "0" && minus != "1"){
				  minus = "0";
			  }
			  if(minus == "false"){
				  minus = "0";
			  }
			  if(minus == "true"){
				  minus = "1";
			  }
			
			  // 取得是否允许小数点
			  var point = $(ele).attr("point");
			  if(StringUtil.isNull(point)){
				  point = "0";
			  }
			  if(point != "false" && point != "true" && point != "0" && point != "1"){
				  point = "0";
			  }
			  if(point == "false"){
				  point = "0";
			  }
			  if(point == "true"){
				  point = "1";
			  }
			
			  // 失去焦点回调函数
			  var blurfun = $(ele).attr("blurfun");
			  if(StringUtil.isNull(blurfun) || blurfun.length == ""){
				  blurfun = "";
			  }
			
			  // 输入完成后回调函数
			  var overfun = $(ele).attr("overfun");
			  if(StringUtil.isNull(overfun) || overfun.length == ""){
				  overfun = "";
			  }
		  	// 根据扩展类型进行相应处理
		  	switch (exttype) {
		  		case 'str':
			    	if(len > 0){
			    		$(ele).attr("maxlength", len);
			    	}
		    		var arg ={
		    					len: len,
		    					precision: 0,
		    					sign: "",
		    					capslk: capslk,
		    					space: space,
		    					blurfun: blurfun,
		    					overfun: overfun
		    				 };
		    		// hx 添加if
		    		if (!!ele.id) {
		    			InputFilter.restrict($("#"+ele.id)[0], "str", arg);
		    		}
		  			break;
		  		case 'date':
		  		case 'time':
		  		case 'datetime':
		  		case 'timestamp':
		  		    // 日期或时间选择器
			    	var init = $(ele).attr("init");
			    	var containername = $(ele).attr("container");
			    	var containerObj = null;
			    	if(null != containername && "" != containername){
			    		 containerObj = $("#" + containername);
			    	}
			    	if(StringUtil.isNull(init)){
			    		init = "false";
			      }
			      if(init != "true" && init != "false" && init != "1" && init != "0"){
			      	init = "false";
			      }
			      if(init == "1"){
	         	  init = "true";
			      }
			      if(init == "0"){
			      	init = "false";
			      }
			    	
			    	var format = $(ele).attr("format");
			    	if(StringUtil.isNull(format)){
			    		if(exttype=="datetime"){
			    			format = "yyyy-mm-dd hh:ff";
			    		}else if(exttype=="time"){
			    			format = "hh:ff:ss";
			    		}else if(exttype == "timestamp"){
			    			format = "yyyy-mm-dd hh:ff:ss";
			    		}else{
			    			format = "yyyy-mm-dd";
			    		}
			    	}
			    	var str = "";
			    	var classname = "";
			    	var startDate = "";
			    	if(exttype=="date"){
			    		str = "Calendar";
			    		classname = "picker_calendarimg";
			    		if(init == "true"){
			    			$(ele).val(DateTime.getCurrentDate());
			    			startDate = DateTime.getCurrentDate();
			    		}
			    	}else if(exttype=="datetime"){
			    		str = "DateTimeSelector";
			    		classname = "picker_datatimeimg";
			    		if(init == "true"){
				    		var datestr = DateTime.getCurrentDate();
				    		var timestr = DateTime.getCurrentTime();
				    		$(ele).val(datestr + " " + timestr.substr(0, 5));
				    		startDate = datestr + " " + timestr.substr(0, 5);
			    		}
			    	}else if(exttype == "timestamp"){
			    		str = "DateTimeSelector";
			    		classname = "picker_datatimeimg";
			    		if(init == "true"){
				    		var datestr = DateTime.getCurrentDate();
				    		var timestr = DateTime.getCurrentTime();
				    		$(ele).val(datestr + " " + timestr);
				    		startDate = datestr + " " + timestr;
			    		}
			    	}else{
			    		str = "TimeSelector";
			    		classname = "picker_timeimg";
			    		if(init == "true"){
			    			$(ele).val(DateTime.getCurrentTime());
			    			startDate = DateTime.getCurrentTime();
			    		}
			    	}
			    	var id = ele.id;
			      if(id==null||id==""){
			        ele.id = id = (DateTime.LastID++);
			      }
			      // 设置输入格式
			      ele.formatID = new InputDateTimeMask($("#"+ele.id)[0], format);
			        
			      // 判断是否需要选择器
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
				      // 设置事件及增加选择器
				      var wdatepickformat = "";
				      var html5pickformat = "";
				      if(exttype=="date"){
				        wdatepickformat = "yyyy-MM-dd";
				        html5pickformat = "yyyy-mm-dd";
				      }else if(exttype == "datetime"){
				        wdatepickformat = "yyyy-MM-dd HH:mm";
				        html5pickformat = "yyyy-mm-dd hh:ii";
				      }else if(exttype == "timestamp"){
				        wdatepickformat = "yyyy-MM-dd HH:mm:ss";
				        html5pickformat = "yyyy-mm-dd hh:ii:ss";
				      }else{
				        wdatepickformat = "HH:mm:ss";
				        html5pickformat = "hh:ii:ss";
				      }
				      

				      var iconfile = "";
				      if($("#" + id).attr("disabled") || $("#" + id).attr("readOnley")){
				        iconfile = _CONTEXTPATH_ + "controls/My97DatePicker/skin/" + str +"_g.gif";
				        classname = classname + "_g";
				      }else{
				        iconfile = _CONTEXTPATH_ + "controls/My97DatePicker/skin/" + str +".gif";
				      }
				      
				      $("#" + id).addClass(classname);
				      
				      // 判断浏览器是否支持HTML5
				      if (window.applicationCache) {
				      	// 支持,使用datetimepicker
  				      $("#" + id).datetimepicker({
  				      	language: 'zh-CN',
  				      	container: containerObj,
                  format: html5pickformat,
                  weekStart: 1,
                  todayBtn:  1,
                  autoclose: 1,
                  todayHighlight: 1,
                  startView: 2,
                  forceParse: 0,
                  //showMeridian: 1,
                  minuteStep: 10
                });
				      }else{
				      	// 不支持, 使用My97DatePicker
				      	$("#"+id).focus(function(){
				      	   WdatePicker({$crossFrame:false,el:id,skin:'whyGreen',enableInputMask:false,dateFmt:wdatepickformat,errDealMode:2,autoPickDate:true});
				      	});
				      }
				      //$(ele).after("<img id='dtimg_" + id + "'src='"+ iconfile + "' align='middle' vspace='1' style='position:relative; float:left; left:-20px; margin-right:-20px; cursor:pointer;' onmousedown=\"ElementEffect.openWdatePicker('" + id + "', '" + wdatepickformat + "');\">");
			      }
			      break;
			        
		  		case 'int':
		  			if(len > 0){
			    		$(ele).attr("maxlength", len);
		  			}
		  			var arg ={
		    					len: len,
		    					precision: precision,
		    					sign: sign,
		    					capslk: "",
		    					space: "",
		    					blurfun: blurfun,
		    					overfun: overfun
		  					 };
		  			InputFilter.restrict($("#"+ele.id)[0], exttype, arg);
		  			break;
		  			
		  		case 'number':
		  			if(precision == 0){
		  				precision = 2;
		  			}
		  			if(len == 0){
		  				len = percision + 3;
		  			}else{
		  				if(len <= precision){
		  					len = precision + 3;
		  				}
		  			}
		  			if(len > 0){
			    		$(ele).attr("maxlength", len);
		  			}
		  			var arg ={
	    					len: len,
	    					precision: precision,
	    					sign: sign,
	    					capslk: "",
	    					space: "",
	    					blurfun: blurfun,
	    					overfun: overfun
	  					 };
		  			InputFilter.restrict($("#"+ele.id)[0],"number", arg);
		  			break;
		  			
		  		case 'numstr':
		  			if(len > 0){
			    		$(ele).attr("maxlength", len);
		  			}
		  			var arg ={
	    					len: len,
	    					precision: 0,
	    					sign: '',
	    					capslk: capslk,
	    					space: space,
	    					underline: underline,
	    					plus: plus,
	    					minus: minus,
	    					point: point,
	    					blurfun: blurfun,
	    					overfun: overfun
	  					 };
			    	InputFilter.restrict($("#"+ele.id)[0], "numstr", arg);
		  			break;
		  			
		  		case 'sfzhm':
		  			var autochg18 = $(ele).attr("autochg18");
		  			if(StringUtil.isNull(autochg18)){
		  				autochg18 = "true";
		  			}
		  			if(autochg18 != "true" && autochg18 != "false" && autochg18 != "1" && autochg18 != "0"){
		  				autochg18 = "true";
		  			}
		  			if(autochg18 == "1"){
		  				autochg18 = "true";
		  			}
		  			if(autochg18 == "0"){
		  				autochg18 = "false";
		  			}
		  			var arg = {
		  					    autochg18: autochg18,
		  					    blurfun: blurfun,
		  						  overfun: overfun
		  					  };
			    	InputFilter.restrict($("#"+ele.id)[0], "sfzhm", arg);
		  			break;
		  			
		  		case 'zzjgdm':
		  			var arg = {
		  						blurfun: blurfun,
		  						overfun: overfun
		  					  };
		  			InputFilter.restrict($("#"+ele.id)[0], "zzjgdm", arg);
		  			break;
		  			
		  		case 'ip':
		  			var ipobj = new IpV4Box($("#"+ele.id)[0]);
		  			ElementEffect.CreateObj[ele.id] = ipobj;
		  			break;

		  	};
		  	
		    break;
		  /*case 'submit':
		  case 'reset':
		  case 'button':
		  	if(ele.className==""&&!(/border|background/).test((ele.style.cssText).toLowerCase())){
		  		//在没有定义class或没有定义background的情况下处理button样式;
		  		var btId = ele.id;
		  		if(null == btId || "" == btId){
		  			ele.id = "btn_" + (DateTime.LastID + 1);
		  		}
		  		var exttype = $(ele).attr("exttype");
		  		if(null == exttype || "" == exttype){
		  			exttype = "normal";
		  		}
		  		exttype = exttype.toLocaleLowerCase();
		  		switch(exttype){
		  			case 'normal':
		  				$(ele).addClass("normalButton");
				  		$(ele).addClass("hidefocus");
						ele.hideFocus = true;
						if (ele.parentNode.tagName.toUpperCase() != "A") {
							$(ele).wrap("<a href='javascript:void(0);' exttype='zInputBtnWrap' class='normalButtonTagA' disclass='normalButtonTagAdis' hidefocus='true' tabindex='-1' id='" + ele.id + "_wrapA'><\/a>");
						}
						break;
		  			case 'big':
		  				$(ele).addClass("bigButton");
				  		$(ele).addClass("hidefocus");
						ele.hideFocus = true;
						if (ele.parentNode.tagName.toUpperCase() != "A") {
							$(ele).wrap("<a href='javascript:void(0);' exttype='zInputBtnWrap' class='bigButtonTagA' disclass='bigButtonTagAdis' hidefocus='true' tabindex='-1' id='" + ele.id + "_wrapA'><\/a>");
						}
		  				break;
		  			case 'red':
		  				$(ele).addClass("redButton");
				  		$(ele).addClass("hidefocus");
						ele.hideFocus = true;
						if (ele.parentNode.tagName.toUpperCase() != "A") {
							$(ele).wrap("<a href='javascript:void(0);' exttype='zInputBtnWrap' class='redButtonTagA' disclass='redButtonTagAdis' hidefocus='true' tabindex='-1' id='" + ele.id + "_wrapA'><\/a>");
						}
		  				break;
		  			case 'green':
		  				$(ele).addClass("greenButton");
				  		$(ele).addClass("hidefocus");
						ele.hideFocus = true;
						if (ele.parentNode.tagName.toUpperCase() != "A") {
							$(ele).wrap("<a href='javascript:void(0);' exttype='zInputBtnWrap' class='greenButtonTagA' disclass='greenButtonTagAdis' hidefocus='true' tabindex='-1' id='" + ele.id + "_wrapA'><\/a>");
						}
		  				break;
		  			case 'bigred':
		  				$(ele).addClass("bigredButton");
				  		$(ele).addClass("hidefocus");
						ele.hideFocus = true;
						if (ele.parentNode.tagName.toUpperCase() != "A") {
							$(ele).wrap("<a href='javascript:void(0);' exttype='zInputBtnWrap' class='bigredButtonTagA' disclass='bigredButtonTagAdis' hidefocus='true' tabindex='-1' id='" + ele.id + "_wrapA'><\/a>");
						}
		  				break;
		  			case 'biggreen':
		  				$(ele).addClass("biggreenButton");
				  		$(ele).addClass("hidefocus");
						ele.hideFocus = true;
						if (ele.parentNode.tagName.toUpperCase() != "A") {
							$(ele).wrap("<a href='javascript:void(0);' exttype='zInputBtnWrap' class='biggreenButtonTagA' disclass='biggreenButtonTagAdis' hidefocus='true' tabindex='-1' id='" + ele.id + "_wrapA'><\/a>");
						}
		  				break;
		  		}

			}
		    break;*/

		  case 'file':
		    var id = $(ele).attr("id");
		    if(StringUtil.isNull(id) || id == ""){
		    	id = "selfile" + (DateTime.LastID + 1);
		    }
		    // 取得风格
		    var face = $(ele).attr("face");
		    if(StringUtil.isNull(face) || face == ""){
		    	face = "button";
		    }
		    face = face.toLowerCase();
		    if(face != "link" && face != "button"){
		    	face = "button";
		    }
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
		    
		    // 修改file域样式
		    var divid = "div_" + id;
		  	$(ele).wrap("<div id='" + divid + "' class='selectFileDiv_" + face + "'><\/div>");
		  	$(ele).addClass("inputfile");
		  	
		  	// 是否无效
		  	if(ele.disabled){
		  		$("#" + divid).addClass("selectFileDivDis_" + face);
		  	}
		  	// 鼠标进入显示风格
		  	$("#" + divid).mousemove(function() {
		  		if(!ele.disabled){
		  			$("#" + divid).addClass("selectFileDivHover_" + face);
		  		}
		    });
		    // 鼠标移出
		    $("#" + divid).mouseout(function() {
		    	if(!ele.disabled){
		    		$("#" + divid).removeClass("selectFileDivHover_" + face);
		    	}
		    });
		    // 初始化图片显示
		    var imgobj;
		    if(dispimg != ""){
		    	// 取得错误时执行的方法

		    	imgobj = new ImagePreview(ele, dispimg);

		    	$("#" + dispimg).attr("src", ImagePreview.TRANSPARENT);
		    	ElementEffect.CreateObj[dispimg] = imgobj;
		    }
		    
		    if(disparea != "" || dispimg != ""){
			    $(ele).change(function(){
			    	if(disparea != ""){
			    		$("#" + disparea).val($(ele).val());
			    	}
			    	if(dispimg != ""){
			    		// 显示选择的图片
			    		imgobj.preview();
			    	}
			    });
		    }
		    break;
		    
		  case 'image':
		  	ElementEffect.initImgStyle(ele);
		    break;
		  default:
		    break;
		 }
		 ele.InitCtrlStyleFlag = true;
	}
},

ElementEffect.openWdatePicker = function(id, dtformat){
	if(!$("#" + id).attr("disabled")){
		WdatePicker({el:id,skin:'whyGreen',enableInputMask:false,dateFmt:dtformat,errDealMode:2,autoPickDate:true});
	}
},

/**
 * 初始化图片显示区
 * @param {} ele
 */
ElementEffect.initImgStyle = function(ele){
	if(!ele.InitImgStyleFlag){ //避免多次初始化
		// 取得扩展属性
		// 0. 取得ID
		var idname = $(ele).attr("id");
		if(StringUtil.isNull(idname) || idname == ""){
			idname = "img_" + (DateTime.LastID + 1);
		}
		// 1. 最大宽、高
		var maxH = $(ele).attr("maxheight");
		if(StringUtil.isNull(maxH) || maxH == ""){
			return;
		}
		var maxW = $(ele).attr("maxwidth");
		if(StringUtil.isNull(maxW) || maxW == ""){
			return;
		}
		// 2. 是否有边框
		var border = $(ele).attr("imgborder");
		if(StringUtil.isNull(border) || border == ""){
			border = "true";
		}
		if(border != "true" && border != "false" && border != "1" && border != "0"){
			border = "true";
		}
		if(border == "false")border = "0";
		if(border == "true")border = "1";
		
		// 3. 边框颜色
		var bordercolor = $(ele).attr("bordercolor");
		if(StringUtil.isNull(bordercolor) || bordercolor == ""){
			bordercolor = "#ccc";
		}
		
		// 4. 背景色
		var bkcolor = $(ele).attr("bkcolor");
		if(StringUtil.isNull(bkcolor) || bkcolor == ""){
			//bkcolor = "#eee";
			bkcolor = "transparent"
		}
		
		// 5. 将图片用div包裹
		var divstr = "";
		divstr = "<div id='wrapimg_" + idname + "' ";
		divstr += "style='height:" + maxH + "px; width:" + maxW + "px; ";
		divstr += "border:" + border + "px solid " + bordercolor + "; ";
		divstr += "background:" + bkcolor + "; ";
		divstr += "margin:0; text-align:center; ";
		divstr += "'" + "  ><\/div>";
		$(ele).wrap(divstr);
		
		ele.InitImgStyleFlag = true;
	}
},

ElementEffect.initChildren = function(ele){
	var imgs = $("img");
	if(null != imgs){
		for(var i = 0; i< imgs.length; i++){
			ElementEffect.initImgStyle(imgs[i]);
		}
	}
	var eles = $(":input");
	if(null != eles){
		var num = eles.length * 1;
		for(var i = 0; i < num; i++){
			ElementEffect.initControlStyle(eles[i]);
		}
	}
};