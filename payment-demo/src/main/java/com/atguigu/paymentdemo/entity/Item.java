package com.atguigu.paymentdemo.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.models.auth.In;
import lombok.Data;

import java.util.Date;

@Data
@TableName("item")
public class Item extends BaseEntity{

    private String name;

    private Integer marketPrice;

    private Integer shopPrice;

    private Integer num;

    private String image;

    private String idesc;

    private Byte iflag;

    private Byte status;

    private Date createTime;

    private Date updateTime;

    private Integer cid;


}
