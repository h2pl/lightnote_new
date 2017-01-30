package com.ruanku.lightnote.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ruanku.lightnote.pojo.User;

@Repository(value="userDao")
public interface UserDao {
	 /**
     * 此方法对应于数据库中的表 ,user
     * 新写入数据库记录
     *
     * @param record
     */
	void add(User user);
	 /**
     * 此方法对应于数据库中的表 ,user
     * 根据主键来更新符合条件的数据库记录
     *
     * @param record
     */
	void update(User user);
	 /**
     * 此方法对应于数据库中的表 ,user
     * 根据主键删除数据库的记录
     *
     * @param id
     */
	void delete(Integer id);
	
	 /**
     * 此方法对应于数据库中的表 ,user
     * 根据指定主键获取一条数据库记录
     *
     * @param id
     */
	User findByID(Integer id);
	/**
     * 此方法对应于数据库中的表 ,user
     * 查询所有数据库记录
     */
	List<User> findAll();
}
