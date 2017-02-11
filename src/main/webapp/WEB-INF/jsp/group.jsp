<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    out.print(basePath);
    
    
%>
<!DOCTYPE HTML>
<html lang="zh-CN">
        <head>
          <base href="<%=basePath%>">
                <meta charset="utf-8" />
                <title>轻笔记Web版</title>
                <meta name="keywords" content="thinkernore,轻笔记,行客诺,记事本,笔记" />
                <meta name="description" content="一款完全免费的记事本软件，方便您随时随地记录形式各样的资料，支持多种格式的附件" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <link rel="shortcut icon" href="images/favicon.ico" />
                <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="css/pub/jquery-ui.css" />
                <link rel="stylesheet" type="text/css" href="css/template.css" />
                <link rel="stylesheet" type="text/css" href="css/pageAlert.css" />
                <link rel="stylesheet" type="text/css" href="css/publicNoteList.css" />
                
                
                	<link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.1/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.1/demo/demo.css">
	<script type="text/javascript" src="jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	
        </head>
        <body>
              
                <!--div id="setMark" class="setMark">
                        <div class="setTab">
                        </div>
                        <div class="markname">
                                设置
                        </div>
                </div-->
                 <div class="page-header">
                        <div id="hdContent" class="navbar container">
                                <a href="/lightnote/user/home"><img alt="轻笔记Logo" title="到轻笔记官网首页." id="logoImg" class="brand" src="images/home/logo.png"/></a>
                                <ul id="UL_Nav" class="nav page-nav">
                                        <li id="overview" ><a href="/lightnote/user/home">概览</a></li>
                                        <li id="person1"><a href="/lightnote/user/mynote">我的笔记</a></li>
                                        <li id="person"><a href="/lightnote/user/category">分类整理</a></li>
                                        <li id="project" class="activ"><a href="/lightnote/user/group">群组合作</a></li>
                                        
                                </ul>
                                <ul class="nav info-ul">
                                
                <c:choose>
                    <c:when test="${username!=null}">
                        <li><a class="mdl-navigation__link mdl-color-text--pink-400"
                           href="/lightnote/user/userinfo?username=${username}">${username}</a></li>
                        
                        <li><a class="mdl-navigation__link mdl-color-text--black" href="/lightnote/user/logout">注销</a></li>
                    </c:when>
                    <c:when test="${username == null}">
                        <li><a class="mdl-navigation__link mdl-color-text--pink-400" href="http://localhost:8080/lightnote/login.jsp">登录</a></li>
                       <li> <a class="mdl-navigation__link mdl-color-text--pink-400" href="http://localhost:8080/lightnote/register.jsp">注册</a></li>
                    </c:when>
                </c:choose>
          
                                
                            </ul>
                        </div>
                        
                </div>
                
<!-- 文件树 -->
<div id="content" class="container" >
                       <div style="margin:20px 0;"></div>
	<div class="easyui-panel" style="padding:5px">
		<ul class="easyui-tree">
			<li>
				<span>My Documents</span>
				<ul>
					<li data-options="state:'closed'">
						<span>Photos</span>
						<ul>
							<li>
								<span>Friend</span>
							</li>
							<li>
								<span>Wife</span>
							</li>
							<li>
								<span>Company</span>
							</li>
						</ul>
					</li>
					<li>
						<span>Program Files</span>
						<ul>
							<li>Intel</li>
							<li>Java</li>
							<li>Microsoft Office</li>
							<li>Games</li>
						</ul>
					</li>
					<li>index.html</li>
					<li>about.html</li>
					<li>welcome.html</li>
				</ul>
			</li>
		</ul>
	</div>   
	<!-- 文件树结束 -->
</div>
                
        <script src="js/pub/jquery.js"></script>
        <script src="js/pub/jquery-ui.js"></script>
        <script src="js/tiny_mce/tiny_mce.js"></script>
        <script src="js/pub/fileuploader.js" type="text/javascript"></script>
        <script src="js/TNoteWeb.plain.js"></script>
        <script src="js/addMember.plain.js"></script>
        <script src="js/TN.plain.js"></script>
        <script src="js/emailshare.plain.js" type="text/javascript"></script>
 <!--       <script src="js/folder_01.plain.js"></script>--> 
        <script src="js/group.plain.js"></script>
        <script src="js/folderTree.plain.js"></script>
</body>
</html>
