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
      {loginUser.code !== 200 ? (
        // navigation.navigate("My")
        null
      ) : (
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
            <Text>密保手机</Text>
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
            <Text>收货地址</Text>
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
              消息推送
            </Text>
            <Text
              style={{ color: "grey" }}
              onPress={() => navigation.navigate("Digital")}
            >
              免打扰时间:23:00-次日8:00
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
          <Text>隐私设置</Text>
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
          <Text>唐昊商城隐私政策</Text>
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
              关于商城
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
          <Text>意见反馈</Text>
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
          <Text>协议规则</Text>
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
          <Text>资质证照</Text>
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
          <Text>个人信息收集与使用清单</Text>
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
          <Text>个人信息第三方共享清单</Text>
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
          <Text>唐昊商城用户协议</Text>
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
          <Text>唐昊账号用户协议</Text>
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
          <Text>唐昊账号隐私政策</Text>
          <AntDesign
            name="right"
            style={{ marginLeft: "auto" }}
            size={16}
            color="lightgrey"
          />
        </View>
      </View>
      {loginUser.code !== 200 ? (
        // navigation.navigate("My")
        null
      ) : (
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <Button
            title="退出登录"
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
