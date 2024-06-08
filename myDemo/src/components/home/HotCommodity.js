import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import Card from "../Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../../redux/constant";

function HotCommodity() {
  const [hotCommoditys, setHotCommoditys] = useState();

  function fetchHotCommodity() {
    axios
      .get(`${BASE_URI}/hotItems`)
      .then((response) => {
        setHotCommoditys(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchHotCommodity();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://http://192.168.115.36:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      // 收到后端发送的WebSocket消息
      console.log("Received message from server:", event.data);
      // 在收到消息后，触发相应的更新页面的逻辑
      // 这里可以触发页面刷新或更新数据等操作
      fetchHotCommodity();
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        margin: 10,
        marginTop: 10,
        borderRadius: 10,
      }}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Hot Commodity
        </Text>
      </View>

      <View style={styles.row}>
        {hotCommoditys &&
          hotCommoditys.map((hotCommodity, index) => (
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default HotCommodity;
