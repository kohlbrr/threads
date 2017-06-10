import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT } from '../constants';

const initialProductsState = [];

export default function (state = initialProductsState, action) {

  switch (action.type) {

    case RECEIVE_PRODUCTS:
      return action.products;

    case RECEIVE_PRODUCT:
      return action.product;

    default:
      return state;
  }
}
