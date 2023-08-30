import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import bussiness from "../img/bussiness.png";
import jcp from "../img/jcp.png";
import jcp_gzh from "../img/jcp_gzh.jpg";
import djc_gzh from "../img/djc_gzh.jpg";
import djc_app from "../img/djc_app.png";
import footer from "../img/footer.png";
import Card from "react-bootstrap/Card";

function Footer() {
  return (
    <div className="row bg-dark p-4" style={{ marginRight: "0px" }}>
      <Container
        className="border-bottom"
        style={{ paddingBottom: "30px", paddingTop: "20px" }}
      >
        <Row>
          <Col
            md={3}
            style={{
              borderRight: "1px solid #A6A6A6",
              textAlign: "center",
              paddingTop: "20px"
            }}
          >
            <Image src={jcp} style={{ width: "50%" }} />
          </Col>

          <Col
            md={3}
            style={{ borderRight: "1px solid #A6A6A6", textAlign: "center" }}
          >
            <Row>
              <Col md={6} style={{ color: "white", paddingTop: "20px" }}>
                <i
                  className="fa fa-credit-card"
                  style={{ fontSize: "23px" }}
                ></i>
                &nbsp; 购物指南
              </Col>
              <Col md={6} style={{ color: "white", paddingTop: "20px" }}>
                <i className="fa fa-truck" style={{ fontSize: "23px" }}></i>
                &nbsp; 配送方式
              </Col>
              <Col md={6} style={{ color: "white", marginTop: "40px" }}>
                <i className="fa fa-book" style={{ fontSize: "23px" }}></i>
                &nbsp; 常见操作
              </Col>
              <Col md={6} style={{ color: "white", marginTop: "40px" }}>
                <i className="fa fa-bell" style={{ fontSize: "23px" }}></i>
                &nbsp; 售后服务
              </Col>
              <Col md={6} style={{ color: "white", marginTop: "40px" }}>
                <i
                  className="fa fa-commenting"
                  style={{ fontSize: "23px" }}
                ></i>
                &nbsp; 关于我们
              </Col>
            </Row>
          </Col>

          <Col md={6} style={{ paddingTop: "20px" }}>
            <Row>
              <div className="col-md-3" style={{ marginLeft: "8%" }}>
                <Card className=" mb-4">
                  <Card.Img variant="top" src={jcp_gzh} alt="" />
                </Card>
                <p
                  className="item-name"
                  style={{ color: "white", textAlign: "center" }}
                >
                  聚诚品公众号
                </p>
              </div>
              <div className="col-md-3" style={{ marginLeft: "8%" }}>
                <Card className=" mb-4">
                  <Card.Img variant="top" src={djc_gzh} alt="" />
                </Card>
                <p
                  className="item-name"
                  style={{ color: "white", textAlign: "center" }}
                >
                  道聚城公众号
                </p>
              </div>
              <div className="col-md-3" style={{ marginLeft: "8%" }}>
                <Card className=" mb-4">
                  <Card.Img variant="top" src={djc_app} alt="" />
                </Card>
                <p
                  className="item-name"
                  style={{ color: "white", textAlign: "center" }}
                >
                  掌上道聚城
                </p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container style={{ fontSize: "12px", marginTop: "40px" }}>
        <div style={{ textAlign: "center" }}>
          <Image src={footer} />
        </div>

        <Row style={{ marginTop: "20px" }}>
          <Col>
            <div className="text-light text-center">
              唐昊互动娱乐 | 服务条款| 唐昊游戏隐私保护指引|
              唐昊游戏儿童隐私保护指引| 广告服务 | 唐昊游戏招聘 | 唐昊游戏客服 |
              游戏地图 | 成长守护平台 | 商务合作 | 网站导航
            </div>
            <div className="text-light text-center">
              粤网文[2014]0633-233号 增值电信业务经营许可证：粤B2-20090059
              B2-20090028 违法和不良信息举报电话：0755-83767606
            </div>
            <div className="text-light text-center">
              COPYRIGHT © 1998 – 2023 VADIM. ALL RIGHTS RESERVED.
            </div>
            <div className="text-light text-center">唐昊公司 版权所有</div>
            <Image
              style={{
                marginLeft: "46%",
                marginTop: "50px",
                marginBottom: "30px"
              }}
              src={bussiness}
              alt=""
            />
          </Col>
        </Row>
        <a href="#top" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              width: "45px",
              height: "45px",
              border: "1px solid #A6A6A6",
              textAlign: "center",
              backgroundColor: "#F5F5F5",

              position: "fixed",
              top: "90%",
              left: "95.5%"
              // float:"inherit"
            }}
          >
            <div>
              <i className="fa fa-caret-up"></i>
            </div>
            TOP
          </div>
        </a>
      </Container>
    </div>
  );
}

export default Footer;
