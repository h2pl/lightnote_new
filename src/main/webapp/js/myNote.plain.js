$(document).ready(function(){
			QBJ.PageAlert.addAlert($("#publicNote"),{"name":"public001",msg:"随便转转",x:37,y:43});
		var allPublicNote=Qingbiji.myNote;
		allPublicNote.init($("#con"),{"type":"myNote"});
});
