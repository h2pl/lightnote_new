package com.ruanku.lightnote.controller;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ruanku.lightnote.pojo.User;
import com.ruanku.lightnote.service.UserService;

@Controller
@Scope("prototype")
@RequestMapping("/user")
public class UserController {
	
	    @Resource
	    private UserService userService;

	    @RequestMapping(value="/login",method=RequestMethod.POST)
	    public String login(User user) {
	        user=userService.checkLogin(user.getUsername(), user.getPassword());
	        if(user!=null){
	          
	            return "home";// 路径 WEB-INF/pages/welcome.jsp            
	        }
	        return "login";
	    }
}
