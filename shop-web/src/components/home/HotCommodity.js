import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { BASE_URI } from "../../redux/constant";

function HotCommodity() {
  const [hotCommoditys, setHotCommoditys] = useState();

  function fetchHotCommodity() {
    axios
      .get(`${BASE_URI}/hotItems`)
      .then((response) => {
        setHotCommoditys(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchHotCommodity();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    socket.onopen = () => {
      console.log("WebSocket connected");
    };
    socket.onmessage = (event) => {
      // 收到后端发送的WebSocket消息
      console.log("Received message from server:", event.data);
      // 在收到消息后，更新页面以显示新上传的图片
      // 这里可以触发页面刷新或更新图片列表等操作
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="pt-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container
        className=" pt-3 px-5"
        style={{ width: "90%", backgroundColor: "white" }}
      >
        <div className="box text-center">
          <hr />
          <h3 className="text-uppercase">热门商品</h3>

          <h4 className="text-muted">
            <span className="accent">Hot Commodity</span>
          </h4>
          <hr />
        </div>

        <Row>
          {hotCommoditys &&
            hotCommoditys.map((hotCommodity) => (
              <div key={hotCommodity.id} className="col-lg-4 col-md-6">
                <NavLink
                  to={`/detail?id=${hotCommodity.id}&cid=${hotCommodity.cid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className=" mb-4">
                    <Card.Img
                      variant="top"
                      // src={require("../../img/" + hotCommodity.image)}
                      // src={`${BASE_URI}/img/${hotCommodity.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${hotCommodity.image}`)}
                      alt=""
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      {/* <h5>Fur coat with very but very very long name</h5>
                    <p className="price">$143.00</p>
                    <a href="#" className="btn btn-outline-secondary">
                      Read More
                    </a> */}
                      <p className="item-name">{hotCommodity.name}</p>
                      <ul
                        className="list-inline"
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="list-inline-item">
                          <h5 className="item-price" style={{ color: "red" }}>
                            ¥{hotCommodity.shopPrice}
                          </h5>
                        </li>
                        {/* <li className="list-inline-item">
                          <p style={{ textDecoration: "line-through" }}>
                            ￥{hotCommodity.marketPrice}
                          </p>
                        </li> */}
                      </ul>
                    </Card.Body>
                  </Card>
                </NavLink>
              </div>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default HotCommodity;
