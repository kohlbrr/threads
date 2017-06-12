import axios from 'axios';
import store from '../store';
import { GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_QUANTITY } from '../constants';


export const receiveCartContent = cartContent => ({
  type: GET_CART_CONTENT,
  cartContent,
});

export const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product,
});

export const updateQuantityInCart = (product, quantity) => ({
  type: UPDATE_QUANTITY,
  product,
  quantity,
});

export const removeProductFromCart = product => ({
  type: REMOVE_PRODUCT_FROM_CART,
  product,
});

function fetchLocalCart() {
  const locCart = localStorage.getItem('cart');
  if (!locCart) return [];
  return JSON.parse(locCart);
}

export const fetchCart = () => (dispatch) => {
  if (store.getState().user) {
    axios.get('/api/cart')
    .then(res => res.data)
    .then(cartContent => dispatch(receiveCartContent(cartContent)))
    .catch(console.error);
  } else {
    dispatch(receiveCartContent(fetchLocalCart()));
  }
};

function updateLocalCart(value) {
  localStorage.setItem('cart', JSON.stringify(value));
}

function addProductToLocalCart(product) {
  const cart = fetchLocalCart();
  cart.push(product);
  updateLocalCart(cart);
}

export const addToCart = product => (dispatch) => {
  if (store.getState().user) {
    axios.post(`/api/cart/${product.id}`, product)
    .then(res => res.data)
    .then(newCart => dispatch(addProductToCart(newCart)))
    .catch(console.error);
  } else {
    addProductToLocalCart(product);
    dispatch(addProductToCart(product));
  }
};

function updateQuantityInLocalCart(product, quatity) {
  const cart = fetchLocalCart();
  updateLocalCart(cart.map((prod) => { if (prod.id === product.id) prod.quantity = quatity; }));
}

export const updateQuantity = (product, quantity) => (dispatch) => {
  if (store.getState().user) {
    axios.put(`/api/cart/${product.id}`, quantity)
    .then(res => res.data)
    .then(updatedProduct => dispatch(updateQuantityInCart(product, quantity)))
    .catch(console.error);
  } else {
    updateQuantityInLocalCart(product, quantity);
    dispatch(updateQuantityInCart(product, quantity));
  }
};

function removeProductFromLocalCart(product) {
  const cart = fetchLocalCart();
  updateLocalCart(cart.filter(el => el.id !== product.id));
}

export const removeFromCart = product => (dispatch) => {
  if (store.getState().user) {
    axios.delete(`/api/cart/${product.id}`, product)
    .then(res => res.data)
    .then(newCart => dispatch(removeFromCart(newCart)))
    .catch(console.error);
  } else {
    removeProductFromLocalCart(product);
    dispatch(removeFromCart(product));
  }
};

