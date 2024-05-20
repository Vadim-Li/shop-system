// import { Glyphicon } from "react-bootstrap";
// import logo from "../img/logo-pvpmall.png";
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
import { BASE_URI } from "../redux/constant";

function Header({ loginUser, signOut, searchName }) {
  const [itemCats, setItemCats] = useState();
  const name = useRef();
  const navigate = useNavigate();

  function fetchItemCat() {
    axios
      .get(`${BASE_URI}/catList/1`)
      .then((response) => {
        setItemCats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchItemCat();
  }, []);

  function computedClassName({ isActive }) {
    return isActive ? "navActive navSty py-3" : "navSty py-3 ";
  }

  const searchItem = () => {
    searchName(name.current.value, 1);
    // PubSub.publish("name", name.current.value);
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
          {/* 酷玩周边商城手办热销中！，点击{" "} */}
          Coolplay peripheral mall figures are on sale! , click{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            {/* 查看详情 */}Check the details
          </a>{" "}
        </span>
      </Container>

      <Row>
        <div
          className="col-lg-3"
          style={{ paddingLeft: "0", textAlign: "center" }}
        >
          <Image
            src={`${BASE_URI}/img/logo-pvpmall.png`}
            style={{ width: "130px" }}
          />
        </div>
        <div
          className="col-lg-3 hidden-xs"
          style={{ marginLeft: "13%", marginTop: "30px", paddingTop: "4px" }}
        >
          <InputGroup id="qwe" style={{ width: "255px" }} className="mb-3">
            <Form.Control
              // placeholder="请输入想要找的宝贝"
              placeholder="Enter product name"
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
                {/* 搜索 */}Search
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
                      border: "0px",
                    }}
                  >
                    {"Welcome:" + loginUser.data.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to="perCenter"
                      style={{ textAlign: "Left" }}
                    >
                      <i className="fa fa-user"></i>
                      &nbsp;
                      {/* 个人中心 */}Personal center
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="allOrders"
                      style={{ textAlign: "Left" }}
                    >
                      <i className="fa fa-bookmark"></i>
                      &nbsp;
                      {/* 订单管理 */}My Orders
                    </Dropdown.Item>
                    {/* <NavDropdown.Divider />  */}
                    <Dropdown.Item
                      as={Link}
                      to="/"
                      onClick={() => signOut()}
                      style={{ textAlign: "Left" }}
                    >
                      <i className="fa fa-paper-plane"></i>
                      &nbsp;
                      {/* 退出登录 */}Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              // </Button>
              <li className="list-inline-item">
                <NavLink to="login">
                  <Button variant="outline-warning" style={{ border: "0px" }}>
                    <i className="fa fa-users"></i>&nbsp;
                    {/* 登录 */}Login
                  </Button>
                </NavLink>
              </li>
            )}
            <li className="list-inline-item">
              <NavLink to="cart" style={{ textDecoration: "none" }}>
                <Button variant="outline-warning" style={{ border: "0px" }}>
                  <i className="fa fa-shopping-cart"></i>&nbsp;
                  {/* 购物车 */}Shopping cart
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
          <Nav className="me-auto">
            <NavLink
              className={computedClassName}
              style={{ textAlign: "center", color: "#A6A6A6", width: "120px" }}
              to="home"
            >
              {/* 首页 */}Home
            </NavLink>
            {itemCats &&
              itemCats
                .filter((item, index) => {
                  return index >= 0 && index < 5;
                })
                .map((itemCat) => (
                  <NavLink
                    key={itemCat.cid}
                    className={computedClassName}
                    style={{
                      textAlign: "center",
                      color: "#A6A6A6",
                      width: "120px",
                    }}
                    to={itemCat.menuClick}
                  >
                    {itemCat.name}
                  </NavLink>
                ))}
            {loginUser &&
            loginUser.code === 200 &&
            loginUser.data.role === 0 ? (
              <NavDropdown
                title="Management"
                id="basic-nav-dropdown"
                style={{
                  textAlign: "center",
                  width: "120px",
                  padding: "7px 0px",
                }}
              >
                {itemCats &&
                  itemCats
                    .filter((item, index) => {
                      return index >= 5;
                    })
                    .map((itemCat) => (
                      <NavDropdown.Item
                        key={itemCat.cid}
                        as={Link}
                        to={itemCat.menuClick}
                      >
                        {itemCat.name}
                      </NavDropdown.Item>
                    ))}
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            ) : loginUser &&
              loginUser.code === 200 &&
              loginUser.data.role === 2 ? (
              <NavLink
                className={computedClassName}
                style={{
                  textAlign: "center",
                  color: "#A6A6A6",
                  width: "120px",
                }}
                to="itemManagement"
              >
                {/* 首页 */}ItemManagement
              </NavLink>
            ) : null}
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
        type: LOGIN_FAILURE,
      });
    },
    searchName: (name, pageNum) => {
      //通知redux执行搜索
      dispatch(createSearchAction(name, pageNum));
    },
  };
}

export default connect(
  (state) => ({
    loginUser: state.login,
    itemBySearch: state.itemBySearch,
  }),
  mapDispatchToProps
)(Header);
