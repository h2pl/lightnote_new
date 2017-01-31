	//公共内存区域
	var PublicStatic={
			"config":{"animateSpeed":200,"content_height":setContentSize(),"allSortType":$("#defaultSort").val()},
			"selectedLi":null,
			"publicClick":function(ie){
					var allFolder=PublicStatic.allFolder;
					if(allFolder){
						allFolder.noteTotal++;
						allFolder.VClass.chengeFaceInfo();
					}
					var child=ListBox.getActiveChild().getSelectChild();
					if(child===this.selectedLi){
						child.VClass.tempBT.click();				
					};
			},
			"groupAlertCount":0,
			"defalutFolder":null,
			"allFolder":null
	}
	$("body").append($("<input/>",{"type":"hidden","id":"publicButton"}).click(function(e){PublicStatic.publicClick(e);}));
	window.onresize=function(){
		var ht=setContentSize();	
		var cl;
		if(ListBox!=undefined&&ListBox.MClass!=undefined&&ListBox.MClass.childList){
			ListBox.MClass!=undefined?cl=ListBox.MClass.childList:"";
			PublicStatic.config.content_height=ht;
			for(var i=0;i<cl.length;i++){
				cl[i].VClass.UIContent.css("height",(ht-40)+"px");
			}
			var cl2=ChildBox.MClass.childList;
			for(var i=0;i<cl2.length;i++){
				cl2[i].VClass.UIContent.css("height",(ht-40)+"px");
			}
		}
	};
	function setContentSize(){
		//调整页面在浏览器内的显示高度	
		ht =$(window).height()-$(".page-header").height()-$("#Div_NavList").height()-12;
		$("#content").css({"height":ht+"px"});
		return ht;
	}
	/*基类====================================================================OBJCET*/
	/****object控制类****/
	function Object_C(father){
		//注意顺序，展示类需要实体类数据；M->V
		this.fatherClass=father;
	}	
		//得到子对象数量（子对象存在于，MClass 里的childList数组中）；
		Object_C.prototype.getChildCount=function(){
			return this.MClass.childList.length;
		}
		Object_C.prototype.getChildById=function(tmpId){
			var vp=this;
			var obj=null;
			var cl=this.MClass.childList;
			for(var i=0;i<cl.length;i++){
				if(cl[i].MClass.id==tmpId){
					obj=cl[i];	
					break;
				}
			}
			return obj;
		}
		//根据index返回子内容对象
		Object_C.prototype.getChildByIndex=function(index){
			var vp=this;
			var obj;
			var cl=this.MClass.childList;
			for(var i=0;i<cl.length;i++){
				if(cl[i].MClass.index==index){
					obj=cl[i];
					break;
				}
			}
			return obj;
		}
		//删除制定对象
		Object_C.prototype.removeChild=function(obj){
			var cl=this.MClass.childList;
				for(var i=0;i<cl.length;i++){
					if(cl[i].MClass.id==obj.MClass.id){
						cl[i].close(1);
						cl.splice(i,1);
						break;
					}
				}
		}
		//激活子CList
		/*
		 * bool true为激活并显示当前，false是为只激活，不显示
		 * */
		Object_C.prototype.setActiveChildByIndex=function(index,bool){
			var cl=this.MClass.childList;
			for(var i=0;i<cl.length;i++){
				var cli=cl[i];
				cli.MClass.attr=false;
				bool?cli.VClass.UIBody.hide("slow"):"";
			}
			var clindex=cl[index-1];
			clindex.MClass.attr=true;
			bool?clindex.VClass.UIBody.show("slow"):"";

		}
		//返回被选中子文件
		Object_C.prototype.getActiveChild=function(){
			var obj;
			var cl=this.MClass.childList;
			for(var i=0;i<cl.length;i++){
				if(cl[i].MClass.attr==true){
					obj=cl[i];
					break;
				};
			}
			return obj;
		}
		//设置选中子对象
		Object_C.prototype.setSelectChild=function(obj){
			this.MClass.selectedChild=obj;
		}
		//得到选中的子对象
		Object_C.prototype.getSelectChild=function(){
			return this.MClass.selectedChild;
		}
		//从后边往前查找对象 exp：index=0时，返回最后一个对象；
		Object_C.prototype.getChildForLast=function(index){
			var mc=this.MClass;
			var count=mc.childList.length-(1+index);
				return mc.childList[count];
		}
		//关闭对象；
		Object_C.prototype.close=function(trans){
			var vp=this;
			var MC=vp.MClass;
			MC=null;
			var T;
			switch(trans){
				case 1:T={"filter":"alpha(opacity=30)","opacity":"0.3"};//淡出
				case 2:T={"height":"0px"};//变窄
			}
			if(trans!=0){
				vp.VClass.UIBody.animate(T,100,function(){
					$(this).remove();vp.VClass=null;
				});
			}else{
				vp.VClass.UIBody.remove();
				vp.VClass=null;
			}
		}
		//增加子对象
		Object_C.prototype.addChild=function(Object){
			this.VClass.addTage(Object);
			this.MClass.childList.push(Object);
			//this.MClass.pushChildList(Object);
		}
		//将自己insert入fatherClass中；
		Object_C.prototype.insertTo=function(bool){
			var tageObject=this.fatherClass;
			//如果fatherClass是自定义对象
			if(tageObject.VClass!=undefined&&tageObject.VClass.Type=="TNoteObject"){
				//tageObject.MClass.pushChildList(this);
				tageObject.MClass.childList.push(this);
				this.VClass.insertToTNoteObject(tageObject);
				this.MClass.index=tageObject.MClass.childList.length;
			}else{//如果fatherClass是DOM树；
				tageObject.append(this.VClass.UIBody);
			}
		}
/****object显示类****/
	function Object_V(){
		this.Type="TNoteObject";
		this.UIBody;
		this.UIContent;
	}
		//初始化界面 定义自己的显示封装UIBody；
		Object_V.prototype.initUI=function(){
			this.UIBody=$("<div/>",{
				"text":"object",
				"style":""
			});
			this.UIContent=$("<div/>");
			this.UIBody.append(this.UIContent);
		}
		//增加子对象的显示
		Object_V.prototype.addTage=function(tageObject){
			var VO=this;
				VO.UIContent.append(tageObject.VClass.UIBody);
		}
		//绑定右键事件的方法
		Object_V.prototype.bindRClick=function(tage,fun){
			tage.mousedown(function(evt){
				var e = evt;
				if(e.which==3) {
					fun(evt);
				};
			});
			return false;
		}
		//初始化事件
		Object_V.prototype.initEvent=function(){

		}
		//把自己添加到自定义类
		Object_V.prototype.insertToTNoteObject=function(tageObject){
			var VC=tageObject.VClass;//找到对象中的表示层，声明局部变量
			if(VC!=undefined&&VC.Type=="TNoteObject"){//think自定义对象
				VC.UIContent.append(this.UIBody);
			}
		}
	
	/*LI父类*/
	function Li_C(father){
		Object_C.call(this,father);
	}
	TN.Extend(Object_C,Li_C);
		//此对象被选中
		Li_C.prototype.selected=function(bool){//当bool为true的时候执行 getContent();查找子内容；
			PublicStatic.selectedLi=this;
			var cl=this.fatherClass.MClass.childList;//找到列表容器中的对象
				for(var i=0;i<cl.length;i++){
					//cl[i].VClass.UIBody.css({"background":"white"});
					cl[i].VClass.UIBody.removeClass("liSelected");
				}
				this.VClass.UIBody.addClass("liSelected");
				this.fatherClass.setSelectChild(this);
				if(bool){
					this.getContent();	
				}
		
		}
		//移除此对象
		Li_C.prototype.remove=function(){
			var vp=this;
			var index=vp.MClass.index;
			//用自己对象的Ajax清空数据库；
			vp.removeForAjax();
		}
		//标记
		Li_C.prototype.marked=function(){
			this.VClass.mark.attr("checked",true);
		}
		//增加特有属性
		Li_C.prototype.addPersonEvent=function(){
			return false;
		}
		//click事件 （此处为了优化代码，将所有LI对象处理为统一click事件，如差别甚大，可写入每个具体的LI对象中）
		Li_C.prototype.clickEvent=function(){
			var fc=this;
			var vp=this.VClass;
			var MC=this.MClass;
		//		PublicStatic.selectedLi=fc;
				fc.used=fc.fatherClass.used;
					if(fc.used=="showList"&&MC.id=="000"){
						fc.pageNum=1;
						fc.clicked=0;
						vp.fatherClass.selected(true);
					}
					if(fc.used=="showList"&&MC.id!="005"&&MC.id!="000"){//显示栏中的文件夹//在左边点击
						vp.fatherClass.selected(true);
					}else if(fc.used=="showChild"){//详细列表中的文件夹
							vp.fatherClass.selected(false);
							ListBox.VClass.marLeft=ListBox.VClass.marLeft-ListBox.getActiveChild().VClass.width;
							ListBox.setActiveChildByIndex(ListBox.getChildCount(),true);//激活最后一个Clist
							ChildBox.VClass.UIBody.animate({"margin-left":"-680px"},PublicStatic.config.animateSpeed,function(){
								var chAry=ListBox.getChildForLast(0).MClass.childList;
							if(MC.id=="005"){//要获取搜索页面


							}else{
								for(var i=0;i<chAry.length;i++){//找到List表中对应的选项
									if(chAry[i].MClass.id==MC.id){
										chAry[i].selected(true);
									}
								}
							}
							Nav.addChild();	
						});
					}
		}
		//右键菜单初始化，给所有LI对象增加右键菜单“公共”群组
		Li_C.prototype.rightMenu=function(evt,x,y){
			var vp=this;
			var vc=vp.VClass;
			var MC=vp.MClass;
					var bol;
					vp.used=="showList"?bol=true:bol=false;
					vc.fatherClass.selected(false);
					var men=new Menu_C(vc,x,y);
					vp.addPersonEvent(men);
					var strDel="删除";
					MC.serverData.modify==1?men.bindEventData("重命名",function(){
						men.close(1);
						vc.spanName.hide();
						var inp=$("<input/>",{"class":"InpRename","style":"height:10px;","value":vc.spanName.text(),"maxlength":"50"});
						vc.spanName.after(inp);//.append(ok);
						inp.focus().select();
						inp.click(function(ev){
							$(this).focus();
							return false;
						});
						var ok=function(){
							var val=inp.attr("value");
							val=$.trim(val);
							if(val!=null&&val!=""&&val!=vc.spanName.text()){
								vp.reName(inp.attr("value"),function(bool){
									MC.name=val;
									if(bool){
										vc.spanName.text(MC.name);
										vc.spanName.attr("title",val);
									}
									vc.spanName.show();
									if(!bol){
										if(MC.oc!="H"){
											vc.spanName.text(MC.name);
											vc.spanName.attr("title",val);
										}
									}
									inp.remove();
								});
							}else{
								cancle();
							}
						}
						var cancle=function(){
							vc.spanName.show();
							inp.remove();
						}
						inp.keydown(function(evt){
							evt.keyCode == 13?function(){return false;}:"";
							evt.keyCode == 27?function(){return false;}:"";
						});
						inp.keyup(function(evt){
							evt.keyCode == 13?ok():"";
							evt.keyCode == 27?cancle():"";
							return false;
						});
						inp.blur(function(){
							ok();
						});
					},"T_iconRename"):"";
					men.show();
		}
		//绑定右键
		Li_C.prototype.bindRight=function(){
			var vp=this;
			var vc=vp.VClass;
			var MC=vp.MClass;
			var allFolder=!(MC.id&&MC.id=="000"||MC.id=="005"||MC.id=="007");
			//注册右键事件 （此方法存在与Object_V中）
			vc.bindRClick(vc.UIBody,function(evt){
				allFolder?vp.rightMenu(evt,evt.pageX,evt.pageY):"";
				return false;
			});

			vc.downIcon.click(function(evt){
				allFolder?vp.rightMenu(evt,evt.pageX,evt.pageY):"";
				return false;
			});
		}
		Li_C.prototype.removeMClassChild=function(obj){
			var cl=this.MClass.childList;	
			for(var i in cl){
				if(cl[i]==obj){
					cl.splice(i,1);
				}
			}
		}
	//Li的显示类
	function Li_V(father){
		Object_V.call(this);	
		this.fatherClass=father;
	}
	TN.Extend(Object_V,Li_V);
	//初始化公共显示部分
	Li_V.prototype.initPublicUI=function(MC){
		var vp=this;
		//vp.UIBody=$("<div/>",{"class":"Li","onselectstart":"return false"});
		vp.UIBody=$("<div/>",{"class":"Li"});
		vp.spanName=$("<span/>",{"class":"sname textOver","text":MC.name,"title":MC.name});	
		var usd=(vp.fatherClass.fatherClass.used);
		usd=="showList"?vp.spanName.addClass("sname1"):vp.spanName.addClass("sname2");
		vp.downIcon=$("<div/>",{"class":"downIcon"})
	}
	//此处为了达到插入顶端，重写Object_V中的insertToTNoteObject方法；每次插入都会插入到列表顶端
	Li_V.prototype.insertToTNoteObject=function(tageObject){
			var VC=tageObject.VClass;//找到对象中的表示层，声明局部变量
			if(VC!=undefined&&VC.Type=="TNoteObject"){//think自定义对象
				var le=VC.UIContent.find($(".Li")).length;
		//		if(le>0){
				if(this.insertType=="top"){
					VC.UIContent.find($(".Li")).eq(0).before(this.UIBody);
				}else{
					VC.UIContent.append(this.UIBody);
				}
			}
		}
	/*======================================================================================PROJECT*/
	/****project控制类****/
	function Project_C(father,Json,str){
		Li_C.call(this);
		this.fatherClass=father;
		var MC={"childList":[],"serverData":Json,"id":Json.projectId,"name":Json.projectName};
		this.MClass=MC;
		var VC=new Project_V(this);
			VC.insertType=str;
		this.VClass=VC;
		this.bindRight();
		this.insertTo();
	}
	TN.Extend(Li_C,Project_C);
	//重命名 Ajax接口
	Project_C.prototype.reName=function(name,fun){
		var MC=this.MClass;
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
		$.ajax({
			"type" : "POST",
			"url" : "/pj/rena",
			"cache" : false,
			"dataType" : "json",
			"data":{"pi":MC.id,"pn":name,"fi":MC.serverData.folderId},
			"complete":function(){
				ld.turnOff();
			},
			"error":function(jqxhr, textStatus, errorThrown){	
				var msg=new Message();
				msg.type="ok";
				msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);
			},
			"success" : function(data) {//data 返回数组
				if(data.result=="ok"){
					MC.name=name;
					fun(1);
					MC.serverData.lastUpdateTime=data.updateTime;
				}else{
					fun(0);
					alert(data.message);
				}
				//
			}
		});
	}
	//删除 Ajax接口
	Project_C.prototype.removeForAjax=function(fun){
		var vp=this;
		var MC=vp.MClass;
		var FC=vp.fatherClass;
		var ld=TN.Loading({"message":"正在删除。。"});
		ld.turnOn();
		$.ajax({
		type : "POST",
		url : "/pj/rp",
		cache : false,
		dataType : "json",
		data:{"pi":MC.id},
		complete:function(){
			ld.turnOff();
		},
		error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
		success : function(data) {//data 返回数组
			if(data.result=="ok"){
				FC.removeChild(vp);	
				var LBcl=ListBox.getChildForLast(1).MClass.childList;
				FC.used=="showList"&&LBcl.length>0?LBcl[0].selected(true):"";
				FC.used=="showChild"?ListBox.getChildForLast(0).removeChild(vp):"";
			}else{
				alert(data.message);
			}
		}
		});
	}
	//获取内容 Ajax接口
	Project_C.prototype.getContent=function(){
		var vp=this;
		var MC=vp.MClass;
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
		$.ajax({
			type : "get",
			url : "/gfall",
			cache : false,
			dataType : "json",
			data:{f :MC.serverData.folderId},
			complete:function(){
				ld.turnOff();
			},
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
			success : function(data) {//data 返回数组
				ChildBox.removeLast();//清除掉ChildBox的Clist，用以显示最新内容
				vp.fatherClass.removeNextClist();//清除掉尾部隐藏的Clist
				new CList_C(ChildBox,data.data,vp);
				var cl=new CList_C(ListBox,data.data,vp);
				cl.VClass.UIBody.hide("slow");
				}
			});
	}
	//退出群组 Ajax接口
	Project_C.prototype.logOutProject=function(){
		var MC=this.MClass;
		var ld=TN.Loading({"message":"正在退出。。"});
		var vp=this;
		ld.turnOn();
		$.ajax({
			type:"GET",
			url:"/pj/quit",
			data:{"pi":MC.id},
			dataType:"json",
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);}
		}).done(function(data){
			ld.turnOff();
			if(data.result=="ok"){
				var msg=new Message();
				msg.type="ok";
				msg.show("退出成功");
				location.href="/group";
			}else{
				alert(data.message);
			}
		});
	
	}
	//特有右键事件 私有的
	Project_C.prototype.addPersonEvent=function(Menu){
		var vp=this;
		var MC=this.MClass;
		Menu.bindEventData("邀请成员",function(){Menu.close();
				var aM=new AddMember($("#username").val(),MC.id,MC.name,MC.serverData.intro);
				aM.show();
			},"T_iconInvite");
		//右键内容管理群组
		$("#source").val()!="baidu"&&MC.serverData.manage=="1"?Menu.bindEventData("管理群组",function(){Menu.close();location.href="project/setting/"+MC.id;},"T_iconManagement"):"";
		MC.serverData.type=="custom"&&MC.serverData.manage=="1"?Menu.bindEventData("权限设置",function(){Menu.close();location.href="/project/permission/"+MC.id;},"T_iconRightSet"):"";
		//退出
		MC.serverData.isOwner!=1?Menu.bindEventData("退出群组",function(){Menu.close();
			if(confirm("退出后您将不能获取此群组信息，确认退出？")){
				vp.logOutProject();
			}
		},"icon-remove"):"";
		MC.serverData.remove==1?Menu.bindEventData("删除群组",function(){Menu.close(2);if(confirm("确实要删除？")){vp.remove();}},"T_iconDelete"):"";
	}
	Project_C.prototype.allCancel=function(){
		//取消所有更新
		var that=this;
		var PI=this.MClass.id;
		$.ajax({
			type:"post",
			url:"/readnotelogs",
			dataType:"json",
			data:{"projectId":PI},
			success:function(data){
				if(data.result=="ok"){
					var msg=new Message();
						msg.type="ok";
						msg.show("操作成功");
					that.VClass.sp_upCount.html("");
				}else{
					alert(data.message);
				}
			}
		})	
	
	}
	//获取更新列表
	Project_C.prototype.getUpList=function(){
		var MC=this.MClass;
		var listData;
		var ld=TN.Loading({"message":"正在获取数据..."});
		ld.turnOn();
		$.ajax({
			type:"GET",
			url:"/pj/gpul",
			async:false,
			cache:false,
			data:{"projectId":MC.id},
			dataType:"json",
			complete:function(){
				ld.turnOff();	
			},
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
			success:function(data){
				listData=data;
			}
		});	
		return listData;
	}


	/***project群组展示类****/
	function Project_V(father){
		Li_V.call(this,father);
		this.initUI(this.fatherClass.MClass);
	}
	TN.Extend(Li_V,Project_V);
		//重写initUI 方法
		Project_V.prototype.initUI=function(MC){
			var vp=this;
			vp.initPublicUI(MC);//初始化公用UI
			var path;
			switch(MC.serverData.isOwner){
				case 1:path="/static/images/home/project/project_C.png";break;
				case 0:path="/static/images/home/project/project.png";break;
			}
			var img=$("<img/>",{"class":"icon","src":path});
			vp.sp_upCount=$("<div/>",{"class":"countDiv"});
			var holdSpace=$("<div/>",{"class":"upCount"});
			vp.UIBody.append(holdSpace);
			if(MC.serverData.updateNoteCount>0){
				var count=0;
				var at;
					!PublicStatic.groupAlertCount?at=QBJ.PageAlert.addAlert(vp.UIBody,{"name":"group001",msg:"点击可以查看哦",y:45,"width":120}):"";
					PublicStatic.groupAlertCount=1;
				MC.serverData.updateNoteCount>99?count="99+":count=MC.serverData.updateNoteCount;
				vp.sp_upCount.data("at",at);
				holdSpace.append(vp.sp_upCount.append(""+count));
			};
			if(vp.fatherClass.used=="showList"){
				vp.tempBT=$("<button/>",{"style":"position:absolute;top:0px;left:0px;width:0px;height:0px;z-index:-1;"});
				vp.tempBT.attr("id","li"+MC.serverData.folderId)
				vp.UIBody.append(vp.tempBT);
			};
			vp.UIBody.append(img).append(vp.spanName);
			vp.spanName.attr("title",MC.name);
			vp.UIBody.append(vp.downIcon);
			vp.initEvent();
		}
		Project_V.prototype.chengeFaceInfo=function(){
		}
		Project_V.prototype.showUpList=function(data){
			var that=this;
			var MC=that.fatherClass.MClass;
			var clickAry=new Array();//记录点击列表
			var div=$("<div/>",{"style":"width:800px;max-height:300px;"});
				var table=$("<table/>",{"class":"table table-bordered table-stripped"});
				var tr1=$("<tr/>",{});
					tr1.append("<th>笔记标题</th>","<th>最后更新时间</th>","<th>最后更新用户</th>");
					table.append(tr1);
				var length=data.length<99?data.length:99;
				for(var i=0;i<data.length;i++){
					var d=TN.formatDate(data[i].updateTime,"yyyy-MM-dd hh:mm:ss");
					var u=data[i].updateUsername
					var tr=$("<tr/>",{});
					var td1=$("<td/>",{});
					var a=$("<a/>",{"text":data[i].title,"href":"/showNote/"+data[i].noteId,"target":"_blank"});
						a.data("noteId",data[i].noteId);
					td1.append(a);
					var td2=$("<td/>");
						td2.append("<span>"+d+"<span/>");
					var td3=$("<td/>");
						td3.append("<span>"+u+"</span>");
						tr.append(td1,td2,td3);
					a.click(function(){
						var bool=true;
						var noteId=$(this).data("noteId");
						for(var j=0;j<clickAry.length;j++){
							if(clickAry[j]===noteId){
								bool=false;	
							}
						}
						if(bool){
							clickAry.push(noteId);	
						}
					//	window.open("/showNote/"+noteId,"_black");	
					});
					table.append(tr);
				}
			div.append(table);
			div.dialog({
				"modal":true,
				title:"群组更新笔记列表",
				width:"500px",
				buttons:{
					"标记为全部已读":function(){
						that.fatherClass.allCancel();
						$(this).remove();
					},
					"关闭":function(){
						MC.serverData.updateNoteCount=MC.serverData.updateNoteCount-clickAry.length;
						var endCount=MC.serverData.updateNoteCount;
						if(endCount<1){
							that.sp_upCount.hide();
						}else{
							that.sp_upCount.text(endCount);
						}
						$(this).remove();
					}
				},
				close:function(){
						MC.serverData.updateNoteCount=MC.serverData.updateNoteCount-clickAry.length;
						var endCount=MC.serverData.updateNoteCount;
						if(endCount<1){
							that.sp_upCount.hide();
						}else{
							that.sp_upCount.text(endCount);
						}
						$(this).remove();
				}
			});

		}
		//初始化事件
		Project_V.prototype.initEvent=function(){
			var vp=this;
			this.UIBody.click(function(evt){
					vp.fatherClass.clickEvent();
					return false;
			});
			vp.sp_upCount.click(function(){
				var data=vp.fatherClass.getUpList();
				var at=$(this).data("at");
				at?at.removeAll():"";
				if(data&&data.length>0){
					var length=data.length<99?data.length:99;
					//更新群组左侧的红色数字的值为 data.length
					$(this).html(""+data.length);
					vp.fatherClass.MClass.serverData.updateNoteCount=data.length;
					vp.showUpList(data);
				}else{
					$(this).remove();
					//清空群组左侧的红色数字
				}
				return false;
			});
		}
	///////////////////==========================================================================
	/*文件夹控制类*/
	function Folder_C(father,Json,str){
		Li_C.call(this);
		this.fatherClass=father;
		this.pageNum=1;
		this.pageTotal;
		this.noteTotal=Json.noteCount;
		this.folderTotal=Json.folderCount;
		var MC={"serverData":Json,"childList":[],"id":Json.folderId,"name":Json.folderName};
		this.MClass=MC;
		var VC=new Folder_V(this);
			VC.insertType=str;
		this.VClass=VC;
		this.bindRight();
		this.insertTo();
		if(Json.folderId=="000"){
			PublicStatic.allFolder=this;
		};
	//	this.fatherClass.MClass.creator.MClass.childList.push(this);
	}
	TN.Extend(Li_C,Folder_C);
	//移除 Ajax接口
	Folder_C.prototype.removeForAjax=function(fun){
		var vp=this;
		var MC=vp.MClass;
		var FC=vp.fatherClass;
		var ld=TN.Loading({"message":"正在删除.."});
		ld.turnOn();
		$.ajax({
		type : "GET",
		url : "/deleteFolder/"+MC.id,
		cache : false,
		dataType : "json",
		complete:function(){
			ld.turnOff();
		},
		error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
		success : function(data) {//data 返回数组
			if(data.result=="ok"){
					FC.removeChild(vp);	
					FC.MClass.creator.removeMClassChild(vp);
					FC.MClass.creator.folderTotal--;
					FC.MClass.creator.VClass.chengeFaceInfo();
					var LBcl=ListBox.getChildForLast(1).MClass.childList;
					ChildBox.getChildForLast(0).VClass.isNothing();
					if(FC.used=="showList"){
						if(LBcl.length>0){
							LBcl[0].selected(true);
						}else{
							Nav.setPositionByIndex(FC.MClass.index-2);//nav中的index和MClass中的index是不同的。
						}
					}else if(FC.used=="showChild"){
						ListBox.getChildForLast(0).removeChild(vp);
					}
			}else{
				alert(data.message);
			}
		}
		});
	}
	//重命名 Ajax 接口
	Folder_C.prototype.reName=function(name,fun){
		var vp=this;
		var MC=vp.MClass;
		var ld=TN.Loading({"message":"正在重命名.."});
		ld.turnOn();
		$.ajax({
		type : "POST",
		url : "/renameFolder/"+MC.id,
		cache : false,
		dataType : "json",
		data:{"folderName":name},
		complete:function(){
			ld.turnOff();
		},
		error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
		success : function(data) {//data 返回数组
			if(data.result=="ok"){
				fun(1);
				MC.serverData.lastUpdateTime=data.updateTime;
			}else{
				fun(0);
				alert(data.message);
			}
		}
		});
	}
	Folder_C.prototype.setDefault=function(){
			//setDefaultFolder
			var vp=this;
			var id=this.MClass.id;
			var ld=TN.Loading({"message":"正在设置默认文件夹..."});
			ld.turnOn();
			$.ajax({
				type:"POST",
				//url:"/setDefaultFolder/"+id,		
				url:"/setDefaultFolder",
				cache : false,
				data : {'fi':id},
				dataType:"json",
				complete:function(){
					ld.turnOff();
				},
				success:function(data){
					if(data.result=="ok"){
						if(PublicStatic.defalutFolder){
							PublicStatic.defalutFolder.VClass.removeDefalut()
							PublicStatic.defalutFolder.MClass.serverData.isDefault=0;
						}
						vp.MClass.serverData.isDefault=1;
						vp.VClass.imDefalut();
						vp.fatherClass.used=="showList"?vp.selected(true):"";
						vp.fatherClass.used=="showChild"?vp.fatherClass.MClass.creator.selected(true):"";
					}else{
						alert(data.message);
					}	
				}
			});
	}
	//获取内容 Ajax接口
	Folder_C.prototype.getContent=function(){
		var vp=this;
		var MC=vp.MClass;
			var url="/gfall";
			var ld=TN.Loading({"message":"正在加载..."});
			ld.turnOn();
			$.ajax({"type":"get","url": url,"cache" : false,"dataType": "json",
				"data": {
					f:MC.id,
					pno:vp.pageNum,
					ps:30
				},
				complete:function(){
					ld.turnOff();
				},
				error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
				success : function(data) {//data 返回数组
						vp.pageTotal=data.pageTotal;
						vp.noteTotal=data.noteTotal;
						vp.folderTotal=data.folderTotal;
						data=data.data;
						var c=ChildBox.getChildForLast(0);
						if(c&&vp.clicked){
								c.createChild(data);
								return false;
						}
					ChildBox.removeLast();
					vp.fatherClass.removeNextClist();
					ChildBox.VClass.UIBody.css({"margin-left":0});
					new CList_C(ChildBox,data,vp);
					ChildBox.getChildForLast(0).VClass.isNothing();
					var cl=new CList_C(ListBox,data,vp);
					cl.VClass.UIBody.hide("slow");
					vp.VClass.chengeFaceInfo();
				}
			});	
	}
	Folder_C.prototype.searchResult=function(){
		var vp=this;
		var MC=vp.MClass;
		//var url="/getNotesByCondition";
		var url="/search";
		$.ajax({
			type : "post",
			url :url,
			cache : false,
			dataType : "json",
			data:{"q":MC.serverData.ser,"p":vp.pageNum,"t":"my"},
			complete:function(){
			//	ld.turnOff();
			},
			error:function(jqxhr,textStatus,errorThrown){ alert("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown); },
			success : function(data){
				if(data.total){
					ChildBox.removeLast();
					vp.fatherClass.removeNextClist();
					vp.MClass.childList=new Array();
					ChildBox.VClass.UIBody.css({"margin-left":0});
					for(var i = 0;i < data.notes.length;i++){
						data.notes[i].key=MC.serverData.ser;
					}
					new CList_C(ChildBox,data.notes,vp);
					ChildBox.getChildForLast(0).VClass.isNothing();
					vp.VClass.chengeFaceInfo(data.total,data.current);
				}else{
					if(data.result=="ok"){
						var that=new CList_C(ChildBox,data.notes,vp);
						that.searchPage=1;
						that.VClass.UIContent.html("");					
						that.VClass.UIContent.append(that.VClass.infoSpan3);
					}else{
						alert(data.message);
					}
				}
			}
		});

	
	}
	//增加特有右键
	Folder_C.prototype.addPersonEvent=function(Menu){
		var vp=this;
		var MC=vp.MClass;
		var VC=vp.VClass;
		MC.serverData.remove===1?Menu.bindEventData("移动此文件夹",function(){
			Menu.close();
			var objAry=[vp];
			FolderTree.cut(objAry);
		},"T_iconMove"):"";
		MC.serverData.remove==1?Menu.bindEventData("删除文件夹",function(){Menu.close(2);if(confirm("确实要删除？")){vp.remove();}},"T_iconDelete"):"";
		MC.serverData.projectId==0&&MC.serverData.isDefault!=1?Menu.bindEventData("设为默认",function(){
			Menu.close(2);
			vp.setDefault();	
		},"T_iconSetDefault"):"";
	}
	/*文件显示类*/
	function Folder_V(father){
		Li_V.call(this,father);
		this.initUI(father.MClass);
	}
	TN.Extend(Li_V,Folder_V);
		//重写 Object_V中的初始化UI
		Folder_V.prototype.initUI=function(MC){
			var vp=this;
			vp.initPublicUI(MC);
			var s="/static/images/home/folder_yellow_icon.png";
			if(MC.id=="000"||MC.id=="007"){
				s="/static/images/newNote_v1/notes_icon_10_16.png";	
				if(MC.id=="007"){
					var isPub=$("<span/>",{"class":"isPub"});
					this.UIBody.append(isPub);
				}
			}
			vp.img=$("<img/>",{"class":"icon","src":s});
			var width;
			vp.fatherClass.fatherClass.used=="showList"?width=180:width=400;
			this.folderCount=$("<div/>",{"style":"overflow:hidden;position:absolute;left: 35px;top:30px;width:"+width+"px;font-size:10px;margin-left: 8px;color: #666;"});
			var fd=MC.serverData.folderCount||0;
			var nt=MC.serverData.noteCount||0;
			vp.fdCount=$("<span/>",{"text":fd,"class":"imgFolder"});
			vp.ntCount=$("<span/>",{"text":nt,"class":"imgNote"});
			MC.id!="005"?this.folderCount.append(vp.fdCount,"个文件夹",vp.ntCount,"篇笔记"):this.folderCount.append("共有",vp.fdCount,"篇");//展示前",vp.ntCount,"篇");
			MC.id=="000"||MC.id=="007"?this.folderCount.html("").append("共有",nt,"篇笔记"):"";
			MC.serverData.isDefault=="1"?vp.imDefalut():"";
			vp.UIBody.append(vp.img).append(vp.spanName).append(this.folderCount);
			vp.spanName.addClass("noteName");
			if(vp.fatherClass.fatherClass.used=="showList"){
				vp.tempBT=$("<button/>",{"style":"position:absolute;top:0px;left:0px;width:0px;height:0px;z-index:-1;"});
				vp.tempBT.attr("id","li"+MC.id)
				vp.UIBody.append(vp.tempBT);
			};
			vp.UIBody.append(vp.downIcon);
			vp.initEvent();
		}
		//改变显示信息
		Folder_V.prototype.chengeFaceInfo=function(setfd,setnt){
			var vp=this;
			var MC=this.fatherClass.MClass;
			var fc=vp.fatherClass;
			var fd=fc.folderTotal;
			var nt=fc.noteTotal;
			if(MC.id=="007"||MC.id=="000"){
				vp.folderCount.text("共有"+(setnt||nt)+"篇笔记");
			}else{
				vp.fdCount.text(setfd||fd);
				vp.ntCount.text(setnt||nt);
			}
		}
		Folder_V.prototype.imDefalut=function(){
			PublicStatic.defalutFolder=this.fatherClass;
			this.defalutMark=$("<div/>",{"style":"padding-left:5px;padding-right:5px;line-height:15px;border-radius:4px;background:green;position:absolute;top:30px;left:4px;font-size:6px;color:white;","text":"默认"});
			this.UIBody.append(this.defalutMark);
		}
		Folder_V.prototype.removeDefalut=function(){
			var that=this;
			if(that.defalutMark){
				that.defalutMark.remove();
			};
		}
		//绑定事件
		Folder_V.prototype.initEvent=function(){
			var vp=this;
			this.UIBody.click(function(evt){
					vp.fatherClass.clickEvent();
					return false;
			});
			if(this.tempBT){
				this.tempBT.click(function(evt){
					evt.preventDefault();
				});
			}
			this.UIBody.bind("dragstart",function(){
				return false;
			});
		}
	/*笔记控制类*/
	function Note_C(father,Json,str){
		Li_C.call(this);
		this.fatherClass=father;
		var MC={"id":Json.noteId,"serverData":Json,"name":Json.title,"childList":[]};
		this.MClass=MC;
		var VC=new Note_V(this);
			VC.insertType=str;
		this.VClass=VC;
		this.bindRight();
		this.insertTo();
	}
	TN.Extend(Li_C,Note_C);
	Note_C.prototype.addPersonEvent=function(Menu){
		var vp=this;
		var MC=this.MClass;
		var VC=this.VClass;
		var FC=vp.fatherClass;
		var isTrash=vp.fatherClass.MClass.creator.MClass.serverData.oc=="T";
		!isTrash&&MC.serverData.remove===1?Menu.bindEventData("移动此笔记",function(){
			Menu.close();
			var objAry=[vp];
			FolderTree.cut(objAry);
		},"T_iconMove"):"";
		MC.serverData.remove==1?Menu.bindEventData("删除笔记",function(){Menu.close(2);if(confirm("确实要删除？")){vp.remove();}},"T_iconDelete"):"";
		!isTrash&&!MC.serverData.projectId?Menu.bindEventData("复制到群组",function(){
			FolderTree.copyToGroup([vp]);
		},"T_iconCopyToGroup"):"";
		!isTrash&&!MC.serverData.projectId&&!MC.serverData.isPublic?Menu.bindEventData("公开此笔记",function(){
			Menu.close();
			var div=$("<div/>",{});
				var common=$('<input name="pass" type="radio" checked="true" value="pt" style="width:20px;height:20px;"/>');
				var span1=$("<div/>",{"style":"width:100%"});
					span1.append(common,"普遍公开");
				var pass=$('<input name="pass" type="radio" value="ps" style="width:20px;height:20px;"/>');
				var span2=$("<div/>",{"style":"width:100%"});
					span2.append(pass,"密码公开");
				var span3=$("<div/>",{});
					var input=$("<input/>",{"type":"input","maxlength":20});
					span3.append("密码: ",input);
			
			common.click(function(){
				span3.remove();
			});
			pass.click(function(){
				div.append(span3);			
			});

			div.append(span1,span2).dialog({
					"title":"笔记公开",
					"modal":true,
					"buttons":{
						"确定":function(){
							if($("input:[name='pass']:radio:checked").val()=="ps"){
								if(!$.trim(input.val())){
									alert("请输入密码。");
									return false;
								}
								if(confirm("带密码公开，他人需要输入您设置的密码才能查看笔记.")){
									vp.publicNoteForAjax(1,input.val());	
									$(this).remove();
								}
							}else{
								if(confirm("互联网上所有用户将可以看到此笔记，请确认是否继续？")){
									vp.publicNoteForAjax(1);	
									$(this).remove();
								}
							}
						},
						"取消":function(){
							$(this).remove();
						}
					}
			});
		},"T_iconPublicNote"):"";
		!isTrash&&!MC.serverData.projectId&&MC.serverData.isPublic?Menu.bindEventData("取消公开",function(){
			Menu.close();
				vp.publicNoteForAjax(0);	
		},"T_iconPublicNote"):"";
		!isTrash&&MC.serverData.projectId?Menu.bindEventData("收藏到个人",function(){
			vp.collectNoteForAjax();
		},"T_iconCollect"):"";
		//isTrash&&MC.projectId==0?Menu.bindEventData("还原",function(){
		isTrash?Menu.bindEventData("还原",function(){
			Menu.close();
			$.ajax({
				"type":"POST",
				"url":"/recoverNotesInTrash",
				"data":{"noteId":MC.serverData.noteId},
				"dataType":"json",
				success:function(data){
					if(data.result=="ok"){
						FC.removeChild(vp);	
						if(PublicStatic.allFolder){
							PublicStatic.allFolder.noteTotal++;
							PublicStatic.allFolder.VClass.chengeFaceInfo();
						}
						var LBcl=ListBox.getChildForLast(0).MClass.childList;
						FC.used=="showList"&&LBcl.length>0?LBcl[0].selected(true):"";
						FC.used=="showList"?ChildBox.getChildForLast(0).MClass.childList[0].close():"";
						FC.used=="showChild"?ListBox.getChildForLast(0).removeChild(vp):"";
					}else{
						alert(data.message);
					}
				}
			});
		},"T_iconReturn"):"";	
			!isTrash?Menu.bindEventData("邮件分享",function(){
				var es=new EmailShare(MC.id);	
			 	es.show();
			},"T_iconShare"):"";
		
	}
	Note_C.prototype.collectNoteForAjax=function(){
		var MC=this.MClass;
		$.ajax({
			type:"get",
			cache : false,
			url:"/copynote",
			data:{noteId:MC.id},
			dataType:"json",
			success:function(data){
				if(data.result=="ok"){
					var msg=new Message();
					msg.type="ok";
					msg.show("笔记收藏成功。");
				}	
			}	
		});
	}
	//公开笔记
	Note_C.prototype.publicNoteForAjax=function(action,pass){
		var vp=this;
		var MC=vp.MClass;
		var FC=vp.fatherClass;
		$.ajax({
			type:"post",
			url:"/shareNote",
			data:{"noteId":MC.id,"action":action,"password":pass},//action 0 取消公开 1 公开
			dataType:"json",
			complete:function(){

			},
			success:function(data){
				if(data.result=="ok"){
					var Fd=ListBox.getActiveChild().getChildById("007");
					if(Fd){
						if(action){
							Fd.noteTotal++;
						}else{
							Fd.noteTotal--;
						}
						Fd.VClass.chengeFaceInfo();
					}
					var msg=new Message();
					msg.type="ok";
					var a=action?"公开笔记":"取消";
					msg.show(a+"成功。");
					vp.VClass.isPublicNote(action);
				}
			}
		});
			
	}
	//移除 Ajax接口
	Note_C.prototype.removeForAjax=function(fun){
		var vp=this;
		var MC=vp.MClass;
		var FC=vp.fatherClass;
		var url;	
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
	
		if(FC.MClass.creator.MClass.serverData.oc=="F"){
			url="/deleteNote"
		}else if(FC.MClass.creator.MClass.serverData.oc=="T"){
			url="/deleteNotesInTrash"
		}else{
		
		}
			$.ajax({
			type : "POST",
			url :url,
			cache : false,
			data:{"noteId":MC.id},
			dataType:"json",
			complete:function(){
				ld.turnOff();
			},
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
			success : function(data) {//data 返回数组
				if(data.result=="ok"){
					var Fd=ListBox.getActiveChild().getChildById(MC.serverData.folderId);
					if(Fd){
						Fd.noteTotal--;
						Fd.VClass.chengeFaceInfo();
					}
					if(PublicStatic.allFolder){
						PublicStatic.allFolder.noteTotal--;
						PublicStatic.allFolder.VClass.chengeFaceInfo();
					}
					FC.removeChild(vp);	
					FC.MClass.creator.removeMClassChild(vp);
					var LBcl=ListBox.getChildForLast(0).MClass.childList;
					FC.used=="showList"&&LBcl.length>0?LBcl[0].selected(true):"";
					FC.used=="showList"?ChildBox.getChildForLast(0).MClass.childList[0].close():"";
					FC.used=="showChild"&&FC.MClass.creator.MClass.serverData.oc!="T"?ListBox.getChildForLast(0).removeChild(vp):"";
					var tp;
					FC.MClass.creator.MClass.serverData.oc=="T"?tp="T":"";
					ChildBox.getChildForLast(0).VClass.isNothing(tp);
				}else{
					alert(data.message);
				}
			}
		});	
	}
	//重命名 Ajax 接口
	Note_C.prototype.reName=function(name,fun){
		var MC=this.MClass;
		var ld=TN.Loading({"message":"正在重命名.."});
		ld.turnOn();
		$.ajax({
			type : "POST",
			url : "/snt",
			cache : false,
			dataType : "json",
			data:{"ni":MC.id,"ti":name},
			complete:function(){
				ld.turnOff();
				fun(0);
			},
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
			success : function(data) {//data 返回数组
				if(data.result=="ok"){
					MC.serverData.lastUpdateTime=data.updateTime;
					fun(1);
				}
			}
		});
	}
	//过去子内容 Ajax接口
	Note_C.prototype.getContent=function(){
		var vp=this;
		var MC=this.MClass;
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
		$.ajax({
			type : "GET",
			url : "/getNote/" + MC.id,
			dataType : "json",
			cache : false,
			complete:function(){
				ld.turnOff();
			},
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
				success : function(data){
					ChildBox.removeLast();//清除掉ChildBox的Clist，用以显示最新内容
					vp.fatherClass.removeNextClist();
					ChildBox.VClass.UIBody.css({"margin-left":0});
					var d=[data]
					new CList_C(ChildBox,d,vp);
				}
		});
	}

	/**/
	function Note_V(father){
		Li_V.call(this,father);
		this.initUI(father.MClass);
	}
	TN.Extend(Li_V,Note_V);
		Note_V.prototype.initUI=function(MC){
			var vp=this;
			vp.initPublicUI(MC);
			var used=vp.fatherClass.fatherClass.used;
			vp.UIBody=$("<a/>",{"class":"Li"})
			vp.img=$("<img/>",{"class":"icon","src":"/static/images/home/notes_icon.png"});
			var creatDiv=$("<span/>",{"class":"creatorSpan"});
			    var span=$("<span/>",{"class":"titleSpan"});
			var imgUser=$("<span/>",{"class":"imgUser textOver","text":MC.serverData.username});
				span.append(vp.spanName,creatDiv.append(imgUser));
			vp.UIBody.append(vp.img);
			vp.isPub=$("<span/>",{"class":"isPub"});
			MC.serverData.isPublic?vp.isPublicNote(1):"";
			/*
			var tempDiv=$("<div/>",{"style":"width:200px;float:left;"});
			t=TN.formatDate(MC.serverData.lastUpdateTime,"yyyy-MM-dd hh:mm:ss");
			*/
			var sortType=PublicStatic.config.allSortType;
			var t;
			if(sortType=="createTime"){
				t=TN.formatDate(MC.serverData.createTime,"yyyy-MM-dd");
			}else{
				t=TN.formatDate(MC.serverData.lastUpdateTime,"yyyy-MM-dd");
			};
			var spanTime=$("<a/>",{"class":"","text":t});
			var summary=$("<p/>",{"class":"summary textOver"});
				summary.append(spanTime,MC.serverData.summary);
			used=="showChild"?vp.UIBody.append(span).append(summary):"";//tempDiv.append(spanCreat,spanDate)):vp.UIBody.append(vp.spanName);
			used=="showChild"?vp.spanName.addClass("noteName"):"";
			vp.UIBody.append(vp.downIcon);
			vp.initEvent();
		}
		Note_V.prototype.isPublicNote=function(b){
			var MC=this.fatherClass.MClass;
			if(b){
				MC.serverData.isPublic=1;
				this.UIBody.append(this.isPub);
			}else{
				MC.serverData.isPublic=0;
				this.isPub.remove();
			}
		}
		Note_V.prototype.chengeFaceInfo=function(){
		
		}
		Note_V.prototype.initEvent=function(){
			var FC=this.fatherClass;
			var MC=this.fatherClass.MClass;
			this.UIBody.click(function(){
					var crt=MC.creator;
						PublicStatic.selectedLi=FC.fatherClass.MClass.creator;
					var k=encodeURI(MC.serverData.key);
				var href=MC.serverData.key?"/showNote/"+MC.id+"?key="+k:"/showNote/"+MC.id;
				window.open(href,"_blank")
			});
		}

/*Trash*/
	function Trash_C(father,trashId){
		Li_C.call(this);
		this.fatherClass=father;
		var MC={"trashId":trashId,"childList":[],"serverData":{"oc":"T"},"name":"回收站"};
		this.MClass=MC;
		var VC=new Trash_V(this);
		this.VClass=VC;
		this.bindRight();
		this.addToClist();
	}
	TN.Extend(Li_C,Trash_C);
	//增加私有右键群组
	Trash_C.prototype.addPersonEvent=function(Menu){
			var vp=this;
			var MC=this.MClass;
			if(vp.fatherClass.MClass.creator.MClass.serverData.manage==1){
				Menu.bindEventData("清空",function(){Menu.close();vp.emptyTrash();},"T_iconEmpty");
			}
		}
	//将自己放入Clist对象中
	Trash_C.prototype.addToClist=function(){
		var vp=this;
		//vp.fatherClass.VClass.trashDiv.append(vp.VClass.UIBody);
		vp.fatherClass.VClass.UIContent.append(vp.VClass.UIBody);
		vp.fatherClass.MClass.childList.push(vp);
	}
	//清空回收站 Ajax接口
	Trash_C.prototype.emptyTrash=function(){
		var vp=this;
		var MC=this.MClass;
		if(confirm("确认要清空回收站?")){
			var ld=TN.Loading({"message":"正在加载..."});
			ld.turnOn();
			$.ajax({
				type : "GET",
				url : "/emptyTrash",
				dataType : "json",
				cache : false,
				data:{"projectId":MC.trashId},
				complete:function(){
					ld.turnOff();
				},
				error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
				success : function(data){
					if(data.result=="ok"){
						var msg=new Message();
						msg.type="ok";
						if(vp.fatherClass.fatherClass.used=="showList"){
							var VC=ChildBox.MClass.childList[0].VClass;
								VC.UIContent.html("");					
								VC.UIContent.append(VC.infoSpan2);
						}else{
							msg.show("清空成功");				
						}
					}
				}
			});
		}
	}
	//获取回收站内容 Ajax借口
	Trash_C.prototype.getContent=function(){
		var vp=this;
		var MC=this.MClass;
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
		$.ajax({
			type : "GET",
			url : "/getNotesInTrash",
			dataType : "json",
			cache : false,
			data:{"projectId":MC.trashId},
			complete:function(){
				ld.turnOff();
			},
			error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
				success : function(data){
					ChildBox.removeLast();//清除掉ChildBox的Clist，用以显示最新内容
					vp.fatherClass.removeNextClist();
					ChildBox.VClass.UIBody.css({"margin-left":0});
					new CList_C(ChildBox,data,vp);
					new CList_C(ListBox,data,vp);
					ChildBox.getChildForLast(0).VClass.isNothing("T");
				}
		});
	}

	/*回收站表示层*/
	function Trash_V(father){
		Li_V.call(this,father);
		this.initUI(father.MClass);
	}
	TN.Extend(Li_V,Trash_V);
	Trash_V.prototype.initUI=function(MC){
		var vp=this;
		vp.initPublicUI(MC);
		vp.img=$("<img/>",{"class":"icon","src":"/static/images/home/trash_icon_32.png"});
		vp.spanName=$("<span/>",{"class":"sname1 textOver","text":"回收站"});
		vp.UIBody.append(vp.img).append(vp.spanName);
		vp.UIBody.append(vp.downIcon);
		vp.initEvent();
	}
	Trash_V.prototype.chengeFaceInfo=function(){
	}
	Trash_V.prototype.initEvent=function(){
			var vp=this;
			this.UIBody.click(function(evt){
					vp.fatherClass.clickEvent();
					return false;
			});
	}


	/*显示框*/
	function CList_C(father,Json,creator){
		Object_C.call(this,father);
		this.fatherClass=father;

		var MC={"fatherClass":this,"childList":[],"createData":Json,"creator":creator||null};
			ListBox!=undefined&&ListBox.MClass.childList!=undefined?MC.index=ListBox.MClass.childList.length:MC.index=1;//设置index
		this.MClass=MC;
		this.used=father.used;
		this.VClass=new CList_V(this);
		this.insertTo();
		this.createChild(Json);
		this.addTrash();
	//	this.sort(PublicStatic.config.allSortType,1);
		this.dragStat=false;
		this.searchPage=0;
	}
	TN.Extend(Object_C,CList_C);
		//新建子内容到数据库，并在页面创建
		CList_C.prototype.newCreate=function(){
			var vp=this;
			var MC=vp.MClass.creator.MClass;
			if(MC.serverData.create==1){
				switch(MC.serverData.oc){
				case "Pro":location.href="/creategroup";break;
				case "Per":new CreatFolder(this,0);break;
				case "P":new CreatFolder(this,0);break;
				case "F":new CreatFolder(this,0);break;//chenged
				//case "F":window.open("editnote?f="+MC.folderId);break;
				}
			}else{
				alert("对不起您没有创建权限。");
			}
		}
		//删除后边所有Clist
		CList_C.prototype.removeNextClist=function(){
			var clc=this;
			var clAry=clc.fatherClass.MClass.childList;
			for(var i=0;i<clAry.length;i++){
				if(clAry.length>clc.MClass.index){
					clAry.pop().close(0);
				}else{
					return;
				}
			}
		}
		//改变成搜索页面
		CList_C.prototype.chengeToSearchResult=function(Json){
			this.searchPage=1;
			this.VClass.BT_newNote.remove();
			this.VClass.BT_new.remove();
			this.VClass.UIContent.html("");
			this.createChild(Json);
		}
		//根据json初始化子内容到web前段
		CList_C.prototype.createChild=function(Json,insertType){
			var Ary=Json;
			var vp=this;
			var crtMC=vp.MClass.creator.MClass;
			var boolChild=(vp.used=="showChild");
			var boolPF=(crtMC.serverData.oc=="P"||crtMC.serverData.oc=="F"||crtMC.serverData.oc=="T");//只给项目和文件夹添加子对象
			for(var i=0;i<Ary.length;i++){
				switch(Ary[i].oc){
					case "P":
						var prj=new Project_C(this,Ary[i],insertType);
						//this.VClass.UIContent.append(prj.VClass.UIBody);
						//this.MClass.childList.push(prj);
						if(boolChild&&boolPF){
								crtMC.childList.push(prj);
						}
						break;
					case "F":
						var Fld=new Folder_C(this,Ary[i],insertType);
						//this.VClass.UIContent.append(Fld.VClass.UIBody);
						//this.MClass.childList.push(Fld);
						if(boolChild&&boolPF){
							crtMC.childList.push(Fld);
						}
						break;
					case "H":
						if(boolChild&&boolPF){
							var	nc=new Note_C(this,Ary[i],insertType);
						//	this.VClass.UIContent.append(nc.VClass.UIBody);
						//	this.MClass.childList.push(nc);
							crtMC.childList.push(nc);
						}
						break;
					case "N":var NS=new NoteShow_C(this,Ary[i]);NS.show();break;
				}
			}
			if(crtMC.id=="000"){

			}
		}
		//增加回收站到Clist 列表中
		CList_C.prototype.addTrash=function(){
			var vp=this;
			var MC=vp.MClass.creator.MClass;
			switch(MC.serverData.oc){
				case "P":new Trash_C(this,MC.id);break;
				case "Per":new Trash_C(this,MC.id);break;
			}

		}
		CList_C.prototype.selectChildById=function(id){
			var mc=this.MClass;
			for(var i=0,l=mc.length;i<l;i++){
				if(mc[i].MClass.id==id){
					return mc[i]
				}
			}	
			return null;
		}
		//排序
		CList_C.prototype.sort=function(sortType,bool){
			if(this.searchPage){
				return false;
			}
			var cl=this.MClass.childList;
			switch(sortType){
				case "title":cl.sort(Name);break;
				case "createTime":cl.sort(cTime);break;
				case "lastUpdateTime":cl.sort(mTime);break;
			}
			function Name(a,b){
				var AM=a.MClass;
				var BM=b.MClass;
				var tempA=AM.name;
				var tempB=BM.name;
				var bl=0;
				if(AM.serverData.oc=="T"){
					bl=1;
				}else if(BM.serverData.oc=="T"){
					bl=-1;
				}else if(AM.id=="000"&&AM.serverData.oc=="F"){
					bl=-1;
				}else if(BM.id=="000"&&BM.serverData.oc=="F"){
					bl=1;
				}else if(AM.id=="007"&&AM.serverData.oc=="F"){
					bl=-1;
				}else if(BM.id=="007"&&BM.serverData.oc=="F"){
					bl=1;
				}else if(AM.serverData.oc==BM.serverData.oc){
					bl=tempA.localeCompare(tempB);
				}else if (AM.serverData.oc=="F"){
					bl=-1;
				}else{
					bl=1;
				}

				return bl;
			}
			function cTime(a,b){
				var AM=a.MClass;
				var BM=b.MClass;
				var tempA=AM.serverData.createTime;
				var tempB=BM.serverData.createTime;
				var bl=0;
				var s=AM.oc;
				s=BM.oc;
				s=AM.id;
				s=BM.id;
				if(AM.serverData.oc=="T"){
					bl=1;
				}else if(BM.serverData.oc=="T"){
					bl=-1;
				}else if(AM.id=="000"&&AM.serverData.oc=="F") {
					bl=-1;
				}else if(BM.id=="000"&&BM.serverData.oc=="F"){
					bl=1;
				}else if(AM.id=="007"&&AM.serverData.oc=="F") {
					bl=-1;
				}else if(BM.id=="007"&&BM.serverData.oc=="F"){
					bl=1;
				}else if (AM.serverData.oc==BM.serverData.oc){
					if (tempB>tempA) bl=1;
					else if (tempB==tempA) bl=0;
					else bl=-1;
				}else if (AM.serverData.oc=="F"){
					bl=-1;
				}else{
					bl=1;
				}
				return bl;

			}
			function mTime(a,b){
				var AM=a.MClass;
				var BM=b.MClass;
				var tempA=AM.serverData.lastUpdateTime;
				var tempB=BM.serverData.lastUpdateTime;
				var bl=0;
				if(AM.serverData.oc=="T"){
					bl=1;
				}else if(BM.serverData.oc=="T"){
					bl=-1;
				}else if(AM.id=="000"&&AM.serverData.oc=="F"){
					bl=-1;
				}else if(BM.id=="000"&&BM.serverData.oc=="F"){
					bl=1;
				}else if(AM.id=="007"&&AM.serverData.oc=="F") {
					bl=-1;
				}else if(BM.id=="007"&&BM.serverData.oc=="F"){
					bl=1;
				}else if (AM.serverData.oc==BM.serverData.oc){
					if (tempB>tempA) bl=1;
					else if (tempB==tempA) bl=0;
					else bl=-1;
				}else if (AM.serverData.oc=="F"){
					bl=-1;
				}else{
					bl=1;
				}
				return bl;
			}
			this.VClass.UIContent.html("");
			for(var i=0;i<cl.length;i++){
				cl[i].VClass.initUI(cl[i].MClass);
				this.VClass.UIContent.append(cl[i].VClass.UIBody);
				if(!bool){
					cl[i].VClass.chengeFaceInfo();
				}
				cl[i].bindRight();
			}
			var gc=this.getSelectChild();
			if(gc){
				gc.VClass.UIBody.addClass("liSelected");	
			}

		}
	/*显示框表现层*/
	function CList_V(father){
		Object_V.call(this);
		this.fatherClass=father;
		this.infoSpan=$("<span/>",{"class":"infoSpan nothing"});
		this.infoSpan2=$("<span/>",{"class":"infoSpan noTrash"});
		this.infoSpan3=$("<span/>",{"class":"infoSpan noSearch"});
		this.pageCount=1;
		this.initUI(father.MClass);
	}
	TN.Extend(Object_V,CList_V);
		//清空提示信息 如“没有任何笔记”
		CList_V.prototype.cleanInfo=function(){
			this.infoSpan.remove();
		}
		//显示提示信息 如“没有任何笔记”
		CList_V.prototype.isNothing=function(msg){
			if(this.fatherClass.MClass.childList.length==0){
				this.UIContent.html("");					
				var inf=this.infoSpan;
				switch(msg){
					case "T":inf=this.infoSpan2;break;
					case "S":inf=this.infoSpan3;break;
				}
				this.UIContent.append(inf);
			}
		//	this.infoSpan.text(msg);
		}
		//
		CList_V.prototype.initUI=function(mc){
			var vp=this;
			var fc=vp.fatherClass;
			var crtMC=mc.creator.MClass;
			var oc=crtMC&&crtMC.serverData?crtMC.serverData.oc:null;
			if(fc.used=="showList"){
				vp.width=$("#Div_list").width();
			}else if(fc.used=="showChild"){
				vp.width=$("#Div_listShow").width();
			}
			vp.UIBody=$("<div/>",{"class":"CList"});
			vp.Div_BT_tool=$("<div/>",{"class":"BTtool"});
			vp.UIContent=$("<div/>",{"style":"width:"+vp.width+"px;height:"+(PublicStatic.config.content_height-40)+"px;","class":"CLChild"});

			var newStr="新建群组";
			var typeSrc="",typeStr;
			if(crtMC){
				switch(oc){
					case "Pro":newStr="新建群组";typeStr="全部群组";typeSrc="/static/images/home/project/project.png";break;
					case "Per":newStr="新建文件夹";typeStr="全部文件夹";break;
					case "P":newStr="新建文件夹";typeStr=crtMC.name;typeSrc="/static/images/home/project/project.png";break;
					case "F":newStr="新建文件夹";typeStr=crtMC.name;typeSrc="/static/images/home/folder_yellow_icon.png";break;
					//case "T":newStr="...";typeStr=crtMC.name;typeSrc="/static/images/home/recycleBin.png";break;
				}
			}
			var BT_Icon=$("<i/>",{"class":"T_iconAdd"});
			vp.BT_new=$("<a/>",{"class":"BT_new btn"});
			vp.trashDiv=$("<div/>",{"style":"width:100%;background:red;","text":"ffffffffff"});
			crtMC&&crtMC.serverData.create!=1?vp.BT_new.attr("disabled",true):"";
			var Icon_back=$("<i/>",{"class":"icon-arrow-left icon_back"});
			vp.back=$("<div/>",{"class":"typeDiv"});
				vp.back.append(Icon_back,"返回");
			vp.BT_jonPro=$("<div/>",{"type":"button","class":"BT_new btn","style":"float:right;margin-right:5px;"});
				vp.BT_jonPro.append(BT_Icon,"加入群组");
			if(oc=="Pro"){
				fc.used=="showList"?vp.Div_BT_tool.append(vp.BT_jonPro):"";
			}else if(oc=="Per"){
			}else{
				fc.used=="showList"?vp.Div_BT_tool.append(vp.back):"";
			}
			vp.BT_sort=$("<div/>",{"type":"button","class":"btn","style":"float:left;margin-left:5px;"});
			vp.BT_sort.append("排序");
			fc.used=="showChild"?vp.Div_BT_tool.append(vp.BT_sort):"";
			var a=$("<a/>",{"class":"newNote_a","style":""});
				a.append(BT_Icon,"新建笔记");
			vp.BT_newNote=$("<div/>",{"class":"BT_new Button2","style":"float:right"});
			var allFolder=!(crtMC.id&&crtMC.id=="000");
			fc.used=="showChild"&&oc=="F"&&crtMC.serverData.create==1?vp.Div_BT_tool.append(vp.BT_newNote.append(a)):"";
			oc&&oc!="serch"&&oc!="H"&&oc!="T"&&allFolder&&crtMC.serverData.create==1?vp.Div_BT_tool.append(vp.BT_new.append(newStr)):"";
		
			vp.UIBody.append(vp.Div_BT_tool).append(vp.UIContent);//.append(vp.trashDiv));
			vp.initEvent();
		}
		CList_V.prototype.initEvent=function(){
			var vp=this;
			var exit=false;
			var MC=vp.fatherClass.MClass.creator.MClass;
			var CID=MC.id;
			if(MC.serverData.oc=="F"){
		//	if(CID=="000"||CID=="005"||CID=="007"){
			var preH=0;
				vp.UIContent.scroll(function(evt){
						var H=$(this)[0].scrollHeight;
						//console.log($(this).height()+$(this)[0].scrollTop+","+H);
						if($(this)[0].scrollTop+$(this).height()==H){
							if(preH==H){
								return;
							}
							preH=H;
							var ctor=vp.fatherClass.MClass.creator;
							if(ctor.pageNum<ctor.pageTotal){
								ctor.clicked=1;
								ctor.pageNum++;
								switch(CID){
										case "000":
										ctor.getContent();
										break;
										case "005":
										ctor.searchResult();
										break;
										case "007":
										ctor.getContent();
										break;
										default:
										ctor.getContent();
								}
							}else{
								if(!vp.more){
									var msg=new Message();
										msg.type="ok";
										msg.show("没有数据...");
								}
							}
						};
				});
			}
			vp.BT_sort.click(function(){
					var tempDiv=$("<div/>",{});	
						var folder1=$('<input name="sortType" type="radio" value="createTime" style="width:20px;height:20px;"/>');
						var folder2=$('<input name="sortType" type="radio" value="lastUpdateTime" style="width:20px;height:20px;"/>');
						var folder3=$('<input name="sortType" type="radio" value="title" style="width:20px;height:20px;"/>');
							tempDiv.append(folder2).append("按最后更新时间排序","<br/>").append(folder1).append("按创建时间排序","<br/>").append(folder3).append("按标题排序");
						switch(PublicStatic.config.allSortType){
							case "createTime":folder1.attr("checked",true);break;
							case "lastUpdateTime":folder2.attr("checked",true);break;
							case "title":folder3.attr("checked",true);break;
						}
						tempDiv.dialog({
							"title":"请选择排序方式",
							"modal":true,
							"close":function(){
								$(this).remove();
							},
							"buttons":{
								"确定":function(){
									var met=$("input:[name='sortType']:radio:checked").val();
									var dlg=$(this);
									$.ajax({
										"type":"POST",
										"url":"/setsort",
										"dataType":"json",
										// 'createTime','lastUpdateTime','title'
										data:{"method":met},
										success:function(data){
											if(data.result=="ok"){
												PublicStatic.config.allSortType=met;
											//	ListBox.sort(1);					
												//ChildBox.sort(1);	
												vp.fatherClass.MClass.creator.clickEvent();
												dlg.remove();	
											}else{
												alert(data.message);
											};
										}
									});
								},
								"取消":function(){
									$(this).remove();
								}
							}
						});
			});
			if(vp.BT_new){
				vp.BT_new.click(function(){
					vp.fatherClass.newCreate();
				});
			}
			if(vp.BT_newNote){
				vp.BT_newNote.click(function(){
					if($("#fromApp").val()){
						location.href="/app/editnote?f="+MC.id;
					}else{
						window.open("/editnote?f="+MC.id);	
					}
				});
			}
			
			vp.BT_jonPro.unbind("click").click(function(){
				var div=$("<div/>",{});
					var p=$("<p/>",{"text":""});
					var ul=$("<ul/>",{"style":"list-style:none;width:400px;height:auto !important;height:200px;max-height:200px;overflow-y:scroll;","class":"jonDiv"});
					var p2=$("<p/>");
					var inp=$("<input/>",{"style":"","maxlength":"20"});
					var bt=$("<input/>",{"value":"查找","class":"btn","type":"button","style":"width:50px;margin-top:-10px;"});
					p.append("群组编号或名称:",inp,bt);
					var mes=$("<input/>",{});
					var li2=$("<div/>");
					li2.append("请求信息:",mes);
				div.append(p,ul,p2);
				exit=false;
			var ld=TN.Loading({"message":"正在加载..."});
			var re;
				div.dialog({
					"modal":true,
					title:"申请加入",
					width:"450px",
					close:function(){
						$(this).remove();
					},
					buttons:{
							"加入":function(){
								var th=$(this);
								var met=$("input:[name='projectInfo']:radio:checked").val();
								if(!met){
									alert("请选择群组!");
									return false;
								};
								if(exit){
									var ld=TN.Loading({"message":"正在加载..."});
									ld.turnOn();
									$.ajax({
										type:"POST",
										url:"/pj/apply/"+met,
										data:{"msg":mes.val()},
										error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
										dataType:"json"
									}).done(function(data){
										if(data.result=="ok"){
											th.dialog("close");
											var msg=new Message();
												msg.type="ok";
												msg.show("申请成功，等待审核。");
										}else{
											alert(data.message);
										}
									}).always(function(){
										ld.turnOff();
									});
								}
							},
							"取消":function(){
								ld.turnOff();
								//re.abort();
								$(this).dialog("close");
							}
							}
				});

				bt.unbind("click").click(function(){
					if(inp.val()==null||inp.val()==""){
						alert("群组编号或名称不能为空.");
						return false;
					}
					ld.turnOn();
				re=$.ajax({
						type:"GET",
						url:"/pj/pinfo",
						dataType:"json",
						error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
						data:{"pi":inp.val()}
					}).done(function(data){
						if(data.length>0){
							exit=true;
							ul.html("");//.remove();
							p2.html("");
							for(var i=0;i<data.length;i++){
							var li=$("<li/>",{});
						var rdo=$('<input name="projectInfo" type="radio" value="'+data[i].projectId+'" style="width:20px;height:20px;"/>');
						var info=$("<span/>",{"text":"群组名称："+data[i].projectName})
						var userName=$("<span/>",{"text":"创建人："+data[i].username,"style":"margin-left:18px;"})
								ul.append(li.append(rdo,info,"<br/>",userName));
							}
							p2.append(li2);
						}else{
							ul.html("");
							p2.html("此群组不存在");
							//alert("此群组不存在");
						}
					}).always(function(){
						ld.turnOff();
					});
				});

			});
			vp.back.click(function(){
				var index=vp.fatherClass.MClass.index;
				index>1?Nav.setPositionByIndex(index-2):"";
			});
		}

	/*ListBox类*/
	function ListBox_C(father,used,Json,oc){
		this.MClass={"oc":oc,"serverData":{"oc":oc,"create":1,"folderId":0,"projectId":0,"manage":1,"modify":1,"remove":1},"childList":[]}
		this.used=used;
		this.VClass=new ListBox_V(this);
		Object_C.call(this,father);
		this.createChildFirst(Json);
		this.insertTo();	
	}
	TN.Extend(Object_C,ListBox_C);
		ListBox_C.prototype.removeMClassChild=function(obj){}
		//初始化的时候，没有事件，所以根据数据，自动创建一子内容
		ListBox_C.prototype.createChildFirst=function(Json){
			if(Json!=undefined&&Json!=null){
				var CC=new CList_C(this,Json,this);
				//this.MClass.childList.push(CC);
				this.setActiveChildByIndex(1,false);
				if(Json.length>0){
					//this.getActiveChild().MClass.childList[0].selected(true);//显示选中第一个群组；
					var clist = this.getActiveChild().MClass.childList;
					var isExist = 0;
					for(var n in clist){
						var obj = clist[n].Json;
						if(obj && obj.folderId == "000"){
							clist[n].selected(true);
							isExist = 1;
						}
					}
					if(isExist == 0){
						var defaultSelect=0;
						if(location.hash){
							for(var i=0;i<clist.length;i++){
								if(clist[i].MClass.id==location.hash.substring(1,location.hash.length)){
									defaultSelect=i;
								}
							
							}	
						};
						this.MClass.serverData.oc=="serch"?"":clist[defaultSelect].selected(true);
					}
				}
			}	
		}
		//移除最后一个子内容
		ListBox_C.prototype.removeLast=function(){
			var mc=this.MClass;
			var count=mc.childList.length;
			if(count>0){
				mc.childList.pop().close();
			}
		}
		ListBox_C.prototype.chengeFaceInfo=function(){
			var cl=this.MClass.childList;
			for(var i=0;i<cl.length;i++){
				var cll=cl[i].MClass.childList;
				for(var j=0;j<cll.length;j++){
					cll[j].VClass.chengeFaceInfo();
				}
			
			}
		}
		ListBox_C.prototype.sort=function(bool){
			var cl=this.MClass.childList;
			for(var i=0;i<cl.length;i++){
				cl[i].sort(PublicStatic.config.allSortType,bool);
			}	
		}
	//===========
	function ListBox_V(father){
		Object_V.call(this,father);
		this.marLeft=0;
		this.initUI();
	}
	TN.Extend(Object_V,ListBox_V);
		ListBox_V.prototype.initUI=function(){
			this.UIBody=$("<div/>",{"class":"ListBox"});
			this.UIContent=$("<div/>",{"class":"LBChild"});
			this.UIBody.append(this.UIContent);
		}
		ListBox_V.prototype.chengeFaceInfo=function(){
		
		}

	/////////////=================================================================================
	function Nav_C(father){
		this.VClass=new Nav_V(this);
		father.append(this.VClass.UIBody);
	}
	TN.Extend(Object_C,Nav_C);
	Nav_C.prototype.initSelf=function(test,index){
		this.VClass.UIContent.html("");
		this.VClass.addChildUI(test,index);
	}
	//增加一个节点
	Nav_C.prototype.addChild=function(){
		var test=ListBox.getChildForLast(1).getSelectChild().MClass.name;
		var index=ListBox.getChildForLast(1).MClass.index;
		this.VClass.addChildUI(test,index);
	}	
	//根据节点的index设置ListBox的显示位置（左边栏的滚动动画）；
	Nav_C.prototype.setPositionByIndex=function(Nowindex){
		var NC=this;
		ListBox.VClass.marLeft=Nowindex*-ListBox.getActiveChild().VClass.width;
		NC.VClass.removeBackChild(Nowindex);
		ListBox.getChildByIndex(Nowindex+1).removeNextClist();
		ListBox.setActiveChildByIndex(Nowindex+1,true);
		ListBox.getChildByIndex(Nowindex+1).getSelectChild().selected(true);///tttt
	}
	function Nav_V(father){
		this.fatherClass=father;
		this.initUI(father);
	}
	Nav_V.prototype.initUI=function(father){
		this.UIBody=$("<div/>",{"class":"breadNav"});
		this.UIContent=$("<ul/>",{"class":""});
		this.UIBody.append(this.UIContent);
	}
	//移除后边的所有子Li 
	Nav_V.prototype.removeBackChild=function(ind){
		var div=this.UIContent.find("li");
		for(var i=0;i<div.length;i++){
			if(div.eq(i).data("index")>ind){
				div.eq(i).next("span").remove();
				div.eq(i).remove();
			}	
		}
	}
	//增加一个节点UI
	Nav_V.prototype.addChildUI=function(text,index){
		var Nv=this;
		var sp=$("<span/>",{"class":"divider","text":">"});
		var DivChild=$("<li/>",{
			"class":"textOver",
			"text":text
		});
		DivChild.append(sp);
		this.UIContent.append(DivChild);
		DivChild.data("index",index);
		DivChild.click(function(){
			var Nowindex=$(this).data("index");
			var a=$(this).parent().find("li:last-child").data("index")===$(this).data("index");
			!a?Nv.fatherClass.setPositionByIndex(Nowindex):"";
		});
	}
	
	//弹出新建层 新建层基类
	function NewCreatDiv(name,type){
		this.NewName=name;
		this.type=type;//只有文件夹和文件夹组时可用；
		this.initUI();
	}
	//初始化dialog（此处使用jquery UI ，初始化窗口）
	NewCreatDiv.prototype.initDialog=function(){
		var vp=this;
		vp.UIBody.dialog({
			"modal":true,
			title:"新建"+vp.NewName,
			open:function(){
				$(this).bind("keypress.ui-dialog", function(evt) { 
					if (evt.keyCode == $.ui.keyCode.ENTER) { 
						vp.AjaxCreate();
						return false;
					} 
				});
				},
			buttons:{
				"确定":function(){
					vp.AjaxCreate();
				},
				"取消":function(){
					$(this).dialog("close");
				}},
			close:function(){
					$(this).remove();
				  }
		});
	}
	//关闭弹出层
	NewCreatDiv.prototype.closeUI=function(){
		this.UIBody.remove();
	}

	//创建文件夹或文件夹组
	function CreatFolder(Clist,type){
		NewCreatDiv.call(this,"name",type);
		this.creator=Clist;
	}
	TN.Extend(NewCreatDiv,CreatFolder);
	CreatFolder.prototype.initUI=function(){
		var vp=this;
		switch(vp.type){
			case 0:vp.NewName="文件夹";break;
			case 1:vp.NewName="文件夹";break;
		}
		var name=$("<span/>",{"text":vp.NewName+"名"});
		vp.UIBody=$("<div/>",{"class":"NewCreatDiv"});
		vp.inp=$("<input/>",{"class":"inpText"});
		vp.UIBody.append(name,vp.inp);	
		this.initDialog();
	}
	//创建文件夹 ajax接口
	CreatFolder.prototype.AjaxCreate=function(){
		var vp=this;
		var crtMC=vp.creator.MClass.creator.MClass;//找到创建者的MClass（所属上一级目录）
		var folderName=this.inp.attr("value");
		var folderId=crtMC.serverData.folderId;
		folderName=$.trim(folderName);
		if(folderName!=undefined&&folderName!=null&&folderName!=""){
			vp.closeUI();
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
			$.ajax({
				type : "POST",
				url : "/newFolder",
				cache : false,
				dataType : "json",
				data:{"folderName":folderName,"folderId":folderId,"isLeaf":0},
				complete:function(){
					ld.turnOff();
				},
				error:function(jqxhr, textStatus, errorThrown){	var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
				success : function(data){//data 返回数组
					if(data.result=="ok"){
						var d=[data.message];
						vp.creator.VClass.cleanInfo();
						vp.creator.MClass.creator.MClass.folderCount++;
						if(vp.creator.used=="showChild"){
							vp.creator.MClass.creator.selected(true)
						}else{
							vp.creator.createChild(d,"top");
							ListBox.sort(1);		
						}
						//vp.creator.MClass.creator.VClass.chengeFaceInfo();
					}else{
						alert(data.message);
					}
				}
			});
		}else{
			alert("名称不能为空");
		}
	}
	
	/*菜单框*/
	function Menu_C(father,x,y){
		this.MClass={
			"MenuList":[]
		};
		this.VClass=new Menu_V(this,x,y);
	}
	TN.Extend(Object_C,Menu_C);
	Menu_C.prototype.bindEventData=function(name,fun,icon){
		var ChildJson={"name":name,"evt":fun,"icon":icon};
		this.MClass.MenuList.push(ChildJson);
	}
	Menu_C.prototype.show=function(){
		this.MClass.MenuList.length>0?this.VClass.initUI(this.MClass):"";
	}
	/*菜单表示层*/
	function Menu_V(father,x,y){
		Object_V.call(this);
		this.fatherClass=father;
		this.x=x;
		this.y=y;
	}
	TN.Extend(Object_V,Menu_V);
	Menu_V.prototype.initUI=function(MClass){
			var MV=this;
			var MC=MClass;
			this.UIBody=$("<div/>",{
				"class":"RMenu well",
				"title":"",
				"style":"top:"+(this.y-10)+"px;left:"+(this.x-10)+"px;"
			});
			this.UIContent=$("<ul/>",{});
			var cl=MC.MenuList;
			for(var i=0;i<cl.length;i++){
				var li=$("<li/>",{});
				var a=$("<i/>",{"class":cl[i].icon+" menuIcon"});
				var nm=$("<span/>",{"class":"name","text":cl[i].name})
				this.UIContent.append(li.append(a,nm));
				li.unbind("click");
				li.click(cl[i].evt);
			}
			this.UIContent.find(li).unbind("hover");
			this.UIBody.append(this.UIContent);
			this.UIBody.hover(function(){},function(){MV.fatherClass.close(1)});
			$("#Div_detail").append(this.UIBody);
			if($("body").height()-this.y-this.UIBody.height()<0){
					var ttop=this.y-this.UIBody.height();
				this.UIBody.css("top",ttop+"px");
			};
	}

	//信息框
	function Message(){
		this.type="nor";
	}
	Message.prototype.show=function(text){
		var vp=this;
		var c="msgN";
		switch(vp.type){
			case "nor":c="msgN";break;
			case "err":c="msgE";break;
			case "ok":c="msgO";break;
		}
		vp.UIBody=$("<div/>",{"class":"messageDiv "+c});
		vp.UIBody.css({"left":(screen.width/2)-50+"px"});
		vp.UIBody.text(text);
		$("body").append(this.UIBody);
		this.UIBody.animate({"filter":"alpha(opacity=30)","opacity":"0.3","opacity":"0.3"},3000,function(){
			vp.UIBody.remove();
		});
	}
	var TNote={"Object":Object_C,"Project":Project_C,"CList":CList_C,"ListBox":ListBox_C,"Nav":Nav_C}
