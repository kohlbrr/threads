import axios from 'axios';
import { SET_CURRENT_ORDER, UPDATE_ORDER, ORDER_PLACED } from '../constants';
import { destroyCart } from './cart';

export const setCurrentOrder = cart => ({
  type: SET_CURRENT_ORDER,
  cart,
});

export const updateOrder = chargeId => ({
  type: UPDATE_ORDER,
  chargeId,
});
export const orderPlaced = () => ({
  type: ORDER_PLACED,
});

export const placeOrder = order => (dispatch) => {
  return axios.post('/api/orders', order)
  .then((res) => {
    dispatch(orderPlaced());
    dispatch(destroyCart());
  });
};

