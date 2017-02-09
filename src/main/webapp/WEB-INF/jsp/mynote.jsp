<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    
    out.print(basePath);
    
%>
<!DOCTYPE HTML>
<html lang="zh-CN">
        <head>
                <meta charset="utf-8" />
                <title>轻笔记Web版</title>
                <meta name="keywords" content="thinkernore,轻笔记,行客诺,记事本,笔记" />
                <meta name="description" content="一款完全免费的记事本软件，方便您随时随地记录形式各样的资料，支持多种格式的附件" />
                <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pub/jquery-ui.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/template.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pageAlert.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/publicNoteList.css" />
                <script src="<%=basePath%>js/pub/jquery.js"></script>
                <script src="<%=basePath%>js/pub/jquery-ui.js"></script>
        </head>
        <body>
                <input type="hidden" id="username" value="362294931@qq.com" />
                <div class="page-header">
                        <div id="hdContent" class="navbar container">
                                <a href="/"><img alt="轻笔记Logo" title="到轻笔记官网首页." id="logoImg" style="margin-left:-20px;" class="brand" src="<%=basePath%>images/home/logo.png"/></a>
                                <ul id="UL_Nav" class="nav page-nav">
                                        <li id="overview"><a href="#">概览</a></li>
                                        <li id="person" class="activ"><a href="/lightnote/user/mynote">我的笔记</a></li>
                                        <li id="person2"><a href="/lightnote/user/category">分类整理</a></li>
                                        <li id="project"><a href="/lightnote/user/group">群组合作</a></li>
                                       
                                </ul>
                                <ul class="nav info-ul">
                                        <li><a href="/people/362294931@qq.com" class="textOver" target="_black">您好 362294931@qq.com</a></li>
                                        <li><a href="/lightnote/user/profile" title="用户设置">用户设置</a></li>
                                        <li><a href="/logout" title="退出" >退出</a> </li>
                                </ul>
                        </div>
                        
                </div>
                <div id="Div_NavList">
                        <div id="DIV_NavShow" class="container">
                                 <!--div class="serchDiv">
                                        <input id="serchInput" class="searchInput"  />
                                        <input id="serch" type="button" class="btn bt" value="搜索"/>
                                </div-->
                                <div class="breadNav"><ul class=""><li class="textOver">我的笔记</li></ul></div>
                        </div>
                </div>
                <div id="content" class="container" style="width:960px;" >
                        <div id="Div_detail" >
                                <div id="con" class="noteBox" >
                                </div>
                        </div>
                </div>
                
        <script src="<%=basePath%>js/tiny_mce/tiny_mce.js"></script>
        <script src="<%=basePath%>js/pub/fileuploader.js" type="text/javascript"></script>
        <script src="<%=basePath%>js/TNoteWeb.plain.js"></script>
        <script src="<%=basePath%>js/emailshare.plain.js" type="text/javascript"></script>
        <script src="<%=basePath%>js/TN.plain.js"></script>
        <!--script src="<%=basePath%>js/folder.plain.js"></script-->
        <script src="<%=basePath%>js/publicNoteList.plain.js"></script>
        <script src="<%=basePath%>js/myNote.plain.js"></script>
</body>
</html>
