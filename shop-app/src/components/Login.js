import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import { createVerifyAction } from "../redux/actions/login";
import { isFirst, noFirst } from "../redux/actions/first";

const Login = ({
  navigation,
  verifyName,
  loginUser,
  isFirst,
  isNoFirst,
  firstTm,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isFirst();
  }, []);

  const handleLogin = () => {
    verifyName(username, password);
    isNoFirst();
  };
  const showAddWrong = () => {
    ToastAndroid.showWithGravity(
      "Wrong username or password",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <View style={styles.container}>
      {firstTm
        ? null
        : loginUser.code === 200
        ? navigation.navigate("My")
        : showAddWrong()}
      {/* <Text style={styles.title}>Login</Text> */}
      <Image
        style={{ width: "40%", marginLeft: 10, marginBottom: 20 }}
        source={require("../img/logo-pvpmall.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" color={"orange"} onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "20%",
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
});

function mapStateToProps(state) {
  return {
    loginUser: state.login,
    firstTm: state.first,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    verifyName: (username, password) => {
      //通知redux执行搜索
      dispatch(createVerifyAction(username, password));
    },
    isFirst: () => {
      dispatch(isFirst());
    },
    isNoFirst: () => {
      dispatch(noFirst());
    },
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Login);
