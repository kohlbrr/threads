import {
  GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, DESTROY_CART,
} from '../constants';

const initialCartState = [];

export default function (state = initialCartState, action) {
  let newState = [].concat(state);
  switch (action.type) {

    case GET_CART_CONTENT:
      newState = newState.concat(action.products);
      break;

    case ADD_PRODUCT_TO_CART:
      newState.push(action.product);
      break;

    case REMOVE_PRODUCT_FROM_CART:
      newState = newState.filter(el => el.id !== action.product.id);
      break;

    case DESTROY_CART:
      newState = [];
      break;

    default:
      return state;

  }

  return newState;
}
