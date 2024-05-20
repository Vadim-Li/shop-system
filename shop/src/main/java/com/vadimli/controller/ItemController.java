package com.vadimli.controller;

import com.github.pagehelper.PageInfo;
import com.vadimli.common.Result;
import com.vadimli.domain.Item;
import com.vadimli.domain.ItemCat;
import com.vadimli.domain.User;
import com.vadimli.service.ItemCatService;
import com.vadimli.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService itemService;
    @Autowired
    private ItemCatService itemCatService;

    @GetMapping("/category/{cid}")
    public List<Item> itemList(@PathVariable int cid) {
        List<Item> items = itemService.selectByCid(cid);
        return items;
    }

    //分页查看商品
    @GetMapping("/{cid}/{pageNum}")
    public PageInfo<Item> selectByCid(@PathVariable int cid, @PathVariable int pageNum) {
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.selectPageByCid(cid, pageNum, 8);
        return pageinfo;
    }

    //商品详情显示
    @GetMapping("/{id}")
    public Item selectByPrimaryKey(@PathVariable int id) {
        //根据商品id查询商品
        Item item = itemService.selectByPrimaryKey(id);
        return item;
    }

    @PostMapping("/getItemByLike/{pageNum}")
    public PageInfo<Item> getItemByLike(@RequestBody Map<String, String> requestBody, @PathVariable int pageNum) {
        String name = requestBody.get("name");
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.getItemByLike(name, pageNum, 8);
//        List<Item> itemByLike = itemService.getItemByLike(name);
        return pageinfo;
    }
    @PostMapping("/getItemByUserByLike/{uid}/{role}/{pageNum}")
    public PageInfo<Item> getItemByUserByLike(@RequestBody Map<String, String> requestBody, @PathVariable int uid, @PathVariable int role, @PathVariable int pageNum) {
        String name = requestBody.get("name");
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.getItemByUserByLike(name, uid, role, pageNum, 8);
//        List<Item> itemByLike = itemService.getItemByLike(name);
        return pageinfo;
    }

    @GetMapping("/getItemByUser/{uid}")
    public List<Item> getItemByUser(@PathVariable int uid) {
        List<Item> itemByUser = itemService.getItemByUser(uid);
        return itemByUser;
    }

    @GetMapping("/getAllItem")
    public List<Item> selectAll(){
        return itemService.selectAll();
    }

    @GetMapping("/list/{pageNum}")
    public PageInfo<Item> listByPage(@PathVariable int pageNum) {
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.selectPage(pageNum, 8);
        return pageinfo;
    }

    @GetMapping("/list/{uid}/{pageNum}")
    public PageInfo<Item> listByUserPage(@PathVariable int uid, @PathVariable int pageNum) {
        //得到分页信息对象
        PageInfo<Item> pageinfo = itemService.selectPageByUid(uid, pageNum, 8);
        return pageinfo;
    }

    @DeleteMapping("/delete/{itemId}")
    public Result deleteItemById(@PathVariable("itemId") Integer itemId) {
        return itemService.deleteByPrimaryKey(itemId) ? Result.suc() : Result.fail();
    }

    @PostMapping("/save")
    public Result insertItem(@RequestBody Item item) {
        return itemService.insertItem(item) ? Result.suc() : Result.fail();
    }

    @PutMapping("/update")
    public Result updateItem(@RequestBody Item item) {
        return itemService.updateByPrimaryKey(item) ? Result.suc() : Result.fail();
    }
}
