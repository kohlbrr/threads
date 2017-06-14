import { SET_CURRENT_DESIGN, ADD_REVIEW } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_DESIGN:
      return action.design;
    case ADD_REVIEW:
      return Object.assign({}, state, { reviews: [action.review, ...state.reviews] });
    default:
      return state;
  }
};
