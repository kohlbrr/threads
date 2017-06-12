import {
  GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_QUANTITY,
} from '../constants';

const initialCartState = [];

export default function (state = initialCartState, action) {
  let newState = [...state];
  switch (action.type) {

    case GET_CART_CONTENT:
      newState = action.cartContent;
      break;

    case ADD_PRODUCT_TO_CART:
      newState.push(action.product);
      break;

    case REMOVE_PRODUCT_FROM_CART:
      newState = newState.filter(el => el.productId !== action.product.productId);
      break;

    case UPDATE_QUANTITY:
      newState = newState.map((item) => {
        return item.productId === action.product.productId ?
        Object.assign({}, item, {quantity: action.quantity }) :
        Object.assign({}, item);
      });
      break;

    default:
      return state;

  }

  return newState;
}
