package com.vadimli.service.impl;

import com.vadimli.domain.Cart;
import com.vadimli.mapper.CartMapper;
import com.vadimli.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartMapper cartMapper;

    @Override
    public boolean updateCount(Cart cart) {
        int i = cartMapper.updateCount(cart);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean saveCart(Cart cart) {
        int i = cartMapper.saveCart(cart);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean removeCartById(Integer cartId) {
        int i = cartMapper.removeCartById(cartId);
        if(i>0){
            return true;
        }
        return false;
    }
}
