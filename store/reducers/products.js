import { PRODUCTS } from "../../data/data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      const updatedAvailableProducts = action.products;
      const updatedUserProducts = updatedAvailableProducts.filter(prod => prod.ownerId === 'u1')
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (userProd) => userProd.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (userProd) => userProd.id !== action.productId
        ),
      };
    case CREATE_PRODUCT:
      let title = action.productData.title;
      let imageUrl = action.productData.imageUrl;
      let price = action.productData.price;
      let description = action.productData.description;
      let newProduct = new Product(
        action.productData.id,
        "u1",
        title,
        imageUrl,
        price,
        description
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
        let productId = action.productData.id;
        let productIndex = state.availableProducts.findIndex(
            (prod) => prod.id === productId
        );

        let ownerId = state.userProducts[productIndex].ownerId;
        title = action.productData.title;
        imageUrl = action.productData.imageUrl;
        price = action.productData.price;
        description = action.productData.description;

        const editedProduct = new Product(
            productId,
            ownerId,
            title,
            imageUrl,
            price,
            description
        );
        state.availableProducts[productIndex] = editedProduct;
        state.userProducts[productIndex] = editedProduct;
        return {
            ...state,
            availableProducts: [...state.availableProducts],
            userProducts: [...state.userProducts]
        };
    }
    return state;
};
