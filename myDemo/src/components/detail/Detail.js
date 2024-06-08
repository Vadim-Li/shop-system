import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { createItemAction } from "../../redux/actions/item";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URI } from "../../redux/constant";
import { BASEPAY_URI } from "../../redux/constant";
import QRCode from "react-native-qrcode-svg";

function Detail({
  route,
  navigation,
  itemData,
  fetchItem,
  itemCatData,
  fetchItemCat,
  loginUser,
}) {
  const { itemId } = route.params;

  const screenHeight = Dimensions.get("window").height; // 获取屏幕高度

  useEffect(() => {
    if (itemId !== null) {
      fetchItem(itemId);
      selectItem(itemId);
    }
    // if (cid !== null) {
    //   fetchItemCat(cid);
    // }
  }, []);

  function addToCart(id, number) {
    if (loginUser.code !== 200) {
      showToastWithGravity();
      navigation.navigate("Login");
    } else {
      axios
        .post(`${BASE_URI}/cart/saveCart`, {
          uid: loginUser.data.uid,
          id,
          count: number,
        })
        .then((response) => {
          showAddSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Please login first",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const showAddSuccess = () => {
    ToastAndroid.showWithGravity(
      "Add to Cart Successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

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

  const toPay = async () => {
    if (loginUser.code !== 200) {
      showToastWithGravity();
      navigation.navigate("Login");
    } else {
      setPayBtnDisabled(true);
      if (payOrder.payType === "wxpay") {
        try {
          const response = await axios.post(
            `${BASEPAY_URI}/api/wx-pay/native/${payOrder.productId}/${loginUser.data.uid}`
          );
          setCodeUrl(response.data.data.codeUrl);
          setOrderNo(response.data.data.orderNo);
          console.log(codeUrl);

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
          setModalVisible(!modalVisible);
          Alert.alert("支付成功！");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during orderInfoApi.queryOrderStatus:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Image
          source={{
            uri: `${BASE_URI}/img/${itemData.image}`,
          }}
          style={styles.cardImage}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgrey",
            position: "absolute",
            marginLeft: 20,
            marginTop: 30,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "white",
            // margin: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              marginTop: 10,
              marginLeft: 10,
              color: "orange",
            }}
          >
            ￥{itemData.shopPrice}
          </Text>
          <Text
            style={{
              fontSize: 20,
              margin: 10,
              fontWeight: "700",
            }}
          >
            {itemData.name}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>instalments</Text>
            <Text style={{ marginLeft: 10 }}>
              As low as {itemData.shopPrice}×0 period
            </Text>
            <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>selected</Text>
            <Text style={{ marginLeft: 30 }}>{itemData.name}</Text>
            <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Deliver to</Text>
            <View>
              <Text style={{ marginLeft: 20 }}>Wuhan Hongshan District</Text>
              <Text style={{ marginLeft: 20, color: "grey" }}>
                Expected to ship within 5 days
              </Text>
            </View>
            <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 10,
              paddingBottom: 0,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>service</Text>
            {/* <Text style={{ marginLeft: 30, color: "grey" }}>
              <MaterialCommunityIcons name="sticker-check-outline" size={16} />
              Tang Hao Self-employment
            </Text> */}
            <Text style={{ marginLeft: 35, color: "grey" }}>
              <MaterialCommunityIcons name="sticker-check-outline" size={16} />
              Tang Hao delivers goods
            </Text>

            <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            />
          </View>
          <Text style={{ marginLeft: 92, color: "grey" }}>
            <MaterialCommunityIcons name="sticker-check-outline" size={16} />7
            days no reason to return
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            //   justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Product desciption
          </Text>
        </View>
        <Image
          source={{
            uri: `${BASE_URI}/img/${itemData.idesc}`,
          }}
          style={{ width: "100%", height: 1800 }}
        />
      </ScrollView>
      <View style={styles.bottom}>
        {/* <Text style={styles.text}>这是一个固定在底部的组件</Text> */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              marginRight: "2%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="home-outline" size={24} color="black" />
            {/* <Text>Home</Text> */}
          </TouchableOpacity>
          <View
            style={{
              marginRight: "2%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="customerservice" size={24} color="black" />
            {/* <Text>Chat</Text> */}
          </View>

          <TouchableOpacity
            style={{
              marginRight: "3%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("ShopingCart");
            }}
          >
            <AntDesign name="shoppingcart" size={24} color="black" />
            {/* <Text>Cart</Text> */}
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
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
                  <Text style={styles.modalText}>
                    Use WeChat scan code to pay
                  </Text>
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
              onPress={() => addToCart(itemData.id, 1)}
              color="orange"
              title="Add to cart"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              disabled={payBtnDisabled}
              onPress={() => {
                toPay();
              }}
              color="red"
              title="Buy now"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", // 适配你想要的卡片宽度
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginRight: 0,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 400, // 适配你想要的图片高度
  },

  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
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

function mapStateToProps(state) {
  return {
    itemData: state.item,
    itemCatData: state.itemCat,
    loginUser: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItem: (id) => {
      //通知redux执行搜索
      dispatch(createItemAction(id));
    },
    //   fetchItemCat: cid => {
    //     dispatch(createItemCatAction(cid));
    //   }
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
