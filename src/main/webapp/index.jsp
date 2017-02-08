<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    out.print(basePath);
%>
!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
    <title>首页@轻笔记</title>
    <meta name="keywords" content="thinkernore,行客记事,行客诺,记事本,笔记" />
    <meta name="description" content="一款完全免费的记事本软件，方便你随时随地记录形式各样的资料，支持多种格式的附件" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta property="qc:admins" content="1217302621611672121636" />
    <meta property="wb:webmaster" content="75ee2dda4826c7eb" />
    <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="<%=basePath%>css/css_v1/public.css" />
    <link rel="stylesheet" type="text/css" href="<%=basePath%>css/css_v1/index.css" />
    <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pub/jquery-ui.css" />
    <script src="<%=basePath%>js/pub/jquery.js"></script>
    <script src="<%=basePath%>js/pub/jquery-ui.js"></script>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-35490728-1']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
    <script src="<%=basePath%>js/pub/jquery.cookie.js"></script>
    <script src="<%=basePath%>js/TNoteWeb.plain.js"></script>
    <script src="<%=basePath%>js/headLogin.plain.js"></script>
</head>
<body>
<script>
    if(navigator.appName == "Microsoft Internet Explorer") {
        var vs=navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
        if(vs== "MSIE6.0" ) {
            //      window.location = "<%=basePath%>ie.html";
        }
    }
    jQuery(document).ready(function(){
        var pic=TN.Picture(jQuery("#showPic"));
        pic.init([
            {"name":"全球唯一群组笔记","src":"<%=basePath%>images/newNote_v1/7_16.jpg","href":"#"}
            ,{"name":"随时随地记录我的生活","src":"<%=basePath%>images/newNote_v1/index_big1.jpg","href":"#"}
            ,{"name":"与合作伙伴共成长","src":"<%=basePath%>images/newNote_v1/developer.jpg","href":"#"}

            //{"name":"全球唯一群组笔记","src":"<%=basePath%>images/newNote_v1/qbj_close.jpg","href":"#"}
            //,{"name":"随时随地记录我的生活","src":"<%=basePath%>images/newNote_v1/qbj_close.jpg","href":"#"}
            //,{"name":"与合作伙伴共成长","src":"<%=basePath%>images/newNote_v1/developer.jpg","href":"#"}
        ]);
        pic.setNumPosition(200,210);
        pic.setInfoBox(jQuery("#showInfo"));
        pic.setNumBox(jQuery("#numBox"));
        pic.run();

        var box=TN.slideBox();
        box.doIt($(".box"));
        TN.placeholderInit();
    });
</script>
<div class="mainHeader down-shadow mainHeaderColor">
    <div class="headerContent px940 center">
        <div class="logo"></div>
        <ul class="nav">

        </ul>
    </div>
</div>

<!--<div id="" class="mainHeader down-shadow mainHeaderColor">
        <div class="headerContent px940 center">
                <div class="logo"></div>
                <ul class="nav">
                        <li><span><a class="selected" href="/">首页</a></span></li>
                        <li><span><a class="" href="/product">产品介绍</a></span></li>
                        <li><span><a class="" href="/download">下载软件</a></span></li>
                        <li><span><a class="" href="/help">帮助中心</a></span></li>
                        <li><span><a class="" href="/feedback">意见反馈</a></span></li>
                </ul>
        </div>
</div>-->

<div id="content" class="content in-shadow_3px" >
    <div class="contentBox px940 center">
        <div class="imgSlider fl">
            <div class="imgSlider-content">
                <div id="showPic" class="imgSlider-img">
                </div>
                <div class="imgSlider-intro">
                    <div class="infoBar1">
                        <a id="showInfo"></a>
                        <div id="numBox" style="position:absolute;top:15px;left:570px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="account fr">
            <div class="reg-bd">
                <div class="Button1 reg">
                    <a href="http://localhost:8080/lightnote/register.jsp"">立即注册</a>
                </div>
            </div>
            <div class="login">
                <form action="/lightnote/user/login" method="post">
                    <ul>
                        <li>
                            <input type="text" id="username" name="username" placeholder=" 邮箱/用户名" class="ipt"/>
                        </li>
                        <li><input type="password" id="password" name="password" placeholder=" 密码" class="ipt"/></li>
                        <li class="liMid">
                            <input id="saveLoginState" name="saveLoginState" type="checkbox"/>
                            <label for="saveLoginState" title="建议在网吧或公共电脑上取消该选项。">下次自动登录</label>
                            <a href="/forget" target="_blank">忘记密码</a>
                        </li>
                        <li class="liBtn">
                            <input type="submit" id="btnLogin" value="登录网页版"/>
                        </li>
                    </ul>
                </form>
                <p>使用其他账号登录</p>
                <p>
                    <a href="/login/sina" class="sina" >微博</a>|<a href="/login/tencent" class="qq">QQ</a>|<a href="/login/360" class="qihu" >360</a>|<a href="/login/baidu" class="baidu" >百度</a>|<a href="/login/renren" class="renren" >人人</a><br/><a href="/login/tianyi" class="tianyi">天翼</a>
                </p>
            </div>
        </div>
        <div class="clear"></div>
        <div class="downList down-shadow1">
            <ul>
                <li>
                    <a class="ios" href="http://itunes.apple.com/us/app/id432043927" class="ios"></a>
                </li>
                <li>
                    <a class="android" href="http://update.thinkernote.com/windows/config/ThinkerNote-Setup.apk"></a>
                </li>
                <li>
                    <a class="windows" href="http://update.thinkernote.com/windows/config/Qbj-Setup.exe"><span class="downImg3"></span></a>
                </li>
                <li><a href="/download" class="more"></a></li>
            </ul>
        </div>
        <div class="intro">
            <div class="box down-shadow1 b1">
                <div class="infoBar1 text">
                    <div class="title">
                        超大起始空间
                    </div>
                    <p>
                        邀请好友，填写邀请码，获100M空间奖励，无限增长。
                        上传本地数据至网络存储，永久保存。
                    </p>
                </div>
            </div>
            <div class="box down-shadow1 b2">
                <div class="infoBar1 text">
                    <div class="title">
                        多人合作编辑、分享
                    </div>
                    <p>
                        工作中：共享文档，实时了解工作进程。
                        学习中：交换和共享课堂笔记、学习资料；
                        生活中：与家人朋友分享各种想法、攻略，成为小团队的移动WIKI和知识库。
                    </p>
                </div>
            </div>
            <div class="box down-shadow1 b3">
                <div class="infoBar1 text">
                    <div class="title">
                        手机&电脑瞬间传输、手机离线阅读
                    </div>
                    <p>
                        无需数据线，网页资料、文本、小说、邮件、待办事项、照片、word、excel、ppt、mp3、txt、pdf等资料轻松在电脑手机之间传输。
                    </p>
                </div>
            </div>
            <div class="box down-shadow1 b4">
                <div class="infoBar1 text">
                    <div class="title">
                        语音 照片 涂鸦 语音转文字 文本
                    </div>
                    <p>
                        多种多样的记录方式，让你不再担心忘记。
                    </p>
                </div>
            </div>
            <div class="box down-shadow1 b5 rc">
                <div class="infoBar1 text">
                    <div class="title">
                        SSL数据加密&本地独立密码锁
                    </div>
                    <p>
                        采用网银数据加密技术，保证数据安全。本地密码锁，保证绝对隐私。
                    </p>
                </div>
            </div>
        </div>
        <div>
            <ul class="friendLogo">
                <li><a href="http://mse.360.cn/index.html"><img src="<%=basePath%>images/newNote_v1/360brs001.png" /></a></li>
                <li><a href="http://cloud.189.cn"><img src="<%=basePath%>images/newNote_v1/tianyi001.png" /></a></li>
                <li><a href="http://www.jiathis.com/"><img src="<%=basePath%>images/newNote_v1/jiathis001.png" /></a></li>
                <li><a href="http://www.copyto.cn"><img src="<%=basePath%>images/newNote_v1/coptto001.png" /></a></li>
                <li><a href="http://www.moneywise.com.cn"><img src="<%=basePath%>images/newNote_v1/caizhi001.png" /></a></li>
                <li><a href="https://itunes.apple.com/cn/app/shift-scheduler/id482061308?mt=8"><img src="<%=basePath%>images/newNote_v1/ppb001.png" /></a></li>
            </ul>
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
            Copyright @2017 行客诺（北京）科技有限公司 京ICP备11030702号<br/><br/>
            <!--<a href="http://trust.360.cn/search.php" target="_blank" title="360绿色网站"><img src="http://trust.360.cn/img.php?sn=2686&id=3" border="0" width="75px"/></a>-->
        </div>
    </div>
</div>



</body>
</html>
