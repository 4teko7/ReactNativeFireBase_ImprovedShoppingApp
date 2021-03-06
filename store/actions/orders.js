import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://reactnativeimprovedshopapp.firebaseio.com/orders/u1.json"
      );

      if (!response.ok)
        throw new Error("Something Went Wrong! Please Try Again...");

      const resData = await response.json();

      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            resData[key].date
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        userOrders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    try {
      const response = await fetch(
        "https://reactnativeimprovedshopapp.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok)
        throw new Error("Something Went Wrong! Please Try Again...");

      const resData = await response.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          cartItems: cartItems,
          id: resData.name,
          totalAmount: totalAmount,
          date: date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
