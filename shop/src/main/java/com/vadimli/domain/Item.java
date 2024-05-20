package com.vadimli.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Item {
    private Integer id;

    private String name;

    private Double marketPrice;

    private Double shopPrice;

    private Integer num;

    private String image;

    private String idesc;

    private Byte iflag;

    private Byte status;

    private Date createTime;

    private Date updateTime;

    private Integer cid;

    private Integer uid;

    private Cart cart;

    private User user;
}