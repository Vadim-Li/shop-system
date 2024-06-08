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
        <Text>Points</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>23</Text>
        <Text>Voucher</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>￥0</Text>
        <Text>Envelope</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.textItem}>￥20w</Text>
        <Text>Upper limit</Text>
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
        <Text>Wallet</Text>
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
