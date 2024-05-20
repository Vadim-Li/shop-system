import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Pressable,
  Alert,
  Modal,
  ToastAndroid
} from "react-native";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { connect } from "react-redux";
import axios from "axios";
import { produce } from "immer";
import CheckBox from "react-native-check-box";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URI } from "../redux/constant";
import { BASEPAY_URI } from "../redux/constant";
import QRCode from "react-native-qrcode-svg";

function Cart({ navigation, loginUser }) {
  const [goods, setGoods] = useState();

  async function fetchGoods() {
    try {
      let response = await axios.get(
        `${BASE_URI}/item/getItemByUser/${loginUser.data.uid}`
      );

      setGoods(response.data);

      if (response.data && response.data.length > 0) {
        setPayOrder((prevPayOrder) => ({
          ...prevPayOrder,
          productId: response.data[0].id || "",
        }));
      } else {
        // 处理数组为空的情况，可以设置默认值或采取其他适当的措施
        // 例如，设置默认值为一个特定的 ID 或为空字符串
        setPayOrder((prevPayOrder) => ({
          ...prevPayOrder,
          productId: "defaultProductId",
        }));
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }

  useEffect(() => {
    if (loginUser.code === 200) {
      fetchGoods();
    }
  }, []);

  function updateCount(cartId, count) {
    axios
      .put(`${BASE_URI}/cart/updateCount`, {
        cartId,
        count,
      })
      .then((response) => {
        fetchGoods();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteCart(cartId) {
    axios
      .delete(`${BASE_URI}/cart/delete/${cartId}`)
      .then((response) => {
        fetchGoods();
      })
      .catch((error) => {
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

    const newDraft = produce(goods, (draft) => {
      draft.forEach((item) => {
        item.select = !isAllSelect;
      });
    });

    setGoods(newDraft);
  };

  const singleSelect = (index) => {
    const newDraft = produce(goods, (draft) => {
      draft[index].select = !goods[index].select;
    });
    setIsAllSelect(newDraft.every((item) => item.select));
    setGoods(newDraft);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      if (loginUser.code === 200) {
        fetchGoods();
      }
    }, 2000);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [payBtnDisabled, setPayBtnDisabled] = useState(false);
  const [codeDialogVisible, setCodeDialogVisible] = useState(false);
  const [payOrder, setPayOrder] = useState({
    productId: "",
    payType: "wxpay",
  });
  const [codeUrl, setCodeUrl] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [timer, setTimer] = useState(null);

  const selectItem = (productId) => {
    console.log("商品id：" + productId);
    setPayOrder((prevPayOrder) => ({
      ...prevPayOrder,
      productId,
    }));
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Please login first",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const toPay = async () => {
    if (loginUser.code !== 200) {
      showToastWithGravity();
      navigation.navigate("Login");
    } else {
      setPayBtnDisabled(true);
      console.log(payOrder);
      if (payOrder.payType === "wxpay") {
        try {
          const response = await axios.post(
            `${BASEPAY_URI}/api/wx-pay/native/${payOrder.productId}/${loginUser.data.uid}`
          );
          console.log(response);
          setCodeUrl(response.data.data.codeUrl);
          setOrderNo(response.data.data.orderNo);

          setCodeDialogVisible(true);

          setTimer(
            setInterval(() => {
              queryOrderStatus(response.data.data.orderNo);
            }, 3000)
          );
        } catch (error) {
          console.error("Error during wxPayApi.nativePay:", error);
          setPayBtnDisabled(false);
        }
      }
      setModalVisible(true);
    }
  };

  const closeDialog = () => {
    console.log("close.................");
    setPayBtnDisabled(false);
    console.log("清除定时器");
    clearInterval(timer);
  };

  const queryOrderStatus = async (orderNo1) => {
    try {
      // const response = await orderInfoApi.queryOrderStatus(orderNo);
      const response = await axios.get(
        `${BASEPAY_URI}/api/order-info/query-order-status/${orderNo1}`
      );
      console.log("查询订单状态：" + response.data.code);

      if (response.code === 0) {
        console.log("清除定时器");
        clearInterval(timer);

        setTimeout(() => {
          // Redirect to success page after 3 seconds
          // history.push('/success');
          // navigate("/success");
          setModalVisible(false);
          Alert.alert("支付成功！");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during orderInfoApi.queryOrderStatus:", error);
    }
  };

  return (
    <View style={styles.containerBottom}>
      <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loginUser.code !== 200 ? null : (
          <View style={styles.container}>
            <CheckBox
              style={{
                padding: 10,
                justifyContent: "center",
              }}
              onClick={allSelectChange}
              isChecked={isAllSelect}
              rightText={"全选"}
              checkedCheckBoxColor={"grey"}
            />
            {goods &&
              goods.map((item, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <CheckBox
                    style={{
                      padding: 10,
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                    onClick={() => {
                      singleSelect(index);
                      if (!item.select) {
                        selectItem(item.id);
                      }
                    }}
                    isChecked={item.select}
                    checkedCheckBoxColor={"grey"}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", {
                        itemId: item.id,
                      });
                    }}
                  >
                    <Image
                      source={{
                        uri: `${BASE_URI}/img/${item.image}`,
                      }}
                      style={styles.image}
                    />
                  </TouchableOpacity>

                  <View style={{ flex: 1, marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Detail", {
                          itemId: item.id,
                        });
                      }}
                    >
                      <Text style={styles.text}>
                        {item.name.length > 10
                          ? item.name.slice(0, 10) + "..."
                          : item.name}
                        {/* {item.name} */}
                      </Text>
                      <Text style={{ color: "orange" }}>
                        ￥{item.shopPrice}
                      </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.container2}>
                        <Button
                          title="-"
                          color={"grey"}
                          onPress={() => updateNum(item.cart.cartId, index, -1)}
                        />
                        <TextInput
                          style={styles.input}
                          value={`${item.cart.count}`}
                          onChangeText={(e) =>
                            updateCount(item.cart.cartId, e.target.value)
                          }
                          // value={quantity.toString()}
                          // onChangeText={(text) => {
                          //   if (!isNaN(text)) {
                          //     setQuantity(parseInt(text, 10));
                          //   }
                          // }}
                        />
                        <Button
                          title="+"
                          color={"grey"}
                          onPress={() => updateNum(item.cart.cartId, index, 1)}
                        />
                      </View>
                      <Text
                        style={{ marginLeft: "30%", marginTop: 25 }}
                        onPress={() => deleteCart(item.cart.cartId)}
                      >
                        {/* <Ionicons
                          name="settings-outline"
                          size={24}
                          color="black"
                        /> */}
                        <FontAwesome name="trash-o" size={24} color="black" />
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.bottom}>
        {/* <Text style={styles.text}>这是一个固定在底部的组件</Text> */}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginLeft: "35%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "2%",
              // backgroundColor:"blue"
            }}
          >
            total:￥
            {goods &&
              goods
                .filter((item) => item.select)
                .reduce(
                  (total, item) => (total += item.cart.count * item.shopPrice),
                  0
                )}
          </Text>
          <View style={{ flex: 1, marginLeft: "3%" }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <QRCode value={codeUrl} size={200} />
                  <Text style={styles.modalText}>使用微信扫码支付</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      closeDialog();
                    }}
                  >
                    <Text style={styles.textStyle}>close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <Button
              disabled={payBtnDisabled}
              onPress={() => {
                toPay();
              }}
              color="orange"
              title="settlement"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    marginLeft: 0,
  },

  text: {
    fontSize: 16,
  },

  container2: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    width: 80,
    marginTop: 20,
  },
  input: {
    flex: 1,
    textAlign: "center",
  },

  containerBottom: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 10,
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
  return {};
}

export default connect(
  (state) => ({
    loginUser: state.login,
  }),
  mapDispatchToProps
)(Cart);
