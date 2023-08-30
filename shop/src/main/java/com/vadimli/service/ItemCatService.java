package com.vadimli.service;

import com.vadimli.domain.ItemCat;

import java.util.List;

public interface ItemCatService {
    int deleteByPrimaryKey(Integer cid);

    int insert(ItemCat record);

    ItemCat selectByPrimaryKey(Integer cid);

    List<ItemCat> selectAll();

    int updateByPrimaryKey(ItemCat record);
    //根据状态查询分类
    List<ItemCat> selectAllByStatus(int status);

}
