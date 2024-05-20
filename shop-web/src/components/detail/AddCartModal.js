import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function AddCartModal({ itemId, count, addToCart, loginUser }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (loginUser.code !== 200) {
      navigate("/login");
    } else {
      setShow(true);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}
      <Button
        size="lg"
        className="mt-3"
        style={{
          borderRadius: "0px",
          backgroundColor: "#D63017",
          width: "200px",
          height: "56px",
          marginRight: "30px",
        }}
        onClick={() => {
          addToCart(itemId, count);
          handleShow();
        }}
      >
        {/* 加入购物车 */}Add to the cart
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="modal-90w"
        style={
          {
            //   border: "1px solid #F74A4A"
            // width:"560px",
            // height:"300px"
          }
        }
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px" }}>
            {/* 购物车提醒 */}Shopping cart reminder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="mb-5"
          style={{ textAlign: "center", fontSize: "24px", color: "#F74A4A" }}
        >
          <div className="mt-3 mb-5">
            {/* 商品已成功添加到购物车！ */}The item has been successfully added
            to the shopping cart!
          </div>
          <NavLink to="/cart" style={{ textDecoration: "none" }}>
            <Button
              variant="secondary"
              style={{
                borderRadius: "0px",
                backgroundColor: "#D63017",
                width: "182px",
                height: "50px",
                marginRight: "20px",
              }}
            >
              {/* 确认 */}Confirm
            </Button>
          </NavLink>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{
              borderRadius: "0px",
              border: "1px solid #F74A4A",
              backgroundColor: "white",
              color: "#F74A4A",
              width: "182px",
              height: "50px",
            }}
          >
            {/* 继续购物 */}Continue shopping
          </Button>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    loginUser: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchItem: id => {
    //   //通知redux执行搜索
    //   dispatch(createItemAction(id));
    // },
    // fetchItemCat: cid => {
    //   dispatch(createItemCatAction(cid));
    // }
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(AddCartModal);
