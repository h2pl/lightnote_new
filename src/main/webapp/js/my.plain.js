var serchBT="";
var serchInput="";
var supType="Per";
$(document).ready(function(){
			//FolderTree.show("Per");
			serchInput=$("#serchInput");
			serchBT=$("#serch");
			init();
			Nav.initSelf("我的笔记",0);
			getContentForAjax("/gpf","Per");
			QBJ.PageAlert.addAlert($("#publicNote"),{"name":"public001",msg:"随便转转",x:37,y:43});

});
var ListBox;
var ChildBox;
var Nav;
function init(){
	serchInput.keydown(function(evt){
		if(evt.keyCode==13){
			serchNote(serchInput.val());
			return false;
		};	
	});
	serchBT.click(function(){
		serchNote(serchInput.val());	
	});
	
	var Json="";
//	Nav=new TNote.Nav($("#DIV_NavShow"));
	Nav=new Nav_C($("#DIV_NavShow"));
}
function serchNote(ser){	
	var ld=TN.Loading({"message":"正在加载..."});
		//ld.turnOn();
		var data={};
			var datad=[{"subCount": 1,"ser":ser,"noteCount":data.current, "projectId": 0, "pFolderId": 0, "manage":0, "oc": "F", "remove":0, "deep": 0,"folderName":ser+"的搜索结果", "folderId":"005", "folderCount":data.total, "modify": 1, "isLeaf": 0, "view": 1, "isDefault": 0, "ord": 0, "trash": 0, "create":0, "userId": 27042, "revision": 6326721}];
				ChildBox.removeLast();
				ListBox.getChildForLast(0).chengeToSearchResult(datad);
				ListBox.setActiveChildByIndex(ListBox.getChildCount(),true);//激活最后一个Clist
				ListBox.getActiveChild().getChildForLast(0).searchResult(ser);//激活最后一个Clist
			//	new CList_C(ChildBox,datad,ChildBox);
}
function getContentForAjax(url,oc){
		var ld=TN.Loading({"message":"正在加载..."});
		ld.turnOn();
		$.ajax({
			type : "get",
			url :url,
			cache : false,
			dataType : "json",
			complete:function(){
				ld.turnOff();
			},
			error:function(jqxhr,textStatus,errorThrown){ alert("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown); },
			success : function(data){
			//data 返回数组
				ListBox=new TNote.ListBox($("#Div_Name"),"showList",data,oc);
				ChildBox=new TNote.ListBox($("#Div_listShow"),"showChild");
			}
		});
}
