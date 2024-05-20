import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PubSub from "pubsub-js";
import Col from "react-bootstrap/Col";
import { BASE_URI } from "../../../redux/constant";

function UpdateModal({ user }) {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.telephone);
  const [role, setRole] = useState(user.role);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    axios
      .put(`${BASE_URI}/user/update`, {
        uid: user.uid,
        username,
        password,
        name,
        email,
        telephone: phone,
        role,
      })
      .then((response) => {
        handleClose();
        PubSub.publish("user.updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        className="btn btn-sm"
        variant="primary"
        onClick={handleShow}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
              /> */}
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
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
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
