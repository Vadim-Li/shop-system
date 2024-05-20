package com.vadimli;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.web.servlet.ServletComponentScan;

@MapperScan(basePackages = "com.vadimli.mapper")
@SpringBootApplication
//@ServletComponentScan("com.vadimli.controller.HappyCaptchaController")
public class ShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }

}
