
function AjaxProxy(as_ServletName){
    this.gs_servletPath = "*.AS";
    if(as_ServletName != null && as_ServletName != ""){
        this.gs_servletPath = as_ServletName;
    }
    this.gs_parameter = "";
    this.gs_cachedata = false;
    this.responseInfo = null;      // 缓存返回数据
}

AjaxProxy.prototype.setCacheData   = AjaxProxy_Method_setCacheData;
AjaxProxy.prototype.addParm        = AjaxProxy_Method_addParm;
AjaxProxy.prototype.invokeProc     = AjaxProxy_Method_invokeProc;
AjaxProxy.prototype.invokeJava     = AjaxProxy_Method_invokeJava;
AjaxProxy.prototype.getString      = AjaxProxy_Method_getString;
AjaxProxy.prototype.getInt         = AjaxProxy_Method_getInt;
AjaxProxy.prototype.getRowCount    = AjaxProxy_Method_getRowCount;

/**
 * 设置取得的数据是否缓存
 * @param {} flag
 */
function AjaxProxy_Method_setCacheData(flag){
	this.gs_cachedata = flag;
}

/**
 * 新增参数
 * @param {} as_name
 * @param {} aobj_value
 */
function AjaxProxy_Method_addParm(as_name , aobj_value){

	if(null == aobj_value){
		aobj_value = "";
	}
	if(null != this.gs_parameter && "" != this.gs_parameter){
        this.gs_parameter = this.gs_parameter + "&";
    }

    aobj_value += "";
    aobj_value = encodeURIComponent(aobj_value);
    this.gs_parameter += as_name + "=" + aobj_value;
}

/**
 * 调用数据库存储过程服务
 * @param {} as_FunctionName
 * @param {} ab_sync
 * @param {} af_callback
 * @param {} aobj_proxyObject
 */
function AjaxProxy_Method_invokeProc(as_FunctionName , ab_sync , af_callback , aobj_proxyObject){
	if(this.gs_cachedata == true){
		this.gs_parameter = "_AJAX_RETTYPE=json&_AJAX_DATA_CACHE=1&_AJAX_FUN_TYPE=procedure&_AJAX_FUNC_NAME="+ as_FunctionName + "&" + this.gs_parameter;
	}else{
		this.gs_parameter = "_AJAX_RETTYPE=json&_AJAX_DATA_CACHE=0&_AJAX_FUN_TYPE=procedure&_AJAX_FUNC_NAME="+ as_FunctionName + "&" + this.gs_parameter;
	}
    this.private_invoke(as_FunctionName , ab_sync , af_callback , aobj_proxyObject)
}

/**
 * 调用Java服务
 * @param {} as_FunctionName
 * @param {} ab_sync
 * @param {} af_callback
 * @param {} aobj_proxyObject
 */
function AjaxProxy_Method_invokeJava(as_FunctionName , ab_sync , af_callback , aobj_proxyObject){
	if(this.gs_cachedata == true){
        this.gs_parameter = "_AJAX_RETTYPE=json&_AJAX_DATA_CACHE=1&_AJAX_FUN_TYPE=java&_AJAX_FUNC_NAME="+ as_FunctionName + "&" + this.gs_parameter;
    }else{
        this.gs_parameter = "_AJAX_RETTYPE=json&_AJAX_DATA_CACHE=0&_AJAX_FUN_TYPE=java&_AJAX_FUNC_NAME="+ as_FunctionName + "&" + this.gs_parameter;
    }
    this.private_invoke(as_FunctionName , ab_sync , af_callback , aobj_proxyObject);
}


AjaxProxy.prototype.private_invoke = function(as_FunctionName , ab_sync , af_callback , aobj_proxyObject){
	if(null == ab_sync){
        ab_sync = false;
    }

    //构造XML-HTTP对象
    var lobj_xmlhttp = null;
    if ( window.XMLHttpRequest )
        lobj_xmlhttp = new XMLHttpRequest();
    else if ( window.ActiveXObject ) {
       try {
          lobj_xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
       }
       catch(err) {
          lobj_xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
       }
    }

    //调用
    lobj_xmlhttp.open("POST" , this.gs_servletPath , ab_sync);
    lobj_xmlhttp.setRequestHeader("charset", "utf-8");
    lobj_xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    lobj_xmlhttp.setRequestHeader("Char-Set", "utf-8");
    lobj_xmlhttp.setRequestHeader("Content-length", this.gs_parameter.length);
    lobj_xmlhttp.setRequestHeader("Connection", "close");

    var lobj_self = this;
    if(ab_sync){
        lobj_xmlhttp.send(this.gs_parameter);
        //异步调用
        lobj_xmlhttp.onreadystatechange = function(){
            /*
            * 0：请求没有发出（在调用 open() 之前）。
            * 1：请求已经建立但还没有发出（调用 send() 之前）。
            * 2：请求已经发出正在处理之中（这里通常可以从响应得到内容头部）。
            * 3：请求已经处理，响应中通常有部分数据可用，但是服务器还没有完成响应。
            * 4：响应已完成，可以访问服务器响应并使用它。
            */

            if (lobj_xmlhttp.readyState == 4){
                //lobj_self.responseText = lobj_xmlhttp.responseText;
                eval("var lobj_temp = " + lobj_xmlhttp.responseText);
                lobj_self.responseInfo = lobj_temp;

                af_callback(aobj_proxyObject);

                lobj_self   =void(0);
                lobj_xmlhttp=void(0);/*防内存泄漏*/
            }

        }
    }else{
    	//alert(this.gs_parameter);
        lobj_xmlhttp.send(this.gs_parameter);

        var responseText = lobj_xmlhttp.responseText;
        eval("var lobj_temp = " + responseText);
        this.responseInfo = lobj_temp;

        lobj_xmlhttp=void(0);/*防内存泄漏*/
    }
}

/**
 * 根据参数取得返回数据，如果是结果集数据需指定行号及字段名
 * @param {} as_name
 * @param {} ai_row
 * @param {} as_columnName
 * @return {}
 */
function AjaxProxy_Method_getString(as_name, ai_row, as_columnName){
    if (ai_row == null) {
        // 取Out数据
        return this.responseInfo[as_name];
    } else {
        ai_row = (ai_row * 1) - 1;
        // 取Result数据
        var lobj_rst = this.responseInfo[as_name];
        if(lobj_rst == null) return null;
        var lobj_row = lobj_rst.row_value[ai_row];
        if(lobj_row == null) return null;
        return lobj_row[as_columnName];
    }
}

function AjaxProxy_Method_getInt(as_name , ai_row , as_columnName){
    return this.getString(as_name , ai_row , as_columnName) * 1;
}

/**
 * 取得的指定结果集的记录数
 * @param {} as_name
 * @return {}
 */
function AjaxProxy_Method_getRowCount(as_name){
    var lobj_rst = this.responseInfo[as_name];
    if(lobj_rst == null) return -1;

    return lobj_rst.row_count;

}
