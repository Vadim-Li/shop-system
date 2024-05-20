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
import { Navigate, NavLink } from "react-router-dom";
import { BASE_URI } from "../redux/constant";
import { BASEPAY_URI } from "../redux/constant";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";

function AllOrders({ loginUser }) {
  const [orders, setOrders] = useState();

  // const [list, setList] = useState([]);
  const [refundDialogVisible, setRefundDialogVisible] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [reason, setReason] = useState("");
  const [refundSubmitBtnDisabled, setRefundSubmitBtnDisabled] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchOrders() {
    let response = await axios.get(
      `${BASEPAY_URI}/api/order-info/listByUser/${loginUser.data.uid}`
    );

    let res = await axios.get(`${BASE_URI}/item/getAllItem`);

    const result = response.data.data.list.map((item, index) => {
      for (let j = 0; j < res.data.length; j++) {
        if (item.productId === res.data[j].id) {
          item.img = res.data[j].image;
          item.cid = res.data[j].cid;
          return item;
        }
      }
    });
    console.log(result);
    setOrders(result);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function deleteOrder(orderId) {
    axios
      .delete(`${BASEPAY_URI}/api/order-info/delete/${orderId}`)
      .then((response) => {
        fetchOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const cancelOrder = (orderNo, paymentType) => {
    if (paymentType === "微信") {
      axios
        .post(`${BASEPAY_URI}/api/wx-pay/cancel/${orderNo}`)
        .then((response) => {
          alert(response.data.message);
          fetchOrders();
        });
    } else {
      axios
        .post(`${BASEPAY_URI}/api/ali-pay/trade/close/${orderNo}`)
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          fetchOrders();
        });
    }
  };

  const handleRefund = (orderNo) => {
    setRefundDialogVisible(true);
    setOrderNo(orderNo);
    setPaymentType(paymentType);
  };

  const handleRefundClose = () => {
    setRefundDialogVisible(false);
    setOrderNo("");
    setReason("");
    setRefundSubmitBtnDisabled(false);
  };

  const handleRefundSubmit = () => {
    setRefundSubmitBtnDisabled(true);

    if (paymentType === "微信") {
      axios
        .post(`${BASEPAY_URI}/api/wx-pay/refunds/${orderNo}/${reason}`)
        .then((response) => {
          console.log("response", response);
          handleRefundClose();
          fetchOrders();
        });
    } else {
      axios
        .post(`${BASEPAY_URI}/api/ali-pay/trade/refund/${orderNo}/${reason}`)
        .then((response) => {
          console.log("response", response);
          handleRefundClose();
          fetchOrders();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Table>
          <thead className="">
            <tr style={{ textAlign: "center" }}>
              <th>Order Number</th>
              <th>Order Information</th>
              <th>Order amount</th>
              <th>Payment method</th>
              <th>Order Status</th>
              <th>
                {/* 操作 */}
                Operate
              </th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={order.orderNo}>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {order.orderNo}
                  </td>
                  <td className="">
                    <NavLink
                      to={`/detail?id=${order.productId}&cid=${order.cid}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Image
                        // src={require("../img/" + item.image)}
                        // src={`${BASE_URI}/img/${order.img}`}
                        src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${order.img}`)}
                        style={{ width: "113px", marginRight: "30px" }}
                      />
                      {order.title}
                    </NavLink>
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    ￥{order.totalFee}
                    {/* 元 */}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {order.paymentType}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {order.orderStatus}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {order.orderStatus === "未支付" && (
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: "#FFC107",
                          color: "black",
                          borderColor: "#FFC107",
                        }}
                        onClick={() => cancelOrder(order.orderNo)}
                      >
                        {/* 取消 */}Cancel
                      </Button>
                    )}
                    {order.orderStatus === "超时已关闭" && (
                      <i
                        className="fa fa-trash-o"
                        style={{cursor:"pointer"}}
                        onClick={() => deleteOrder(order.id)}
                      ></i>
                    )}
                    {order.orderStatus === "用户已取消" && (
                      <i
                        className="fa fa-trash-o"
                        style={{cursor:"pointer"}}
                        onClick={() => deleteOrder(order.id)}
                      ></i>
                    )}
                    {order.orderStatus === "支付成功" && (
                      <Button
                        size="sm"
                        style={{ backgroundColor: "red", borderColor: "red" }}
                        onClick={() => {
                          handleRefund(order.orderNo);
                          handleShow();
                        }}
                      >
                        {/* 退款 */}Refund
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      {refundDialogVisible && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>退款对话框</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <label htmlFor="reason">退款原因:</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">请选择退款原因</option>
              <option value="不喜欢">不喜欢</option>
              <option value="买错了">买错了</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            <Button
              variant="primary"
              onClick={() => {
                handleRefundSubmit();
                handleClose();
              }}
              disabled={refundSubmitBtnDisabled}
            >
              Sure
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
)(AllOrders);
