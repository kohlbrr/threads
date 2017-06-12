import { SET_CURRENT_ORDER } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.order;
    default:
      return state;
  }
};
