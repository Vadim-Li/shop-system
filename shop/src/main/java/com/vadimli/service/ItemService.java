package com.vadimli.service;

import com.github.pagehelper.PageInfo;
import com.vadimli.domain.Item;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ItemService {
    int deleteByPrimaryKey(Integer id);

    int insert(Item record);

    Item selectByPrimaryKey(Integer id);

    List<Item> selectAll();

    int updateByPrimaryKey(Item record);

    //根据iflag 查询 热门 和优惠商品
    List<Item> selectByIflag(int iflag);

    /*根据cid 查询 各类型商品*/
    List<Item> selectByCid(int cid);

    PageInfo<Item> selectPageByCid(int cid, int pageNum, int pageSize);

    PageInfo<Item> getItemByLike(@Param("mohu") String mohu, int pageNum, int pageSize);

    List<Item> getItemByUser(int uid);
}
