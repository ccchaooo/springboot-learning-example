
if( !window.cdmcs ) cdmcs={};
if( !window.cdmcs.Form) window.cdmcs.Form= {};

(function(){
	var IF=function(){

	}
	cdmcs.Form.InputFilter=IF
	window.InputFilter=IF;
	var ifp=IF.prototype;

	InputFilter.restrict=function(oInput, sType, oArg){

		sType=sType.toLowerCase();
		typeIn(oInput);
		var shieldRegex;
		oInput.len = oArg.len * 1;
		oInput.precision = oArg.precision * 1;
		oInput.sign = oArg.sign;
		oInput.capslk = oArg.capslk;
		oInput.space = oArg.space;
		oInput.underline = oArg.underline;
		oInput.plus = oArg.plus;
		oInput.minus = oArg.minus;
		oInput.point = oArg.point;
		oInput.blurfun = oArg.blurfun, 
		oInput.overcallfun = oArg.overfun;
		oInput.autochg18 = oArg.autochg18;
		oInput.CheckResult = "0";     // 校验数据结果: 0 - 无数据、1 - 正确、2 - 错误
		oInput.CheckMsg = "";         // 校验数据错误信息
		oInput.Xb = "";               // 从身份证中取得的性别
		oInput.Csrq = "";             // 从身份证中取得的出生日期
		
		oInput.CheckMsg = "";
		switch(sType){
			case 'str':
				oInput.DataFilterType="str";
				break;
			case 'int':
				//oInput.shieldRegex=[ /[^$]-/g	, /[^0-9\-]/g	];
				//oInput.style.imeMode="disabled";
				oInput.DataFilterType=sType;
				break;
			case 'number':
				//oInput.style.imeMode="disabled";
				oInput.DataFilterType=sType;
				break;
			case 'numstr':
				//oInput.style.imeMode="inactive";
				oInput.DataFilterType=sType;
				break;
			case 'sfzhm':
				//oInput.style.imeMode="disabled";
				oInput.DataFilterType=sType;
				break;
			case 'zzjgdm':
				//oInput.style.imeMode="disabled";
				oInput.DataFilterType=sType;
				break;
				
		}
		if(typeof oArg!="undefined" && typeof oArg.onKeyValidate=="function")
		{
			oInput.onKeyValidate=oArg.onKeyValidate;
		}
	}
	
	var typeIn=function(oInput){
		addEvent(oInput,"keydown",inputKeyDown);
		addEvent(oInput,"keypress",inputKeyPress);
		addEvent(oInput,"keyup", inputKeyUp);
		//addEvent(oInput,"change",inputChange);
		addEvent(oInput,"blur",inputBlur);
		//addEvent(oInput,"input",inputChange);
		addEvent(oInput,"paste",paste);
	}
	
	var paste=function(evt){
		evt=evt||window.event;
		var src=evt.srcElement||evt.target;
		if(src.DataFilterType != 'str'){
			var sValue=window.clipboardData.getData("Text");
			event.srcElement.value=sValue;
			event.srcElement.blur();
			StopEvent(event);
		}
	};
	
	var addEvent = function(el,name,handler){
		if(el.addEventListener)
		{
			return el.addEventListener(name, handler, false);
		}
		else if(el.attachEvent)
		{
			return el.attachEvent("on"+name, handler);

		}
	};
	
	var inputBlur = function(evt){
		evt=evt||window.event;
		var src=evt.srcElement||evt.target;
		if(src.disabled || src.readOnly)return;
		inputChange(evt);
		if(typeof(src.blurfun) == "string"){
			if(src.blurfun.length > 0)
				eval(src.blurfun);
		}
	};

	
	var inputKeyPress=function(evt){
		evt=evt||window.event;
		var src=evt.srcElement||evt.target;
		if(src.disabled || src.readOnly)return;
		var k=evt.keyCode||evt.which||evt.charCode;
		if((k>7&&k<14)||(k>31&&k<47&&k!=32&&k!=46&&k!=45&&k!=43)){
			return;
		}
		
		if(k!=0)
		{
			var c=String.fromCharCode(k);
			var pos=GetSelectionStart(src);
			if(src.DataFilterType != 'str'){
				if(typeof IF["val_"+src.DataFilterType] =="function")
				{
					var ret=IF["val_"+src.DataFilterType](c,pos,evt,src);
					if(typeof ret!="undefined" && !ret)
					{
						StopEvent(evt);
						return;
					}
				}
				if(typeof src.onKeyValidate =="function")
				{
					var ret=true;
					try{
						ret=src.onKeyValidate(c,pos,evt);
					}catch(err){
						throw new Error((src.id||src.name)+".onKeyValidate()发生错误："+err.description);
					};
					if(typeof ret!="undefined" && !ret){
						StopEvent(evt);
						return;
					}
						
				}
			}
		}

	};
	
	var inputKeyDown = function(evt){
		evt=evt||window.event;
		var src=evt.srcElement||evt.target;
		if(src.disabled || src.readOnly)return;
		var k=evt.keyCode||evt.which||evt.charCode;
		if((k>7&&k<14)||(k>31&&k<47&&k!=32&&k!=46&&k!=45&&k!=43)){
			return;
		}
		if(k!=0)
		{
			var c=String.fromCharCode(k);
			var pos=GetSelectionStart(src);
			if(src.DataFilterType == 'str'){
				if(typeof IF["val_"+src.DataFilterType] =="function")
				{
					var ret=IF["val_"+src.DataFilterType](c,pos,evt,src);
					if(typeof ret!="undefined" && !ret)
					{
						StopEvent(evt);
						return;
					}
				}
				if(typeof src.onKeyValidate =="function")
				{
					var ret=true;
					try{
						ret=src.onKeyValidate(c,pos,evt);
					}catch(err){
						throw new Error((src.id||src.name)+".onKeyValidate()发生错误："+err.description);
					};
					if(typeof ret!="undefined" && !ret)
						StopEvent(evt);
						
				}
			}
		}
	};
	
	var inputKeyUp = function(evt){
		evt=evt||window.event;
		var src=evt.srcElement||evt.target;
		if(src.disabled || src.readOnly)return;
		var k=evt.keyCode||evt.which||evt.charCode;
		if((k>7&&k<14)||(k>31&&k<47&&k!=32&&k!=46&&k!=45&&k!=43)){
			return;
		}
		switch(src.DataFilterType){
			case 'str':
				if(src.capslk == "0"){
					src.value = src.value.toLowerCase();
				}else if(src.capslk == "1"){
					src.value = src.value.toUpperCase();
				}
				inputChange(evt);
				if(k == 13 || (src.len * 1 > 0 && src.value.length == src.len * 1)){
					inputChange(evt);
					if(typeof(src.overcallfun) == "string"){
						if(src.overcallfun.length > 0)
							eval(src.overcallfun);
					}
				}
				break;
				
			case 'int':
				inputChange(evt);
				if(k == 13 || (src.len * 1 > 0 && src.value.length == src.len * 1)){
					inputChange(evt);
					if(typeof(src.overcallfun) == "string"){
						if(src.overcallfun.length > 0)
							eval(src.overcallfun);
					}
				}
				break;
				
			case 'number':
				inputChange(evt);
				if(k == 13 || (src.len * 1 > 0 && src.value.length == src.len * 1)){
					inputChange(evt);
					if(typeof(src.overcallfun) == "string"){
						if(src.overcallfun.length > 0)
							eval(src.overcallfun);
					}
				}
				break;
				
			case 'numstr':
				if(src.space == "0"){
					src.value=src.value.replace(/[^0-9a-zA-Z\+\-\_\.]/g,"");
				}else{
					src.value=src.value.replace(/[^ 0-9a-zA-Z\+\-\_\.]/g,"");
				}
				if(src.capslk == "0"){
					src.value = src.value.toLowerCase();
				}else if(src.capslk == "1"){
					src.value = src.value.toUpperCase();
				}
				if(k == 13 || (src.len * 1 > 0 && src.value.length == src.len * 1)){
					inputChange(evt);
					if(typeof(src.overcallfun) == "string"){
						if(src.overcallfun.length > 0)
							eval(src.overcallfun);
					}
				}
				break;
				
			case 'sfzhm':
				src.value=src.value.replace(/[^0-9xX]/g,"");
				src.value = src.value.toUpperCase();
				
				if(k == 13 || src.value.length == 18){
					if(k == 13 && src.value.length == 15){
						if(!StringUtil.isNull(src.autochg18) && src.autochg18 == "true"){
							var sfz18 = IdVerify.changeSfzh15To18(src.value);
							src.value = sfz18;
						}
					}
					inputChange(evt);
					if(typeof(src.overcallfun) == "string"){
						if(src.overcallfun.length > 0)
							eval(src.overcallfun);
					}
				}
				break;
				
			case 'zzjgdm':
				src.value=src.value.replace(/[^0-9A-Za-z]/g,"");
				src.value = src.value.toUpperCase();
				
				if(k == 13 || src.value.length == 9){
					inputChange(evt);
					if(typeof(src.overcallfun) == "string"){
						if(src.overcallfun.length > 0)
							eval(src.overcallfun);
					}
				}
				break;
		}
	};


	function inputChange(evt){
		evt=evt||window.event;
		var src=evt.srcElement||evt.target;
		if(src.disabled || src.readOnly)return;
		var v=src.value;
		var ret=false;
		// 根据类型验证数据
		switch(src.DataFilterType){
			case "str":
				if(src.capslk == "0"){
					src.value = src.value.toLowerCase();
				}else if(src.capslk == "1"){
					src.value = src.value.toUpperCase();
				}
				if(src.space == "0"){
					if(/[ ]/g.test(src.value)){
						src.value = src.value.replace(/[ ]/g,"");
					}
				}
				if(src.len * 1 > 0){
					var len = 0;
					for (var i = 0; i < v.length; i++) {
						if (v.charCodeAt(i) > 255) 
							len += 2;
				        else 
				        	len ++;
						if(len == src.len * 1){
							i = i + 1;
							break;
						}
						if(len > src.len * 1){
							break;
						}
				    }
					if(i < v.length){
						src.value = v.substr(0, i);
					}
				}
				break;
			case 'int':
				if(src.sign == '+'){
					if(/[^0-9]/g.test(src.value)){
						src.value=src.value.replace(/[^0-9]/g,"");
					}
				}else{
					if(/[^0-9\-]/g.test(src.value)){
						src.value=src.value.replace(/[^0-9\-]/g,"");
					}
					if(/[^$]-/g.test(src.value)){
						src.value=src.value.replace(/[^$]-/g,"");
					}
				}
				if(src.value != "" && src.value.length > 0){
					src.value = src.value * 1;
					if(src.len * 1 > 0){
						var v = src.value;
						src.value = v.substr(0, src.len * 1);
					}
				}
				break;
			case 'number':
				if(src.sign == '+'){
					src.value=src.value.replace(/[^0-9\.]/g,"");
				}else{
					src.value=src.value.replace(/[^0-9\-\.]/g,"");
					src.value=src.value.replace(/[^$]-/g,"");
				}
				
				if(src.value != "" && src.value.length > 0){
					if(src.precision * 1 > 0){
						var v = src.value;
						var plen = v.indexOf(".");
						if(plen >= 0){
							var pv = v.substr(plen + 1);
							var mv = v.substr(0, plen);
							pv = pv.replace(/[^0-9]/g,"");
							pv = pv.substr(0, src.precision);
							src.value = (mv + "." + pv) * 1;
						}
					}
					src.value = src.value * 1;
					if(src.len * 1 > 0){
						var v = src.value;
						src.value = v.substr(0, src.len * 1);
					}
				}
				break;
			case 'numstr':
				if(src.capslk == "0"){
					src.value = src.value.toLowerCase();
				}else if(src.capslk == "1"){
					src.value = src.value.toUpperCase();
				}
				if(src.space == "0"){
					src.value = src.value.replace(/[ ]/g,"");
					src.value=src.value.replace(/[^0-9a-zA-Z\+\-\_\.]/g,"");
				}else{
					src.value=src.value.replace(/[^ 0-9a-zA-Z\+\-\_\.]/g,"");
				}
				if(src.value != "" && src.value.length > 0){
					if(src.len * 1 > 0 && src.value.length > src.len *1){
						src.value = src.value.substr(0, src.len * 1);
					}
				}
				break;
				
			case 'sfzhm':
				if(src.value.length == 15 || src.value.length == 18){
					// 校验身份证是否正确
					if(!IdVerify.sfzhVerify(src.value, src)){
						src.value = "";
					}
				}else{
					if(StringUtil.isNull(src.value) || src.value.length == 0){
						src.CheckResult = "0";
						src.CheckMsg = "没有居民身份证号数据!";
					}else{
						src.CheckResult = "2";
						src.CheckMsg = "居民身份证号码位数不正确!";
					}
					src.Xb = "";
					src.Csrq = "";
					//src.value = "";
				}
				break;
				
			case 'zzjgdm':
				if(src.value.length == 9){
					// 校验身份证是否正确
					if(!IdVerify.zzjgdmVerify(src.value, src)){
						src.value = "";
					}
				}else{
					if(StringUtil.isNull(src.value) || src.value.length == 0){
						src.CheckResult = "0";
						src.CheckMsg = "没有组织机构代码证号数据!";
					}else{
						src.CheckResult = "2";
						src.CheckMsg = "组织机构代码证号位数不正确!";
					}
					//src.value = "";
				}
				break;

		}

		if(typeof src.shieldRegex=="array" || src.shieldRegex instanceof Array)
		{
			var regs=src.shieldRegex;
			for(var i=regs.length-1;i>-1;i--)
			{
				src.value=src.value.replace(regs[i],"");
			}
		}
		
		if(typeof src.onChangedValidate =="function" ||src.onChangedValidate instanceof Function)
		{
			ret=src.onChangedValidate(evt,src);
		}
	}




	var StopEvent=function(event){
		if(document.all){
			event.returnValue=false;
			
		}else if(event.preventDefault){
			event.preventDefault();
			
		}
	}
	var GetSelectionStart=function(oInput){
		if(oInput.createTextRange){
			var s=document.selection.createRange().duplicate();
			s.moveEnd("character",oInput.value.length);
			pos=oInput.value.lastIndexOf(s.text);
			if(s.text=="")pos=oInput.value.length;
			return pos;
			
		}else {
			return oInput.selectionStart;
			
		}
	};


	/**
	*取得选区结束位置
	*/
	var GetSelectionEnd=function(oInput){
		if(oInput.createTextRange){
			var s=document.selection.createRange().duplicate();
			s.moveStart("character",-oInput.value.length);
			pos=s.text.length;
			return pos;
			
		}else {
			return oInput.selectionEnd;
			
		}
	};

	/**
	*设置光标位置
	*/
	var PutCaretPos=function(oInput,pos){
		if(pos<=0){
			pos=0;
			
		};
		if(pos>=oInput.value.length){
			pos=oInput.value.length
		};
		if(pos!=-1){
			if(oInput.createTextRange){
				var TR=oInput.createTextRange();
				TR.moveStart("character",pos);
				//TR.moveEnd('character',pos+1);
				//TR.select();
				
			}else if(oInput.setSelectionRange){
				oInput.focus();
				oInput.setSelectionRange(pos,pos);
				
			}
		}else {
			oInput.blur();
			
		}
	};
	
	/*
	 * 对不同类型的处理
	 */
	IF.val_str=function(c, pos, evt, src){
		if(src.space == "0" && c== " "){
			return false;
		}
		if(src.len > 0){
			var len = 0;
			var data = src.value;
		    for (var i = 0; i < data.length; i++) {
		        if (data.charCodeAt(i) > 255) 
		        	len += 2; 
		        else 
		        	len ++;
		    }
		    if(c.charCodeAt(i) > 255)
		    	len +=2;
		    else
		    	len ++;
		    if(len > src.len){
		    	return false;
		    }
		}
	};
	
	IF.val_int=function(c,pos,evt,src){
		if(!/[0-9\-]/.test(c) || (c=="-" && pos!=0))
		{
			return false;
		}
		var v = src.value;
		if(src.sign == '-'){
			if(pos == 0 && c != '-'){
				return false;
			}
			if(pos == 1){
				if(v.substr(0, 1) == '0'){
					return false;
				}
				if(v.substr(0, 1) == '-' && c == '0'){
					return false;
				}
			}
		}else if(src.sign == '+'){
			if(c == '-'){
				return false;
			}
			if(pos == 0 && c == '-'){
				return false;
			}
			if(pos >= 1){
				if(v.substr(0, 1) == '0'){
					return false;
				}
				if(v.substr(0, 1) == '-'){
					return false;
				}
			}
		}else{
			if(pos == 1){
				if(v.substr(0, 1) == '0'){
					return false;
				}
				if(v.substr(0, 1) == '-' && c == '0'){
					return false;
				}
			}
		}
		if(src.len * 1 > 0){
			if((v.length + 1) > src.len * 1){
				return false;
			}
		}
	};
	
	
	IF.val_number=function(c,pos,evt,src){
		if(!/[0-9\-\.]/.test(c) || (c=="." && src.value.indexOf(".")!=-1) || (c=="-" && pos!=0))
		{
			return false;
		}
		if(src.precision == "0" && c == "."){
			return false;
		}
		var v = src.value;
		if(src.sign == '-'){
			if(pos == 0 && c != '-'){
				return false;
			}
			if(pos == 1){
				if(v.substr(0, 1) == '0'){
					return false;
				}
				if(v.substr(0, 1) == '-' && c == '.'){
					return false;
				}
			}
			if(pos == 2){
				if(v.substr(0, 1) == '-' && v.substr(1, 1) == '0' && c != '.'){
					return false;
				}
			}
		}else if(src.sign == '+'){
			if(pos == 0 && (c == '-' || c == '.')){
				return false;
			}
			if(pos == 1){
				if(v.substr(0, 1) == '0' && c != '.'){
					return false;
				}
			}
		}else{
			if(pos == 0 && c == '.'){
				return false;
			}
			if(pos == 1){
				if(v.substr(0, 1) == '0' && c != '.'){
					return false;
				}
				if(v.substr(0, 1) == '-' && c == '.'){
					return false;
				}
			}
			if(pos == 2){
				if(v.substr(0, 1) == '-' && v.substr(1, 1) == '0' && c != '.'){
					return false;
				}
			}
		}
		if(src.len * 1 > 0){
			if((v.length + 1) > src.len * 1){
				return false;
			}
		}
		// 判断小数位数
		var plen = v.indexOf(".");
		if(plen >= 0){
			var pv = v.substr(plen + 1);
			if(pv.length >= src.precision){
				return false;
			}
		}
	};
	
	IF.val_numstr=function(c,pos,evt,src){
		if(src.underline == "0"){
			if(c == "_"){
				return false;
			}
		}
		if(src.plus == "0"){
			if(c == "+"){
				return false;
			}
		}
		if(src.minus == "0"){
			if(c == "-"){
				return false;
			}
		}
		if(src.point == "0"){
			if(c == "."){
				return false;
			}
		}
		if(src.space == "0"){
			if(!/[0-9a-zA-Z\+\-\_\.]/.test(c))
			{
				return false;
			}
		}else{
			if(!/[ 0-9a-zA-Z\+\-\_\.]/.test(c))
			{
				return false;
			}
		}
		if(src.len * 1 > 0){
			if((src.length) >= src.len * 1){
				return false;
			}
		}
		
	};
	
	IF.val_sfzhm=function(c,pos,evt,src){
		if(!/[0-9xX]/.test(c)){
			return false;
		}
		if((c == 'x' || c == 'X') && pos != 17){
			return false;
		}
		/*if(pos == 17){
			if(c.toUpperCase() != IdVerify.getSfzhmVerifyBit(src.value)){
				return false;
			}
		}*/
		if((src.value.length) >= 18){
			return false;
		}
	};
	
	IF.val_zzjgdm=function(c,pos,evt,src){
		if(!/[0-9a-zA-Z]/.test(c)){
			return false;
		}
		/*if(pos == 17){
			if(c.toUpperCase() != IdVerify.getSfzhmVerifyBit(src.value)){
				return false;
			}
		}*/
		if((src.value.length) >= 9){
			return false;
		}
	};
	
	IF.val_float=function(c,pos,evt,src){
		if(!/[0-9\-\.]/.test(c) || (c=="." && src.value.indexOf(".")!=-1) || (c=="-" && pos!=0))
		{
			alert(src.value.indexOf("."))
			return false;	
		}
	}
	IF.val_numberAlpha=function(c,pos,evt){
		if(!/[0-9a-z]/.test(c))
		{
			return false;
		}
	}
	
	
 }
)();