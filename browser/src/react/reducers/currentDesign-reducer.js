import { SET_CURRENT_DESIGN } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_DESIGN:
      return action.design;
    default:
      return state;
  }
};
