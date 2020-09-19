import React,{useState,useEffect} from "react";

import { FlatList, Text, Platform,Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

//Components
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Loading from '../../components/Loading';

//Constants
import Colors from '../../constants/Colors';

//Store
import * as cartActions from "../../store/actions/cart";
import * as productActions from '../../store/actions/products';

const ProductsOverviewScreen = (props) => {
  const [areProductsLoaded,setAreProductsLoaded] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  useEffect(()=>{

    const loadProducts = async () => {
      setAreProductsLoaded(false)
      await dispatch(productActions.fetchProducts())
      setAreProductsLoaded(true)
    }
    loadProducts();

  },[dispatch])

  const onSelectHandler = (id, title) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  };

  if(!areProductsLoaded) return <Loading textStyle={{fontSize:20}} size={40} color={'green'}/>

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

export default ProductsOverviewScreen;
