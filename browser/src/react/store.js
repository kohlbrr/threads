import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

/* eslint-disable no-underscore-dangle */
let composeEnhancers;
try {
  composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
} catch (err) {
  composeEnhancers = compose;
}
/* eslint-enable */

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true }))));
