import {
  RECEIVE_CATEGORIES, RECEIVE_CATEGORY, SET_CATEGORY,
} from '../constants';

const initialCategoriesState = {
  selected: {},
  list: [],
};

export default function (state = initialCategoriesState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case RECEIVE_CATEGORIES:
      newState.list = action.categories;
      break;

    case RECEIVE_CATEGORY:
      newState.list.push(action.category);
      break;

    case SET_CATEGORY:
      newState.selected = action.category;
      break;

    default:
      return state;

  }

  return newState;
}
