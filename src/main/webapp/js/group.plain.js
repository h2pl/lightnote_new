var ListBox;
var ChildBox;
var Nav;
var supType="Pro";
$(document).ready(function(){
			init();
			Nav.initSelf("群组合作",0);
			getContentForAjax("/pj/gp","Pro");
			QBJ.PageAlert.addAlert($("#publicNote"),{"name":"public001",msg:"随便转转",x:37,y:43});
		//	var sm=new SetMark();
});
function init(){
	var Json="";
	Nav=new TNote.Nav($("#DIV_NavShow"));
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
			error:function(jqxhr, textStatus, errorThrown){ alert("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown); },
			success : function(data){
			//data 返回数组
				ListBox=new TNote.ListBox($("#Div_Name"),"showList",data,oc);
				ChildBox=new TNote.ListBox($("#Div_listShow"),"showChild");
			}
		});
}

