function replaceFlag(s)
{
	s=s.replace(/[;,\，\；\n ]/g,",");
	return s
}

function getArray(s)
{
	arr = s.split(",");
	return arr;
}


function EmailShare(nId){
	this.noteId=nId;
	this.initUI();
}
EmailShare.prototype={
	"initUI":function(){
	var tttt="您好:"
			+"\n	"+$("#userName").html()+"邀请您加入 UE,UI 群组，通过轻笔记多终端实时同步支持的团队协作功能，您可以与好友更好地完成这项活动。"
			+"\n    群组名称：UE,UI"
			+"\n    群组编号：6651"
			+"\n    群组简介：吵吵，众众"
			+"\n您可以通过以下两种方法加入群组："
			+"\n   方法1：登录轻笔记的客户端软件（支持Windows/Android/iPhone平台，下载地址 http://www.qingbiji.cn/download），在菜单中点击“申请加入群组”，通过群组编号，查找并加入本群组。"
			+"\n   方法2：通过浏览器访问 http://www.qingbiji.cn/group，填写附加信息并申请加入该群组。"
			+"\n备注：如果您还没有轻笔记账号，请登陆  http://www.qingbiji.cn进行注册，畅享轻笔记带来的全新生活体验。"
			+"\n如果您有任何问题，请发送Email至 info@qingbiji.cn进行咨询，我们会尽快为您解决。"
			+"\n感谢您使用轻笔记！";

	var e=$("<span/>",{"style":"float:left;width:60px;padding-right:5px;text-align:right;","text":"收件人"});
	var inf=$("<span/>",{"style":"float:left;width:60px;padding-right:5px;text-align:right;","text":"附加正文"});
	this.alt=$("<span/>",{"style":"position:absolute;display:none;top:0px;left:533px;height:25px;color:white;line-height:25px;text-align:center;background:#1c97fe;","text":"您的邮件正在发送..."});
	this.email = $("<input/>",{"style":"width:600px;"});
	this.msg = $("<textarea/>",{"style":"height:180px;width:600px;","title":"此处输入的文字，将会作为附言置于邮件正文之上（可以为空）","value":"此处输入的文字，将会作为附言置于邮件正文之上（可以为空）"});
	this.UIBody=$("<div/>");
	this.UIBody.append("请输入Email地址，多个Email以空格,分号,分割；通过Email分享笔记。<br/><br/>");
	this.UIBody.append(e,this.email,"<br/><br/>").append(inf,this.msg).append(this.alt);;
	this.msg.click(function(){
		$(this).select();
	});
	//this.UIBody.append(e,this.email,"<br/><br/>").append(this.alt);;
	
	},
	"show":function(){
		var alt=this.alt;
		var div = this;
		var state=1;	
		//this.overDiv=TN.createOverDiv(2);
		//$("body").append(this.html);
		this.abc=this.UIBody.dialog({
			"modal":true,
			"title":"邮件分享",
			"width":740,
			"open":function(){
						//$(":button").eq(2).css({"border":"none","height":"32px"});
						//$(":button").eq(2).find("span").css({"width":"71px","height":"19px","color":"white"}).addClass("Button2");
			},
			"buttons":{ 
				"关闭":function(){
					$(this).remove()
				},
				"发送":function(){
						if(!state){
							return false;
						}
						var tmpD = this;
						emailList =$.trim(div.email.val());
						emailList = replaceFlag(emailList);
						arr = getArray(emailList);
						for(i=0;i<arr.length;i++){
							if(!$.trim(arr[i])){
								continue;	
							}
							var reg = /^([a-zA-Z0-9]+([\.+_-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/g;
							if(!reg.test(arr[i])){
								alert("邮件地址不正确");
								state=1;
								return;	
							}
						}
						state=0;
						if(!emailList){
							alert("邮件地址不能为空。");	
							state=1;
							return false;
						};
						alt.show();
						var noteContent=div.msg.val();
						var t=div.msg.attr("title");
						if(noteContent==t){
							noteContent="";
						}
						$.ajax({
							type : "post",
							url : "/sendNoteMail",
							cache : false,
							dataType : "json",
							data : {
								noteId :div.noteId,
								email  : emailList,
								subject : "邮件分享",
								content :noteContent
							},
							success : function(data)
							{
								state=1;
								if(data["result"] == "ok"){
									alt.text("邮件分享成功,此窗口即将关闭.");
								setTimeout(function(){
									$(tmpD).remove();
								}, 3000)								
								}else{
									alt.hide();//.text("邮件分享成功,此窗口即将关闭.");
									alert(data.message);
								}
							},
							error : function(){
								//div.msg.text("error");
								bt.text("发送");	
								state=1;
								alert("error");
							}
						})
				}
				}
		});
	}
}
