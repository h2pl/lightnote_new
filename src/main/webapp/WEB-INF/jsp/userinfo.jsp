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
                <title>用户设置</title>
                <meta name="Keywords" content="thinkernote,轻笔记，行客诺，记事本，网络记事本，个人知识管理" />
                <meta name="description" content="一款完全免费的云端记事本软件，方便您随时随地记录形式各样的资料，支持多种格式的附件" />
                <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/pub/jquery-ui.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/thinkernote.layout.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="<%=basePath%>css/template.css" />
                <style type="text/css">
                        .ui-tabs .ui-tabs-nav li.ui-tabs-selected {
                                background: rgb(225, 225, 225);
                        }
                        .ui-tabs .ui-tabs-nav li.ui-tabs-selected a {
                                color: #000000;
                        }
                        .ui-tabs .ui-tabs-panel p {
                                padding: 0;
                        }
                        .tabs {
                                padding-bottom: 3em;
                        }
                        body{background-image:none;}
                        #accept{float:left;margin-right:5px;}
                </style>
                <script type="text/javascript" src="<%=basePath%>js/pub/jquery.js"></script>
                <script type="text/javascript">
                        jQuery(function() {
                                // 邮箱验证
                                //var msg = 991834862 == 0 ? "已验证" : "未验证(<a title='验证邮箱' href='javascript:verifyEmail();'>重发验证邮件</a>)";
                                //jQuery("#verifyStatus").html(msg).addClass("required");
                                // 接收通知
                                1 == "1" ? jQuery("#accept").attr("checked", "true") : jQuery("#accept").removeAttr("checked");
                        });
                </script>
<script type="text/javascript">
$(function(){
	$.ajax({
		type: "GET",
        url: <%=basePath%>+"user/getuser?username=${username}",
        success: function(data){
        	var body ="";
        	var td = "<td><a href=<%=basePath%>+'user/addLoad'>增加</a> <a href='${ctx}/user/editLoad?id=${user.id}'>修改</a>   <a href='${ctx}/user/delete?id=${user.id}'>删除</a> </td>"
        	        		
        			body  = body   + "<td>"+data+"</td>" ; 
        		
        		body  =    body + td + "</tr>";   
        	}
        	$("#tab tbody").append(body); 
        }
	});
});

</script>
        </head>
        <body>
                <div id="" class="page-header">
                        <div id="hdContent" class="navbar container">
                                <a href="/"><img alt="轻笔记Logo" title="到轻笔记官网首页." id="logoImg" class="brand" src="<%=basePath%>images/home/logo.png"/></a>
                                        <ul class="nav info-ul">
                                                <li><a href="/home" title="返回笔记">返回笔记</a></li>
                                                <li><a href="/logout" title="退出">退出</a></li>
                                        </ul>
                        </div>
                </div>
                <div id="Div_NavList">
                </div>
                <div id="content" class="container">
                                <div class="tabs">
                                        <ul>
                                                <li>
                                                        <a title="基本信息" href="#jbxx">基本信息</a>
                                                </li>
                                                <li>
                                                        <a title="修改用户名" href="#changeUserName">修改用户名</a>
                                                </li>
                                                <li class="ui-corner-left">
                                                        <a title="修改密码" href="#changePassword">修改密码</a>
                                                </li>
                                                <li>
                                                        <a title="验证邮箱" href="#verifyEmail">验证邮箱</a>
                                                </li>
                                                <li>
                                                        <a title="Email地址" href="#changeEmail">修改邮箱</a>
                                                </li>
                                                <li>
                                                        <a title="接收通知" href="#notification">接收通知</a>
                                                </li>
                                                <!--li>
                                                        <a title="修改绑定" href="#changebind">修改绑定</a>
                                                </li-->
                                                <li>
                                                        <a title="空间与贡献值" href="#spaceAndContribute">空间与贡献值</a>
                                                </li>
                                        </ul>
                                        <!--div id="changebind">
                                                <div class="articleBody">
                                                        <ul class="bind">
                                                                <li><span>腾讯</span>
                                                                            <span onclick="unbind('3')">解除绑定</span>
                                                                </li>
                                                                <li><span>百度</span>
                                                                            <span><a href="/login/baidu">去绑定</a></span>
                                                                </li>
                                                                <li><span>新浪</span>
                                                                            <span><a href="/login/sina">去绑定</a></span>
                                                                </li>
                                                                <li><span>360</span>
                                                                            <span><a href="/login/360">去绑定</a></span>
                                                                </li>
                                                                <li><span>人人</span>
                                                                            <span><a href="/login/renren">去绑定</a></span>
                                                                </li>
                                                        </ul>
                                                </div>
                                        </div-->

                                        <div id="jbxx">
                                        <div class="articleBody">
                                        <table id="tab">
  		<tr>
  			<th>id</th>
  			<th>用户名</th>
  			<th>密码</th>
  			<th>邮箱</th>
  			<th>功能</th>
  		</tr>
  		 
 	 <c:forEach items="${userList}"  var="user">
     	<tr>
  			<td>${user.id}</td>
  			<td>${user.username}</td>
  			<td>${user.password}</td>
  			<td>${user.email}</td>
  			<td><a href="${ctx}/user/addLoad">增加</a> <a href="${ctx}/user/editLoad?id=${user.id}">修改</a>   <a href="${ctx}/user/delete?id=${user.id}">删除</a> </td>
  		</tr>
     </c:forEach> 

  	</table>
    
                                                <table>
                                                        <caption>
                                                                基本信息
                                                        </caption>
                                                        <tr>
                                                                <td>用户名</td>
                                                                <td>362294931@qq.com</td>
                                                                <td>注册邮箱</td>
                                                                <td>362294931@qq.com</td>
                                                        </tr>
                                                        <tr>
                                                                <td>总空间</td>
                                                                <td>3072.00 M</td>
                                                                <td>已使用空间</td>
                                                                <td>1.12 M</td>
                                                        </tr>
                                                        <tr>
                                                                <td>贡献值</td>
                                                                <td>27 (24026673)</td>
                                                                <td>邀请码</td>
                                                                <td>kqzfjs</td>
                                                        </tr>
                                                </table>

                                                </div>
                                        </div>
                                        <div id="changeUserName">
                                                <div class="articleBody">
                                                        <p>
                                                                <label>当前用户名：362294931@qq.com</label>
                                                        </p>
                                                        <p>
                                                                <label for="passwd">登录密码</label>
                                                                <input type="password" class="field" size="25" id="passwd" />
                                                                <label></label>
                                                        </p>
                                                        <p>
                                                                <label for="username">新用户名</label>
                                                                <input type="text" id="username" />
                                                                <label></label>
                                                        </p>
                                                        <p>
                                                                <input type="button" id="btnChangeUserName" value="修改" />
                                                                <label></label>
                                                        </p>
                                                </div>
                                        </div>
                                        <div id="changePassword">
                                                <!--h2>修改密码</h2-->
                                                <div class="articleBody">
                                                        <p>
                                                                <label for="oldPassword">登录密码</label>
                                                                <input type="password" class="field" size="25" id="oldPassword" />
                                                                <label></label>
                                                        </p>
                                                        <p>
                                                                <label for="newPassword">&nbsp;&nbsp;&nbsp;新密码</label>
                                                                <input type="password" class="field" size="25" id="newPassword" />
                                                                <label></label>
                                                        </p>
                                                        <p>
                                                                <label for="newPassword2">确认密码</label>
                                                                <input type="password" class="field" size="25" id="newPassword2" />
                                                                <label></label>
                                                        </p>
                                                        <p>
                                                                <input value="修改密码" id="btn_changePassword" type="button" />
                                                                <label></label>
                                                        </p>
                                                </div>
                                        </div>
                                        <div id="verifyEmail">
                                                <div class="articleBody">
                                                        <p>
                                                                您当前的邮箱是：362294931@qq.com
                                                        </p>
                                                        <p>
                                                                其验证状态为：
                                                                    <label id="verifyStatus"><span class="required">未验证</span>(<a id="reEmail" title='验证邮箱'>重发验证邮件</a>)</label>
                                                        </p>
                                                </div>
                                        </div>
                                        <div id="changeEmail">
                                                <!--h2>Email地址</h2-->
                                                <div class="articleBody">
                                                        <p>
                                                                您当前的邮箱是：362294931@qq.com，您可以修改为其他的邮箱。
                                                        </p>
                                                        <p>
                                                            <label for="Inp_pass"> 登录密码 </label>
                                <input id="Inp_pass" class="field" size="25" type="password" />
                                <label></label>
                                                                <label for="email"> 新邮箱 </label>
                                                                <input id="email" class="field" size="25" type="text" />
                                                                <label></label>
                                                        </p>
                                                        <p>
                                                                <input id="btn_changeEmail" value="修改Email" type="button" />
                                                                <label></label>
                                                        </p>
                                                </div>
                                        </div>
                                        <div id="notification">
                                                <!--h2>接收通知</h2-->
                                                <div class="articleBody">
                                                        <p>
                                                                <input id="accept" type="checkbox"/>
                                                                <label for="accept"> 我希望接收来自轻笔记的安全更新和新消息Email通知 </label>
                                                        </p>
                                                        <p>
                                                                <input value="确定" id="btn_notification" type="button" />
                                                                <label></label>
                                                        </p>
                                                </div>
                                        </div>
                                        <div id="spaceAndContribute">
                                                <div class="articleBody">

                <table cellpadding="0" cellspacing="0">
                        <tr><td colspan="4">轻笔记存储空间及贡献值奖励规则(2012版)</td></tr>
                        <tr><td colspan="2"></td><td>存储空间奖励</td><td>贡献值</td></tr>
                        <tr><td rowspan="3">特殊贡献</td><td>用户注册</td><td>3G</td><td>0点</td></tr>
                        <tr><td>邮箱验证</td><td>0M</td><td>50点</td></tr>
                        <tr><td>邀请一位好友且该好友贡献值大于20</td><td>100M</td><td>100点</td></tr>
                        <tr><td rowspan="3">日常贡献</td><td>登录</td><td>0M</td><td>1点</td></tr>
                        <tr><td>每篇笔记</td><td>0M</td><td>1点</td></tr>
                        <tr><td>每个附件</td><td>0M</td><td>1点</td></tr>
                        <tr><td colspan="4">&nbsp</td></tr>
                        <tr><td colspan="4">最新变更（2012年3月）：</td></tr>
                        <tr><td colspan="4">邮箱验证：不再奖励存储空间。</td></tr>
                        <tr><td colspan="4">邀请好友的奖励，只有当被邀请者的贡献值大于20（除邮箱验证奖励）时才会给予。</td></tr>
                        <tr><td colspan="4">&nbsp</td></tr>
                        <tr><td colspan="4">备注：</td></tr>
                        <tr><td colspan="4">1.贡献值高者在轻笔记市场活动中将优先考虑。</td></tr>
                        <tr><td colspan="4">2.当用户剩余空间小于400M时，日常贡献奖励值x2倍；剩余空间小于100M时，日常贡献奖励x10倍。</td></tr>
                        <tr><td colspan="4">3. 群组中的所有数据只占用群组发起者个人空间，参与者同步获取的群组信息不占用个人空间。</td></tr>
                        <tr><td colspan="4">4. 行客诺（北京）科技有限公司对本规则具有最终解释权，有权对贡献值及空间奖励规则进行修改，对恶意刷贡献值及空间的用户，取消其因恶意操作所获得的相应奖励。</td></tr>
                </table>

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
                        </div>
                </div>
                <script src="<%=basePath%>js/pub/jquery-ui.js"></script>
                <script src="<%=basePath%>js/pub/jquery.validate.min.js"></script>
                <script src="<%=basePath%>js/profile.plain.js"></script>
        </body>
        <script type="text/javascript">
                jQuery(function() {
                                var ind;
                                switch(location.hash){
                                        case "#pass":ind=2;break;
                                        case "#email":ind=3;break;
                                }
                        jQuery(".tabs").tabs().tabs('select',ind);
                });
        </script>
</html>
