angular.module('select2.cdmcs.2.0', []).directive("select2CdmcsV2",[function(){
    return{
        require: 'ngModel',
        restrict: 'A',
        scope:false,
        link:function($scope, element, attrs,ngModelController){
            var s2 = element.select2({
                data : [],
                theme: "bootstrap"
            });
            ngModelController.$formatters.push(function(value) {
                var vals = [];
                if(attrs.multiple && angular.isArray(value)){
                    for(var i=0;i<value.length;i++){
                        var item = value[i];
                        vals.push(item.value);
                    };
                }else{
                    vals = (value && value.value) || value;
                }
                return vals;
            });

            ngModelController.$parsers.push(function(val) {
                var opt = $(element).find("option:checked"), ret=[];
                opt.each(function(idx,opt){
                    var item = {"text":opt.text,"value":opt.value};
                    ret.push(item);
                });
                if(!attrs.multiple && ret.length>0){
                    ret = ret[0];
                }
                return ret;
            });

            $scope.$watch(attrs["ngModel"],function(n){
                var selecteds = [];
                if(!n) return;

                if(!attrs.multiple){
                    n = [n];
                }
                angular.forEach(n,function(v,k){
                    if($(element).find("option[value='"+v.value+"']").length == 0){
                        var option = new Option(v.text, v.value,true,true);
                        $(element).append(option);
                    }
                    selecteds.push(v.value);
                    if(!attrs.multiple){
                        selecteds = v.value;
                    }
                });
                s2.val(selecteds).trigger("change.select2");
            });
        }
    }
}]);