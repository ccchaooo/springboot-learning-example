/*
Content-Type: multipart/related; boundary="_CLOUDGAMER"

--_CLOUDGAMER
Content-Location:blankImage
Content-Transfer-Encoding:base64

R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==
*/


/**
 * 图片预览
 * @type 
 */

var ImagePreview = function(file, img, options) {
	this.Image = img;
	this.getfilemode = "";
	this._file_id = "";//存文件域的id:解决dwr上传方式时出现的克隆问题
	
	if(typeof file == "string"){
		this.getfilemode = "url";
		this.file = file;
	}else{
		this.getfilemode = "file";
		this.file = file; //$$(file);//文件对象
		if(file.id){
			this._file_id = file.id;
		}
	}
	
	this.img = $$(img);//预览图片对象
	
	this._preload = null;//预载图片对象
	this._data = "";//图像数据
	this._upload = null;//remote模式使用的上传文件对象
	
	var opt = this._setOptions(options);
	
	this.action = opt.action;
	if(null == opt.action || opt.action == undefined){
		this.action = _CONTEXTPATH_ + "script/public/workmain/object/viewImg.jsp";
	}
	this.timeout = opt.timeout;
	this.ratio = opt.ratio;
	this.maxWidth = opt.maxWidth;
	this.maxHeight = opt.maxHeight;
	
	// 判断img对象是否设置了最大宽高
//	var defh = $("#" + img).height();
//	var defw = $("#" + img).width();
//	if(this.maxWidht == 0 || this.maxHeight == 0){
//		this.maxWidth = defw;
//		this.maxHeight = defh;
//	}
	var maxh = $("#" + img).attr("maxheight");
	if(StringUtil.isNull(maxh) || maxh == ""){
		maxh = 0;
	}
	var maxw = $("#" + img).attr("maxwidth");
	if(StringUtil.isNull(maxw) || maxw == ""){
		maxw = 0;
	}
	this.maxWidth = maxw;
	this.maxHeight = maxh;
	
	this.onCheck = opt.onCheck;
	
	var okfun = $("#" + img).attr("imgokfun");
	if(StringUtil.isNull(okfun) || okfun == ""){
		okfun = "";
	}
	this.onShow = okfun;
	var errfun = $("#" + img).attr("imgerrfun");
	if(StringUtil.isNull(errfun) || errfun == ""){
		errfun = "";
	}
	this.onErr = errfun
//	this.onShow = opt.onShow;
//	this.onErr = opt.onErr;
	
	//设置数据获取程序
	this._getData = this._getDataFun(opt.mode);
	//设置预览显示程序
	this._show = opt.mode !== "filter" ? this._simpleShow : this._filterShow;
};

/**
 * 根据浏览器类型设置取本地图片模式
 * @type 
 */
ImagePreview.MODE = $BRW.ie7 || $BRW.ie8 ? "filter" :
	$BRW.firefox ? "domfile" :
	$BRW.opera || $BRW.chrome || $BRW.safari ? "remote" : "simple";

/**
 * 设置透明图片
 * @type 
 */
//ImagePreview.TRANSPARENT = $BRW.ie7 || $BRW.ie6 ?
//	"mhtml:" + document.scripts[document.scripts.length - 1].getAttribute("src", 4) + "!blankImage" :
//	"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

ImagePreview.TRANSPARENT = $BRW.ie7 || $BRW.ie6 ?
	"mhtml:" + _CONTEXTPATH_ + "script/public/workmain/object/Image.js" + "!blankImage" :
	"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

ImagePreview.exts = "jpg|jpeg|gif|bmp|png";
ImagePreview.paths = "|";


/**
 * 对象中的方法
 * @type 
 */
ImagePreview.prototype = {
		
		// 检查文件是否是合法的图片文件
		CheckImgFileStyle: function(filename){
			var value = filename;
			var check = true;
			if ( !value ) {
				check = false; 
				this._error("请选择图像文件!");
				//alert("请选择图像文件！");
			} else if ( !RegExp( "\.(?:" + ImagePreview.exts + ")$$", "i" ).test(value) ) {
				check = false; 
				this._error("选择的文件类型只能是以下类型：" + ImagePreview.exts);
				//alert("选择的文件类型只能是一下类型：" + ImagePreview.exts);
			}
			//check || ResetFile(this.file);
			return check;
		},
	
		// 设置默认属性
		_setOptions: function(options) {
		    	this.options = {//默认值
				mode:		ImagePreview.MODE,//预览模式
				ratio:		0,//自定义比例
				maxWidth:	0,//缩略图宽度
				maxHeight:	0,//缩略图高度
				onCheck:	function(){},//预览检测时执行
				onShow:		function(){},//预览图片时执行
				onErr:		function(){},//预览错误时执行
				//以下在remote模式时有效
				action:		undefined,//设置action
				timeout:	0//设置超时(0为不设置)
		    };
		    if(this.getfilemode == 'url'){
		    	this.options.mode = 'simple';
		    }
		    return $$.extend(this.options, options || {});
		},
		//开始预览
	  	preview: function() {
	  		
			if ( this.file && false !== this.onCheck() ) {
				if(this.getfilemode != "url"){
					// 先检查文件是否合法
					if(!this.CheckImgFileStyle(this.file.value))return;
				}
				this._preview( this._getData() );
			}
	  	},
	  	
  
		  //根据mode返回数据获取程序
		_getDataFun: function(mode) {
			switch (mode) {
				case "filter" :
					return this._filterData;
				case "domfile" :
					return this._domfileData;
				case "remote" :
					return this._remoteData;
				case "simple" :
				default :
					return this._simpleData;
			}
		},
  
	    //滤镜数据获取程序
	    _filterData: function() {
	    	if(!this.file.id && this._file_id){//不存在id时取初始化时的id对象
	    		this.file = document.getElementById(this._file_id);
	    	}
	    	
	    	this.file.select();
			try{
				return document.selection.createRange().text;
			} finally { document.selection.empty(); }
	  	},
	  	//domfile数据获取程序
	  	_domfileData: function() {
			return this.file.files[0].getAsDataURL();
	  	},
	  	//远程数据获取程序
	  	_remoteData: function() {
			this._setUpload();
			this._upload && this._upload.upload();
	  	},
	  	//一般数据获取程序
	  	_simpleData: function() {
	  		if(this.getfilemode != "url"){
				return this.file.value;
	  		}else{
	  			return this.file;
	  		}
				
	  	},
	  
	  	//设置remote模式的上传文件对象
  	  	_setUpload: function() {
			if ( !this._upload && this.action !== undefined && typeof ImageFileUpLoad === "function" ) {
				var oThis = this;
				this._upload = new ImageFileUpLoad(this.file, {
					onReady: function(){
						this.action = oThis.action; this.timeout = oThis.timeout;
						var parameter = this.parameter;
						parameter.ratio = oThis.ratio;
						parameter.width = oThis.maxWidth;
						parameter.height = oThis.maxHeight;
					},
					onFinish: function(iframe){
						try{
							oThis._preview( iframe.contentWindow.document.body.innerHTML );
						}catch(e){ oThis._error("remote error"); }
					},
					onTimeout: function(){ oThis._error("timeout error"); }
				});
			}
	  	},
	  	
	  	//预览程序
  		_preview: function(data) {
			//空值或相同的值不执行显示
			if ( !!data && data !== this._data ) {
				this._data = data; this._show();
			}
  		},
  		
  		//设置一般预载图片对象
  		_simplePreload: function() {
			if ( !this._preload ) {
				var preload = this._preload = new Image();
				oThis = this;
				onload = function(){ oThis._imgShow( oThis._data, this.width, this.height ); };
				this._onload = function(){ this.onload = null; onload.call(this); };
				preload.onload = $$B.ie ? this._onload : onload;
				preload.onerror = function(){ oThis._error(); };
			} else if ( $$B.ie ) {
				this._preload.onload = this._onload;
			}
  		},
  		//一般显示
  		_simpleShow: function() {
			this._simplePreload();
			this._preload.src = this._data;
  		},
  		
  		//设置滤镜预载图片对象
  		_filterPreload: function() {
			if ( !this._preload ) {
				var preload = this._preload = document.createElement("div");
				//隐藏并设置滤镜
				$$D.setStyle( preload, {
					width: "1px", height: "1px",
					visibility: "hidden", position: "absolute", left: "-9999px", top: "-9999px",
					filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image')"
				});
				//插入body
				var body = document.body; body.insertBefore( preload, body.childNodes[0] );
			}
  		},
  		
  		//滤镜显示
  		_filterShow: function() {
			this._filterPreload();
			var preload = this._preload,
				data = this._data.replace(/[)'"%]/g, function(s){ return escape(escape(s)); });
			try{
				preload.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = data;
			}catch(e){ this._error("filter error"); return; }
			//设置滤镜并显示
			this.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + data + "\")";
			this._imgShow( ImagePreview.TRANSPARENT, preload.offsetWidth, preload.offsetHeight );
  		},
  		//显示预览
  		_imgShow: function(src, width, height) {
			var img = this.img, style = img.style,
				ratio = Math.max( 0, this.ratio ) || Math.min( 1,
						Math.max( 0, this.maxWidth ) / width  || 1,
						Math.max( 0, this.maxHeight ) / height || 1
					);
			if(null == width || null == height)return;
			// 和最大尺寸的间距
			var marginTop = (this.maxHeight - Math.round( height * ratio ))/2 + "px";
			var marginLeft = (this.maxWidth - Math.round( width * ratio ))/2  + "px";
			//设置预览尺寸
			style.width = Math.round( width * ratio ) + "px";
			style.height = Math.round( height * ratio ) + "px";
			style.marginTop = marginTop;
			
			//设置src
			img.src = src;
			if(this.onShow != "" && this.onShow.length > 0){
	  			eval(this.onShow + "('" + this.Image + "')");
	  		}
			//this.onShow();
  		},
  
  		//销毁程序
  		dispose: function() {
			//销毁上传文件对象
			if ( this._upload ) {
				this._upload.dispose(); this._upload = null;
			}
			//销毁预载图片对象
			if ( this._preload ) {
				var preload = this._preload, parent = preload.parentNode;
				this._preload = preload.onload = preload.onerror = null;
				parent && parent.removeChild(preload);
			}
			//销毁相关对象
			this.file = this.img = null;
  		},
  		//出错
	  	_error: function(err) {
	  		if(this.onErr != "" && this.onErr.length > 0){
	  			eval(this.onErr + "('" + this.Image + "', '" + err + "')");
	  		}
			//this.onErr(err);
	  	}
}
