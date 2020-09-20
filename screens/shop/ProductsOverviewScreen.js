import React, { useState, useEffect,useCallback } from "react";

import {
  FlatList,
  View,
  Text,
  Platform,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

//Components
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Loading from "../../components/Loading";
import MyError from '../../components/custom/MyError';

//Constants
import Colors from "../../constants/Colors";

//Store
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);


  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(false);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(true);
  },[dispatch,setIsLoading,setError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch,loadProducts]);

  useEffect(() => {
    const willFocusListener = props.navigation.addListener('willFocus',()=> {
      loadProducts();
    })

    return () => {
      willFocusListener.remove();
    };

  },[loadProducts])

  const onSelectHandler = (id, title) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  };

  if (!isLoading)
    return <Loading info={'Please Wait. Products are almost ready'} textStyle={{ fontSize: 20 }} size={40} color={"green"} />;

  if (error) {
    return (
      <MyError message={`${error}`} method={loadProducts} setError={setError} />
    )
  }

  if (isLoading && products.length === 0)
    return (
        <View style={{ ...styles.centered}}>
          <Text style={{fontFamily:"Courgette",color:'red',fontWeight:'bold'}}>No Products Found ! Maybe Start Adding Some Products...</Text>
        </View>
    );

  return (
    <FlatList
      data={products}
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
            title="View Details"
            onPress={() => {
              onSelectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("CartScreen");
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

export default ProductsOverviewScreen;
