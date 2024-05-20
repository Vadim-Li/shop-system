package com.vadimli.controller;

import com.vadimli.domain.Item;
import com.vadimli.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IndexController {

    @Autowired
    private ItemService itemService;

    //显示首页方法
    @GetMapping("/hotItems")
    public List<Item> indexRm(){
        List<Item> hotItems = itemService.selectByIflag(1);//热门商品
        return hotItems;
    }
    @GetMapping("/discountedItems")
    public List<Item> indexYh(){
        List<Item> discountedItems = itemService.selectByIflag(2);//优惠商品
        return discountedItems;
    }

}
