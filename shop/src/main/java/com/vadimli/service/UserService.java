package com.vadimli.service;

import com.vadimli.domain.User;

import java.util.List;

public interface UserService {
    User selectByPrimaryKey(Integer uid);

    List<User> selectAll();

    boolean deleteByPrimaryKey(Integer uid);

    boolean insertUser(User record);

    boolean updateByPrimaryKey(User record);

    User loginUser(String username,String password);
}
