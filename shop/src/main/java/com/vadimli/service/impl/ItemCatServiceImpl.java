package com.vadimli.service.impl;

import com.vadimli.domain.ItemCat;
import com.vadimli.mapper.ItemCatMapper;
import com.vadimli.service.ItemCatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItemCatServiceImpl implements ItemCatService {
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private ItemCatMapper itemCatMapper;

    @Override
    public int deleteByPrimaryKey(Integer cid) {
        return 0;
    }

    @Override
    public int insert(ItemCat record) {
        return 0;
    }

    @Override
    public ItemCat selectByPrimaryKey(Integer cid) {
        return itemCatMapper.selectByPrimaryKey(cid);
    }

    @Override
    public List<ItemCat> selectAll() {
        return null;
    }

    @Override
    public int updateByPrimaryKey(ItemCat record) {
        return 0;
    }

    @Override
    public List<ItemCat> selectAllByStatus(int status) {
        /*List<ItemCat> itemCats = null;
        try {
            //先根据key从redis缓存中取出 分类的集合
            List redisList = redisTemplate.opsForList().range("itemCats", 0, -1);
            if (redisList==null||redisList.size()==0){
                //说明没有缓存 先从数据库中取出分类集合
                itemCats = itemCatMapper.selectAllByStatus(status);
                //然后将该集合缓存到redis中
                redisTemplate.opsForList().leftPush("itemCats",itemCats);
            }else {
                //如果不为空
                itemCats = (List<ItemCat>) redisList.get(0);
            }
        }catch (Exception e){
            //如果redis服务器 出现问题 需要 再次从数据库中查询分类集合
            itemCats = itemCatMapper.selectAllByStatus(status);
            e.printStackTrace();
            //throw new RuntimeException("redis服务器炸了");
        }*/
        List<ItemCat> itemCats = itemCatMapper.selectAllByStatus(status);
        return itemCats;
    }


}
