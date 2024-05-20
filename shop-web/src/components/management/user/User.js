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

function User({ loginUser }) {
  const [users, setUsers] = useState([]);

  function fetchUser(pageNum) {
    axios
      .get(`${BASE_URI}/user/list/${pageNum}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUser(1);
  }, []);

  function deleteUser(userId) {
    axios
      .delete(`${BASE_URI}/user/delete/${userId}`)
      .then((response) => {
        fetchUser(1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    PubSub.subscribe("searchUser", (_, data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    const token = PubSub.subscribe("user.updated", () => {
      fetchUser(1);
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
              <th>Username</th>
              <th>Password</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>{/* 操作 */}Operation</th>
            </tr>
          </thead>

          <tbody>
            {users.list &&
              users.list.map((user, index) => (
                <tr key={user.uid}>
                  <td style={{ textAlign: "center" }}>{user.username}</td>
                  <td style={{ textAlign: "center" }}>{user.password}</td>
                  <td style={{ textAlign: "center" }}>{user.name}</td>
                  <td style={{ textAlign: "center" }}>{user.email}</td>
                  <td style={{ textAlign: "center" }}>{user.telephone}</td>
                  <td style={{ textAlign: "center" }}>
                    {user.role === 0 ? "Administrator" : "User"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <UpdateModal user={user} />
                    <button
                      onClick={() => deleteUser(user.uid)}
                      className="btn btn-danger btn-sm"
                    >
                      {/* 删除 */}Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Paging categoryData={users} fetchCategory={fetchUser} />
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
)(User);
