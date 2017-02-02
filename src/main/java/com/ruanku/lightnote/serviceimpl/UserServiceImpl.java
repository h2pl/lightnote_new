package com.ruanku.lightnote.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ruanku.lightnote.dao.UserDao;
import com.ruanku.lightnote.pojo.User;
import com.ruanku.lightnote.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userDao;

    /* 登陆验证 */
    public User checkLogin(String username, String password) {
        //根据用户名实例化用户对象
        User user = userDao.findUserByName(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

	public boolean checkRegisterUsername(String username) {
		// TODO Auto-generated method stub
		User user = userDao.findUserByName(username);
        if (user != null) {
            return false;
        }
        
		return true;
	}
	
	public boolean checkRegisterEmail(String email) {
		// TODO Auto-generated method stub
		List<User> userlist=userDao.findAll();
        for (User user2 : userlist) {
			if(user2.getEmail().equals(email)){
				return false;
			}
			
		}
        return true;
}
	}