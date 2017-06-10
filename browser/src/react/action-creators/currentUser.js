import axios from 'axios';
import { SET_CURRENT_USER } from '../constants';


export const receiveCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const loginUser = user => dispatch =>
  axios.post('/login', user)
  .then(res => res.data)
  .then(newUser => dispatch(receiveCurrentUser(newUser)))
  .catch(console.error);

export const signUpNewUser = user => dispatch =>
  axios.post('/signup', user)
  .then(res => res.data)
  .then(newUser => dispatch(receiveCurrentUser(newUser)))
  .catch(console.error);
