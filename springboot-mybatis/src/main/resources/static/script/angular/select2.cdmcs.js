angular.module('select2.cdmcs', []).directive("select2Cdmcs",["$timeout","$interval",function($timeout,$interval){
    return{
        require: 'ngModel',
        restrict: 'A',
        scope:false,
        link:function(scope, element, attrs,ngModelController){
            if(attrs["name"]) element.attr("name",attrs["name"]);
            // 初始化select2
            var s2 = element.select2({
                data : [],
                theme: "bootstrap"
            });
            var ngModelName = attrs["ngModel"];
            var isOptionsAppended = false;
            // 监听ngModel的变化
            scope.$watch(ngModelName,function(n){
               if(n) {
                   var evalStr = "scope."+ngModelName+"=\"" +n+"\"";
                   if(attrs.multiple){
                       evalStr = "scope."+ngModelName+"=" +angular.toJson(n)+"";
                   }
                   if(isOptionsAppended){
                       eval(evalStr);
                       s2.val(n).trigger("change.select2");
                   }else{
                       var _tmp_id = $interval(function(){
                           if(isOptionsAppended) {
                               $interval.cancel(_tmp_id);
                               eval(evalStr);
                               s2.val(n).trigger("change.select2");
                           }
                       },50)
                   }
               }
            },true);

            var initDataName = attrs["select2Cdmcs"];
            if("" != initDataName){
                initDataName = initDataName.split(".");
                scope.$watch(initDataName.join("."),function(n){
                    if(angular.isArray(n) && n.length > 0){
                        // select赋值
                        var ngModelValue = [];
                        // 先清空
                        element.empty();
                        angular.forEach(n,function(v,k){
                            var option = new Option(v.text, v.value,false,false);
                            option.selected = v["selected"];

                            if(option.selected){
                                ngModelValue.push(v.value);
                            }
                            element.append(option);
                        });
                        // 状态设置为已加载
                        isOptionsAppended = true;

                        if(ngModelValue.length == 0){
                            s2.val(null).trigger("change.select2");
                            return ;
                        }else if(attrs.multiple){
                            var evalStr = "scope."+ngModelName+ "=" +angular.toJson(ngModelValue)+"";
                            eval(evalStr);
                            s2.val(ngModelValue).trigger("change.select2");
                        }else{
                            var evalStr = "scope."+ngModelName+"=\"" +ngModelValue[0]+"\"";
                            eval(evalStr);
                            s2.val(ngModelValue[0]).trigger("change.select2");
                        }
                    }else{
                        //清空
                        element.empty();
                    }
                },true);
            }
        }
    }
}]);