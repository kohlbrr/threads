import { CHANGE_PRODUCT } from '../constants';

export default function (state = {}, action){

  switch (action.type) {

    case CHANGE_PRODUCT:
      return action.product;

    default:
      return state;
  }
}
