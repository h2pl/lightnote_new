/*ThinkerNote webClient  ThinerNoteClist.min.js v1.0*/
(function(){
	function T(){
		var loadingCount=0;
		//格式化时间
		
		//构造函数
		function _temp(){
			var tp=this;
			this.test=function(){
			alert("eeee");
			}
			//Loading对象
			this.Loading=function(Json){
				//创建对象构造方法
				function _loading(json){
					this.Json=json;
					this._sonTage=new Array();
					this._overDiv=tp.createOverDiv(0);
					return false;
					this.turnOn();
				}
				_loading.prototype={
					turnOn:function(){
						//判断是否有遮蔽层
						if(this.Json.overDiv==undefined||this.Json.overDiv){
							$("body").append(this._overDiv);
							this._sonTage.push(this._overDiv)
						}
						//判断是否有等待信息，如果没有，显示加载图画
						if(this.Json.message){
							var mes=$("<div/>",{"text":this.Json.message,"class":"loading"})
							$("body").append(mes);
								mes.css({"left":"50%","top":"10px"});
							this._sonTage.push(mes);
						}else{
							var loadImg=$("<img/>",{"src":"../js/loading.gif","style":"position:fixed;top:10px;z-index:99999999;"})
							$("body").append(loadImg);
								loadImg.css({"left":($("body").width()/2-loadImg.width()/2)+"px","top":"250px"});
							this._sonTage.push(loadImg);
						}
					  },
					turnOff:function(){
						var _ary=this._sonTage;
						for(var i=0;i<_ary.length;i++){
							_ary[i].remove();
						}
					}
				}
				return new _loading(Json);
			}
			this.Page=function(){
				var num=$("<div/>",{});
				function _page(){
				
				}
				_page.prototype.init=function(tage){
						
				}
				return new _page();	
			}
			//像框
			this.Picture=function(tage){	
				function _picture(tage){
					this.showIndex=0;
					this.nowIndex=this.showIndex;
					this.fatherTage=tage;
					this.child;
					this.width=tage.width();
					this.height=tage.height();
					this.UIBody=$("<div/>",{"style":"overflow:hidden;position:relative;float:left;width:"+this.width+"px"});
					this.UIContent=$("<div/>",{"style":"overflow:hidden;height:"+this.height+"px;width:"+this.width+"px"});
					this.num=$("<ul/>",{"style":"position:absolute;top:100px;left:150px;list-style:none;z-index:999;"});
					this.infoBox=null;
				}
				_picture.prototype.init=function(ary){
					var that=this;
					that.child=ary;
					for(var i=0;i<ary.length;i++){
						var a=$("<a/>",{"href":ary[i].href})
						var img=$("<img/>",{"title":ary[i].name,"src":ary[i].src,"style":"float:left;position:absolute;"});
						this.UIContent.append(a.append(img));
						var li=$("<li/>",{
							"style":"width:10px;height:10px;background:#ddd;float:left;margin-left:10px;"
						});
						this.num.append(li);
						i==0?li.css({"background":"url('/static/images/TNote/blue.png')"}):"";
					//	img.animate({"filter":"alpha(opacity=10)","opacity":"0.1","opacity":"0.1"},1000,function(){
							img.hide();
					//	});
					}
					that.UIContent.find("img").eq(that.showIndex).show().animate({"filter":"alpha(opacity=100)","opacity":"1"},1000);
					that.bindClick();
				}
				_picture.prototype.bindClick=function(){
					var that=this;
					this.num.find("li").click(function(){
						if(that.showIndex==$(this).index()){
							return ;
						}else{
						clearInterval(that.siv);
						that.showIndex=$(this).index();
						that.run();
						that.animateR(that.showIndex);
						}
					});
				}
				_picture.prototype.setNumBox=function(tage){
					this.numBox=tage;	
				}
				_picture.prototype.setNumPosition=function(x,y){
					this.num.css({"top":y+"px","left":x+"px"});	
				}
				_picture.prototype.setInfoBox=function(tage){
					this.infoBox=tage;
					this.infoBox.html(this.child[0].name);
				}
				_picture.prototype.run=function(){
					var that=this;
					that.siv=setInterval(function(){
						if(that.showIndex<that.child.length-1){
							that.showIndex++;
						}else{
							that.showIndex=0;
						}
						that.animateR(that.showIndex);
					},5000);
					if(this.numBox){
						this.numBox.append(this.num);
						this.num.css({"position":"relative","top":"0px","left":"0px"});
					}else{
						this.UIBody.append(this.num);
					}
					this.fatherTage.append(this.UIBody.append(this.UIContent));
				}
				_picture.prototype.animateR=function(index){
					var that=this;
					that.num.find("li").eq(this.nowIndex).css({"background":"url('/static/images/TNote/white.png')"})
					that.num.find("li").eq(index).css({"background":"url('/static/images/TNote/blue.png')"})
					//设置页面切换效果
					if(this.nowIndex!=undefined){
						var temp=this.UIContent.find("img").eq(this.nowIndex)
							temp.animate({"filter":"alpha(opacity=1)","opacity":"0.01"},1000,function(){
								temp.hide();
							//	that.UIContent.find("img").eq(index).show().animate({"filter":"alpha(opacity=100)","opacity":"1"},500);
						})
					};
					var img=that.UIContent.find("img").eq(index);
						img.show()
						img.css({"filter":"alpha(opacity=1)","opacity":"0.01"});
						img.animate({"filter":"alpha(opacity=100)","opacity":"1"},1000);
					//设置信息框
					if(this.infoBox){
						this.infoBox.html(that.child[index].name);
					}
					this.nowIndex=index;
				}
				return new _picture(tage);
			}

			//滑动窗
			this.slideBox=function(){	
				function _slideBox(){
				
				}
				_slideBox.prototype.doIt=function(tageAry){
					for(var i=0;i<tageAry.length;i++){
						var box=tageAry.eq(i);	
						this.bindEvent(box);
					}
				}
				_slideBox.prototype.bindEvent=function(box){
					var nowTop=box.find(".text").css("margin-top");
					var tit;
					var time;
					var st=1;
					box.hover(function(){
						tit=$(this).find(".text");
						time=setInterval(function(){
							if(st){
								tit.animate({"margin-top":"0px"},function(){
									st=true;
									clearInterval(time);
								});
							}
						},500);
					},function(){
						clearInterval(time);
						if(st){
							tit.animate({"margin-top":nowTop},function(){
								st=true;
							});
							st=false;
						}
					});
						
				}
				return new _slideBox();
			}



			//Message 对象
			this.Message=function(){
				//信息框
				function _Message(){
					this.type="nor";
					var vp=this;
					this.initUI=function(text){
						var c="msgN";
						switch(vp.type){
							case "nor":c="msgN";break;
							case "err":c="msgE";break;
							case "ok":c="msgO";break;
						}
						vp.UIBody=$("<div/>",{"class":"messageDiv "+c});
						vp.UIBody.css({"left":(screen.width/2)-50+"px"});
						vp.UIBody.text(text);
						$("body").append(vp.UIBody);
					}
				}
				_Message.prototype.show=function(text){
					this.initUI(text);
					var that=this;
					that.UIBody.animate({"filter":"alpha(opacity=30)","opacity":"0.3","opacity":"0.3"},3000,function(){
						that.UIBody.remove();
					});
				}
				_Message.prototype.showOnTime=function(text,callback,time){
					this.initUI(text);
					var that=this;
					var t=time;
					var s=setInterval(function(){
						that.UIBody.text((t--)+"秒后关闭窗口。"+text);
						if(t==0){
							clearInterval(s);
							callback();
						}
					},1000);	
				}
				return  new _Message();
			}



		}
		//原型方法
		_temp.prototype={
				//自定义封装继承方法
			Extend:function(sup,sub){
				function temp(){};
				temp.prototype=sup.prototype;
				var tmp=new temp();
				tmp.constructor=sub;
				sub.prototype=tmp;
			},
			//解决IE下不支持placeholder
			placeholderInit:function(){
				var supportPlaceholder = 'placeholder' in document.createElement("input");
				if(supportPlaceholder){
					return false;
				}
				$("[placeholder]").each(function() {
					var dd=$("<span/>",{"text":$(this).attr("placeholder"),"style":"display:block;padding-left:3px;padding-right:10px;top:3px;left:2px;color:#ddd;position:absolute;line-height:"+($(this).height()-4)+"px"})
					$(this).css({"z-index":"999"});
					$(this).parent().css("position","relative").append(dd);
					dd.data("inp",$(this));
					if($.trim($(this).val())!=""){
						dd.hide();
					}
					dd.click(function(){
						var sp=$(this);
						var inp=$(this).data("inp");	
						sp.hide();
						inp.focus();
					});
					$(this).focus(function(){
						dd.hide();
					});
					$(this).blur(function(){
						if($.trim($(this).val())==""){
							dd.show();
						}
					});
					$(this).attr("placeholder","")
				});
			},
			hrefToJson:function(href){
				var temp=href.split("?");
				if(!temp[1]){
					return null;
				}
				var argument=temp[1].split("&");
					var i,tempJson={};
					for(i=0;i<argument.length;i++){
						var tempA=argument[i].split("=");
						var tempKey=tempA[0];
						var tempValue=tempA[1];
						var tempValue=decodeURI(tempA[1]);//, "utf-8");;
						tempJson[tempKey]=tempValue;
					}
					return tempJson;
			},
			formatDate:function(d,format){ 
				//d=new Date(d*1000-new Date().getTimezoneOffset()*60*1000);
				d=new Date(d*1000);
				var o = {  
					"M+" : d.getMonth()+1, //month  
					"d+" : d.getDate(),    //day  
					"h+" : d.getHours(),   //hour  
					"m+" : d.getMinutes(), //minute  
					"s+" : d.getSeconds(), //second  
					"q+" : Math.floor((d.getMonth()+3)/3), //quarter  
					"S" : d.getMilliseconds() //millisecond  
				}  
				if(/(y+)/.test(format)){
					format=format.replace(RegExp.$1,(d.getFullYear()+"").substr(4 - RegExp.$1.length));  
					for(var k in o)if(new RegExp("("+ k +")").test(format))  
					format = format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+ o[k]).substr((""+ o[k]).length));
					return format;  
				}
			},
			//创建方法
			createOverDiv:function(lev){
				var div=$("<div/>",{"class":"overDiv"+lev});
					div.css({"height":$("body").height()});
					return div;
					},
			show:function(){
				alert("测试");
			}
		}
		return new _temp();
	}
	window.TN=T();
})()
