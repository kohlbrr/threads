import axios from 'axios';
import { GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, DESTROY_CART } from '../constants';


export const receiveCartContent = cartContent => ({
  type: GET_CART_CONTENT,
  cartContent,
});


export const fetchCart = () => dispatch =>
  axios.get('/api/cart')
  .then(res => res.data)
  .then(cartContent => dispatch(receiveCartContent(cartContent)))
  .catch(console.error);


export const addToCart = product => dispatch =>
  axios.post(`/api/cart/${product.id}`, product)
  .then(res => res.data)
  .then(newCart => dispatch(receiveCartContent(newCart)))
  .catch(console.error);


export const removeFromCart = product => dispatch =>
  axios.delete(`/api/cart/${product.id}`, product)
  .then(res => res.data)
  .then(newCart => dispatch(receiveCartContent(newCart)))
  .catch(console.error);

