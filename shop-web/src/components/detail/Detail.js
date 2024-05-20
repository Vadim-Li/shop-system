import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Card from "react-bootstrap/Card";
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
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
import { BASE_URI } from "../../redux/constant";
import { BASEPAY_URI } from "../../redux/constant";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";

function Detail({ itemData, fetchItem, itemCatData, fetchItemCat, loginUser }) {
  const [count, setCount] = useState(1);
  const [search, setSearch] = useSearchParams();
  const id = search.get("id");
  const cid = search.get("cid");
  const navigate = useNavigate();

  const [payBtnDisabled, setPayBtnDisabled] = useState(false);
  const [codeDialogVisible, setCodeDialogVisible] = useState(false);
  const [payOrder, setPayOrder] = useState({
    productId: "",
    payType: "wxpay",
  });
  const [codeUrl, setCodeUrl] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [timer, setTimer] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (id !== null) {
      fetchItem(id);
      selectItem(id);
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
        .post(`${BASE_URI}/cart/saveCart`, {
          uid: loginUser.data.uid,
          id,
          count: number,
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const selectItem = (productId) => {
    console.log("商品id：" + productId);
    setPayOrder((prevPayOrder) => ({
      ...prevPayOrder,
      productId,
    }));
  };

  const selectPayType = (type) => {
    console.log("支付方式：" + type);
    setPayOrder((prevPayOrder) => ({
      ...prevPayOrder,
      payType: type,
    }));
  };

  const toPay = async () => {
    if (loginUser.code !== 200) {
      navigate("/login");
    } else {
      setPayBtnDisabled(true);
      if (payOrder.payType === "wxpay") {
        try {
          const response = await axios.post(
            `${BASEPAY_URI}/api/wx-pay/native/${payOrder.productId}/${loginUser.data.uid}`
          );
          setCodeUrl(response.data.data.codeUrl);
          setOrderNo(response.data.data.orderNo);
          console.log(codeUrl);

          setCodeDialogVisible(true);

          setTimer(
            setInterval(() => {
              queryOrderStatus(response.data.data.orderNo);
            }, 3000)
          );
        } catch (error) {
          console.error("Error during wxPayApi.nativePay:", error);
          setPayBtnDisabled(false);
        }
      } else if (payOrder.payType === "alipay") {
        try {
          // const response = await wxPayApi.nativePay(payOrder.productId);
          const response = await axios.post(
            `${BASEPAY_URI}/api/ali-pay/trade/page/pay/${payOrder.productId}/${loginUser.data.uid}`
          );
          console.log(response);
          document.write(response.data.data.formStr);
        } catch (error) {
          console.error("Error during alipay.nativePay:", error);
          setPayBtnDisabled(false);
        }
      }
      handleShow();
    }
  };

  const closeDialog = () => {
    console.log("close.................");
    setPayBtnDisabled(false);
    console.log("清除定时器");
    clearInterval(timer);
  };

  const queryOrderStatus = async (orderNo1) => {
    try {
      // const response = await orderInfoApi.queryOrderStatus(orderNo);
      const response = await axios.get(
        `${BASEPAY_URI}/api/order-info/query-order-status/${orderNo1}`
      );
      console.log("查询订单状态：" + response.data.code);

      if (response.code === 0) {
        console.log("清除定时器");
        clearInterval(timer);

        setTimeout(() => {
          // Redirect to success page after 3 seconds
          // history.push('/success');
          // navigate("/success");
          alert("支付成功！");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during orderInfoApi.queryOrderStatus:", error);
    }
  };

  function payClassName({ isActive }) {
    return isActive ? "list-inline-item choosePay" : "list-inline-item";
  }

  return (
    <div className="pt-3 pb-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Row>
          <Col className="col-12">
            <ul className="list-inline">
              <li className="list-inline-item">
                <NavLink to="/home" style={{ textDecoration: "none" }}>
                  {/* 首页 */}Home
                </NavLink>
              </li>
              <li className="list-inline-item">&gt;</li>
              <NavLink
                // to="/figure"
                to={"/" + itemCatData.menuClick}
                style={{ textDecoration: "none" }}
              >
                <li className="list-inline-item">{itemCatData.name}</li>
              </NavLink>
              <li className="list-inline-item">&gt;</li>
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
              // src={require("../../img/" + itemData.image)}
              // src={`${BASE_URI}/img/${itemData.image}`}
              src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${itemData.image}`)}
              style={{ width: "95.5%" }}
            />
          </Col>
          <Col md={6}>
            <Row>
              <h3 className="mb-3">{itemData.name}</h3>
            </Row>
            <Row>
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
            </Row>
            <Row>
              <div className="mb-4" style={{ color: "#CC6600" }}>
                <Badge bg="warning" text="dark">
                  {/* 折 */}discount
                </Badge>{" "}
                {/* 限时优惠 */}Limited Time Offer
                {itemData.marketPrice - itemData.shopPrice}￥
              </div>
            </Row>
            <Row>
              <div className="mb-4">
                {/* 款式 */}Styles
                <span
                  style={{
                    marginLeft: "30px",
                    padding: "8px 18px",
                    border: "2px solid red",
                  }}
                >
                  {/* 现货 */}Spot goods
                </span>
              </div>
            </Row>
            <Row>
              <div className="mb-4">
                {/* 款式 */}Merchant
                <span
                  style={{
                    marginLeft: "30px",
                    // padding: "8px 18px",
                    // border: "2px solid red",
                  }}
                >
                  {itemData.user.username}
                </span>
              </div>
            </Row>
            <Row>
              <div>
                {/* 数量 */}Quantity
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
                        backgroundColor: "white",
                        cursor: "pointer",
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
                        textAlign: "center",
                      }}
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                    />
                    <InputGroup.Text
                      id="btnGroupAddon"
                      style={{
                        border: "1px solid black",
                        borderRadius: "0px",
                        width: "38px",
                        backgroundColor: "white",
                        cursor: "pointer",
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
            </Row>
            <Row>
              <div className="list-inline">
                <div
                  className="list-inline-item"
                  style={{ fontWeight: "bold" }}
                >
                  {/* 请选择支付方式： */}
                  Please choose a payment method:
                </div>
                <NavLink
                  className={payClassName}
                  to="productDetail"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => selectPayType("wxpay")}
                >
                  <img
                    src={require("../../assets/img/wxpay.png")}
                    alt="WeChat Pay"
                  />
                  <div>
                    {/* 微信支付 */}
                    WeChat
                  </div>
                </NavLink>
                <NavLink
                  className={payClassName}
                  to="contact"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => selectPayType("alipay")}
                >
                  <img
                    src={require("../../assets/img/alipay.png")}
                    alt="Alipay"
                  />
                  <div>
                    {/* 支付宝 */}
                    AliPay
                  </div>
                </NavLink>
              </div>
            </Row>
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
            <Row>
              <AddCartModal
                itemId={itemData.id}
                count={count}
                addToCart={addToCart}
              />
              <Button
                className="mt-3"
                size="lg"
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#D63017",
                  width: "200px",
                  height: "56px",
                }}
                onClick={toPay}
              >
                {/* 立即购买 */}Buy Now
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {/* 使用微信扫码支付 */}Use WeChat scan code to pay
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{ textAlign: "center", paddingBottom: "30px" }}
                >
                  <QRCode value={codeUrl} size={250} />
                  {/* <div>使用微信扫码支付</div> */}
                </Modal.Body>
              </Modal>
            </Row>
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
                  textDecoration: "none",
                }}
                to={`productDetail?id=${itemData.id}`}
              >
                Product details
              </NavLink>
              <NavLink
                className={computedClassName}
                style={{
                  textAlign: "center",
                  color: "#333333",
                  width: "235px",
                  height: "71px",
                  paddingTop: "25px",
                  textDecoration: "none",
                }}
                to="userReviews"
              >
                User comments
              </NavLink>
              <NavLink
                className={computedClassName}
                style={{
                  textAlign: "center",
                  color: "#333333",
                  width: "235px",
                  height: "71px",
                  paddingTop: "25px",
                  textDecoration: "none",
                }}
                to="contact"
              >
                Contact the merchant
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
    loginUser: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItem: (id) => {
      //通知redux执行搜索
      dispatch(createItemAction(id));
    },
    fetchItemCat: (cid) => {
      dispatch(createItemCatAction(cid));
    },
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
