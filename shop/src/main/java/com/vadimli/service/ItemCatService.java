package com.vadimli.service;

import com.github.pagehelper.PageInfo;
import com.vadimli.domain.ItemCat;
import com.vadimli.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ItemCatService {

    boolean deleteByPrimaryKey(Integer uid);

    boolean insertItemCat(ItemCat itemCat);

    ItemCat selectByPrimaryKey(Integer cid);

    List<ItemCat> selectAll();

    boolean updateByPrimaryKey(ItemCat itemCat);
    //根据状态查询分类
    List<ItemCat> selectAllByStatus(int status);

    PageInfo<ItemCat> selectPage(int pageNum, int pageSize);

    PageInfo<ItemCat> getItemCatByLike(@Param("mohu") String mohu, int pageNum, int pageSize);

}
