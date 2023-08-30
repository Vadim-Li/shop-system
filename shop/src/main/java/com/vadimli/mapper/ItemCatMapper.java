package com.vadimli.mapper;

import com.vadimli.domain.ItemCat;

import java.util.List;

public interface ItemCatMapper {
    int deleteByPrimaryKey(Integer cid);

    int insert(ItemCat record);

    ItemCat selectByPrimaryKey(Integer cid);

    List<ItemCat> selectAll();

    int updateByPrimaryKey(ItemCat record);

    //根据状态查询分类
    List<ItemCat> selectAllByStatus(int status);

}
