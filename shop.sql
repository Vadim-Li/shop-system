/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.23 : Database - shop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shop` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `shop`;

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `id` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

/*Table structure for table `item` */

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `market_price` double DEFAULT NULL,
  `shop_price` double DEFAULT NULL,
  `num` int NOT NULL COMMENT '库存数量',
  `image` varchar(255) DEFAULT NULL,
  `idesc` varchar(255) DEFAULT NULL,
  `iflag` tinyint DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '商品状态，1-上架，2-下架，3-删除',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `cid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `item_cat` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `item` */

insert  into `item`(`id`,`name`,`market_price`,`shop_price`,`num`,`image`,`idesc`,`iflag`,`status`,`create_time`,`update_time`,`cid`) values (1,'传说之刃花木兰Q版手办',188,168,28,'item1.jpg','desc1.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(2,'霸王别姬虞姬Q版手办',258,238,100,'item2.jpg','desc2.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(3,'入梦系列Myethos白鹤梁神女大乔典藏手办',999,899,100,'item3.jpg','desc3.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(4,'GSC野区小霸王迷你手办套装',188,168,100,'item4.jpg','desc4.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(5,'恋之微风小乔Q版手办',188,168,70,'item5.jpg','desc5.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(6,'一生所爱露娜Q版手办',268,258,80,'item6.jpg','desc6.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(7,'王都密探李元芳Q版手办',188,168,100,'item9.jpg','desc9.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(8,'幻舞玲珑公孙离Q版手办',198,188,100,'item10.jpg','desc10.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(9,'蔷薇恋人孙尚香Q版手办',278,258,100,'item11.jpg','desc11.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(10,'王者荣耀 x 十三余 公孙离惊鸿舞华服',868,708,10,'item29.jpg','desc29.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',3),(11,'仲夏夜之梦貂蝉Q版手办',258,238,100,'item13.jpg','desc13.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(12,'大圣娶亲孙悟空Q版手办',268,258,100,'item14.jpg','desc14.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(13,'魅力之狐妲己Q版手办',188,168,100,'item15.jpg','desc15.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(14,'王者荣耀 x 十三余 貂蝉异域舞娘华服',735,635,10,'item34.jpg','desc34.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',3),(15,'千年之狐李白Q版手办',258,238,100,'item17.jpg','desc17.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(16,'王者荣耀 x 十三余 庄周玄嵩华服',798,678,10,'item28.jpg','desc28.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',3),(17,'王者语录系列T恤-主宰',169,129,10,'item27.jpg','desc27.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',3),(18,'庄周逍遥幻梦鲲抱枕-小号',88,68,10,'item35.jpg','desc35.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',4),(19,'时之彼端妲己充电宝',328,198,100,'item19.jpg','desc19.jpg',1,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',2),(20,'鲁班七号无线充电声控夜灯',298,228,100,'item20.jpg','desc20.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',2),(21,'鲁班七号快充数据线',49,35,100,'item21.jpg','desc21.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',2),(22,'妲己时之奇旅羊驼杯',119,109,20,'item22.jpg','desc22.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',5),(23,'时之彼端妲己 拼装移动电源 TYPE-DAJI',238,198,100,'item23.jpg','desc23.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',2),(24,'王者荣耀x萌趣 王者英雄萌音系列TWS蓝牙耳机-单盒',99,89,10,'item24.jpg','desc24.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',2),(25,'王者荣耀 x 十三余 瑶遇见神鹿华服',368,298,10,'item25.jpg','desc25.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',3),(26,'王者荣耀 x 十三余 大乔沧海之矅华服',389,330,10,'item26.jpg','desc26.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',3),(27,'齐天大圣孙悟空手办',98,49,100,'item18.jpg','desc18.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(28,'毛绒团团子-曜星辰之子款',39,30,10,'item30.jpg','desc30.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',4),(29,'王者荣耀X十二光年 李白青莲剑仙套装',228,198,10,'item31.jpg','desc31.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',4),(30,'王者荣耀 x 十二光年 瑶遇见神鹿套装',228,198,10,'item32.jpg','desc32.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',4),(31,'王者荣耀X十二光年 大乔沧海之曜套装',208,178,10,'item33.jpg','desc33.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',4),(32,'Molly王者荣耀梦奇手办',599,499,100,'item16.jpg','desc16.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(33,'时之羁绊 孙尚香刘备盒蛋',158,128,100,'item12.jpg','desc12.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',1),(34,'（多款可选）峡谷女英雄系列金属书签',29.9,25.9,55,'item7.jpg','desc7.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',5),(35,'（多款可选）其乐绒绒系列披肩式毛绒空调毯',168,109,100,'item8.jpg','desc8.jpg',2,1,'2023-08-04 15:34:06','2023-08-04 15:34:06',5);

/*Table structure for table `item_cat` */

DROP TABLE IF EXISTS `item_cat`;

CREATE TABLE `item_cat` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` int DEFAULT '1' COMMENT '状态。可选值:1(正常),2(删除)',
  `menuClick` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `item_cat` */

insert  into `item_cat`(`cid`,`name`,`status`,`menuClick`) values (1,'精品手办',1,'figure'),(2,'数码3C',1,'digital'),(3,'服装服饰',1,'clothing'),(4,'毛绒抱枕',1,'pillow'),(5,'生活用品',1,'daily');

/*Table structure for table `t_order_info` */

DROP TABLE IF EXISTS `t_order_info`;

CREATE TABLE `t_order_info` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `title` varchar(256) DEFAULT NULL COMMENT '订单标题',
  `order_no` varchar(50) DEFAULT NULL COMMENT '商户订单编号',
  `user_id` bigint DEFAULT NULL COMMENT '用户id',
  `product_id` bigint DEFAULT NULL COMMENT '支付产品id',
  `total_fee` int DEFAULT NULL COMMENT '订单金额(分)',
  `code_url` varchar(50) DEFAULT NULL COMMENT '订单二维码连接',
  `order_status` varchar(10) DEFAULT NULL COMMENT '订单状态',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `payment_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `t_order_info` */

/*Table structure for table `t_payment_info` */

DROP TABLE IF EXISTS `t_payment_info`;

CREATE TABLE `t_payment_info` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '支付记录id',
  `order_no` varchar(50) DEFAULT NULL COMMENT '商户订单编号',
  `transaction_id` varchar(50) DEFAULT NULL COMMENT '支付系统交易编号',
  `payment_type` varchar(20) DEFAULT NULL COMMENT '支付类型',
  `trade_type` varchar(20) DEFAULT NULL COMMENT '交易类型',
  `trade_state` varchar(50) DEFAULT NULL COMMENT '交易状态',
  `payer_total` int DEFAULT NULL COMMENT '支付金额(分)',
  `content` text COMMENT '通知参数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `t_payment_info` */

/*Table structure for table `t_refund_info` */

DROP TABLE IF EXISTS `t_refund_info`;

CREATE TABLE `t_refund_info` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '退款单id',
  `order_no` varchar(50) DEFAULT NULL COMMENT '商户订单编号',
  `refund_no` varchar(50) DEFAULT NULL COMMENT '商户退款单编号',
  `refund_id` varchar(50) DEFAULT NULL COMMENT '支付系统退款单号',
  `total_fee` double DEFAULT NULL COMMENT '原订单金额(分)',
  `refund` double DEFAULT NULL COMMENT '退款金额(分)',
  `reason` varchar(50) DEFAULT NULL COMMENT '退款原因',
  `refund_status` varchar(10) DEFAULT NULL COMMENT '退款状态',
  `content_return` text COMMENT '申请退款返回参数',
  `content_notify` text COMMENT '退款结果通知参数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `t_refund_info` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`uid`,`username`,`password`,`name`,`email`,`telephone`,`role`) values (1,'BigBoss','123456','Вадим','abc@qq.com','18688886666',0),(2,'Tanghao','123456','唐昊','aaa@qq.com','18666668888',1),(3,'David','123456','David','bbb@qq.com','18616681668',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
