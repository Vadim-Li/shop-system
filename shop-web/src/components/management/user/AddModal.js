import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BASE_URI } from "../../../redux/constant";
import PubSub from "pubsub-js";

function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 追加状态用于控制添加成功后的提示信息显示和隐藏
  const [isShowSuccessTip, setIsShowSuccessTip] = useState(false);

  const username = useRef();
  const password = useRef();
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const role = useRef();

  const handleAddUserClick = () => {
    axios
      .post(`${BASE_URI}/user/save`, {
        username: username.current.value,
        password: password.current.value,
        name: name.current.value,
        email: email.current.value,
        telephone: phone.current.value,
        role: role.current.value,
      })
      .then((response) => {
        handleClose();
        PubSub.publish("user.updated");
        // 添加成功后显示提示信息，并在3秒后隐藏
        setIsShowSuccessTip(true);
        setTimeout(() => {
          setIsShowSuccessTip(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        //   className="btn-sm"
        variant="primary"
        onClick={handleShow}
        style={{ borderRadius: "0px", marginLeft: "10px", marginRight: "10px" }}
      >
        Add user
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="username"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 用户名： */}
              Username:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="username"
                placeholder="Please enter the username"
                ref={username}
              />
            </Col>
          </Form.Group>

          {/* <!-- 密码 --> */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="password"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 密码： */}
              Password:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="password"
                id="password"
                placeholder="Please enter the password"
                ref={password}
              />
            </Col>
          </Form.Group>

          {/* 姓名 */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="name"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 姓名： */}
              Name:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="name"
                placeholder="Please enter the name"
                ref={name}
              />
            </Col>
          </Form.Group>
          {/* email */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="email"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              Email:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="email"
                placeholder="Please enter the email"
                ref={email}
              />
            </Col>
          </Form.Group>
          {/* 手机号 */}
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="phone"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 手机号： */}
              Phone:
            </Form.Label>
            <Col className="col-7">
              <Form.Control
                type="text"
                id="phone"
                placeholder="Please enter phone number"
                ref={phone}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group row mb-3">
            <Form.Label
              htmlFor="role"
              className="col-form-label col-3 text-md-right"
              style={{ textAlign: "right" }}
            >
              {/* 角色： */}
              Role:
            </Form.Label>
            <Col className="col-7">
              {/* <Form.Control
                type="text"
                id="role"
                placeholder="Please enter the role"
                ref={role}
              /> */}
              <Form.Control as="select" ref={role}>
                <option value="">Please select a role</option>
                <option value={0}>Administrator</option>
                <option value={1}>User</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUserClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {isShowSuccessTip && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{
            height: "38px",
            margin: "0px",
            padding: "2px 10px 0px 10px",
          }}
        >
          <strong style={{ marginRight: "10px" }}>Added successfully!</strong>
          <Button
            type="button"
            className="close btn-sm"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setIsShowSuccessTip(false)}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      )}
    </>
  );
}

export default AddModal;
