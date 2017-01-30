

import com.ruanku.lightnote.dao.UserDao;
import com.ruanku.lightnote.pojo.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;


import java.util.List;

/**
 * Created by GZR on 2016/11/14.
 * configure spring integration junit,load springIoc when junit start
 */
@RunWith(SpringJUnit4ClassRunner.class)
//tell junit the spring configure file
@ContextConfiguration({"classpath:spring-mybatis/spring-mybatis.xml"})
public class UserDaoTest {

    //rejection Dao class depend
    @Resource
    private UserDao userDao;



    @Test
    public void queryById() throws Exception {
        int id=1;
       User user=userDao.findByID(id);
        System.out.println(user.getUsername());
    }

    @Test
    public void getAll() throws Exception {
        List<User> UserList=userDao.findAll();
        for(User user:UserList){
            System.out.println(user);
        }
    }

 

}