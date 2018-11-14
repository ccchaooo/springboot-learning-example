//===============================
// 初始化工作
//===============================
/*
 * 本JS用于嵌入每个页面，进行环境等初始化工作
 */

var _CONTEXTPATH_ = "/PLATE/";

/**
 * 当前浏览器类型
 */
var isIE = (navigator.userAgent.toLowerCase().indexOf("msie")) != -1 || (navigator.userAgent.indexOf('Trident') >= 0);
var isIE8 = !!window.XDomainRequest&&!!document.documentMode;
var isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.0") != -1 && !isIE8;
var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6.0") != -1;
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;   // firefox
var isOpera = navigator.userAgent.toLowerCase().indexOf("opera") != -1;
var isQuirks = document.compatMode == "BackCompat";
var isStrict = document.compatMode == "CSS1Compat";
var isBorderBox = isIE && isQuirks;

/**
 * 浏览器对象
 */
$BRW = (function(ua){
    var b = {
        msie: /msie/.test(ua) && !/opera/.test(ua),
        opera: /opera/.test(ua),
        safari: /webkit/.test(ua) && !/chrome/.test(ua),
        firefox: /firefox/.test(ua),
        chrome: /chrome/.test(ua)
    };
    var vMark = "";
    for (var i in b) {
        if (b[i]) { vMark = "safari" == i ? "version" : i; break; }
    }
    b.version = vMark && RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1 : "0";
    
    b.ie = b.msie;
    b.ie6 = b.msie && parseInt(b.version, 10) == 6;
    b.ie7 = b.msie && parseInt(b.version, 10) == 7;
    b.ie8 = b.msie && parseInt(b.version, 10) == 8;
    
    return b;
})(window.navigator.userAgent.toLowerCase());


/**
 * 初始化环境
 */
function initExplorer(){
    if(isGecko){
        var p = HTMLElement.prototype;
        p.__defineSetter__("innerText",function(txt){this.textContent = txt;});
        p.__defineGetter__("innerText",function(){return this.textContent;});
        p.insertAdjacentElement = function(where,parsedNode){
            switch(where){
              case "beforeBegin":
                this.parentNode.insertBefore(parsedNode,this);
                break;
              case "afterBegin":
                this.insertBefore(parsedNode,this.firstChild);
                break;
              case "beforeEnd":
                this.appendChild(parsedNode);
                break;
              case "afterEnd":
                if(this.nextSibling)
                  this.parentNode.insertBefore(parsedNode,this.nextSibling);
                else
                  this.parentNode.appendChild(parsedNode);
                break;
              }
        };
        p.insertAdjacentHTML = function(where,htmlStr){
            var r=this.ownerDocument.createRange();
            r.setStartBefore(this);
            var parsedHTML=r.createContextualFragment(htmlStr);
            this.insertAdjacentElement(where,parsedHTML);
        };
        p.attachEvent = function(evtName,func){
            evtName = evtName.substring(2);
            this.addEventListener(evtName,func,false);
        }
        p.detachEvent = function(evtName,func){
            evtName = evtName.substring(2);
            this.removeEventListener(evtName,func,false);
        }
        window.attachEvent = p.attachEvent;
        window.detachEvent = p.detachEvent;
        document.attachEvent = p.attachEvent;
        document.detachEvent = p.detachEvent;
        p.__defineGetter__("currentStyle", function(){
            return this.ownerDocument.defaultView.getComputedStyle(this,null);
      });
        p.__defineGetter__("children",function(){
        var tmp=[];
        for(var i=0;i<this.childNodes.length;i++){
            var n=this.childNodes[i];
          if(n.nodeType==1){
            tmp.push(n);
          }
        }
        return tmp;
      });
        p.__defineSetter__("outerHTML",function(sHTML){
        var r=this.ownerDocument.createRange();
        r.setStartBefore(this);
        var df=r.createContextualFragment(sHTML);
        this.parentNode.replaceChild(df,this);
        return sHTML;
      });
      p.__defineGetter__("outerHTML",function(){
        var attr;
            var attrs=this.attributes;
            var str="<"+this.tagName.toLowerCase();
            for(var i=0;i<attrs.length;i++){
                attr=attrs[i];
                if(attr.specified){
                    str+=" "+attr.name+'="'+attr.value+'"';
                }
            }
            if(!this.hasChildNodes){
                return str+">";
            }
            return str+">"+this.innerHTML+"</"+this.tagName.toLowerCase()+">";
      });
        p.__defineGetter__("canHaveChildren",function(){
          switch(this.tagName.toLowerCase()){
                case "area":
                case "base":
                case "basefont":
                case "col":
                case "frame":
                case "hr":
                case "img":
                case "br":
                case "input":
                case "isindex":
                case "link":
                case "meta":
                case "param":
                return false;
        }
        return true;
      });
      Event.prototype.__defineGetter__("srcElement",function(){
        var node=this.target;
        while(node&&node.nodeType!=1)node=node.parentNode;
        return node;
      });
      p.__defineGetter__("parentElement",function(){
            if(this.parentNode==this.ownerDocument){
                return null;
            }
            return this.parentNode;
        });
    }else{
        // 修复IE6BUG，使之能缓存图片
        try {
            document.documentElement.addBehavior("#default#userdata");
            document.execCommand('BackgroundImageCache', false, true);
        } catch(e) {alert(e)};
    }
}

//===============================
// 取得当前浏览器
//===============================
function getExplorerType(){
 var browser = {};
 var userAgent = navigator.userAgent.toLowerCase();
 var s;
 (s = userAgent.match(/msie ([\d.]+)/))   
         ? browser.ie = s[1]   
         : (s = userAgent.match(/firefox\/([\d.]+)/))   
                 ? browser.firefox = s[1]   
                 : (s = userAgent.match(/chrome\/([\d.]+)/))   
                         ? browser.chrome = s[1]   
                         : (s = userAgent.match(/opera.([\d.]+)/))   
                                 ? browser.opera = s[1]   
                                 : (s = userAgent   
                                         .match(/version\/([\d.]+).*safari/))   
                                         ? browser.safari = s[1]   
                                         : 0;

 
    if(browser.ie)
        return "ie";
    if(browser.firefox)
        return "firefox";
    if(browser.chrome)
        return "chrome";
    if(browser.opera)
        return "opera";
    if(browser.safari)
        return "safari";
    
 return "ie";
}

/**
 * 取得当前网站的CONTEXTPATH
 */
var scripts = document.getElementsByTagName("script");
for(var i=0;i<scripts.length;i++){
    if(/.*workmain\/init\.js$/g.test(scripts[i].getAttribute("src"))){
        var jsPath = scripts[i].getAttribute("src").replace(/workmain\/init\.js$/g,'');
        if(jsPath.indexOf("/")==0||jsPath.indexOf("://")>0){
            CONTEXTPATH = jsPath;
            break;
        }
        var arr1 = jsPath.split("/");
        var path = window.location.href;
        if(path.indexOf("?")!=-1){
            path = path.substring(0,path.indexOf("?"));
        }
        var arr2 = path.split("/");
        arr2.splice(arr2.length-1,1);
        for(var i=0;i<arr1.length;i++){
            if(arr1[i]==".."){
                arr2.splice(arr2.length-1,1);
            }
        }
        _CONTEXTPATH_ = arr2.join('/')+'/';
        break;
    }
}

//=========================================
// 网络服务对象
//=========================================
var NetWorkSrv = {};
NetWorkSrv.Pool = [];

NetWorkSrv.getXMLHttpRequest = function(){
    for(var i=0; i < NetWorkSrv.Pool.length;i++){
        if(NetWorkSrv.Pool[i][1]=="0"){
            NetWorkSrv.Pool[i][1] = "1";
            return NetWorkSrv.Pool[i][0];
        }
    }
    var request;
    if (window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        for(var i =5;i>1;i--){
      try{
        if(i==2){
            request = new ActiveXObject( "Microsoft.XMLHTTP" );
        }else{
            request = new ActiveXObject( "Msxml2.XMLHTTP." + i + ".0" );
        }
      }catch(ex){}
    }
    }
    NetWorkSrv.Pool.push([request,"1"]);
    return request;
};

NetWorkSrv.loadURL = function(url, func){
    var Request = NetWorkSrv.getXMLHttpRequest();
    Request.open("GET", url, true);
    Request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    Request.onreadystatechange = function(){
        if (Request.readyState==4&&Request.status==200) {
            try{
                if(func){
                    func(Request.responseText);
                };
            }finally{
                for(var i=0;i < NetWorkSrv.Pool.length;i++){
                    if(NetWorkSrv.Pool[i][0]==Request){
                        NetWorkSrv.Pool[i][1] = "0";
                        break;
                    }
                }
                Request = null;
                func = null;
            }
        }
    }
    Request.send(null);
};

NetWorkSrv.addJs = function(rootObj, jsUrl){
    var Request = NetWorkSrv.getXMLHttpRequest();
    Request.open("GET", jsUrl, true);
    Request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    Request.onreadystatechange = function(){
        if (Request.readyState==4&&Request.status==200) {
            try{
                var oScript = document.createElement( "script" );
                oScript.type = "text/javascript"; 
                oScript.text = Request.responseText; 
                rootObj.appendChild(oScript);
            }finally{
                for(var i=0;i < NetWorkSrv.Pool.length;i++){
                    if(NetWorkSrv.Pool[i][0]==Request){
                        NetWorkSrv.Pool[i][1] = "0";
                        break;
                    }
                }
                Request = null;
                func = null;
            }
        }
    };
    Request.send(null);
};

NetWorkSrv.loadScript = function(url){
    document.write('<script type="text/javascript" src="' + url + '"></script>') ;
};

NetWorkSrv.loadCSS = function(url){
    if(isGecko){
        var e = document.createElement('LINK') ;
        e.rel   = 'stylesheet' ;
        e.type  = 'text/css' ;
        e.href  = url ;
        document.getElementsByTagName("HEAD")[0].appendChild(e) ;
    }else{
        document.createStyleSheet(url);
    }
};

/**
 * 在当前页面装载动态CSS
 */
NetWorkSrv.dynLoadCss = function(cssCode){
    var doc = document;
    var headElement = doc.getElementsByTagName("head")[0]; 
    var styleElements = headElement.getElementsByTagName("style"); 
    if(styleElements.length == 0){//如果不存在style元素则创建 
        if(doc.createStyleSheet){    //ie 
            doc.createStyleSheet(); 
        }else{ 
            var tempStyleElement = doc.createElement('style');//w3c 
            tempStyleElement.setAttribute("type", "text/css"); 
            headElement.appendChild(tempStyleElement); 
        } 
    } 
    var  styleElement = styleElements[0]; 
    var media = styleElement.getAttribute("media"); 
    if(media != null && !/screen/.test(media.toLowerCase()) ){ 
        styleElement.setAttribute("media","screen"); 
    } 
    if(styleElement.styleSheet){    //ie 
        styleElement.styleSheet.cssText += cssCode; 
    }else if(doc.getBoxObjectFor){ 
        styleElement.innerHTML += cssCode;//火狐支持直接innerHTML添加样式表字串 
    }else{ 
        styleElement.appendChild(doc.createTextNode(cssCode)) 
    } 

};

/**
 * 装载动态JS代码
 */
NetWorkSrv.dynLoadJs = function(jsText){
      var oHead = document.getElementsByTagName('HEAD').item(0); 
      var oScript = document.createElement( "script" ); 
      oScript.language = "javascript"; 
      oScript.type = "text/javascript"; 
      oScript.defer = true; 
      oScript.text = jsText; 
      oHead.appendChild( oScript ); 
}

/**
 * 同步方式装载JS文件
 * @param {} id
 * @param {} fileurl
 * @return {Boolean}
 */
NetWorkSrv.synLoadJsFile = function(fileurl){
	var  xmlHttp = NetWorkSrv.getXMLHttpRequest();
    
    //采用同步加载
    xmlHttp.open("GET", fileurl, false);
    //发送同步请求，如果浏览器为Chrome或Opera，必须发布后才能运行，不然会报错
    xmlHttp.send(null);
    //4代表数据发送完毕
    if ( xmlHttp.readyState == 4 )
    {
        //0为访问的本地，200到300代表访问服务器成功，304代表没做修改访问的是缓存
        if((xmlHttp.status >= 200 && xmlHttp.status <300) || xmlHttp.status == 0 || xmlHttp.status == 304)
        {
            var myHead = document.getElementsByTagName("HEAD").item(0);
            var myScript = document.createElement( "script" );
            myScript.language = "javascript";
            myScript.type = "text/javascript";
            //myScript.id = id;
            try{
                //IE8以及以下不支持这种方式，需要通过text属性来设置
                myScript.appendChild(document.createTextNode(xmlHttp.responseText));
            }
            catch (ex){
                myScript.text = xmlHttp.responseText;
            }
            myHead.appendChild( myScript );
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

/**
 * 异步方式装载JS文件
 * @param {} filesurl
 * @param {} callback
 */
NetWorkSrv.asynLoadJsFile = function(filesurl, callback){
	var nodeHead = document.getElementsByTagName('head')[0];
    var nodeScript = null;
    //if(document.getElementById(sid) == null){
        nodeScript = document.createElement('script');
        nodeScript.setAttribute('type', 'text/javascript');
        nodeScript.setAttribute('src', filesurl);
        //nodeScript.setAttribute('id',sid);
        if (callback != null) {
            nodeScript.onload = nodeScript.onreadystatechange = function(){
                if (nodeScript.ready) {
                    return false;
                }
                if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                    nodeScript.ready = true;
                    callback();
                }
            };
        }
        nodeHead.appendChild(nodeScript);
    /*} else {
        if(callback != null){
            callback();
        }
    }*/
}