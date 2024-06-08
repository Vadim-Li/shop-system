import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function MyOrder() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        margin: 10,
        marginTop: 5,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          My Order
        </Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Non-Payment");
          }}
        >
          <AntDesign name="wallet" size={24} color="black" />
          <Text style={styles.text}>Pending payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons
            name="truck-fast-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>Awaiting receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>Awaiting evaluation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <FontAwesome name="exchange" size={24} color="black" />
          <Text style={styles.text}>Return or exchange/After-sales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => {
            navigation.navigate("AllOrders");
          }}
        >
          <SimpleLineIcons name="notebook" size={24} color="black" />
          <Text style={styles.text}>All orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20,
    // paddingLeft: 10,
    paddingRight: 10,
  },

  orderItem: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default MyOrder;
