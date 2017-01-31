var tg;
var ns;
$(document).ready(function(){
	var content_height = $(window).height()-$(".page-header").height()-$("#Div_NavList").height()-15;
	$("#content").css({"height":content_height+"px"});
	//initPage();
	tg=new Tag();
	tg.initEvent();
	//var ns=new NoteShow();
	ns = new NoteShow();
	ns.initTinyMCE();	
	ns.initEvent();
	if(ns._noteId>0){
		ns._heartbeat();
	}
	$(window).unload(function(){
		ns._playLock("unlock");
	});
	window.onresize=function(){	
		ns.tinyResize();
	}
	//自动保存two分钟
	if($("#projectId").val()==0){
		setInterval(function(){
			ns._save();	
		},120000);
	}

	setDefaultTitle();
});

//-------------------李书军编写 设置默认标题------------------------------------
function setDefaultTitle()
{
	var serverTime = $("#serverTime").val();
	var title = $("#title").text();
	
	if(serverTime != "0" && title == "未命名")
	{ 
		formatTime = TN.formatDate(serverTime,"yyyy-MM-dd hh:mm:ss");
		arr = formatTime.split(" ");
		strDate = arr[0];
		strTime = arr[1];
		
		strDate = strDate.split("-");
		newTitle = strDate[0]+"年"+strDate[1]+"月"+strDate[2]+"日 ";
		newTitle += strTime + " 笔记";
		$("#title").text(newTitle);
	}
}

function getFileType(filename){
    var l=filename.length;
	filename=filename.toLowerCase();
    for (i=l-2;i>=0;i--){
		if( filename[i]=="." ){
			return filename.substr(i+1,l);
        }
    }
	return "";
}


//原getRefence函数，把附件保存到正文
function getRefence(filename,attId,size){
	//如果插入失败就不写入数据
	if(attId == undefined)
	{
		return "";
	}
	
	result = getFileType(filename)
	//var arrImages = new Array("png","gif","jpg","jpeg","bmp","tif");
	var arrImages = new Array("png","gif","jpg","jpeg","bmp");
	for(i=0;i<arrImages.length;i++){
		if(result == arrImages[i])
			return "<p class='imgP'><img src='/attachment/" + attId + "' /></p>";
	}
	var arrAttachment = new Array(
		{"type":"doc","path":"/static/images/home/attType/word.png"},
		{"type":"docx","path":"/static/images/home/attType/word.png"},
		{"type":"ppt","path":"/static/images/home/attType/ppt.png"},
		{"type":"xls","path":"/static/images/home/attType/excel.png"},
		{"type":"pdf","path":"/static/images/home/attType/pdf.png"},
		{"type":"mp3","path":"/static/images/home/attType/video.png"},
		{"type":"txt","path":"/static/images/home/attType/txt.png"}				
	)
	for (i=0;i<arrAttachment.length;i++){
		if(result==arrAttachment[i].type){
			s = "<p><a href='/attachment/" + attId + "'><img src='"+arrAttachment[i].path+"' /></a><br /><span>";
			s = s + filename + "--" + (size / 1024).toFixed(2) + "KB</span></p>";
			return s;
		}
	}
	s = "<p><a href='/attachment/" + attId + "'><img src='/static/images/home/attType/unknown.png' /></a><br /><span>";
	s = s + filename + "--" + (size / 1024).toFixed(2) + "KB</span></p>";
	return s;
}

function Tag(){
	this.addBotton=$("#addTag");
	this.Div=$("#tag");
	this.tags="";
	$("#noteTags").val()!=null&&$("#noteTags").val()!=""?this.tags=jQuery.parseJSON($("#noteTags").val()).tag:"";
	this.tagInput=$("<input/>",{"class":"BT_R","style":"width:80px;line-height:25px;height:25px;display:none;","maxlength":"50"});
	this.addBotton.parent().append(this.tagInput);
	this._initOldTags();
}

Tag.prototype={
	initEvent:function(){
		var that=this;
		this.addBotton.click(function(){
			that.tagInput.show();
			$(this).hide();
			that.tagInput.focus();
			return false;
		});
		this.tagInput.blur(function(){
			$(this).val()!=""?that.ok():that.cancle();
		});
		this.tagInput.keyup(function(event){
			event.keyCode == 13?that.tagInput.blur():"";
			event.keyCode == 27?that.cancle():"";
		});
		},
	ok:function(){
		var that=this;
			that.tagInput.hide();
			that.addBotton.show();
			var sstr=that.tagInput.val();
				sstr=sstr.replace(/[;,\，\；\ ]/g,",");
			var ary=sstr.split(",");	
			if(ary.length>0){
				for(var i=0;i<ary.length;i++){
					ary[i]!=""?that._addTag(ary[i]):"";
				}
			};
			that.tagInput.val("");
		},
	cancle:function(){
		var that=this;
			that.tagInput.val("");
			that.tagInput.hide();
			that.addBotton.show();
		},
	_addTag:function(str){
		var that=this;
		if(!checkSame(str)){
			return;
		}	
		var tagDiv=$("<div/>",{"style":"line-height:20px;padding-left:18px;margin-top:6px;background:url('/static/images/newNote_v1/bq.jpg') no-repeat 0 3px;float:left;margin-left:600px;write-space:nowap;height:20px;overflow:hidden;"});
		var contentDiv=$("<div/>",{"class":"tagInfo","style":"padding-left:3px;background:white;float:left;border:1px solid #ddd;border-right:none;padding-right:3px;","text":str});
			contentDiv.data("text",str);
		var close=$("<div/>",{"style":"float:left;border:1px solid #ddd;background:white;padding-left:3px;padding-right:3px;","text":"X"});
			tagDiv.append(contentDiv,close);
		this.Div.append(tagDiv);
		tagDiv.animate({"margin-left":"3px"});
		close.click(function(){
			$(this).parent().animate({"width":"0px"},500,function(){$(this).remove()});
			that.allTags();
		});
		function checkSame(sttr){//检测同名
			var ary=that.Div.find(".tagInfo");
			for(var i=0;i<ary.length;i++){
				if(ary.eq(i).innerText==sttr){
					return false;
				}
			}
			return true;
		}
	},
	_initOldTags:function(){
		for(var i=0;i<this.tags.length;i++){
			this._addTag(this.tags[i]);
		}
	},
	allTags:function(){	
		var tempStr="";
		var ary=this.Div.find(".tagInfo");
		for(var i=0;i<ary.length;i++){
			i==0?tempStr+=ary.eq(i).data("text"):tempStr+=","+ary.eq(i).data("text");
		}
		return tempStr;
	}

}

//获取ＵＲＬ参数
function getQueryString(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
function NoteShow(){
	this._noteId=$("#noteId").val();
	this._A_title=$("#title");
	this._folderId=$("#folderId").val();
	this._link_closePage=$("#closePage");
	//编辑按钮
	this._link_editNote=$("#btn_editNote");
}
NoteShow.prototype={
	//给按钮绑定事件
	initEvent:function(){
		var that=this;
			that._link_closePage.click(function(){
				var fun=function(){
					var ld=TN.Loading({"message":"正在解锁..."});
					that._playLock("unlock");
					ld.turnOff();
					if(location.pathname.indexOf("/app") != -1){
						v = jQuery('#notesLen').val();
						r = getQueryString('f');
						if(r && r == '0'){
							v = parseInt(v)+1;
						}
						st = getQueryString('st');
						location.href="/app/home?nl="+v+'&st='+st;
					}else{
						window.opener=null;
						window.open('','_self');
						window.close();
					}
				}
				that._save(fun);
			return false;
		});
		that._A_title.click(function(){
			that._reName();
		});
		//单击编辑按钮，进入编辑状态
		that._link_editNote.click(function(){
			that._link_editNote.css("display","none");
			that._link_closePage.css("display","");	
			$("#tinyAreaEdit").val($("#tinyArea").val());
			$("#tinyDivShow").css("display","none");
			$("#tinyDivEdit").css("display","");
			ns.initTinyMCE("tinyAreaEdit",false);
			$("#tinyDivShow").remove();
		});
	},
	_reName:function(){
				var that=this;
				this._A_title.hide();
				var w=this._A_title.width();
				w=w>100?w:"100";
				var _input_rename=$("<input/>",{"style":"font-size: 17px;font-weight: bold;text-align: center;color: #08C;width:"+w+"px"});
				this._A_title.parent().append(_input_rename);
				if(that._A_title.text()!="未命名"){
					_input_rename.val(that._A_title.text()).focus();
					_input_rename.select();
				}else{
					_input_rename.val("").focus();
				}
				_input_rename.blur(function(){
				});
				var ok=function(){
						if(_input_rename.val()!=null&&_input_rename.val()!=""){
							that._A_title.text(_input_rename.val());		
						}
						_input_rename.remove();
						that._A_title.show();
					}
				var cancle=function(){
					_input_rename.remove();
					that._A_title.show();
				}
				_input_rename.keyup(function(event){
					event.keyCode == 13?ok():"";
					event.keyCode == 27?cancle():"";
				});
				_input_rename.blur(function(){
					ok();
				});
			},
	
	//保存笔记
	_save:function(fun){
		$("input").blur();
		var that=this;
		$("#alertDiv").text("正在保存...");
		$.ajax({
			type : "post",
			url : "/saveNote/" +that._noteId,
			cache : false,
			dataType : "json",
			data : {
				noteId :that._noteId,
				noteTitle:that._A_title.text(),
				folderId:that._folderId,
				noteContent: tinyMCE.activeEditor.getContent(),
				noteTags:tg.allTags()
			},
		complete:function(){
		 },
		error:function(jqxhr, textStatus, errorThrown){ },
		success:function(data){
			if(data.result=="ok"){
				if(that._noteId==0&&data.noteId>0){
					that._noteId=data.noteId;
					//that._playLock("HB");
					that._heartbeat();
				//	location.href='/editnote?n='+data.noteId;
				}
				//var m=TN.Message();
				//m.type="ok";
				//m.show("保存成功");
				$("#alertDiv").text("草稿已于 "+data.message.lastUpdateTime+" 保存");
				document.title=""+that._A_title.text();  
				if(location.pathname.indexOf("/app") != -1){
					//在app里，window.opener会报错
					fun();
					return;
				}
				if(window.opener && window.opener.document){
				var tempBT=window.opener.document.getElementById("publicButton");
					tempBT!=null?tempBT.click():"";
					if(window.opener.location.pathname=="/myNote"){
						window.opener.location="/myNote";	
					}
				}
				if(fun!=undefined){
					fun();
				}else{
				}
			}else{
				alert(data.message);
			}
		}
		});
	},
	//resizeTiny
	tinyResize:function(){
		document.getElementById("tinyArea").style.height="1000px";		   
	},
	//初始化tinyMCE
	initTinyMCE:function(ta,ro){
		//ta是textarea的ID，ro表示readonly
		var that=this;
		var h1 = $("#content").height() -70;		
		//var h = ''+ h1 +'px';
		var h = '440px';
		if(!ta){
			ta = "tinyArea";
		}

		if(ro == null && location.pathname.indexOf("/app") != -1){
			r = getQueryString('f');
			if(r && r == '0'){
				ro = false;
				that._link_editNote.css("display","none");
				that._link_closePage.css("display","");	
			}else{
				ro = true;
			}
		}else if(ro == null){
			ro = false;
		}else{
			ro = ro;
		}
		if(location.pathname.indexOf("/app") != -1){
			h = '460px';
		}



		tinyMCE.init({
			mode : "exact", 
			elements : ta,
			theme : "advanced", 
			language :"zh-cn",
			content_css:"/static/css/tinyMCEOverwrite.css",
			plugins:"save,table,contextmenu,inlinepopups,insertdatetime,searchreplace,fullscreen,onehalf",
			theme_advanced_buttons1:"undo,redo,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,link,unlink,|,forecolor,backcolor,|,removeformat,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2:"tablecontrols,|,bullist,numlist,|,search,replace,|,hr,|,insertdate,inserttime,selected,fullscreen,onehalf",
			theme_advanced_buttons3:"",
			theme_advanced_buttons1_add:"save,attach,line-height",
			theme_advanced_toolbar_align:"left",
			theme_advanced_toolbar_location:"top",
			relative_urls : false,
			remove_script_host:false,
			readonly: ro,
			cleanup:true,
			height:h,
			//height:440,
			width:"100%",
			save_enablewhendirty :false,
			doctype : "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>",
			invalid_elements : "applet, base, basefont, bgsound, blink, body, dir, embed," 
			+ "fieldset, form, frame, frameset, head, html, iframe, ilayer, "
			+ "isindex, layer, link, marquee, menu, meta,"
			+ "noframes, noscript, object, param, plaintext,"
			+ "script, style, xml",
			table_styles : "Header 1=header1;Header 2=header2;Header 3=header3",
			table_cell_styles : "Header 1=header1;Header 2=header2;Header 3=header3;Table Cell=tableCel1",
			table_row_styles : "Header 1=header1;Header 2=header2;Header 3=header3;Table Row=tableRow1",
			table_cell_limit : 900000,
			table_row_limit : 1000,
			table_col_limit : 100,
			//fullscreen_new_window : true,
			table_default_border:1,
			table_default_cellpadding:"5",
			table_default_cellspacing:"0",
			entities : 'nbsp,160,iexcl,161,cent,162,pound,163,curren,164,yen,165,brvbar,166,sect,167,uml,168,copy,169,ordf,170,'
+ 'laquo,171,not,172,shy,173,reg,174,macr,175,deg,176,plusmn,177,sup2,178,sup3,179,acute,180,micro,181,para,182,'
+ 'middot,183,cedil,184,sup1,185,ordm,186,raquo,187,frac14,188,frac12,189,frac34,190,iquest,191,Agrave,192,Aacute,193,'
+ 'Acirc,194,Atilde,195,Auml,196,Aring,197,AElig,198,Ccedil,199,Egrave,200,Eacute,201,Ecirc,202,Euml,203,Igrave,204,'
+ 'Iacute,205,Icirc,206,Iuml,207,ETH,208,Ntilde,209,Ograve,210,Oacute,211,Ocirc,212,Otilde,213,Ouml,214,times,215,'
+ 'Oslash,216,Ugrave,217,Uacute,218,Ucirc,219,Uuml,220,Yacute,221,THORN,222,szlig,223,agrave,224,aacute,225,acirc,226,'
+ 'atilde,227,auml,228,aring,229,aelig,230,ccedil,231,egrave,232,eacute,233,ecirc,234,euml,235,igrave,236,iacute,237,'
+ 'icirc,238,iuml,239,eth,240,ntilde,241,ograve,242,oacute,243,ocirc,244,otilde,245,ouml,246,divide,247,oslash,248,'
+ 'ugrave,249,uacute,250,ucirc,251,uuml,252,yacute,253,thorn,254,yuml,255,fnof,402,Alpha,913,Beta,914,Gamma,915,Delta,916,'
+ 'Epsilon,917,Zeta,918,Eta,919,Theta,920,Iota,921,Kappa,922,Lambda,923,Mu,924,Nu,925,Xi,926,Omicron,927,Pi,928,Rho,929,'
+ 'Sigma,931,Tau,932,Upsilon,933,Phi,934,Chi,935,Psi,936,Omega,937,alpha,945,beta,946,gamma,947,delta,948,epsilon,949,'
+ 'zeta,950,eta,951,theta,952,iota,953,kappa,954,lambda,955,mu,956,nu,957,xi,958,omicron,959,pi,960,rho,961,sigmaf,962,'
+ 'sigma,963,tau,964,upsilon,965,phi,966,chi,967,psi,968,omega,969,thetasym,977,upsih,978,piv,982,bull,8226,hellip,8230,'
+ 'prime,8242,Prime,8243,oline,8254,frasl,8260,weierp,8472,image,8465,real,8476,trade,8482,alefsym,8501,larr,8592,uarr,8593,'
+ 'rarr,8594,darr,8595,harr,8596,crarr,8629,lArr,8656,uArr,8657,rArr,8658,dArr,8659,hArr,8660,forall,8704,part,8706,exist,8707,'
+ 'empty,8709,nabla,8711,isin,8712,notin,8713,ni,8715,prod,8719,sum,8721,minus,8722,lowast,8727,radic,8730,prop,8733,infin,8734,'
+ 'ang,8736,and,8743,or,8744,cap,8745,cup,8746,int,8747,there4,8756,sim,8764,cong,8773,asymp,8776,ne,8800,equiv,8801,le,8804,ge,8805,'
+ 'sub,8834,sup,8835,nsub,8836,sube,8838,supe,8839,oplus,8853,otimes,8855,perp,8869,sdot,8901,lceil,8968,rceil,8969,lfloor,8970,'
+ 'rfloor,8971,lang,9001,rang,9002,loz,9674,spades,9824,clubs,9827,hearts,9829,diams,9830,OElig,338,oelig,339,Scaron,352,scaron,353,'
+ 'Yuml,376,circ,710,tilde,732,ensp,8194,emsp,8195,thinsp,8201,zwnj,8204,zwj,8205,lrm,8206,rlm,8207,ndash,8211,mdash,8212,lsquo,8216,'
+ 'rsquo,8217,sbquo,8218,ldquo,8220,rdquo,8221,bdquo,8222,dagger,8224,Dagger,8225,permil,8240,lsaquo,8249,rsaquo,8250,euro,8364,',
			save_onsavecallback :function(){
				that._save();
			},

			setup : function(edite) {
				edite.onKeyDown.add(function(ed,evt){
					if(evt.keyCode==9){
						edite.execCommand('mceInsertContent',false,"&nbsp;&nbsp;&nbsp;&nbsp;");
						evt.preventDefault();
					}
				});
				edite.onMouseDown.add(function(ed,evt){
				});
			//Add a custom button 
				edite.addButton('attach', { 
				title : '上传附件', 
				image : '/static/images/attach.png', 
				onclick : function(){ 
						var fun=function(){
							that._creatUpDiv();
						}
						that._save(fun);
					} 
				});
				//调整行间距。
 				tinymce.create('tinymce.plugins.onehalf', {
       				createControl: function(n, cm) {
        				switch (n) {
            			    case 'onehalf':
                    			var mlb = cm.createSplitButton('onehalf', {
                        			title : 'My list box',
									image:'/static/images/newNote_v1/line-height.png',
                        			onclick : function(v) {
                            			//tinyMCE.activeEditor.windowManager.alert('Value selected:' + v);
                       				 },
									onselect:function(){
										alert("tttddd");
									}
                    			});
								mlb.onRenderMenu.add(function(c, m) {
									m.add({title : '行距', 'class' : 'mceMenuItemTitle'}).setDisabled(1);
									m.add({
											title : '1.0em', 
											style:"color:red;",
										onclick : function() {
											var node=edite.selection.getStart();
											$(node).css({"line-height":"1em"});
											$(node).attr("data-mce-style","line-height:1em");
										}
									});
								m.add({title : '2.0em', onclick : function() {
										var node=edite.selection.getStart();
										$(node).css({"line-height":"2em"});
										$(node).attr("data-mce-style","line-height:2em");
									}
								});
								m.add({title : '3.0em', onclick : function() {
										var node=edite.selection.getStart();
										$(node).css({"line-height":"3em"});
										$(node).attr("data-mce-style","line-height:3em");
									}
								});
							});
                		return mlb;
            			}
            		return null;
        			}
    			});
    			tinymce.PluginManager.add('onehalf', tinymce.plugins.onehalf);
			}
		});
	},
	//创建上传层
	_creatUpDiv:function(){
			var div1=$("<div/>",{"class":"upFileDiv"});
			var div2=$('<div/>',{"id":"myfile1","class":"myfile1"});
			var ul=$("<ul/>",{"id":"separate-list","class":"fileList"});
			var button = $('<input />',{"type":"button","class":"btn BT_close","value":"关闭"});
			var overDiv=TN.createOverDiv(1);
			$("body").append(overDiv,div1.append(div2).append(ul).append(button));
			var params={"noteId":this._noteId};
			this._createUploader(params,div1,overDiv,button,'/upload2');	
			},
	//创建上传环境，并完成上传
	_createUploader:function(params,div,overDiv,button,action){
			var that=this;
            var uploader = new qq.FileUploader({
                element: document.getElementById('myfile1'),
                listElement: document.getElementById('separate-list'),
				action:action,
				sizeLimit: 1024*1024*20,
    			params:params,
				multiple:false,
		        template: '<div class="qq-uploader">' + 
		                '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>' +
		                '<div class="qq-upload-button"><div>选择文件</div></div>' +
		                '<ul class="qq-upload-list"></ul>' + 
		             '</div>',
				onComplete: function(id, fileName, resJson){
					if (resJson.success == "false")
					{
						alert("上传失败");
						return;
					}
					/*
					if(resJson.result=="baidu"){
						var par={"access_token":resJson.access_token,"method":resJson.method,"path":resJson.path}
						that._createUploader(par,div,overDiv,button,resJson.action);	
						return;
					}
					*/
					s = getRefence(fileName,resJson.attId,resJson.size);
					tinyMCE.execCommand('mceInsertContent', false, s);
					//从直接放入tinyMCE改为放入附件列表
					//$("#attList").html($("#attList").html()+s)
					
					div.remove();
					overDiv.remove();
				}
            });
			button.unbind("click").click(function()
			{
				uploader._handler.cancelAll();	
				div.remove();
				overDiv.remove();
			 })

		},
	//打开心跳
	_heartbeat:function(){
			var that=this;
			that._playLock("HB");
			that.hearB=setInterval(function(){
				that._playLock("HB");
			},240000);
		},
	//操作锁定 Ajax接口
	_playLock:function(type){
			var that=this;
			$.ajax({
				type:"GET",
				url:"/lock",	
				async:false,
				cache:false,
				data:{"noteId":that._noteId,"type":type},
				dataType:"json",
				error:function(jqxhr, textStatus, errorThrown){var msg=new Message();msg.type="ok";msg.show("网络故障 errorText: "+textStatus +" errorThrown: "+errorThrown);},
				success:function(data){
					if(data.result=="ok" && type=="unlock"){
						//window.close();
					}else if(data.result!="ok" && type=="HB"){
						alert(data.message);	
					}
				}
			}); 
		}
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

