import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams
} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { createItemAction } from "../../redux/actions/item";
import { createItemCatAction } from "../../redux/actions/itemCat";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Navigate, useNavigate } from "react-router-dom";
import AddCartModal from "./AddCartModal";

function Detail({ itemData, fetchItem, itemCatData, fetchItemCat, loginUser }) {
  const [count, setCount] = useState(1);
  const [search, setSearch] = useSearchParams();
  const id = search.get("id");
  const cid = search.get("cid");
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== null) {
      fetchItem(id);
    }
    if (cid !== null) {
      fetchItemCat(cid);
    }
  }, []);

  // useEffect(() => {
  //   const navUl1 = document.getElementById("navUl1");
  //   navUl1.addEventListener("click",(event)=> {
  //     alert(event.target.nodeName)
  //     if (event.target.nodeName == "LI" || event.target.nodeName == "A") {

  //       event.target.style.borderBottom = "5px solid #DF371D";

  //       event.target.paddingTop = "100px";

  //     }
  //   })

  // }, []);

  function computedClassName({ isActive }) {
    return isActive ? "navActive2" : "";
  }

  function addToCart(id, number) {
    if (loginUser.code !== 200) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:8080/cart/saveCart", {
          uid: loginUser.data.uid,
          id,
          count: number
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <div className="pt-3 pb-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Row>
          <Col className="col-12">
            <ul className="list-inline">
              <li className="list-inline-item">
                <NavLink to="/home" style={{ textDecoration: "none" }}>
                  首页
                </NavLink>
              </li>
              <li className="list-inline-item">></li>
              <NavLink
                // to="/figure"
                to={"/" + itemCatData.menuClick}
                style={{ textDecoration: "none" }}
              >
                <li className="list-inline-item">{itemCatData.name}</li>
              </NavLink>
              <li className="list-inline-item">></li>
              <li className="list-inline-item">{itemData.name}</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container
        className=" py-5 px-5"
        style={{ width: "90%", backgroundColor: "white" }}
      >
        <Row>
          <Col md={5}>
            <Image
              src={require("../../img/" + itemData.image)}
              style={{ width: "95.5%" }}
            />
          </Col>
          <Col md={6}>
            <h3 className="mb-3">{itemData.name}</h3>
            <ul className="list-inline" style={{ marginBottom: "0px" }}>
              <li className="list-inline-item">
                <h2 style={{ color: "red" }}>￥{itemData.shopPrice}</h2>
              </li>
              <li className="list-inline-item">
                <p style={{ textDecoration: "line-through" }}>
                  ￥{itemData.marketPrice}
                </p>
              </li>
            </ul>
            <div className="mb-4" style={{ color: "#CC6600" }}>
              <Badge bg="warning" text="dark">
                折
              </Badge>{" "}
              限时优惠{itemData.marketPrice - itemData.shopPrice}元
            </div>
            <div className="mb-4">
              款式
              <span
                style={{
                  marginLeft: "30px",
                  padding: "8px 18px",
                  border: "2px solid red"
                }}
              >
                现货
              </span>
            </div>
            <div>
              数量
              <ButtonGroup
                aria-label="Basic example"
                style={{ marginLeft: "30px" }}
              >
                {/* <Button
                  variant="white"
                  style={{
                    border: "1px solid black",
                    borderRadius: "0px",
                    width: "38px"
                  }}
                  onClick={() => setCount(count - 1 < 1 ? 1 : count - 1)}
                >
                  -
                </Button>
                <Button
                  variant="white"
                  style={{ border: "1px solid black", width: "58px" }}
                >
                  {count}
                </Button>
                <Button
                  variant="white"
                  style={{
                    border: "1px solid black",
                    borderRadius: "0px",
                    width: "38px"
                  }}
                  onClick={() =>
                    setCount(
                      count + 1 > itemData.num ? itemData.num : count + 1
                    )
                  }
                >
                  +
                </Button> */}
                <InputGroup>
                  <InputGroup.Text
                    id="btnGroupAddon"
                    style={{
                      border: "1px solid black",
                      borderRadius: "0px",
                      width: "38px",
                      backgroundColor: "white"
                    }}
                    onClick={() => setCount(count - 1 < 1 ? 1 : count - 1)}
                  >
                    -
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon"
                    style={{
                      border: "1px solid black",
                      width: "58px",
                      textAlign: "center"
                    }}
                    value={count}
                    onChange={e => setCount(e.target.value)}
                  />
                  <InputGroup.Text
                    id="btnGroupAddon"
                    style={{
                      border: "1px solid black",
                      borderRadius: "0px",
                      width: "38px",
                      backgroundColor: "white"
                    }}
                    onClick={() =>
                      setCount(
                        count + 1 > itemData.num
                          ? itemData.num
                          : parseInt(count + 1)
                      )
                    }
                  >
                    +
                  </InputGroup.Text>
                </InputGroup>
              </ButtonGroup>
            </div>
            {/* <Button
              size="lg"
              style={{
                borderRadius: "0px",
                backgroundColor: "#D63017",
                width: "200px",
                height: "56px"
              }}
              onClick={() => addToCart(itemData.id, count)}
            >
              加入购物车
            </Button> */}
            <AddCartModal
              itemId={itemData.id}
              count={count}
              addToCart={addToCart}
            />
            <Button
              className="mt-4"
              size="lg"
              style={{
                borderRadius: "0px",
                backgroundColor: "#D63017",
                width: "200px",
                height: "56px"
              }}
            >
              立即购买
            </Button>
          </Col>
        </Row>
      </Container>

      <Container
        className=" mt-5 px-5 pb-5"
        style={{ width: "90%", backgroundColor: "white" }}
      >
        <Row>
          <Navbar
            expand="lg"
            bg=""
            className=" px-5 border-bottom"
            style={{ paddingBottom: "0px", paddingTop: "0px" }}
          >
            <Navbar.Toggle
              style={{ backgroundColor: "#FFC107" }}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavLink
                className={computedClassName}
                style={{
                  textAlign: "center",
                  color: "#333333",
                  width: "235px",
                  height: "71px",
                  paddingTop: "25px",
                  marginLeft: "18%",
                  textDecoration: "none"
                }}
                to={`productDetail?id=${itemData.id}`}
              >
                商品详情
              </NavLink>
              <NavLink
                className={computedClassName}
                style={{
                  textAlign: "center",
                  color: "#333333",
                  width: "235px",
                  height: "71px",
                  paddingTop: "25px",
                  textDecoration: "none"
                }}
                to="userReviews"
              >
                用户点评
              </NavLink>
              <NavLink
                className={computedClassName}
                style={{
                  textAlign: "center",
                  color: "#333333",
                  width: "235px",
                  height: "71px",
                  paddingTop: "25px",
                  textDecoration: "none"
                }}
                to="contact"
              >
                联系商家
              </NavLink>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Outlet />
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    itemData: state.item,
    itemCatData: state.itemCat,
    loginUser: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItem: id => {
      //通知redux执行搜索
      dispatch(createItemAction(id));
    },
    fetchItemCat: cid => {
      dispatch(createItemCatAction(cid));
    }
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
