import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { BASE_URI } from "../../redux/constant";

function DiscountedGoods() {
  const [discountedItems, setDiscountedItems] = useState();

  async function fetchDiscountedItems() {
    let response = await axios.get(`${BASE_URI}/discountedItems`);
    setDiscountedItems(response.data);
  }

  useEffect(() => {
    fetchDiscountedItems();
  }, []);

  return (
    <div className="pb-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container
        className=" pt-3 px-5"
        style={{ width: "90%", backgroundColor: "white" }}
      >
        <div className="box text-center">
          <hr />
          <h3 className="text-uppercase">优惠商品</h3>

          <h4 className="text-muted">
            <span className="accent">Discounted Commodity</span>
          </h4>
          <hr />
        </div>

        <Row>
          {discountedItems &&
            discountedItems.map(discountedItem => (
              <div key={discountedItem.id} className="col-lg-4 col-md-6">
                <NavLink
                  to={`/detail?id=${discountedItem.id}&cid=${discountedItem.cid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className=" mb-4">
                    <Card.Img
                      variant="top"
                      // src={require("../../img/" + discountedItem.image)}
                      // src={`${BASE_URI}/img/${discountedItem.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${discountedItem.image}`)}
                      alt=""
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      {/* <h5>Fur coat with very but very very long name</h5>
                    <p className="price">$143.00</p>
                    <a href="#" className="btn btn-outline-secondary">
                      Read More
                    </a> */}
                      <p className="item-name">{discountedItem.name}</p>
                      <ul
                        className="list-inline"
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="list-inline-item">
                          <h5 className="item-price" style={{ color: "red" }}>
                            ¥{discountedItem.shopPrice}
                          </h5>
                        </li>
                        <li className="list-inline-item">
                          <p style={{ textDecoration: "line-through" }}>
                            ￥{discountedItem.marketPrice}
                          </p>
                        </li>
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

export default DiscountedGoods;
