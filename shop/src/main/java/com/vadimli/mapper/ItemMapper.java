package com.vadimli.mapper;

import com.vadimli.domain.Item;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ItemMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Item record);

    Item selectByPrimaryKey(Integer id);

    List<Item> selectAll();

    int updateByPrimaryKey(Item record);

    //查询热门 优惠商品
    List<Item> selectByIflag(int iflag);

    /*根据cid 查询 各类型商品*/
    List<Item> selectByCid(int cid);

    //根据商品名来模糊查询
    List<Item> getItemByLike(@Param("mohu") String mohu);

    //根据用户id查询商品
    List<Item> getItemByUser(int uid);
}
