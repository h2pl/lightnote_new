<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    out.print(basePath);
    
    
%>
<!DOCTYPE html>
<html lang="zh-CN">
        <head>
                <meta charset="utf-8" />
                <title id="tt">编辑笔记-未命名 @轻笔记</title>
                <meta name="keywords" content="thinkernore,轻笔记,行客诺,记事本,笔记" />
                <meta name="description" content="一款完全免费的记事本软件，方便您随时随地记录形式各样的资料，支持多种格式的附件" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/template.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/note.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pub/jquery-ui.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/fileuploader.css" />
                <script src="<%=basePath%>js/pub/jquery.js"></script>
                <script src="<%=basePath%>js/pub/jquery-ui.js"></script> 
                <script src="<%=basePath%>js/tiny_mce/tiny_mce.js"></script>
                <script src="<%=basePath%>js/pub/fileuploader.js" type="text/javascript"></script>
        </head>
        <body>
                <input type="hidden" id="serverTime" name="serverTime" value="1484141549"/>
                <script>
                        jQuery(document).ready(function(){
                                window.moveTo(0,0);
                                window.resizeTo(screen.width,screen.height);
                        });
                </script>
        <div id="header" class="page-header">
                        <div id="hdContent" class="navbar container">
                                <div class="disBreadNav">
                                <a href="http://www.qingbiji.cn/my">我的笔记</a> &gt;
                                    工作 &gt;
                                </div>
                                        <ul class="nav info-ul">
                                                        <li><!--a href="/note/0" title="返回查看笔记">退出编辑</a--></li>
                                                <li><!--a href="#" id="closePage" title="保存对笔记的修改并退出本页面">保存退出</a--></li>
                                        </ul>
                        </div>
                </div>
                <div id="">
                        <div class="container infoBox in-shadow_3px">
                        <div id="timeShow" class="timeShow">
                                <div id="tag" class="tag"></div>
                                <a id="closePage" class="BT_R rBorder" href="" style="color:#08C;">保存退出</a>
                                    <a id="addTag" href="javascript:void(0)" value="" class="BT_R" >添加标签</a>
                        </div>
                        </div>
                </div>
                <div id="content" class="container">
                        <h3 class="noteTitle textOver" title="点击修改标题"><a id="title">未命名</a></h3>
                        <div id="alertDiv" class="alertDiv"></div>
                        <div class="tinyDiv">
                                <textarea id="tinyArea" style="visibility:hidden;width:100%;float:left;"></textarea>
                        </div>
                </div>
                
                <div id="attList" class="container"></div>
                <!--
                <div id="footer">
                        <div class="container">
                                <ul class="ftList">
                                        <li><a target="_blank" href="/help" title="帮助中心">帮助中心</a></li>
                                        <li><a target="_blank" href="/download">客户端下载(iPhone/Android/Windows)</a></li>
                                </ul>   
                        </div>

                        -->
                        
                <input type="hidden" id="view"   value="w" />
                <input type="hidden" id="modify" value="" />
                <input type="hidden" id="delete" value="" />
                <input type="hidden" id="create" value="" />
                <input type="hidden" id="manage" value="" />    
                <input type="hidden" id="projectId" value="0" />       
                <input type="hidden" id="noteId" value="0" />
                <input type="hidden" id="folderId" value="31475762" />
                <input type="hidden" id="attListData" value=""/>
        <script src="<%=basePath%>js/TNoteWeb.plain.js" type="text/javascript"></script>
        <script src="<%=basePath%>js/editnote.plain.js" type="text/javascript"></script>
</body>
</html>
