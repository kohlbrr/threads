import axios from 'axios';
import { RECEIVE_ORDERS, RECEIVE_ORDER, SET_SELECTED_ORDER } from '../constants';

export const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders,
});

export const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order,
});

export const selectOrder = order => ({
  type: SET_SELECTED_ORDER,
  order,
});

export const fetchOrders = () => dispatch =>
    axios.get('/api/orders')
    .then(res => res.data)
    .then(orders => dispatch(receiveOrders(orders)))
    .catch(console.error);

export const fetchOrder = orderId => dispatch =>
    axios.get(`/api/orders/${orderId}`)
    .then(res => res.data)
    .then(retOrder => dispatch(receiveOrder(retOrder)))
    .catch(console.error);

