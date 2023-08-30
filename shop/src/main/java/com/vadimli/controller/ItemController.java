package com.vadimli.controller;

import com.github.pagehelper.PageInfo;
import com.vadimli.domain.Item;
import com.vadimli.domain.ItemCat;
import com.vadimli.service.ItemCatService;
import com.vadimli.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ItemController {
    @Autowired
    private ItemService itemService;
    @Autowired
    private ItemCatService itemCatService;

    @GetMapping("/item/category/{cid}")
    public List<Item> itemList(@PathVariable int cid){
        List<Item> items = itemService.selectByCid(cid);
        return items;
    }

    //分类查看商品
    @GetMapping("/item/{cid}/{pageNum}")
    public PageInfo<Item> selectByCid(@PathVariable int cid , @PathVariable int pageNum ) {
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.selectPageByCid(cid, pageNum, 8);
        return pageinfo;
    }

    //商品详情显示
    @GetMapping("/item/{id}")
    public Item selectByPrimaryKey(@PathVariable int id) {
        //根据商品id查询商品
        Item item = itemService.selectByPrimaryKey(id);
        return item;
    }

    @PostMapping("/item/getItemByLike/{pageNum}")
    public PageInfo<Item> getItemByLike(@RequestBody Map<String,String> requestBody, @PathVariable int pageNum){
        String name = requestBody.get("name");
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.getItemByLike(name, pageNum, 8);
//        List<Item> itemByLike = itemService.getItemByLike(name);
        return pageinfo;
    }

    @GetMapping("/item/getItemByUser/{uid}")
    public List<Item> getItemByUser(@PathVariable int uid){
        List<Item> itemByUser = itemService.getItemByUser(uid);
        return itemByUser;
    }
}
