import { ADD_TO_CART,REMOVE_FROM_CART } from "../actions/cart"

import Cart from '../../models/cart';

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title
            let totalAmount = state.totalAmount
            let cart;
            if(state.items[addedProduct.id]){
                cart = new Cart(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            }else{
                cart = new Cart(1,productPrice,productTitle,productPrice);
            }
            return {
                ...state,
                items: {...state.items, [addedProduct.id]: cart},
                totalAmount: totalAmount + productPrice
            }
        case REMOVE_FROM_CART:
            const quantity = state.items[action.productId].quantity
            let price;
            let updatedCart;
            totalAmount = state.totalAmount;
            if(quantity > 1){
                price = state.items[action.productId].price;
                state.items[action.productId].quantity--;
                updatedCart = state.items;
            }else{
                updatedCart = {...state.items}
                price = updatedCart[action.productId];
                delete updatedCart[action.productId];
            }
            return {
                ...state,
                items: updatedCart,
                totalAmount: totalAmount - price
            }
        }
        return state
    }