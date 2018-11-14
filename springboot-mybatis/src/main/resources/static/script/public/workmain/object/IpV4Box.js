

IpV4Box.all={};

IpV4Box.EnabledClassName="ipv4Input";//启用时样式
IpV4Box.DisabledClassName="ipv4Input inputDisable";// 禁用时样式

//function f_parentchange(){
//	var ip = this.value;
//	if(null == ip || "" == ip)
//	ip=ip.replace(/[^\d.]/g,"");
//	if(ip=="")
//	{
//		ip="...";
//	}
//	ip=ip.split(".");
//	document.getElementById("IPV4_" + this.id+"_1").value = ip[0]=="0"?"":ip[0];
//	document.getElementById("IPV4_" + this.id+"_2").value = ip[1]=="0"?"":ip[1];
//	document.getElementById("IPV4_" + this.id+"_3").value = ip[2]=="0"?"":ip[2];
//	document.getElementById("IPV4_" + this.id+"_4").value = ip[3]=="0"?"":ip[3];
//};

function IpV4Box(parent){
	if(!parent){
		return;
	}
	if(typeof parent=="string")
	{
		parent=document.getElementById(parent);
	}
	if (parent.tagName!="INPUT"){
		return;
	}
	this.id = "IPV4_" + parent.id;
	this.disabled=false;
	this.parentid = parent.id;
	this.isFocus = false;
	this.Enabled = true;
	this.onChange=new Function();
	this.onEnterKey=new Function();
	IpV4Box.all[this.id]=this;
	var size;
	size=size||parent.getAttribute("width")||(window.getComputedStyle?window.getComputedStyle(parent,null)["width"]:(parent.currentStyle?parent.currentStyle["width"]:0));
    if ((!size)||(size=="auto"))
    	size=parent.offsetWidth||100;
    if(size.toString().indexOf("px") < 0){
    	size = size + "px";
    }
    var sizenum = size.substr(0, size.indexOf("px")) * 1;
    var inpwidth = Math.floor(sizenum / 4) + "px";

    var z=document.createElement("SPAN");
    z.style.width = size;
    parent.parentNode.insertBefore(z,parent);
    parent.style.readOnly = "true";
    parent.style.display='none';
    var innstr = '<span  id="'+this.id+'" class="' + IpV4Box.EnabledClassName + '">';
    innstr += '<input onkeypress="IpV4Box.evt.keypress(\'' + this.id + '\',this,event);" onkeydown="IpV4Box.evt.keydown(\'' + this.id + '\',this,event);" onkeyup="IpV4Box.evt.keyup(\'' + this.id + '\',this,event);" onfocus="IpV4Box.evt.focus(\'' + this.id + '\',this,event);" onblur="IpV4Box.evt.blur(\'' + this.id + '\',this,event)" onpaste="IpV4Box.evt.change(\'' + this.id + '\',this,event);" oninput="IpV4Box.evt.change(\'' + this.id + '\',this,event);" onchange="IpV4Box.evt.change(\'' + this.id + '\',this,event);"  type="text" id="'+this.id+'_1" maxlength=3 style="width:' + inpwidth + ';"/>';
    innstr += '.<input onkeypress="IpV4Box.evt.keypress(\'' + this.id + '\',this,event);" onkeydown="IpV4Box.evt.keydown(\'' + this.id + '\',this,event);" onkeyup="IpV4Box.evt.keyup(\'' + this.id + '\',this,event);" onfocus="IpV4Box.evt.focus(\'' + this.id + '\',this,event);" onblur="IpV4Box.evt.blur(\'' + this.id + '\',this,event)" onpaste="IpV4Box.evt.change(\'' + this.id + '\',this,event);" oninput="IpV4Box.evt.change(\'' + this.id + '\',this,event);" onchange="IpV4Box.evt.change(\'' + this.id + '\',this,event);"  type="text" id="'+this.id+'_2" maxlength=3 style="width:' + inpwidth + ';"/>';
    innstr += '.<input onkeypress="IpV4Box.evt.keypress(\'' + this.id + '\',this,event);" onkeydown="IpV4Box.evt.keydown(\'' + this.id + '\',this,event);" onkeyup="IpV4Box.evt.keyup(\'' + this.id + '\',this,event);" onfocus="IpV4Box.evt.focus(\'' + this.id + '\',this,event);" onblur="IpV4Box.evt.blur(\'' + this.id + '\',this,event)" onpaste="IpV4Box.evt.change(\'' + this.id + '\',this,event);" oninput="IpV4Box.evt.change(\'' + this.id + '\',this,event);" onchange="IpV4Box.evt.change(\'' + this.id + '\',this,event);"  type="text" id="'+this.id+'_3" maxlength=3 style="width:' + inpwidth + ';"/>';
    innstr += '.<input onkeypress="IpV4Box.evt.keypress(\'' + this.id + '\',this,event);" onkeydown="IpV4Box.evt.keydown(\'' + this.id + '\',this,event);" onkeyup="IpV4Box.evt.keyup(\'' + this.id + '\',this,event);" onfocus="IpV4Box.evt.focus(\'' + this.id + '\',this,event);" onblur="IpV4Box.evt.blur(\'' + this.id + '\',this,event)" onpaste="IpV4Box.evt.change(\'' + this.id + '\',this,event);" oninput="IpV4Box.evt.change(\'' + this.id + '\',this,event);" onchange="IpV4Box.evt.change(\'' + this.id + '\',this,event);"  type="text" id="'+this.id+'_4" maxlength=3 style="width:' + inpwidth + ';"/>';
    innstr += '</span>';

    z.innerHTML=innstr;
    
    $("#" + this.id)[0].parentid = parent.id;
    $("#" + this.id)[0].isFocus = false;
    $("#" + this.id)[0].Enabled = true;
    
    
    $("#" + this.id).mousemove(function() {
    	if(!this.isFocus && this.Enabled){
    		$("#" + this.id)[0].style.borderColor = "#00aaee";
    	}
	});
    $("#" + this.id).mouseout(function() {
    	if(!this.isFocus && this.Enabled){
    		$("#" + this.id)[0].style.borderColor = "";
    	}
    });
    
//    if(isIE){
//    	document.getElementById(parent.id).onpropertychange = f_parentchange;
//    }else{
//    	document.getElementById(parent.id).oninput = f_parentchange;
//    }
    
 
    $("#" + parent.id).change(function(){
    	alert("ok");
    });

}

IpV4Box.prototype={
	/**
	* 激活IP框 
	* @param {number} index 1-4　指定激活的位置
	*/
	focus:function(index){
		if(!index)
			index=1;
		document.getElementById(this.id+"_"+index).focus();
	},
	setEnable:function(bEnable){
		var b=!bEnable;
		this.disabled=!bEnable;
		var boxes=document.getElementById(this.id).getElementsByTagName("input");
		for(var i=0;i<boxes.length;i++)
		{
			boxes[i].readOnly=b;
		}
		if(bEnable){
			$("#" + this.id).removeClass("ipv4InputDisable");
			$("#" + this.id)[0].Enabled = true;
		}else{
			$("#" + this.id).addClass("ipv4InputDisable");
			$("#" + this.id)[0].Enabled = false;
		}
		//document.getElementById(this.id).className=bEnable?IpV4Box.EnabledClassName:IpV4Box.DisabledClassName
	},

	getValue:function(){
		var ip=[
			document.getElementById(this.id+"_1").value,
			document.getElementById(this.id+"_2").value,
			document.getElementById(this.id+"_3").value,
			document.getElementById(this.id+"_4").value
		];
		return ip.join(".");
		
	},
	setValue:function(ip){
		ip=ip.replace(/[^\d.]/g,"");
		if(ip=="")
		{
			ip="...";
		}
		ip=ip.split(".");
		document.getElementById(this.id+"_1").value = ip[0];
		document.getElementById(this.id+"_2").value = ip[1];
		document.getElementById(this.id+"_3").value = ip[2];
		document.getElementById(this.id+"_4").value = ip[3];
	},
	hide:function(){
		$("#" + this.id).hide();
		$("#" + this.id + "_1").hide();
		$("#" + this.id + "_2").hide();
		$("#" + this.id + "_3").hide();
		$("#" + this.id + "_4").hide();
	},
	show:function(){
		$("#" + this.id).show();
		$("#" + this.id + "_1").show();
		$("#" + this.id + "_2").show();
		$("#" + this.id + "_3").show();
		$("#" + this.id + "_4").show();
	}
}


IpV4Box.evt={
		focus:function(parentid, obj, evt){
			obj.select();
			if($("#" + parentid)[0].Enabled){
				$("#" + parentid)[0].style.borderColor = "#ff8800";
		    	$("#" + parentid).addClass("ipv4InputFocus");
		    	$("#" + parentid)[0].isFocus = true;
			}
		},
		blur:function(parentid, obj, evt){
			if($("#" + parentid)[0].Enabled){
				$("#" + parentid)[0].style.borderColor = "";
				$("#" + parentid).removeClass("ipv4InputFocus");
				$("#" + parentid)[0].isFocus = false;
			}
		},
		change:function(parentid, obj, evt){
			var v=parseInt(obj.value);
			if( v >= 0 && v <= 255 )
			{
				if(v != obj.value)
					obj.value=v;
			
			}
			else{
				obj.value="";
			}
			IpV4Box.all[ obj.id.replace(/_\d$/,"") ].onChange();
		},
		keypress:function(parentid, obj, evt){
			var key=evt.charCode||evt.keyCode;
			var pos=IpV4Box.evt.getSelection(obj);
			var value=obj.value;
			var c=String.fromCharCode(key);
			if(key>=48 && key<=57)
			{
				value=""+value.substring(0,pos.start)
					+ c + value.substring(pos.end,value.length);
				
				if(parseInt(value)<256)
				{
	  				var id=obj.id;
					/(.*)_(\d)$/.test(id);
					var index=RegExp.$2;
					IP_id=RegExp.$1;
					if(parseInt(value)>=100)
					{
						if(parseInt(index)<4)
						{
							id=id.replace(/(\d)$/,parseInt(index)+1 );
							setTimeout("document.getElementById('"+id+"').focus();"+
								"document.getElementById('"+id+"').select();",200);
						}
					}
					setTimeout("IpV4Box.all['"+IP_id+"'].onChange()",0);
					return true;
				}
				else
				{
					
					if(evt.preventDefault)
						evt.preventDefault();
					evt.returnValue=false;
					return false;
				}
			}
			else{

				if(evt.preventDefault)
					evt.preventDefault();
				evt.returnValue=false;
			}
		},
		keydown:function(parentid, obj, evt){
			var key=evt.charCode||evt.keyCode;
			var pos=IpV4Box.evt.getSelection(obj);
			var value=obj.value;
			var c=String.fromCharCode(key);
		  	var id=obj.id;
			/^(.*)_(\d)$/.test(id);
			var index=RegExp.$2;
			var Ip_Id=RegExp.$1;
			switch(key)
			{
			  case 13://回车
				IpV4Box.all[Ip_Id].onEnterKey();	
				break;		 

			  case 110://.小键盘
			  case 190://.主键盘
				if(index<4)
				{

					id=id.replace(/(\d)$/,parseInt(index)+1 );
					document.getElementById(id).focus();
					document.getElementById(id).select();
				}
				break;

			  case 38://up
			  	
				value=!isNaN(parseInt(value))?parseInt(value):"";
			  	if(value=="")
					value=0;
			 	if(value<255)
				{
					obj.value=value+1;
				}
				else
					obj.value=0;
				;
			  	break;

			  case 40://down
				value=!isNaN(parseInt(value))?parseInt(value):"";
			  
			  	if(value=="")
					value=255;
			 	if(value>0)
				{
					obj.value=value-1;
				};
			  	break;
			  	
			  case 8://backspace
				if(pos.end==0 && index>1)
				{
					id=id.replace(/(\d)$/,parseInt(index)-1 );
					document.getElementById(id).focus();
					//document.getElementById(id).select();
				}
//				if(pos.start>0)
//					return;
				break;

			  case 32: // space
				if(pos.start==value.length && index<4 && value.length > 0)
				{
					id=id.replace(/(\d)$/,parseInt(index)+1 );
					document.getElementById(id).focus();
					document.getElementById(id).select();
				}
			    break;
				
			  case 37://left
			  	if(pos.end==0 && index>1)
				{
					id=id.replace(/(\d)$/,parseInt(index)-1 );
					document.getElementById(id).focus();
					document.getElementById(id).select();
				}
			  	break;
			  case 39://right
			  	if(pos.start==value.length && index<4 && value.length > 0)
				{
					id=id.replace(/(\d)$/,parseInt(index)+1 );
					document.getElementById(id).focus();
					document.getElementById(id).select();
				}
			  	break;
			}
		},
		
		keyup:function(parentid, obj, evt){
			var ip1 = document.getElementById(parentid+"_1").value;
			if(null == ip1 || "" == ip1){
				ip1 = "0";
			}
			ip1 = ip1 * 1;
			var ip2 = document.getElementById(parentid+"_2").value;
			if(null == ip2 || "" == ip2){
				ip2 = "0";
			}
			ip2 = ip2 * 1;
			
			var ip3 = document.getElementById(parentid+"_3").value;
			if(null == ip3 || "" == ip3){
				ip3 = "0";
			}
			ip3 = ip3 * 1;
			
			var ip4 = document.getElementById(parentid+"_4").value;
			if(null == ip4 || "" == ip4){
				ip4 = "0";
			}
			ip4 = ip4 * 1;
			
			var ip=[
					ip1, ip2, ip3, ip4
				];
			var ipstr = ip.join(".");
			if(ipstr.length < 7){
				ipstr = "";
			}
			var p = $("#" + parentid)[0].parentid;
			$("#" + p).val(ipstr);
		},
		
		//获取选区位置
		getSelection:function(oInput){
			var T=this;
			if(oInput.createTextRange){
				var s=document.selection.createRange().duplicate();
				s.moveStart("character",-oInput.value.length);
				var p1=s.text.length;
				
				
				var s=document.selection.createRange().duplicate();
				s.moveEnd("character",oInput.value.length);
				var p2=oInput.value.lastIndexOf(s.text);
				if(s.text=="")p2=oInput.value.length;
				
				
				return {start:p2,end:p1};
				
			}else {
				return {start:oInput.selectionStart,end:oInput.selectionEnd};
				
			}
		}
	}