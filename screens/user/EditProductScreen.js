import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productActions from "../../store/actions/products";

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";


const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState(product ? product.price + "" : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );

  const onSubmitHandler = useCallback(() => {
    dispatch(
      product
        ? productActions.updateProduct(
            productId,
            title,
            imageUrl,
            +price,
            description
          )
        : productActions.createProduct(title, imageUrl, +price, description)
    );
  }, [dispatch,productId,title,imageUrl,price,description]);

  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler });
  }, [onSubmitHandler]); //Only Executes One.

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => {setTitle(text);}}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => {setImageUrl(text)}}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => {setPrice(text)}}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => {setDescription(text)}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitMethod = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Create"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitMethod}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "Courgette",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
