import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Button,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Carouselpho from "./Carouselpho";
import HotCommodity from "./HotCommodity";
import DiscountedGoods from "./DiscountedGoods";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { createSearchAction } from "../../redux/actions/search";
import { BASE_URI } from "../../redux/constant";

function Home({ searchName }) {
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const searchItem = () => {
    searchName(name, 1);
    navigation.navigate("SearchList");
    // PubSub.publish("name", name.current.value);
  };
  return (
    <ScrollView>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "black",
          paddingTop: 15,
          paddingBottom: 10,
        }}
      >
        <Image
          style={{ width: "35%", marginLeft: 10 }}
          source={{
            uri: `${BASE_URI}/img/logo-pvpmall.png`,
          }}
          // source={require("../../img/logo-pvpmall.png")}
        />
        {/* <Text style={{ color: "white", paddingTop: 42 }}>VMALL</Text> */}
        <TextInput
          style={styles.input}
          placeholder="请输入想要找的宝贝"
          maxLength={11}
          keyboardType="default"
          inputStyle={{ color: "#333" }}
          returnKeyLabel="Search"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={searchItem}
        />

        {/* <View style={{ paddingTop: 35,marginRight:10}}>
          <Button
            title="login"
            color="#ffd04b"
            onPress={() => Alert.alert("Simple Button pressed")}
          />
        </View> */}
      </View>
      {/* 导航栏 */}
      <View style={{ flexDirection: "row", backgroundColor: "black" }}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.navigate("Figure")}
            color="black"
            title="figure"
            uppercase={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.navigate("Digital")}
            color="black"
            title="digital"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.navigate("Clothe")}
            color="black"
            title="clothe"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.navigate("Pillow")}
            color="black"
            title="pillow"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.navigate("Daily")}
            color="black"
            title="daily"
          />
        </View>
      </View>

      <Carouselpho />

      <HotCommodity />

      <DiscountedGoods />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    marginTop: 35,
    borderRadius: 20,
    flex: 2,
    backgroundColor: "white",
    marginLeft: 15,
    marginRight: 15,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    },
    searchName: (name, pageNum) => {
      //通知redux执行搜索
      dispatch(createSearchAction(name, pageNum));
    },
  };
}

export default connect(
  (state) => ({
    loginUser: state.login,
    itemBySearch: state.itemBySearch,
  }),
  mapDispatchToProps
)(Home);
