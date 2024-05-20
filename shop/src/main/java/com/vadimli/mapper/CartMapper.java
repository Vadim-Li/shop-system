package com.vadimli.mapper;

import com.vadimli.domain.Cart;

public interface CartMapper {

    int updateCount(Cart cart);

    int saveCart(Cart cart);

    int removeCartById(Integer cartId);
}
