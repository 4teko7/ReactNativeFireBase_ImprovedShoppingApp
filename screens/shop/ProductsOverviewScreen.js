import React from "react";

import { FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

//Components
import ProductItem from "../../components/shop/ProductItem";

//Store
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.availableProducts);
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
            props.navigation.navigate("ProductDetailScreen", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverviewScreen;
