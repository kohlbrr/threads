import axios from 'axios';
import store from 'redux';
import { GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, DESTROY_CART } from '../constants';


export const receiveCartContent = cartContent => ({
  type: GET_CART_CONTENT,
  cartContent,
});

export const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product,
});

export const removeProductFromCart = product => ({
  type: REMOVE_PRODUCT_FROM_CART,
  product,
});

function fetchLocalCart() {
  const locCart = localStorage.getItem(`cart${store.user.id}`);
  if (!locCart) return [];
  return JSON.parse(locCart);
}

function updateLocalCart(value) {
  localStorage.setItem(`cart${store.user.id}`, JSON.stringify(value));
}

export const fetchCart = () => (dispatch) => {
  if (store.user.id) {
    axios.get('/api/cart')
    .then(res => res.data)
    .then(cartContent => dispatch(receiveCartContent(cartContent)))
    .catch(console.error);
  } else {
    dispatch(receiveCartContent(fetchLocalCart()));
  }
};

function addProductToLocalCart(product) {
  const cart = fetchLocalCart();
  cart.push(product);
  updateLocalCart(cart);
}

export const addToCart = product => (dispatch) => {
  if (store.user.id) {
    axios.post(`/api/cart/${product.id}`, product)
    .then(res => res.data)
    .then(newCart => dispatch(addProductToCart(newCart)))
    .catch(console.error);
  } else {
    addProductToLocalCart(product);
    dispatch(addProductToCart(product));
  }
};

function removeProductFromLocalCart(product) {
  const cart = fetchLocalCart();
  updateLocalCart(cart.filter(el => el.id !== product.id));
}

export const removeFromCart = product => (dispatch) => {
  if (store.user.id) {
    axios.delete(`/api/cart/${product.id}`, product)
    .then(res => res.data)
    .then(newCart => dispatch(removeFromCart(newCart)))
    .catch(console.error);
  } else {
    removeProductFromLocalCart(product);
    dispatch(removeFromCart(product));
  }
};

