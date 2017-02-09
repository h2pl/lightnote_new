<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String content = request.getParameter("mycontent");

String savedDataInfo = "";
System.out.println("content:"+content);

//将获取的内容保存至数据库
 String user = "root";
 String password = "123456";
 String url = "jdbc:mysql://localhost:3306/uetest";
 String driver = "com.mysql.jdbc.Driver";
 //String driver = "org.gjt.mm.mysql.Driver";
 String tableName = "tb_detail";
 String sqlstr;
 Connection conn = null;
 Statement stmt = null;
 ResultSet rs = null;

	try{
        Class.forName(driver);
        conn = DriverManager.getConnection(url, user, password);
        stmt = conn.createStatement();
        
        sqlstr = "insert into "+tableName+"(context)"+" values (" + "'" + content + "'" + ")";
        stmt.executeUpdate(sqlstr);
        
        sqlstr = "select * from "+tableName;
        rs = stmt.executeQuery(sqlstr);
        
        ResultSetMetaData rsmd = rs.getMetaData();
        int j = 0;
        j = rsmd.getColumnCount();
        for(int k = 0; k<j; k++)
        {
            System.out.print(rsmd.getCatalogName(k+1));
            System.out.print("\t");
        }
        System.out.println();
        while(rs.next())
        {
            for(int i=0;i<j;i++)
            {
            	String columnValue = rs.getString(i+1);
            	if(i == 1){savedDataInfo = columnValue;}
                System.out.print(columnValue);
                System.out.print("\t");
            }
            System.out.println();
        }
    }
    catch(ClassNotFoundException e1)
    {
        System.out.println("数据库驱动不存在！");
        System.out.println(e1.toString());
    }
    catch(SQLException e2)
    {
        System.out.println("数据库存在异常！");
        System.out.println(e2.toString());
    }
    finally
    {
        try
        {
            if(rs != null) rs.close();
            if(stmt != null) stmt.close();
            if(conn != null) conn.close();
        }
        catch(SQLException e)
        {
            System.out.println(e.toString());
        }            
    } 
%>
<script type="text/plain" id="editor">
    //从数据库中取出文章内容打印到此处
</script>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<SCRIPT type=text/javascript src="ueditor/ueditor.config.js"></SCRIPT>  
	<SCRIPT type=text/javascript src="ueditor/ueditor.all.js"></SCRIPT>
  </head>
  
  <body>
  	<form action="" method="post">
	    <%=savedDataInfo%>
		<SCRIPT type=text/javascript>  
		    var editor = new UE.ui.Editor();  
		    editor.render("myEditor");  
		    //1.2.4以后可以使用一下代码实例化编辑器 
		    //UE.getEditor('myEditor') 
		</SCRIPT>
	</form>
  </body>
</html>


