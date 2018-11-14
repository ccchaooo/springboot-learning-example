// 自定义服务 ajaxProxy
angular.module("AjaxProxy",[]).factory("ajaxProxy",["$http",function($http){
  var args = {};
  return {
    addParm:function(k,v){
      args[k+""]= v+"";
    },
    invokeProc:function(procName){
      args["_AJAX_RETTYPE"] = "json";
      args["_AJAX_DATA_CACHE"] = "0";
      args["_AJAX_FUN_TYPE"] = "procedure";
      args["_AJAX_FUNC_NAME"]= procName;
      var _args = {};
      angular.copy(args,_args);
      args = {};
      return $http({
        method: 'POST',
        url:"*.AS",
        //params:_args,
        data: _args,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        responseType:"json"
      }).then(function(resp){
        return resp;
      },function(){
      })
    }
  };
}])
.factory("clobProxy",["$http",function($http){
  var args = {};
  return {
    addParm:function(k,v){
      args[k+""]= v+"";
    },
    invokeProc:function(_url){
      var _args = {};
      angular.copy(args,_args);
      args = {};
      return $http({
        method: 'POST',
        url:_url,
        data: _args,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        responseType:"json"
      }).then(function(resp){
        return resp;
      },function(){
      })
    }
  };
}])
;
