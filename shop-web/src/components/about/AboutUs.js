import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";

function AboutUs() {
  function computedClassName({ isActive }) {
    return isActive
      ? "list-group-item asideActive  py-3"
      : "list-group-item  py-3 ";
  }

  return (
    <div className="pt-4 pb-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container>
        <Row>
          <Col lg={2}>
            <ListGroup
              className="list-group"
              style={{ width: "200px", textAlign: "center" }}
            >
              {/* 购物指南 */}
              <ListGroup.Item
                className={computedClassName}
                style={{ backgroundColor: "#EEEEEE", fontWeight: "bold" }}
              >
                {/* 购物指南 */}Shopping guide
              </ListGroup.Item>
              <NavLink className={computedClassName} to="registrationAndLogin">
                {/* 账号注册与登录 */}Account registration and login
              </NavLink>
              {/* <NavLink className={computedClassName} to="aboutJu">
                网站订购流程
              </NavLink> */}
              <NavLink
                className={computedClassName}
                to="productPurchaseRestrictions"
              >
                {/* 商品限购说明 */}Product purchase restrictions
              </NavLink>
              <NavLink className={computedClassName} to="viewOrder">
                {/* 如何查看订单 */}How to view an order
              </NavLink>
              <NavLink className={computedClassName} to="howToPay">
                {/* 如何支付 */}How to pay
              </NavLink>
              {/* 配送方式 */}
              <ListGroup.Item
                className={computedClassName}
                style={{ backgroundColor: "#EEEEEE", fontWeight: "bold" }}
              >
                {/* 配送方式 */}Delivery Method
              </ListGroup.Item>
              <NavLink
                className={computedClassName}
                to="deliveryServiceDescription"
              >
                {/* 配送服务说明 */}Delivery Service Description
              </NavLink>
              <NavLink className={computedClassName} to="deliveryProgressQuery">
                {/* 配送进度查询 */}Delivery progress query
              </NavLink>
              {/* 常见操作 */}
              <ListGroup.Item
                className={computedClassName}
                style={{ backgroundColor: "#EEEEEE", fontWeight: "bold" }}
              >
                {/* 常见操作 */}Common operations
              </ListGroup.Item>
              <NavLink className={computedClassName} to="useCoupons">
                {/* 如何使用优惠卷 */}How to use coupons
              </NavLink>
              {/* <NavLink className={computedClassName} to="aboutJu">
                如何获得聚豆
              </NavLink> */}
              <NavLink className={computedClassName} to="applyForInvoicing">
                {/* 如何申请开发票 */}How to apply for invoicing
              </NavLink>
              {/* 售后服务 */}
              <ListGroup.Item
                className={computedClassName}
                style={{ backgroundColor: "#EEEEEE", fontWeight: "bold" }}
              >
                {/* 售后服务 */}After-sales service
              </ListGroup.Item>
              {/* <NavLink className={computedClassName} to="aboutDao">
                7天无理由退换货
              </NavLink> */}
              <NavLink className={computedClassName} to="returnsAndExchanges">
                {/* 如何办理退换货 */}How to handle returns and exchanges
              </NavLink>
              <NavLink className={computedClassName} to="modifyOrder">
                {/* 下单后如何修改订单 */}How to modify an order after placing it
              </NavLink>
              {/*  关于我们 */}
              <ListGroup.Item
                className={computedClassName}
                style={{ backgroundColor: "#EEEEEE", fontWeight: "bold" }}
              >
                {/* 关于我们 */}About Us
              </ListGroup.Item>
              <NavLink className={computedClassName} to="aboutDao">
                {/* 关于道聚城 */}About Daoju City
              </NavLink>
              <NavLink className={computedClassName} to="aboutJu">
                {/* 关于聚诚品 */}About Juchengpin
              </NavLink>
            </ListGroup>
          </Col>
          <Col lg={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
