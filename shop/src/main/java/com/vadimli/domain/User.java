package com.vadimli.domain;

import lombok.Data;

@Data
public class User {
    private Integer uid;

    private String username;

    private String password;

    private String name;

    private String email;

    private String telephone;

    private Integer role;
}