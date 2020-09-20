import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.cartItems,
        action.orderData.totalAmount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.userOrders
      }
  }
  return state; //Dont forget to return default state !
};
