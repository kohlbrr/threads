import axios from 'axios';
import { SET_USER } from '../constants';
import { browserHistory } from 'react-router';
import { addToCart } from './cart';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const fetchUser = () => dispatch =>
  axios.get('/auth/me')
  .then(res => res.data)
  .then(user => dispatch(setUser(user)))
  .catch(() => dispatch(setUser(null)));

export const login = (email, password) => dispatch =>
  axios.post('/auth/login', { email, password })
  .then(res => res.data)
  .then((user) => {
    dispatch(setUser(user));
    browserHistory.push('/')
    const localCart = JSON.parse(localStorage.getItem('cart'))
    localCart.forEach(item => dispatch(addToCart({ id: item.productId })));
  });


export const signup = (name, email, password) => dispatch =>
  axios.post('/auth/signup', { name, email, password })
  .then(res => res.data)
  .then(user => dispatch(setUser(user)));

export const logout = () => dispatch =>
  axios.get('/auth/logout')
  .then(res => res.data)
  .then(() => {
    dispatch(setUser(null))
    browserHistory.push('/login')
  });
