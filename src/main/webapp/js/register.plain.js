jQuery(document).ready(function() {
	bind_clicked_event();
	// 用户名判断
//	jQuery("#user").blur(function(){
//		checkUsername();
//	});
	// 密码判断
	jQuery("#pass").blur(function() {
		checkPassword();
	});
	// 确认密码
	jQuery("#pass2").blur(function() {
		checkPasswordEqual();
	});
	// 邮箱判断
	jQuery("#email").blur(function() {
		checkEmail();
	});
	jQuery("#email").focus(function(){
		if(jQuery("#email").val() == jQuery("#email").attr("placeholder")){
			jQuery("#email").val("");
			jQuery("#email").removeClass("placeholder");
		}
	});
	jQuery("#verifyCode").blur(function() {
		checkfyCode();
	});

	// 服务条款判断
	jQuery(":checkbox").bind("click", function() {
		checkTOS();
	});
	jQuery("#btn_register").click(function() {
		var flag = true;
		//alert("“轻笔记”由于团队转型，将于3月15日起停止新用户注册功能，6月30日后将关闭整个软件，“轻笔记”的新老用户一定要在6月30日前将数据信息迁移。由于转型给用户带来了非常大的不便，轻笔记的研发团队对此深感抱歉，并表示感谢大家对“轻笔记”五年多的关爱。");
		//return;
		jQuery(".usage .field").each(function() {
			if (jQuery(this).val() == "") {
			//	if (jQuery(this).attr("id") == "user") {
			//		checkUsername();
			//	} else
				if(jQuery(this).attr("id") == "email") {
					checkEmail();
				}else if (jQuery(this).attr("id") == "pass") {
					checkPassword();
				}else if (jQuery(this).attr("id") == "pass2") {
					checkPasswordEqual();
				}else if (jQuery(this).attr("id") == "verifyCode") {
					checkfyCode();
				}

				jQuery(this).focus();
				flag = false;
				return false;
			} else if (jQuery(this).next("label").hasClass("unchecked")) {
				//if (jQuery(this).attr("id") == "user") {
				//	checkUsername();
				//} else
				if (jQuery(this).attr("id") == "email") {
					checkEmail();
				}else if (jQuery(this).attr("id") == "pass") {
					checkPassword();
				} else if (jQuery(this).attr("id") == "pass2") {
					checkPasswordEqual();
				}
				jQuery(this).focus();
				flag = false;
				return false;
			}
		});
		if (flag) {
			if (jQuery(":checkbox").attr("checked")) {
				do_register();
			} else {
					if($("#alert")[0]){
						$("#alert").html("必须同意服务条款");
					}else{
						alert("必须同意服务条款");
					}
			}
		}
	});
});

//刷新验证码
function bind_clicked_event()
{
	jQuery("#vcodelink").click(
		function(){
			d = new Date();
			jQuery("#vcodeimage").attr("src", "/vcode?"+d.getTime())
	})
}

// 用户名判断
/*
function checkUsername() {
	if(jQuery("#user").val() == "") {
		jQuery("#user").next("label").html("用户名称不能为空！").removeClass("checked").addClass("unchecked");
		// jQuery("#username").focus();
		return false;
	} else {
		// 用户名校验的正则表达式
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5][\w\u4e00-\u9fa5-.]{1,49}$/;
		if(reg.test(jQuery("#user").val())) {
			jQuery("#user").next("label").html("").removeClass("unchecked").addClass("checked");
			checkStatus("username", jQuery("#user").val());
		} else {
			jQuery("#user").next("label").html("用户名必须是以英文、数字和汉字开头，由英文、数字、汉字、下划线等组成的长度为2到50的字符串！").removeClass("checked").addClass("unchecked");
			// jQuery("#username").focus();
			return false;
		}
	}
}
*/
// 密码判断
function checkPassword(){
	newPass = jQuery("#pass").val();
	jQuery("#registerInfo").html("");
	if(newPass == "" || jQuery.trim(newPass) == "") {
		jQuery("#pass").next("label").html("用户密码不能为空！").removeClass("checked").addClass("unchecked");
		// jQuery("#password").focus();
		return false;
	} else {
		if(newPass.length >= 1 && newPass.length <= 20) {
			jQuery("#pass").next("label").html("").removeClass("unchecked").addClass("checked");
			if (jQuery("#pass2").val() != "") {
				checkPasswordEqual();
			}
		} else {
			jQuery("#pass").next("label").html("密码长度在1-20个字符，请确认！").removeClass("checked").addClass("unchecked");
			// jQuery("#password").focus();
			return false;
		}
	}
}

function checkPasswordEqual() {
	jQuery("#registerInfo").html("");
	if(jQuery("#pass2").val() == "") {
		jQuery("#pass2").next("label").html("确认密码不能为空！").removeClass("checked").addClass("unchecked");
		// jQuery("#password2").focus();
		return false;
	} else if(jQuery("#pass2").val() != jQuery("#pass").val()) {
		jQuery("#pass2").next("label").html("密码输入不一致，请确认！").removeClass("checked").addClass("unchecked");
		// jQuery("#password2").focus();
		return false;
	} else {
		jQuery("#pass2").next("label").html("").removeClass("unchecked").addClass("checked");
	}
}

function checkfyCode() {
				jQuery("#registerInfo").html("");
	if(jQuery("#verifyCode").val() == "") {
		if(jQuery("#verifyCode").next("img")){
			jQuery("#verifyCode").next().next().next("label").html("不能为空！").removeClass("checked").addClass("unchecked");
		}else{
			jQuery("#verifyCode").next("label").html("不能为空！").removeClass("checked").addClass("unchecked");
		}
		return false;
	}else {
		if(jQuery("#verifyCode").next("img")){
			jQuery("#verifyCode").next().next().next("label").html("").removeClass("unchecked").addClass("checked");
		}else{
			jQuery("#verifyCode").next("label").html("").removeClass("unchecked").addClass("checked");
		}
	}
}

function checkEmail(){
				jQuery("#registerInfo").html("");
	if(jQuery("#email").val() != "" || jQuery("#email").val() != "邮箱将帮助您找回密码") {
		// 用户名校验的正则表达式
		var regExp = /^([a-zA-Z0-9]+([\.+_-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/;
		if(regExp.test(jQuery("#email").val())) {
			checkStatus("email", jQuery("#email").val());
		} else {
			jQuery("#email").next("label").html("注册邮箱不合法，请确认！").removeClass("checked").addClass("unchecked");
			// jQuery("#email").focus();
			return false;
		}
	}else{
		jQuery("#email").next("label").html("注册邮箱不能为空！").removeClass("checked").addClass("unchecked");
		jQuery("#email").val("邮箱将帮助您找回密码");
		jQuery("#email").addClass("placeholder");
		// jQuery("#email").focus();
		return false;
	}
}

function checkStatus(type, value) {
				jQuery("#registerInfo").html("");
	jQuery.ajax({
		type : "get",
		url : "/checkId",
		cache : false,
		dataType : "json",
		data : {
			type : type,
			name : value
		},
		success : function(returnMessage) {
			if(returnMessage["result"] != "ok") {
				if(type == "username") {
				//	jQuery("#user").next("label").html("抱歉，该用户名已被占用，请重新输入！").removeClass("checked").addClass("unchecked");
				} else if(type == "email") {
					jQuery("#email").next("label").html("抱歉，该邮箱已被占用，请重新输入！").removeClass("checked").addClass("unchecked");
				} else {
					alert("未知错误!");
				}
				return false;
			} else {
				jQuery("#" + type).next("label").html("").removeClass("unchecked").addClass("checked");
			}
		},
		error : function(xhr, ajaxOptions, error) {
			// alert(error);
		}
	});
}

function checkTOS() {
				jQuery("#registerInfo").html("");
	if (!(jQuery(":checkbox").attr("checked"))) {
		jQuery("#btn_register").attr("disabled", "true");
	} else {
		jQuery("#btn_register").removeAttr("disabled");
	}
}

// 异步提交
function do_register() {
	jQuery("#registerInfo").html("正在注册，请稍候...").addClass("required");
	jQuery("#btn_register").attr("disabled", "true");
	jQuery.ajax({
		type : "post",
		url : jQuery("#subAction").val(),
		cache : false,
		dataType : "json",
		data : {
		//	username : jQuery("#user").val(),
			username : jQuery("#email").val(),
			password : jQuery("#pass").val(),
			password2 : jQuery("#pass2").val(),
			email : jQuery("#email").val(),
			invite_code : jQuery("#inviteCode").val(),
			verifyCode : jQuery.trim(jQuery("#verifyCode").val()),
			next:jQuery("#next").val()
		},
		success : function(returnMessage) {
			if(returnMessage["result"] == "ok") {
				jQuery("#registerInfo").html("");
				$.cookie('un',$("#email").val());
				var next = jQuery("#next").val();
				if(next.length > 0){
					location.href = next;
				}else{
					location.href = returnMessage["redir"];
				}
				jQuery("#username").val("").next("label").removeClass("checked");
				jQuery("#pass").val("").next("label").removeClass("checked");
				jQuery("#pass2").val("").next("label").removeClass("checked");
				jQuery("#email").val("").next("label").removeClass("checked");
				
				jQuery("#btn_register").removeAttr("disabled");
			}else{
				jQuery("#registerInfo").html("").html(returnMessage["message"]).addClass("required");
			}
			jQuery("#btn_register").removeAttr("disabled");
		},
		error : function(xhr, ajaxOptions, error) {
			// alert(error);
		}
	});
}
