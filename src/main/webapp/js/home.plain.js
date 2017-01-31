$(document).ready(function(){
	spaceToo();
	initInvite();
			QBJ.PageAlert.addAlert($("#publicNote"),{"name":"public001",msg:"随便转转",x:37,y:43});
	QBJ.PageAlert.addAlert($("#trends"),{
			"name":"home001",
			"x":84,
			"y":14,
			msg:"新功能",
			"point":"bottom"
	});
});

function spaceToo(total,used){
	this.st=$("#spaceTool").width();
	this.sp=$("#space");

	this.allSpace=$("#allSpace");	
	this.usedSpace=$("#usedSpace");	
	var wid=parseInt(st)*parseInt(usedSpace.text())/parseInt(allSpace.text());
	sp.css("width",wid);
}

function initInvite(){
	$("#BT_invite").click(function(){
		var Inv=new Invite($("#userId").val());
		Inv.show();
		return false;
	});
}
