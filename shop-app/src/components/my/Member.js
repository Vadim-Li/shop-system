import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Member() {
  return (
    <View
      style={{
        backgroundColor: "#ffd04b",
        margin: 10,
        borderRadius: 10,
        paddingBottom:10
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          <FontAwesome name="diamond" size={20} color="white" />
          明日更新会员
        </Text>
      </View>

      <View style={{ flexDirection: "row", padding: 10 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: "48%",
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 20,
              }}
            >
              昊金星球
            </Text>
            <Text style={{ color: "red", marginLeft: 10, marginBottom: 20,fontSize:12 }}>
              21昊金待领取
            </Text>
          </View>
          <Ionicons
            style={{ color: "blue", marginLeft: "8%", marginTop: 15 }}
            name="planet"
            size={50}
            color="black"
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: "48%",
            flexDirection: "row",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 20,
              }}
            >
              昊金商城
            </Text>
            <Text style={{ color: "red", marginLeft: 10, marginBottom: 20,fontSize:12 }}>
              买前先兑卷
            </Text>
          </View>
          <MaterialIcons
            style={{ marginLeft: "15%", marginTop: 15 }}
            name="local-mall"
            size={50}
            color="orange"
          />
        </View>
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
  },

  orderItem: {
    marginRight: "4%",
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default Member;
