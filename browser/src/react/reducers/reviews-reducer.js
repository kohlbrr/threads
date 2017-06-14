import { ADD_REVIEW, RECEIVE_REVIEWS } from '../constants';

const initialReviewsState = {
  list: [],
};

export default function (state = initialReviewsState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case RECEIVE_REVIEWS:
      newState.list = action.reviews;
      break;

    case ADD_REVIEW:
      newState.list.push(action.review);
      break;

    default:
      return state;

  }
  return newState;
}