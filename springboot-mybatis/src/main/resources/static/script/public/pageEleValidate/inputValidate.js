/**
 * 功能 : 处理键盘输入一般处理区
 * 同时处理onKeyUp及onpaste onKeyUp="dumpdYear()" onpaste="dumpdYear()"
**/
//BASE 对输入框以正则表达式规范其值
function dumpRegExp(tRe){
	var tVal=event.srcElement.value;	
	tRe = new RegExp(tRe,"ig");
	if(event.type=="paste") tVal = clipboardData.getData("Text");
	var tRet = tVal.match(tRe);
	event.srcElement.value = (tRet==null?"":tRet[0]);
	event.returnValue=false;
}
//只能输入年度1990-2009
function dumpYear(){
	var tRe="1(99[0-9]|9{0,2})?|2(00[0-9]|0{0,2})?";
	return dumpRegExp(tRe);
}
//功能:只能输入长度不大于len的数字
function dumpNum(len){
	len=!len?"":len;
	var tRe="([0-9]{0,"+len+"})";	
	return dumpRegExp(tRe);
}
//功能:只能输入0|大于0但长度不大于len有数字值
function dumpInt(len){
	len=!len?"":(len-=1);
	var tRe="([1-9][0-9]{0,"+len+"})|0";
	return dumpRegExp(tRe);
}
//功能:批准文号
function dumpPzwh(len){
	len=!len?"":(len-=1);
	var tRe="([1-9][0-9]{0,"+len+"})";
	return dumpRegExp(tRe);
}
//功能:只能输入[m|0].n浮点型数据
function dumpfloat(m,n,fs){
	m=!m?"":(m-=1);
	n=!n?"":n;
	var tRe=(!fs?"":"(-)?");
	tRe+="(0|[1-9][0-9]{0,"+m+"})?([\.][0-9]{0,"+n+"})?";
	return dumpRegExp(tRe);
}
//功能:只能输入13*/159手机
function dumpMobile(){
    var tRe="(0?(1[0-9]{0,10}|15(9[0-9]{0,8})?))|(01|0|1)";
	return dumpRegExp(tRe);
}
//功能:只能输入电话号码 86183
function dumpTel(){
	var tRe="(0{0,2}([1-9][0-9]{0,10})?)|([1-9][0-9]{0,7})(-([1-9][0-9]{0,3})?)?";
	return dumpRegExp(tRe);
}
function dumpMobTel(){
	var tRe="0{0,2}(([2-9][0-9]{0,10})(-([1-9][0-9]{0,3})?)?|(13[0-9]{0,9})|(15(9[0-9]{0,8})?)|(10([1-9][0-9]{0,8})?)|(1[035]{0,1}))?";
	return dumpRegExp(tRe);
}
function dumpSFZ(){
	var tRe="[1-9][0-9]{0,17}[xX]{0,1}";
	return dumpRegExp(tRe);
}
function dumpEmail(){
	var tRe="[A-Za-z0-9_]+(@([A-Za-z0-9_]+\.?)*)?";
	return dumpRegExp(tRe);
}
//数字和字母
function dumpYZM(len){
	var tRe="([A-Za-z0-9]{0,"+len+"})";	
	return dumpRegExp(tRe);
}
//数字和字母和下划线和中线
function dumpSTRED(len){
	var tRe="([A-Za-z0-9_-]{0,"+len+"})";	
	return dumpRegExp(tRe);
}
String.prototype.trim=function(){
	return this.replace(/(^\s+)|(\s+$)/g,"");
}
function changPic(str,type){
	//var src=event.srcElement.src;
	$(str).each(function(){
		var obj;
		if(type==1){
			var obj=$(this).children();
			obj.mouseover(function(){
		    var src=obj.attr("src");
	        if(src.indexOf(".gif")<0) return;
		     obj.attr("src",src.replace(".gif","_hover.gif"));
	          	}).mouseout(function(){
				var src=obj.attr("src");
				if(src.indexOf("_hover.gif")<0) return;
				obj.attr("src",src.replace("_hover.gif",".gif"));
			});
			}
		  
		else if(type==2){
			var obj=$(this);
			obj.mouseover(function(){
				 var src=obj.css("background");
				 if(src.indexOf(".gif")<0) return;
				 obj.css("background",src.replace(".gif","_hover.gif"));
					}).mouseout(function(){
						var src=obj.css("background");
						if(src.indexOf("_hover.gif")<0) return;
						obj.css("background",src.replace("_hover.gif",".gif"));
				});
			}
		});
	
	}
//通用输入校验
function jQueryIsNotNull(){
	var viF = false;
	$.each($('input,select'), function(i, n){  
		     var temp = $(n).parent().prev().text();
			 if(temp.indexOf("*")!= -1){
				var name = temp.substring(0,temp.length-2);
				if($.trim($(n).val()) == "") {
						alert("提示："+name+"不能为空");
						$(n).focus();
						viF = true;
						return false;
				}
			 }
	});
	return viF;
}
function getIsEdit(type,sblx,glid,spjlid,src){
	var info= new AjaxProxy();
	info.addParm("1",spjlid);
	info.invoke("YSP_WYCL_ZLHDJTJYSP.PW_YSP_AND_SP_ZT",false);
	var C_DQZT=info.getString("P_RESULT",1,'C_DQZT');
	var C_YSPZT=info.getString("P_RESULT",1,'C_YSPZT');
	var C_YSPJG=info.getString("P_RESULT",1,'C_YSPJG');
	var ret='1';
	if(type=='1'||type=='2'){
		if(sblx=='1'){
			if(src=='xxlr.jsp'){
				if(C_DQZT != '1'){
						$("table input,select,textarea").each(function(i,n){
								$(n).attr("disabled","disabled")
						});
						ret='0';
						$("#btn_addZxm").hide();
					}
				
				}
			if(src=='zlhd.jsp'){
				if((C_YSPZT=='4'&&C_YSPJG=='1')||C_YSPZT=='2'||C_YSPZT=='1'||C_DQZT != '1'){
					$("table input,select,textarea").each(function(i,n){
							$(n).attr("disabled","disabled");
							});
							infoGrid.setEditable(false);
							ret='0';
					
					}
			}
			if(src=='prt.jsp'){
				if((C_YSPZT=='4'&&C_YSPJG=='1')||C_YSPZT=='2'||C_YSPZT=='1'||C_DQZT != '1'){
					
							ret='0';
					
					}
				
			}
		
		}
		if(sblx=='3'){
			if(src=='xxlr.jsp'){
				if(!((C_YSPZT == '4'&&C_YSPJG=='2')||C_YSPZT=='0')){
					$("table input,select,textarea").each(function(i,n){
								$(n).attr("disabled","disabled")
						});
						ret='0';
						tGrid.setEditable(false);
					}
				
				}
			if(src=='zlhd.jsp'){
				if(!((C_YSPZT == '4'&&C_YSPJG=='2')||C_YSPZT=='0')){
						infoGrid.setEditable(false);
						ret='0';
			
					}
				}
		
	       }
	}
	
		/*
	else if(type=='1'){
			if(sblx=='1'){
				if(src=='xxlr.jsp'){
					if(zt!='1'){
						$("table input,select,textarea").each(function(i,n){
							$(n).attr("disabled","disabled")
							});
							ret='0';
							$("#btn_addZxm").hide();
						
						}
					}
				else if(src=='zlhd.jsp'){
					
					var infoAjax= new AjaxProxy();
					infoAjax.addParm("1",'1');
					infoAjax.addParm("2",sblx);
					infoAjax.addParm("3",spjlid);
					infoAjax.invoke("YSP_WYCL_ZLHDJTJYSP.PW_GET_SPZT",false);
					var zt=infoAjax.getString("PC_STATUS");
					if(zt!='1'){
						$("table input,select,textarea").each(function(i,n){
							$(n).attr("disabled","disabled");
							});
							infoGrid.setEditable(false);
							ret='0';
						}
                  
				 
						
				 
					}else if(src=='prt.jsp'){
					var infoAjax= new AjaxProxy();
					infoAjax.addParm("1",'1');
					infoAjax.addParm("2",sblx);
					infoAjax.addParm("3",spjlid);
					infoAjax.invoke("YSP_WYCL_ZLHDJTJYSP.PW_GET_SPZT",false);
					var zt=infoAjax.getString("PC_STATUS");
					if(zt!='1'){
						$("table input,select,textarea").each(function(i,n){
							$(n).attr("disabled","disabled");
							});
							ret='0';
						}
						}
					
				
				}
			
		}else if(type=='2'){
			if(sblx=='1'){
				if(src=='xxlr.jsp'){
					var v_info=new AjaxProxy();
					v_info.addParm("1",glid);
					v_info.addParm("2","1");
					v_info.invoke("YSP_WYCL_ZLHDJTJYSP.PW_SJWJSC_JBXX",false);
					var v_zt=v_info.getString("P_RESULT",1,"C_YSPZT");
					var v_jg=v_info.getString("P_RESULT",1,"C_YSPJG")
					if(!(v_zt=='3'||(v_zt=='4'&&v_jg=='2')||v_zt=='1')){
						$("table input,select,textarea").each(function(i,n){
								$(n).attr("disabled","disabled");
								});
						$("#btn_addZxm").hide();
					}
					
					
					}
				else if(src=='zlhd.jsp'){
					if(!(zt=='3'||(zt=='4'&&jg=='2')||zt=='1')){
						$("table input,select,textarea").each(function(i,n){
							$(n).attr("disabled","disabled");
							});
							infoGrid.setEditable(false);
                             ret='0';
						
						}
					}
				
				
				}else if(sblx=='2'){
					
					}else if(sblx=='3'){
						if(src=='xxlr.jsp'){
						 
							if(!(zt=='0'||zt=='3'||(zt=='4'&&jg=='2')||zt=='1')){
								$("table input,select,textarea").each(function(i,n){
									$(n).attr("disabled","disabled")
									});
									ret='0';
									tGrid.setEditable(false);
							}
						 
					     }
						 else if(src=='zlhd.jsp'){
							 if(!(zt=='0'||zt=='3'||(zt=='4'&&jg=='2')||zt=='1')){
								$("table input,select,textarea").each(function(i,n){
									$(n).attr("disabled","disabled");
									});
									infoGrid.setEditable(false);
									ret='0';
						
						          }
							 }
						
						}
			}
			
			alert("ret:"+ret);
			*/
			return ret;
	}