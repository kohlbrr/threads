import { ADD_REVIEW } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return action.review;
    default:
      return state;
  }
};
