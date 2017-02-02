<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    
    
%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>


<script type="text/javascript"> 


setTimeout("javascript:location.href='http://localhost:8080/lightnote/index.jsp'", 3000); 
</script>

</head>
<body>
<div align="center">
    <br/>
    <br/>
    <br/>
    <h4>${error}</h4>
    <h4><a href="http://localhost:8080/lightnote/index.jsp" >立即跳转</a></h4>
</div>
 
</body>
</html>