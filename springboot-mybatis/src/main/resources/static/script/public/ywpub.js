/*
 *=====================================================================
 *1、初始化基础代码下拉列表：同步                            initBaseCodeSelect
 *2、初始化基础代码select2下拉列表：同步         initBaseCodeSelect2
 *======================================================================
*/

/**
 * 1、初始化基础代码下拉列表：同步
 * @param $container 下拉列表
 * @param codeType 代码种类
 * @param defVal 默认选中值
 * @param allFlag 显示全部时的字符,传null不显示
 * @param allFlag_val 显示全部时的value值,默认空字符串""
 */
function initBaseCodeSelect($container, codeType, defVal, allFlag, allFlag_val){
	if($container){
		$container.empty();
	}else{
		return null;
	}
	
	var option_data = [];
	var ajax = new AjaxProxy();
	ajax.setCacheData(false);
	
	ajax.addParm("PC_CODETYPE", codeType);  //代码种类
	ajax.invokeProc("APPUSER.BJSY_QYPT_PUB.PW_BASECODE", false);
	
	var row = ajax.getRowCount("P_RESULT");
	
	if(row>0){
		if($container){
			var allFlagV = "";
			if(allFlag_val){
				allFlagV = allFlag_val;
			}
			if(allFlag){
				$container.append("<option value='"+allFlagV+"'>"+allFlag+"</option>");
			}else if("" == allFlag){
				$container.append("<option value='"+allFlagV+"'>&nbsp;</option>");
			}
			
			for(var i=1;i<=row;i++){
				
				var data={
						C_DM    : ajax.getString("P_RESULT",i,"C_DM"),
						C_MC    : ajax.getString("P_RESULT",i,"C_MC"),
						C_DMMC  : ajax.getString("P_RESULT",i,"C_DMMC"),
						C_DEF   : ajax.getString("P_RESULT",i,"C_DEF")
				};
				
				var selectStr = "";
				if(data.C_DEF!=null && data.C_DEF!=""){//缺省使用的
					selectStr = "selected='selected'";
				}
				
				var optionValue = "", optionTitle = "", optionMC = "";
				
				optionValue = data.C_DM;
				optionTitle = data.C_MC;
				optionMC    = data.C_DMMC;
				
				$container.append("<option value='"+optionValue+"' title='"+optionTitle+"' "+selectStr+" >"+optionMC+"</option>");
				
				option_data.push(data);
				
			}//end for
			
			if(defVal){
				$("option[value='"+defVal+"']", $container).attr({selected: true});    
			}
		}
	}
	
	return option_data;
}

/**
 * 2、初始化基础代码select2下拉列表：同步
 * @param $container 下拉列表
 * @param codeType 代码种类
 * @param cDms 代码值（多个用逗号,分隔、空值则全部该代码分类的全部数据）
 * @param isMultiple 是否多选（true/false）
 * @param defVal 默认选中值（数组）
 * @param allFlag_txt 显示全部时的字符,传null不显示
 * @param allFlag_val 显示全部时的value值,默认空字符串""
 */
function initBaseCodeSelect2($container, codeType, cDms, isMultiple, defVal, allFlag_txt, allFlag_val){
	if($container){
		$container.empty();
	}else{
		return null;
	}
	
	var option_data = [];
	var ajax = new AjaxProxy();
	ajax.setCacheData(false);
	
	ajax.addParm("PC_CODETYPE", codeType);  //代码种类
	ajax.addParm("PC_DM",       cDms);      //代码值（多个用逗号,分隔、空值则全部该代码分类的全部数据）
	ajax.invokeProc("APPUSER.BJSY_QYPT_PUB.PW_BASECODE", false);
	
	var row = ajax.getRowCount("P_RESULT");
	
	if(row>0){
		var datas = [];
		
		var allFlagV = "";
		if(allFlag_val){
			allFlagV = allFlag_val;
		}
		var allFlagTxt = "";
		if(allFlag_txt!=null && allFlag_txt!=""){
			allFlagTxt = allFlag_txt;
		}else if("" == allFlag_txt){
			allFlagTxt = "&nbsp;";
		}
		var adata2={
				id    : allFlagV,
				text  : allFlagTxt
		};
		datas.push(adata2);
		
		for(var i=1;i<=row;i++){
			
			var data={
					C_DM    : ajax.getString("P_RESULT",i,"C_DM"),
					C_MC    : ajax.getString("P_RESULT",i,"C_MC"),
					C_DMMC  : ajax.getString("P_RESULT",i,"C_DMMC"),
					C_DEF   : ajax.getString("P_RESULT",i,"C_DEF")
			};
			
			var data2={
					id    : ajax.getString("P_RESULT",i,"C_DM"),
					text  : ajax.getString("P_RESULT",i,"C_MC")
			};
			datas.push(data2);
			
			option_data.push(data);
		}
		$container.select2({
			data: datas,
			placeholder:'请选择',
			allowClear:true,
			multiple:isMultiple
		})
		
		$container.val(defVal).trigger('change');//默认选中
	}
	return option_data;
}
