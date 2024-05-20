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

function Digital({ categoryData, fetchCategory }) {
  useEffect(() => {
    fetchCategory(2, 1);
  }, []);

  // const [itemCat,setItemCat] = useState();
  // function fetchCat() {
  //   axios
  //     .get(`http://localhost:8080/itemCat/2`)
  //     .then(response => {
  //       console.log(response.data)
  //       setItemCat(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   fetchCat();
  // }, []);

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
              <li className="list-inline-item">{/* 数码3C */}Digital 3C</li>
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
            categoryData.list.map((digital) => (
              <div key={digital.id} className="col-lg-3 col-md-6">
                <NavLink
                  to={`/detail?id=${digital.id}&cid=${digital.cid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className=" mb-4">
                    <Card.Img
                      variant="top"
                      // src={require("../../img/" + digital.image)}
                      // src={`${BASE_URI}/img/${digital.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${digital.image}`)}
                      alt=""
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <p className="item-name">
                        {digital.name.length > 15
                          ? digital.name.slice(0, 14) + "..."
                          : digital.name}
                      </p>
                      <ul
                        className="list-inline"
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="list-inline-item">
                          <h5 className="item-price" style={{ color: "red" }}>
                            ¥{digital.shopPrice}
                          </h5>
                        </li>
                        <li className="list-inline-item">
                          <p style={{ textDecoration: "line-through" }}>
                            ￥{digital.marketPrice}
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
          cid={2}
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
export default connect(mapStateToProps, mapDispatchToProps)(Digital);
