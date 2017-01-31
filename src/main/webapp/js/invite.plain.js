function Invite(Uid){
	this.Uid=Uid;
	this.clip = new ZeroClipboard.Client();
	this.initUI();	
	var that=this;
			this.clip.setHandCursor( true );
			
	
			
			this.clip.addEventListener('mouseOver', function (client) {
				// update the text on mouse over
				//clip.setText( $('fe_text').value );
			});

			this.clip.addEventListener('complete', function (client, text) {
				var div=$("<div/>",{"text":"链接地址已经复制到剪切版"});
				$("body").append(div);
				div.dialog({
					"title":"复制成功",
					"close":function(){
						that.overDiv?that.overDiv.remove():"";
					},
					"buttons":{
						"确定":function(){
							$(this).remove();
							that.overDiv?that.overDiv.remove():"";
						}
					}
				});
				that.UIBody.remove();
			});

				
}
Invite.prototype={
	"initUI":function(){
		var html="<p>邀请您的朋友使用轻笔记，每邀请一个朋友通过您的推广链接注册轻笔记，我们将奖励您100M空间。</p>";
			html+="<p>您可以把推广链接通过Email，QQ，MSN等发送给您的朋友，或者把推广链接写在您的博客上，微博上。通过这个推广链接每注册一个新用户，我们将奖励您100M空间。</p>";
			html+="<p>您的推广链接为：http://www.qingbiji.cn/affiliate/"+this.Uid+"<div id='d_clip_container' style='position:relative'>";
			html+="<div id='d_clip_button' style='width:110px;' class='my_clip_button'><b class='btn'>复制链接地址</b></div></div></p>";
		this.UIBody=$("<div/>",{"html":html});
	
	},
	"show":function(){
		this.overDiv=TN.createOverDiv(2);
		$("body").append(this.overDiv,this.html);
		var that=this;
		this.abc=this.UIBody.dialog({
			"title":"邀请朋友",
			"width":"500",
			"close":function(){
				that.overDiv.remove();
			}
		});
		this.clip.glue("d_clip_button","d_clip_container");
		var str="http://www.qingbiji.cn/affiliate/"+this.Uid;
		this.clip.setText(str);
	}
}
