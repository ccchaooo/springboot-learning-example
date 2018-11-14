
/**
 * 初始化布局，2E类型(上下两块区域)
 * @param parent （布局所在的父容器，可以布局到document.body，也可以是div的ID）
 * @param topParam 上面区域配置参数
 * @param bottomParam 下面区域配置参数
 * 
 * 调用示例：
	var paramTop = {
		id : "searchTable",//上面区域HTML对象的ID
		height : 35//上面区域的高度（可选）
	}
	var paramBottom = {
		id : "pagebarTable",//下面区域HTML对象的ID
		height : 40//下面区域的高度（可选）
	}

	var layoutObjects = initLayout_2E(document.body, paramTop, paramBottom);
	
	参数 paramTop 和 paramBottom 中的height传入说明：
	//两个参数的height都有，则以bottom的为准，上面自动缩放
	//两个参数的height都没有，则以bottom为准(默认50)，上面自动缩放
	//top参数的height有，bottom参数的height没有，则以top为准，下面自动缩放
	//top参数的height没有，bottom参数的height有，则以bottom为准，上面自动缩放
	
 * 
 * @return 返回结果为
		{
			layout    : ,//dhxLayout布局对象
			topCell   : ,//上面布局cell对象
			bottomCell: ,//下面布局cell对象
		}
 */
function initLayout_2E(parent, topParam, bottomParam, skin){
	
	try {
		var layoutObjects;
		
		var dhxLayout = new dhtmlXLayoutObject({
			parent:     parent,    // id/object,(ID或对象) parent container where layout will be located,
			pattern:    "2E",           // string, layout's pattern 样式
			skin:       skin | "dhx_terrace",  // string, optional,"dhx_skyblue","dhx_web","dhx_terrace"
			
			offsets: {          // optional, offsets for fullscreen init
				top:    10,     // you can specify all four sides
				right:  10,     // or only the side where you want to have an offset
				bottom: 10,
				left:   10
			},
		
			cells: [// optional, cells configuration according to the pattern
		            // you can specify only the cells you want to configure
		            // all params are optional 所有参数可选
		            {
		            	id:             "a",        // id of the cell you want to configure
		            	//text:           "Text",     // header text
		            	//collapsed_text: "Text 2",   // header text for a collapsed cell
		            	header:         false,      // hide header on init 隐藏标题
		            	//width:          100,        // cell init width
		            	//height:         topParam.height,        // cell init height
		            	//collapse:       true        // collapse on init 折叠
		            	//fix_size:       [null,true] // fix cell's size, [width,height] 固定size
		            },
		            {
		            	id:             "b",        // id of the cell you want to configure
		            	//text:           "Text",     // header text
		            	//collapsed_text: "Text 2",   // header text for a collapsed cell
		            	header:         false,      // hide header on init
		            	//width:          100,        // cell init width
		            	//height:         100,        // cell init height
		            	//collapse:       true        // collapse on init
		            	//fix_size:       [true,null] // fix cell's size, [width,height]
		            }
		           ]
		});
		
		dhxLayout.cells("a").attachObject(topParam.id);
		dhxLayout.cells("b").attachObject(bottomParam.id);
		
		//两个参数的height都有，则以bottom的为准，上面自动缩放
		if(topParam.height!=null && bottomParam.height!=null){
			dhxLayout.cells("b").setHeight(bottomParam.height);
			dhxLayout.cells("b").fixSize(null,true);
			//自动调整size，第一个参数是水平(横)方向需要自动调整的cell的ID,多个ID用分号隔开;第二个参数是垂直(竖)方向需要自动调整的cell的ID。
			dhxLayout.setAutoSize("a;b", "a");
		}
		
		//两个参数的height都没有，则以bottom为准(默认50)，上面自动缩放
		if(topParam.height==null && bottomParam.height==null){
			dhxLayout.cells("b").setHeight(50);
			dhxLayout.cells("b").fixSize(null,true);
			dhxLayout.setAutoSize("a;b", "a");
		}
		
		//top参数的height有，bottom参数的height没有，则以top为准，下面自动缩放
		if(topParam.height!=null && bottomParam.height==null){
			dhxLayout.cells("a").setHeight(topParam.height);
			dhxLayout.cells("a").fixSize(null,true);
			dhxLayout.setAutoSize("a;b", "b");
		}
		
		//top参数的height没有，bottom参数的height有，则以bottom为准，上面自动缩放
		if(topParam.height==null && bottomParam.height!=null){
			dhxLayout.cells("b").setHeight(bottomParam.height);
			dhxLayout.cells("b").fixSize(null,true);
			dhxLayout.setAutoSize("a;b", "a");
		}
		
		layoutObjects = {
				layout    : dhxLayout,
				topCell   : dhxLayout.cells("a"),
				bottomCell: dhxLayout.cells("b")
		}
		
		return layoutObjects;
		
	} catch (e) {
		alert("页面布局出错！"+e);
		return null;
	}
	
}


/**
 * 初始化布局，3E类型(上中下3块区域)
 * @param parent （布局所在的父容器，可以布局到document.body，也可以是div的ID）
 * @param topParam 上面区域配置参数
 * @param midParam 中间区域配置参数
 * @param bottomParam 底部区域配置参数
 * 
 * 调用示例：
	var paramTop = {
		id : "searchTable",//上面区域HTML对象的ID
		height : 35//上面区域的高度
	}
	var paramMid = {
		id : "gridbox"//中间区域HTML对象的ID（中间不指定高度）
	}
	var paramBottom = {
		id : "pagebarTable",//底部区域HTML对象的ID
		height : 40//底部区域的高度
	}

	var layoutObjects = initLayout_3E(document.body, paramTop, paramMid, paramBottom);
	
 * 
 * @return 返回结果为
		{
			layout    : ,//dhxLayout布局对象
			topCell   : ,//上面布局cell对象
			midCell   : ,//中间布局cell对象
			bottomCell:  //底部布局cell对象
		}
 */
function initLayout_3E(parent, topParam, midParam, bottomParam, skin){
	
	try {
		var layoutObjects;
		
		var dhxLayout = new dhtmlXLayoutObject({
			parent:     parent,    // id/object,(ID或对象) parent container where layout will be located,
			pattern:    "3E",           // string, layout's pattern 样式
			skin:       skin | "dhx_terrace",  // string, optional,"dhx_skyblue","dhx_web","dhx_terrace"
			
			offsets: {          // optional, offsets for fullscreen init
				top:    10,     // you can specify all four sides
				right:  10,     // or only the side where you want to have an offset
				bottom: 10,
				left:   10
			},
		
			cells: [// optional, cells configuration according to the pattern
		            // you can specify only the cells you want to configure
		            // all params are optional 所有参数可选
		            {
		            	id:             "a",        // id of the cell you want to configure
		            	//text:           "Text",     // header text
		            	//collapsed_text: "Text 2",   // header text for a collapsed cell
		            	header:         false,      // hide header on init 隐藏标题
		            	//width:          100,        // cell init width
		            	//height:         topParam.height,        // cell init height
		            	//collapse:       true        // collapse on init 折叠
		            	fix_size:       [null,true] // fix cell's size, [width,height] 固定size
		            },
		            {
		            	id:             "b",        // id of the cell you want to configure
		            	//text:           "Text",     // header text
		            	//collapsed_text: "Text 2",   // header text for a collapsed cell
		            	header:         false,      // hide header on init
		            	//width:          100,        // cell init width
		            	//height:         100,        // cell init height
		            	//collapse:       true        // collapse on init
		            	//fix_size:       [true,null] // fix cell's size, [width,height]
		            },
		            {
		            	id:             "c",        // id of the cell you want to configure
		            	//text:           "Text",     // header text
		            	//collapsed_text: "Text 2",   // header text for a collapsed cell
		            	header:         false,      // hide header on init
		            	//width:          100,        // cell init width
		            	//height:         bottomParam.height,        // cell init height
		            	//collapse:       true        // collapse on init
		            	fix_size:       [null,true] // fix cell's size, [width,height]
		            }
		           ]
		});
		
		dhxLayout.cells("a").attachObject(topParam.id);
		dhxLayout.cells("b").attachObject(midParam.id);
		dhxLayout.cells("c").attachObject(bottomParam.id);
		
		var height_a = 35;
		if(topParam.height!=null){
			height_a = topParam.height;
		}
		var height_c = 35;
		if(bottomParam.height!=null){
			height_c = bottomParam.height;
		}
		dhxLayout.cells("a").setHeight(height_a);
		dhxLayout.cells("c").setHeight(height_c);
		
		// 自动调整size，第一个参数是水平(横)方向需要自动调整的cell的ID,多个ID用分号隔开;第二个参数是垂直(竖)方向需要自动调整的cell的ID。
		dhxLayout.setAutoSize("a;b;c", "b");
		
		layoutObjects = {
				layout    : dhxLayout,
				topCell   : dhxLayout.cells("a"),
				midCell   : dhxLayout.cells("b"),
				bottomCell: dhxLayout.cells("c")
		}
		
		return layoutObjects;
		
	} catch (e) {
		alert("页面布局出错！"+e);
		return null;
	}
	
}