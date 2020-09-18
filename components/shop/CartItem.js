import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} -  </Text>
        <Text style={styles.text}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.text}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
          onPress={props.onRemove}
          style={StyleSheet.deleteButton}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontSize: 16
  },
  text: {
    fontFamily: "Courgette",
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
