/*
 *请笔记模块
 * */
var Qingbiji=window.Qingbiji||(function(){
	return {};
})();

Qingbiji.NoteList=(function(){
	
	/*
	 * 声名笔记对象
	 * Json 笔记数据；
	 * @param Json {object} The display data for Note;
	 * */
	function Note(Json,type){
		this.Data=Json;
	}
	Note.prototype.renderUI=function(_fatherBox){
		var info,slt,headimg,title,height,style;
		if(this.Data.summary){
			if(this.Data.thumbAttId){
				info="info2";
				slt="slt2";
				headimg="headImg2";
				title="title1";
				height=115;
			}else{
				headimg="headImg1";
				info="info3";
				slt="slt1";
				title="title2";
				style="background:white;";
			}
		}else{
			headimg="headImg1";
			if(this.Data.thumbAttId){
				headimg="headImg3";
				info="info1";
				slt="slt3";
				height=155;
				title="title1";
			}else{
				info="info3";
				slt="slt1";
				style="background:white;";
				title="title2";
			}
		};
		var UIBody=$("<a/>",{"class":"PubNoteBox","href":"/note/"+this.Data.noteId,"target":"_blank","styled":style});	
			var Img=this.Data.thumbAttId?$("<img/>",{"class":"slt "+slt,src:"/open/get_note_thumbnail?note_id="+this.Data.noteId+"&width=225&height="+height}):$("<div/>",{"class":"slt "+slt});
			var headImg=$("<img/>",{"class":"headImg "+headimg,"src":"/static/images/newNote_v1/head002.png"});
			var UITitle=$("<span/>",{"class":"title "+title+" textOver","text":this.Data.title});
			var UIInfo=$("<p/>",{"class":"info "+info,"text":this.Data.summary});
			var UIUserName=$("<span/>",{"class":"userName textOver","text":this.Data.username});
			var UIComment=$("<div/>",{"class":"comment","text":this.Data.commentCount});
			var UICollect=$("<div/>",{"class":"collect","text":this.Data.copyCount});
			UIBody.append(Img,headImg,UITitle,UIInfo,UIUserName,UICollect,UIComment);
			if(this.Data.sharePassword){
				var UIlock=$("<div/>",{"class":"lock"});
				UIBody.append(UIlock)
			}
		_fatherBox.append(UIBody);
	}



	return {
		getNote:function(type){
			return Note;
		}
	}
})()


/*
 *allPublicNote 模块
 * */
Qingbiji.AllPublicNote=window.Qingbiji.AllPublicNote||(function(){
	var childList=[],
		_userId,
		_NoteType,
		_order_point=0,
		_fatherBox=$("<div/>",{"class":"box"}),
		ajaxState=0;
	//获取数据的ajax接口
	var _getData=function(fun){
		if(ajaxState){
			return false;
		}
		var ld=getALoading();
		_fatherBox.append(ld);
		ajaxState=1;
		$.ajax({
			"type":"POST",
			"url":"/open/getShareNotes",
			"data":{"orderPoint":_order_point,"pageSize":40,"summaryLength":120,"shareUserId":_userId},
			"dataType":"json",
			"complete":function(){
				ajaxState=0;
				ld.remove();
			},
			"success":function(data){
				var l=data.notes.length;
				if(l>0){
					_order_point=data.notes[l-1].orderPoint;
					fun(data.notes);	
				}
			}
		});
	}
	//处理数据生成笔记
	var _add_Note=function(Ary){
			for(var i=0;i<Ary.length;i++){
				var Note=new Qingbiji.NoteList.getNote();
				var tempNote=new Note(Ary[i],_NoteType);
				tempNote.renderUI(_fatherBox);
				childList.push(tempNote);
			}
	}
	var _bindLoadDataEvent=function(tag){
			tag.scroll(function(){
				var H=$(this)[0].scrollHeight;
				if($(this)[0].scrollTop+$(this).height()==H){
					_getData(_add_Note);
				}
			});	
	}

	function _bindWindowResize(Json){
		window.onresize=function(){
			var h=Json.height||$(window).height()-(Json.minusHeight);
			var w=Json.width||$(window).width();
				w=w-(w%250)+15;
			_fatherBox.css({"width":w+"px"});
			Json.Tage.css({"height":h+"px"});
		}
	}
	
	function getALoading(){
		var UIBody=$("<div/>",{"class":"PubNoteBox","style":"background:white;"});	
		var loading=$("<img/>",{src:"/static/images/newNote_v1/loading.gif","style":"margin:100px"});
			UIBody.append(loading);
		return UIBody;
	}


	return {
		"test":function(){
		}
		,"init":function(Json){
			var Json=Json||{};
			_userId=Json.userId;
			Json.Tage.append(_fatherBox);
			_bindLoadDataEvent(Json.Tage);
			_bindWindowResize(Json);
			window.onresize(Json);
			_getData(_add_Note);	
		}
	};
})();




/*
 *myNote 模块
 * */
Qingbiji.myNote=window.Qingbiji.myNote||(function(){
	var childList=[];
	var pageNum=1,pageTotal=2;
	var order_point=0;
	var _fatherBox=$("<div/>",{"class":"box"});
	var ajaxState=0;
	//获取数据的ajax接口
	var _getData=function(fun){
		if(ajaxState){
			return false;
		}
		var ld=getALoading();
		_fatherBox.append(ld);
		ajaxState=1;
		$.ajax({
			"type":"get",
			"url":"/getPersonalNotes",
			"cache" : false,
			"data":{"latestRevision":order_point,"page_size":20,"summary_length":150},
			//"data":{"f":"000","pno":pageNum,"ps":20},
			"dataType":"json",
			"complete":function(){
				ajaxState=0;
				ld.remove();
			},
			"success":function(Data){
				var l=Data.data.length;
				if(l>0){
					order_point=Data.data[l-1].latestRevision;
					fun(Data.data);	
				}
			}
		});
	}
	//处理数据生成笔记
	var _add_Note=function(Ary){
			for(var i=0;i<Ary.length;i++){
				var tempNote=new Note(Ary[i]);
				childList.push(tempNote);
			}
	}
	var _bindLoadDataEvent=function(tag){
			tag.scroll(function(){
				var H=$(this)[0].scrollHeight;
				if($(this)[0].scrollTop+$(this).height()==H&&pageNum<pageTotal+1){
					_getData(_add_Note);
				}
			});	
	}
	
	
	/*
	 * 声名笔记对象
	 * Json 笔记数据；
	 * @param Json {object} The display data for Note;
	 * */
	function Note(Json,type){
		this.Data=Json;
		this.id=Json.noteId;
		this.renderUI();
	}
	Note.prototype.renderUI=function(){
		var info,slt;
		if(this.Data.summary){
			if(this.Data.thumbAttId){
					info="info2";
					slt="slt2";
			}else{
				info="info3";
				slt="slt1"
			}
		}else{
			if(this.Data.thumbAttId){
					info="info1";
					slt="slt3";
			}else{
				info="info1";
				slt="slt1"
			}
		};
		this.UIBody=$("<a/>",{"class":"myNoteBox","href":"/showNote/"+this.id,"target":"_blank"});	
			var UIremove=$("<div/>",{"title":"删除笔记","class":"remove"})
			var titleBox=$("<div/>",{"class":"titleBox"});
				var UITitle=$("<span/>",{"class":"title textOver","text":this.Data.title});
					var d=TN.formatDate(this.Data.lastUpdateTime,"yyyy-MM-dd");
				var UITime=$("<span/>",{"class":"createTime textOver","text":d});
				titleBox.append(UITitle,UITime);
			var UIInfo=$("<p/>",{"class":"info "+info,"text":this.Data.summary});
			var Img=$("<img/>",{"class":"slt "+slt,src:"/open/get_note_thumbnail?note_id="+this.id+"&width=175&height=115"});
			this.UIBody.append(UIremove,titleBox,UIInfo,Img);//Img
			var a=$("<a/>",{"class":"fl","href":"/note/"+this.Data.note_id,"black":"_black"});
		_fatherBox.append(this.UIBody);
		this.bindEvent({"UIremove":UIremove});
	}
	Note.prototype.removeSelf=function(){
		var that=this;
		$.ajax({
			type : "POST",
			url:"/deleteNote",
			cache : false,
			data:{"noteId":that.id},
			dataType:"json",
			complete:function(){
			},
			success : function(data) {//data 返回数组
				that.UIBody.animate({"width":"0px"},500,function(){that.UIBody.remove();})
			}
		});
	}
	Note.prototype.bindEvent=function(json){
		var that=this;
		json.UIremove.click(function(){
			if(confirm("确定删除此笔记？")){
				that.removeSelf();
			}
			return false;
		});
	}

	function getALoading(){
		var UIBody=$("<div/>",{"class":"myNoteBox","style":"background:white;"});	
		var loading=$("<img/>",{src:"/static/images/newNote_v1/loading.gif","style":"margin:70px"});
			UIBody.append(loading);
		return UIBody;
	}

	function getAddNoteButton(){
		var UIBody=$("<a/>",{"class":"myNoteBox newNoteButton","href":"/lightnote/user/editnote?noteid=1","target":"_blank"});	
		return UIBody;
	}

	return {
		"test":function(){
		}
		,"init":function(Tage,Json){
			var Json=Json||{};
			Tage.append(_fatherBox);
			_bindLoadDataEvent(Tage);
			window.onresize=function(){
				var h=$(window).height()-120;
				var w=Json.width||Tage.width()||$(window).width();
					w=w-(w%185)+15;
				_fatherBox.css({"width":w+"px"});
				Tage.css({"height":h+"px","overflow-y":"scroll"});
			}
			window.onresize();
			var nn=getAddNoteButton();
			_fatherBox.append(nn);
			_getData(_add_Note);	
		}
	};
})();

