package com.atguigu.paymentdemo.service;

import com.atguigu.paymentdemo.entity.Item;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface ItemService extends IService<Item> {
    List<Item> selectAll();
}
