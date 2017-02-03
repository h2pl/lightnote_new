package com.ruanku.lightnote.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.apache.ibatis.annotations.Param;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ruanku.lightnote.pojo.User;
import com.ruanku.lightnote.service.UserService;

@Controller
@Scope("prototype")
@RequestMapping("/user")
public class UserController {
	
	    @Resource
	    private UserService userService;

	    
	    
	    @RequestMapping(value="/login")
	    public String login(@Param("username") String username,@Param("password") String password,HttpServletRequest request) {
	       User user=userService.checkLogin(username, password);
	        if(user!=null){
	        	HttpSession session=request.getSession();
	            session.setAttribute("user",user);
	            session.setAttribute("username",username);
	            return "redirect:/user/home";// 路径 WEB-INF/pages/welcome.jsp            
	        }
	        request.setAttribute("error", "用户名或密码错误");
	       
	        
	        return "error";
	    }
	    
	    @RequestMapping(value="/logout")
	    public String logout(HttpServletRequest request)
	    {
	        HttpSession session=request.getSession();
	        session.removeAttribute("user");
	        session.removeAttribute("username");
	    	return "home";
	    }
	   
	    
	    @RequestMapping("registerpage")
	    public String registerpage() {
	      return "register";
	    }
	    
	    @RequestMapping("home")
	    public String home() {
	      return "home";
	    }
	    
	    @RequestMapping("register")
	    public String register(@Param("username") String username,
	    		@Param("password") String password,
	    		@Param("email") String email,
	    		HttpServletRequest requsest) {
	      
	      if(!userService.checkRegisterUsername(username)){
	    	  requsest.getSession().setAttribute("error", "用户名重复");
	    	  return "error";
	      }
	      
//	      if(!userService.checkRegisterEmail(email)){
//	    	  requsest.getSession().setAttribute("error", "邮箱重复");
//	    	  return "error";
//	      }
	      if(userService.checkRegisterUsername(username))
    	  {
    	  User newuser=new User();
    	  newuser.setUsername(username);
    	  newuser.setPassword(password);
    	  newuser.setEmail(email);
    	  userService.addUser(newuser);
    	  
    	  requsest.getSession().setAttribute("user", newuser);
    	  
    	  
    	  }
	      return "home";
	     
	      
	    }
}
