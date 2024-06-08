import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { LOGIN_FAILURE } from "../../redux/constant";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URI } from "../../redux/constant";

function Settings({ navigation, signOut, loginUser }) {
  return (
    <ScrollView>
      {loginUser.code !== 200 ? null : ( // navigation.navigate("My")
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
              alignItems: "center",
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${BASE_URI}/img/item1.jpg`,
                }}
                style={styles.image}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={styles.text}
                onPress={() => navigation.navigate("Digital")}
              >
                {loginUser.data.name}
              </Text>
              <Text
                style={styles.text}
                onPress={() => navigation.navigate("Digital")}
              >
                username:{loginUser.data.username}
              </Text>
            </View>
            <AntDesign
              name="right"
              style={{
                marginLeft: "auto",
              }}
              size={16}
              color="lightgrey"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
            }}
          >
            <Text>Secret mobile phone number</Text>
            {/* <Text style={{ marginLeft: 30 }}>{itemData.name}</Text> */}
            <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 15,
              // borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
            }}
          >
            <Text>Shipping address</Text>
            <AntDesign
              name="right"
              style={{ marginLeft: "auto" }}
              size={16}
              color="lightgrey"
            />
          </View>
        </View>
      )}

      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{}} onPress={() => navigation.navigate("Digital")}>
              Push message
            </Text>
            <Text
              style={{ color: "grey" }}
              onPress={() => navigation.navigate("Digital")}
            >
              Do not disturb time: 23:00-8:00 the next day
            </Text>
          </View>
          <AntDesign
            name="right"
            style={{
              marginLeft: "auto",
            }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Privacy setting</Text>
          {/* <Text style={{ marginLeft: 30 }}>{itemData.name}</Text> */}
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            // borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Tanghao Mall Privacy Policy</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{}} onPress={() => navigation.navigate("Digital")}>
              About the mall
            </Text>
          </View>
          <AntDesign
            name="right"
            style={{
              marginLeft: "auto",
            }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Feedback</Text>
          {/* <Text style={{ marginLeft: 30 }}>{itemData.name}</Text> */}
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Agreement rules</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Qualification certificate</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Personal information collection and use list</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>List of third-party sharing of personal information</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Tanghao Mall User Agreement</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Tang Hao Account User Agreement</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Text>Tang Hao Account Privacy Policy</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>
      </View>
      {loginUser.code !== 200 ? null : ( // navigation.navigate("My")
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <Button
            title="sign out"
            color={"lightgrey"}
            onPress={() => signOut()}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    // marginLeft: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // 使图片成圆形
    overflow: "hidden",
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    },
  };
}

export default connect(
  (state) => ({
    loginUser: state.login,
    itemBySearch: state.itemBySearch,
  }),
  mapDispatchToProps
)(Settings);
