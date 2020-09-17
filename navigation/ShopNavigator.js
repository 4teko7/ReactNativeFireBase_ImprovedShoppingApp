import React from "react";
import {Text,Platform} from 'react-native';

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

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
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
    },
    headerTitleStyle: {
        fontSize: 23,
        fontFamily: "Courgette"
    },
    headerBackStyle: {
        fontFamily: "Courgette"
    },
    headerTintColor: Platform.OS === "android" ? "white" : "",
  }

const ProductsNavigator = createStackNavigator(
{
    ProductsOverviewScreen: ProductsOverviewScreen
},
{
    mode: "modal",
    initialRouteName: "ProductsOverviewScreen",
    defaultNavigationOptions: {
        ...defaultStackNavOption
    },
}
);


const NavigationAppContainer = createAppContainer(ProductsNavigator);

export default NavigationAppContainer;