/*
 *this js need pageAlert.css;**
 * */
(function(){
	window.QBJ=window.QBJ||{};
	QBJ.addMoudle=function(name,obj){
		if(this[name]){
			alert("the moudle name '"+name+"' is existed")
		}else{
			this[name]=obj;
		}
	};
	/*
	 *TN.PageAlert;
	 *这是一个用于显示网页提示的模块；
	 * */
	(function(){
		var childList=[];
		function getAlert(tag,json){
			var json=json||{};
			var msg=json.msg,
				name=json.name,
				point=json.point||"top",
				width=json.width||100,
			    x=json.x||0,
				y=json.y||0;
			tag.css({"position":"relative","overflow":"visible"});
	        var layer=$("<div/>",{"class":"PageAlert_layer"});
	        var box=$("<div/>",{"class":"PageAlert_box","style":"width:"+width+"px"});
				layer.css({"left":x+"px","top":y+"px"});
				var angle=$("<div/>",{"class":"angle"});
			var UIContent=$("<p/>",{"class":"content","text":msg});
			var UIClose=$("<div/>",{"class":"closeBT","text":"X"});
				box.append(UIContent,UIClose);
				layer.append(angle,box);
				
				switch(json.point){
						case "left":angle.css({"background":"url('/static/images/newNote_v1/angle2.png')","top":"7px","left":"-7px"});break;
						case "bottom":angle.css({"background":"url('/static/images/newNote_v1/angle3.png')","top":"24px","left":"18px"});break;
						default:angle.css({"background":"url('/static/images/newNote_v1/angle.png')","top":"-7px","left":"10px"});break;
				}


			
			//
			function TempAlert(name){
				this.name=name;
				tag.append(layer);	
				var that=this;
				UIClose.click(function(){
					removeAllLayerByName(that.name);
					return false;
				});
			}	
			TempAlert.prototype.removeAll=function(){
				removeAllLayerByName(this.name);
			}
			TempAlert.prototype.close=function(){
				QBJ.Cookie.setCookie(name,"hide");	
				layer.remove();
			}

			function removeAllLayerByName(name){
				for(var i=0,l=childList.length;i<l;i++){
					if(childList[i].name==name){
						childList[i].close();
					}
				}
			}
			var t=new TempAlert(json.name);
			childList.push(t);
			return t;
		}
	
		var temp = {
			"addAlert":function(tag,json){
					if(!json.name){
						alert("pageAlert need name");
						return false;
					}
				var ck=QBJ.Cookie.getCookie(json.name);
				if(ck=="hide"){return false}
				var tA=getAlert(tag,json);
				return tA;	
			}
		}	
		QBJ.addMoudle("PageAlert",temp);
	})();

	/*
	 *TN.Cookie
	 *用于控制网页cookie的模块;
	 * */
	(function(){
		function setCookie(c_name,value,expiredays){
			var exdate=new Date()
			exdate.setDate(exdate.getDate()+expiredays)
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
		}

		function getCookie(c_name){
			if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=")
				if (c_start!=-1){ 
					c_start=c_start + c_name.length+1; 
			    	c_end=document.cookie.indexOf(";",c_start);
			    	if (c_end==-1) c_end=document.cookie.length
			    	return unescape(document.cookie.substring(c_start,c_end))
			    } 
	  		}
			return ""
		}
		var temp={
			"setCookie":setCookie,
			"getCookie":getCookie
		}
		QBJ.addMoudle("Cookie",temp);
	})();


})();

