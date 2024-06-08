import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import CircleImageWithText from "./CircleImageWithText";
import { connect } from "react-redux";
// import { createSearchAction } from "../redux/actions/search";
import { LOGIN_FAILURE } from "../../redux/constant";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import MyOrder from "./MyOrder";
import MyServices from "./MyServices";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Card from "../Card";
import axios from "axios";
import Wallet from "./Wallet";
import Member from "./Member";
import Carouselpho from "../home/Carouselpho";
import { BASE_URI } from "../../redux/constant";

function My({ navigation, loginUser, signOut, searchName }) {
  const [allGoods, setAllGoods] = useState();

  async function fetchAllGoods() {
    let response = await axios.get(`${BASE_URI}/item/getAllItem`);
    setAllGoods(response.data);
  }

  useEffect(() => {
    fetchAllGoods();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <CircleImageWithText
        imageSource="http://192.168.1.44:8080/img/item1.jpg"
        text="Login/Register >"
      /> */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginLeft: "70%" }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="qr-code-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: "3%" }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: "3%" }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${BASE_URI}/img/item1.jpg`,
            }}
            style={styles.image}
          />
        </View>
        {loginUser && loginUser.code === 200 ? (
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.text}>Welcome,{loginUser.data.name}!</Text>
            <Text style={styles.text}>username:{loginUser.data.username}</Text>
          </View>
        ) : (
          <View style={styles.textContainer}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Login")}
            >
              Login /&nbsp;
            </Text>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </View>
        )}
      </View>

      <Wallet />
      <Member />
      <MyOrder />
      <MyServices />

      <View
        style={{
          margin: 10,
          marginTop: 5,
          borderRadius: 10,
        }}
      >
        <Carouselpho />
      </View>

      <View style={styles.row}>
        {allGoods &&
          allGoods.map((hotCommodity, index) => (
            <Card
              key={index}
              imageSource={{
                uri: `${BASE_URI}/img/${hotCommodity.image}`,
              }}
              text={hotCommodity.name}
              price={hotCommodity.shopPrice}
              itemId={hotCommodity.id}
            />
          ))}
      </View>
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
    marginLeft: 20,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // 使图片成圆形
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
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
  }),
  mapDispatchToProps
)(My);
