



        function $(id){
            return document.getElementById(id)
        }
        function clear_msg(){
            set_msg('');
        }
        function set_msg(msg){
            $("tipmsg").innerHTML = msg;
        }
        function check_form(){
            clear_msg();
            var username = $('username').value,
                password = $('password').value,
                password2 = $('password2').value,
                email    = $('email').value;
            if(!/^[a-zA-Z]/.test(username)){
                set_msg("请输入用户名，并以字母开头");
                return false;
            }
            
            if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)){
                set_msg("邮箱为空或格式不正确");
                return false;
            }
            if(password.length == 0){
                set_msg("请输入密码");
                return false;
            }
            if(password!=password2){
                set_msg("两次密码不一致，请修改");
                return false;
            }
            
            
 
            
            return true;//防止表单提交，如果后台有接口改为return true; 就可以提交表单了
        }
