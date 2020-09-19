import React,{useState,useCallback} from "react";
import { FlatList, Text, View, Platform, Button, Alert,StyleSheet } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Loading from "../../components/Loading";

//Constants
import Colors from "../../constants/Colors";

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();
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
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.deleteProduct(productId));
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
      <View style={{...styles.centered}}>
          <View style={{width:"80%",margin:20}}>
            <Text style={{textAlign:"center",fontFamily:"Courgette",color:'red',fontWeight:'bold'}}>Something Went Wrong ! : {error}</Text>
          </View>
          <Button title="try again" color={Colors.primary} onPress={deleteProduct} />
      </View>
    )
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
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => {
            navData.navigation.navigate("EditProductScreen");
          }}
        />
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
