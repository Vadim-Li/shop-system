package com.vadimli.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Orders {
    private String oid;

    private Date ordertime;

    private Double total;

    private Integer state;

    private String address;

    private String name;

    private String telephone;

    private Integer uid;
}