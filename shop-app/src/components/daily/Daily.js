import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Card from "../Card";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createCategoryAction } from "../../redux/actions/category";
import { BASE_URI } from "../../redux/constant";

function Daily({ navigation, categoryData, fetchCategory }) {
  useEffect(() => {
    fetchCategory(5);
  }, []);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 10 }}>
        <Text>Home </Text>
        <Text>&gt; </Text>
        <Text>生活用品</Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          margin: 10,
          paddingTop: 10,
          // marginTop: 0,
          borderRadius: 10,
        }}
      >
        <View style={styles.row}>
          {categoryData &&
            categoryData.map((daily, index) => (
              <Card
                key={index}
                // imageSource={require("../../img/item1.jpg")}
                imageSource={{
                  uri: `${BASE_URI}/img/${daily.image}`,
                }}
                text={daily.name}
                price={daily.shopPrice}
                itemId={daily.id}
              />
            ))}
        </View>
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

function mapStateToProps(state) {
  return {
    categoryData: state.category,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategory: (cid) => {
      //通知redux执行搜索
      dispatch(createCategoryAction(cid));
    },
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
