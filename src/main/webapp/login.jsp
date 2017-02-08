<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    out.print(basePath);
%>

<html>
        <head>
        <title>Title </title>
    
                <meta charset="utf-8" />
             
                <meta name="keywords" content="thinkernore,行客记事,行客诺,记事本,笔记" />
                <meta name="description" content="一款完全免费的记事本软件，方便你随时随地记录形式各样的资料，支持多种格式的附件" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/css_v1/public.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/css_v1/login.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pub/jquery-ui.css" />
                <script src="<%=basePath%>js/pub/jquery.js"></script>
                <script src="<%=basePath%>js/pub/jquery-ui.js"></script>
                <script src="<%=basePath%>js/pub/jquery.cookie.js"></script>
                <script src="<%=basePath%>js/TNoteWeb.plain.js"></script>
                <script src="<%=basePath%>js/headLogin.plain.js"></script>
        </head>
        <body>
                <script>
                        if(navigator.appName == "Microsoft Internet Explorer") {
                                var vs=navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
                                if(vs== "MSIE6.0" ) {
                                //      window.location = "static/ie.html";
                                }
                        }
                        jQuery(document).ready(function(){
                                TN.placeholderInit();
                        });
                </script>
                <div class="mainHeader down-shadow mainHeaderColor">
                        <div class="headerContent px940 center">
                                <div class="logo"></div>
                                <ul class="nav">
                                    <li><span><a class="" href="/">首页</a></span></li>
                                    <li><span><a class="" href="/product">产品介绍</a></span></li>
                                    <li><span><a class="" href="/download">下载软件</a></span></li>
                                    <li><span><a class="" href="/open">开放平台</a></span></li>
                                    <li><span><a class="" href="/help">帮助中心</a></span></li>
                                    <li><span><a class="" href="/news">新闻动态</a></span></li>
                                    <li><span><a class="" href="/feedback">意见反馈</a></span></li>
                                </ul>
                        </div>
                </div>

                <div id="content" class="content in-shadow_3px" >
                        <div class="contentBox px940 center">
                                <div class="main center down-shadow1">
                                        <div class="titleBar1 imgTitle">
                                                <a>登录并开始记录</a>
                                        </div>
                                        <form class="center" id="form_login" method="post" action="/lightnote/user/login">
                                                <input type="hidden" name='redir' value='' />
                                                <ul>
                                                        <li></li>
                                                        <li><input type="text" id="username" name="username" class="ipt" placeholder=" 邮箱/用户名" value="" /></li>
                                                        <li><input type="password" id="password" name="password" class="ipt" placeholder=" 密码" /></li>
                                                        <li class="liMid">
                                                                <div class="fl">
                                                                        <input id="saveLoginState" name="saveLoginState" type="checkbox"/>
                                                                        <label for="saveLoginState" title="建议在网吧或公共电脑上取消该选项。">下次自动登录</label>
                                                                </div>
                                                                <a href="/forget" target="_blank" class="fr">忘记密码</a>
                                                                <div class="clear"></div>
                                                        </li>
                                                        <li class="liBtn">
                                                                <div class="fl Button1 bt">
                                                                        <a class="no_under" href="javascript:document.getElementById('form_login').submit();" id="btnLogin">登录</a>
                                                                </div>
                                                                <div class="fl rg">
                                                                        <a href="http://localhost:8080/lightnote/register.jsp">立即注册</a>
                                                                </div>
                                                                <div class="clear"></div>
                                                        </li>
                                                </ul>
                                        </form>
                                        <hr alt="iowqeruasdfj" class="center line1" />
                                        <p class="tac">
                                                使用其它账号登录
                                                <a href="/login/sina" class="sina" >微博</a>|<a href="/login/tencent" class="qq">QQ</a>|<a href="/login/360" class="qihu" >360</a>|<a href="/login/baidu" class="baidu" >百度</a>|<a href="/login/renren" class="renren" >人人</a>|<a href="/login/tianyi" class="tianyi" >天翼</a>
                                        </p>
                                </div>
                        </div>
                </div>

                <div id="footer" class="footer in-shadow_3px">
                        <div class="footerContent px940 center">
                                <div class="top">
                                        <div class="left">
                                                <a target="_blank" title="关注我们">关注我们</a>
                                                <a href="http://t.qq.com/qingbiji-note"><img src="<%=basePath%>images/newNote_v1/qq.png" /></a>
                                                <a href="http://e.weibo.com/qingbiji"><img src="<%=basePath%>images/newNote_v1/weibo.png" /></a> 
                                                <a target="_blank" href="/contact" title="联系我们">联系我们</a>
                                        </div>
                                        <div class="mid">
                                                <a>友情链接 : </a>
                                                <a target="_blank" title="财智理财软件 " href="http://moneywise.com.cn/ ">财智理财软件  </a>
                                                <a target="_blank" title="CopyTo官网 " href="http://www.copyto.cn/">CopyTo官网</a>
                                                <a target="_blank" title="中关村在线" href=" http://sj.zol.com.cn">ZOL</a>
                                                <a target="_blank" title="小米应用商店" href=" http://app.xiaomi.com">小米应用商店</a>
                                                <a href="http://www.wetuandui.com" style="display:none;">wetuandui</a>
                                        </div>
                                        <div class="right">
                                                <span>推荐使用 : </span>
                                                <a target="_blank" href="http://chrome.360.cn/"><img src="<%=basePath%>images/index/new/16-16-icon.png">360极速浏览器</a>
                                        </div>
                                </div>
                                <div class="line center"></div>
                                <div class="bottom center">
                                        Copyright @2012 行客诺（北京）科技有限公司 京ICP备11030702号<br/><br/>
                                        <!--<a href="http://trust.360.cn/search.php" target="_blank" title="360绿色网站"><img src="http://trust.360.cn/img.php?sn=2686&id=3" border="0" width="75px"/></a>-->
                                </div>
                        </div>
                </div>
                


</body>
</html>
