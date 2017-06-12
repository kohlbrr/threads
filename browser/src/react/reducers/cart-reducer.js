import {
  GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, DESTROY_CART,
} from '../constants';

const initialCartState = {
  products: [{}],
};

export default function (state = initialCartState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case GET_CART_CONTENT:
      newState.products = action.products;
      break;

    case ADD_PRODUCT_TO_CART:
      newState.products.push(action.product);
      break;

    case DESTROY_CART:
      newState.products = [];
      break;

    default:
      return state;

  }

  return newState;
}
