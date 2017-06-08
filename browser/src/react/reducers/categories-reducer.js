import {
  SET_CATEGORIES,
} from '../constants';

const initialCategoriesState = {
  categories: [],
};

export default function (state = initialCategoriesState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {

    case SET_CATEGORIES:
      newState.categories = action.categories;
      break;

    default:
      return state;

  }

  return newState;
}
