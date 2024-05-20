import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { BASE_URI } from "../../../redux/constant";
import Paging from "../Paging";
import Search from "./Search";
import PubSub from "pubsub-js";
import UpdateModal from "./UpdateModal";
import { connect } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";

function ProductType({ loginUser }) {
  const [productTypes, setProductTypes] = useState([]);

  function fetchProductType(pageNum) {
    axios
      .get(`${BASE_URI}/itemCat/list/${pageNum}`)
      .then((response) => {
        console.log(response);
        setProductTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProductType(1);
  }, []);

  function deleteItemCat(cId) {
    axios
      .delete(`${BASE_URI}/itemCat/delete/${cId}`)
      .then((response) => {
        fetchProductType(1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    PubSub.subscribe("searchItemCat", (_, data) => {
      setProductTypes(data);
    });
  }, []);

  useEffect(() => {
    const token = PubSub.subscribe("itemCat.updated", () => {
      fetchProductType(1);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  if (loginUser.code !== 200 || loginUser.data.role !== 0) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="py-3" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Search />

        <Table className="table table-bordered table-hover ">
          <thead>
            <tr className="table-warning" style={{ textAlign: "center" }}>
              <th>Name</th>
              <th>Status</th>
              <th>MenuClick</th>
              <th>{/* 操作 */}Operation</th>
            </tr>
          </thead>

          <tbody>
            {productTypes.list &&
              productTypes.list.map((productType, index) => (
                <tr key={productType.cid}>
                  <td style={{ textAlign: "center" }}>{productType.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {productType.status === 1 ? "Normal" : "Delete"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {productType.menuClick}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <UpdateModal productType={productType} />
                    <button
                      onClick={() => deleteItemCat(productType.cid)}
                      className="btn btn-danger btn-sm"
                    >
                      {/* 删除 */}Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Paging categoryData={productTypes} fetchCategory={fetchProductType} />
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
)(ProductType);
