import {
  RECEIVE_ORDERS, RECEIVE_ORDER, SET_SELECTED_ORDER, UPDATE_ORDERS,
} from '../constants';

const initialOrdersState = {
  selected: {},
  list: [],
};

export default function (state = initialOrdersState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case RECEIVE_ORDERS:
      newState.list = action.orders;
      break;

    case RECEIVE_ORDER:
      newState.list = [...state, action.order];
      break;

    case SET_SELECTED_ORDER:
      newState.selected = action.order;
      break;

    case UPDATE_ORDERS:
      newState.list.map((order) => { if (order.id === action.order.id) order.status = action.order.status });
      break;


    default:
      return state;

  }
  return newState;
}
