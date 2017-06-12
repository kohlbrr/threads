import axios from 'axios';
import store from '../store';
import { browserHistory } from 'react-router'
import { GET_CART_CONTENT, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_QUANTITY } from '../constants';


function formatCartItem(product, design) {
  return Object.assign({},
    {
      price: design.price,
      name: design.name,
      sex: design.sex,
      designId: design.id,
    },
    {
      size: product.size,
      color: product.color,
      imageUrl: product.imageUrl,
      productId: product.id,
      stock: product.stock,
    }, {
      quantity: 1,
    });
}

export const receiveCartContent = cartContent => ({
  type: GET_CART_CONTENT,
  cartContent,
});

export const addProductToCart = (product, design) => ({
  type: ADD_PRODUCT_TO_CART,
  product: formatCartItem(product, design),
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
  const locCart = JSON.parse(localStorage.getItem('cart'));
  if (!locCart) return [];
  return locCart;
}

function updateLocalCart(value) {
  localStorage.setItem('cart', JSON.stringify(value));
}

export const fetchCart = () => (dispatch) => {
  if (store.getState().currentUser) {
    axios.get('/api/cart')
    .then(res => res.data)
    .then(cartContent => dispatch(receiveCartContent(cartContent)))
    .catch(console.error);
  } else {
    dispatch(receiveCartContent(fetchLocalCart()));
  }
};


function addProductToLocalCart(product, design) {
  const cart = fetchLocalCart();
  const cartItem = formatCartItem(product, design);
  cart.push(cartItem);
  updateLocalCart(cart);
}


export const addToCart = (product, design) => (dispatch) => {
  if (store.getState().currentUser) {
    axios.post(`/api/cart/${product.id}`, { quantity: 1 })
    .then(res => res.data)
    .then(() => browserHistory.push('/cart'))
    .catch(console.error);
  } else {
    addProductToLocalCart(product, design);
    dispatch(addProductToCart(product, design));
    browserHistory.push('/cart')

  }
};

function updateQuantityInLocalCart(product, quatity) {
  const cart = fetchLocalCart();
  updateLocalCart(cart.map((item) => {
    if (item.productId === product.productId) item.quantity = quatity;
    return item
  }));
}

export const updateQuantity = (item, quantity) => (dispatch) => {
  if (store.getState().currentUser) {
    axios.put(`/api/cart/${item.productId}`, { quantity })
    .then(res => res.data)
    .then(updatedProduct => dispatch(updateQuantityInCart(item, quantity)))
    .catch(console.error);
  } else {
    updateQuantityInLocalCart(item, quantity);
    dispatch(updateQuantityInCart(item, quantity));
  }
};

function removeProductFromLocalCart(product) {
  const cart = fetchLocalCart();
  updateLocalCart(cart.filter(el => el.productId !== product.productId));
}

export const removeFromCart = item => (dispatch) => {
  if (store.getState().currentUser) {
    axios.delete(`/api/cart/${item.productId}`)
    .then(res => res.data)
    .then(() => dispatch(removeProductFromCart(item)))
    .catch(console.error);
  } else {
    removeProductFromLocalCart(item);
    dispatch(removeProductFromCart(item));
  }
};

