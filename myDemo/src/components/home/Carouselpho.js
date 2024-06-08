import Swiper from "react-native-swiper";
import { View, Image, StyleSheet } from "react-native";
import { BASE_URI } from "../../redux/constant";

// const images = [
//   { uri: 'require("../img/logo-pvpmall.png")' },
//   { uri: 'require("../img/logo-small.png")' },
//   { uri: 'require("../img/logo.png")' },
//   // 添加更多图片
// ];

function Carouselpho() {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay // 自动播放
        style={styles.swiper}
        showsPagination // 显示分页器
      >
        {/* {images.map((image, index) => (
            <View key={index}>
              <Image style={styles.image} source={{uri:"https://img-home.csdnimg.cn/images/20230817060240.png"}} />
            </View>
          ))} */}
        <Image
          style={{
            // width: "100%",
            // height: "85%",
            flex: 1,
          }}
          source={{
            uri: `${BASE_URI}/img/banner1.jpg`,
          }}
          // source={require("../../img/banner1.jpg")}
        />
        <Image
          style={{
            // width: "100%",
            // height: "85%",
            flex: 1,
          }}
          source={{
            uri: `${BASE_URI}/img/banner2.jpg`,
          }}
          // source={require("../../img/banner2.jpg")}
        />
        <Image
          style={{
            // width: "100%",
            // height: "85%",
            flex: 1,
          }}
          source={{
            uri: `${BASE_URI}/img/banner3.jpg`,
          }}
          // source={require("../../img/banner3.jpg")}
        />
        <Image
          style={{
            // width: "100%",
            // height: "85%",
            flex: 1,
          }}
          source={{
            uri: `${BASE_URI}/img/banner4.jpg`,
          }}
          // source={require("../../img/banner4.jpg")}
        />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    height: 120, // 轮播图的高度
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Carouselpho;
