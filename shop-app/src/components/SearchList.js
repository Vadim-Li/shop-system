import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Card from "./Card";
import { connect } from "react-redux";
import { BASE_URI } from "../redux/constant";

function SearchList({ itemBySearch, loading, error, searchName }) {
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    // return <p>Error while fetching data</p>;
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  if (itemBySearch.length === 0) {
    return <Text>No data available</Text>;
  }
  return (
    <ScrollView>
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
          {itemBySearch.list &&
            itemBySearch.list.map((figure, index) => (
              <Card
                key={index}
                imageSource={{
                  uri: `${BASE_URI}/img/${figure.image}`,
                }}
                text={figure.name}
                price={figure.shopPrice}
                itemId={figure.id}
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

function mapDispatchToProps(dispatch) {
  return {
    searchName: (name, pageNum) => {
      //通知redux执行搜索
      dispatch(createSearchAction(name, pageNum));
    },
  };
}

export default connect(
  (state) => ({
    itemBySearch: state.itemBySearch,
    loading: state.loading,
    error: state.error,
  }),
  mapDispatchToProps
)(SearchList);
