import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch('https://reactnativeimprovedshopapp.firebaseio.com/products.json');

    const resData = await response.json();
    console.log("resData : " , resData);
    const loadedProducts = [];

    for(let key in resData){
      loadedProducts.push(new Product(key,'u1',resData[key].title,resData[key].imageUrl,resData[key].price,resData[key].description))
    }

    dispatch({type: SET_PRODUCTS,products: loadedProducts})
  }
}

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId: productId };
};


export const updateProduct = (id, title, imageUrl, price, description) => {
    return {
        type: UPDATE_PRODUCT,
        productData: {
            id: id,
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
        },
    };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async dispatch => {
    //Write any async code...
    const response = await fetch('https://reactnativeimprovedshopapp.firebaseio.com/products.json',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        price,
        description
      })
    });

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
  }
};