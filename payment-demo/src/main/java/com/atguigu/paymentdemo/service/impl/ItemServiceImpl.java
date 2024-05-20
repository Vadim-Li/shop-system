package com.atguigu.paymentdemo.service.impl;

import com.atguigu.paymentdemo.entity.Item;
import com.atguigu.paymentdemo.mapper.ItemMapper;
import com.atguigu.paymentdemo.service.ItemService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl extends ServiceImpl<ItemMapper, Item> implements ItemService {
    @Autowired
    private ItemMapper itemMapper;
    @Override
    public List<Item> selectAll() {
        return itemMapper.selectAll();
    }
}
