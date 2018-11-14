

var sq_r_01 = "http://ggzyjy.cdmcs.com/plate/images/sq_r_01.gif";
var sq_01   = "http://ggzyjy.cdmcs.com/plate/images/sq_01.gif";
var s_03    = "http://ggzyjy.cdmcs.com/plate/images/s_03.gif";
var s_05    = "http://ggzyjy.cdmcs.com/plate/images/s_05.gif";
var Rounded = "http://ggzyjy.cdmcs.com/plate/images/Rounded.gif";
var zk_01   = "http://ggzyjy.cdmcs.com/plate/images/zk_01.gif";
var zk_r_01 = "http://ggzyjy.cdmcs.com/plate/images/zk_r_01.gif";
var _fenge  = "http://ggzyjy.cdmcs.com/plate/images/fengeNew.gif";

if(top._funmenu_imgurl){
	sq_r_01 = top._funmenu_imgurl.sq_r_01;
	sq_01 = top._funmenu_imgurl.sq_01;
	s_03 = top._funmenu_imgurl.s_03;
	s_05 = top._funmenu_imgurl.s_05;
	Rounded = top._funmenu_imgurl.Rounded;
	zk_01 = top._funmenu_imgurl.zk_01;
	zk_r_01 = top._funmenu_imgurl.zk_r_01;
	_fenge = top._funmenu_imgurl._fenge;
}


/**
 * 
 * @param arr 栏目数据 格式为 [{name: '文件查阅', src: 'cy/wjgl_cy.html', ywqx: '', ywfjqx: ''},
							  {name: '文件起草', src: 'qc/wjgl_qc.html', ywqx: '', ywfjqx: ''}]
 * @returns {ToolBar}
 */

function FunWinMenuBar(arr) {
	var ua = navigator.userAgent.toLowerCase();
	this.bType = ua.match(/msie ([\d.]+)/)[1];
	this._navigator;    //导航栏
	this._iframeBox;    //页面容器
	this._iframePage;   //页面
	
	this._title;        //标题栏按钮容器
	this._grade;        //评分按钮
	this._tickling;     //反馈按钮
	this._btn;          //展开和收起按钮
	this._bottomLine;   //底线容器
	
	this._textWidth = 100;  //栏目容器的宽度
	if(this.bType == 6.0)
		this._scale = 10;       //栏目之间的间隔宽度
	else
		this._scale = 15;
	
	this._rowSize;          //行数
	
	this.list = [];       //初始化数据
	//this.url = url;
	this.rowList;          //行句柄 div
	
	this._selected;        //当前选中的栏目容器
	this._index = '';      //当前选中的栏目ID
	
	this.currentRow = '';  //当前选中的栏目所在的行
	
	//初始化
	this.validationPermission(arr);
	this.createComponet();
	this.autoResize();
}



//效验用户权限是否存在
FunWinMenuBar.prototype.validationPermission = function(records) {
	var allywqx = top._globPlateUserInfo.allywqx,
		allywfjqx = top._globPlateUserInfo.allywfjqx;
	
	for(var i = 0 ; i < records.length ; i++) {
		if(!records[i].ywqx && !records[i].ywfjqx) {
			this.list.push(records[i]);
		}else{
			if(null != records[i].ywfjqx && "" != records[i].ywfjqx){
				if(allywfjqx.indexOf(records[i].ywfjqx + "|") >= 0){
					this.list.push(records[i]);
				}
			}else{
				if(null != records[i].ywqx && "" != records[i].ywqx){
					if(allywqx.indexOf(records[i].ywqx + "|") >= 0){
						this.list.push(records[i]);
					}
				}
			}
		}
	}
};



FunWinMenuBar.prototype.createComponet = function() {
	var width = $(window).width(),
		height = $(window).height(),
		self = this;
	//创建导航栏容器
	this._navigator = $("<div></div>");
	this._navigator.css({
		//"border": '1px solid transparent',
		//"border-bottom": '1px solid #D2E9FF',
		"width": width+'px',
		"height": '30px',
		"position": 'absolute',
		"top": '0px',
		"left": '0px',
		"z-index": 2,
		"overflow": 'hidden',
		"background-color": 'white'
	});
	$(window.document.body).append(this._navigator);
	
	//底线样式容器
	this._bottomLine = $("<div></div>");
	this._bottomLine.css({
		//"border": '1px solid red',
		//"border-top": '1px solid #9FB1BC',
		//"border": '1px solid red',
		"font-size": '0px',
		"position": 'absolute',
		"top": '0px',
		"left": '0px',
		"height": '7px',
		"background-repeat": 'repeat-x'
	});
	this._navigator.append(this._bottomLine);
	
	//创建页面iframe容器
	this._iframeBox = $("<div></div>");
	this._iframeBox.css({
		//"border": '1px solid black',
		"width": (width)+'px',
		"height": ($(window).height()-30)+'px',
		"position": 'absolute',
		"top": '30px',
		"left": '0px',
		"overflow": 'hidden',
		"z-index": 1
	});
	$(window.document.body).append(this._iframeBox);
	
	//创建页面iframe
	this._iframePage = $("<iframe frameborder='0' marginwidth='0'></iframe>");
	this._iframePage.css({
		"width": '100%',
		"height": '100%'
	});
	this._iframeBox.append(this._iframePage);
	
	
	//创建反馈按钮
	this._grade = $("<div title='反馈'><img src='"+s_05+"'/></div>");
	this._grade.css({
		//"border": '1px solid white',
		"margin-right": '10px',
		"width": '24px',
		"height": '34px',
		"cursor": 'pointer',
		"float": 'right'
	}).mouseover(function() {
		$(this).css({
			"background-position": '0 23',
			"background-repeat": 'no-repeat',
			"background-image": 'url("'+Rounded+'")'
		});
	}).mouseout(function() {
		if($(this).attr("state") != "seleted") {
			$(this).css({
				"background-image": ''
			});
		}
	}).click(function() {
		$(this).attr("state", 'seleted');
		self._selected.attr("state", '');
		self._selected.css({
			"font-weight": 'normal',
			"background-image": ''
		});
		self._selected = $(this);
		self._iframePage.attr("src", $(this).attr("_src"));
	}).attr({
		"_type": '0',
		//"_src": this.url.fk
		"_src": top._yjfk_url
	});
	if(this.bType == 6.0) {
		this._grade.css("margin-right", '4px');
	}
	this._navigator.append(this._grade);
	
	
	//创建评分按钮
	this._tickling = $("<div title='评分'><img src='"+s_03+"'/></div>");
	this._tickling.css({
		//"border": '1px solid white',
		"margin-right": '5px',
		"width": '24px',
		"height": '34px',
		"cursor": 'pointer',
		"float": 'right'
	}).mouseover(function() {
		$(this).css({
			"background-position": '0 23',
			"background-repeat": 'no-repeat',
			"background-image": 'url("'+Rounded+'")'
		});
	}).mouseout(function() {
		if($(this).attr("state") != "seleted") {
			$(this).css({
				"background-image": ''
			});
		}
	}).click(function() {
		$(this).attr("state", 'seleted');
		self._selected.attr("state", '');
		self._selected.css({
			"font-weight": 'normal',
			"background-image": ''
		});
		self._selected = $(this);
		self._iframePage.attr("src", $(this).attr("_src"));
	}).attr({
		"_type": '0',
		//"_src": this.url.pf
		"_src": top._gnpf_url
	});
	this._navigator.append(this._tickling);
	
	//创建展开和收起
	this._btn = $("<div style='text-align:center;line-height:24px;'></div>");
	var self = this;
	this._btn.css({
		"border": '1px solid white',
		"width": '36px',
		"height": '24px',
		"cursor": 'pointer',
		"float": 'right',
		"text-align": 'center',
		"line-height": '24px',
		"margin-right": '5px',
		"background-image": 'url("'+zk_01+'")'
	}).click(function() {
		self.expand();
	}).mouseover(function() {
		if($(this).attr('isExpand') == "true") {
			$(this).css("background-image", 'url("'+sq_r_01+'")');
			//$(this).css("background-image", sq_r_01);
		}
		else {
			$(this).css("background-image", 'url("'+zk_r_01+'")');
		}
	}).mouseout(function() {
		if($(this).attr('isExpand') == "true") {
			$(this).css("background-image", 'url("'+sq_01+'")');
		}
		else {
			$(this).css("background-image", 'url("'+zk_01+'")');
		}
	}).attr("isExpand", "false");
	this._navigator.append(this._btn);
	
	//创建导航栏按钮
	this._title = $("<div></div>");
	this._title.css({
		//"border": '1px solid red',
		"width": ($(window).width() - 150)+'px',
		"height": '100%',
		"overflow": 'hidden'
	});
	this._navigator.append(this._title);
	
	
	this.refreshComponet();
	this.refreshData();
};

FunWinMenuBar.prototype.expand = function() {
	var self = this;
	if(this._btn.attr('isExpand') == "false") {
		this._btn.attr('isExpand', 'true');
		this._btn.css("background-image", 'url("'+sq_01+'")'); //收起
		
		this._navigator.css("height", (this._rowSize*30+7)+'px');
		//处理底部样式
		this._bottomLine.css({
			//"border": '1px solid transparent',
			"top": (this._rowSize*30-4)+"px",
			"background-image": 'url("'+_fenge+'")'
		});
		/*var height = this._navigator.height() - (this._rowSize*30);
		this._navigator.stop().animate({
			height: '-='+height
		}, 350, function() {
			self._navigator.css("background-position", '0 '+(self._rowSize*30-2));
		});*/
	}
	else {
		this._btn.attr('isExpand', 'false');
		this._btn.css("background-image", 'url("'+zk_01+'")'); //展开
		//初始化判断显示几行,修改高度
		if(this._rowSize > 2) {                                                        //多行
			this._navigator.css("height", 60+'px');
			/*var height = this._navigator.height() - 60;
			this._navigator.stop().animate({
				height: '-='+height
			}, 350, function() {
				self._navigator.css("background-position", '0 '+(2*30-2));
			});*/
			//处理底部样式
			this._bottomLine.css({
				//"border": '1px solid transparent',
				"border-top": '1px solid #9FB1BC',
				"top": 56+"px",
				"background-image": ''
			});
		}
		else {                                                                          //一行
			this._navigator.css("height", 30+'px');
			/*var height = this._navigator.height() - 30;
			this._navigator.stop().animate({
				height: '-='+height
			}, 350, function() {
				self._navigator.css("background-position", '0 '+(30-2));
			});*/
			//处理底部样式
			this._bottomLine.css({
				//"border": '1px solid transparent',
				//"border-top": '1px solid #9FB1BC',
				"top": 26+"px",
				"background-image": ''
			});
		}
	}
	
};

//刷新尺寸
FunWinMenuBar.prototype.refreshComponet = function() {
	var width = $(window).width(),
		height = $(window).height();

	//修改宽度
	this._navigator.css("width", width+'px');
	this._title.css("width", (width - 110)+'px');
	this._iframeBox.css("width", width+'px');
	
	this._btn.css("background-image", 'url("'+zk_01+'")'); //展开
	this._btn.attr('isExpand', 'false');
	//处理底部样式
	this._bottomLine.css({
		"width": (width-20)+'px',
		"left": '8px',
		"background-image": '',
		//"border": '1px solid transparent',
		"border-top": '1px solid #9FB1BC'
	});
	
	this.getRows();
	//初始化判断显示几行,修改高度{
	//var lanWidth = (this._textWidth+this._scale) * this.list.length;
	//if(lanWidth > $(this._title).width()) { //多行
	if(this._rowSize >= 2){
		this._navigator.css("height", '60px');
		this._iframeBox.css("top", '60px');
		this._iframeBox.css("height",(height-60)+'px');
		this._btn.css("display", 'none');
		if(this._rowSize > 2) {
			this._btn.css("display", 'block');
		}
		this._navigator.css("background-position", '0 '+(2*30-2));
		//处理底部样式
		this._bottomLine.css("top", '56px');
	}
	else {                                                                          //一行
		this._navigator.css("height", '30px');
		this._iframeBox.css("top", '30px');
		this._iframeBox.css("height",(height-30)+'px');
		this._btn.css("display", 'none');
		this._navigator.css("background-position", '0 '+(30-2));
		//处理底部样式
		this._bottomLine.css("top", '26px');
	}
};

//计算当前有好多行
FunWinMenuBar.prototype.getRows = function() {
	this._rowSize = 1;
	var width = this._title.width(),
		len = 0;
	for(var i = 0 ; i < this.list.length ; i++) {
		this._textWidth = this.list[i].name.length*13;
		//len = (i+1-counter)*(this._textWidth+this._scale);
		len += (this._textWidth+this._scale);
		if(len > width) {
			this._rowSize ++;
			len = 150;
		}
	}
};

//计算尺寸变化之后选中的栏目所在的行数
FunWinMenuBar.prototype.getCurrentRow = function() {
	this._rowSize = 1;
	var width = this._title.width(),
		len = 0;
	for(var i = 0 ; i < this.list.length ; i++) {
		this._textWidth = this.list[i].name.length*13;
		//len = (i+1-counter)*(this._textWidth+this._scale);
		len += (this._textWidth+this._scale);
		if(len > width) {
			this._rowSize ++;
			len = 150;
		}
		if(this._index == i) {
			this.currentRow = this._rowSize;
		}
	}
};



//刷新栏目数据
FunWinMenuBar.prototype.refreshData = function() {
	//this.recombination();
	var self = this;
	this._rowSize = 1;
	this._title.empty();
	//计算行数
	var width = this._title.width();
	
	var $boxRow = $("<div></div>").css({
		//"border": '1px solid red',
		"width": '100%',
		"height": '30px'
	});
	this._title.append($boxRow);
	
	var len = 0;
//	if(this.bType == 6.0)
//		len += 50;
//	else 
//		len = 0;
	for(var i = 0 ; i < this.list.length ; i++) {
		var textWidth = this.list[i].name.length*13;
		//len = (i+1-counter)*(this._textWidth+this._scale);
		len += (textWidth+this._scale);
		if(len > width) {
			//创建    行容器
			$boxRow = $("<div></div>");
			$boxRow.css({
				//"border": '1px solid red',
				"width": '100%',
				"height": '30px'
			});
			this._title.append($boxRow);
			
			this._rowSize ++;
			if(this._rowSize <= 2) {
				$boxRow.attr("state", 'fixed');
			}
			else {
				$boxRow.attr("state", 'astable');
			}
			len = 150;
		}
		
		//底部图片的x坐标
		var xWidth = (this.list[i].name.length * 12 - 24) / 2;
		var $div = $("<div></div>");
		$div.css({
			"width": textWidth+'px',
			"height": '100%',
			"margin-left": this._scale+'px',
			"float": 'left',
			"font-size": '12px',
			"line-height": '30px',
			"text-align": 'left',
			"font-weight": 'normal',
			"color": '#6C6C6C',
			"cursor": 'pointer'
		}).click(function() {
			//点击当前选中的按钮返回
			if($(self._selected).get(0) == this){
				return ;
			}
			//首先判断是否是展开的
			if(self._btn.attr('isExpand') == 'true') { //展开的
				//判断所选择的节点是否是第1,2个
				var firstChild = $(this).parent().parent().children(":first"),
					secondChild = firstChild.next();
				if($(this).parent().attr("state") == "astable") {
					$(this).parent().insertBefore(secondChild);
					$(this).parent().attr("state", 'fixed');
					secondChild.attr("state", 'astable');
				}
			}
			self.refreshComponet();
			
			//处理选中状态
			$(this).attr("state", 'seleted').css({
				"font-weight": 'bold',
				"background-position": $(this).attr("_xWidth")+' 23',
				"background-repeat": 'no-repeat',
				"background-image": 'url("'+Rounded+'")'
			});
			self._selected.attr("state", '').css({
				"font-weight": 'normal',
				"background-position": $(this).attr("_xWidth")+' 23',
				"background-repeat": 'no-repeat',
				"background-image": ''
			});
			self._selected = $(this);
			self._index = parseInt($(this).attr("_index"));
			//加载页面
			self._iframePage.attr("src", $(this).attr("url"));
			
		}).mouseover(function() {
			//this.style.fontWeight = 'bold';
			$(this).css({
				"font-weight": 'bold',
				"background-position": $(this).attr("_xWidth")+' 23',
				"background-repeat": 'no-repeat',
				"background-image": 'url("'+Rounded+'")'
			});
		}).mouseout(function() {
			if($(this).attr("state") != "seleted") {
				//this.style.fontWeight = 'normal';
				$(this).css({
					"font-weight": 'normal',
					"background-image": ''
				});
			}
		}).attr({
			"url": this.list[i].src,
			"_index": i,
			"_xWidth": xWidth,
			"_type": '1'
		});
		//当前选中的栏目, 默认选中第一个
		
		if(typeof this._index == "number") {
			if(this._selected.attr("_type") == 1 && this._index == i) {
				this._selected = $div;
				this._selected.attr("state", 'seleted').css({
					"font-weight": 'bold',
					"background-position": xWidth+' 23',
					"background-repeat": 'no-repeat',
					"background-image": 'url("'+Rounded+'")'
				});
			}
		}
		else {
			if(i == 0) {
				this._selected = $div;
				this._selected.attr("state", 'seleted').css({
					"font-weight": 'bold',
					"background-position": xWidth+' 23',
					"background-repeat": 'no-repeat',
					"background-image": 'url("'+Rounded+'")'
				});
				this._index = 0;
				//加载页面
				self._iframePage.attr("src", this.list[i].src);
			}
		}
		
		$div.text(this.list[i].name);
		$boxRow.append($div);
	}
	
	//当前选中的行移动到第二行
	this.getCurrentRow();
	if(typeof this.currentRow == "number" && this.currentRow > 2) {
		var target = this._title.children(":first").next();
		var current = target;
		for(var i = 3 ; i <= this.currentRow ; i++) {
			current = current.next();
		}
		current.insertBefore(target);
		
		current.attr("state", 'fixed');
		target.attr("state", 'astable');
	}
};

//窗口尺寸刷新后处理函数
FunWinMenuBar.prototype.autoResize = function() {
	var self = this;
	$(window).resize(function() {
		self.refreshComponet();
		self.refreshData();
	});
};