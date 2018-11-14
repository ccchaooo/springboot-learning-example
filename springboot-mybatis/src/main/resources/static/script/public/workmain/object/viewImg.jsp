<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.cdmcs.utiltools.*"%>
<%
	ImageTools img = new ImageTools();
	out.write(img.ImagePreviewProcessRequest(request));
%>