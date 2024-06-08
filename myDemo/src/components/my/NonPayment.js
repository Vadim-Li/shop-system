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
} from "react-native";
import { connect } from "react-redux";
import { LOGIN_FAILURE } from "../../redux/constant";
import { AntDesign } from "@expo/vector-icons";
import { BASE_URI } from "../../redux/constant";
import { BASEPAY_URI } from "../../redux/constant";
import React, { useState, useEffect } from "react";
import axios from "axios";

function NonPayment({ navigation, signOut, loginUser }) {
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

  const cancelOrder = (orderNo) => {
    axios
      .post(`${BASEPAY_URI}/api/wx-pay/cancel/${orderNo}`)
      .then((response) => {
        Alert.alert(response.data.message);
        showOrderList();
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
                // source={{
                //   uri: `${BASE_URI}/img/item1.jpg`,
                // }}
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
            orders
              .filter((order, index) => {
                return order.orderStatus === "未支付";
              })
              .map((order, index) => (
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
                            title="取消"
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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
)(NonPayment);
