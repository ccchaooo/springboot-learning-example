//在数组中,从数组中查询text
//实现findText的重载
var findText =function () {
	if (typeof(arguments[0]) == "string") {
		return value_findText(arguments[0],arguments[1]);
		console.log("String");
	}else {
		return array_findText(arguments[0],arguments[1]);
		console.log("Array");
	}
}

//根据value查询text
var value_findText =function (value,arr) {
	for (var i=0; i<arr.length; i++) {
		if (arr[i].value == value) {
			return arr[i].text;
			break;
		}
	}
	return null;
}
//根据数组查询text,将其拼接成字符串
var array_findText =function (arr1,arr2) {
	var str = "";
	for (var i=0; i<arr1.length; i++) {
		for (var j=0; j<arr2.length; j++) {
			if (arr1[i].value == arr2[j].value) {
				str = str+arr2[j].text;
				break;
			}
		}
	}
	return str;
}
//页面是否可编辑
var pageEditable = function (flag){
	if(flag == true || flag == false)
	{	
		$('.container').find('input,textarea,select').attr('disabled',flag);
		$('.form').find('input,textarea,select').attr('disabled',flag);
		$('.row').find('input,textarea,select').attr('disabled',flag);
	}else{
		console.log("please set boolean type of pramater for function 'pageEditable'");
	};
}




















