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

function Wallet() {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>0</Text>
        <Text>昊金</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>23</Text>
        <Text>优惠卷</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>0元</Text>
        <Text>红包</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>20万元</Text>
        <Text>最高额度</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <AntDesign
          style={{ marginBottom: 3 }}
          name="wallet"
          size={24}
          color="black"
        />
        <Text>钱包</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  orderItem: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  textItem: {
    marginBottom: 8,
  },
});

export default Wallet;
