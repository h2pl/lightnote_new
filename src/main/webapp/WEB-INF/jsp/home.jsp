<%@page import="com.ruanku.lightnote.pojo.User"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath }"></c:set>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    out.print(basePath);
    
    User user=null;
    if(session.getAttribute("user")!=null){
    user=(User)session.getAttribute("user");
    }
    
    String username=null;
    String email=null;
  
    if(user!=null){
     username=user.getUsername();
     email=user.getEmail();
    }
    
    out.print(username);
    
%>

<html lang="zh-CN">
        <head>
                <meta charset="utf-8" />
                <title>轻笔记Web版</title>
                <meta name="keywords" content="thinkernore,轻笔记,行客诺,记事本,笔记" />
                <meta name="description" content="一款完全免费的记事本软件，方便您随时随地记录形式各样的资料，支持多种格式的附件" />
                <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/template.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pageAlert.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pub/jquery-ui.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/home.css" />
                <script src="<%=basePath%>js/pub/jquery.js"></script>
                <script src="<%=basePath%>js/pub/jquery-ui.js"></script>
                <script src="<%=basePath%>js/TNoteWeb.plain.js"></script>
                <script src="<%=basePath%>js/TN.plain.js"></script>
                <script src="<%=basePath%>js/home.plain.js"></script>
                <script src="<%=basePath%>js/pub/zeroclipboard/ZeroClipboard.js"></script>
                <script src="<%=basePath%>js/invite.plain.js"></script>

        </head>
        <body>
        <p>${ctx}</p>
                <input id="defaultSort" value="title" type="hidden" />
                <input id="userName" value="362294931@qq.com" type="hidden" />
                <input type="hidden" id="userId" value="40699812"  />
                <div class="page-header">
                        <div id="hdContent" class="navbar container">
                                <a href="/"><img alt="轻笔记Logo" title="到轻笔记官网首页." id="logoImg" class="brand" src="<%=basePath%>images/home/logo.png"/></a>
                                <ul id="UL_Nav" class="nav page-nav">
                                        <li id="overview" class="activ"><a href="/home">概览</a></li>
                                        <li id="person1"><a href="/myNote">我的笔记</a></li>
                                        <li id="person"><a href="/my">分类整理</a></li>
                                        <li id="project"><a href="/group">群组合作</a></li>
                                        <li id="publicNote"><a href="/public" target="_blank">大家的公开</a></li>
                                </ul>
                                <ul class="nav info-ul">
                                
                <c:choose>
                    <c:when test="${username!=null}">
                        <li><a class="mdl-navigation__link mdl-color-text--pink-400"
                           href="/lightnote/user/userinfo?username=${username}">${username}</a></li>
                        
                        <li><a class="mdl-navigation__link mdl-color-text--black" href="/lightnote/user/logout">注销</a></li>
                    </c:when>
                    <c:when test="${username == null}">
                        <li><a class="mdl-navigation__link mdl-color-text--pink-400" href="http://localhost:8080/lightnote/index.jsp">登录</a></li>
                       <li> <a class="mdl-navigation__link mdl-color-text--pink-400" href="http://localhost:8080/lightnote/register.jsp">注册</a></li>
                    </c:when>
                </c:choose>
          
                                
                            </ul>
                        </div>
                        
                </div>
                <div id="Div_NavList">
                        <div id="DIV_NavShow" class="container"></div>
                </div>
                <div id="conten" class="container" >
                        <div id="Div_dashboard" class="">
                                <div class="unit">
                                        <div class="privateModel radiu">
                                                <div class="title">
                                                        <span class="tit"><img src="<%=basePath%>images/index/gailan/personal_note_16.png" alt="myNote" />我的笔记</span>
                                                </div>
                                                <div class="conBox">
                                                        <a style="float:left;" target="_blank" href="/editnote?f=0">
                                                                <div class="btn BT_big">
                                                                <span class="imgBox"><img src="<%=basePath%>images/index/gailan/newnote.png" alt="newNote" ></span>
                                                                <p class="txt">快速记事</p>
                                                                <p class="introduce">捕捉思想火花和您的每日心情</p>
                                                                </div>
                                                        </a>
                                                        <a href="/myNote">
                                                                <div class="btn BT_big">
                                                                        <span class="imgBox"><img src="<%=basePath%>images/index/gailan/allnote.png" alt="allNote" ></span>
                                                                        <p class="txt">浏览笔记</p>
                                                                        <p class="introduce">浏览，整理和搜索您的所有笔记</p>
                                                                </div>
                                                        </a>
                                                </div>
                                        </div>  
                                        <div class="publicModel radiu">
                                                <div class="title">
                                                        <span class="tit"><img src="<%=basePath%>images/index/gailan/group_1.png" alt="group"/>群组合作</span>
                                                </div>
                                                <div class="conBox">
                                                        <a href="/group">
                                                        <div class="btn BT_big">
                                                                <span class="imgBox"><img src="<%=basePath%>images/index/gailan/group_1.png" alt="group" /></span>
                                                                <p class="txt">管理群组</p>
                                                                <p class="introduce">与您的伙伴共同撰写计划和总结</p>
                                                        </div>
                                                        </a>
                                                </div>
                                        </div>  
                                </div>
                                <div class="sideBar">
                                        <div class="userInfo">
                                                <div class="title">个人信息</div>
                                                <p><img class="userIcon" src="<%=basePath%>images/index/gailan/user_icon_16.png" alt="user"/><span class="userName textOver">362294931@qq.com</span><a style="margin-left:10px;" href="/profile" title="用户设置">用户设置</a>
                                                <a id="BT_invite" class="hand">邀请朋友</a>
                                                </p>
                                                        <div id="spaceTool">
                                                                <div id="space"></div>
                                                        </div>
                                                <p>总空间<span id="allSpace">3072.00</span>MB，已用<span id="usedSpace">1.10</span>MB</p>
                                                <p>
                                                            <span>绑定百度网盘增加15G空间&nbsp;&nbsp;&nbsp;<a href="/login/baidu">马上绑定</a></span>
                                                </p>
                                                <p style="margin-top:15px;"><span class="emailIcon"><img alt="email" src="<%=basePath%>images/index/gailan/email_icon_16.png" /></span>
                                                        <span>邮箱验证</span>
                                                            <span class="yz">未验证</span><span><a href="/profile#email">去验证</a></span>
                                                </p>
                                                <p><img alt="password" class="icon" src="<%=basePath%>images/index/gailan/password_setting_icon_16.png" /><span>密码复杂度</span><span class="mm">一般</span><span><a href="/profile#pass">修改密码</a></span></p>
                                        </div>  
                                        <div class="trends" id="trends">
                                                <div class="title">轻笔记动态</div>
                                                <ul style="margin-left:10px;" id="newsList">
                                                    <li><a href="http://www.wetuandui.com/?ch=d1" target="_blank">微团队：推出多人任务管理</a>
</li>
                                                    <li><a href="http://www.qingbiji.cn/public" target="_blank">招聘牛人啦</a>
</li>
                                                    <li><a href="http://www.qingbiji.cn/help#9" target="_blank">如何整体导出文件夹下的笔记</a>
</li>
                                                    <li><a href="http://www.qingbiji.cn/help#10" target="_blank">如何完美保存网页内容</a>
</li>
                                                </ul>
                                        </div>  
                                        <div class="download">
                                                <div class="title">下载其他客户端</div>
                                                <ul>
                                                        <li>
                                                                <a class="d1" target="_blank" href="http://update.thinkernote.com/windows/config/ThinkerNote-Setup.apk">
                                                                        <span class="dwn1"></span>
                                                                        <!--img title="Android客户端下载" alt="Android客户端下载" src="<%=basePath%>images/index/gailan/download_android.png"/-->
                                                                        <span>Android</span>
                                                                </a>
                                                        </li>
                                                        <li>
                                                                <a class="d2" target="_blank" href="http://itunes.apple.com/us/app/id432043927">
                                                                        <span class="dwn2"></span>
                                                                        <!--img alt="iPhone客户端下载" title="iPhone客户端下载" src="<%=basePath%>images/index/gailan/download_apple.png"/-->
                                                                        <span>iPhone</span>
                                                                </a>
                                                        </li>
                                                        <li>
                                                                <a class="d3" target="_blank" href="http://update.thinkernote.com/windows/config/ThinkerNote-Setup.exe">
                                                                        <span class="dwn3"></span>
                                                                        <!--img title="Windows客户端下载" src="<%=basePath%>images/index/gailan/download_pc.png"/-->
                                                                        <span>Windows</span>
                                                                </a>
                                                        </li>
                                                </ul>
                                        </div>  
                                </div>
                        </div>
                </div>
                <div id="footer">
                <div class="container">
                        <ul class="ftList">
                                <li><a target="_blank" href="/help" title="帮助中心">帮助中心</a></li>
                                <li><a target="_blank" href="/download">客户端下载(iPhone/Android/Windows)</a></li>
                        </ul>   
                        <p>@2012 行客诺（北京）科技有限公司 京ICP备11030702号</p>
                </div>
                </div>
                <script> jQuery("#footer").css({"position":"fixed"}); </script>
</body>
</html>
