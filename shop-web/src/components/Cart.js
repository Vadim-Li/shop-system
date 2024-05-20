import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import produce from "immer";
import { connect } from "react-redux";
import axios from "axios";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { BASE_URI } from "../redux/constant";
import { BASEPAY_URI } from "../redux/constant";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";

function Cart({ loginUser }) {
  const [goods, setGoods] = useState();

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

  // const navigate = useNavigate();
  async function fetchGoods() {
    try {
      let response = await axios.get(
        `${BASE_URI}/item/getItemByUser/${loginUser.data.uid}`
      );

      setGoods(response.data);

      if (response.data && response.data.length > 0) {
        setPayOrder((prevPayOrder) => ({
          ...prevPayOrder,
          productId: response.data[0].id || "",
        }));
      } else {
        // 处理数组为空的情况，可以设置默认值或采取其他适当的措施
        // 例如，设置默认值为一个特定的 ID 或为空字符串
        setPayOrder((prevPayOrder) => ({
          ...prevPayOrder,
          productId: "defaultProductId",
        }));
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }

  useEffect(() => {
    if (loginUser.code === 200) {
      fetchGoods();
    }
  }, []);

  function updateCount(cartId, count) {
    axios
      .put(`${BASE_URI}/cart/updateCount`, {
        cartId,
        count,
      })
      .then((response) => {
        fetchGoods();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteCart(cartId) {
    axios
      .delete(`${BASE_URI}/cart/delete/${cartId}`)
      .then((response) => {
        fetchGoods();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [isAllSelect, setIsAllSelect] = useState(false);

  const updateNum = (cartId, index, num) => {
    if (goods[index].cart.count + num === 0) {
      return;
    }
    updateCount(cartId, goods[index].cart.count + num);
    //以不可变数据的方式更新
    // const newDraft = produce(goods, draft => {
    //   draft[index].num += num;
    // });
    // setGoods(newDraft);
  };

  const allSelectChange = () => {
    setIsAllSelect(!isAllSelect);

    const newDraft = produce(goods, (draft) => {
      draft.forEach((item) => {
        item.select = !isAllSelect;
      });
    });

    setGoods(newDraft);
  };

  const singleSelect = (index) => {
    const newDraft = produce(goods, (draft) => {
      draft[index].select = !goods[index].select;
    });
    setIsAllSelect(newDraft.every((item) => item.select));
    setGoods(newDraft);
  };

  if (loginUser.code !== 200) {
    return <Navigate to="/login" />;
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

  const toPay = async (productId) => {
    selectItem(productId);

    setPayBtnDisabled(true);

    if (payOrder.payType === "wxpay") {
      try {
        // const response = await wxPayApi.nativePay(payOrder.productId);
        const response = await axios.post(
          `${BASEPAY_URI}/api/wx-pay/native/${productId}/${loginUser.data.uid}`
        );
        console.log(response.data.data.orderNo);
        setCodeUrl(response.data.data.codeUrl);
        setOrderNo(response.data.data.orderNo);

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
      console.log(payOrder.productId, loginUser.data.uid);
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
          // Use React Router or your preferred navigation method
          // For example: history.push('/success');
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
    <div className="py-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Table>
          <thead className="mb-5">
            <tr style={{ textAlign: "center" }}>
              {/* <th>
                全选：
                select all:&nbsp;
                <input
                  checked={isAllSelect}
                  onChange={allSelectChange}
                  type="checkbox"
                  name=""
                  id=""
                />
              </th> */}
              <th>
                {/* 商品信息 */}
                Product information
              </th>
              <th>
                {/* 单价（元） */}
                Unit price (yuan)
              </th>
              <th>
                {/* 数量 */}
                Quantity
              </th>
              <th>
                {/* 金额（元） */}
                Amount (yuan)
              </th>
              <th colSpan={2}>
                {/* 操作 */}
                Operate
              </th>
            </tr>
          </thead>

          <tbody>
            {goods &&
              goods.map((item, index) => (
                <tr key={index}>
                  {/* <td className="pt-5" style={{ textAlign: "center" }}>
                    <input
                      onChange={() => {
                        singleSelect(index);
                        if (!item.select) {
                          selectItem(item.id);
                        }
                      }}
                      checked={item.select}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td> */}
                  <td className="py-3">
                    <NavLink
                      to={`/detail?id=${item.id}&cid=${item.cid}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Image
                        // src={require("../img/" + item.image)}
                        // src={`${BASE_URI}/img/${item.image}`}
                        src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${item.image}`)}
                        style={{ width: "113px", marginRight: "30px" }}
                      />
                      {item.name}
                    </NavLink>
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {item.shopPrice}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    <ButtonGroup
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <InputGroup
                        style={{
                          width: "50%",
                        }}
                      >
                        <InputGroup.Text
                          id="btnGroupAddon"
                          style={{
                            border: "1px solid black",
                            borderRadius: "0px",
                            width: "32px",
                            height: "32px",
                            backgroundColor: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => updateNum(item.cart.cartId, index, -1)}
                        >
                          -
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          aria-label="Input group example"
                          aria-describedby="btnGroupAddon"
                          style={{
                            border: "1px solid black",
                            height: "32px",
                            textAlign: "center",
                            paddingLeft: "0",
                            paddingRight: "0",
                          }}
                          value={item.cart.count}
                          onChange={(e) =>
                            updateCount(item.cart.cartId, e.target.value)
                          }
                        />
                        <InputGroup.Text
                          id="btnGroupAddon"
                          style={{
                            border: "1px solid black",
                            borderRadius: "0px",
                            width: "32px",
                            height: "32px",
                            backgroundColor: "white",
                            paddingLeft: "9px",
                            cursor: "pointer",
                          }}
                          onClick={() => updateNum(item.cart.cartId, index, 1)}
                        >
                          +
                        </InputGroup.Text>
                      </InputGroup>
                    </ButtonGroup>
                    {/* <button onClick={() => updateNum(index, -1)}>-</button>
                  {item.num}
                  <button onClick={() => updateNum(index, 1)}>+</button> */}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {item.cart.count * item.shopPrice}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    <i
                      className="fa fa-trash-o"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteCart(item.cart.cartId)}
                    ></i>
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    <Button
                      size="sm"
                      style={{
                        borderColor: "red",
                        backgroundColor: "#D63017",
                      }}
                      onClick={() => {
                        toPay(item.id);
                      }}
                    >
                      {/* 立即购买 */}Buy Now
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={6} style={{ padding: "0px" }}>
                <div
                  className="list-inline"
                  style={{ marginBottom: "0px", marginLeft: "10px" }}
                >
                  <li
                    className="list-inline-item"
                    style={{ fontWeight: "bold" }}
                  >
                    {/* 请选择支付方式： */}
                    Please choose a payment method:
                  </li>
                  <div className="list-inline-item">
                    <Outlet />
                  </div>
                  <NavLink
                    className={payClassName}
                    to="weChat"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textAlign: "center",
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginRight: "20px",
                    }}
                    onClick={() => selectPayType("wxpay")}
                  >
                    <img
                      src={require("../assets/img/wxpay.png")}
                      alt="WeChat Pay"
                    />
                    <div>
                      {/* 微信支付 */}
                      WeChat
                    </div>
                  </NavLink>

                  <NavLink
                    className={payClassName}
                    to="aliPay"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => selectPayType("alipay")}
                  >
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={require("../assets/img/alipay.png")}
                        alt="Alipay"
                      />
                    </div>
                    <div>
                      {/* 支付宝 */}
                      AliPay
                    </div>
                  </NavLink>
                </div>
              </th>
              {/* <th colspan={1}></th> */}
              {/* <th colSpan={3} style={{ padding: "0px", textAlign: "right" }}>
                已选商品
                Selected&nbsp;
                <span style={{ color: "#D63017" }}>
                  {goods &&
                    goods
                      .filter((item) => item.select)
                      .reduce((total, item) => (total += item.cart.count), 0)}
                </span>
                件 
                &nbsp;product&nbsp;&nbsp;
                总价：￥
                Total price:￥
                <span style={{ color: "#D63017" }}>
                  {goods &&
                    goods
                      .filter((item) => item.select)
                      .reduce(
                        (total, item) =>
                          (total += item.cart.count * item.shopPrice),
                        0
                      )}
                </span>
                <Button
                  size="lg"
                  style={{
                    borderRadius: "0px",
                    backgroundColor: "#D63017",
                    width: "200px",
                    height: "56px",
                    marginLeft: "30px",
                  }}
                  onClick={toPay}
                >
                  去结算
                  Go to checkout
                </Button>
              </th> */}
            </tr>
          </tfoot>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {/* 使用微信扫码支付 */}Use WeChat scan code to pay
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center", paddingBottom: "30px" }}>
            <QRCode value={codeUrl} size={250} />
            {/* <div>使用微信扫码支付</div> */}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </Container>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  (state) => ({
    loginUser: state.login,
  }),
  mapDispatchToProps
)(Cart);
