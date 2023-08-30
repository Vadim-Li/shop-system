package com.vadimli.domain;

import lombok.Data;

@Data
public class OrderItem {
    private String itemid;

    private Integer count;

    private Double subtotal;

    private Integer id;

    private String oid;

}