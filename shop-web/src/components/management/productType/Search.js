import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import PubSub from "pubsub-js";
import axios from "axios";
import AddModal from "./AddModal";
import { BASE_URI } from "../../../redux/constant";

function Search() {
  //获取用户的输入
  const name = useRef();

  const searchItemCat = (pageNum) => {
    //发送网络请求
    axios
      .post(`${BASE_URI}/itemCat/getItemCatByLike/${pageNum}`, {
        name: name.current.value,
      })
      .then((response) => {
        PubSub.publish("searchItemCat", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <InputGroup className="mb-3" style={{ width: "400px" }}>
      <Form.Control
        placeholder="Please enter name"
        ref={name}
        style={{ borderRadius: "0px" }}
      />

      <InputGroup.Text
        style={{
          backgroundColor: "#FFC107",
          borderRadius: "0px",
          cursor: "pointer",
        }}
        id="basic-addon2"
        onClick={() => {
          searchItemCat(1);
        }}
      >
        {/* 搜索 */}Search
      </InputGroup.Text>

      <AddModal />
    </InputGroup>
  );
}

export default Search;
