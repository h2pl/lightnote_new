jQuery(function() {
	//location.hash;

	// 修改密码
	jQuery("#btn_changePassword").click(function() {
		jQuery("#btn_changePassword").next("label").html("").removeClass("required");
		// 当前密码
		if(jQuery("#oldPassword").val() == "") {
			jQuery("#oldPassword").next("label").html("请输入您当前的密码！").addClass("required");
			jQuery("#oldPassword").focus();
			return false;
		} else {
			jQuery("#oldPassword").next("label").html("").removeClass("required");
		}

		// 新密码
		var newPassword = jQuery("#newPassword").val();
		if(newPassword == "" || jQuery.trim(newPassword) == "") {
			jQuery("#newPassword").next("label").html("新密码不能为空或空格！").addClass("required");
			jQuery("#newPassword").focus();
			return false;
		} else {
			if(newPassword.length >= 1 && newPassword.length <= 20) {
				jQuery("#newPassword").next("label").html("").removeClass("required");
			} else {
				jQuery("#newPassword").next("label").html("密码长度要在1-20个字符，请确认！").addClass("required");
				jQuery("#newPassword").focus();
				return false;
			}
		}

		// 确认密码
		var confirmPassword = jQuery("#newPassword2").val()
		if(confirmPassword == "") {
			jQuery("#newPassword2").next("label").html("请再次输入您的新密码！").addClass("required");
			jQuery("#newPassword2").focus();
			return false;
		} else {
			if(confirmPassword == newPassword) {
				jQuery("#newPassword2").next("label").html("").removeClass("required");
			} else {
				jQuery("#newPassword2").next("label").html("您两次输入的密码不一致，请确认！").addClass("required");
				jQuery("#newPassword2").focus();
				return false;
			}
		}
		// 异步提交修改密码
		changePassword();
	});
	
	// 修改邮箱
	jQuery("#btn_changeEmail").click(function() {
		jQuery(this).next("label").html("").removeClass("required");
		if(jQuery("#email").val() == "") {
			jQuery("#email").next("label").html("").html("请输入新邮箱！").addClass("required");
			jQuery("#email").focus();
			return false;
		} else {
			// 用户名校验的正则表达式
			var regExp = /^([a-zA-Z0-9]+([\.+_-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/;
			if(regExp.test(jQuery("#email").val())) {
				checkEmail();
			} else {
				jQuery("#email").next("label").html("抱歉，您输入的邮箱不合法，请确认！").addClass("required");
				jQuery("#email").focus();
				return false;
			}
		}
	});
	
	// 修改用户名
	jQuery("#btnChangeUserName").click(function() {
		jQuery(this).next("label").html("").removeClass("required");
		if(jQuery("#username").val() == "" || jQuery.trim(jQuery("#username").val()) == "") {
			jQuery("#username").next("label").html("").html("请输入用户名！").addClass("required");
			jQuery("#username").val("");
			jQuery("#username").focus();
			return false;
		}
		if(jQuery("#username").val().length < 2 || jQuery("#username").val().length >  50) {
			jQuery("#username").next("label").html("").html("用户名长度要在2-50个字符！").addClass("required");
			jQuery("#username").focus();
			return false;
		}
		/*var regStr = /^([a-zA-Z0-9]+([\.+_-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/;
		if(regStr.test(jQuery("#username").val())) {
			jQuery("#username").next("label").html("").html("用户名格式不正确！").addClass("required");
			jQuery("#username").focus();
			return false;
		}*/
		jQuery("#username").next("label").html("").removeClass("required");
		if(jQuery("#passwd").val() == "") {
			jQuery("#passwd").next("label").html("").html("请输入当前密码！").addClass("required");
			jQuery("#passwd").focus();
			return false;
		}
		jQuery("#passwd").next("label").html("").removeClass("required");
		checkUserName();
	});
	
	// 接收通知
	jQuery("#btn_notification").click(function() {
		var accept = 0;
		if (jQuery("#accept").attr("checked")) {
			accept = 1;
		}
		jQuery("#btn_notification").next("label").html("正在提交您的请求，请稍后...").addClass("required");
		jQuery("#btn_notification").attr("disabled", "true");
		jQuery.ajax({
			type : "post",
			url : "/notificationEmail",
			dataType : "json",
			cache : false,
			data : {
				accept : accept
			},
			success : function(data) {
				if(data["result"] == "ok") {
					jQuery("#btn_notification").next("label").html("恭喜，设置成功！").addClass("required");
				} else {
					jQuery("#btn_notification").next("label").html("抱歉，设置失败！").addClass("required");
				}
				jQuery("#btn_notification").removeAttr("disabled");
			},
			error : function(xhr, ajaxOptions, error) {
				// alert("error");
				jQuery("#btn_notification").removeAttr("disabled");
			}
		});
	});
});

function changeUserName(){
	jQuery("#btnChangeUserName").next("label").html("正在提交您的请求，请稍后...");
	jQuery("#btnChangeUserName").attr("disabled", "true");
	jQuery.ajax({
		type : "post",
		url : "/changeUserName",
		dataType : "json",
		cache : false,
		data : {
			passwd: jQuery("#passwd").val(),
			username: jQuery.trim(jQuery("#username").val())
		},
		success : function(data) {
			if(data["result"] == "ok") {
				jQuery("#btnChangeUserName").next("label").html("修改用户名成功！").addClass("required");
				location.href = "/profile";
			}else{
				jQuery("#btnChangeUserName").next("label").html(data.message).addClass("required");
			}
			jQuery("#btnChangeUserName").removeAttr("disabled");
		},
		error : function(xhr, ajaxOptions, error) {
			jQuery("#btnChangeUserName").next("label").html("网络连接可能不正常，修改邮箱失败，请注意保存您的笔记").addClass("required");
			jQuery("#btnChangeUserName").removeAttr("disabled");
		}
	});
}
function changePassword() {
	jQuery("#btn_changePassword").next("label").html("正在提交您的请求，请稍后...").addClass("required");
	jQuery("#btn_changePassword").attr("disabled", "true");
	jQuery.ajax({
		type : "post",
		url : "/changePassword",
		dataType : "json",
		cache : false,
		data : {
			oldPassword:jQuery("#oldPassword").val(),
			newPassword:jQuery("#newPassword").val(),
			newPassword2:jQuery("#newPassword2").val()
		},
		success : function(data) {
			if(data["result"] == "ok") {
				jQuery("#btn_changePassword").next("label").html("修改密码成功，请牢记您的新密码！").addClass("required");
				jQuery("#oldPassword").val("");
				jQuery("#newPassword").val("");
				jQuery("#newPassword2").val("");
			} else {
				jQuery("#btn_changePassword").next("label").html(data["message"]).addClass("required");
			}
			jQuery("#btn_changePassword").removeAttr("disabled");
		},
		error : function(xhr, ajaxOptions, error) {
			jQuery("#btn_changePassword").next("label").html("网络连接可能不正常，修改密码失败，请注意保存您的笔记").addClass("required");
			// alert("error");
			jQuery("#btn_changePassword").removeAttr("disabled");
		}
	});
}
function checkUserName() {
	jQuery.ajax({
		type : "get",
		url : "/checkId",
		cache : false,
		dataType : "json",
		data : {
			type : "username",
			name : jQuery.trim(jQuery("#username").val())
		},
		success : function(returnMessage) {
			if(returnMessage["result"] == "ok") {
				jQuery("#username").next("label").html("").removeClass("required");
				changeUserName();
			} else {
				jQuery("#username").next("label").html("抱歉，您输入的用户名已被占用，请重新输入").addClass("required");
				jQuery("#username").focus();
				return false;
			}
		},
		error : function(xhr, ajaxOptions, error) {
			jQuery("#email").next("label").html("网络连接可能不正常，修改邮箱失败，请注意保存您的笔记").addClass("required");
		}
	});
}
function checkEmail() {
	jQuery.ajax({
		type : "get",
		url : "/checkId",
		cache : false,
		dataType : "json",
		data : {
			type : "email",
			name : jQuery("#email").val()
		},
		success : function(returnMessage) {
			if(returnMessage["result"] == "ok") {
				jQuery("#email").next("label").html("").removeClass("required");
				changeEmail();
			} else {
				jQuery("#email").next("label").html("抱歉，您输入的邮箱已被占用，请重新输入").addClass("required");
				jQuery("#email").focus();
				return false;
			}
		},
		error : function(xhr, ajaxOptions, error) {
			jQuery("#email").next("label").html("网络连接可能不正常，修改邮箱失败，请注意保存您的笔记").addClass("required");
		}
	});
}

function changeEmail() {
	jQuery("#btn_changeEmail").next("label").html("正在提交您的请求，请稍后...");
	jQuery("#btn_changeEmail").attr("disabled", "true");
	jQuery.ajax({
		type : "post",
		url : "/changeEmail",
		dataType : "json",
		cache : false,
		data : {
			email : jQuery("#email").val(),
			passwd:$("#Inp_pass").val()
		},
		success : function(data) {
			if(data["result"] == "ok") {
				jQuery("#btn_changeEmail").next("label").html("修改邮箱成功，请牢记您的新邮箱！");
				location.href = "/profile";
			} else {
				jQuery("#btn_changeEmail").next("label").html("修改邮箱失败："+data.message);
			}
			jQuery("#btn_changeEmail").removeAttr("disabled");
		},
		error : function(xhr, ajaxOptions, error) {
			jQuery("#btn_changeEmail").next("label").html("网络连接可能不正常，修改邮箱失败，请注意保存您的笔记").addClass("required");
			jQuery("#btn_changeEmail").removeAttr("disabled");
		}
	});
}

$("#reEmail").click(function(){
	if($(this).attr("disabled")){
		return false;
	}
	verifyEmail();
});

function verifyEmail() {
	$("#reEmail").attr("disabled","disabled");
	$("#reEmail").html("正在发送。。。");
	jQuery.ajax({
		type: "post",
		url: "/verifyEmail",
		cache: false,
		dataType: "json",
		data:{},
		complete:function(){
			$("#reEmail").html("重新验证邮件");
			$("#reEmail").removeAttr("disabled");
		},
		success: function(data) {
			var msg = data["result"] == "ok" ? "验证邮件已发送，请按照邮件指示完成验证！" : data["message"] + "！";
			jQuery("#verifyStatus").next("span").remove();
			jQuery("#verifyStatus").html("").append("<span class='required'>"+ msg +"</span>");
		},
		error: function(xhr, ajaxOptions, error) {
			alert(error);
		}
	});
}
function unbind(ta){
	$.ajax({
		type:"get",
		url:"/unbind",
		data:{"bType":ta},
		success:function(data){
			if(data.result=="ok"){
				location.href='http://localhost/profile';
			}
		}
	});
}
