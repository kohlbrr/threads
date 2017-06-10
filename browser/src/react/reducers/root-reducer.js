import { combineReducers } from 'redux';
import categoriesReducer from './categories-reducer';
import designsReducer from './designs-reducer';
import productsReducer from './products-reducer';


export default combineReducers({
  categories: categoriesReducer,
  designs: designsReducer,
  products: productsReducer,
});
