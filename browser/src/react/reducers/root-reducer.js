import { combineReducers } from 'redux';
import categoriesReducer from './categories-reducer';

const initialState = {
  currentUser: {},
  cart: [{}],
  orders: [{}],
  currentOrder: {},
  currentProduct: {},
  currentDesign: {}, // contains reviews and products
  categories: [{}],
  currentCategory: {},
};

export default combineReducers({
  categories: categoriesReducer,
  currentCategory:
});
