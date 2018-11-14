

var IdVerify = {};


IdVerify.sfzhVerify = function(hm, Obj){
	Obj.CheckResult = "0";
	Obj.CheckMsg = "";
	Obj.Csrq = "";
	Obj.Xb = "";
	// 1. 交验时间
	var d_csrq=new Date();
	var y,m,d;
	var xbflag;
	if(StringUtil.isNull(hm) || hm.length == 0){
		Obj.CheckResult = "0";
		Obj.CheckMsg = "没有居民身份证号码!";
		return false;
	}
	if(hm.length != 15 && hm.length != 18){
		Obj.CheckResult = "2";
		Obj.CheckMsg = "居民身份证号码位数不正确!";
		return false;
	}
	if(hm.length == 15)
	{
		var bds = /\d{15}/;
		if(!bds.test(hm))
		{
			Obj.CheckResult = "2";
			Obj.CheckMsg = "居民身份证号码中含有非法字符!";
			return false;
		}
		// 取得当前年度
		var dqsj = DateTime.getCurrentDate();
		var dqnd = dqsj.substr(2, 2) * 1;
		
		if (hm.substr(6, 2) * 1 <= dqnd){
			y = "20" + hm.substr(6, 2);
		}else{
			y = "19" + hm.substr(6, 2);
		}
		m = hm.substr(8, 2);
		d = hm.substr(10, 2);
		xbflag = hm.substr(14, 1);
	}
	else if(hm.length==18)
	{
		var bds = /\d{17}\w{1}/;
		if(!bds.test(hm))
		{
			Obj.CheckResult = "2";
			Obj.CheckMsg = "居民身份证号码中含有非法字符!";
			return false;
		}
		y = hm.substr(6, 4);
		m = hm.substr(10, 2);
		d = hm.substr(12, 2);
		xbflag = hm.substr(16, 1);
	}
	// 取得性别
	Obj.Xb = "1";
	if ((xbflag * 1)%2 == 0){
		Obj.Xb = "2";
	}
	// 取得出生日期
	d_csrq=new Date(eval(y), eval(m) - 1, eval(d));
	if( (d_csrq.getMonth()+1)!=eval(m) || d_csrq.getDate()!=eval(d))
	{
		Obj.CheckMsg = "居民身份证号码中出生年月不正确!";
		return false;
	}
	Obj.Csrq = y + '-' + m + '-' + d;

	// 如果居民身份证号为18位，则交验其交验位是否有效
	if (hm.length == 15){
		Obj.CheckResult = "1";
		return true;
	}

	// 交验位
	var checkbit = new Array('0', '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	var checksum = new Array(0, 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	var tempnum = 0;

    var i = 0;
    for(i = 1; i <= 17; i++)
	{
		checksum[i] = checksum[i] * ((hm.substr(i - 1, 1)) * 1);
		tempnum = tempnum + checksum[i];
	}
    
	tempnum = tempnum % 11;

    if(checkbit[tempnum + 1] != hm.substr(17, 1)){
    	Obj.CheckResult = "2";
		Obj.CheckMsg = "居民身份证号码中校验位不正确!";
		return false;
	}
    Obj.CheckResult = "1";
	return true;
};

IdVerify.zzjgdmVerify = function(strDm, Obj){
	Obj.CheckMsg = "";
	var iLen = strDm.length;
	var onebit = "";
	var onebitasc = 0;
	var tempnum = 0;
	var li_ChkBit = 0;
	var ls_ChkBit = "";
	if(iLen != 9){
		Obj.CheckMsg = "组织机构代码证号码位数不足!"
		return false;
	}
	
	var checkbit = new Array(3, 7, 9, 10, 5, 8, 4, 2);
	var i = 0;
    for(i = 1; i <= 8; i++)
	{
		onebit = (strDm.substr(i - 1, 1));
		onebitasc = onebit.charCodeAt() - 48;
		if(onebitasc > 9){
			onebitasc = onebitasc - 7;
		}
		tempnum = tempnum + checkbit[i - 1] * onebitasc;
	}
	
	li_ChkBit = 11 - tempnum % 11;
	switch(li_ChkBit){
		case 10:
		  ls_ChkBit = 'X';
		  break;
		case 11:
		  ls_ChkBit = '0';
		  break;
		default:
		  ls_ChkBit = li_ChkBit + "";
	}
	if(ls_ChkBit == strDm.substr(8, 1))
	  return true;
	
	Obj.CheckMsg = "组织机构代码证号不正确!"
	return false;

};

/**
 * 取得18位身份证的校验位
 */
IdVerify.getSfzhmVerifyBit = function(sfzhm){
	if(null == sfzhm || sfzhm.length < 17){
		return "";
	}
	var checkbit = new Array('0', '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	var checksum = new Array(0, 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	var tempnum = 0;

    var i = 0;
    for(i = 1; i <= 17; i++){
		checksum[i] = checksum[i] * ((sfzhm.substr(i - 1, 1)) * 1);
		tempnum = tempnum + checksum[i];
	}
	tempnum = tempnum % 11;

    return checkbit[tempnum + 1];
};

/**
 * 将15位身份证转换为18位
 */
IdVerify.changeSfzh15To18 = function(sfzhm){
	if(StringUtil.isNull(sfzhm)){
		return "";
	}
	// 校验身份证规则
	var obj = {};
	if(!IdVerify.sfzhVerify(sfzhm, obj)){
		return "";
	}
	if(sfzhm.length != 15){
		return sfzhm;
	}
	var xzqh = sfzhm.substr(0, 6);
	var csrq = sfzhm.substr(6, 6);
	var xh = sfzhm.substr(12, 3);
	// 取得当前年度
	var dqsj = DateTime.getCurrentDate();
	var dqnd = dqsj.substr(2, 2) * 1;
	if((csrq.substr(0, 2) * 1) <= dqnd){
		csrq = '20' + csrq;
	}else{
		csrq = '19' + csrq;
	}
	var temp = xzqh + csrq + xh;
	return temp + IdVerify.getSfzhmVerifyBit(temp);
	
};

/**
 * 取得组织机构代码校验位
 */
IdVerify.getZzjgdmVerifyBit = function(strDm){
	var iLen = strDm.length;
	var onebit = "";
	var onebitasc = 0;
	var tempnum = 0;
	var li_ChkBit = 0;
	var ls_ChkBit = "";
	if(iLen < 8){
		return "";
	}
	
	var checkbit = new Array(3, 7, 9, 10, 5, 8, 4, 2);
	var i = 0;
    for(i = 1; i <= 8; i++)
	{
		onebit = (strDm.substr(i - 1, 1));
		onebitasc = onebit.charCodeAt() - 48;
		if(onebitasc > 9){
			onebitasc = onebitasc - 7;
		}
		tempnum = tempnum + checkbit[i - 1] * onebitasc;
	}
	
	li_ChkBit = 11 - tempnum % 11;
	switch(li_ChkBit){
		case 10:
		  ls_ChkBit = 'X';
		  break;
		case 11:
		  ls_ChkBit = '0';
		  break;
		default:
		  ls_ChkBit = li_ChkBit + "";
	}
	return ls_ChkBit;
};

/**
 * 统一社会信用代码验证
 * 社会统一代码中不能输入字母I,O,S,V,Z
 */
IdVerify.shxydmVerify = function(strDm, Obj){
	Obj.CheckMsg = "";
    var iLen = strDm.length;
    var onebit = "";
    var onebitasc = 0;
    var tempnum = 0;
    var li_ChkBit = 0;
    var ls_ChkBit = "";
    if(iLen != 18){
        Obj.CheckMsg = "统一社会信用代码证号码位数不足!"
        return false;
    }
    var codeNum = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y');
    var checkbit = new Array(1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28);
    if (!Array.indexOf) {  
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        }
    }
    
    for(i = 1; i <= 17; i++)
    {
        onebit = (strDm.substr(i - 1, 1));
        // 查找字符对应的值
        var num = codeNum.indexOf(onebit);
        if(num < 0){
        	Obj.CheckMsg = "统一社会信用代码证号码第" + i + "位不正确!";
            return false;
        }
        var onebitasc = checkbit[i - 1];
        tempnum = tempnum + num * onebitasc;
    }
    li_ChkBit = 31 - tempnum % 31;
    
    switch(li_ChkBit){
    	case 30:
          ls_ChkBit = 'Y';
          break;
        case 31:
          ls_ChkBit = '0';
          break;
        default:
          ls_ChkBit = codeNum[li_ChkBit];
    	   
    }
    
    if(ls_ChkBit == strDm.substr(17, 1))
      return true;
    
    Obj.CheckMsg = "统一社会信用代码证号不正确!"
    return false;
}

/**
 * 取得统一社会信用代码校验
 * @param {} strDm
 * @return {String}
 */
IdVerify.getShxydmVerifyBit = function(strDm){
    var iLen = strDm.length;
    var onebit = "";
    var onebitasc = 0;
    var tempnum = 0;
    var li_ChkBit = 0;
    var ls_ChkBit = "";
    if(iLen < 17){
        return "";
    }
    var codeNum = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y');
    var checkbit = new Array(1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28);
    if (!Array.indexOf) {  
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        }
    }
    
    for(i = 1; i <= 17; i++)
    {
        onebit = (strDm.substr(i - 1, 1));
        // 查找字符对应的值
        var num = codeNum.indexOf(onebit);
        if(num < 0){
            return "";
        }
        var onebitasc = checkbit[i - 1];
        tempnum = tempnum + num * onebitasc;
    }
    li_ChkBit = 31 - tempnum % 31;
    
    ls_ChkBit = codeNum[li_ChkBit];
    
    return ls_ChkBit;
}