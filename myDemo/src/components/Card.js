import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ imageSource, text, price, itemId }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", {
            itemId: itemId,
          });
        }}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={{ marginTop: 10, fontSize: 16 }}>{text}</Text>
        <Text style={{ marginTop: 10, fontSize: 16, color: "orange" }}>
          ¥{price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "50%", // 每行两个卡片，所以宽度为50%
    padding: 10,
    // backgroundColor:"white",
    // marginLeft:10,
    // marginTop:10,
    // borderRadius:10
    // borderWidth:1,
    // borderColor:"red",
    // marginRight:10
  },
  image: {
    width: "100%",
    height: 200, // 根据需要调整图片的高度
    borderRadius: 10,
  },
});

export default Card;
