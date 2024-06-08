import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { LOGIN_FAILURE } from "../../redux/constant";
import { AntDesign } from "@expo/vector-icons";
import { BASE_URI } from "../../redux/constant";
import { BASEPAY_URI } from "../../redux/constant";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";

function AllOrders({ navigation, signOut, loginUser }) {
  const [orders, setOrders] = useState();

  const [list, setList] = useState([]);
  const [refundDialogVisible, setRefundDialogVisible] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [reason, setReason] = useState("");
  const [refundSubmitBtnDisabled, setRefundSubmitBtnDisabled] = useState(false);

  async function fetchOrders() {
    let response = await axios.get(
      `${BASEPAY_URI}/api/order-info/listByUser/${loginUser.data.uid}`
    );

    let res = await axios.get(`${BASE_URI}/item/getAllItem`);

    const result = response.data.data.list.map((item, index) => {
      for (let j = 0; j < res.data.length; j++) {
        if (item.productId === res.data[j].id) {
          item.img = res.data[j].image;
          return item;
        }
      }
    });
    setOrders(result);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function deleteOrder(orderId) {
    axios
      .delete(`${BASEPAY_URI}/api/order-info/delete/${orderId}`)
      .then((response) => {
        fetchOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const cancelOrder = (orderNo) => {
    axios
      .post(`${BASEPAY_URI}/api/wx-pay/cancel/${orderNo}`)
      .then((response) => {
        Alert.alert(response.data.message);
        fetchOrders();
      });
  };

  const handleRefund = (orderNo) => {
    setRefundDialogVisible(true);
    setOrderNo(orderNo);
  };

  const handleRefundClose = () => {
    setRefundDialogVisible(false);
    setOrderNo("");
    setReason("");
    setRefundSubmitBtnDisabled(false);
  };

  const handleRefundSubmit = () => {
    setRefundSubmitBtnDisabled(true);

    axios
      .post(`${BASEPAY_URI}/api/wx-pay/refunds/${orderNo}/${reason}`)
      .then((response) => {
        console.log("response", response);
        handleRefundClose();
        showOrderList();
      });
  };

  return (
    <ScrollView>
      {loginUser.code !== 200 ? null : (
        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("../../img/logo-small.png")}
                style={styles.image}
              />
            </View>

            <Text
              style={{
                fontWeight: "bold",
                marginTop: 20,
                fontSize: 16,
              }}
            >
              Tang Hao Mall
            </Text>

            {/* <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            /> */}
          </View>
          {orders &&
            orders.map((order, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("Detail", {
                    itemId: order.productId,
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                    //   alignItems: "center",
                  }}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: `${BASE_URI}/img/${order.img}`,
                      }}
                      style={styles.image}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{order.title}</Text>
                    <Text style={{ color: "orange", marginTop: 10 }}>
                      ￥{order.totalFee}
                    </Text>
                  </View>
                  <View style={{ width: 80 }}>
                    {/* <Text
                      style={{
                        textAlign: "center",
                        color: "orange",
                      }}
                    >
                      {order.orderStatus}
                    </Text> */}
                    {order.orderStatus === "未支付" && (
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "orange",
                          }}
                        >
                          Unpaid
                        </Text>
                        <Button
                          onPress={() => cancelOrder(order.orderNo)}
                          title="Cancel"
                        />
                      </View>
                    )}
                    {order.orderStatus === "超时已关闭" && (
                      <TouchableOpacity
                        onPress={() => {
                          deleteOrder(order.id);
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "orange",
                          }}
                        >
                          Timeout is off
                        </Text>
                        <FontAwesome
                          name="trash-o"
                          size={24}
                          color="black"
                          style={{ textAlign: "center", marginTop: 10 }}
                        />
                      </TouchableOpacity>
                    )}
                    {order.orderStatus === "用户已取消" && (
                      <TouchableOpacity
                        onPress={() => {
                          deleteOrder(order.id);
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "orange",
                          }}
                        >
                          User canceled
                        </Text>
                        <FontAwesome
                          name="trash-o"
                          size={24}
                          color="black"
                          style={{ textAlign: "center", marginTop: 10 }}
                        />
                      </TouchableOpacity>
                    )}
                    {order.orderStatus === "支付成功" && (
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "orange",
                          }}
                        >
                          Payment successful
                        </Text>
                        <Button
                          onPress={() => handleRefund(order.orderNo)}
                          title="Refund"
                        />
                      </View>
                    )}
                    {order.orderStatus === "退款中" && (
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "orange",
                          }}
                        >
                          Refunding
                        </Text>
                      </View>
                    )}
                    {order.orderStatus === "已退款" && (
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "orange",
                          }}
                        >
                          Refunded
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}

          <Modal visible={refundDialogVisible} transparent>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{ position: "absolute", top: 5, right: 10 }}
                  onPress={handleRefundClose}
                >
                  <Text style={{ fontSize: 20 }}>&times;</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>
                  Refund dialog box
                </Text>
                <Text style={{ marginBottom: 5 }}>Reason for return:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <ModalDropdown
                    options={["Please select a reason for refund", "Dislike", "Buy the wrong"]}
                    defaultValue="Please select a reason for refund"
                    onSelect={(index, value) => setReason(value)}
                    textStyle={{ fontSize: 16 }}
                    dropdownStyle={{ width: 200 }}
                  />
                  <AntDesign
                    name="caretdown"
                    style={{
                      marginLeft: 3,
                    }}
                    size={12}
                    color="black"
                  />
                </View>

                <Button
                  title="Sure"
                  onPress={handleRefundSubmit}
                  disabled={refundSubmitBtnDisabled}
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    // marginLeft: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10, // 使图片成圆形
    overflow: "hidden",
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    },
  };
}

export default connect(
  (state) => ({
    loginUser: state.login,
    itemBySearch: state.itemBySearch,
  }),
  mapDispatchToProps
)(AllOrders);
