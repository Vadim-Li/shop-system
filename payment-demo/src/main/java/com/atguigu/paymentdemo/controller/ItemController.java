package com.atguigu.paymentdemo.controller;

import com.atguigu.paymentdemo.entity.Item;
import com.atguigu.paymentdemo.service.ItemService;
import com.atguigu.paymentdemo.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@CrossOrigin //开放前端的跨域访问
@Api(tags = "商品管理")
@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Resource
    private ItemService itemService;

    @ApiOperation("测试接口")
    @GetMapping("/test")
    public R test(){

        return R.ok().data("message", "hello").data("now", new Date());
    }

    @ApiOperation("商品列表")
    @GetMapping("/list")
    public R list(){

        List<Item> list =  itemService.selectAll();
        return R.ok().data("itemList", list);
    }

}