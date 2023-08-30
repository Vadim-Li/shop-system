import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import produce from "immer";
import { connect } from "react-redux";
import axios from "axios";
import { Navigate, NavLink } from "react-router-dom";

function Cart({ loginUser }) {
  const [goods, setGoods] = useState();

  function fetchGoods() {
    axios
      .get(`http://localhost:8080/item/getItemByUser/${loginUser.data.uid}`)
      .then(response => {
        setGoods(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (loginUser.code === 200) {
      fetchGoods();
    }
  }, []);

  function updateCount(cartId, count) {
    axios
      .put(`http://localhost:8080/cart/updateCount`, {
        cartId,
        count
      })
      .then(response => {
        fetchGoods();
      })
      .catch(error => {
        console.log(error);
      });
  }

  function deleteCart(cartId) {
    axios
      .delete(`http://localhost:8080/cart/delete/${cartId}`)
      .then(response => {
        fetchGoods();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const [isAllSelect, setIsAllSelect] = useState(false);

  const updateNum = (cartId, index, num) => {
    if (goods[index].cart.count + num === 0) {
      return;
    }
    updateCount(cartId, goods[index].cart.count + num);
    //以不可变数据的方式更新
    // const newDraft = produce(goods, draft => {
    //   draft[index].num += num;
    // });
    // setGoods(newDraft);
  };

  const allSelectChange = () => {
    setIsAllSelect(!isAllSelect);

    const newDraft = produce(goods, draft => {
      draft.forEach(item => {
        item.select = !isAllSelect;
      });
    });

    setGoods(newDraft);
  };

  const singleSelect = index => {
    const newDraft = produce(goods, draft => {
      draft[index].select = !goods[index].select;
    });
    setIsAllSelect(newDraft.every(item => item.select));
    setGoods(newDraft);
  };

  if (loginUser.code !== 200) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="py-5" style={{ backgroundColor: "#F5F5F5" }}>
      <Container style={{ width: "90%" }}>
        <Table>
          <thead className="mb-5">
            <tr style={{ textAlign: "center" }}>
              <th>
                全选：
                <input
                  checked={isAllSelect}
                  onChange={allSelectChange}
                  type="checkbox"
                  name=""
                  id=""
                />
              </th>
              <th>商品信息</th>
              <th>单价（元）</th>
              <th>数量</th>
              <th>金额（元）</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {goods &&
              goods.map((item, index) => (
                <tr key={index}>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    <input
                      onChange={() => singleSelect(index)}
                      checked={item.select}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                  <td className="py-3">
                    <NavLink
                      to={`/detail?id=${item.id}&cid=${item.cid}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Image
                        src={require("../img/" + item.image)}
                        style={{ width: "113px", marginRight: "30px" }}
                      />
                      {item.name}
                    </NavLink>
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {item.shopPrice}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    <ButtonGroup>
                      <InputGroup>
                        <InputGroup.Text
                          id="btnGroupAddon"
                          style={{
                            border: "1px solid black",
                            borderRadius: "0px",
                            width: "32px",
                            height: "32px",
                            backgroundColor: "white"
                          }}
                          onClick={() => updateNum(item.cart.cartId, index, -1)}
                        >
                          -
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          aria-label="Input group example"
                          aria-describedby="btnGroupAddon"
                          style={{
                            border: "1px solid black",
                            width: "54px",
                            height: "32px",
                            textAlign: "center"
                          }}
                          value={item.cart.count}
                          onChange={e =>
                            updateCount(item.cart.cartId, e.target.value)
                          }
                        />
                        <InputGroup.Text
                          id="btnGroupAddon"
                          style={{
                            border: "1px solid black",
                            borderRadius: "0px",
                            width: "32px",
                            height: "32px",
                            backgroundColor: "white",
                            paddingLeft:"9px"
                          }}
                          onClick={() => updateNum(item.cart.cartId, index, 1)}
                        >
                          +
                        </InputGroup.Text>
                      </InputGroup>
                    </ButtonGroup>
                    {/* <button onClick={() => updateNum(index, -1)}>-</button>
                  {item.num}
                  <button onClick={() => updateNum(index, 1)}>+</button> */}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    {item.cart.count * item.shopPrice}
                  </td>
                  <td className="pt-5" style={{ textAlign: "center" }}>
                    <i
                      className="fa fa-trash-o"
                      onClick={() => deleteCart(item.cart.cartId)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4}></th>
              {/* <th colspan={1}></th> */}
              <th colSpan={2} style={{ padding: "0px", textAlign: "right" }}>
                已选商品
                <span style={{ color: "#D63017" }}>
                  {goods &&
                    goods
                      .filter(item => item.select)
                      .reduce((total, item) => (total += item.cart.count), 0)}
                </span>
                件 总价：
                <span style={{ color: "#D63017" }}>
                  {goods &&
                    goods
                      .filter(item => item.select)
                      .reduce(
                        (total, item) =>
                          (total += item.cart.count * item.shopPrice),
                        0
                      )}
                </span>
                <Button
                  size="lg"
                  style={{
                    borderRadius: "0px",
                    backgroundColor: "#D63017",
                    width: "200px",
                    height: "56px",
                    marginLeft: "30px"
                  }}
                >
                  去结算
                </Button>
              </th>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  state => ({
    loginUser: state.login
  }),
  mapDispatchToProps
)(Cart);
