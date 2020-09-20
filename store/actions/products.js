import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://reactnativeimprovedshopapp.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong ! : " + response.state);
      }

      const resData = await response.json();

      const loadedProducts = [];

      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].price,
            resData[key].description
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://reactnativeimprovedshopapp.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE"
        }
      )
      
      if (!response.ok) {
        throw new Error("Something Went Wrong !");
      }

    dispatch({ type: DELETE_PRODUCT, productId: productId });
    } catch (err) {
      throw err;
    }
  };
};

export const updateProduct = (id, title, imageUrl, price, description) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://reactnativeimprovedshopapp.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            imageUrl,
            price,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong ! : " + response.state);
      }

      dispatch({
        type: UPDATE_PRODUCT,
        productData: {
          id: id,
          title: title,
          imageUrl: imageUrl,
          price: price,
          description: description,
        },
      });
    } catch (err) {
      throw err.message;
    }
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    //Write any async code...
    try {
      const response = await fetch(
        "https://reactnativeimprovedshopapp.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            imageUrl,
            price,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong ! : " + response.state);
      }

      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title: title,
          imageUrl: imageUrl,
          price: price,
          description: description,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
