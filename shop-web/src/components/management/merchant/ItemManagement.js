import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { BASE_URI } from "../../../redux/constant";
import Paging from "../Paging";
import Search from "../product/Search";
import PubSub from "pubsub-js";
import UpdateModal from "../product/UpdateModal";
import { connect } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import Image from "react-bootstrap/Image";

function ItemManagement({ loginUser }) {
  const [products, setProducts] = useState([]);

  function fetchProduct(pageNum) {
    axios
      .get(`${BASE_URI}/item/list/${loginUser.data.uid}/${pageNum}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProduct(1);
  }, []);

  function deleteProduct(productId) {
    axios
      .delete(`${BASE_URI}/item/delete/${productId}`)
      .then((response) => {
        fetchProduct(1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    PubSub.subscribe("searchProduct", (_, data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    const token = PubSub.subscribe("product.updated", () => {
      fetchProduct(1);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  if (loginUser.code !== 200 || loginUser.data.role !== 2) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="py-3" style={{ backgroundColor: "#F5F5F5" }}>
      <Container>
        <Search />

        <Table className="table table-bordered table-hover ">
          <thead>
            <tr className="table-warning" style={{ textAlign: "center" }}>
              <th>Name</th>
              <th>MarketPrice</th>
              <th>ShopPrice</th>
              <th>Num</th>
              <th>Image</th>
              <th>Idesc</th>
              <th>Iflag</th>
              <th>Status</th>
              {/* <th>CreateTime</th>
            <th>UpdateTime</th> */}
              <th>Cid</th>
              <th>Merchant</th>
              <th>{/* 操作 */}Operation</th>
            </tr>
          </thead>

          <tbody>
            {products.list &&
              products.list.map((product, index) => (
                <tr key={product.id}>
                  <td style={{ textAlign: "center" }}>{product.name}</td>
                  <td style={{ textAlign: "center" }}>{product.marketPrice}</td>
                  <td style={{ textAlign: "center" }}>{product.shopPrice}</td>
                  <td style={{ textAlign: "center" }}>{product.num}</td>
                  <td style={{ textAlign: "center" }}>
                    <Image
                      // src={`${BASE_URI}/img/${product.image}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${product.image}`)}
                      style={{ width: "113px", marginRight: "30px" }}
                    />
                    {product.image}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Image
                      // src={`${BASE_URI}/img/${product.idesc}`}
                      src={require(`D:/IdeaProjects/shop-system/shop/src/main/resources/static/img/${product.idesc}`)}
                      style={{ width: "113px", marginRight: "30px" }}
                    />
                    {product.idesc}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {product.iflag === 1
                      ? "Popular Product"
                      : "Discounted Product"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {product.status === 1
                      ? "Product on the shelves"
                      : product.status === 2
                      ? "Product off the shelves"
                      : "Delete"}
                  </td>
                  {/* <td style={{ textAlign: "center" }}>{product.createTime}</td>
                <td style={{ textAlign: "center" }}>{product.updateTime}</td> */}
                  <td style={{ textAlign: "center" }}>
                    {product.cid === 1
                      ? "Figures"
                      : product.cid === 2
                      ? "Digital"
                      : product.cid === 3
                      ? "Clothing"
                      : product.cid === 4
                      ? "Pillow"
                      : "Daily"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {product.user.username}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <UpdateModal product={product} />
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn btn-danger btn-sm"
                    >
                      {/* 删除 */}Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Paging categoryData={products} fetchCategory={fetchProduct} />
      </Container>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  (state) => ({
    loginUser: state.login,
  }),
  mapDispatchToProps
)(ItemManagement);
