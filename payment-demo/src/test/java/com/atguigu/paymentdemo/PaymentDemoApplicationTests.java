package com.atguigu.paymentdemo;

import com.atguigu.paymentdemo.config.WxPayConfig;
import com.atguigu.paymentdemo.entity.OrderInfo;
import com.atguigu.paymentdemo.mapper.OrderInfoMapper;
import com.atguigu.paymentdemo.service.OrderInfoService;
import com.atguigu.paymentdemo.service.WxPayService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.security.PrivateKey;
import java.util.List;
import java.util.Map;

@SpringBootTest
class PaymentDemoApplicationTests {

    @Resource
    private WxPayConfig wxPayConfig;
    @Resource
    private OrderInfoService orderInfoService;
    @Resource
    private WxPayService wxPayService;
    @Resource
    private OrderInfoMapper orderInfoMapper;

//    @Test
//    void testGetPrivateKey() {
//        //获取私钥路径
//        String privateKeyPath = wxPayConfig.getPrivateKeyPath();
//        //获取私钥
//        PrivateKey privateKey = wxPayConfig.getPrivateKey(privateKeyPath);
//        System.out.println(privateKey);
//    }

//    @Test
//    void testCreateOrderByProductId(){
//        OrderInfo orderByProduct = orderInfoService.createOrderByProductId(1L,2L);
//        System.out.println(orderByProduct);
//    }

    @Test
    void testNativePay(){
        try {
            Map<String, Object> stringObjectMap = wxPayService.nativePay(5L,2L);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void testGetOrderInfoByUser(){
        List<OrderInfo> orderInfoByUser = orderInfoService.getOrderInfoByUser(1L);
//        List<OrderInfo> orderInfoByUser = orderInfoMapper.getOrderInfoByUser(1L);
        System.out.println(orderInfoByUser);
    }

}
