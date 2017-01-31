var FolderTree=window.FolderTree||(function(){
	var clipAry;
	var allProject;
	var targetFolderId;
	var activeLi;
	var projectId;
	var loadCount=0;
	var folderId;
	var supDiv=$("<div/>",{"style":"width:500px;height:300px;"});
	var contentDiv=$("<div/>",{"class":"folderTree","style":"width:100%;height:300px;"});
	supDiv.append(contentDiv);
	
	//获取跟目录
	/*
	 *supType 跟目录环境，Per为个人，Pro为项目,此变量在my.js和group.js中定义;
	 * */
	function _firstGetContent(){
		var url;
		var d;
		switch(supType){
			case "Per":
				if(allProject){
					url="/pj/gp";	
				}else{
					url="/gpf";
				};	   
					   break;	
			case "Pro":url="/pj/gp";break;
		}
		$.ajax({
			type :"get",
			url :url,
			cache : false,
			dataType : "json",
			data:{"projectId":projectId},
			complete:function(){
			},
			error:function(jqxhr, textStatus, errorThrown){ },
			success : function(data){
				_creatChildGroup(contentDiv,data);	
			}
		});
	}
	function _getFolder(tag,folderId){
		$.ajax({
			type:"get"
			,url:"/gf"
			,cache:false
			,data:{"f":folderId}
			,dataType:"json"
		}).done(function(data){
			if(data.length>0){
				_creatChildGroup(tag,data);
			}
		})
	}



	//生成文件夹列表
	/*
	 *listData 封装有Josn数据的Array数组,json为创建的对象。比如文件夹，或者项目
	 * */
	function _creatChildGroup(tag,listData){
		var ul=$("<ul/>",{"class":"treeUI","style":"list-style:none;margin:0px;padding:0px;float:left;width:100%;"});
		for(var i=0;i<listData.length;i++){
			var li=_creatChildByJson(listData[i]);	
			ul.append(li);
		}	
		tag.append(ul);
		tag.data("ul",ul);
	}
	
	//根据json对象创建一个文件对象，或者项目对象。
	function _creatChildByJson(Json){
		var json={};
		var li;
		if(Json.folderId=="000"||Json.folderId=="007"){
			return;
		}
		//for(var i=0;i<clipAry.length;i++){
		//	if(Json.folderId==clipAry[i].MClass.folderId){
			//	return;
		//	}	
		//}	
		switch(Json.oc){
			case "P":
				var	p=$("<p/>",{"class":"","style":"float:left;width:100%;margin:0px;"});
				var img=$("<span/>",{"class":"closed"});
				var fName=$("<span/>",{"text":Json.projectName,"style":"line-height:16px;float:left;"});
				li=$("<li/>",{"class":"hand treeLi","style":"padding-left:20px;overflow:hidden;margin-top:5px;","onselectstart":"return false"});
				p.append(img,fName);
				li.append(p);
				li.data("p",p);
				;break;	
			case "F":
				var	p=$("<p/>",{"class":"","style":"float:left;width:100%;margin:0px;"});
				var img=$("<span/>",{"class":"closed"});
				var fName=$("<span/>",{"text":Json.folderName,"style":"line-height:16px;float:left;"});
				li=$("<li/>",{"class":"hand treeLi","style":"padding-left:20px;overflow:hidden;margin-top:5px;","onselectstart":"return false"});
				p.append(img,fName);
				li.append(p);
				li.data("p",p);
				;break;
		}	
		li.data("pms",{"manage":Json.manage,"create":Json.create});
		li.data("oc",Json.oc);
		li.unbind("click").click(function(){
			if(Json.folderId == clipAry[0].MClass.id){
				return false;
			}
			targetFolderId=Json.folderId;
			activeLi=$(this);
			for(var i=0;i<clipAry.length;i++){
				if(clipAry[i].MClass.id==targetFolderId){
					return false;
				}	
			}
				$(".folderTree").find("p").removeClass("selected");	
				li.data("p").addClass("selected");
				if(li.data("state")===1){
					li.data("state",0)
					li.data("p").find(".open").removeClass("open").addClass("closed");
					li.data("ul")?li.data("ul").hide():"";
				}else{
					li.data("state",1)
				var t=li.data("p").find(".closed");
					t.removeClass("closed");
					t.addClass("open");
					if(li.find("ul").length<1){
						_getFolder(li,Json.folderId);
					}else{
						li.data("ul").show();
					}
				}
			return false;	
		});
		return li;
	}
	function _show(){
			supDiv.dialog({
				"modal":true,
				"width":"600",
				"title":"选择目标文件",
				"buttons":{
					"移动":function(){
						if(activeLi.data("pms").create!=1){
							alert("权限错误");
							return false;
						}
						if(activeLi.data("oc")=="P"&&clipAry[0].MClass.serverData.oc=="H"){
							alert("笔记不能移动到群组根目录下。");
							return false;
						}
						if(targetFolderId && targetFolderId != clipAry[0].MClass.serverData.folderId){
							_doMoveFolder();
							$(this).dialog("close");
						}else{
							alert("请选择目标文件夹");
						}
					},
					"取消":function(){
						$(this).dialog("close");
					}
				},
				"close":function(){
				}
			});
				contentDiv.html("");
				_firstGetContent();
	}
	function _showCopy(){
			supDiv.dialog({
				"modal":true,
				"width":"600",
				"title":"选择目标文件",
				"buttons":{
					"复制":function(){
						if(activeLi.data("pms").create!=1){
							alert("权限错误");
							return false;
						}
						if(activeLi.data("oc")=="P"){
							alert("笔记不能复制到群组根目录下。");
							return false;
						}
						if(targetFolderId && targetFolderId != clipAry[0].MClass.id){
							//_doMoveFolder();
							var ts=$(this);
							_copyNoteToGroup(clipAry[0].MClass.id,targetFolderId,function(){
								ts.dialog("close");
							});
						}else{
							alert("请选择目标文件夹");
						}
					},
					"取消":function(){
						$(this).dialog("close");
					}
				},
				"close":function(){
				}
			});
				contentDiv.html("");
				_firstGetContent();
	}
	function _copyNoteToGroup(noteId,folderId,fun){
		$.ajax({
			type:"get",
			url:"/copynote",
			data:{noteId:noteId,folderId:folderId},
			dataType:"json",
			success:function(data){
				if(data.result=="ok"){
					var msg=new Message();
					msg.type="ok";
					msg.show("复制成功");
					fun();
				}else{
					alert(data.message);
				}	
			}	
		});
	}
	//移动文件夹Ajax借口
	function _doMoveFolder(){	
		var url;
		var dt;
		var aac;
			switch(clipAry[0].MClass.serverData.oc){
				case "F":
					aac="F";
					url="/movefolder";	
					dt={"srcId":clipAry[0].MClass.id,"destId":targetFolderId};
					;break;
				case "H":
					aac="H";
					url="/movenote";
					dt={"noteId":clipAry[0].MClass.id,"folderId":targetFolderId};
					;break;
			}
			var ld=TN.Loading({"message":"正在移动..."});
			ld.turnOn();
			$.ajax({
				type:"post",
				url:url,
				dataType:"json",
				/*
				 *srcId 剪切文件夹ID destId 目标文件夹ID
				 * */
				data:dt,
				error:function(jqxhr, textStatus, errorThrown){	
					var msg=new Message();
					msg.type="ok";
					msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);
					ld.turnOff();
				}
			}).done(function(data){
				if(data.result=="ok"){
					
					if(clipAry[0].fatherClass.used=="showChild"){
						clipAry[0].fatherClass.MClass.creator.selected(true);//主要为了让本文件消失，并且改变父文件夹的信息
					}else{
						clipAry[0].fatherClass.removeChild(clipAry[0]);
					//	ListBox.chengeFaceInfo();
					//	ChildBox.chengeFaceInfo();
					}
					var li=ListBox.getActiveChild().getChildById(targetFolderId);
					if(li){
						li.selected(true);	
					}
					ld.turnOff();
				}else{
					alert(data.message);
				}
			});
	}

	return {
		/*
		 *obj为自定义的folder note对象;
		 * */
		"cut":function(obj){
			allProject=0;
			clipAry=obj;
			projectId=clipAry[0].MClass.serverData.projectId;
			folderId=clipAry[0].MClass.serverData.pfolderId;
			_show();
		},
		"copyToGroup":function(obj){
			allProject=1;
			clipAry=obj;
			_showCopy();	
		},
		"getClip":function(){
			return clipAry;
		}
	}	
})()
