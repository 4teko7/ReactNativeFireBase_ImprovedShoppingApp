import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title={showDetails ? "Hide Details" :"Show Details"}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
      </View>
      {showDetails && (
          <View key={props.date}>
            {props.items.map((cartItem) => {
              let id = 0;
              return <CartItem
                        key={cartItem.productId}
                        title={cartItem.productTitle}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
              />;


            })}
          </View>
        )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    marginHorizontal: 15,
    marginVertical:10,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  action: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {
    fontFamily: "Courgette",
    fontSize: 16,
  },
  date: {
    fontFamily: "Courgette",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;
