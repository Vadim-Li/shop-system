import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { NavLink, useSearchParams, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createSearchAction } from "../redux/actions/search";
import Paging from "./Paging";
import PubSub from "pubsub-js";
import { BASE_URI } from "../redux/constant";

function SearchList({ itemBySearch, loading, error, searchName }) {
  const [name, setName] = useState();

  useEffect(() => {
    PubSub.subscribe("name", (_, data) => {
      setName(data);
    });
  }, []);

  //   useEffect(() => {
  //     searchName(name, 1);
  //   }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // return <p>Error while fetching data</p>;
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (itemBySearch.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="pt-3 pb-5" style={{ backgroundColor: "#F5F5F5" }}>
      {/* <Container style={{ width: "90%" }}>
        <Row>
          <Col className="col-12">
            <ul className="list-inline">
              <li className="list-inline-item">
                <NavLink to="/home" style={{ textDecoration: "none" }}>
                  首页
                </NavLink>
              </li>
              <li className="list-inline-item">></li>
              <li className="list-inline-item">精品手办</li>
            </ul>
          </Col>
        </Row>
      </Container> */}
      <Container
        className=" pt-5 px-5"
        style={{ width: "90%", backgroundColor: "white" }}
      >
        <Row>
          {itemBySearch.list &&
            itemBySearch.list.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6">
                <NavLink
                  to={`/detail?id=${item.id}&cid=${1}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className=" mb-4">
                    <Card.Img
                      variant="top"
                      // src={require("../img/" + item.image)}
                      // src={`${BASE_URI}/img/${item.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${item.image}`)}
                      alt=""
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <p className="item-name">
                        {item.name.length > 15
                          ? item.name.slice(0, 14) + "..."
                          : item.name}
                      </p>
                      <ul
                        className="list-inline"
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="list-inline-item">
                          <h5 className="item-price" style={{ color: "red" }}>
                            ¥{item.shopPrice}
                          </h5>
                        </li>
                        <li className="list-inline-item">
                          <p style={{ textDecoration: "line-through" }}>
                            ￥{item.marketPrice}
                          </p>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </NavLink>
              </div>
            ))}
        </Row>

        <Paging
          cid={name}
          categoryData={itemBySearch}
          fetchCategory={searchName}
        />
      </Container>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    searchName: (name, pageNum) => {
      //通知redux执行搜索
      dispatch(createSearchAction(name, pageNum));
    },
  };
}

export default connect(
  (state) => ({
    itemBySearch: state.itemBySearch,
    loading: state.loading,
    error: state.error,
  }),
  mapDispatchToProps
)(SearchList);
