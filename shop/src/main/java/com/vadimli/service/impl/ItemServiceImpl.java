package com.vadimli.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vadimli.domain.Item;
import com.vadimli.mapper.ItemMapper;
import com.vadimli.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemMapper itemMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return 0;
    }

    @Override
    public int insert(Item record) {
        return 0;
    }

    @Override
    public Item selectByPrimaryKey(Integer id) {
        return itemMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Item> selectAll() {
        return null;
    }

    @Override
    public int updateByPrimaryKey(Item record) {
        return 0;
    }

    @Override
    public List<Item> selectByIflag(int iflag){

        return itemMapper.selectByIflag(iflag);
    }

    @Override
    public List<Item> selectByCid(int cid) {
        return itemMapper.selectByCid(cid);
    }

    //根据分类id分页查询商品信息
    /**
     *
     * @param cid 商品分类id
     * @param pageNum 第几页
     * @param pageSize 页码大小
     * @return 分页信息对象
     */
    @Override
    public PageInfo<Item> selectPageByCid(int cid, int pageNum, int pageSize) {
        //开启分页 设置 第几页 和页码大小
        PageHelper.startPage(pageNum,pageSize);
        //得到要分页的数据
        List<Item> items = itemMapper.selectByCid(cid);
        //根据分页数据创建分页信息对象
        PageInfo<Item> pageInfo = new PageInfo<>(items);
        //返回分页信息对象
        return pageInfo;
    }

    @Override
    public PageInfo<Item> getItemByLike(String mohu, int pageNum, int pageSize) {
        //开启分页 设置 第几页 和页码大小
        PageHelper.startPage(pageNum,pageSize);
        //得到要分页的数据
        List<Item> itemByLike = itemMapper.getItemByLike(mohu);
        //根据分页数据创建分页信息对象
        PageInfo<Item> pageInfo = new PageInfo<>(itemByLike);
        return pageInfo;
    }

    @Override
    public List<Item> getItemByUser(int uid) {
        List<Item> itemByUser = itemMapper.getItemByUser(uid);
        return itemByUser;
    }
}
