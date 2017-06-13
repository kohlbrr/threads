import { SET_CURRENT_ORDER, UPDATE_ORDER, ORDER_PLACED } from '../constants';

const initialState = {
  chargeId: null,
  cart: [],
  orderPlaced: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return Object.assign({}, state, { cart: action.cart, orderPlaced: false, chargeId: null });
    case UPDATE_ORDER:
      return Object.assign({}, state, { chargeId: action.chargeId });
    case ORDER_PLACED:
      return Object.assign({}, state, { orderPlaced: true });
    default:
      return state;
  }
};
