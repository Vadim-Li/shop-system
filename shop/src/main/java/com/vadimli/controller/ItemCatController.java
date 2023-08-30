package com.vadimli.controller;

import com.vadimli.domain.ItemCat;
import com.vadimli.mapper.ItemCatMapper;
import com.vadimli.service.ItemCatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
