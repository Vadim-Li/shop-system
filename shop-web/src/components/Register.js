import Image from "react-bootstrap/Image";
import regbg from "../img/reg-bg.jpg";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URI } from "../redux/constant";

function Register() {
  const username = useRef();
  const password = useRef();
  const name = useRef();
  const email = useRef();
  const phone = useRef();

  useEffect(() => {
    let loginForm = document.getElementById("loginForm");
    loginForm.style.left = "7%";
    loginForm.style.top = 370 + "px";
  }, []);

  const navigate = useNavigate();

  const register = () => {
    axios
      .post(`${BASE_URI}/user/save`, {
        username: username.current.value,
        password: password.current.value,
        name: name.current.value,
        email: email.current.value,
        telephone: phone.current.value,
        role: 1,
      })
      .then((response) => {
        alert("registration success!");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <Image style={{ width: "100%" }} src={regbg} alt="" />

      <Form
        id="loginForm"
        role="form"
        className="border bg-light pt-1"
        style={{
          border: "1px solid black",
          borderRadius: "15px",
          width: "600px",
          position: "absolute",
        }}
      >
        <h3
          className="modal-title mb-3 border-bottom"
          style={{ textAlign: "center" }}
        >
          <b>{/* 用户注册 */}User Registration</b>
        </h3>
        <Form.Group className="form-group row mb-3">
          <Form.Label
            htmlFor="username"
            className="col-form-label col-3 text-md-right"
            style={{ textAlign: "right" }}
          >
            {/* 用户名： */}
            Username:
          </Form.Label>
          <Col className="col-6">
            <Form.Control
              type="text"
              id="username"
              placeholder="Please enter your username"
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
          <Col className="col-6">
            <Form.Control
              type="password"
              id="password"
              placeholder="Please enter your password"
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
          <Col className="col-6">
            <Form.Control
              type="text"
              id="name"
              placeholder="Please enter your name"
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
          <Col className="col-6">
            <Form.Control
              type="text"
              id="email"
              placeholder="Please enter your email"
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
          <Col className="col-6">
            <Form.Control
              type="text"
              id="phone"
              placeholder="Please enter your phone number"
              ref={phone}
            />
          </Col>
        </Form.Group>
        <div
          className="btn1 mb-3"
          style={{ width: "100%", textAlign: "center" }}
        >
          {/* 已有账号？ */}
          Already have an account?
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            {/* 立即登录 */}Login now
          </NavLink>
        </div>
        <div
          className="btn1 mb-3"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Button
            type="button"
            className="btn btn-primary"
            onClick={register}
            // style={{ width: "47%", textAlign: "center" }}
          >
            {/* 注册 */}Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
