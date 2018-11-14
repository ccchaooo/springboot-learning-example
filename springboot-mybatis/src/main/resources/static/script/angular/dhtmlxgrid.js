angular.module("DHTMLXGrid",[]).directive("grid",[function(){
    return {
        ngModel:"required",
        restrict: 'E',
        replace: true,
        template:"<div></div>",
        scope:{
            ngModel:"=",
            theme: "=",
            imagepath:"=",
            header1: "=",
            header2: "=",
            colwidths: "=",
            colalignments: "=",
            coltypes: "=",
            colsorting: "=",
            comboData:"=",
            colValidators:"=",
            enableResizing:"=",
            deleteFunction:"="
        },
        link:function(scope, element, attrs){

            // 重新设置高度
            var resetHeight = function(){
                var styles = attrs.style.split(";");
                for(var _i=0;_i<styles.length;_i++){
                    if(/height/gi.test($.trim(styles[_i]))){
                        var _s = styles[_i];
                        var _h = $.trim(_s.substring(_s.indexOf(":")+1));
                        element.css("height",_h);
                        break;
                    }
                }
            };

            var updateModel = function(mygrid,isInScope){
                var json = {rows:[]};
                mygrid.forEachRow(function(id){
                    var data = [];
                    mygrid.forEachCell(id,function(cellObj,ind){
                        data.push(cellObj.getValue(ind));
                    });
                    json.rows.push({id:id,data:data});
                });
                if(isInScope){
                    scope.ngModel = json;
                }else{
                    scope.$apply(function(){
                        scope.ngModel = json;
                    });
                }
                resetHeight();
            };

            var refreshChart = function(scope){
                var cols = scope.header2.split(",").length, cspan=[],_add_id = "_add_row_"+attrs.id,_delete_id = "_delete_row_"+attrs.id;
                for(var i=0;i<cols;i++){
                    if(i != cols-1){
                        cspan.push("#cspan");
                    }
                }
                scope.mygrid = new dhtmlXGridObject(attrs.id);
                scope.mygrid.setImagePath(scope.imagepath);
                scope.mygrid.setHeader("<a href='javascript:;' id='"+_add_id+"'><span class='text-success'><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>&nbsp;新增</span></a>　<a href='javascript:;'id='"+_delete_id+"'><span class='text-warning'><span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span>&nbsp;删除</span></a>　（双击数据可编辑修改）"+","+cspan.join(","),null,["text-align:right;"]);
                scope.mygrid.attachHeader(scope.header2);
                scope.mygrid.setInitWidths(scope.colwidths);
                scope.mygrid.setColAlign(scope.colalignments);
                scope.mygrid.setColTypes(scope.coltypes);
                // scope.mygrid.setColSorting(scope.colsorting);
                scope.mygrid.enableAutoWidth(true);
                scope.mygrid.enableValidation(true,true);
                if(scope.colValidators) {
                    scope.mygrid.setColValidators(scope.colValidators);
                }
                // 设置是否允许拖动列
                if(scope.enableResizing) scope.mygrid.enableResizing(scope.enableResizing);
                scope.mygrid.init();
                // 大小改变之后恢复高度
                scope.mygrid.attachEvent("onResizeEnd",function(obj){
                    resetHeight();
                });
                scope.mygrid.attachEvent("onValidationError", function(id,index,value,rule){
                    var msgId = attrs["id"]+"_validateMsg", msg = "数据无效，请重新填写。";
                    if($("#"+msgId).size() == 0){
                        element.after("<div id='"+msgId+"' style='color:#F00;'></div>")
                    }
                    $("#"+msgId).empty().html(msg);
                    return true;
                });
                scope.mygrid.attachEvent("onValidationCorrect", function(id,index,value,rule){
                    var msgId = attrs["id"]+"_validateMsg";
                    if($("#"+msgId).size() != 0){
                        $("#"+msgId).remove();
                    }
                });

                //获取combo
                scope.$watch("comboData",function(n,o){
                    //console.log("-------------",n)
                    if(angular.isArray(n) && n.length > 0){
                        if(scope.coltypes.indexOf("combo")>=0){
                            var coltypesList = scope.coltypes.split(","), seq = 0;
                            for(var z=0;z<coltypesList.length;z++){
                                if(coltypesList[z] == "combo"){
                                    var combo = scope.mygrid.getColumnCombo(z);
                                    combo.clearAll();
                                    // 如果comboData数据类型为[[]]这种类型，则可能有多个combo
                                    if(angular.isArray(scope.comboData[seq])){
                                        combo.addOption(scope.comboData[seq++]);
                                    }
                                    // 如果只有一个combo，则直接获取
                                    else{
                                        combo.addOption(scope.comboData);
                                    }
                                    combo.enableFilteringMode(true);
                                    combo.readonly(true);
                                }
                                scope.mygrid.refreshComboColumn(z);
                            }
                        }
                    }
                },true);
                
                scope.$watch("ngModel",function(n,o){
                    // if(scope.ngModel)
                    if(scope.ngModel && scope.ngModel.rows)
                    scope.mygrid.parse(scope.ngModel, "json");
                    //scope.mygrid.selectRow(0);
                });

                scope.mygrid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
                    if(stage == 2){
                        var isValidated = true;
                        if(scope.mygrid._validators &&
                            scope.mygrid._validators.data &&
                            scope.mygrid._validators.data.length>cInd &&
                            scope.mygrid._validators.data[cInd] != ""){
                            // 验证器检测是否有效
                            isValidated = scope.mygrid.validateCell(rId,cInd);
                        }
                        if(isValidated){
                            updateModel(scope.mygrid);
                            return true;
                        }else{
                            return false;
                        }
                    }
                });

                $("#"+_add_id).off("click").on("click",function(){
                    var pass = true;
                    scope.mygrid.forEachRow(function(rId){
                        scope.mygrid.forEachCell(rId,function(cellObj,colIdx){
                            if(pass &&
                                scope.mygrid._validators &&
                                scope.mygrid._validators.data &&
                                scope.mygrid._validators.data.length>colIdx &&
                                scope.mygrid._validators.data[colIdx] != ""){
                                pass = scope.mygrid.validateCell(rId,colIdx);
                            }
                        });
                    });
                    if(!pass){
                        layer.alert("请填写有效数据，再新增！（双击即可编辑）",{icon:7});
                        return;
                    }
                    scope._add_rowid = scope._add_rowid?(scope._add_rowid+1):(scope.mygrid.getRowsNum()+1);
                    var ids = scope.mygrid.getAllRowIds(".");
                    while(ids.indexOf(scope._add_rowid)>=0){
                        scope._add_rowid++;
                    }
                    scope.mygrid.addRow(scope._add_rowid,new Array(cols+1));
                    scope.mygrid.selectRowById(scope._add_rowid);

                    // 更新模型
                    updateModel(scope.mygrid);
                });

                $("#"+_delete_id).off("click").on("click",function(){
                    var selectedId = scope.mygrid.getSelectedRowId();
                    if(selectedId == null) {
                        if(layer){
                            layer.alert("请选中要删除的记录。",{icon:7});
                        }else{
                            alert("请选中要删除的记录。");
                        }
                        return;
                    }
                    var f_delete = function(){
                        if(angular.isFunction(scope.deleteFunction)){
                            scope.deleteFunction(selectedId,function(isInscope){
                                scope.mygrid.deleteRow(selectedId);
                                scope.mygrid.selectRow(0);
                                // 更新模型
                                updateModel(scope.mygrid,isInscope);
                            })
                        }else{
                            scope.mygrid.deleteRow(selectedId);
                            scope.mygrid.selectRow(0);
                            // 更新模型
                            updateModel(scope.mygrid);
                        }
                    };
                    if(layer){
                        layer.confirm("确认要删除选中的记录吗？",{icon:3},function(idx){
                            layer.close(idx);
                            f_delete();
                        });
                    }else{
                        if(confirm("确认要删除选中的记录吗？")){
                            f_delete();
                        }
                    }
                });
            };
            refreshChart(scope)
        }
    }
}]);
