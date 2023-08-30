import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useRef } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams
} from "react-router-dom";
import { connect } from "react-redux";
import { createItemAction } from "../../redux/actions/item";

function ProductDetail({ itemData, fetchItem }) {
  const [search, setSearch] = useSearchParams();
  const id = search.get("id");

  useEffect(() => {
    if (id !== null) {
      fetchItem(id);
    }
  }, []);
  return (
    <>
      <Container className="my-3">
        <Row style={{ color: "#777777", fontSize: "14px" }}>
          <Col md={3}>
            <div>商品名称：{itemData.name}</div>
            <div>商城：王者荣耀</div>
          </Col>
          <Col md={3}>
            <div>店铺：腾讯科技（成都）有限公司</div>
            <div>周边分类：手办模玩 /Q萌手办</div>
          </Col>
          <Col md={3}>
            <div>上架时间：{itemData.created}</div>
          </Col>
          <Col md={3}>
            <div>商品毛重：230g</div>
          </Col>
        </Row>
      </Container>
      <Image
        className="mt-3 mb-5"
        src={require("../../img/" +itemData.idesc)}
        style={{ width: "63.5%", marginLeft: "20%" }}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    itemData: state.item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItem: id => {
      //通知redux执行搜索
      dispatch(createItemAction(id));
    }
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
