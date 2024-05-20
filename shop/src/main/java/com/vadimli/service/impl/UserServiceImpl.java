package com.vadimli.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vadimli.domain.Item;
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
        return userMapper.selectAll();
    }

    @Override
    public boolean deleteByPrimaryKey(Integer uid) {
        int i = userMapper.deleteByPrimaryKey(uid);
        if(i>0){
            return true;
        }
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
    public boolean updateByPrimaryKey(User user) {
        int i = userMapper.updateByPrimaryKey(user);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public User loginUser(String username, String password) {
        User user = userMapper.loginUser(username, password);
        return user;
    }

    @Override
    public PageInfo<User> selectPage(int pageNum, int pageSize) {
        //开启分页 设置 第几页 和页码大小
        PageHelper.startPage(pageNum,pageSize);
        //得到要分页的数据
        List<User> users = userMapper.selectAll();
        //根据分页数据创建分页信息对象
        PageInfo<User> pageInfo = new PageInfo<>(users);
        //返回分页信息对象
        return pageInfo;
    }

    @Override
    public PageInfo<User> getUserByLike(String mohu, int pageNum, int pageSize) {
        //开启分页 设置 第几页 和页码大小
        PageHelper.startPage(pageNum,pageSize);
        //得到要分页的数据
        List<User> userByLike = userMapper.getUserByLike(mohu);
        //根据分页数据创建分页信息对象
        PageInfo<User> pageInfo = new PageInfo<>(userByLike);
        return pageInfo;
    }
}
