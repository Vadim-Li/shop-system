package com.atguigu.paymentdemo.mapper;

import com.atguigu.paymentdemo.entity.OrderInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

public interface OrderInfoMapper extends BaseMapper<OrderInfo> {
    //根据用户id查询商品
    List<OrderInfo> getOrderInfoByUser(Long uid);

    int removeOrderInfoById(Long orderId);

}
