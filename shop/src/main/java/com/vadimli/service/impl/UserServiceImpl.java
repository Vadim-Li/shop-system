package com.vadimli.service.impl;

import com.vadimli.domain.User;
import com.vadimli.mapper.UserMapper;
import com.vadimli.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectByPrimaryKey(Integer uid) {
        return null;
    }

    @Override
    public List<User> selectAll() {
        return null;
    }

    @Override
    public boolean deleteByPrimaryKey(Integer uid) {
        return false;
    }

    @Override
    public boolean insertUser(User record) {
        int i = userMapper.insertUser(record);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean updateByPrimaryKey(User record) {
        return false;
    }

    @Override
    public User loginUser(String username, String password) {
        User user = userMapper.loginUser(username, password);
        return user;
    }
}
