import React from "react";
import { Text, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

//Screens
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductsDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

//Constants
import Colors from "../constants/Colors";

const defaultStackNavOption = {
  headerTitle: "Screen",
  headerTitleAlign: "center",

  // headerTitleStyle: {
  //     position:"absolute",
  //     top:"50%",
  //     left:"50%",
  //     transform: translate("50%","50%"),
  //     textAlign:"center",
  //     flex:1
  // },
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontSize: 23,
    fontFamily: "Courgette",
  },
  headerBackStyle: {
    fontFamily: "Courgette",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "",
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverviewScreen: ProductsOverviewScreen,
        ProductDetailScreen: ProductDetailScreen,
        CartScreen: CartScreen,
    },
    {
        navigationOptions: {
                drawerIcon: (drawerConfig) => (
                <Ionicons
                    name={Platform.OS == "android" ? "md-cart" : "ios-cart"}
                    size={23}
                    color={drawerConfig.tintColor}
                />
                ),
            },
            mode: "modal",
            defaultNavigationOptions: {
            ...defaultStackNavOption,
            },
    }
);

const OrdersNavigator = createStackNavigator(
  {
    OrdersScreen: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
            name={Platform.OS == "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.tintColor}
        />
      ),
    },
    mode: "modal",
    defaultNavigationOptions: {
      ...defaultStackNavOption,
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontWeight: "normal",
        fontFamily: "Courgette"
    },
    },
  }
);

const NavigationAppContainer = createAppContainer(ShopNavigator);

export default NavigationAppContainer;
