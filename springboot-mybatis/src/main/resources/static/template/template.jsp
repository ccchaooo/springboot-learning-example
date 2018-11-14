<%--
  Created by IntelliJ IDEA.
  User: 64511
  Date: 2018/10/21
  Time: 17:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
      <meta charset="utf-8">
      <meta name="renderer" content="webkit">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
      <title>主页</title>

      <link rel="stylesheet" type="text/css" href="../../controls/bootstrap/css/bootstrap.min.css" />
      <!--[if lt IE 8]>
      <script type="text/javascript">
          alert("请使用主流浏览器访问，系统不支持IE8以下版本。");
      </script>
      <![endif]-->
      <!--[if IE 8]>
      <script type="text/javascript" src="../../script/angular/ie8/example/vendor/es5-shim.min.js"></script>
      <![endif]-->

      <!--[if lt IE 9]>
      <script type="text/javascript" src="../../script/public/iefix/html5shiv.min.js"></script>
      <script type="text/javascript" src="../../script/public/iefix/respond.min.js"></script>
      <![endif]-->

      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <script type="text/javascript" src="../../script/public/jquery/jquery.min.js"></script>
      <script type="text/javascript" src="../../script/public/jquery/jquery.placeholder.min.js"></script>
      <script type="text/javascript" src="../../script/public/jquery/jquery.json.js"></script>
      <script type="text/javascript" src="../../controls/bootstrap/js/bootstrap.min.js"></script>
      <link rel="stylesheet" type="text/css" href="./../../controls/dhtmlx-5.0/skins/web/dhtmlx.css"/>
      <script type="text/javascript" src="../../controls/dhtmlx-5.0/codebase/dhtmlx.js"></script>
      <script type="text/javascript" src="../../script/dhtmlx/codebase/dhtmlx.js"></script>
      <script type="text/javascript" src="../../script/angular/ie8/dist/angular.min.js"></script>
      <script type="text/javascript" src="scripts/template.js"></script>
      <style>
          html, body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding:0;
              /*overflow: hidden;*/
              font-family: 微软雅黑, 黑体, 宋体;
          }
      </style>
  </head>
  <body ng-controller="homeController">
      <div id="headForm" class="container-fluid">
          <form name="filterForm" ng-model-options="{updateOn:'default blur',debounce:{default:500,blur:0}}">
              <div class="row">
                  <div class="col-xs-12">
                      <div class="form-inline">
                          <label class="control-label">搜索条件一</label>
                          <input type="text" class="form-control" data-theme="bootstrap" ng-change="f_change()" style="width: 180px;"  data-placeholder="请填写建设单位名称"
                                 name="C_JGMC" id="C_JGMC" ng-model="C_JGMC" >
                          <label class="control-label">搜索条件二</label>
                          <input type="text" class="form-control" data-theme="bootstrap" ng-change="f_change()" style="width: 200px;"  data-placeholder="请填写申报名称或编号"
                                 name="C_SBMC" id="C_SBMC" ng-model="C_SBMC" >
                          <label class="control-label">状态</label>
                          <select class="form-control" style="width: 150px;" ng-model="C_ZT" ng-change="f_change()">
                              <option value="0">选项一</option>
                              <option value="1">选项二</option>
                              <option value="2">选项三</option>
                          </select>
                          <button ng-click="f_query();" type="button" class="btn btn-primary">查询</button>
                          <button  class="btn btn-success" ng-click="showDetails()" id="btn_details"></span>查看详情</button>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  </body>
</html>
