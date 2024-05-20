package com.vadimli.service;

import com.github.pagehelper.PageInfo;
import com.vadimli.domain.Item;
import com.vadimli.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserService {
    User selectByPrimaryKey(Integer uid);

    List<User> selectAll();

    boolean deleteByPrimaryKey(Integer uid);

    boolean insertUser(User record);

    boolean updateByPrimaryKey(User user);

    User loginUser(String username,String password);

    PageInfo<User> selectPage( int pageNum, int pageSize);

    PageInfo<User> getUserByLike(@Param("mohu") String mohu, int pageNum, int pageSize);
}
