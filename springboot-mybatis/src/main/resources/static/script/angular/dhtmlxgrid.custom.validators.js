// 自定义验证器
// 官方文档：https://docs.dhtmlx.com/grid__validation.html
// eg1 最小长度为4,
dhtmlxValidation.isMin4=function(a){
    return a.length>=4;
};
// eg2 最大长度10
dhtmlxValidation.isMax10=function(a){
    return a.length<=10;
};

//eg3 任意填写
dhtmlxValidation.isArbitrarily=function(a){
    return true;
};