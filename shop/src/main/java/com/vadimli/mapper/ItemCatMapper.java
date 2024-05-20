package com.vadimli.mapper;

import com.vadimli.domain.ItemCat;
import com.vadimli.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ItemCatMapper {
    int deleteByPrimaryKey(Integer cid);

    int insertItemCat(ItemCat itemCat);

    ItemCat selectByPrimaryKey(Integer cid);

    List<ItemCat> selectAll();

    int updateByPrimaryKey(ItemCat itemCat);

    //根据状态查询分类
    List<ItemCat> selectAllByStatus(int status);

    List<ItemCat> getItemCatByLike(@Param("mohu") String mohu);

}
