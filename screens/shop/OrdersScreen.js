import React,{useState,useCallback,useEffect} from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

//REDUX
import { useSelector,useDispatch } from "react-redux";
import * as ordersActions from '../../store/actions/orders';

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Loading from "../../components/Loading";
import MyError from '../../components/custom/MyError';

const OrdersScreen = (props) => {
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);



  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(false);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(true);
  },[dispatch,setIsLoading,setError]);

  useEffect(() => {
    loadOrders();
  }, [dispatch,loadOrders]);

  useEffect(() => {
    const willFocusListener = props.navigation.addListener('willFocus',()=> {
      loadOrders();
    })

    return () => {
      willFocusListener.remove();
    };

  },[loadOrders])


  if (!isLoading)
    return <Loading info={'Please Wait. Orders are almost ready'} textStyle={{ fontSize: 20 }} size={40} color={"green"} />;

  if (error) {
    return (
      <MyError message={`${error}`} method={loadOrders} setError={setError} />
    )
  }


  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
            deletable={false}
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
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
  };
};

export default OrdersScreen;
