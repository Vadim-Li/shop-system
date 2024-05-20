package com.vadimli.controller;

import com.github.pagehelper.PageInfo;
import com.vadimli.common.Result;
import com.vadimli.domain.Cart;
import com.vadimli.domain.User;
import com.vadimli.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @PutMapping("/cart/updateCount")
    public Result updateOwner(@RequestBody Cart cart){
        return cartService.updateCount(cart) ? Result.suc():Result.fail();
    }

    @PostMapping("/cart/saveCart")
    public Result saveCart(@RequestBody Cart cart){
        return cartService.saveCart(cart) ? Result.suc():Result.fail();
    }

    @DeleteMapping("/cart/delete/{cartId}")
    public Result deleteOwnerById(@PathVariable("cartId") Integer cartId){
        return cartService.removeCartById(cartId) ? Result.suc():Result.fail();
    }

}
