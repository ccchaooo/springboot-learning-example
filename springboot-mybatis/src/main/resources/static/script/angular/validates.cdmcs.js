// 获取当前文件的path
var getCurrAbsPath = function(){
    try{
        return document.currentScript.src;
    }catch (e){}
    var a = {}, stack;
    try{
        a.b();
    }
    catch(e){
        stack = e.stack || e.sourceURL || e.stacktrace;
    }
    var rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
        absPath = rExtractUri.exec(stack);
    return absPath[0] || '';
};
var refJavaScript = function(fileName){
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript= document.createElement("script");
    oScript.type = "text/javascript";
    var _URL = getCurrAbsPath();
    _URL = _URL.substring(0,_URL.lastIndexOf("/")+1)+fileName;
    oScript.src=_URL;
    oHead.appendChild( oScript);
}
// 自动判断，引入js
if(!window.IdVerify){
    refJavaScript("IdentityVerify.js");
}

angular.module('validates.cdmcs', []).directive('validates',function(){
    // 验证器
    var validates = {
        isRequired : function(val){
            return val?true:false;
        },
        isNumber : function(v,options){
            if(!v) return true;
            v = v+"";
            var precision = options.precision, scale = options.scale;
            var leftSize = precision - scale - 1, regExp = new RegExp();
            // 代表不是小数，不需要小数点
            if(scale <= 0){
                regExp.compile("^[1-9]{1}\\d{0,"+(precision-1)+"}$")
            }else if(leftSize <= 0){
                regExp.compile("^0\\.\\d{1,"+scale+"}$")
            }else {
                if(v.indexOf("0.") == 0){
                    regExp.compile("^0\\.\\d{1,"+scale+"}$");
                }else if(v.indexOf(".")>0){
                    if((leftSize-1) <= 0){
                        regExp.compile("^[1-9]{1}$");
                    }else{
                        regExp.compile("^[1-9]{1}\\d{0,"+(leftSize-1)+"}\\.\\d{1,"+scale+"}$");
                    }
                }else{
                    if((leftSize-1) <= 0){
                        regExp.compile("^[1-9]{1}$");
                    }else{
                        regExp.compile("^[1-9]{1}\\d{0,"+(leftSize-1)+"}$");
                    }
                }
            }
            var ret = regExp.exec(v);
            // console.log(v,regExp,ret);
            return ret ? ret.input == ret[0] : false;
        },
        isDate : function(v,options){
            if(!v){
                return true;
            }
            var regExp = new RegExp();
            if(options.format == "yyyy-mm-dd" || options.format == "yyyy/mm/dd"){
                regExp.compile("^(\\d{4})(-|\\/)(\\d{2})\\2(\\d{2})$");
                var result = regExp.exec(v);
                if(result == null) return false;

                var d = new Date(parseInt(result[1],10), parseInt(result[3],10) - 1, parseInt(result[4],10));
                return ( d.getFullYear() == parseInt(result[1],10)
                && (d.getMonth() + 1) == parseInt(result[3],10)
                && d.getDate() == parseInt(result[4],10) );
            }else if(options.format == "yyyy-mm-dd HH:mi:ss" || options.format == "yyyy/mm/dd HH:mi:ss"){
                regExp.compile("^(\\d{4})(-|\\/)(\\d{2})\\2(\\d{2}) (\\d{2})(:)(\\d{2})\\6(\\d{2})$");
                var result = regExp.exec(v);
                if(result == null) return false;

                var d = new Date(parseInt(result[1],10), parseInt(result[3],10) - 1, parseInt(result[4],10));
                d.setHours(parseInt(result[5],10));
                d.setMinutes(parseInt(result[7],10));
                d.setSeconds(parseInt(result[8],10));
                return ( d.getFullYear() == parseInt(result[1],10)
                && (d.getMonth() + 1) == parseInt(result[3],10)
                && d.getDate() == parseInt(result[4],10)
                && d.getHours() == parseInt(result[5],10)
                && d.getMinutes() == parseInt(result[7],10)
                && d.getSeconds() == parseInt(result[8],10));
            }
            return true;
        },
        isEmail : function(v){
            if(!v) return true;
            var regExp = new RegExp(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/);
            var ret = regExp.exec(v);
            // console.log(v,regExp,ret);
            return ret ? ret.input == ret[0] : false;
        },
        isSFZH :function(v){
            if(!v) return true;
            var retObj = {};
            if(typeof IdVerify == "undefined"){
                return false;
            }
            var ret = IdVerify.sfzhVerify(v,retObj);
            return ret;
        },
        isSHXYDM : function(v){
            if(!v) return true;
            var retObj = {};
            if(typeof IdVerify == "undefined"){
                return false;
            }
            var ret = IdVerify.shxydmVerify(v,retObj);
            return ret;
        },
        isZZJGDM : function(v){
            if(!v) return true;
            var retObj = {};
            if(typeof IdVerify == "undefined"){
                return false;
            }
            var ret = IdVerify.zzjgdmVerify(v,retObj);
            return ret;
        }
    };
    return{
        require:'ngModel',
        link:function(scope,elm,attrs,ngModelCtrl){
            var f_validate = validates[attrs.validates];
            var f_my_validate = function(v){
                var options = attrs["validatesOptions"];
                if(options){
                    options = options.replace(/'/g,'"');
                    options = angular.fromJson(options);
                }else{
                    options = {};
                }
                var valid = f_validate(v,options);
                ngModelCtrl.$setValidity('validates',valid);


                // 自动转大写处理
                if(v && options.uppercase){
                    v = v.toUpperCase();
                    elm.val(v);
                    ngModelCtrl.$setViewValue(v);
                    ngModelCtrl.$commitViewValue();
                }
                return valid?v:undefined;
            }
            ngModelCtrl.$parsers.push(f_my_validate);
            ngModelCtrl.$formatters.push(f_my_validate);
        }
    }
});