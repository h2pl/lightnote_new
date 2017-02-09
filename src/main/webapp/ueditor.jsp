<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%
    String apath = request.getContextPath();
    String abasePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+apath+"/";
    out.print(abasePath+"dassa");
    
    
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<SCRIPT type=text/javascript src="<%=abasePath%>ueditor/ueditor.config.js"></SCRIPT>  
	<SCRIPT type=text/javascript src="<%=abasePath%>ueditor/ueditor.all.js"></SCRIPT>
  </head>
  
  <body>
  	<form action="save.jsp" method="post">
	    <TEXTAREA id=myEditor name="mycontent"></TEXTAREA>  
		<SCRIPT type=text/javascript>  
		    var editor = new UE.ui.Editor();  
		    editor.render("myEditor");  
		    //1.2.4以后可以使用一下代码实例化编辑器 
		    //UE.getEditor('myEditor') 
		</SCRIPT>
		<input name="submit" value="提交" type="submit">
	</form>
  </body>
</html>
