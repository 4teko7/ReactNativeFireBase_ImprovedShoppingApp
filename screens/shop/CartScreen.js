import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

//Components
import Card from "../../components/UI/Card";
import CartItem from "../../components/shop/CartItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Loading from "../../components/Loading";
import MySuccess from '../../components/custom/MySuccess'
import MyError from '../../components/custom/MyError'

//Contants
import Colors from "../../constants/Colors";

const CartScreen = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const orderNow = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);
    try {
      await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        props.navigation.goBack();
        props.navigation.navigate('OrdersScreen');
      }, 500);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [setError, setIsLoading, dispatch, cartItems, cartTotalAmount,orderActions]);

  if (isLoading)
    return (
      <Loading
        info={"Please Wait. Almost Completed..."}
        textStyle={{ fontSize: 20 }}
        size={40}
        color={"green"}
      />
    );


    if (!isLoading && error) {
      return (
        <MyError message={`${error}`} method={orderNow} />
      );
    }
  
    if (!isLoading && !error && isSuccess) {
      return (
        <MySuccess message="Successfull..." />
      );
    }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            ${(cartTotalAmount.toFixed(2) * 1000) / 1000}
          </Text>
        </Text>
        <Button
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            orderNow();
            // props.navigation.navigate('OrdersScreen')
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            deletable={true}
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Cart",
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "Courgette",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
