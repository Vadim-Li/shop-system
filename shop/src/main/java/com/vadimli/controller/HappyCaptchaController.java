package com.vadimli.controller;

import com.ramostear.captcha.HappyCaptcha;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//显示验证码的
@RestController
public class HappyCaptchaController {
    //显示验证码的方法
    @GetMapping("/captcha")
    public void captcha(HttpServletRequest request, HttpServletResponse response) {
//        HappyCaptcha.require(request, response).build().finish();
    }
}
