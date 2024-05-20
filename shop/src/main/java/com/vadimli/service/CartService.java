package com.vadimli.service;

import com.vadimli.domain.Cart;

public interface CartService {

    boolean updateCount(Cart cart);

    boolean saveCart(Cart cart);

    boolean removeCartById(Integer cartId);
}
