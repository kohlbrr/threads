import { CHANGE_PRODUCT } from '../constants';

const initialProductsState = {};

export default function (state = initialProductsState, action) {

  switch (action.type) {

    case CHANGE_PRODUCT:
      return action.product;

    default:
      return state;
  }
}
