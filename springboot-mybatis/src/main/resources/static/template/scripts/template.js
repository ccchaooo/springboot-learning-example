$(function() {
    var myGrid;
    var myLayout = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: "2E",
        offsets: {          // optional, offsets for fullscreen init
            top: 2,     // you can specify all four sides
            right: 2,     // or only the side where you want to have an offset
            bottom: 2,
            left: 2
        },
        cells: [
            {
                id: "a",        // id of the cell you want to configure
                header: false,      // hide header on init
                height: 50,        // cell init height
                fix_size: [null, true] // fix cell's size, [width,height]
            },
            {
                id: "b",        // id of the cell you want to configure
                header: false     // hide header on init
            }
        ]
    });
    myLayout.cells("a").setHeight(50);
    myLayout.cells("a").attachObject("headForm");

    myLayout.setSeparatorSize(0, 0);


    // 初始化GRID
    myGrid = myLayout.cells("b").attachGrid();
    myGrid.setImagePath("../../controls/dhtmlx-5.0/skins/web/imgs/dhxgrid_web/");
    myGrid.setStyle("text-align:center;background-color:#f4f4f4;color:#000;font-weight:bold;border-bottom:4px solid #1E90FF;","height:40px;");
    myGrid.setHeader("列名,列名,列名,列名,列名,列名,列名,列名,列名");
    myGrid.setInitWidthsP("4,7,12,25,28,12,12,12,12");//设置列宽（按百分比）
    myGrid.setColAlign("center,left,left,center,left,center,center,center,center");//设置各列的对齐方式
    // myGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro");//设置各列的数据类型
    myGrid.enableResizing("false,true,true,true,true,false,false,false,false");
    myGrid.enableAlterCss("GridRowColorEven","GridRowColorUnEven");//设置行的交替样式
    myGrid.setColumnIds("'',C_STBH,C_SPBH,C_JGMC,C_SBMC,D_SPYWCSJ,D_SYYWCBJSJ,C_DQZT,D_JJSJ");
    myGrid.init();

    myGrid.setAwaitedRowHeight(40);
    myGrid.enableSmartRendering(true,20);

    myGrid.attachEvent("onXLS",function(){ myLayout.progressOn();});
    myGrid.attachEvent("onXLE",function(){ myLayout.progressOff();});

    myGrid.attachFooter(
        ["<div><span>往下滚动自动加载，总共<span id='foot_zbs'>0</span>笔。</span></div>","#cspan","#cspan","#cspan","#cspan","#cspan","#cspan","#cspan","#cspan"],
        ["text-align:left;vertical-align: middle;font-family:consolas;font-style:normal;"]
    );

    // angular
    var app = angular.module("homeApp",[]);
    app.controller("homeController",["$scope","$timeout",function(scope,timeout){
        alert(11111)
    }]);

    //启动angular
    angular.bootstrap(document.body,["homeApp"]);
});
