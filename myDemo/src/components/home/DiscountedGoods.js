import { View, Image, Text, StyleSheet } from "react-native";
import Card from "../Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../../redux/constant";

function DiscountedGoods() {
  const [discountedItems, setDiscountedItems] = useState();

  async function fetchDiscountedItems() {
    let response = await axios.get(`${BASE_URI}/discountedItems`);
    setDiscountedItems(response.data);
  }

  useEffect(() => {
    fetchDiscountedItems();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        margin: 10,
        marginTop: 0,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Discounted Commodity
      </Text>

      <View style={styles.row}>
        {discountedItems &&
          discountedItems.map((discountedItem, index) => (
            <Card
              key={index}
              imageSource={{
                uri: `${BASE_URI}/img/${discountedItem.image}`,
              }}
              text={discountedItem.name}
              price={discountedItem.shopPrice}
              itemId={discountedItem.id}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default DiscountedGoods;
