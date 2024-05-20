import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "./Layout";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Figure from "./figure/Figure.js";
import Digital from "./digital/Digital.js";
import Clothing from "./clothing/Clothing.js";
import Pillow from "./pillow/Pillow.js";
import Daily from "./daily/Daily.js";
import Login from "./Login";
import Settings from "./my/Settings.js";
import Detail from "./detail/Detail.js";
import Register from "./Register";
import SearchList from "./SearchList";
import AllOrders from "./my/AllOrders.js";
import NonPayment from "./my/NonPayment.js";

const Stack = createNativeStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Layout"
          component={Layout}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Figure" component={Figure} />
        <Stack.Screen name="Digital" component={Digital} />
        <Stack.Screen name="Clothe" component={Clothing} />
        <Stack.Screen name="Pillow" component={Pillow} />
        <Stack.Screen name="Daily" component={Daily} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Detail" component={Detail}  options={{ headerShown: false }} />
        <Stack.Screen name="SearchList" component={SearchList} />
        <Stack.Screen name="AllOrders" component={AllOrders} />
        <Stack.Screen name="Non-Payment" component={NonPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
