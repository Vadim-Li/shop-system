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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URI } from "../redux/constant";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    axios
      .post(`${BASE_URI}/user/save`, {
        username: username,
        password: password,
        name: name,
        email: email,
        telephone: phone,
      })
      .then((response) => {
        showAddSuccess();
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showAddSuccess = () => {
    ToastAndroid.showWithGravity(
      "Register Successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "40%", marginLeft: 10, marginBottom: 20 }}
        source={require("../img/logo-pvpmall.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <Button title="Register" color={"orange"} onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
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

export default Register;
