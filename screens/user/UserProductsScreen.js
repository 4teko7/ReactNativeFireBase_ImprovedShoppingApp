import React,{useState,useCallback} from "react";
import { FlatList, Text, View, Platform, Button, Alert,StyleSheet } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {Ionicons} from '@expo/vector-icons';

import { useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Loading from "../../components/Loading";
import MySuccess from '../../components/custom/MySuccess';
import MyError from '../../components/custom/MyError';

//Constants
import Colors from "../../constants/Colors";

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userProducts = useSelector((state) => {
    return state.products.userProducts;
  });

  const onSelectHandler = (id, title) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  };

  const onEditHandler = (productId, title) => {
    props.navigation.navigate("EditProductScreen", {
      productId: productId,
      title: title,
    });
  };


  const deleteProduct = useCallback(async (productId) => {
    setIsSuccess(false);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.deleteProduct(productId));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 500);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  },[dispatch,setIsLoading,setError]);


  const onDeleteHandler = (productId) => {
    Alert.alert(
      "Are you sure ?",
      " Do you really want to delete this product ?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            deleteProduct(productId);
          },
        },
      ]
    );
  };


  if (isLoading)
    return <Loading info={'Please Wait. Process is almost completed...'} textStyle={{ fontSize: 20 }} size={40} color={"green"} />;

  if (!isLoading && error) {
    return (
      <MyError message={`${error}`} method={deleteProduct} setError={setError} />
    );
  }

  if (!isLoading && !error && isSuccess) {
    return (
      <MySuccess message="Successfull..." />
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            onSelectHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              onEditHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              onDeleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Create"
          iconName={
            Platform.OS === "android" ? "md-add" : "ios-add"
          }
          onPress={() => {
            navData.navigation.navigate("EditProductScreen");
          }}
        />

        {/* <Ionicons name="ios-add" size={24} color="black" /> */}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductsScreen;
