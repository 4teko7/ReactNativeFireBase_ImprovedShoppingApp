import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productActions from "../../store/actions/products";

//Components
import CustomHeaderButton from "../../components/UI/HeaderButton";
import MyInput from "../../components/UI/Input";
import Loading from "../../components/Loading";
import Colors from "../../constants/Colors";
import MySuccess from '../../components/custom/MySuccess';
import MyError from '../../components/custom/MyError';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputIdentifier]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.inputIdentifier]: action.isValid,
    };

    let isUpdatedFormValid = true;
    for (let key in updateValidities) {
      if (!updateValidities[key]) {
        isUpdatedFormValid = false;
        break;
      }
    }
    return {
      isFormValid: isUpdatedFormValid,
      inputValues: updatedValues,
      inputValidities: updateValidities,
    };
  }
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formState, dispatchFormState] = useReducer(formReducer, {
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

  const onInputChange = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputIdentifier: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const onSubmitHandler = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong Input !", "Please check Errors in the form !", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }
    setIsSuccess(false);
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(
        product
          ? productActions.updateProduct(
              productId,
              formState.inputValues.title,
              formState.inputValues.imageUrl,
              +formState.inputValues.price,
              formState.inputValues.description
            )
          : productActions.createProduct(
              formState.inputValues.title,
              formState.inputValues.imageUrl,
              +formState.inputValues.price,
              formState.inputValues.description
            )
      );
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        props.navigation.goBack();
      }, 500);
    } catch (err) {
      setError("Your Product Couldn't be Added. Please Try Again...");
    }
    setIsLoading(false);
  }, [dispatch, productId, formState, setIsLoading, setError]);

  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler });
  }, [onSubmitHandler]); //Only Executes One.

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
      <MyError message={`${error}`} method={onSubmitHandler} />
    );
  }

  if (!isLoading && !error && isSuccess) {
    return (
      <MySuccess message="Successfull..." />
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
      <ScrollView>
        <View style={styles.form}>
          <MyInput
            label="title"
            errorText="Please enter a valid Title !"
            name="title"
            // onInputChange={onInputChangeHandler.bind(this, 'title')}
            onInputChange={onInputChange}
            initialValue={product ? product.title : ""}
            initiallyValid={true}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <MyInput
            label="Image URL"
            errorText="Please enter a valid Image Url !"
            name="imageUrl"
            onInputChange={onInputChange}
            initialValue={product ? product.imageUrl : ""}
            initiallyValid={true}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <MyInput
            label="Price"
            errorText="Please enter a valid Price!"
            name="price"
            onInputChange={onInputChange}
            initialValue={product ? product.price + "" : ""}
            initiallyValid={true}
            keyboardType="decimal-pad"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <MyInput
            label="Description"
            errorText="Please enter a valid Description!"
            name="description"
            onInputChange={onInputChange}
            initialValue={product ? product.description : ""}
            initiallyValid={true}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            // returnKeyType="next"
            // onEndEditing={(text) => {console.log(text.nativeEvent.text)}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
