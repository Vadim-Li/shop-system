import Home from "./home/Home";
import Cart from "./Cart";
import My from "./my/My.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function Layout() {
  return (
    <Tab.Navigator
      labelStyle={{ fontSize: 12 }}
      screenOptions={{
        tabBarActiveTintColor: 'orange',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ShopingCart"
        component={Cart}
        options={{
          tabBarLabel: "ShopingCart",
          tabBarIcon: ({ color }) => (
            // <MaterialCommunityIcons name="bell" color={color} size={26} />
            <Icon name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Layout;
