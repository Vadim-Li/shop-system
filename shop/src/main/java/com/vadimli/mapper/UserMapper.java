package com.vadimli.mapper;

import com.vadimli.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {

    int deleteByPrimaryKey(Integer uid);

    int insertUser(User record);

    User selectByPrimaryKey(Integer uid);

    List<User> selectAll();

    int updateByPrimaryKey(User record);

    //用户登录方法
    User loginUser(@Param("username") String username, @Param("password") String password);
}
