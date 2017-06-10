import { combineReducers } from 'redux';
import categoriesReducer from './categories-reducer';
import designsReducer from './designs-reducer';
import productReducer from './product-reducer';
import currentDesignReducer from './currentDesign-reducer';
import usersReducer from './users-reducer';
import currentUser from './currentUser-reducer';

export default combineReducers({
  categories: categoriesReducer,
  designs: designsReducer,
  currentProduct: productReducer,
  currentDesign: currentDesignReducer,
  users: usersReducer,
  currentUser,
});
