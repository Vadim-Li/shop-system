package com.vadimli.controller;

import com.github.pagehelper.PageInfo;
import com.vadimli.common.Result;
import com.vadimli.domain.ItemCat;
import com.vadimli.domain.User;
import com.vadimli.mapper.ItemCatMapper;
import com.vadimli.service.ItemCatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ItemCatController {
    @Autowired
    private ItemCatService itemCatService;

    @GetMapping("/catList/{status}")
    public List<ItemCat>  catList(@PathVariable int status){
        List<ItemCat> itemCats = itemCatService.selectAllByStatus(status);
        return  itemCats;
    }

    @GetMapping("/itemCat/{cid}")
    public ItemCat getItemCatById(@PathVariable("cid") Integer cid){
        ItemCat itemCat = itemCatService.selectByPrimaryKey(cid);
        return itemCat;
    }

    @GetMapping("/itemCat/list/{pageNum}")
    public PageInfo<ItemCat> listByPage(@PathVariable int pageNum ) {
        //得到分页信息对象
        PageInfo<ItemCat> pageinfo = itemCatService.selectPage(pageNum, 5);
        return pageinfo;
    }

    @PostMapping("/itemCat/getItemCatByLike/{pageNum}")
    public PageInfo<ItemCat> getItemCatByLike(@RequestBody Map<String,String> requestBody, @PathVariable int pageNum){
        String name = requestBody.get("name");
        //得到分页信息对象
        PageInfo<ItemCat> pageinfo = itemCatService.getItemCatByLike(name, pageNum, 5);
        return pageinfo;
    }

    @PostMapping("/itemCat/save")
    public Result insertItemCat(@RequestBody ItemCat itemCat){
        return itemCatService.insertItemCat(itemCat) ? Result.suc():Result.fail();
    }

    @PutMapping("/itemCat/update")
    public Result updateItemCat(@RequestBody ItemCat itemCat){
        return itemCatService.updateByPrimaryKey(itemCat) ? Result.suc():Result.fail();
    }

    @DeleteMapping("/itemCat/delete/{itemCatId}")
    public Result deleteItemCatById(@PathVariable("itemCatId") Integer itemCatId){
        return itemCatService.deleteByPrimaryKey(itemCatId) ? Result.suc():Result.fail();
    }
}
