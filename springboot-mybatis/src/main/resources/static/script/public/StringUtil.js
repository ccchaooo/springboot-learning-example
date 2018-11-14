
/**
 * 字符串处理工具
 * @file      StringUtil.js
 * @author	  LAI0505
 * @version	  1.00, 2010.07.11
 */
var StringUtil = {
	/**
	 * 去掉指定字符串前后空格
	 */
	trim:function(s){
		return (s.replace(/(^\s+)|\s+$/g, ""));
	},
	
	/**
	 * 截取字符串左边指定长度内容
	 */
	left:function(s, l){
		return (null == s || l > s.length) ?  s : s.substring(0, l);
	},
	
	/**
	 * 截取字符串右边指定长度内容
	 */
	right:function(s, l){
		return (null == s || s.length < l) ?  s : s.substring(s.length - l);
	},
	
	/**
	 * 替换字符串中的内容
	 * str: 原字符串
	 * ss:  要被替换的字符串
	 * ds:  替换的字符串
	 */
	replace:function(str, ss, ds){
		var newstr = "";
		var istrLoop = 0;
	    var ssArry = str.split(ss);
	    for (istrLoop = 0; istrLoop < ssArry.length; istrLoop++)
	    {
	        if (newstr != null && newstr != "" && istrLoop > 0)
	        {
	            newstr = newstr + ds;
	        }
	        newstr = newstr + ssArry[istrLoop];
	    }
	    return newstr;
    
//		var re = new RegExp(ss.replace(/\\/g,"\\\\").replace(/"/g,"\\\""), "g");
//		return str.replace(re, ds);
	},
	
	/**
	 * 比较字符串是否相同，忽略大小写
	 */
	compareIgnoreCase:function(s1, s2){
		return (s1 == s2) || 
		(s1 != null && s2 != null &&
			s1.toUpperCase().toLowerCase() == 
				s2.toUpperCase().toLowerCase());
	},
	
	/**
	 * 修正字符串长度,如果是数字在前面加0，否则加空
	 */
	fixLength:function (o, size){
		var s = String(o);
		if (s.length > size) {
			return s;
		}
		var l = size + 1 - s.length;
		return (typeof(o) == "number") ? (new Array(l).join("0") + s)
			: (s + new Array(l).join(" "));
	},
	
	/**
	 * 将字符串按指定长度截取并加上...后缀
	 * @param {} o
	 * @param {} len
	 * @param {} endstr
	 */
	getLengthStr:function(o, ilen){
		var num = ilen;
		var dststr = "";
    	var len= num*2;
		var orgdata = 0;
		var s = o.replace(/([\u00ff-\uffff])/ig,'$1a');
		if(s.length<=len){
			dststr = o;
		}else{
			s=s.substring(0,len-3);
			s=s.replace(/([\u00FF-\uffe5])a/ig,'$1');
			dststr = s+"…";
		}
		return dststr;
	},
	
	/**
	 * 将字符串按指定长度截取无后缀
	 * @param {} o
	 * @param {} len
	 * @param {} endstr
	 */
	getLengthStrNoDot:function(o, ilen){
		var num = ilen;
		var dststr = "";
    	var len= num*2;
		var orgdata = 0;
		var s = o.replace(/([\u00ff-\uffff])/ig,'$1a');
		if(s.length<=len){
			dststr = o;
		}else{
			s=s.substring(0,len-3);
			s=s.replace(/([\u00FF-\uffe5])a/ig,'$1');
			dststr = s;
		}
		return dststr;
	},
	
	/**
	 * 取得指定字符串长度(汉字为2个)
	 * @param o
	 * @returns
	 */
	getStrLen:function(o){
		var s = o.replace(/([\u00ff-\uffff])/ig,'$1a');
		return s.length;
	},
	
	/**
	 * 判断字符串是否为整数
	 */
	isInt:function(str){
		return /^\-?\d+$/.test(""+str);
	},
	
	/**
	 * 判断字符串是否为数字
	 */
	isNumber:function(str){
		var t = ""+str;
		var dotCount = 0;
		for(var i=0;i<str.length;i++){
			var c = str.charAt(i);
			if(c=="."){
				if(i==0||i==str.length-1||dotCount>0){
					return false;
				}else{
					dotCount++;
				}
			}else if(c=='-'){
				if(i!=0){
					return false;
				}
			}else	if(isNaN(parseInt(c))){
				return false;
			}
		}
		return true;
	},
	
	/**
	 * 判断字符串是否为时间
	 */
	isTime:function(str){
		if(!str){
			return false;
		}
		var arr = str.split(":");
		if(arr.length!=3){
			return false;
		}
		if(!this.isNumber(arr[0])||!this.isNumber(arr[1])||!this.isNumber(arr[2])){
			return false;
		}
		var date = new Date();
		date.setHours(arr[0]);
		date.setMinutes(arr[1]);
		date.setSeconds(arr[2]);
		return date.toString().indexOf("Invalid")<0;
	},
	
	/**
	 * 判断字符串是否为日期
	 */
	isDate:function(str){
		if(!str){
			return false;
		}
		var arr = str.split("-");
		if(arr.length!=3){
			return false;
		}
		if(!this.isNumber(arr[0])||!this.isNumber(arr[1])||!this.isNumber(arr[2])){
			return false;
		}
		if(arr[0] * 1 <=0 || arr[1] * 1 <= 0 || arr[1] * 1 > 12 || arr[2] * 1 <= 0 || arr[2] > 31){
			return false;
		}
		var date=new Date(eval(arr[0]), eval(arr[1]) - 1, eval(arr[2]));
    if( (date.getMonth()+1)!=eval(arr[1]) || date.getDate()!=eval(arr[2])){
      return false;
    }
    return true;
		/*var date = new Date();
		date.setFullYear(arr[0]);
		date.setMonth(arr[1]);
		date.setDate(arr[2]);
		return date.toString().indexOf("Invalid")<0;
		*/
	},
	
	/**
	 * 判断字符串是否为日期时间
	 */
	isDateTime:function(str){
		if(!str){
			return false;
		}
		if(str.indexOf(" ")<0){
			return isDate(str);
		}
		var arr = str.split(" ");
		if(arr.length<2){
			return false;
		}
		return this.isDate(arr[0])&& this.isTime(arr[1]);
	},
	
	/**
	 * 判断对象是否为数组
	 */
	isArray:function(obj){
		if(!obj){
		 	 return false;
		 }
	   if (obj.constructor.toString().indexOf("Array") == -1){
	      return false;
	   } else{
	      return true;
	   }
	},
	
	/**
	 * 判断对象是否为空
	 */
	isNull:function(obj){
		return obj===null||typeof(obj)=="undefined";
	},
	
	/**
	 * 判断对象是否非空
	 */
	isNotNull:function(obj){
		return !this.isNull(obj);
	},
	
  
  /**
   * 判断字符串是否为移动电话号码
   * @param {} obj
   */
  isMobile:function(val){
    var pattern = /^1[34578]\d{9}$/;
    if(null != val && "" != val){
      if (pattern.test(val)){
        return true;
      }
    }
    return false;
  },
  
  /**
   * 判断字符串是否符合邮箱格式
   * @param {} val
   */
  isEmailUrl:function(val){
    var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(null != val && "" != val){
      if (pattern.exec(val)) {
        return true;
      }
    }
    return false;
  },
  
	/**
	 * 将字符串进行Base64编码
	 * @param input
	 * @returns {String}
	 */
	Encode64:function(input){
		var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" +"wxyz0123456789+/"+"=";
		//input = escape(input);
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
			  enc3 = enc4 = 64;
			}else if (isNaN(chr3)) {
			  enc4 = 64;
			}
			output = output + 
		  	  keyStr.charAt(enc1) + 
			  keyStr.charAt(enc2) + 
			  keyStr.charAt(enc3) + 
			  keyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);
		return output;
	},
	
	Decode64:function(input){
		var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" +"wxyz0123456789+/"+"=";
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		if (base64test.exec(input)) {
			alert("There were invalid base64 characters in the input text.\n" +
				   "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
				   "Expect errors in decoding.");
		}
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		do {
			 enc1 = keyStr.indexOf(input.charAt(i++));
			 enc2 = keyStr.indexOf(input.charAt(i++));
			 enc3 = keyStr.indexOf(input.charAt(i++));
			 enc4 = keyStr.indexOf(input.charAt(i++));
			 chr1 = (enc1 << 2) | (enc2 >> 4);
			 chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			 chr3 = ((enc3 & 3) << 6) | enc4;
			 output = output + String.fromCharCode(chr1);
			 if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			 }
			 if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			 }
			 chr1 = chr2 = chr3 = "";
			 enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);
		return unescape(output);
	},
	
	/**
	 * 将UTF16转换为UTF8
	 * @param {} str
	 * @return {}
	 */
	utf16to8:function(str){
		var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
	},
	
	/**
	 * 将UTF8转换为UTF16
	 * @param {} str
	 * @return {}
	 */
	utf8to16:function(str){
		var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
        c = str.charCodeAt(i++);
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += str.charAt(i-1);
            break;
            case 12: case 13:
            // 110x xxxx 10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
            // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
	}
		
		
}