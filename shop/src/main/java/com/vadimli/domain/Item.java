package com.vadimli.domain;

import lombok.Data;

import java.util.Date;
import java.util.List;

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

    private Date created;

    private Date updated;

    private Integer cid;

    private Cart cart;
}