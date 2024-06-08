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
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function MyServices() {
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
          My Services
        </Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Entypo name="shield" size={24} color="purple" />
          <Text style={styles.text}>Official after-sales service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <AntDesign name="customerservice" size={24} color="blue" />
          <Text style={styles.text}>Contact Customer Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <FontAwesome5 name="store" size={24} color="orange" />
          <Text style={styles.text}>service store</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="blue" />
          <Text style={styles.text}>Supplementary Purchase Guarantee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons
            name="account-wrench-outline"
            size={24}
            color="purple"
          />
          <Text style={styles.text}>I want repair</Text>
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
  text:{
    textAlign:"center"
  }
});

export default MyServices;
