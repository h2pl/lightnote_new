function AddMember(userName,pId,name,pInfo){
	this.projectId=pId;
	this.initUI(userName,name,pId,pInfo);
}
AddMember.prototype.initUI=function(userName,projectName,projectId,projectInfo){
	var tttt="您好:"
			+"\n	"+userName+"邀请您加入  "+projectName+"  群组，通过轻笔记多终端实时同步支持的团队协作功能，您可以与好友更好地完成这项活动。"
			+"\n    群组名称: "+projectName
			+"\n    群组编号: "+projectId
			+"\n    群组简介: "+projectInfo
			+"\n您可以通过以下两种方法加入群组："
			+"\n   方法1：登录轻笔记的客户端软件（支持Windows/Android/iPhone平台，下载地址 http://www.qingbiji.cn/download），在菜单中点击“申请加入群组”，通过群组编号，查找并加入本群组。"
			+"\n   方法2：通过浏览器访问 http://www.qingbiji.cn/project/"+projectId+"，填写附加信息并申请加入该群组。"
			+"\n备注：如果您还没有轻笔记账号，请登陆  http://www.qingbiji.cn进行注册，畅享轻笔记带来的全新生活体验。"
			+"\n如果您有任何问题，请发送Email至 info@qingbiji.cn进行咨询，我们会尽快为您解决。"
			+"\n感谢您使用轻笔记！";
	var e=$("<span/>",{"style":"float:left;width:40px;padding-right:5px;text-align:right;","text":"收件人"});
	var inf=$("<span/>",{"style":"float:left;width:40px;padding-right:5px;text-align:right;","text":"消息"});
	this.alt=$("<span/>",{"style":"position:absolute;display:none;top:84px;left:533px;width:150px;height:25px;color:white;line-height:25px;text-align:center;background:#1c97fe;","text":"您的邮件正在发送..."});
	this.email = $("<input/>",{"style":"width:640px;"});
	this.msg = $("<textarea/>",{"style":"height:180px;width:640px;","value":tttt});
	this.UIBody=$("<div/>");
	this.UIBody.append("请输入Email地址，多个Email以空格,分号分割;通过Email分享笔记。<br/><br/>");
	this.UIBody.append(e,this.email,"<br/><br/>").append(inf,this.msg).append(this.alt);;
	return false;
	this.UIBody=$("<div/>",{});
	this.email=$("<textarea/>",{"style":"width:260px;height:50px;"});
	this.UIBody.append("请输入一个或多个邮件地址，用空格或者回车隔开。<br/>",this.email);
}
AddMember.prototype.produceEmailStr=function(val){
		var tempStr=val.replace(/\n/g," ");
			tempStr=tempStr.replace(/,/g," ");
			tempStr=tempStr.replace(/;/g," ");
			return tempStr;
}
AddMember.prototype.show=function(){
	var that=this;
	var alt=that.alt;
	var state=1;	
	this.UIBody.dialog({
		"modal":true,
		"title":"邀请成员",
		"width":740,
		"open":function(){
				$(".ui-button").eq(1).css({"border":"none","height":"32px"});
				$(".ui-button").eq(1).find("span").css({"width":"71px","height":"19px","color":"white"}).addClass("Button2");
		},
		"buttons":{
			"关闭":function(){
				$(this).remove()
			},
			"发送":function(){
				var eml=that.email.val();
				if(!state){
					return false;
				}
				if(eml!=""){
					var str=that.produceEmailStr(that.email.val());
					arrList = str.split(" ");
					for(i=0;i<arrList.length;i++)
					{
						email = arrList[i]
						if(!$.trim(email)){
							continue;	
						}
						//var reg = /\w+[\w.]*@[\w.]+\.\w+/g;
						var reg = /^([a-zA-Z0-9]+([\.+_-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/;
						if(!reg.test(email))
						{
							alert("邮件地址不正确");
							state=1;
							return;	
						}
					}
					state=0;
					if(!arrList){
						alert("邮件地址不能为空。");	
						state=1;
						return false;
					};
					alt.show();
					that.sendEmail(str,$(this));
				}else{
					alert("请先输入邮箱地址");
				}
			}
		}
	});
}
AddMember.prototype.sendEmail=function(str,dlg){
	var that=this;
	var ld=TN.Loading({"message":"正在发送，稍后..."});
		ld.turnOn();
	$.ajax({
		type:"POST",
		url:"/pj/invite",
		data:{"emails":str,"projectId":that.projectId},
		dataType:"json"
	}).done(function(data){
		ld.turnOff();
		if(data.result=="ok"){
			var msg=TN.Message();
				msg.type="ok";
				msg.show("发送成功。");
			dlg.remove();
		//	location.href="/group"
		}else{
			alert(data.message);
		}
	}).error(function(){	
		ld.turnOff();
	});
}
