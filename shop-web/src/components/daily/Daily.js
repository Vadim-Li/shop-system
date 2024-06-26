import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createCategoryAction } from "../../redux/actions/category";
import Paging from "../Paging";
import { BASE_URI } from "../../redux/constant";

function Daily({ categoryData, fetchCategory }) {
  useEffect(() => {
    fetchCategory(5, 1);
  }, []);

  return (
    <div className="pt-3 pb-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Row>
          <Col className="col-12">
            <ul className="list-inline">
              <li className="list-inline-item">
                <NavLink to="/home" style={{ textDecoration: "none" }}>
                  {/* 首页 */}Home
                </NavLink>
              </li>
              <li className="list-inline-item">&gt;</li>
              <li className="list-inline-item">Daily</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container
        className=" pt-5 px-5"
        style={{ width: "90%", backgroundColor: "white" }}
      >
        <Row>
          {categoryData.list &&
            categoryData.list.map((daily) => (
              <div key={daily.id} className="col-lg-3 col-md-6">
                <NavLink
                  to={`/detail?id=${daily.id}&cid=${5}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className=" mb-4">
                    <Card.Img
                      variant="top"
                      // src={require("../../img/" + daily.image)}
                      // src={`${BASE_URI}/img/${daily.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${daily.image}`)}
                      alt=""
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <p className="item-name">
                        {daily.name.length > 15
                          ? daily.name.slice(0, 14) + "..."
                          : daily.name}
                      </p>
                      <ul
                        className="list-inline"
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="list-inline-item">
                          <h5 className="item-price" style={{ color: "red" }}>
                            ¥{daily.shopPrice}
                          </h5>
                        </li>
                        <li className="list-inline-item">
                          <p style={{ textDecoration: "line-through" }}>
                            ￥{daily.marketPrice}
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
          cid={5}
          categoryData={categoryData}
          fetchCategory={fetchCategory}
        />
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    categoryData: state.category,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategory: (cid, pageNum) => {
      //通知redux执行搜索
      dispatch(createCategoryAction(cid, pageNum));
    },
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
