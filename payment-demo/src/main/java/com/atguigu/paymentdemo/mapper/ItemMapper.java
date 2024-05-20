package com.atguigu.paymentdemo.mapper;

import com.atguigu.paymentdemo.entity.Item;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

public interface ItemMapper extends BaseMapper<Item> {
    List<Item> selectAll();
}
