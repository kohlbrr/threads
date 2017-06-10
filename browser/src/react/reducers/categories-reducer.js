import {
  SET_CATEGORIES,
} from '../constants';

const initialCategoriesState = [];


export default function (state = initialCategoriesState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
