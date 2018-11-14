
if( !window.cdmcs ) cdmcs={};
if( !window.cdmcs.Form) window.cdmcs.Form= {};

(function(){
	function _E(o,se,sf){
		if(o.addEventListener)
			o.addEventListener(se,sf,false);
		else
			o.attachEvent("on"+se,sf);
	}

	var InputMask=function(el,oWin){
		var T=this;
		T._entity=null;

		T.mask="";/*掩码,*/
		T.maskAlpha="";		//字符掩码(掩码字符部分的表示字符)
		T.maskNumeric="";	//数字掩码(掩码数字部分的表示字符)
		T.maskAlphaNumeric="";	//
		T.maskDisplay="";	//掩码中的 maskAlpha、maskNumeric、maskAlphaNumeric 将用maskDisplay来显示,
		T.regexPattern="";	//

		T.onRegexMatch=new Function("");
		T.onRegexNoMatch=new Function("");
		T.onWrongKeyPressed=new Function();
		T.window=oWin||window;
		this.init(el);
		InputMask.all.push(this);
	};



	InputMask.all=[];
	cdmcs.Form.InputMask=InputMask;
	window.InputMask=InputMask;
	InputMask.prototype.getEntity=function(){
		return this._entity;
	}

	InputMask.prototype.checkPos=function(/*{value:x,position:pos,"char":ks}*/ arg){
		return this.onCheckPos(arg);
	};
	/*
	 *键入验证事件
	*/
	InputMask.prototype.onCheckPos=function(/*{value:x,position:pos,"char":ks}*/ arg){return true};



	InputMask.prototype.init=function(el){
		var e;
		if(typeof el=="string")
			e=document.getElementById(el);
		else
			e=el;
		var e=e||document.createElement("input");
		e.type="text";
		this._entity=e;
		var T=this;
		e.style.imeMode="disabled";
		_E(e,"paste",function(evt){ InputMask._OnPaste.call(T,evt||T.window.event);});
		_E(e,"cut",function(evt){InputMask._OnCut.call(T,evt||T.window.event);})
		_E(e,"input",function(evt){InputMask._OnInput.call(T,evt||T.window.event);})
		_E(e,"click",function(evt){InputMask._OnClick.call(T,evt||T.window.event);})
		_E(e,"keypress",function(evt){InputMask._KeyPress.call(T,evt||T.window.event);})
		_E(e,"keydown",function(evt){InputMask._KeyDown.call(T,evt||T.window.event);});
		_E(e,"focus",function(evt){InputMask._GotFocus.call(T,evt||T.window.event);});
		_E(e,"blur",function(evt){InputMask._LostFocus.call(T,evt||T.window.event);})
		//_E(e,"dblclick",function(){this.select();});
		_E(e,"drag",function(){return false});
		_E(e,"mouse",function(){return false});


		e=void(0);
		
	}

	InputMask.prototype.setMask=function(sMask){
		this._entity.value=sMask;
		this.mask=sMask;
	}

	/**
	*校验input
	*/
	InputMask.prototype.ValidateContent=function(){
		var T=this;
		var oInput=T._entity;
		var sRet="";
		var sValue=oInput.value;
		for(i=0;i<T.mask.length;i++){
			if(T.mask.substring(i,(i+1))==T.maskAlpha){
				while(sValue.length>0&&(!((sValue.substring(0,1).charCodeAt(0)>=65&&sValue.substring(0,1).charCodeAt(0)<=90)||(sValue.substring(0,1).charCodeAt(0)>=97&&sValue.substring(0,1).charCodeAt(0)<=122)))){
					sValue=sValue.substring(1);
					
				};
				if(sValue.length>0){
					sRet+=sValue.substring(0,1);
					sValue=sValue.substring(1);
					
				}else {
					sRet+=T.maskDisplay;
					
				}
			}else if(T.mask.substring(i,(i+1))==T.maskNumeric){
				while(sValue.length>0&&(!(sValue.substring(0,1).charCodeAt(0)>=48&&sValue.substring(0,1).charCodeAt(0)<=57))){
					sValue=sValue.substring(1);
					
				};
				if(sValue.length>0){
					sRet+=sValue.substring(0,1);
					sValue=sValue.substring(1);
					
				}else {
					sRet+=T.maskDisplay;
					
				}
			}else if(T.mask.substring(i,(i+1))==T.maskAlphaNumeric){
				while(sValue.length>0&&(!((sValue.substring(0,1).charCodeAt(0)>=65&&sValue.substring(0,1).charCodeAt(0)<=90)||(sValue.substring(0,1).charCodeAt(0)>=97&&sValue.substring(0,1).charCodeAt(0)<=122)||(sValue.substring(0,1).charCodeAt(0)>=48&&sValue.substring(0,1).charCodeAt(0)<=57)))){
					sValue=sValue.substring(1);
					
				};
				if(sValue.length>0){
					sRet+=sValue.substring(0,1);
					sValue=sValue.substring(1);
					
				}else {
					sRet+=T.maskDisplay;
					
				}
			}else {
				sRet+=T.mask.substring(i,(i+1));
				
			}
		};
		oInput.value=sRet;
		
	};

	/**
	*校验指定位置
	*/
	InputMask.prototype.ValidatePos=function(pos){
		this.PutCaretPos(pos);
		
	};



	/**
	*装入数据
	*/
	InputMask.prototype.PlaceInMask=function(sValue){
		var T=this;
		var oInput=this._entity;
		var sRet="";
		if(sValue.length>0){
			var _m=T.GetSelectionStart();
			sRet+=oInput.value.substring(0,_m);
			for(i=_m;i<T.mask.length;i++){
				if(T.mask.substring(i,(i+1))==T.maskAlpha){
					while(sValue.length>0&&(!((sValue.substring(0,1).charCodeAt(0)>=65&&sValue.substring(0,1).charCodeAt(0)<=90)||(sValue.substring(0,1).charCodeAt(0)>=97&&sValue.substring(0,1).charCodeAt(0)<=122)))){
						sValue=sValue.substring(1);
						
					};
					if(sValue.length>0){
						sRet+=sValue.substring(0,1);
						sValue=sValue.substring(1);
						
					}else {
						break;
						
					}
				}else if(T.mask.substring(i,(i+1))==T.maskNumeric){
					while(sValue.length>0&&(!(sValue.substring(0,1).charCodeAt(0)>=48&&sValue.substring(0,1).charCodeAt(0)<=57))){
						sValue=sValue.substring(1);
						
					};
					if(sValue.length>0){
						sRet+=sValue.substring(0,1);
						sValue=sValue.substring(1);
						
					}else {
						break;
						
					}
				}else if(T.mask.substring(i,(i+1))==T.maskAlphaNumeric){
					while(sValue.length>0&&(!((sValue.substring(0,1).charCodeAt(0)>=65&&sValue.substring(0,1).charCodeAt(0)<=90)||(sValue.substring(0,1).charCodeAt(0)>=97&&sValue.substring(0,1).charCodeAt(0)<=122)||(sValue.substring(0,1).charCodeAt(0)>=48&&sValue.substring(0,1).charCodeAt(0)<=57)))){
						sValue=sValue.substring(1);
						
					};
					if(sValue.length>0){
						sRet+=sValue.substring(0,1);
						sValue=sValue.substring(1);
						
					}else {
						break;
						
					}
				}else {
					sRet+=T.mask.substring(i,(i+1));
					
				}
			};
			sRet+=oInput.value.substring(i,T.mask.length);
			
		};
		oInput.value=sRet;
		return i;
		
	};


	InputMask.prototype.StopEvent=function(event){
		if(document.all){
			event.returnValue=false;
			
		}else if(event.preventDefault){
			event.preventDefault();
			
		}
	};
	InputMask.prototype.StopEventPropagation=function(event){
		event.cancelBubble=true;
		if(event.stopPropagation){
			event.stopPropagation();
			
		}
	};

	InputMask.prototype.GetKeyCode=function(event){
		return (event.keyCode?event.keyCode:event.which?event.which:event.charCode);
		
	};
	InputMask.prototype.KeyDelete=function(){
		var selStart=this.GetSelectionStart();
		var selEnd=this.GetSelectionEnd();
		if(selStart==0&&selEnd==this._entity.value.length){
			this._entity.value="";
			InputMask._GotFocus.call(this);
			
		}else {
			this.UpdateChar(selStart,this.maskDisplay);
			this.PutCaretPos(selStart+1);
			
		}
	};
	InputMask.prototype.KeyBackspace=function(){
		var selStart=this.GetSelectionStart();
		var selEnd=this.GetSelectionEnd();
		if(selStart==0&&selEnd==this._entity.value.length){
			this._entity.value="";
			InputMask._GotFocus.call(this);
			
		}else {
			this.UpdateChar(selStart,this.maskDisplay);
			pos=this.GetValidPos(selStart-1,true);
			this.PutCaretPos(pos);
			
		}
	};
	InputMask.prototype.PushPosLeft=function(){
		var k=this.GetSelectionStart();
		if((k-1)>=0){
			this.PutCaretPos((k-1),true);
			
		}
	};
	InputMask.prototype.PushPosRight=function(){
		var k=this.GetSelectionStart();
		if((k+1)<this._entity.value.length){
			this.PutCaretPos((k+1));
			
		}
	};
	InputMask.prototype.PushPosBegin=function(){
		this.PutCaretPos(0);
		
	};
	InputMask.prototype.PushPosEnd=function(){
		this.PutCaretPos(this.mask.length);
		
	};
	/**
	*替换指定位置的字符
	*/
	InputMask.prototype.UpdateChar=function(pos,ks){
		var T=this;
		var oInput=T._entity;
		var x=oInput.value;



		var b=x.substring(0,pos);
		var a=x.substring(pos+1,x.length);
		oInput.value=b+ks+a;
		
	};

	/**
	*设置光标位置
	*/
	InputMask.prototype.PutCaretPos=function(pos,index){
		var T=this;
		var oInput=T._entity;
		if(oInput.readOnly)
		{
			
			return false;
		}
		if(pos<=0){
			pos=0;
			
		};
		if(pos>=oInput.value.length-1){
			pos=oInput.value.length-1
		};
		pos=this.GetValidPos(pos,index);
		if(pos!=-1){
			if(oInput.createTextRange){
				var TR=oInput.createTextRange();
				TR.moveStart("character",pos);
				TR.moveEnd('character',pos+1-oInput.value.length);
				TR.select();
				
			}else if(oInput.setSelectionRange){
				oInput.focus();
				oInput.setSelectionRange(pos,pos+1);
				
			}
		}else {
			oInput.blur();
			
		}
	};
	InputMask.prototype.GetValidPos=function(pos,b){
		var T=this;
		var oInput=T._entity;
		if(b==null){
			b=false;
			
		};
		if(this.PosIsValid(pos)){
			return pos;
			
		}else {
			if(b){
				while(pos>=0){
					if(this.PosIsValid(pos)){
						return pos;
						
					};
					pos--;
					
				};
				while(pos<T.mask.length-1){
					if(this.PosIsValid(pos)){
						return pos;
						
					};
					pos++;
					
				}
			}else {
				while(pos<T.mask.length-1){
					if(this.PosIsValid(pos)){
						return pos;
						
					};
					pos++;
					
				};
				while(pos>=0){
					if(this.PosIsValid(pos)){
						return pos;
						
					};
					pos--;
					
				}
			};
			return -1;
			
		}
	};
	InputMask.prototype.PosIsValid=function(pos){
		var T=this;
		var oInput=T._entity;
		var m=T.mask.split("");
		if(m.length>pos){
			if(m[pos]!=null){
				if(m[pos]==T.maskAlpha||m[pos]==T.maskNumeric||m[pos]==T.maskAlphaNumeric){
					;
					
				}else {
					return false;
					
				}
			}else {
				return false;
				
			}
		}else {
			return false;
			
		}

		return true;
	};
	InputMask.prototype.KeyIsValid=function(pos,testChar){
		var T=this;
		var oInput=T._entity;
		var m=this.mask.split("");
		var b=false;
		if(m.length>pos){
			var c=m[pos];
			if(c==this.maskAlpha){
				if((testChar>=65&&testChar<=90)||(testChar>=97&&testChar<=122)){
					b=true;
					
				}else {
					b=false;
					
				}
			}else if(c==this.maskNumeric){
				if(testChar>=48&&testChar<=57){
					b=true;
					
				}else {
					b=false;
					
				}
			}else if(c==this.maskAlphaNumeric){
				if((testChar>=48&&testChar<=57)||(testChar>=65&&testChar<=90)||(testChar>=97&&testChar<=122)){
					b=true;
					
				}else {
					b=false;
					
				}
			}else {
				b=false;
				
			}
		}else {
			b=false;
			
		}
		//外接校验程序校验
		if(b)
		{
			

			if(typeof this.checkPos=="function" || this.checkPos instanceof Function ) 
			{
				var b=this.checkPos({value:oInput.value,position:pos,"char":String.fromCharCode(testChar)});
				
				if(typeof b!="undefined" && !b)
					return false;
			}
			return true;
		}
		return b;
	};
	/**
	*取得选区开始位置
	*/
	InputMask.prototype.GetSelectionStart=function(){
		var T=this;
		var oInput=T._entity;
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
	InputMask.prototype.GetSelectionEnd=function(){
		var T=this;
		var oInput=T._entity;
		if(oInput.createTextRange){
			var s=document.selection.createRange().duplicate();
			s.moveStart("character",-oInput.value.length);
			pos=s.text.length;
			return pos;
			
		}else {
			return oInput.selectionEnd;
			
		}
	};
	InputMask.prototype.GetDisplayMask=function(b){
		var T=this;
		var oInput=T._entity;
		if(b==true){
			var f="";
			var m=T.mask.split("");
			for(mi=0;mi<m.length;mi++){
				if(m[mi]==T.maskAlpha||m[mi]==T.maskNumeric||m[mi]==T.maskAlphaNumeric){
					f+=T.maskDisplay;
					
				}else {
					f+=m[mi];
					
				}
			};
			return f;
			
		}else {
			return T.mask;
			
		}
	}

	/**
	*粘贴
	*/
	InputMask._OnPaste=function(){
		var T=this;
		var sValue=window.clipboardData.getData("Text");
		var pos=T.PlaceInMask(sValue);
		window.setTimeout(function(){T.ValidatePos(pos)},10);
		T.StopEvent(event);
		
	};
	/**
	*剪切
	*/
	InputMask._OnCut=function(){
		var T=this;
		var selStart=T.GetSelectionStart();
		var selEnd=T.GetSelectionEnd();
		if(selStart+selEnd==T._entity.value.length){
			window.clipboardData.setData("Text",T._entity.value);
			T._entity.value="";
			InputMask._GotFocus.call(T);
			
		}else {
			window.clipboardData.setData("Text",T._entity.value.substring(selStart,(selStart+1)));
			T.UpdateChar(selStart,T.maskDisplay);
			T.PutCaretPos(selStart);
			
		};
		this.StopEvent(event);
		
	};

	InputMask._OnInput=function(event){
		
		if(typeof this.onInput=="function")
			this.onInput();
		this.ValidateContent();
		this.PutCaretPos(this.GetSelectionStart());
		
	};

	InputMask._OnClick=function(event){

		if(typeof this.onClick=="function")
			this.onClick();
		if(this.mask!=null&&this.mask.length>0){
			var s=this.GetSelectionStart();
			this.PutCaretPos(s);
			
		};
		this.StopEventPropagation(event);
		
	};
	InputMask._KeyPress=function(event){
		var oInput=event.srcElement||event.target;
		if(oInput.readOnly)
		{
			this.StopEvent(event);
			return false;

		}
		if(typeof this.onKeyPress=="function")
			this.onKePress(event);
		if(this.mask!=null&&this.mask.length>0){
			var kc=this.GetKeyCode(event);
			var ss=this.GetSelectionStart();
			if(kc!=9){
				if(this.KeyIsValid(ss,kc)){
					var ks=String.fromCharCode(kc);
					this.UpdateChar(ss,ks);
					this.PutCaretPos(ss+1);
					
				}else {
					
					if(typeof this.onWrongKeyPressed =="function"){
						this.onWrongKeyPressed();
						
					}
				};
				this.StopEvent(event);
				
			}
		}
	};
	/**
	*按键
	*/
	InputMask._KeyDown=function(event){
		if(typeof this.onKeyDown=="function")
			this.onKeyDown(event);
		if(this.mask!=null&&this.mask.length>0){
			var k=this.GetKeyCode(event);
			if(k==8||(k>=33&&k<=40)||k==46){
				switch(k){
					case 8:this.KeyBackspace();
					break;
					case 33:this.PushPosBegin();
					break;
					case 34:this.PushPosEnd();
					break;
					case 35:this.PushPosEnd();
					break;
					case 36:this.PushPosBegin();
					break;
					case 37:this.PushPosLeft();
					break;
					case 38:this.PushPosLeft();
					break;
					case 39:this.PushPosRight();
					break;
					case 40:this.PushPosRight();
					break;
					case 46:this.KeyDelete();
					break;
					
				};
				this.StopEvent(event);
				
			}
		}
	};
	/**
	*失去焦点
	*/
	InputMask._LostFocus=function(evt){
		if(typeof this.onBlur=="function")
			this.onBlur(evt);
		if(this.mask!=null&&this._entity.value==this.GetDisplayMask(true)){
			this._entity.value="";
			
		}else {
			if(this._entity.value!=null&&this._entity.value.length>0){
				if(this.regexPattern!=null&&this.regexPattern.length>0){
					var re=new RegExp(this.regexPattern);
					if(this._entity.value.match(re)){
						if(typeof this.onRegexMatch=="function"){
							this.onRegexMatch();
							
						}
					}else {
						if(typeof this.onRegexNoMatch=="function"){
							this.onRegexNoMatch();
							
						}
					}
				}
			}
		}
	};
	InputMask._GotFocus=function(evt){
		if(typeof this.onFocus=="function")
			this.onFocus(evt);
		var oInput=this._entity;
		if(this.mask!=null&&this.mask.length>0){
			var _r=this.GetSelectionStart();
			var pos=this.GetValidPos(_r);
			if(pos!=-1){
				if(oInput.value==null||oInput.value.length==0){
					oInput.value=this.GetDisplayMask(true);
					
				};
				this.PutCaretPos(pos);
				
			}else {
				oInput.blur();
				
			}
		}
	};
	InputMask.prototype.dispose=function(){
		var e=this._entity;
		var a=InputMask.all;
		this._entity=void(0);
		for(var i=a.length-1;i>-1;i--)
			if(a[i]==this)
			{	
				a.splice(i,1);
				break;
			}


	}
	function clearInputMask()
	{
		var a=InputMask.all;
		for(var i=a.length-1;i>-1;i--)
		{
			try{
				a[i].dispose();
			}catch(err){window.status=err.description;}
		}
	}


	if(window.addEventListener)
	{
		window.addEventListener("unload",clearInputMask,false);
	}
	else
	{
		window.attachEvent("onunload",clearInputMask);
	}

 }
)();
