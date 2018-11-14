


function magsearchedit(parent, face, chgcallback, entercallback){
	if(!parent){
		return;
	}
	if(typeof parent=="string")
	{
		parent = $("#" + parent)[0];
	}
	if(parent.tagName.toUpperCase() != "DIV"){
		return;
	}
	this.maxlen = $(parent).attr("maxlen");
	if(null == this.maxlen || "" == this.maxlen || this.maxlen < 1){
		this.maxlen = 0;
	}
	this.maxlen = this.maxlen * 1;
	this.id = "MAGSRCHEDIT_" + parent.id;
	this.editid = this.id + "_edit";
	this.clrbtid = this.id + "_clr";
	this.clearBtn = false;
	this.path = this.getConTextPath();
	this.face = face;
	if(null == face || "" == face){
		this.face = "default";
	}
	if(null != chgcallback){
		$(this).bind("onChange", chgcallback);
	}
	if(null != entercallback){
		$(this).bind("onEnter", entercallback);
	}
	
	var size;
	size=size||parent.style.width||(window.getComputedStyle?window.getComputedStyle(parent,null)["width"]:(parent.currentStyle?parent.currentStyle["width"]:0));
    if ((!size)||(size=="auto"))
    	size=parent.offsetWidth||100;
    if(size.toString().indexOf("px") >=0 ){
    	size = StringUtil.replace(size, "px", "");
    	size = StringUtil.replace(size, "PX", "");
    }
    var array = new Array();
    
    
    array.push('<div  id="' + this.id + '" class="magsearcheditwrap">');
    
    var rimg = this.path + "style/" + this.face + "/imgs/srch_l.png";
    var style = "background: url('" + rimg + "') no-repeat top left;";
    style += "_background: url('" + rimg + "') no-repeat top left;";
    style += "_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src='" + rimg + "');";
    style += "_background:none;";
    array.push('<span class="magsearcheditbox_left" style="' + style + '"></span>');

    var rimg = this.path + "style/" + this.face + "/imgs/srch_bg.png";
    style += "background: url('" + rimg + "') no-repeat top left;";
    style += "_background: url('" + rimg + "') no-repeat top left;";
    style += "_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='" + rimg + "');";
    style += "_background:none;";
        
    array.push('<div class="magsearcheditbox" style="width:' + (size-47) + 'px;">');
    array.push('<div class="magsearcheditboxbkimg" style="height:19px;width:' + (size - 47) + 'px;' + style + '"></div>');
    array.push('<div class="magsearcheditdiv" style="width:' + (size-50) + 'px;">');
    array.push('<input class="magsearchedit" type="text" exttype="no" id="' + this.editid + '" style="width:' + (size - 50) + 'px;outline:none;"/> ');
    array.push('</div>');
    array.push('</div>');
    
    
    var rimg = this.path + "style/" + this.face + "/imgs/srch_r.png";
    var style = "background: url('" + rimg + "') no-repeat top left;";
    style += "_background: url('" + rimg + "') no-repeat top left;";
    style += "_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src='" + rimg + "');";
    style += "_background:none;";
    array.push('<span class="magsearcheditbox_right" style="' + style + '" id="' + this.clrbtid + '"></span>');
    array.push('</div>');
    parent.innerHTML = array.join("");
    
    if(this.maxlen > 0){
    	$("#" + this.editid).attr("maxlength", this.maxlen);
    }

    
    // 注册事件
    $("#" + this.editid).bind("keyup", {z:this}, function(event){
		var z = event.data.z;
		var key = event.charCode || event.keyCode;
		var value = $("#" + z.editid).val();
		if(key == 13){
			// 回车
			if(null != value && "" !== value && value.length > 0){
				$(z).triggerHandler("onEnter", [value]);
			}
		}else{
			// 如果输入的长度和设定的长度一致则触发回车事件
			if(z.maxlen > 0 && value.length == z.maxlen){
				$(z).triggerHandler("onEnter", [value]);
			}else{
				$(z).triggerHandler("onChange", [value]);
			}
		}
		magsearchedit.onChange(z);
    });
}


magsearchedit.prototype={
		getConTextPath:function(){
			var scripts = document.getElementsByTagName("script");
			for(var i=0;i<scripts.length;i++){
				if(/.*workmain\/object\/magsearchedit\.js$/g.test(scripts[i].getAttribute("src"))){
					var jsPath = scripts[i].getAttribute("src").replace(/workmain\/object\/magsearchedit\.js$/g,'');
					if(jsPath.indexOf("/")==0||jsPath.indexOf("://")>0){
						CONTEXTPATH = jsPath;
						break;
					}
					var arr1 = jsPath.split("/");
					var path = window.location.href;
					if(path.indexOf("?")!=-1){
						path = path.substring(0,path.indexOf("?"));
					}
					var arr2 = path.split("/");
					arr2.splice(arr2.length-1,1);
					for(var i=0;i<arr1.length;i++){
						if(arr1[i]==".."){
							arr2.splice(arr2.length-1,1);
						}
					}
					return arr2.join('/')+'/';
				}
			}
		},
		
		/**
		 * 取得值
		 */
		getValue:function(){
			return $("#" + this.editid).val();
		},
	
		/**
		 * 设置值
		 */
		setValue:function(data){
			$("#" + this.editid).val(data);
			magsearchedit.onChange(this);
		},
		
		/**
		 * 清除值
		 */
		clear:function(){
			$("#" + this.editid).val("");
			magsearchedit.onChange(this);
		},
		
		/**
		 * 设置焦点
		 */
		focus:function(){
			$("#" + this.editid).focus();
		},
		
		/**
		 * 设置无效
		 */
		disabled:function(){
			$("#" + this.editid).attr("disabled", true);
			$("#" + this.editid).addClass("magsearcheditdisabled");
		},
		
		/**
		 * 设置有效
		 */
		enabled:function(){
			$("#" + this.editid).attr("disabled", false);
			$("#" + this.editid).removeClass("magsearcheditdisabled");
		},
		
		/**
		 * 重新设置大小
		 */
		resize:function(){
			
		}
		
		
};

magsearchedit.onChange = function(editObj){
	var fld = document.getElementById(editObj.editid);
	var btn = document.getElementById( editObj.clrbtid );
	if (fld.value.length > 0 && !this.clearBtn)
	{
	    var rimg = editObj.path + "style/" + editObj.face + "/imgs/srch_r_f2.png";
	    var style = "background: url('" + rimg + "') no-repeat top left;";
	    style += "_background: url('" + rimg + "') no-repeat top left;";
	    style += "_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src='" + rimg + "');";
	    style += "_background:none;";
	    $(btn).attr("style", style);
		btn.editObj = editObj;
		btn.onclick = this.clearBtnClick;
		this.clearBtn = true;
	} else if (fld.value.length == 0 && this.clearBtn)
	{
	    var rimg = editObj.path + "style/" + editObj.face + "/imgs/srch_r.png";
	    var style = "background: url('" + rimg + "') no-repeat top left;";
	    style += "_background: url('" + rimg + "') no-repeat top left;";
	    style += "_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src='" + rimg + "');";
	    style += "_background:none;";
	    $(btn).attr("style", style);
	    btn.onclick = null;
		this.clearBtn = false;
	};
};

magsearchedit.clearBtnClick = function(){
	magsearchedit.clearFld(this.editObj);
};

magsearchedit.clearFld = function(editObj){
	var fld = document.getElementById( editObj.editid );
	fld.value = "";
	fld.focus();
	$(editObj).triggerHandler("onChange", [""]);
	this.onChange(editObj);
};

