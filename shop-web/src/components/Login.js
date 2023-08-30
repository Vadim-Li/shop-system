import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import loginbg from "../img/loginbg.jpg";
import { connect } from "react-redux";
import { createVerifyAction } from "../redux/actions/login";
import Alert from "react-bootstrap/Alert";
import { isFirst, noFirst } from "../redux/actions/first";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import code from "../img/code.png";
import axios from "axios";

function Login({ verifyName, loginUser, isFirst, isNoFirst, firstTm }) {
  const username = useRef();
  const password = useRef();

  useEffect(() => {
    isFirst();
  }, []);
  const login = () => {
    setShow(true);
    verifyName(username.current.value, password.current.value);
    isNoFirst();
    axios
      .get("http://localhost:8080/captcha")
      .then(response => {
        console.log("captcha", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    let loginForm = document.getElementById("loginForm");

    loginForm.style.left = "38%";
    loginForm.style.top = 181 + "px";
  }, []);

  document.onkeydown = event => {
    if (event.keyCode == 13) {
      login();
    }
  };

  const [show, setShow] = useState(true);

  return (
    <div
      style={{
        padding: 0,
        margin: 0
      }}
    >
      <Image style={{ width: "100%" }} src={loginbg} alt="" />

      <Form
        id="loginForm"
        role="form"
        className="border bg-light pt-1"
        style={{
          border: "1px solid black",
          borderRadius: "15px",
          width: "438px",
          position: "absolute"
        }}
      >
        <h3
          className="modal-title mb-3 border-bottom"
          style={{ textAlign: "center" }}
        >
          <b>用户登录</b>
        </h3>
        {firstTm ? null : loginUser.code === 200 ? (
          <Navigate to="/" />
        ) : show ? (
          <Container>
            <Alert
              style={{ height: "60px" }}
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              <p>用户名或密码错误</p>
            </Alert>
          </Container>
        ) : null}

        <Form.Group className="form-group row mb-3">
          <Form.Label
            htmlFor="username"
            className="col-form-label col-3 text-md-right"
            style={{ textAlign: "right" }}
          >
            用户名：
          </Form.Label>
          <Col className="col-6">
            <Form.Control
              type="text"
              className="form-control"
              id="username"
              placeholder="请输入用户名"
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
            密码：
          </Form.Label>
          <Col className="col-6">
            <Form.Control
              type="password"
              className="form-control"
              id="password"
              placeholder="请输入密码"
              ref={password}
            />
          </Col>
        </Form.Group>
        {/* 验证码 */}
        <Form.Group className="form-group row mb-3">
          <Form.Label
            htmlFor="captcha"
            className="col-form-label col-3 text-md-right"
            style={{ textAlign: "right" }}
          >
            验证码：
          </Form.Label>
          <Col className="col-4">
            <Form.Control
              type="text"
              className="form-control"
              id="passwcaptchaord"
              placeholder="请输入验证码"
              // ref={captcha}
            />
          </Col>
          <Col sm={4}>
            <Image className="pt-1" src={code} alt="code" />
          </Col>
        </Form.Group>
        <div
          className="btn1 mb-3"
          style={{ width: "100%", textAlign: "center" }}
        >
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            新用户注册
          </NavLink>
        </div>
        <div
          className="btn1 mb-3"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Button
            type="button"
            className="btn btn-primary"
            onClick={() => login()}
            // style={{ width: "47%", textAlign: "center" }}
          >
            登录
          </Button>
        </div>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loginUser: state.login,
    firstTm: state.first
  };
}

function mapDispatchToProps(dispatch) {
  return {
    verifyName: (username, password) => {
      //通知redux执行搜索
      dispatch(createVerifyAction(username, password));
    },
    isFirst: () => {
      dispatch(isFirst());
    },
    isNoFirst: () => {
      dispatch(noFirst());
    }
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Login);
