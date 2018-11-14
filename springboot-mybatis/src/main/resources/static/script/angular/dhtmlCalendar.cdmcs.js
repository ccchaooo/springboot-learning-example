angular.module('calendar.cdmcs', []).directive("calendarCdmcs",["$timeout",function($timeout){
    return{
        require: 'ngModel',
        restrict: 'A',
        scope:false,
        link:function(scope, element, attrs,ngModelController){

            // 监听输入框值的变化，如果有非日期值输入，则值空
            scope.$watch(attrs["ngModel"],function(n){
                myCalendar.setDate(n);
                var d = myCalendar.getFormatedDate();
                if (d != n) {
                    if(d != ""){
                        evalStr = "scope."+attrs["ngModel"]+"=\""+d+"\"";
                        eval(evalStr);
                    }else{
                        var evalStr = "delete scope."+attrs["ngModel"];
                        try{
                            eval(evalStr);
                        }catch(e) {}
                    }
                }
            },true);

            var myCalendar = new dhtmlXCalendarObject([element.get(0)]);
            myCalendar.setDateFormat(attrs["dateFormat"]||"%Y-%m-%d");
            // 如果有时分秒，则显示时间选项
            if(attrs["dateFormat"] && (attrs["dateFormat"].indexOf("%H")>=0 ||
                                       attrs["dateFormat"].indexOf("%i") ||
                                       attrs["dateFormat"].indexOf("%s") )
            ){
                myCalendar.showTime();
            }else{
                myCalendar.hideTime();
            }
            myCalendar.showToday();
            myCalendar.setInsensitiveRange(attrs["dateFrom"]||null,attrs["dateTo"]||null);

            //设置默认时间
            if(attrs["defaultDate"]){
                var evalStr = "scope."+attrs["ngModel"]+"=\""+attrs["defaultDate"]+"\"";
                eval(evalStr);
            }else{
                myCalendar.setDate(null);
            }

            // 处理日历控件事件
            myCalendar.attachEvent("onButtonClick", function(d){
                var evalStr = "";
                if (d == null) {
                    evalStr = "delete scope."+attrs["ngModel"];
                }else{
                    var str = myCalendar.getFormatedDate(myCalendar. _dateFormat, d);
                    evalStr = "scope."+attrs["ngModel"]+"=\""+str+"\"";
                }
                scope.$apply(function(){
                    eval(evalStr);
                });
                this.hide();
            });
            myCalendar.attachEvent("onClick", function(d){
                d = myCalendar.getDate(true);
                scope.$apply(function(){
                    var evalStr = "scope."+attrs["ngModel"]+"=\""+d+"\"";
                    eval(evalStr);
                });
            });
        }
    }
}]);