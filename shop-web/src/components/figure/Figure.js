import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createCategoryAction } from "../../redux/actions/category";
import Paging from "../Paging";
import { BASE_URI } from "../../redux/constant";

function Figure({ categoryData, fetchCategory }) {
  useEffect(() => {
    fetchCategory(1, 1);
  }, []);

  // const totalPages =
  // categoryData.list !== undefined && categoryData.navigatepageNums.length > 0 ? categoryData.navigatepageNums.length : 0;

  // let items = [];
  // for (
  //   let number = 1;
  //   number <= totalPages;
  //   number++
  // ) {
  //   items.push(
  //     <Pagination.Item
  //       key={number}
  //       active={number === categoryData.pageNum}
  //       onClick={() => fetchCategory(1, number)}
  //     >
  //       {number}
  //     </Pagination.Item>
  //   );
  // }

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
              <li className="list-inline-item">{/* 精品手办 */}Figures</li>
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
            categoryData.list.map((figure) => (
              <div key={figure.id} className="col-lg-3 col-md-6">
                <NavLink
                  to={`/detail?id=${figure.id}&cid=${figure.cid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className=" mb-4">
                    <Card.Img
                      variant="top"
                      // src={require("../../img/" + figure.image)}
                      // src={`${BASE_URI}/img/${figure.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${figure.image}`)}
                      alt=""
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <p className="item-name">
                        {figure.name.length > 15
                          ? figure.name.slice(0, 14) + "..."
                          : figure.name}
                      </p>
                      <ul
                        className="list-inline"
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="list-inline-item">
                          <h5 className="item-price" style={{ color: "red" }}>
                            ¥{figure.shopPrice}
                          </h5>
                        </li>
                        <li className="list-inline-item">
                          <p style={{ textDecoration: "line-through" }}>
                            ￥{figure.marketPrice}
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
          cid={1}
          categoryData={categoryData}
          fetchCategory={fetchCategory}
        />
        {/* <Pagination className="pb-5">
          <Pagination.First onClick={() => fetchCategory(1, categoryData.navigateFirstPage)} />
          <Pagination.Prev onClick={() => fetchCategory(1, categoryData.isFirstPage ? 1 : categoryData.prePage)} />
          {items}
          <Pagination.Next onClick={() => fetchCategory(1, categoryData.isLastPage ? categoryData.pages : categoryData.nextPage)} />
          <Pagination.Last onClick={() => fetchCategory(1, categoryData.navigateLastPage)} />
        </Pagination> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Figure);
