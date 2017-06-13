import axios from 'axios';
import { SET_CURRENT_ORDER, UPDATE_ORDER } from '../constants';


export const setCurrentOrder = order => ({
  type: SET_CURRENT_ORDER,
  order,
});

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  order,
});

export const fetchOrder = id => dispatch =>
    axios.get(`/api/orders/${id}`)
    .then(res => res.data)
    .then(order => dispatch(setCurrentOrder(order)))
    .catch(console.error);

export const createOrder = () => dispatch =>
    axios.post('/api/orders/')
    .then(res => res.data)
    .then(newOrder => dispatch(setCurrentOrder(newOrder)))
    .catch(console.error);

export const updateOrderById = id => dispatch =>
    axios.put(`/api/orders/${id}`)
    .then(res => res.data)
    .then(order => dispatch(setCurrentOrder(order)))
    .catch(console.error);

