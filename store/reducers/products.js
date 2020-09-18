import {PRODUCTS} from '../../data/data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch(action.type){
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(userProd => userProd.id !== action.productId),
                userProducts: state.userProducts.filter(userProd => userProd.id !== action.productId) 
            }
            
    }
    return state;
}