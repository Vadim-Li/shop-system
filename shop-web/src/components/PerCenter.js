import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import produce from "immer";
import { connect } from "react-redux";
import axios from "axios";
import { Navigate, NavLink } from "react-router-dom";
import { BASE_URI } from "../redux/constant";
import { BASEPAY_URI } from "../redux/constant";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";

function PerCenter({ loginUser }) {
  return (
    <div className="py-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Table className="table table-bordered table-hover ">
          <thead>
            <tr className="table-danger" style={{ textAlign: "center" }}>
              <th>Username</th>
              <th>Password</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>{loginUser.data.username}</td>
              <td style={{ textAlign: "center" }}>{loginUser.data.password}</td>
              <td style={{ textAlign: "center" }}>{loginUser.data.name}</td>
              <td style={{ textAlign: "center" }}>{loginUser.data.email}</td>
              <td style={{ textAlign: "center" }}>
                {loginUser.data.telephone}
              </td>
              <td style={{ textAlign: "center" }}>
                {loginUser.data.role === 0 ? "Administrator" : "User"}
              </td>
            </tr>
          </tbody>
        </Table>
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
)(PerCenter);
