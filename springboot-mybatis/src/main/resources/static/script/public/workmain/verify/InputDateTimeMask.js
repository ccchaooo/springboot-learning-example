
if( !window.cdmcs ) cdmcs={};
if( !window.cdmcs.Form) window.cdmcs.Form= {};

(function(){
	//分数用ff表示
	function InputDateTimeMask(el,mask,oWin){
		cdmcs.Form.InputMask.call(this,el,oWin);
		this.dateMask=mask;
		this.mask="yyyy-yy-yy yy:yy";
		this.maskNumeric="y";
		this.regexPattern="";//"[0-9]{4}\-[0-1][0-9]\-[0-3][0-9] [0-2][0-9]\:[0-5][0-9]";
		this.maskDisplay="0";
		init.call(this,mask);
	}
	window.InputDateTimeMask = InputDateTimeMask;
	InputDateTimeMask.$super = InputMask;
	InputDateTimeMask.prototype = new cdmcs.Form.InputMask();
	InputDateTimeMask.prototype.checkPos=function(arg){
		var c=arg["char"];
		var pos=arg.position;
		var value=arg.value;
		var dm=this.dateMask;
		var mc=dm.charAt(pos);
		value=value.substring(0,pos)+c+value.substring(pos+1,value.length);
		var y=parseInt(value.substr(dm.indexOf("y"),4));
		var m=parseInt(value.substr(dm.indexOf("m"),2));
		var d=parseInt(value.substr(dm.indexOf("d"),2));

		var mds=[31/*0月*/,31,/*2月*/ (    ( y%4==0 && y%100!=0 )   || y%400==0?29:28  ) , 31,30,31,30,31,31,30,31,30,31];
		
		switch(mc)
		{
			case "y"://年
				break;
			case "m"://月
				var p=this.dateMask.indexOf("m");
				
				var month=value.substr(p,2);
				if(month>12)
				{
					
					return false;
				}
				if(d>28 && mds[m]<d)//更正天日
				{
					
					d = mds[m];
					this._entity.value= value.substring(0,dm.indexOf("d"))+
							d+value.substring(dm.indexOf("d")+2,value.length);
					
				}
				break;
			case "d":
				var p=this.dateMask.indexOf("d");
				if(d>mds[m])
				{
					if( pos == p && Math.floor(d/10)==Math.floor(mds[m]/10))
					{

						this._entity.value= value.substring(0,dm.indexOf("d"))+
							Math.floor(mds[m]/10) + '0'
							 + value.substring(dm.indexOf("d")+2,value.length );
						break;
					}
					return false;
				}
				break;
			case "h"://时
				var p=this.dateMask.indexOf("h");
				var h=parseInt(value.substr(dm.indexOf("h"),2));
				if(h>23)
				{
					if( p==pos && h<30)
					{

						this._entity.value= value.substring(0,dm.indexOf("h"))+
							'20'+
							 value.substring(dm.indexOf("h")+2,value.length );
						break;
					}
					return false;
				}
				
				break;
			case "f"://分
				var f=parseInt(value.substr(dm.indexOf("f"),2));
				if(f>59){
					return false;
				}
				break;
			case "s"://秒
				var s=parseInt(value.substr(dm.indexOf("s"),2));
				
				if(s>59)
					return false;
				break;

		}
		return InputDateTimeMask.$super.prototype.checkPos(arg);
		

	}
	/**
	*校验是否输入完成，只验证年月日部分全零
	*/
	InputDateTimeMask.prototype.isComplete=function(){
		var value=this._entity.value;
		var dm=this.dateMask;
		var y=value.substr(dm.indexOf("y"),4);
		var m=value.substr(dm.indexOf("m"),2);
		var d=value.substr(dm.indexOf("d"),2);
		if(y=="0000" || m=="00" || d=="00")
		{
			return false;
		}
		return true;
	}


	function init(mask)
	{
		if(typeof mask=="undefined")
			return;
		this.mask=mask.replace(/[mdhfs]/ig,"y");
	}
	
 }
)();