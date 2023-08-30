import { Glyphicon } from "react-bootstrap";
import logo from "../img/logo-pvpmall.png";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createSearchAction } from "../redux/actions/search";
import { LOGIN_FAILURE } from "../redux/constant";
import PubSub from "pubsub-js";
import { useNavigate } from "react-router-dom";

function Header({ loginUser, signOut, searchName }) {
  const [itemCats, setItemCats] = useState();
  const name = useRef();
  const navigate = useNavigate();

  function fetchItemCat() {
    axios
      .get("http://localhost:8080/catList/1")
      .then(response => {
        setItemCats(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchItemCat();
  }, []);

  function computedClassName({ isActive }) {
    return isActive
      ? "list-group-item navActive  py-3"
      : "list-group-item  py-3 ";
  }

  const searchItem = () => {
    searchName(name.current.value, 1);
    PubSub.publish("name", name.current.value);
  };

  // document.onkeydown = event => {

  //   if (event.keyCode == 13) {
  //     searchItem();
  //     navigate("searchList")
  //   }
  // };

  // useEffect(() => {
  //   const qwe = document.getElementById("qwe");
  //   qwe.addEventListener("keydown",(event)=> {
  //     // alert(event.target.nodeName)
  //     // if (event.target.nodeName == "LI" || event.target.nodeName == "A") {

  //     //   event.target.style.borderBottom = "5px solid #DF371D";

  //     //   event.target.paddingTop = "100px";

  //     // }
  //     if (event.keyCode == 13) {
  //       searchItem();
  //       navigate("searchList")
  //     }
  //   })

  // }, []);

  return (
    <div name="top" id="top" style={{ backgroundColor: "black" }}>
      <Container style={{ textAlign: "left" }}>
        <i className="fa fa-volume-up" style={{ color: "#ffd04b" }}></i>&nbsp;
        <span style={{ color: "white" }}>
          酷玩周边商城手办热销中！，点击{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            查看详情>
          </a>{" "}
        </span>
      </Container>

      <Row>
        <div
          className="col-lg-3"
          style={{ paddingLeft: "0", textAlign: "center" }}
        >
          <Image src={logo} style={{ width: "130px" }} />
        </div>
        <div
          className="col-lg-3 hidden-xs"
          style={{ marginLeft: "13%", marginTop: "30px", paddingTop: "4px" }}
        >
          <InputGroup id="qwe" style={{ width: "250px" }} className="mb-3">
            <Form.Control
              placeholder="请输入想要找的宝贝"
              ref={name}
              style={{ borderRadius: "0px" }}
              // aria-label="Recipient's username"
              // aria-describedby="basic-addon2"
            />

            <NavLink to="searchList" style={{ textDecoration: "none" }}>
              <InputGroup.Text
                style={{ backgroundColor: "#FFC107", borderRadius: "0px" }}
                id="basic-addon2"
                onClick={searchItem}
              >
                搜索
              </InputGroup.Text>
            </NavLink>
          </InputGroup>
        </div>

        <div
          className="col-lg-4 pt-1 "
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          {/* <Form className="form-inline"> */}
          <ul className="list-inline">
            {loginUser && loginUser.code === 200 ? (
              // <Button
              //   style={{
              //     backgroundColor: "black",
              //     border: "0px",
              //     paddingRight: "0px"
              //   }}
              // >
              <li className="list-inline-item">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      color: "#ffd04b",
                      backgroundColor: "black",
                      border: "0px"
                    }}
                  >
                    {"欢迎您：" + loginUser.data.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#/action-1"
                      style={{ textAlign: "center" }}
                    >
                      <i className="fa fa-user"></i>
                      &nbsp; 个人中心
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      style={{ textAlign: "center" }}
                    >
                      <i className="fa fa-bookmark"></i>
                      &nbsp; 订单管理
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/"
                      onClick={() => signOut()}
                      style={{ textAlign: "center" }}
                    >
                      <i className="fa fa-paper-plane"></i>
                      &nbsp; 退出登录
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              // </Button>
              <li className="list-inline-item">
                <NavLink to="login">
                  <Button variant="outline-warning" style={{ border: "0px" }}>
                    <i className="fa fa-users"></i>&nbsp;登录
                  </Button>
                </NavLink>
              </li>
            )}
            <li className="list-inline-item">
              <NavLink to="cart" style={{ textDecoration: "none" }}>
                <Button variant="outline-warning" style={{ border: "0px" }}>
                  <i className="fa fa-shopping-cart"></i>&nbsp;购物车
                </Button>
              </NavLink>
            </li>
          </ul>
          {/* </Form> */}
        </div>
      </Row>

      <Navbar
        expand="lg"
        bg=""
        className=" px-5"
        style={{ paddingBottom: "0px", paddingTop: "0px" }}
      >
        <Navbar.Brand href="Home" className="ml-5">
          {/* <Image src={logo} alt="logo" /> */}
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ backgroundColor: "#FFC107" }}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavLink
              className={computedClassName}
              style={{ textAlign: "center", color: "#A6A6A6", width: "120px" }}
              to="home"
            >
              首页
            </NavLink>
            {itemCats &&
              itemCats.map(itemCat => (
                <NavLink
                  key={itemCat.cid}
                  className={computedClassName}
                  style={{
                    textAlign: "center",
                    color: "#A6A6A6",
                    width: "120px"
                  }}
                  to={itemCat.menuClick}
                >
                  {itemCat.name}
                </NavLink>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch({
        type: LOGIN_FAILURE
      });
    },
    searchName: (name, pageNum) => {
      //通知redux执行搜索
      dispatch(createSearchAction(name, pageNum));
    }
  };
}

export default connect(
  state => ({
    loginUser: state.login,
    itemBySearch: state.itemBySearch
  }),
  mapDispatchToProps
)(Header);
