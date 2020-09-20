export const ADD_ORDER = "ADD_ORDER";

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
          id: resData,
          totalAmount: totalAmount,
          date: date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
