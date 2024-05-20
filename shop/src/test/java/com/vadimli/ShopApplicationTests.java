package com.vadimli;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vadimli.domain.Cart;
import com.vadimli.domain.Item;
import com.vadimli.domain.ItemCat;
import com.vadimli.domain.User;
import com.vadimli.mapper.ItemCatMapper;
import com.vadimli.mapper.ItemMapper;
import com.vadimli.service.CartService;
import com.vadimli.service.ItemCatService;
import com.vadimli.service.ItemService;
import com.vadimli.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootTest
class ShopApplicationTests {
    @Autowired
    private ItemCatService itemCatService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private UserService userService;
    @Autowired
    private ItemMapper itemMapper;
    @Autowired
    private CartService cartService;

    @Test
    void contextLoads() {
    }

    @Test
    public void catList() {
        List<ItemCat> itemCats = itemCatService.selectAllByStatus(1);
        System.out.println(itemCats);
    }

    @Test
    public void testLogin() {
        User user = userService.loginUser("wc001", "888888");
        System.out.println(user);
    }

    @Test
    public void testInsertUser() {
        User user = new User();
        user.setUsername("qwe");
        user.setPassword("123456");
        user.setName("小黑");
        user.setEmail("123@qq.com");
        user.setTelephone("15112345678");
        boolean b = userService.insertUser(user);
        System.out.println(b);
    }

    @Test
    public void testSelectAllByCid() {
        List<Item> items = itemService.selectByCid(1);
        System.out.println(items);
    }

    //测试分页插件的使用
    @Test
    public void testPageHelp() {
        //设置起始页 和页码大小
        PageHelper.startPage(1, 6);
        //获取所有商品
        List<Item> items = itemMapper.selectAll();
        //获取分页信息对象
        PageInfo<Item> pageInfo = new PageInfo<>(items);
        //获取总的数据条数
        System.out.println("总的数据条数：" + pageInfo.getTotal());
        //获取总页数
        System.out.println("总页数" + pageInfo.getPages());
        System.out.println("上一页" + pageInfo.getPrePage());
        System.out.println("当前页" + pageInfo.getPageNum());
        System.out.println("下一页" + pageInfo.getNextPage());
        //数字导航
        System.out.println(Arrays.toString(pageInfo.getNavigatepageNums()));
        //获取当前页的数据
        List<Item> pageList = pageInfo.getList();
        System.out.println(pageList);
    }

    @Test
    public void testGetItemByLike(){
        List<Item> item = itemMapper.getItemByLike("妲己");
        System.out.println(item);
    }

    @Test
    public void testGetItemByUser(){
        List<Item> itemByUser = itemMapper.getItemByUser(1);
        System.out.println(itemByUser);
    }

    @Test
    public void testUpdateCount(){
        Cart cart = new Cart();
        cart.setCartId(3);
        cart.setCount(3);
        boolean b = cartService.updateCount(cart);
        System.out.println(b);
    }

    @Test
    public void testInsertItem() {
        Item item = new Item();
        item.setName("qwe");
        item.setMarketPrice(123.0);
        item.setShopPrice(123.0);
        item.setNum(12);
        item.setImage("item123.jpg");
        item.setIdesc("desc123.jpg");
        item.setIflag((byte) 1);
        item.setStatus((byte) 1);
        Date date = new Date();
        item.setCreateTime(date);
        item.setUpdateTime(date);
        item.setCid(1);
        boolean b = itemService.insertItem(item);
        System.out.println(b);
    }

    @Test
    public void testUpdateItem() {
        Item item = new Item();
        item.setId(38);
        item.setName("zxc");
        item.setMarketPrice(12.0);
        item.setShopPrice(12.0);
        item.setNum(12);
        item.setImage("item125.jpg");
        item.setIdesc("desc125.jpg");
        item.setIflag((byte) 1);
        item.setStatus((byte) 1);
        Date date = new Date();
//        item.setCreateTime(date);
        item.setUpdateTime(date);
        item.setCid(1);
        boolean b = itemService.insertItem(item);
        System.out.println(b);
    }
}
