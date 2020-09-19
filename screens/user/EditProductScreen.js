import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productActions from "../../store/actions/products";

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";

const FORM_INPUT_UPDATE = "REDUCER_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedIsFormValid = true;
    for (let key in updateValidities) {
      if (!key) {
        updatedIsFormValid = false;
        break;
      }
    }
    return {
      isFormValid: updatedIsFormValid,
      inputValues: updatedValues,
      inputValidities: updateValidities,
    };
  }
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();

  const [fornState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: product ? product.price + "" : "",
      description: product ? product.description : "",
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },
    isFormValid: product ? true : false,
  });
  const productId = props.navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const onFormChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  const onSubmitHandler = useCallback(() => {
    if (!fornState.isFormValid) {
      Alert.alert("Wrong Input !", "Please check Errors in the form !", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }

    dispatch(
      product
        ? productActions.updateProduct(
            productId,
            fornState.inputValues.title,
            fornState.inputValues.imageUrl,
            +fornState.inputValues.price,
            fornState.inputValues.description
          )
        : productActions.createProduct(
            fornState.inputValues.title,
            fornState.inputValues.imageUrl,
            +fornState.inputValues.price,
            fornState.inputValues.description
          )
    );
    props.navigation.goBack();
  }, [
    dispatch,
    productId,
    fornState
  ]);

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
            value={fornState.inputValues.title}
            onChangeText={onFormChangeHandler.bind(this, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            // onEndEditing={(text) => {console.log(text.nativeEvent.text)}}
          />
          {!fornState.inputValidities.title && <Text>Please enter a valid title !</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={fornState.inputValues.imageUrl}
            onChangeText={onFormChangeHandler.bind(this, "imageUrl")}
            keyboardType="default"
          />
          {!fornState.inputValidities.imageUrl && <Text>Please enter a valid Image Url !</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={fornState.inputValues.price}
            onChangeText={onFormChangeHandler.bind(this, "price")}
            keyboardType="decimal-pad"
          />
          {!fornState.inputValidities.price && <Text>Please enter a valid Price !</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={fornState.inputValues.description}
            onChangeText={onFormChangeHandler.bind(this, "description")}
            keyboardType="default"
          />
          {!fornState.inputValidities.description && (
            <Text>Please enter a valid Description !</Text>
          )}
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
