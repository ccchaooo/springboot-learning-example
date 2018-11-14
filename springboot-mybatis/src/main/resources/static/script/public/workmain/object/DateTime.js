//=================================
// 时间日期对象
//=================================

var DateTime = {};

DateTime.y4 = "([0-9]{4})";
DateTime.y2 = "([0-9]{2})";
DateTime.yi = -1;

DateTime.M2 = "(0[1-9]|1[0-2])";
DateTime.M1 = "([1-9]|1[0-2])";
DateTime.Mi = -1;

DateTime.d2 = "(0[1-9]|[1-2][0-9]|30|31)";
DateTime.d1 = "([1-9]|[1-2][0-9]|30|31)";
DateTime.di = -1;

DateTime.H2 = "([0-1][0-9]|20|21|22|23)";
DateTime.H1 = "([0-9]|1[0-9]|20|21|22|23)";
DateTime.Hi = -1;

DateTime.m2 = "([0-5][0-9])";
DateTime.m1 = "([0-9]|[1-5][0-9])";
DateTime.mi = -1;

DateTime.s2 = "([0-5][0-9])";
DateTime.s1 = "([0-9]|[1-5][0-9])";
DateTime.si = -1;

DateTime.regexp;


DateTime.getCurrentDate = function(){
	return DateTime.toString(new Date());
};

DateTime.getCurrentTime = function(){
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var arr = [];
	arr.push(h>9?h:"0"+h);
	arr.push(m>9?m:"0"+m);
	arr.push(s>9?s:"0"+s);
	return arr.join(":");
};

DateTime.toString = function(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var arr = [];
	arr.push(y);
	arr.push(m>9?m:"0"+m);
	arr.push(d>9?d:"0"+d);
	return arr.join("-");
};

DateTime.trim  = function(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
};


DateTime.validateIndex = function(formatString){
	var ia = new Array();
	var i = 0;
	DateTime.yi = formatString.search(/yyyy/);
	if ( DateTime.yi < 0 ) DateTime.yi = formatString.search(/yy/);
	if (DateTime.yi >= 0) {
		ia[i] = DateTime.yi;
		i++;
	}
	DateTime.Mi = formatString.search(/MM/);
	if ( DateTime.Mi < 0 ) DateTime.Mi = formatString.search(/M/);
	if (DateTime.Mi >= 0) {
		ia[i] = DateTime.Mi;
		i++;
	}
	DateTime.di = formatString.search(/dd/);
	if ( DateTime.di < 0 ) DateTime.di = formatString.search(/d/);
	if (DateTime.di >= 0) {
		ia[i] = DateTime.di;
		i++;
	}
	DateTime.Hi = formatString.search(/HH/);
	if ( DateTime.Hi < 0 ) DateTime.Hi = formatString.search(/H/);
	if (DateTime.Hi >= 0) {
		ia[i] = DateTime.Hi;
		i++;
	}
	DateTime.mi = formatString.search(/mm/);
	if ( DateTime.mi < 0 ) DateTime.mi = formatString.search(/m/);
	if (DateTime.mi >= 0) {
		ia[i] = DateTime.mi;
		i++;
	}
	DateTime.si = formatString.search(/ss/);
	if ( DateTime.si < 0 ) DateTime.si = formatString.search(/s/);
	if (DateTime.si >= 0) {
		ia[i] = DateTime.si;
		i++;
	}
	var ia2 = new Array(DateTime.yi, DateTime.Mi, DateTime.di, DateTime.Hi, DateTime.mi, DateTime.si);
	for(i=0; i<ia.length-1; i++)
		for(j=0;j<ia.length-1-i;j++)
			if(ia[j]>ia[j+1]) {
				temp=ia[j]; 
				ia[j]=ia[j+1]; 
				ia[j+1]=temp;
			}

	for (i=0; i<ia.length ; i++)
		for (j=0; j<ia2.length; j++)
			if(ia[i]==ia2[j]) {
				ia2[j] = i;
			}
	
	return ia2;
};

DateTime.validateDate = function(dateString, formatString){
	var dateString = DateTime.trim(dateString);
	if(dateString=="") return;
	var reg = formatString;
	reg = reg.replace(/yyyy/, DateTime.y4);
	reg = reg.replace(/yy/, DateTime.y2);
	reg = reg.replace(/MM/, DateTime.M2);
	reg = reg.replace(/M/, DateTime.M1);
	reg = reg.replace(/dd/, DateTime.d2);
	reg = reg.replace(/d/, DateTime.d1);
	reg = reg.replace(/HH/, DateTime.H2);
	reg = reg.replace(/H/, DateTime.H1);
	reg = reg.replace(/mm/, DateTime.m2);
	reg = reg.replace(/m/, DateTime.m1);
	reg = reg.replace(/ss/, DateTime.s2);
	reg = reg.replace(/s/, DateTime.s1);
	reg = new RegExp("^"+reg+"$");
	regexp = reg;
	return reg.test(dateString);
};

/**
 * 将时间日期串按指定格式转换为Date格式
 * @param {} dateString
 * @param {} formatString
 * @return {}
 */
DateTime.getDate = function(dateString, formatString){
	if(DateTime.validateDate(dateString, formatString)) {
		var now = new Date();
		var vals = regexp.exec(dateString);
		var index = DateTime.validateIndex(formatString);
		var year = index[0]>=0?vals[index[0] + 1]:now.getFullYear();
		var month = index[1]>=0?(vals[index[1] + 1]-1):now.getMonth();
		var day = index[2]>=0?vals[index[2] + 1]:now.getDate();
		var hour = index[3]>=0?vals[index[3] + 1]:"";
		var minute = index[4]>=0?vals[index[4] + 1]:"";
		var second = index[5]>=0?vals[index[5] + 1]:"";
		var validate;
		if (hour == "")
			validate = new Date(year, month, day);
		else
			validate = new Date(year, month, day, hour, minute, second);
		
		if(validate.getDate()==day) return validate;
	}
	return null;
};

/**
 * 将TimeStamp转换为指定格式的字符串
 * @param {} timestamp
 * @param {} formatString
 */
DateTime.getStringFromTimeStamp = function(timestamp, formatString){
	if(null == timestamp || timestamp == "" || timestamp.length < 1){
		return "";
	}
	var tmpDate = null;
	try{
		tmpDate = new Date(timestamp);
	}catch(ex){
		return "";
	}
	var year4 = tmpDate.getFullYear() + "";
	var year2 = year4.substr(2, 2);
	var month1 = tmpDate.getMonth() + 1;
	var month2 = month1<10?"0" + month1:month1;
	var day1 = tmpDate.getDate();
	var day2 = day1 < 10 ? "0" + day1:day1;
	var hour1 = tmpDate.getHours();
	var hour2 = hour1 < 10 ? "0" + hour1:hour1;
	var minutes1 = tmpDate.getMinutes();
	var minutes2 = minutes1 < 10 ? "0" + minutes1:minutes1;
	var seconds1 = tmpDate.getSeconds();
	var seconds2 = seconds1 < 10 ? "0" + seconds1:seconds1;
	
	var reg = formatString;
	reg = reg.replace(/yyyy/, year4);
	reg = reg.replace(/yy/, year2);
	reg = reg.replace(/MM/, month2);
	reg = reg.replace(/M/, month1);
	reg = reg.replace(/dd/, day2);
	reg = reg.replace(/d/, day1);
	reg = reg.replace(/HH/, hour2);
	reg = reg.replace(/H/, hour1);
	reg = reg.replace(/mm/, minutes2);
	reg = reg.replace(/m/, minutes1);
	reg = reg.replace(/ss/, seconds2);
	reg = reg.replace(/s/, seconds1);
	return reg;
};

/**
 * 将秒转换为时分秒
 * @param seconds
 * @returns {String}
 */
DateTime.secondsTohhmmss = function(seconds){
	
	var hh;
    var mm;
    var ss;
    //传入的时间为空或小于0
    if(seconds==null||seconds<0){
        return;
    }
    //得到小时
    hh=seconds/3600|0;
    seconds=parseInt(seconds)-hh*3600;
    if(parseInt(hh)<10){
    	hh="0"+hh;
    }
    //得到分
    mm=seconds/60|0;
    //得到秒
    ss=parseInt(seconds)-mm*60;
    if(parseInt(mm)<10){
        mm="0"+mm;    
    }
    if(ss<10){
       ss="0"+ss;      
    }
   
    return {h:hh, m:mm, s:ss};
   
}




DateTime.LastID = new Date().getTime();