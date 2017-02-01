package com.ruanku.lightnote.service;

import com.ruanku.lightnote.pojo.User;

public interface UserService {
    // 通过用户名及密码核查用户登录
    public User checkLogin(String username, String password);
}