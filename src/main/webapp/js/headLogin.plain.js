$(document).ready(function(){
	if( $.cookie('un') == null ) {		 
		$.cookie('un',$("#username").val(),{expires:7,path:'/' });
	}else{
		if(!$("#username").val()){
			$("#username").val($.cookie('un'));
		}
	}
	var loginForm = document.getElementById('form_login');
	if(loginForm){
		loginForm.onkeydown = function(e){
			if(!e) e = window.event;
			if((e.keyCode || e.which) == 13){
				loginForm.submit();
			}
		}
	}
	$("#loginBT").click(function(){
			$.cookie('un',$("#username").val());
			$.ajax({
			type:"POST",
			url:"/alogin",
			dataType:"json",
			data:{"username":$("#username").val(),"password":$("#password").val()}
		}).done(function(data){
			if(data.result=="ok"){
				window.location="/home";
			}else{
				alert(data.message);
				window.location="/login";
			}
		});
	});
});

