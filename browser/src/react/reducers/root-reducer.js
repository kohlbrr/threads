import { combineReducers } from 'redux';
import categoriesReducer from './categories-reducer';
import designsReducer from './designs-reducer';
import productReducer from './product-reducer';
import currentDesignReducer from './currentDesign-reducer';
import userReducer from './user-reducer';
import cartReducer from './cart-reducer';

export default combineReducers({
  categories: categoriesReducer,
  designs: designsReducer,
  currentProduct: productReducer,
  currentDesign: currentDesignReducer,
  currentUser: userReducer,
  cart: cartReducer,
});
